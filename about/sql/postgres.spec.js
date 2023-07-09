import { Postgres } from '../../dist/index.js';
import { expect } from 'chai';

describe('Postgres', () => {
    it('can execute one select', async () => {
        const database = new Postgres();
        const rows = await database.execute("select 'Joe' as name");
        expect(rows.length).to.equal(1);
        expect(rows[0].name).to.equal('Joe');
    });

    it('can execute one select with one parameter', async () => {
        const database = new Postgres();
        const rows = await database.execute('select $1 as name', ['Jack']);
        expect(rows.length).to.equal(1);
        expect(rows[0].name).to.equal('Jack');
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
        expect(rows.length).to.equal(1);
        expect(rows[0].count).to.equal(2);
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
        expect(rows.length).to.equal(1);
        expect(rows[0].count).to.equal(2);
    });

    it('reports errors', async () => {
        const database = new Postgres();
        try {
            const rows = await database.execute("select 'Joe' as");
            throw new Error('should fail');
        } catch (error) {
            expect(error.message).to.equal('syntax error at end of input');
        }
    });
});
