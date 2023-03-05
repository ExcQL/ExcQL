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
      //console.log(res.locals.parsedXlsxToJSON['INSERT_SHEET_NAME_HERE']);
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
  const rawDataOfCombinedFinal = res.locals.raw['combined final'];
  try {
    const inputRows = res.locals.inputRows;
    const inputCols = {};
    for (const dataPoint in rawDataOfCombinedFinal) {
      // Datapoints have a key value of letterNumber (A1)
      // We slice here from positon 1 and coerce the string version
      // of the number to become a number
      // Slight note here, we will have to change the method of finding the
      // number slightly since after Z columns, they show up as AA and on
      const currRowNumber = +dataPoint.slice(1, dataPoint.length);
      if (currRowNumber === 1) {
        // Column names will only come from row numbers equal to 1
        // These are column names initialized to an empty array
        inputCols[rawDataOfCombinedFinal[dataPoint].w] = [];
      } else break;
    }
    // Iterate through our inputRows => This is an array of objects for each row
    // Iterate through each property in the object and for matching column strings
    // push the value into our input columns corresponding array
    // arrOfColumns
    for (const row of inputRows) {
      for (const column in row) {
        inputCols[column].push(row[column]);
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

    for (let col in inputCols) {
      res.locals.colTypes[col] = getColType(inputCols[col]);
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
  inputCols = {
    name: [
      'Luke Skywalker',
      'Luke Skywalker',
      'C-3PO',
      'C-3PO',
      'C-3PO',
      'C-3PO',
      'R2-D2',
      'R2-D2',
      'R2-D2',
      'R2-D2',
      'Darth Vader',
      'Darth Vader',
      'Leia Organa',
      'Leia Organa',
      'Owen Lars',
      'Owen Lars',
      'Owen Lars',
    ],
    mass: [
      77, 77, 75, 75, 75, 75, 32, 32, 32, 32, 136, 136, 49, 49, 120, 120, 120,
    ],
    hair_color: [
      'blond',
      'blond',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'none',
      'none',
      'brown',
      'brown',
      'brown, grey',
      'brown, grey',
      'brown, grey',
    ],
    skin_color: [
      'fair',
      'fair',
      'gold',
      'gold',
      'gold',
      'gold',
      'white, blue',
      'white, blue',
      'white, blue',
      'white, blue',
      'white',
      'white',
      'light',
      'light',
      'light',
      'light',
      'light',
    ],
    eye_color: [
      'blue',
      'blue',
      'yellow',
      'yellow',
      'yellow',
      'yellow',
      'red',
      'red',
      'red',
      'red',
      'yellow',
      'yellow',
      'brown',
      'brown',
      'blue',
      'blue',
      'blue',
    ],
    birth_year: [
      '19BBY',
      '19BBY',
      '112BBY',
      '112BBY',
      '112BBY',
      '112BBY',
      '33BBY',
      '33BBY',
      '33BBY',
      '33BBY',
      '41.9BBY',
      '41.9BBY',
      '19BBY',
      '19BBY',
      '52BBY',
      '52BBY',
      '52BBY',
    ],
    gender: [
      'male',
      'male',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'male',
      'male',
      'female',
      'female',
      'male',
      'male',
      'male',
    ],
    height: [
      172, 172, 167, 167, 167, 167, 96, 96, 96, 96, 202, 202, 150, 150, 178,
      178, 178,
    ],
    name2: [
      'Human',
      'Human',
      'Droid',
      'Droid',
      'Droid',
      'Droid',
      'Droid',
      'Droid',
      'Droid',
      'Droid',
      'Human',
      'Human',
      'Human',
      'Human',
      'Human',
      'Human',
      'Human',
    ],
    classification: [
      'mammal',
      'mammal',
      'artificial',
      'artificial',
      'artificial',
      'artificial',
      'artificial',
      'artificial',
      'artificial',
      'artificial',
      'mammal',
      'mammal',
      'mammal',
      'mammal',
      'mammal',
      'mammal',
      'mammal',
    ],
    average_height: [
      180,
      180,
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      180,
      180,
      180,
      180,
      180,
      180,
      180,
    ],
    average_lifespan: [
      120,
      120,
      'indefinite',
      'indefinite',
      'indefinite',
      'indefinite',
      'indefinite',
      'indefinite',
      'indefinite',
      'indefinite',
      120,
      120,
      120,
      120,
      120,
      120,
      120,
    ],
    hair_colors: [
      'blonde, brown, black, red',
      'blonde, brown, black, red',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'blonde, brown, black, red',
      'blonde, brown, black, red',
      'blonde, brown, black, red',
      'blonde, brown, black, red',
      'blonde, brown, black, red',
      'blonde, brown, black, red',
      'blonde, brown, black, red',
    ],
    skin_colors: [
      'caucasian, black, asian, hispanic',
      'caucasian, black, asian, hispanic',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'caucasian, black, asian, hispanic',
      'caucasian, black, asian, hispanic',
      'caucasian, black, asian, hispanic',
      'caucasian, black, asian, hispanic',
      'caucasian, black, asian, hispanic',
      'caucasian, black, asian, hispanic',
      'caucasian, black, asian, hispanic',
    ],
    eye_colors: [
      'brown, blue, green, hazel, grey, amber',
      'brown, blue, green, hazel, grey, amber',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'brown, blue, green, hazel, grey, amber',
      'brown, blue, green, hazel, grey, amber',
      'brown, blue, green, hazel, grey, amber',
      'brown, blue, green, hazel, grey, amber',
      'brown, blue, green, hazel, grey, amber',
      'brown, blue, green, hazel, grey, amber',
      'brown, blue, green, hazel, grey, amber',
    ],
    language: [
      'Galactic Basic',
      'Galactic Basic',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'n/a',
      'Galactic Basic',
      'Galactic Basic',
      'Galactic Basic',
      'Galactic Basic',
      'Galactic Basic',
      'Galactic Basic',
      'Galactic Basic',
    ],
    title: [
      'A New Hope',
      'Revenge of the Sith',
      'A New Hope',
      'Attack of the Clones',
      'The Phantom Menace',
      'Revenge of the Sith',
      'A New Hope',
      'Attack of the Clones',
      'The Phantom Menace',
      'Revenge of the Sith',
      'A New Hope',
      'Revenge of the Sith',
      'A New Hope',
      'Revenge of the Sith',
      'A New Hope',
      'Attack of the Clones',
      'Revenge of the Sith',
    ],
    director: [
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
      'George Lucas',
    ],
    producer: [
      'Gary Kurtz, Rick McCallum',
      'Rick McCallum',
      'Gary Kurtz, Rick McCallum',
      'Rick McCallum',
      'Rick McCallum',
      'Rick McCallum',
      'Gary Kurtz, Rick McCallum',
      'Rick McCallum',
      'Rick McCallum',
      'Rick McCallum',
      'Gary Kurtz, Rick McCallum',
      'Rick McCallum',
      'Gary Kurtz, Rick McCallum',
      'Rick McCallum',
      'Gary Kurtz, Rick McCallum',
      'Rick McCallum',
      'Rick McCallum',
    ],
    release_date: [
      '5/25/1977',
      '5/19/2005',
      '5/25/1977',
      '5/16/2002',
      '5/19/1999',
      '5/19/2005',
      '5/25/1977',
      '5/16/2002',
      '5/19/1999',
      '5/19/2005',
      '5/25/1977',
      '5/19/2005',
      '5/25/1977',
      '5/19/2005',
      '5/25/1977',
      '5/16/2002',
      '5/19/2005',
    ],
  };

  res.locals.colUniqueCounts = {};

  for (let col in inputCols) {
    const set = new Set(inputCols[col]);
    const uniqueVals = set.size;

    res.locals.colUniqueCounts[col] = uniqueVals;
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
