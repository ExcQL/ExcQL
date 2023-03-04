const { json } = require('stream/consumers');
const xlsx = require('xlsx'); // xlsx read/write parser

const excelController = {};
excelController.read = async (req, res, next) => {
  try {
    // When passed in data comes from multer, it is stored on req.files
    const { buffer } = req.files[0];
    //Read the buffer and access the data.
    const excelObj = xlsx.read(buffer, {
      cellHTML: false,
      cellDates: true,
    }).Sheets.Sheet1; // Huge Object
    // Convert read XLSX to JSON
    var jsonData = xlsx.utils.sheet_to_json(excelObj, {
      header: 0,
      defval: '',
      dateNF: 'mm"."dd"."yyyy',
    });

    res.locals.parsedXlsxToJSON = jsonData;
    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.read: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};
module.exports = excelController;
