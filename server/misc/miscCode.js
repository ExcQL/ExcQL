const arrOfRows = [];
let prevRow;
let columnArr = [];
let i = 0;
const row = {};
// Create base object to store key value pairs for each row
for (const dataPoint in excelObj) {
  const currRowNumber = +dataPoint.slice(1, dataPoint.length);
  // if (prevRow !== currRowNumber && currRowNumber > 2) {
  //   // this means we have reached a new row AND we are not reading the
  //   // first row
  //   i = 0;
  //   arrOfRows.push({ ...row });
  // }
  // if we are reading from the 2nd row and on
  // assign the properties in the row obj to the data point
  if (currRowNumber > 1 && !['!ref', '!merges!'].includes(dataPoint)) {
    row[columnArr[i]] = excelObj[dataPoint].w;
    i++;
    if (i >= columnArr.length) {
      arrOfRows.push({ ...row });
      i = 0;
    }
  }
  // console.log(dataPoint, excelObj[dataPoint]);
  // else, we know that we are reading from the first row so we build
  // the properties that will belong in our row object and the array
  // helps us keep track of what data is coming in for the row object
  if (currRowNumber <= 1) {
    row[excelObj[dataPoint].w] = ''; // Initialize to empty string
    columnArr.push(excelObj[dataPoint].w); // These are column names
  }
  prevRow = currRowNumber;
}

res.locals.output = [
  {
    tableName: 'people',
    columns: [
      { name: 'VARCHAR(255)' },
      { mass: 'FLOAT' },
      { hair_color: 'VARCHAR(255)' },
      { skin_color: 'VARCHAR(255)' },
      { eye_color: 'VARCHAR(255)' },
      { birth_year: 'VARCHAR(255)' },
      { gender: 'VARCHAR(255)' },
      { height: 'INT' },
    ],
  },
  {
    tableName: 'species',
    columns: [
      { name: 'VARCHAR(255)' },
      { classification: 'VARCHAR(255)' },
      { average_height: 'VARCHAR(255)' },
      { average_lifespan: 'VARCHAR(255)' },
      { hair_colors: 'VARCHAR(255)' },
      { skin_colors: 'VARCHAR(255)' },
      { eye_colors: 'VARCHAR(255)' },
      { language: 'VARCHAR(255)' },
    ],
  },
  {
    tableName: 'films',
    columns: [
      { title: 'VARCHAR(255)' },
      { director: 'VARCHAR(255)' },
      { producer: 'VARCHAR(255)' },
      { release_date: 'DATE' },
    ],
  },
];

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
