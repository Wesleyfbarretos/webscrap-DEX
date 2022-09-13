CREATE TABLE pokemon (
	id SERIAL PRIMARY KEY,
	name VARCHAR  ( 50 ) UNIQUE NOT NULL
);

CREATE TABLE ability (
	id SERIAL PRIMARY KEY,
	name VARCHAR ( 50 ) UNIQUE,
	is_hidden BOOLEAN
);

CREATE TABLE pokemon_ability (
	id SERIAL PRIMARY KEY,
	id_pokemon SERIAL REFERENCES pokemon (id),
	id_ability SERIAL REFERENCES ability (id)
);


CREATE TABLE sprite (
	id SERIAL PRIMARY KEY,
	id_pokemon SERIAL REFERENCES pokemon (id),
	img TEXT UNIQUE,
	name TEXT
);


CREATE TABLE _type (
	id SERIAL PRIMARY KEY,
	name TEXT
);

CREATE TABLE poke_type (
	id SERIAL PRIMARY KEY,
	id_type SERIAL REFERENCES _type (id),
	id_pokemon SERIAL REFERENCES pokemon (id)
);


