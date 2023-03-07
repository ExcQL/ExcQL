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
const a = {
  _id: 4,
  title: 'Revenge of the Sith',
  episode_id: 3,
  director: 'George Lucas',
  producer: 'Rick McCallum',
  release_date: '2005-05-19T07:00:00.000Z',
};
const rows = [
  {
    people: {
      name: 'Luke Skywalker',
      mass: 77,
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      height: 172,
    },
    species: {
      name: 'Human',
      classification: 'mammal',
      average_height: 180,
      average_lifespan: 120,
      hair_colors: 'blonde, brown, black, red',
      skin_colors: 'caucasian, black, asian, hispanic',
      eye_colors: 'brown, blue, green, hazel, grey, amber',
      language: 'Galactic Basic',
    },
    films: {
      title: 'A New Hope',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25T04:00:00.000Z',
    },
  },
];
