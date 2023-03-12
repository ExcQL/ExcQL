const express = require('express');
const router = express.Router();
const multer = require('multer');
const parse = multer();
// Multer is a node.js middleware for handling multipart/form-data
// We use multer to handle our data to our parser XLSX which is
// used in excelController.read
const excelController = require('../controllers/excelController');
const { sqlController } = require('../controllers/sqlController');

router.get('/', (req, res) => {});
router.post(
  '/',
  parse.any(),
  excelController.read,
  excelController.processFile,
  sqlController.addIds,
  sqlController.calcUniqueRowsInTablePairs,
  sqlController.getRelationships,
  sqlController.createSqlScript,
  (_, res) => {
    // This is somewhat of a workaround right now,
    // since the front end can only technically handle one sheet within one file
    // while the backend has the ability to handle multiple sheets
    const keys = Object.keys(res.locals.dataTypes);
    if (keys.length !== 1)
      return res.status(400).json({
        err: 'Expected data for one sheet only. Has the functionality changed?',
      });
    res.status(200).json({
      diagram: res.locals.dataTypes[keys[0]],
      script: res.locals.sqlscripts[keys[0]],
    });
  }
);
router.patch('/', (req, res) => {});
router.delete('/', (req, res) => {});

module.exports = router;
