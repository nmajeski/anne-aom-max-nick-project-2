CREATE TABLE squirrel_census_data (
	id int NOT NULL PRIMARY KEY,
	x NUMERIC,
	y NUMERIC,
	unique_squirrel_id VARCHAR(255),
	hectare VARCHAR(3),
	shift VARCHAR(2),
	date VARCHAR(8),
	hectare_squirrel_number INT,
	age VARCHAR(255),
	primary_fur_color VARCHAR(255),
	highlight_fur_color VARCHAR(255),
	combination_of_primary_and_highlight_color VARCHAR(255),
	color_notes TEXT,
	location VARCHAR(255),
	above_ground_sighter_measurement VARCHAR(255),
	specific_location TEXT,
	running BOOLEAN,
	chasing BOOLEAN,
	climbing BOOLEAN,
	eating BOOLEAN,
	foraging BOOLEAN,
	other_activities TEXT,
	kuks BOOLEAN,
	quaas BOOLEAN,
	moans BOOLEAN,
	tail_flags BOOLEAN,
	tail_twitches BOOLEAN,
	approaches BOOLEAN,
	indifferent BOOLEAN,
	runs_from BOOLEAN,
	other_interactions TEXT,
	lat_long VARCHAR(255),
	zip_codes VARCHAR(5),
	community_districts INT,
	borough_boundaries INT,
	city_council_districts INT,
	police_precincts INT
);

CREATE TABLE squirrel_hectare_data (
	the_geom TEXT,
	id INT NOT NULL PRIMARY KEY,
	x_min NUMERIC,
	x_max NUMERIC,
	y_min NUMERIC,
	y_max NUMERIC
);

-- Imported the CSV files. No INSERT SQL necessary.

SELECT *
FROM squirrel_census_data;

SELECT *
FROM squirrel_hectare_data;