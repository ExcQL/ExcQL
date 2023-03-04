const xlsx = require('xlsx'); // xlsx read/write parser

const excelController = {};
excelController.read = async (req, res, next) => {
  console.log('entering excelController.read')
  try {
    // When passed in data comes from multer, it is stored on req.files
    const { buffer } = req.files[0];
    console.log('BUFFER:', buffer);
    //Read the buffer and access the data.
    console.log(xlsx.read(buffer).Sheets.Sheet1);
    // res.json({ message: 'From excelController' });
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
  console.log('entering excelController.convertInputs')

  // replace with Brian's inputs

  try {
    res.locals.inputRows = [
      {
        name: "Luke Skywalker",
        mass: 77,
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        height: 172,
        name2: "Human",
        classification: "mammal",
        average_height: 180,
        average_lifespan: 120,
        hair_colors: "blonde, brown, black, red",
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        language: "Galactic Basic",
        title: "A New Hope",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "5/25/1977"
      },
      {
        name: "Luke Skywalker",
        mass: 77,
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        height: 172,
        name2: "Human",
        classification: "mammal",
        average_height: 180,
        average_lifespan: 120,
        hair_colors: "blonde, brown, black, red",
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        language: "Galactic Basic",
        title: "Revenge of the Sith",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/19/2005"
      },
      {
        name: "C-3PO",
        mass: 75,
        hair_color: "n/a",
        skin_color: "gold",
        eye_color: "yellow",
        birth_year: "112BBY",
        gender: "n/a",
        height: 167,
        name2: "Droid",
        classification: "artificial",
        average_height: "n/a",
        average_lifespan: "indefinite",
        hair_colors: "n/a",
        skin_colors: "n/a",
        eye_colors: "n/a",
        language: "n/a",
        title: "A New Hope",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "5/25/1977"
      },
      {
        name: "C-3PO",
        mass: 75,
        hair_color: "n/a",
        skin_color: "gold",
        eye_color: "yellow",
        birth_year: "112BBY",
        gender: "n/a",
        height: 167,
        name2: "Droid",
        classification: "artificial",
        average_height: "n/a",
        average_lifespan: "indefinite",
        hair_colors: "n/a",
        skin_colors: "n/a",
        eye_colors: "n/a",
        language: "n/a",
        title: "Attack of the Clones",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/16/2002"
      },
      {
        name: "C-3PO",
        mass: 75,
        hair_color: "n/a",
        skin_color: "gold",
        eye_color: "yellow",
        birth_year: "112BBY",
        gender: "n/a",
        height: 167,
        name2: "Droid",
        classification: "artificial",
        average_height: "n/a",
        average_lifespan: "indefinite",
        hair_colors: "n/a",
        skin_colors: "n/a",
        eye_colors: "n/a",
        language: "n/a",
        title: "The Phantom Menace",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/19/1999"
      },
      {
        name: "C-3PO",
        mass: 75,
        hair_color: "n/a",
        skin_color: "gold",
        eye_color: "yellow",
        birth_year: "112BBY",
        gender: "n/a",
        height: 167,
        name2: "Droid",
        classification: "artificial",
        average_height: "n/a",
        average_lifespan: "indefinite",
        hair_colors: "n/a",
        skin_colors: "n/a",
        eye_colors: "n/a",
        language: "n/a",
        title: "Revenge of the Sith",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/19/2005"
      },
      {
        name: "R2-D2",
        mass: 32,
        hair_color: "n/a",
        skin_color: "white, blue",
        eye_color: "red",
        birth_year: "33BBY",
        gender: "n/a",
        height: 96,
        name2: "Droid",
        classification: "artificial",
        average_height: "n/a",
        average_lifespan: "indefinite",
        hair_colors: "n/a",
        skin_colors: "n/a",
        eye_colors: "n/a",
        language: "n/a",
        title: "A New Hope",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "5/25/1977"
      },
      {
        name: "R2-D2",
        mass: 32,
        hair_color: "n/a",
        skin_color: "white, blue",
        eye_color: "red",
        birth_year: "33BBY",
        gender: "n/a",
        height: 96,
        name2: "Droid",
        classification: "artificial",
        average_height: "n/a",
        average_lifespan: "indefinite",
        hair_colors: "n/a",
        skin_colors: "n/a",
        eye_colors: "n/a",
        language: "n/a",
        title: "Attack of the Clones",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/16/2002"
      },
      {
        name: "R2-D2",
        mass: 32,
        hair_color: "n/a",
        skin_color: "white, blue",
        eye_color: "red",
        birth_year: "33BBY",
        gender: "n/a",
        height: 96,
        name2: "Droid",
        classification: "artificial",
        average_height: "n/a",
        average_lifespan: "indefinite",
        hair_colors: "n/a",
        skin_colors: "n/a",
        eye_colors: "n/a",
        language: "n/a",
        title: "The Phantom Menace",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/19/1999"
      },
      {
        name: "R2-D2",
        mass: 32,
        hair_color: "n/a",
        skin_color: "white, blue",
        eye_color: "red",
        birth_year: "33BBY",
        gender: "n/a",
        height: 96,
        name2: "Droid",
        classification: "artificial",
        average_height: "n/a",
        average_lifespan: "indefinite",
        hair_colors: "n/a",
        skin_colors: "n/a",
        eye_colors: "n/a",
        language: "n/a",
        title: "Revenge of the Sith",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/19/2005"
      },
      {
        name: "Darth Vader",
        mass: 136,
        hair_color: "none",
        skin_color: "white",
        eye_color: "yellow",
        birth_year: "41.9BBY",
        gender: "male",
        height: 202,
        name2: "Human",
        classification: "mammal",
        average_height: 180,
        average_lifespan: 120,
        hair_colors: "blonde, brown, black, red",
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        language: "Galactic Basic",
        title: "A New Hope",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "5/25/1977"
      },
      {
        name: "Darth Vader",
        mass: 136,
        hair_color: "none",
        skin_color: "white",
        eye_color: "yellow",
        birth_year: "41.9BBY",
        gender: "male",
        height: 202,
        name2: "Human",
        classification: "mammal",
        average_height: 180,
        average_lifespan: 120,
        hair_colors: "blonde, brown, black, red",
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        language: "Galactic Basic",
        title: "Revenge of the Sith",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/19/2005"
      },
      {
        name: "Leia Organa",
        mass: 49,
        hair_color: "brown",
        skin_color: "light",
        eye_color: "brown",
        birth_year: "19BBY",
        gender: "female",
        height: 150,
        name2: "Human",
        classification: "mammal",
        average_height: 180,
        average_lifespan: 120,
        hair_colors: "blonde, brown, black, red",
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        language: "Galactic Basic",
        title: "A New Hope",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "5/25/1977"
      },
      {
        name: "Leia Organa",
        mass: 49,
        hair_color: "brown",
        skin_color: "light",
        eye_color: "brown",
        birth_year: "19BBY",
        gender: "female",
        height: 150,
        name2: "Human",
        classification: "mammal",
        average_height: 180,
        average_lifespan: 120,
        hair_colors: "blonde, brown, black, red",
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        language: "Galactic Basic",
        title: "Revenge of the Sith",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/19/2005"
      },
      {
        name: "Owen Lars",
        mass: 120,
        hair_color: "brown, grey",
        skin_color: "light",
        eye_color: "blue",
        birth_year: "52BBY",
        gender: "male",
        height: 178,
        name2: "Human",
        classification: "mammal",
        average_height: 180,
        average_lifespan: 120,
        hair_colors: "blonde, brown, black, red",
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        language: "Galactic Basic",
        title: "A New Hope",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "5/25/1977"
      },
      {
        name: "Owen Lars",
        mass: 120,
        hair_color: "brown, grey",
        skin_color: "light",
        eye_color: "blue",
        birth_year: "52BBY",
        gender: "male",
        height: 178,
        name2: "Human",
        classification: "mammal",
        average_height: 180,
        average_lifespan: 120,
        hair_colors: "blonde, brown, black, red",
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        language: "Galactic Basic",
        title: "Attack of the Clones",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/16/2002"
      },
      {
        name: "Owen Lars",
        mass: 120,
        hair_color: "brown, grey",
        skin_color: "light",
        eye_color: "blue",
        birth_year: "52BBY",
        gender: "male",
        height: 178,
        name2: "Human",
        classification: "mammal",
        average_height: 180,
        average_lifespan: 120,
        hair_colors: "blonde, brown, black, red",
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        language: "Galactic Basic",
        title: "Revenge of the Sith",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "5/19/2005"
      }
    ]

    res.locals.inputCols = {
      name: ["Luke Skywalker", "Luke Skywalker", "C-3PO", "C-3PO", "C-3PO", "C-3PO", "R2-D2", "R2-D2", "R2-D2", "R2-D2", "Darth Vader", "Darth Vader", "Leia Organa", "Leia Organa", "Owen Lars", "Owen Lars", "Owen Lars"],
      mass: [77, 77, 75, 75, 75, 75, 32, 32, 32, 32, 136, 136, 49, 49, 120, 120, 120],
      hair_color: ["blond", "blond", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "none", "none", "brown", "brown", "brown, grey", "brown, grey", "brown, grey"],
      skin_color: ["fair", "fair", "gold", "gold", "gold", "gold", "white, blue", "white, blue", "white, blue", "white, blue", "white", "white", "light", "light", "light", "light", "light"],
      eye_color: ["blue", "blue", "yellow", "yellow", "yellow", "yellow", "red", "red", "red", "red", "yellow", "yellow", "brown", "brown", "blue", "blue", "blue"],
      birth_year: ["19BBY", "19BBY", "112BBY", "112BBY", "112BBY", "112BBY", "33BBY", "33BBY", "33BBY", "33BBY", "41.9BBY", "41.9BBY", "19BBY", "19BBY", "52BBY", "52BBY", "52BBY"],
      gender: ["male", "male", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "male", "male", "female", "female", "male", "male", "male"],
      height: [172, 172, 167, 167, 167, 167, 96, 96, 96, 96, 202, 202, 150, 150, 178, 178, 178],
      name2: ["Human", "Human", "Droid", "Droid", "Droid", "Droid", "Droid", "Droid", "Droid", "Droid", "Human", "Human", "Human", "Human", "Human", "Human", "Human"],
      classification: ["mammal", "mammal", "artificial", "artificial", "artificial", "artificial", "artificial", "artificial", "artificial", "artificial", "mammal", "mammal", "mammal", "mammal", "mammal", "mammal", "mammal"],
      average_height: [180, 180, "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", 180, 180, 180, 180, 180, 180, 180],
      average_lifespan: [120, 120, "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", 120, 120, 120, 120, 120, 120, 120],
      hair_colors: ["blonde, brown, black, red", "blonde, brown, black, red", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red"],
      skin_colors: ["caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic"],
      eye_colors: ["brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber"],
      language: ["Galactic Basic", "Galactic Basic", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic"],
      title: ["A New Hope", "Revenge of the Sith", "A New Hope", "Attack of the Clones", "The Phantom Menace", "Revenge of the Sith", "A New Hope", "Attack of the Clones", "The Phantom Menace", "Revenge of the Sith", "A New Hope", "Revenge of the Sith", "A New Hope", "Revenge of the Sith", "A New Hope", "Attack of the Clones", "Revenge of the Sith"],
      director: ["George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas"],
      producer: ["Gary Kurtz, Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Rick McCallum"],
      release_date: ["5/25/1977", "5/19/2005", "5/25/1977", "5/16/2002", "5/19/1999", "5/19/2005", "5/25/1977", "5/16/2002", "5/19/1999", "5/19/2005", "5/25/1977", "5/19/2005", "5/25/1977", "5/19/2005", "5/25/1977", "5/16/2002", "5/19/2005"]
    }

    return next();
  } catch (error) {
    return next({
      log: `Controller error in excelController.convertInputs: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
}

excelController.getDataTypes = async (req, res, next) => {
  console.log('entering excelController.getDataTypes')

  // traverse values in each col to deduce sql data type

  // switch this to res.locals.inputCols
  inputCols = {
    name: ["Luke Skywalker", "Luke Skywalker", "C-3PO", "C-3PO", "C-3PO", "C-3PO", "R2-D2", "R2-D2", "R2-D2", "R2-D2", "Darth Vader", "Darth Vader", "Leia Organa", "Leia Organa", "Owen Lars", "Owen Lars", "Owen Lars"],
    mass: [77, 77, 75, 75, 75, 75, 32, 32, 32, 32, 136, 136, 49, 49, 120, 120, 120],
    hair_color: ["blond", "blond", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "none", "none", "brown", "brown", "brown, grey", "brown, grey", "brown, grey"],
    skin_color: ["fair", "fair", "gold", "gold", "gold", "gold", "white, blue", "white, blue", "white, blue", "white, blue", "white", "white", "light", "light", "light", "light", "light"],
    eye_color: ["blue", "blue", "yellow", "yellow", "yellow", "yellow", "red", "red", "red", "red", "yellow", "yellow", "brown", "brown", "blue", "blue", "blue"],
    birth_year: ["19BBY", "19BBY", "112BBY", "112BBY", "112BBY", "112BBY", "33BBY", "33BBY", "33BBY", "33BBY", "41.9BBY", "41.9BBY", "19BBY", "19BBY", "52BBY", "52BBY", "52BBY"],
    gender: ["male", "male", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "male", "male", "female", "female", "male", "male", "male"],
    height: [172, 172, 167, 167, 167, 167, 96, 96, 96, 96, 202, 202, 150, 150, 178, 178, 178],
    name2: ["Human", "Human", "Droid", "Droid", "Droid", "Droid", "Droid", "Droid", "Droid", "Droid", "Human", "Human", "Human", "Human", "Human", "Human", "Human"],
    classification: ["mammal", "mammal", "artificial", "artificial", "artificial", "artificial", "artificial", "artificial", "artificial", "artificial", "mammal", "mammal", "mammal", "mammal", "mammal", "mammal", "mammal"],
    average_height: [180, 180, "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", 180, 180, 180, 180, 180, 180, 180],
    average_lifespan: [120, 120, "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", 120, 120, 120, 120, 120, 120, 120],
    hair_colors: ["blonde, brown, black, red", "blonde, brown, black, red", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red"],
    skin_colors: ["caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic"],
    eye_colors: ["brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber"],
    language: ["Galactic Basic", "Galactic Basic", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic"],
    title: ["A New Hope", "Revenge of the Sith", "A New Hope", "Attack of the Clones", "The Phantom Menace", "Revenge of the Sith", "A New Hope", "Attack of the Clones", "The Phantom Menace", "Revenge of the Sith", "A New Hope", "Revenge of the Sith", "A New Hope", "Revenge of the Sith", "A New Hope", "Attack of the Clones", "Revenge of the Sith"],
    director: ["George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas"],
    producer: ["Gary Kurtz, Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Rick McCallum"],
    release_date: ["5/25/1977", "5/19/2005", "5/25/1977", "5/16/2002", "5/19/1999", "5/19/2005", "5/25/1977", "5/16/2002", "5/19/1999", "5/19/2005", "5/25/1977", "5/19/2005", "5/25/1977", "5/19/2005", "5/25/1977", "5/16/2002", "5/19/2005"]
  };

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
        else if (
          typeof val === 'boolean'
          || val === 'true'
          || val === 'false') currType = 'boolean';
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
            } else { numType = 'float' }
            break;
          default:
            tempType = currType;
        };
      }

      if (tempType === 'number') return numType;
      return tempType;
    }

    for (let col in inputCols) {
      res.locals.colTypes[col] = getColType(inputCols[col]);
    }

    res.json(res.locals.colTypes)

    // return next()
  } catch (error) {
    return next({
      log: `Controller error in excelController.getDataTypes: ${error}`,
      status: 400,
      message: { err: error },
    });
  }
}

excelController.countValues = async (req, res, next) => {
  console.log('entering excelController.countValues')

  // get number of unique vals in each col

  // switch this to res.locals.inputCols
  inputCols = {
    name: ["Luke Skywalker", "Luke Skywalker", "C-3PO", "C-3PO", "C-3PO", "C-3PO", "R2-D2", "R2-D2", "R2-D2", "R2-D2", "Darth Vader", "Darth Vader", "Leia Organa", "Leia Organa", "Owen Lars", "Owen Lars", "Owen Lars"],
    mass: [77, 77, 75, 75, 75, 75, 32, 32, 32, 32, 136, 136, 49, 49, 120, 120, 120],
    hair_color: ["blond", "blond", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "none", "none", "brown", "brown", "brown, grey", "brown, grey", "brown, grey"],
    skin_color: ["fair", "fair", "gold", "gold", "gold", "gold", "white, blue", "white, blue", "white, blue", "white, blue", "white", "white", "light", "light", "light", "light", "light"],
    eye_color: ["blue", "blue", "yellow", "yellow", "yellow", "yellow", "red", "red", "red", "red", "yellow", "yellow", "brown", "brown", "blue", "blue", "blue"],
    birth_year: ["19BBY", "19BBY", "112BBY", "112BBY", "112BBY", "112BBY", "33BBY", "33BBY", "33BBY", "33BBY", "41.9BBY", "41.9BBY", "19BBY", "19BBY", "52BBY", "52BBY", "52BBY"],
    gender: ["male", "male", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "male", "male", "female", "female", "male", "male", "male"],
    height: [172, 172, 167, 167, 167, 167, 96, 96, 96, 96, 202, 202, 150, 150, 178, 178, 178],
    name2: ["Human", "Human", "Droid", "Droid", "Droid", "Droid", "Droid", "Droid", "Droid", "Droid", "Human", "Human", "Human", "Human", "Human", "Human", "Human"],
    classification: ["mammal", "mammal", "artificial", "artificial", "artificial", "artificial", "artificial", "artificial", "artificial", "artificial", "mammal", "mammal", "mammal", "mammal", "mammal", "mammal", "mammal"],
    average_height: [180, 180, "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", 180, 180, 180, 180, 180, 180, 180],
    average_lifespan: [120, 120, "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", "indefinite", 120, 120, 120, 120, 120, 120, 120],
    hair_colors: ["blonde, brown, black, red", "blonde, brown, black, red", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red", "blonde, brown, black, red"],
    skin_colors: ["caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic", "caucasian, black, asian, hispanic"],
    eye_colors: ["brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber", "brown, blue, green, hazel, grey, amber"],
    language: ["Galactic Basic", "Galactic Basic", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic", "Galactic Basic"],
    title: ["A New Hope", "Revenge of the Sith", "A New Hope", "Attack of the Clones", "The Phantom Menace", "Revenge of the Sith", "A New Hope", "Attack of the Clones", "The Phantom Menace", "Revenge of the Sith", "A New Hope", "Revenge of the Sith", "A New Hope", "Revenge of the Sith", "A New Hope", "Attack of the Clones", "Revenge of the Sith"],
    director: ["George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas", "George Lucas"],
    producer: ["Gary Kurtz, Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Gary Kurtz, Rick McCallum", "Rick McCallum", "Rick McCallum"],
    release_date: ["5/25/1977", "5/19/2005", "5/25/1977", "5/16/2002", "5/19/1999", "5/19/2005", "5/25/1977", "5/16/2002", "5/19/1999", "5/19/2005", "5/25/1977", "5/19/2005", "5/25/1977", "5/19/2005", "5/25/1977", "5/16/2002", "5/19/2005"]
  }

  for (let col in inputCols) {
    const set = new Set(inputCols[col]);
    const uniqueVals = set.size;
  }
}

excelController.tableLogic = async (req, res, next) => {
  console.log('entering excelController.tableLogic')

  /*
  start to put logic together to figure out where breaking points are for each table
  rough idea: 
    compare groups of cols that have the same number of unique values to see if they are complete dups, 
    i.e., if A, B, and C each have 4 unique values, compare the combined value of A+B+C to confirm if there 
    are also 4 unique combinations -> if yes, A, B, C are a table
    if no -> break into subsets of unique combinations and ??
  */

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
}

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
