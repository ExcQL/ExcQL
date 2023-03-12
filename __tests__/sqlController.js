/**
 * @jest-environment node
 */

const { composeSqlQuery } = require('../server/controllers/sqlController');

describe('SQL Query generation unit tests', () => {
  // TODO: Unique, not null
  const sampleInput = [
    {
      table: 'people',
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
          column5Name: {
            linkedTable: 'species._id',
            type: 'SERIAL',
          },
        },
      ],
    },
    {
      table: 'species',
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
      table: 'films',
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

  it('generates query', () => {
    // TODO: add expects
    console.log(composeSqlQuery(sampleInput));
  });
});
