/**
 * Draft expected input:
  {
    table1Name: {
      column1Name: {primaryKey: true, type: “number”},
      column2Name: “string”,
      column3Name: “number”,
      column4Name: “boolean”,
      column5Name: {linkedTable: table2Name.column1Name, type: “number”}
    },
    table2Name: {
      column1Name: {primaryKey: true, type: “number”},
      column2Name: “string”
    }
  }
 */

const util = require('util');
const sqlController = {};

/**
 * Desired end product:
 * 
 * CREATE TABLE ID NOT EXISTS <table-name> (
 *   ID SERIAL PRIMARY KEY
 *   NAME VARCHAR(255) NOT NULL
 * );
 */
const composeSqlQuery = (json) => {
    const outputArray = [];
    const TAB = '\t';
    Object.keys(json).forEach(entity => {
        let query = `CREATE TABLE ID NOT EXISTS ${entity} (\n%s);`
        let tableStringArray = [`_id SERIAL PRIMARY KEY`];
        const attrObj = json[entity];
        Object.keys(attrObj).forEach(attribute => {
            const value = attrObj[attribute];
            if (typeof value === 'object' && value.hasOwnProperty('linkedTable')) {
                const tableName = value['linkedTable'];
                tableStringArray.push(`${tableName}_id INT REFERENCES ${tableName}(_id)`);
            } else {
                const substringArray = [attribute];
                const type = typeof attrObj[attribute] === 'string' ?
                    attrObj[attribute] : attrObj[attribute]['type'];
                switch (type) {
                    // TODO: Potentially set these as types
                    case 'varchar': {
                        substringArray.push('VARCHAR(255)');
                        break;
                    }
                    case 'integer': {
                        substringArray.push('INT');
                        break
                    }
                    case 'float': {
                        substringArray.push('FLOAT');
                        break;
                    }
                    case 'boolean': {
                        substringArray.push('BOOLEAN');
                        break;
                    }
                    // TODO: date or timestamp (TIMESTAMPTZ)?
                    case 'date': {
                        substringArray.push('DATE');
                        break;
                    }
                    default: throw new Error(`Unexpected data type: ${type}.`)
                }
                tableStringArray.push(substringArray.join(' '));
            }
        }
        );
        outputArray.push(util.format(query, tableStringArray.map(string => `${TAB}${string}\n`).join('')));
    }
    );
    return outputArray.join('\n\n');
};

sqlController.createSqlScript = (req, res, next) => {
    // TODO: Where is the input storing in `res`?
    try {
        res.locals.sqlscript = composeSqlQuery(res.locals.output);
        return next();
    } catch (error) {
        return next({
            log: error,
            status: 400,
            message: { err: error },
        })
    }
}



module.exports = { sqlController, composeSqlQuery };