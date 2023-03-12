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
  sqlController.calcUniqueRows,
  sqlController.getRelationships,
  (req, res) => {
    res.json(res.locals.dataTypes);
  }
);
router.patch('/', (req, res) => {});
router.delete('/', (req, res) => {});

module.exports = router;
