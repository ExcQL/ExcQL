const xlsx = require('xlsx'); // xlsx read/write parser

const excelController = {};
excelController.read = async (req, res, next) => {
  try {
    // When passed in data comes from multer, it is stored on req.files
    const { buffer } = req.files[0];
    console.log('BUFFER:', buffer);
    //Read the buffer and access the data.
    console.log(xlsx.read(buffer).Sheets.Sheet1);
    res.json({ message: 'From excelController' });
  } catch (error) {
    return next({
      log: `Controller error in excelController.read: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
};
module.exports = excelController;

/*
{
  A1: { t: 's', v: '_id', r: '<t>_id</t>', h: '_id', w: '_id' },
  B1: { t: 's', v: 'title', r: '<t>title</t>', h: 'title', w: 'title' },
  C1: {
    t: 's',
    v: 'episode_id',
    r: '<t>episode_id</t>',
    h: 'episode_id',
    w: 'episode_id'
  },
  D1: {
    t: 's',
    v: 'director',
    r: '<t>director</t>',
    h: 'director',
    w: 'director'
  },
  E1: {
    t: 's',
    v: 'producer',
    r: '<t>producer</t>',
    h: 'producer',
    w: 'producer'
  },
  F1: {
    t: 's',
    v: 'release_date',
    r: '<t>release_date</t>',
    h: 'release_date',
    w: 'release_date'
  },
  A2: { t: 'n', v: 1, w: '1' },
  B2: {
    t: 's',
    v: 'A New Hope',
    r: '<t>A New Hope</t>',
    h: 'A New Hope',
    w: 'A New Hope'
  },
  C2: { t: 'n', v: 4, w: '4' },
  D2: {
    t: 's',
    v: 'George Lucas',
    r: '<t>George Lucas</t>',
    h: 'George Lucas',
    w: 'George Lucas'
  },
  E2: {
    t: 's',
    v: 'Gary Kurtz, Rick McCallum',
    r: '<t>Gary Kurtz, Rick McCallum</t>',
    h: 'Gary Kurtz, Rick McCallum',
    w: 'Gary Kurtz, Rick McCallum'
  },
  F2: { t: 'n', v: 28270, w: '5/25/77' },
  A3: { t: 'n', v: 5, w: '5' },
  B3: {
    t: 's',
    v: 'Attack of the Clones',
    r: '<t>Attack of the Clones</t>',
    h: 'Attack of the Clones',
    w: 'Attack of the Clones'
  },
  C3: { t: 'n', v: 2, w: '2' },
  D3: {
    t: 's',
    v: 'George Lucas',
    r: '<t>George Lucas</t>',
    h: 'George Lucas',
    w: 'George Lucas'
  },
  E3: {
    t: 's',
    v: 'Rick McCallum',
    r: '<t>Rick McCallum</t>',
    h: 'Rick McCallum',
    w: 'Rick McCallum'
  },
  F3: { t: 'n', v: 37392, w: '5/16/02' },
  A4: { t: 'n', v: 4, w: '4' },
  B4: {
    t: 's',
    v: 'The Phantom Menace',
    r: '<t>The Phantom Menace</t>',
    h: 'The Phantom Menace',
    w: 'The Phantom Menace'
  },
  C4: { t: 'n', v: 1, w: '1' },
  D4: {
    t: 's',
    v: 'George Lucas',
    r: '<t>George Lucas</t>',
    h: 'George Lucas',
    w: 'George Lucas'
  },
  E4: {
    t: 's',
    v: 'Rick McCallum',
    r: '<t>Rick McCallum</t>',
    h: 'Rick McCallum',
    w: 'Rick McCallum'
  },
  F4: { t: 'n', v: 36299, w: '5/19/99' },
  A5: { t: 'n', v: 6, w: '6' },
  B5: {
    t: 's',
    v: 'Revenge of the Sith',
    r: '<t>Revenge of the Sith</t>',
    h: 'Revenge of the Sith',
    w: 'Revenge of the Sith'
  },
  C5: { t: 'n', v: 3, w: '3' },
  D5: {
    t: 's',
    v: 'George Lucas',
    r: '<t>George Lucas</t>',
    h: 'George Lucas',
    w: 'George Lucas'
  },
  E5: {
    t: 's',
    v: 'Rick McCallum',
    r: '<t>Rick McCallum</t>',
    h: 'Rick McCallum',
    w: 'Rick McCallum'
  },
  F5: { t: 'n', v: 38491, w: '5/19/05' },
  A6: { t: 'n', v: 3, w: '3' },
  B6: {
    t: 's',
    v: 'Return of the Jedi',
    r: '<t>Return of the Jedi</t>',
    h: 'Return of the Jedi',
    w: 'Return of the Jedi'
  },
  C6: { t: 'n', v: 6, w: '6' },
  D6: {
    t: 's',
    v: 'Richard Marquand',
    r: '<t>Richard Marquand</t>',
    h: 'Richard Marquand',
    w: 'Richard Marquand'
  },
  E6: {
    t: 's',
    v: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
    r: '<t>Howard G. Kazanjian, George Lucas, Rick McCallum</t>',
    h: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
    w: 'Howard G. Kazanjian, George Lucas, Rick McCallum'
  },
  F6: { t: 'n', v: 30461, w: '5/25/83' },
  '!ref': 'A1:F6'
}
*/
