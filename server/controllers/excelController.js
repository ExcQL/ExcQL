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

  // const tableData = {
  //   'name': 'people',
  //   'mass': 'people',
  //   'hair_color': 'people',
  //   'skin_color': 'people',
  //   'eye_color': 'people',
  //   'birth_year': 'people',
  //   'gender': 'people',
  //   'height': 'people',
  //   'name2': 'species',
  //   'classification': 'species',
  //   'average_height': 'species',
  //   'average_lifespan': 'species',
  //   'hair_colors': 'species',
  //   'skin_colors': 'species',
  //   'eye_colors': 'species',
  //   'language': 'species',
  //   'title': 'films',
  //   'director': 'films',
  //   'producer': 'films',
  //   'release_date': 'films'
  // }

  // // get array of distinct tables by first filtering thru a set
  // const tables = Array.from(new Set(Object.values(tableData)));
  // const output = [];
  // for (let table of tables) {
  //   output.push({
  //     table: table,
  //     columns: [

  //     ]
  //   })
  // }

  const output = [
    {
      table: 'people',
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
      table: 'species',
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
      table: 'films',
      columns: [
        { title: "VARCHAR(255)" },
        { director: "VARCHAR(255)" },
        { producer: "VARCHAR(255)" },
        { release_date: "DATE" }
      ]
    }
  ]

  console.log(output);
  res.json(res.locals);


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
