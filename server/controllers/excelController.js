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
        if (tempType && currType !== tempType) return 'varchar';

        // further logic per type
        switch (currType) {
          case 'string':
            return 'varchar';
          case 'number':
            tempType = 'number';
            if (numType != 'float' && val === Math.floor(val)) {
              numType = 'integer';
            } else {
              numType = 'float';
            }
            break;
          default:
            tempType = currType;
        }
      }

      if (tempType === 'number') return numType;
      return tempType;
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

excelController.countValues = async (req, res, next) => {
  console.log('entering excelController.countValues');

  // get number of unique vals in each col
  // switch this to res.locals.inputCols
  try {
    res.locals.colUniqueCounts = {};

    for (let col in res.locals.inputCols) {
      const set = new Set(res.locals.inputCols[col]);
      const uniqueVals = set.size;

      res.locals.colUniqueCounts[col] = uniqueVals;
    }
    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.countValues: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
  // res.json(res.locals.colUniqueCounts)
};

excelController.tableLogic = async (req, res, next) => {
  console.log('entering excelController.tableLogic');

  /*
  start to put logic together to figure out where breaking points are for each table
  rough idea:
    compare groups of cols that have the same number of unique values to see if they are complete dups,
    i.e., if A, B, and C each have 4 unique values, compare the combined value of A+B+C to confirm if there
    are also 4 unique combinations -> if yes, A, B, C are a table
    if no -> break into subsets of unique combinations and ??
  */

  const cols = Object.keys(res.locals.inputCols);
  const rows = res.locals.inputRows;
  // get unique combinations of col names using Iter
  // for each set of column names, determine whether there is a unique set of rows within those cols
  // consolidate, i.e., if A-B-C-D go together then A-B-C, A-B, A-C, A-D, B-C.... can be removed
  // ** this should be done first for time complexity

  const nestedCombos = [];
  // for (i = cols.length + 1; i > 1; i--) {
  for (i = 2; i < cols.length + 1; i++) {
    nestedCombos.push(new Iter(cols).combinations(i).toArray());
  }

  const combos = nestedCombos.flat();
  const tables = [];

  for (let combo of combos) {
    const set = new Set();

    for (let row of rows) {
      // get a stringified copy of the current row that only includes the col names in the selected combo
      const rowCopy = JSON.stringify(
        combo.reduce((newRow, key) => ((newRow[key] = row[key]), newRow), {})
      );

      // add copied row to set
      set.add(rowCopy);
    }

    // if the number of rows in the set is the same as the number of rows in the spreadsheet, this cannot be a table
    // if it is less, it may be a table
    if (set.size !== rows.length) {
      tables.push(combo);
    }

    // ****additional filtering of possible tables definitely needed***
  }

  // console.log(tables);
  res.json(tables.length);

  /*  OUTPUT:
  {
    table1Name: {
      column1Name: {primaryKey: true, type: “number”},
      column2Name: “string”,
      column3Name: “number”,
      column4Name: “boolean”,
      column5Name: {linkedTable: table2Name.column2Name, type: “number”}
    },
    table2Name: {
      column1Name: {primaryKey: true, type: “number”},
      column2Name: “string”
    }
  }

  in this example column 1 is the primary key for table 1, and it links to table
  2's second column via the foreign key stored in column 5
  */
};

module.exports = excelController;
