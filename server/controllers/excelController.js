const xlsx = require('xlsx'); // xlsx read/write parser
const Iter = require('es-iter'); // tool for calculating combinations
const { table } = require('console');

const excelController = {};

excelController.read = async (req, res, next) => {
  console.log('entering excelController.read');
  try {
    // Create an empty object so we can store multiple sheets in our res.locals
    // if necessary.
    res.locals.parsedXlsxToJSON = {};
    res.locals.raw = {};
    res.locals.targetSheet = {};
    // When passed in data comes from multer, it is stored on req.files
    const { buffer } = req.files[0];
    //Read the buffer and access the data.
    const excelArrOfSheets = xlsx.read(buffer, {
      cellHTML: false,
      cellDates: true,
    }).Sheets;

    // Convert read XLSX to JSON and store the array of JSON objects in
    // a key associated with the sheet name.
    for (const sheet in excelArrOfSheets) {
      res.locals.raw[`${sheet}`] = excelArrOfSheets[sheet];
      const jsonData = xlsx.utils.sheet_to_json(excelArrOfSheets[sheet], {
        header: 0,
        defval: '',
      });
      res.locals.targetSheet = sheet;
      res.locals.parsedXlsxToJSON[`${sheet}`] = jsonData;
      //res.locals.parsedXlsxToJSON['INSERT_SHEET_NAME_HERE'];
    }

    res.locals.inputRows = res.locals.parsedXlsxToJSON[res.locals.targetSheet];
    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.read: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

excelController.convertInputs = async (req, res, next) => {
  console.log('entering excelController.convertInputs');
  try {
    const sample = { People: 'A', Species: 'I', Movies: 'Q' };
    const inputCols = {};
    let data;
    if (req.body.document) data = JSON.parse(req.body.document);

    const arrOfColumnLetters = [];
    const arrOfColumnNames = [];
    // Gets column names
    for (const column in res.locals.inputRows[0]) {
      arrOfColumnNames.push(column);
    }

    // Gets column letters and assign columns names to letters
    const objColumnLettersToNames = {};
    for (const column in res.locals.raw[res.locals.targetSheet]) {
      if (column !== '!ref' && column !== '!merges!') {
        let str = '';
        for (let i = 0; i < column.length; i++) {
          if (!+column[i]) {
            str += column[i];
            objColumnLettersToNames[
              res.locals.raw[res.locals.targetSheet][column].w
            ] = str;
          }
        }
        arrOfColumnLetters.push(str);
      }
      if (arrOfColumnLetters.length === arrOfColumnNames.length) break;
    }

    // Gets table boundaries
    const excelMap = { ...(data || sample) };
    const arrOfColLettersSample = Object.values(data || sample);
    const arrOfTableNames = Object.keys(data || sample);
    for (let i = 0; i < arrOfColLettersSample.length; i++) {
      if (arrOfColLettersSample[i + 1] === undefined) {
        excelMap[arrOfTableNames[i]] = `${arrOfColLettersSample[i]}:${
          arrOfColumnLetters[arrOfColumnLetters.length - 1]
        }`.split(':');
      } else {
        excelMap[arrOfTableNames[i]] = `${
          arrOfColLettersSample[i]
        }:${String.fromCharCode(
          arrOfColLettersSample[i + 1].charCodeAt() - 1
        )}`.split(':');
      }
    }

    for (const table in excelMap) {
      for (let i = 0; i < excelMap[table].length; i++) {
        let curr = excelMap[table][i];
        let next = excelMap[table][i + 1];
        if (curr && next) {
          if (curr.charCodeAt() + 1 !== next.charCodeAt()) {
            excelMap[table].splice(
              i + 1,
              0,
              String.fromCharCode(curr.charCodeAt() + 1)
            );
          }
        }
      }
    }
    const columnMap = {};
    res.locals.columnMap = columnMap;
    for (const table in excelMap) {
      for (const key in objColumnLettersToNames) {
        if (excelMap[table].includes(objColumnLettersToNames[key])) {
          columnMap[key] = table;
        }
      }
    }

    const rows = [];

    const rowObject = {};
    for (const tablenames of arrOfTableNames) {
      rowObject[tablenames] = {};
    }

    for (const row of res.locals.inputRows) {
      for (const columnName in row) {
        rowObject[columnMap[columnName]][columnName] = row[columnName];
      }
      const newObj = JSON.parse(JSON.stringify(rowObject));
      rows.push(newObj);
    }
    // ROWS IS OUR FINAL ROW DATA
    res.locals.dataRows = rows;

    // Rows contains objects for each entire row of data
    // Array that contains each row as an object
    // console.log(res.locals.inputRows);
    // You need an object with all table names as keys
    // Add Corresponding keys to the inputCols for each column found in inputRows
    for (const column in res.locals.inputRows[0]) {
      inputCols[column] = [];
    }
    // Tranpose the data so that we have each data point for each column
    // Iterate through our inputRows => This is an array of objects for each row
    // Iterate through each property in the object and for matching column strings
    // push the value into our input columns corresponding array
    for (const column of res.locals.inputRows) {
      for (const key in column) {
        if (key === 'release_date') {
          let dateString = (column[key] + ' ').slice(0, 15);
          inputCols[key].push(dateString);
        } else inputCols[key].push(column[key]);
      }
    }
    res.locals.inputCols = inputCols;

    /*
      const inputCols = {
        tableName: {
          column1:'test',
          column2:"test2"
        }
      }
       */
    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.convertInputs: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

excelController.getDataTypes = async (req, res, next) => {
  console.log('entering excelController.getDataTypes');
  // console.log(res.locals.inputCols['release_date']);
  // traverse values in each col to deduce sql data type
  // switch this to res.locals.inputCols
  try {
    res.locals.colTypes = {};

    const getColType = (colArr) => {
      // if data can coerce to date, date
      // if any piece of data is a string, set to varchar and exit
      // if there are conflicting data types, set to varchar and exit
      // if data is all numbers, check against floor -> if all nums === their floor, int, else float
      // if data is all t/f, bool
      let tempType;
      let numType;
      for (let val of colArr) {
        let currType;

        // get type of current data point
        if (!isNaN(Number(val))) currType = 'number';
        else if (Date.parse(val)) currType = 'date';
        else if (typeof val === 'boolean' || val === 'true' || val === 'false')
          currType = 'boolean';
        else currType = 'string';

        // compare to tempType (set in previous iterations of switch statement below)
        // if there are discrepancies default to string (varchar)
        if (tempType && currType !== tempType) return 'VARCHAR(255)';

        // further logic per type
        switch (currType) {
          case 'string':
            return 'VARCHAR(255)';
          case 'number':
            tempType = 'number';
            if (numType != 'float' && val === Math.floor(val)) {
              numType = 'int';
            } else {
              numType = 'float';
            }
            break;
          default:
            tempType = currType;
        }
      }

      if (tempType === 'number') return numType.toUpperCase();
      return tempType.toUpperCase();
    };

    for (let col in res.locals.inputCols) {
      res.locals.colTypes[col] = getColType(res.locals.inputCols[col]);
    }
    // console.log(res.locals.columnMap);
    // res.json(res.locals.colTypes);
    // console.log(res.locals.colTypes);
    const sample = { People: 'A', Species: 'I', Movies: 'Q' };
    const columnsArr = [];
    let data;
    if (req.body.document) data = JSON.parse(req.body.document);
    res.locals.output = res.locals.colTypes;
    // console.log(res.locals.columnMap);
    /*

    */
    for (const key in sample) {
      tempObj = {};
      tempObj.tableName = key;
      tempObj.columns = [];
      for (const column in res.locals.colTypes) {
        if (res.locals.columnMap[column] === key) {
          tempObj.columns.push({ [column]: res.locals.colTypes[column] });
        }
      }
      const newObj = JSON.parse(JSON.stringify(tempObj));
      columnsArr.push(newObj);
    }
    // for (const el of columnsArr) {
    //   console.log(el.columns);
    // }
    res.locals.output = columnsArr;
    console.log(res.locals.dataRows);
    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.getDataTypes: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

excelController.addIds = async (req, res, next) => {
  console.log('entering excelController.addIds');

  // REPLACE WITH BRIAN'S INPUT AND REMOVE THIS
  // res.locals.output = [
  //   {
  //     tableName: 'people',
  //     columns: [
  //       { name: 'VARCHAR(255)' },
  //       { mass: 'FLOAT' },
  //       { hair_color: 'VARCHAR(255)' },
  //       { skin_color: 'VARCHAR(255)' },
  //       { eye_color: 'VARCHAR(255)' },
  //       { birth_year: 'VARCHAR(255)' },
  //       { gender: 'VARCHAR(255)' },
  //       { height: 'INT' },
  //     ],
  //   },
  //   {
  //     tableName: 'species',
  //     columns: [
  //       { name: 'VARCHAR(255)' },
  //       { classification: 'VARCHAR(255)' },
  //       { average_height: 'VARCHAR(255)' },
  //       { average_lifespan: 'VARCHAR(255)' },
  //       { hair_colors: 'VARCHAR(255)' },
  //       { skin_colors: 'VARCHAR(255)' },
  //       { eye_colors: 'VARCHAR(255)' },
  //       { language: 'VARCHAR(255)' },
  //     ],
  //   },
  //   {
  //     tableName: 'films',
  //     columns: [
  //       { title: 'VARCHAR(255)' },
  //       { director: 'VARCHAR(255)' },
  //       { producer: 'VARCHAR(255)' },
  //       { release_date: 'DATE' },
  //     ],
  //   },
  // ];

  // const rows = [];
  // for (let currRow of res.locals.inputRows) {
  //   const tempObj = { people: {}, species: {}, films: {} };
  //   const people = [
  //     'name',
  //     'mass',
  //     'hair_color',
  //     'skin_color',
  //     'eye_color',
  //     'birth_year',
  //     'gender',
  //     'height',
  //   ];
  //   const species = [
  //     'name2',
  //     'classification',
  //     'average_height',
  //     'average_lifespan',
  //     'hair_colors',
  //     'skin_colors',
  //     'eye_colors',
  //     'language',
  //   ];
  //   const films = ['title', 'director', 'producer', 'release_date'];

  //   for (let col of people) {
  //     tempObj.people[col] = currRow[col];
  //   }

  //   for (let col of species) {
  //     if (col === 'name2') {
  //       tempObj.species.name = currRow[col];
  //     } else {
  //       tempObj.species[col] = currRow[col];
  //     }
  //   }

  //   for (let col of films) {
  //     tempObj.films[col] = currRow[col];
  //   }

  //   rows.push(tempObj);
  // }
  // res.locals.inputRows = rows;
  // // REPLACE WITH BRIAN'S INPUT AND REMOVE THIS ^^^^

  try {
    for (let obj of res.locals.output) {
      // add id col to each table
      obj.columns.unshift({
        _id: {
          primaryKey: true,
          type: 'SERIAL',
        },
      });
    }
    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.addIds: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

excelController.calcUniqueRows = async (req, res, next) => {
  console.log('entering excelController.calcUniqueRows');

  try {
    // can tableNames be passed in from another res.locals?
    const tableNames = [];
    for (let key in res.locals.dataRows[0]) {
      tableNames.push(key);
    }

    // calculate the number of unique rows in each table
    const uniqueRowsInTables = {};
    for (let tableName of tableNames) {
      const set = new Set();
      for (let row of res.locals.dataRows) {
        set.add(JSON.stringify(row[tableName]));
      }
      uniqueRowsInTables[tableName] = set.size;
    }
    res.locals.uniqueRowsInTables = uniqueRowsInTables;

    // returns an array of all combinations of 2 tables as we need to compare each table vs every other table
    const tablePairs = new Iter(tableNames).combinations(2).toArray();

    // calculate the number of unique rows in each combination of two tables
    const uniqueRowsInTablePairs = {};
    for (let pair of tablePairs) {
      const set = new Set();
      for (let row of res.locals.dataRows) {
        // get a stringified copy of the current row that only includes the col names in the selected table pair
        const rowCopy = JSON.stringify(
          pair.reduce((newRow, key) => ((newRow[key] = row[key]), newRow), {})
        );

        // add copied row to set
        set.add(rowCopy);
      }
      uniqueRowsInTablePairs[pair] = set.size;
    }
    res.locals.uniqueRowsInTablePairs = uniqueRowsInTablePairs;

    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.getcalcUniqueRows: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

excelController.getRelationships = async (req, res, next) => {
  console.log('entering excelController.getRelationships');

  try {
    const relationships = [];
    for (let pair in res.locals.uniqueRowsInTablePairs) {
      const tables = pair.split(',');
      const pairCount = res.locals.uniqueRowsInTablePairs[pair];
      const leftTableCount = res.locals.uniqueRowsInTables[tables[0]];
      const rightTableCount = res.locals.uniqueRowsInTables[tables[1]];
      const tempObj = {};

      if (pairCount > leftTableCount && pairCount > rightTableCount) {
        tempObj[tables[0]] = 'many';
        tempObj[tables[1]] = 'many';
        relationships.push(tempObj);
      } else if (pairCount === leftTableCount && pairCount > rightTableCount) {
        tempObj[tables[0]] = 'one';
        tempObj[tables[1]] = 'many';
        relationships.push(tempObj);
      } else if (pairCount > leftTableCount && pairCount === rightTableCount) {
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
      for (let obj of res.locals.output) {
        if (obj.tableName === leftTableName) {
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
          tableName: joinTableName,
          columns: [{ _id: { primaryKey: true, type: 'SERIAL' } }],
        };

        res.locals.output.push(joinTable);

        addForeignKey(joinTableName, relTables[0]);
        addForeignKey(joinTableName, relTables[1]);
      }
    }

    // res.json(res.locals.output)
    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.getRelationships: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

module.exports = excelController;
