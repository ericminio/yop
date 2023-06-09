import pg from 'pg';

export class Postgres {
    constructor() {
        this.config = {
            connectionString: process.env.POSTGRES_URL,
        };
        if (process.env.DATABASE_SSL) {
            this.config.ssl = {
                rejectUnauthorized: false,
            };
        }
    }

    async executeSync(sql, params) {
        const statements = this.normalize(sql, params);
        const rows = await this.runAll(statements);

        return rows;
    }

    normalize(sql, params) {
        let statements = sql;
        if (typeof sql == 'string') {
            let statement = { sql: sql, params: [] };
            if (typeof params == 'object') {
                statement.params = params;
            }
            statements = [statement];
        }
        for (let i = 0; i < statements.length; i++) {
            if (typeof statements[i] == 'string') {
                statements[i] = {
                    sql: statements[i],
                    params: [],
                };
            }
        }
        return statements;
    }

    async runAll(statements) {
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
