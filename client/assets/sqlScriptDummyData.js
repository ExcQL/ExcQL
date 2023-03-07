export const DUMMY_SQL_SCRIPT = `
    CREATE TABLE IF NOT EXISTS people (
        _id SERIAL PRIMARY KEY
        name VARCHAR(255)
        mass FLOAT
        hair_color VARCHAR(255)
        skin_color VARCHAR(255)
        eye_color VARCHAR(255)
        birth_year VARCHAR(255)
        gender VARCHAR(255)
        height INT
        species_id INT REFERENCES species(_id)
    );

    CREATE TABLE IF NOT EXISTS species (
        _id SERIAL PRIMARY KEY
        name VARCHAR(255)
        classification VARCHAR(255)
        average_height VARCHAR(255)
        average_lifespan VARCHAR(255)
        hair_colors VARCHAR(255)
        skin_colors VARCHAR(255)
        eye_colors VARCHAR(255)
        language VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS films (
        _id SERIAL PRIMARY KEY
        title VARCHAR(255)
        director VARCHAR(255)
        producer VARCHAR(255)
        release_date DATE
    );
`;