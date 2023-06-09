export const normalize = (sql, params) => {
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
};
