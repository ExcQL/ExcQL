const { composeSqlQuery } = require('../server/controllers/sqlController');

describe('SQL Query generation unit tests', () => {
    // TODO: Unique, not null
    const sampleInput = {
        table1Name: {
            column1Name: { primaryKey: true, type: 'varchar' },
            column2Name: 'varchar',
            column3Name: 'float',
            column4Name: 'boolean',
            column5Name: { linkedTable: 'table2Name' }
        },
        table2Name: {
            column1Name: { primaryKey: true, type: 'integer' },
            column2Name: 'varchar'
        }
    };

    it('generates query', () => {
        console.log(composeSqlQuery(sampleInput));
    })
})