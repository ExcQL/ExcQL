const DUMMY_DATA = [
  {
    tableName: 'people',
    columns: [
      {
        _id: {
          primaryKey: true,
          type: 'SERIAL',
        },
      },
      {
        name: 'VARCHAR(255)',
      },
      {
        mass: 'FLOAT',
      },
      {
        hair_color: 'VARCHAR(255)',
      },
      {
        skin_color: 'VARCHAR(255)',
      },
      {
        eye_color: 'VARCHAR(255)',
      },
      {
        birth_year: 'VARCHAR(255)',
      },
      {
        gender: 'VARCHAR(255)',
      },
      {
        height: 'INT',
      },
      {
        species_id: {
          linkedTable: 'species._id',
          type: 'SERIAL',
        },
      },
    ],
  },
  {
    tableName: 'species',
    columns: [
      {
        _id: {
          primaryKey: true,
          type: 'SERIAL',
        },
      },
      {
        name: 'VARCHAR(255)',
      },
      {
        classification: 'VARCHAR(255)',
      },
      {
        average_height: 'VARCHAR(255)',
      },
      {
        average_lifespan: 'VARCHAR(255)',
      },
      {
        hair_colors: 'VARCHAR(255)',
      },
      {
        skin_colors: 'VARCHAR(255)',
      },
      {
        eye_colors: 'VARCHAR(255)',
      },
      {
        language: 'VARCHAR(255)',
      },
    ],
  },
  {
    tableName: 'films',
    columns: [
      {
        _id: {
          primaryKey: true,
          type: 'SERIAL',
        },
      },
      {
        title: 'VARCHAR(255)',
      },
      {
        director: 'VARCHAR(255)',
      },
      {
        producer: 'VARCHAR(255)',
      },
      {
        release_date: 'DATE',
      },
    ],
  },
  {
    tableName: 'people_films',
    columns: [
      {
        _id: {
          primaryKey: true,
          type: 'SERIAL',
        },
      },
      {
        people_id: {
          linkedTable: 'people._id',
          type: 'SERIAL',
        },
      },
      {
        films_id: {
          linkedTable: 'films._id',
          type: 'SERIAL',
        },
      },
    ],
  },
  {
    tableName: 'species_films',
    columns: [
      {
        _id: {
          primaryKey: true,
          type: 'SERIAL',
        },
      },
      {
        species_id: {
          linkedTable: 'species._id',
          type: 'SERIAL',
        },
      },
      {
        films_id: {
          linkedTable: 'films._id',
          type: 'SERIAL',
        },
      },
    ],
  },
];

export default DUMMY_DATA;
