const xlsx = require('xlsx'); // xlsx read/write parser
const Iter = require('es-iter'); // tool for calculating combinations

const excelController = {};

excelController.read = async (req, res, next) => {
  console.log('entering excelController.read');
  try {
    // Create an empty object so we can store multiple sheets in our res.locals
    // if necessary.
    res.locals.parsedXlsxToJSON = {};
    res.locals.raw = {};
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
      res.locals.parsedXlsxToJSON[`${sheet}`] = jsonData;
      //res.locals.parsedXlsxToJSON['INSERT_SHEET_NAME_HERE'];
    }

    res.locals.inputRows = res.locals.parsedXlsxToJSON['combined final'];
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
    const inputCols = {};
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
        if (key === 'release_date') inputCols[key].push(column[key] + ' ');
        else inputCols[key].push(column[key]);
      }
    }
    res.locals.inputCols = inputCols;
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

    // res.json(res.locals.colTypes)

    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.getDataTypes: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

excelController.getRelationships = async (req, res, next) => {
  console.log('entering excelController.tableLogic');

  // replace output and rows with res.locals once created
  const output = [
    {
      tableName: 'people',
      columns: [
        { name: "VARCHAR(255)" },
        { mass: "FLOAT" },
        { hair_color: "VARCHAR(255)" },
        { skin_color: "VARCHAR(255)" },
        { eye_color: "VARCHAR(255)" },
        { birth_year: "VARCHAR(255)" },
        { gender: "VARCHAR(255)" },
        { height: "INT" },
      ]
    },
    {
      tableName: 'species',
      columns: [
        { name: "VARCHAR(255)" },
        { classification: "VARCHAR(255)" },
        { average_height: "VARCHAR(255)" },
        { average_lifespan: "VARCHAR(255)" },
        { hair_colors: "VARCHAR(255)" },
        { skin_colors: "VARCHAR(255)" },
        { eye_colors: "VARCHAR(255)" },
        { language: "VARCHAR(255)" }
      ]
    },
    {
      tableName: 'films',
      columns: [
        { title: "VARCHAR(255)" },
        { director: "VARCHAR(255)" },
        { producer: "VARCHAR(255)" },
        { release_date: "DATE" }
      ]
    }
  ]

  const rows = [];
  for (let currRow of res.locals.inputRows) {
    const tempObj = { people: {}, species: {}, films: {} }
    const people = ['name', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender', 'height']
    const species = ['name2', 'classification', 'average_height', 'average_lifespan', 'hair_colors', 'skin_colors', 'eye_colors', 'language']
    const films = ['title', 'director', 'producer', 'release_date']

    for (let col of people) {
      tempObj.people[col] = currRow[col];
    }

    for (let col of species) {
      if (col === 'name2') {
        tempObj.species.name = currRow[col];
      } else {
        tempObj.species[col] = currRow[col];
      }
    }

    for (let col of films) {
      tempObj.films[col] = currRow[col];
    }

    rows.push(tempObj)
  }

  const tables = {};
  for (let obj of output) {
    // add id col to each table
    obj.columns.unshift({
      _id: {
        primaryKey: true, type: 'INT'
      }
    })

    // un-nest object for the sake of later table lookup
    const tempObj = {};
    for (let colObj of obj.columns) {
      for (let col in colObj) {
        tempObj[col] = colObj[col];
      }
    }
    tables[obj.tableName] = tempObj;
  }

  const tableNames = [];
  for (let key in rows[0]) {
    tableNames.push(key);
  }

  // calculate the number of unique rows in each table
  const uniqueRowsInTables = {};
  for (let tableName of tableNames) {
    const set = new Set;
    for (let row of rows) {
      set.add(JSON.stringify(row[tableName]))
    }
    uniqueRowsInTables[tableName] = set.size;
  }

  // returns an array of all combinations of 2 tables as we need to compare each table vs every other table
  const tablePairs = new Iter(tableNames).combinations(2).toArray();

  // calculate the number of unique rows in each combination of two tables
  const uniqueRowsInTablePairs = {};
  for (let pair of tablePairs) {
    const set = new Set;
    for (let row of rows) {
      // get a stringified copy of the current row that only includes the col names in the selected table pair
      const rowCopy = JSON.stringify(pair.reduce((newRow, key) =>
        (newRow[key] = row[key], newRow)
        , {}));

      // add copied row to set
      set.add(rowCopy);
    }
    uniqueRowsInTablePairs[pair] = set.size;
  }

  const relationships = [];
  for (let pair in uniqueRowsInTablePairs) {
    const tables = pair.split(',')
    const pairCount = uniqueRowsInTablePairs[pair];
    const leftTableCount = uniqueRowsInTables[tables[0]]
    const rightTableCount = uniqueRowsInTables[tables[1]]
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

  /*
  [
    {
      "people": "one",
      "species": "many"
    },
    {
      "people": "many",
      "films": "many"
    },
    {
      "species": "many",
      "films": "many"
    }
  ]
  */

  // adds foreign key to left table, which points to right table's primary key
  const addForeignKey = (leftTableName, rightTableName) => {
    for (let obj of output) {
      if (obj.tableName === leftTableName) {
        foreignKeyObj = {};
        foreignKeyObj[(`${rightTableName}_id`)] = {
          linkedTable: `${rightTableName}._id`,
          type: 'INT'
        }

        obj.columns.push(foreignKeyObj);
      }
    }
  };

  for (let relationship of relationships) {
    const relType = new Set(Object.values(relationship));

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

    // ONE-ONE NOT BUILT - COME BACK TO IT (no 1-1s in table)

    else if (relType.has('many')) {
      // add join table
      // add fk to join table with join table as left and each table in relationship as right
      const relTables = Object.keys(relationship)
      const joinTableName = `${relTables[0]}_${relTables[1]}`;
      const joinTable = {
        tableName: joinTableName,
        columns: [{ "_id": { primaryKey: true, type: 'INT' } }]
      };

      output.push(joinTable);

      addForeignKey(joinTableName, relTables[0])
      addForeignKey(joinTableName, relTables[1])
    }
  }

  res.json(output)



  /*  OUTPUT:
const DUMMY_DATA = [
  {
    table: {
      tableName: 'table1name',
      columns: [
        { column1Name: { primaryKey: true, type: 'number' } },
        { column2Name: 'string' },
        { column3Name: 'number' },
        { column4Name: 'boolean' },
        {
          column5Name: {
            linkedTable: 'table2Name.column1Name',
            type: 'number',
          },
        },
      ],
    },
  },
  {
    table: {
      tableName: 'table2name',
      columns: [
        { column1Name: { primaryKey: true, type: 'number' } },
        { column2Name: 'string' },
      ],
    },
  },
  {
    table: {
      tableName: 'table3name',
      columns: [
        { column1Name: { primaryKey: true, type: 'number' } },
        { column2Name: 'number' },
        { column3Name: 'string' },
        { column4Name: 'boolean' },
      ],
    },
  },
];
  */
};

module.exports = excelController;
