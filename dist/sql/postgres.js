import pg from 'pg';
import { normalize } from './normalize.js';

export class Postgres {
    constructor() {
        this.config = {
            connectionString: process.env.POSTGRES_URL,
        };
        if (process.env.DATABASE_SSL) {
            this.config.ssl = {
                rejectUnauthorized: false,
                ca: process.env.CACERT,
            };
        }
    }

    async execute(sql, params) {
        const statements = normalize(sql, params);
        let rows = [];
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            rows = await new Promise((resolve, reject) => {
                this.run(
                    statement.sql,
                    statement.params,
                    function (rows, error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(rows);
                        }
                    }
                );
            });
        }
        return rows;
    }

    run(sql, params, callback) {
        const client = new pg.Client(this.config);
        client.connect(function (err) {
            if (err) {
                callback([], err);
                client.end();
                return;
            }
            client.query(sql, params, function (err, result) {
                if (err) {
                    callback([], err);
                    client.end();
                    return;
                }
                client.end();
                callback(result.rows);
            });
        });
    }
}
