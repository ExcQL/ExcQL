const inputCols = {
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
    172, 172, 167, 167, 167, 167, 96, 96, 96, 96, 202, 202, 150, 150, 178, 178,
    178,
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

const inputRows = [
  {
    name: 'Luke Skywalker',
    mass: 77,
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    height: 172,
    name2: 'Human',
    classification: 'mammal',
    average_height: 180,
    average_lifespan: 120,
    hair_colors: 'blonde, brown, black, red',
    skin_colors: 'caucasian, black, asian, hispanic',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    language: 'Galactic Basic',
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '5/25/1977',
  },
  {
    name: 'Luke Skywalker',
    mass: 77,
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    height: 172,
    name2: 'Human',
    classification: 'mammal',
    average_height: 180,
    average_lifespan: 120,
    hair_colors: 'blonde, brown, black, red',
    skin_colors: 'caucasian, black, asian, hispanic',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    language: 'Galactic Basic',
    title: 'Revenge of the Sith',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/19/2005',
  },
  {
    name: 'C-3PO',
    mass: 75,
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
    height: 167,
    name2: 'Droid',
    classification: 'artificial',
    average_height: 'n/a',
    average_lifespan: 'indefinite',
    hair_colors: 'n/a',
    skin_colors: 'n/a',
    eye_colors: 'n/a',
    language: 'n/a',
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '5/25/1977',
  },
  {
    name: 'C-3PO',
    mass: 75,
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
    height: 167,
    name2: 'Droid',
    classification: 'artificial',
    average_height: 'n/a',
    average_lifespan: 'indefinite',
    hair_colors: 'n/a',
    skin_colors: 'n/a',
    eye_colors: 'n/a',
    language: 'n/a',
    title: 'Attack of the Clones',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/16/2002',
  },
  {
    name: 'C-3PO',
    mass: 75,
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
    height: 167,
    name2: 'Droid',
    classification: 'artificial',
    average_height: 'n/a',
    average_lifespan: 'indefinite',
    hair_colors: 'n/a',
    skin_colors: 'n/a',
    eye_colors: 'n/a',
    language: 'n/a',
    title: 'The Phantom Menace',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/19/1999',
  },
  {
    name: 'C-3PO',
    mass: 75,
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
    height: 167,
    name2: 'Droid',
    classification: 'artificial',
    average_height: 'n/a',
    average_lifespan: 'indefinite',
    hair_colors: 'n/a',
    skin_colors: 'n/a',
    eye_colors: 'n/a',
    language: 'n/a',
    title: 'Revenge of the Sith',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/19/2005',
  },
  {
    name: 'R2-D2',
    mass: 32,
    hair_color: 'n/a',
    skin_color: 'white, blue',
    eye_color: 'red',
    birth_year: '33BBY',
    gender: 'n/a',
    height: 96,
    name2: 'Droid',
    classification: 'artificial',
    average_height: 'n/a',
    average_lifespan: 'indefinite',
    hair_colors: 'n/a',
    skin_colors: 'n/a',
    eye_colors: 'n/a',
    language: 'n/a',
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '5/25/1977',
  },
  {
    name: 'R2-D2',
    mass: 32,
    hair_color: 'n/a',
    skin_color: 'white, blue',
    eye_color: 'red',
    birth_year: '33BBY',
    gender: 'n/a',
    height: 96,
    name2: 'Droid',
    classification: 'artificial',
    average_height: 'n/a',
    average_lifespan: 'indefinite',
    hair_colors: 'n/a',
    skin_colors: 'n/a',
    eye_colors: 'n/a',
    language: 'n/a',
    title: 'Attack of the Clones',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/16/2002',
  },
  {
    name: 'R2-D2',
    mass: 32,
    hair_color: 'n/a',
    skin_color: 'white, blue',
    eye_color: 'red',
    birth_year: '33BBY',
    gender: 'n/a',
    height: 96,
    name2: 'Droid',
    classification: 'artificial',
    average_height: 'n/a',
    average_lifespan: 'indefinite',
    hair_colors: 'n/a',
    skin_colors: 'n/a',
    eye_colors: 'n/a',
    language: 'n/a',
    title: 'The Phantom Menace',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/19/1999',
  },
  {
    name: 'R2-D2',
    mass: 32,
    hair_color: 'n/a',
    skin_color: 'white, blue',
    eye_color: 'red',
    birth_year: '33BBY',
    gender: 'n/a',
    height: 96,
    name2: 'Droid',
    classification: 'artificial',
    average_height: 'n/a',
    average_lifespan: 'indefinite',
    hair_colors: 'n/a',
    skin_colors: 'n/a',
    eye_colors: 'n/a',
    language: 'n/a',
    title: 'Revenge of the Sith',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/19/2005',
  },
  {
    name: 'Darth Vader',
    mass: 136,
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    height: 202,
    name2: 'Human',
    classification: 'mammal',
    average_height: 180,
    average_lifespan: 120,
    hair_colors: 'blonde, brown, black, red',
    skin_colors: 'caucasian, black, asian, hispanic',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    language: 'Galactic Basic',
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '5/25/1977',
  },
  {
    name: 'Darth Vader',
    mass: 136,
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    height: 202,
    name2: 'Human',
    classification: 'mammal',
    average_height: 180,
    average_lifespan: 120,
    hair_colors: 'blonde, brown, black, red',
    skin_colors: 'caucasian, black, asian, hispanic',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    language: 'Galactic Basic',
    title: 'Revenge of the Sith',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/19/2005',
  },
  {
    name: 'Leia Organa',
    mass: 49,
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'brown',
    birth_year: '19BBY',
    gender: 'female',
    height: 150,
    name2: 'Human',
    classification: 'mammal',
    average_height: 180,
    average_lifespan: 120,
    hair_colors: 'blonde, brown, black, red',
    skin_colors: 'caucasian, black, asian, hispanic',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    language: 'Galactic Basic',
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '5/25/1977',
  },
  {
    name: 'Leia Organa',
    mass: 49,
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'brown',
    birth_year: '19BBY',
    gender: 'female',
    height: 150,
    name2: 'Human',
    classification: 'mammal',
    average_height: 180,
    average_lifespan: 120,
    hair_colors: 'blonde, brown, black, red',
    skin_colors: 'caucasian, black, asian, hispanic',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    language: 'Galactic Basic',
    title: 'Revenge of the Sith',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/19/2005',
  },
  {
    name: 'Owen Lars',
    mass: 120,
    hair_color: 'brown, grey',
    skin_color: 'light',
    eye_color: 'blue',
    birth_year: '52BBY',
    gender: 'male',
    height: 178,
    name2: 'Human',
    classification: 'mammal',
    average_height: 180,
    average_lifespan: 120,
    hair_colors: 'blonde, brown, black, red',
    skin_colors: 'caucasian, black, asian, hispanic',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    language: 'Galactic Basic',
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '5/25/1977',
  },
  {
    name: 'Owen Lars',
    mass: 120,
    hair_color: 'brown, grey',
    skin_color: 'light',
    eye_color: 'blue',
    birth_year: '52BBY',
    gender: 'male',
    height: 178,
    name2: 'Human',
    classification: 'mammal',
    average_height: 180,
    average_lifespan: 120,
    hair_colors: 'blonde, brown, black, red',
    skin_colors: 'caucasian, black, asian, hispanic',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    language: 'Galactic Basic',
    title: 'Attack of the Clones',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/16/2002',
  },
  {
    name: 'Owen Lars',
    mass: 120,
    hair_color: 'brown, grey',
    skin_color: 'light',
    eye_color: 'blue',
    birth_year: '52BBY',
    gender: 'male',
    height: 178,
    name2: 'Human',
    classification: 'mammal',
    average_height: 180,
    average_lifespan: 120,
    hair_colors: 'blonde, brown, black, red',
    skin_colors: 'caucasian, black, asian, hispanic',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    language: 'Galactic Basic',
    title: 'Revenge of the Sith',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '5/19/2005',
  },
];

const inputColss = {
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
    172, 172, 167, 167, 167, 167, 96, 96, 96, 96, 202, 202, 150, 150, 178, 178,
    178,
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
