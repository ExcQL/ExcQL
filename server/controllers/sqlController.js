const util = require('util');
const Iter = require('es-iter'); // tool for calculating combinations
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
    let query = `CREATE TABLE IF NOT EXISTS ${table} (\n%s);`;
    let tableStringArray = [];
    columns.forEach((column) => {
      // TODO: Validate that keys have only one element
      const tableName = Object.keys(column)[0];
      const value = column[tableName];
      if (typeof value === 'object' && value.hasOwnProperty('linkedTable')) {
        // TODO: validate only one element in output
        const referencedTable = value['linkedTable'].split('.')[0];
        tableStringArray.push(
          `${referencedTable}_id INT REFERENCES ${referencedTable}(_id)`
        );
      } else if (
        typeof value === 'object' &&
        value.hasOwnProperty('primaryKey')
      ) {
        tableStringArray.push(`${tableName} ${value.type} PRIMARY KEY`);
      } else {
        tableStringArray.push(`${tableName} ${value}`);
      }
    });
    outputArray.push(
      util.format(
        query,
        tableStringArray.map((string) => `${TAB}${string}\n`).join('')
      )
    );
  });
  return outputArray.join('\n\n');
};

sqlController.createSqlScript = (_, res, next) => {
  try {
    res.locals.sqlscripts = {};
    for (const sheet in res.locals.dataTypes) {
      const query = composeSqlQuery(res.locals.dataTypes[sheet]);
      res.locals.sqlscripts[sheet] = query;
    }
    return next();
  } catch (error) {
    return next({
      log: error,
      status: 400,
      message: { err: error },
    });
  }
};

sqlController.addIds = (_, res, next) => {
  console.log('entering sqlController.addIds');
  try {
    for (const sheet in res.locals.dataTypes) {
      res.locals.dataTypes[sheet].forEach((obj) => {
        // add id col to each table
        obj.columns.unshift({
          _id: {
            primaryKey: true,
            type: 'SERIAL',
          },
        });
      });
    }
    return next();
  } catch (error) {
    return next({
      log: `Controller error in sqlController.addIds: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

sqlController.calcUniqueRowsInTablePairs = (_, res, next) => {
  console.log('entering sqlController.calcUniqueRows');
  // unique rows by table is calculated in `excelController.processFile`
  // when the rows are initially parsed by `xlsx.utils.sheet_to_json`
  // to reduce the number of iterations required to generate the data
  try {
    res.locals.uniqueRowsInTablePairs = {};
    for (const sheet in res.locals.dataByRows) {
      const rowsByTable = res.locals.dataByRows[sheet];
      const tableNames = res.locals.dataTypes[sheet].map((obj) => obj.table);

      // returns an array of all combinations of 2 tables as we need to compare each table vs every other table
      const tablePairs = new Iter(tableNames).combinations(2).toArray();

      // calculate the number of unique rows in each combination of two tables
      const uniqueRowsInTablePairs = {};
      for (let [pair1, pair2] of tablePairs) {
        const set = new Set();
        // TODO: Check and make sure the lengths between pairs are the same
        for (i = 0; i < rowsByTable[pair1].length; i++) {
          const rowCopy = JSON.stringify(
            Object.assign(rowsByTable[pair1][i], rowsByTable[pair2][i])
          );
          // add copied row to set
          set.add(rowCopy);
        }
        uniqueRowsInTablePairs[`${[pair1, pair2]}`] = set.size;
      }
      res.locals.uniqueRowsInTablePairs[sheet] = uniqueRowsInTablePairs;
    }
    return next();
  } catch (error) {
    return next({
      log: `Controller error in sqlController.getcalcUniqueRows: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

sqlController.getRelationships = (_, res, next) => {
  console.log('entering sqlController.getRelationships');

  try {
    // TODO: May need to confirm unique rows + in table pairs have the same sheets
    for (const sheet in res.locals.uniqueRowsInTablePairs) {
      const tablePairData = res.locals.uniqueRowsInTablePairs[sheet];
      const rowData = res.locals.uniqueRowsInTables[sheet];
      const dataTypeData = res.locals.dataTypes[sheet];

      const relationships = [];
      for (let pair in tablePairData) {
        const tables = pair.split(',');
        const pairCount = tablePairData[pair];
        const leftTableCount = rowData[tables[0]];
        const rightTableCount = rowData[tables[1]];
        const tempObj = {};

        if (pairCount > leftTableCount && pairCount > rightTableCount) {
          tempObj[tables[0]] = 'many';
          tempObj[tables[1]] = 'many';
          relationships.push(tempObj);
        } else if (
          pairCount === leftTableCount &&
          pairCount > rightTableCount
        ) {
          tempObj[tables[0]] = 'one';
          tempObj[tables[1]] = 'many';
          relationships.push(tempObj);
        } else if (
          pairCount > leftTableCount &&
          pairCount === rightTableCount
        ) {
          tempObj[tables[0]] = 'many';
          tempObj[tables[1]] = 'one';
          relationships.push(tempObj);
        } else if (leftTableCount === rightTableCount) {
          tempObj[tables[0]] = 'one';
          tempObj[tables[1]] = 'one';
          relationships.push(tempObj);
        }
      }
      // adds foreign key to left table, which points to right table's primary key
      const addForeignKey = (leftTableName, rightTableName) => {
        for (let obj of dataTypeData) {
          if (obj.table === leftTableName) {
            foreignKeyObj = {};
            foreignKeyObj[`${rightTableName}_id`] = {
              linkedTable: `${rightTableName}._id`,
              type: 'INT',
            };
            obj.columns.push(foreignKeyObj);
          }
        }
      };

      for (let relationship of relationships) {
        const relType = new Set(Object.values(relationship));
        const relTables = Object.keys(relationship);

        // if relationship is one-many, left table becomes "one" and right table becomes "many"
        if (relType.has('one') && relType.has('many')) {
          let leftTableName;
          let rightTableName;
          for (let tableName in relationship) {
            if (relationship[tableName] === 'one') leftTableName = tableName;
            else rightTableName = tableName;
          }

          addForeignKey(leftTableName, rightTableName);
        }

        // if relationship is one-one, use the first table as the left table
        // opportunity for improvement here - get user input on which table is the left table and/or let them update it after the fact and regenerate sql
        else if (relType.has('one')) {
          addForeignKey(relTables[0], relTables[1]);
        }

        // if relationship is many-many, add join table, then add both foreign keys to join table
        else if (relType.has('many')) {
          const joinTableName = `${relTables[0]}_${relTables[1]}`;
          const joinTable = {
            table: joinTableName,
            columns: [{ _id: { primaryKey: true, type: 'SERIAL' } }],
          };

          dataTypeData.push(joinTable);

          addForeignKey(joinTableName, relTables[0]);
          addForeignKey(joinTableName, relTables[1]);
        }
      }
    }
    return next();
  } catch (error) {
    return next({
      log: `Controller error in sqlController.getRelationships: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

module.exports = { sqlController, composeSqlQuery };
