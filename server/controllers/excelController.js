const xlsx = require('xlsx'); // xlsx read/write parser

const excelController = {};

const getColType = (val, expectedDataType) => {
  // if data can coerce to date, date
  // if any piece of data is a string, set to varchar and exit
  // if there are conflicting data types, set to varchar and exit
  // if data is all numbers, check against floor -> if all nums === their floor, int, else float
  // if data is all t/f, bool

  const expectedType = expectedDataType
    ? expectedDataType.toLowerCase()
    : expectedDataType;
  const INT = 'int';
  const FLOAT = 'float';
  const expectedNumberType = [INT, FLOAT];
  let currType;
  // get type of current data point
  if (!isNaN(Number(String(val))))
    currType = expectedType !== FLOAT && val === Math.floor(val) ? INT : FLOAT;
  else if (Date.parse(val)) currType = 'date';
  else if (typeof val === 'boolean' || val === 'true' || val === 'false')
    currType = 'boolean';
  else currType = 'string';

  if (
    expectedType &&
    expectedNumberType.includes(expectedType) &&
    expectedNumberType.includes(currType)
  )
    // Numbers can vary between `INT` and `FLOAT`, and there is logic above that handles current + expected comparison
    return currType.toUpperCase();
  else if ((expectedType && currType !== expectedType) || currType === 'string')
    // if there are discrepancies that is not int/float, default to string (varchar)
    return 'VARCHAR(255)';
  else return currType.toUpperCase();
};

excelController.read = (req, res, next) => {
  console.log('entering excelController.read');
  try {
    // When passed in data comes from multer, it is stored on req.files
    const { buffer } = req.files[0];
    //Read the buffer and access the data.
    res.locals.raw = xlsx.read(buffer, {
      cellHTML: false,
      cellDates: true,
    }).Sheets;
    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.read: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

excelController.processFile = (req, res, next) => {
  console.log('entering excelController.processFile');
  try {
    const cleanColumnLetter = (letter) => letter.replace(/[0-9]/g, '');
    const isColumnNameRow = (letter) => /.*1$/.test(letter);

    const getNormalizedData = (data, startLetter, endLetter) => {
      endLetter = endLetter === undefined ? startLetter : endLetter;
      // https://github.com/SheetJS/sheetjs/issues/728#issuecomment-314665126
      let range = xlsx.utils.decode_range(data['!ref']);
      range.s.c = xlsx.utils.decode_col(startLetter);
      range.e.c = xlsx.utils.decode_col(endLetter);
      const newRange = xlsx.utils.encode_range(range);
      return xlsx.utils.sheet_to_json(data, {
        header: 0,
        defval: '',
        range: newRange,
      });
    };
    const mapping = JSON.parse(req.body.document);

    res.locals.dataByRows = {};
    res.locals.dataTypes = {};
    res.locals.uniqueRowsInTables = {};

    for (const sheet in res.locals.raw) {
      const data = res.locals.raw[sheet];

      // Getting a sense of what the data boundaries in terms of column letters are
      // Helps set up the ability to parse data by column or rows per DB table
      const columnLetters = Object.keys(data)
        .filter((letter) => isColumnNameRow(letter))
        .map((letter) => cleanColumnLetter(letter));

      if (columnLetters.length === 0) continue;

      // construct DB table name to file column letter mapping
      const tableNames = Object.keys(mapping);
      const tableToColumnMapping = {};
      for (let i = 0; i < tableNames.length; i++) {
        const tableName = tableNames[i];
        const currentLetter = mapping[tableName];
        const startIndex = columnLetters.indexOf(currentLetter);
        const nextLetter = mapping[tableNames[i + 1]];
        if (nextLetter === undefined) {
          tableToColumnMapping[tableName] = columnLetters.slice(startIndex);
        } else {
          const endIndex = columnLetters.indexOf(nextLetter);
          if (endIndex === -1)
            throw new Error(
              `Cannot find table boundaries for table ${tableName}`
            );
          tableToColumnMapping[tableName] = columnLetters.slice(
            startIndex,
            endIndex
          );
        }
      }

      // Parse data by row and columns separately
      // and calculate the number of unique rows in each table
      // for examining the relationships between the data later
      const databyRows = {};
      const dataTypes = [];
      const uniqueRowsCount = {};
      Object.keys(tableToColumnMapping).forEach((table) => {
        const range = tableToColumnMapping[table];

        // Rows
        const uniqueRows = new Set();
        const jsonRowData = getNormalizedData(
          data,
          range[0],
          range[range.length - 1]
        );
        jsonRowData.forEach((row) => uniqueRows.add(JSON.stringify(row)));
        uniqueRowsCount[table] = uniqueRows.size;
        databyRows[table] = jsonRowData;

        // Columns - primarily for checking data types
        dataTypePerTable = [];
        range.forEach((letter) => {
          let columnName;
          let expectedDataType;
          // Get the column data of a given letter, then look through
          // each object ({<column name> : <cell value>}) to determine
          // column name and data type of the cell value
          getNormalizedData(data, letter).forEach((obj) => {
            // column name
            const name = Object.keys(obj);
            if (name.length !== 1)
              throw new Error('Found unexpected number of names per cell.');
            else if (columnName !== undefined && columnName !== name[0])
              throw new Error(
                'Found more than one column name values per column.'
              );
            else if (columnName === undefined) columnName = name[0];

            // cell value
            const value = Object.values(obj);
            if (value.length !== 1)
              throw new Error('Found unexpected number of values per cell.');
            expectedDataType = getColType(value[0], expectedDataType);
          });
          const dataTypeObj = {};
          dataTypeObj[columnName] = expectedDataType;
          dataTypePerTable.push(dataTypeObj);
        });
        dataTypes.push({ table: table, columns: dataTypePerTable });
      });
      res.locals.uniqueRowsInTables[sheet] = uniqueRowsCount;
      res.locals.dataByRows[sheet] = databyRows;
      res.locals.dataTypes[sheet] = dataTypes;
    }
    if (
      Object.keys(res.locals.uniqueRowsInTables).length !== 1 ||
      Object.keys(res.locals.dataByRows).length !== 1 ||
      Object.keys(res.locals.dataTypes).length !== 1
    )
      // Note that this is a front-end limitation, not the backend
      throw new Error(
        'Application currently does not support parsing more than one sheet per file.'
      );
    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.processFile: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};

module.exports = excelController;
