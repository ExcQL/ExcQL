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
        height: {
          linkedTable: 'species.average_height',
          type: 'INT',
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
];

export default DUMMY_DATA;
