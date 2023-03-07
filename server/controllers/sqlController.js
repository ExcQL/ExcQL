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
// See __tests__/sqlController.js for expected input
const composeSqlQuery = (input) => {
  const outputArray = [];
  const TAB = '\t';
  input.forEach(({ table, columns }) => {
    let query = `CREATE TABLE IF NOT EXISTS ${table} (\n%s);`
    let tableStringArray = [];
    columns.forEach(column => {
      // TODO: Validate that keys have only one element
      const tableName = Object.keys(column)[0];
      const value = column[tableName];
      if (typeof value === 'object' && value.hasOwnProperty('linkedTable')) {
        // TODO: validate only one element in output
        const referencedTable = value['linkedTable'].split(".")[0];
        tableStringArray.push(`${referencedTable}_id INT REFERENCES ${referencedTable}(_id)`);
      } else if (typeof value === 'object' && value.hasOwnProperty('primaryKey')) {
        tableStringArray.push(`${tableName} ${value.type} PRIMARY KEY`);
      } else {
        tableStringArray.push(`${tableName} ${value}`);
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