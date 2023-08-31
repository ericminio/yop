import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { Postgres } from '../../dist/index.js';

describe('Postgres', () => {
    it('can execute one select', async () => {
        const database = new Postgres();
        const rows = await database.execute("select 'Joe' as name");
        assert.equal(rows.length, 1);
        assert.equal(rows[0].name, 'Joe');
    });

    it('can execute one select with one parameter', async () => {
        const database = new Postgres();
        const rows = await database.execute('select $1 as name', ['Jack']);
        assert.equal(rows.length, 1);
        assert.equal(rows[0].name, 'Jack');
    });

    it('can execute several statements and return the last results', async () => {
        const database = new Postgres();
        const rows = await database.execute([
            'drop table if exists product',
            'create table if not exists product (id varchar primary key, name varchar)',
            {
                sql: 'insert into product (id, name) values ($1, $2)',
                params: ['one', 'mouse'],
            },
            {
                sql: 'insert into product (id, name) values ($1, $2)',
                params: ['two', 'keyboard'],
            },
            'select count(id)::integer as count from product',
        ]);
        assert.equal(rows.length, 1);
        assert.equal(rows[0].count, 2);
    });

    it('can execute several statements as one', async () => {
        const database = new Postgres();
        const prepare = `
            drop table if exists product;
            create table if not exists product (
                id varchar primary key, 
                name varchar
            );
            insert into product (id, name) values ('one', 'mouse');
            insert into product (id, name) values ('two', 'keyboard');
        `;
        const rows = await database.execute([
            prepare,
            'select count(id)::integer as count from product',
        ]);
        assert.equal(rows.length, 1);
        assert.equal(rows[0].count, 2);
    });

    it('reports errors', async () => {
        const database = new Postgres();
        try {
            const rows = await database.execute("select 'Joe' as");
            throw new Error('should fail');
        } catch (error) {
            assert.equal(error.message, 'syntax error at end of input');
        }
    });
});
