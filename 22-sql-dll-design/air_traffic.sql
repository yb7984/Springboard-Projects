-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic
CREATE TABLE country
(
  id SERIAL PRIMARY KEY ,
  name TEXT NOT NULL
);

CREATE TABLE city
(
  id SERIAL PRIMARY KEY ,
  countryid INT REFERENCES country(id),
  name TEXT NOT NULL
);
CREATE TABLE airline
(
  id SERIAL PRIMARY KEY ,
  name TEXT NOT NULL
);

CREATE TABLE customer
(
  id SERIAL PRIMARY KEY ,
  first_name TEXT NOT NULL ,
  last_name TEXT NOT NULL
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  customerid INT REFERENCES customer(id),
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airlineid INT REFERENCES airline(id),
  from_city INT REFERENCES city(id),
  to_city INT REFERENCES city(id)
);

INSERT INTO country
  (name)
VALUES
  ('United States') ,
  ('Japan') ,
  ('United Kingdom') ,
  ('Mexico') ,
  ('France') ,
  ('Morocco') ,
  ('UAE') ,
  ('China') ,
  ('Brazil') ,
  ('Chile');

INSERT INTO city
  (countryid , name)
VALUES
  (1 , 'Washington DC') ,
  (1 , 'Los Angeles') ,
  (1 , 'Seattle'),
  (1 , 'New York'),
  (1 , 'Cedar Rapids'),
  (1 , 'Charlotte') ,
  (1 , 'Las Vegas') ,
  (1 , 'Chicago') ,
  (1 , 'New Orleans') ,
  (2 , 'Tokyo') ,
  (3 , 'London') ,
  (4 , 'Mexico City') ,
  (5 , 'Paris') ,
  (6 , 'Casablanca') ,
  (7 , 'Dubai') ,
  (8 , 'China') ,
  (9 , 'Sao Paolo') ,
  (10 , 'Santiago');

INSERT INTO customer
  (first_name , last_name)
VALUES
  ('Waneta' , 'Skeleton') ,
  ('Jennifer' , 'Finch') ,
  ('Alvin'  , 'Leathes') ,
  ('Berkie' , 'Wycliff'),
  ('Thadeus' , 'Gathercoal'),
  ('Cory'   , 'Squibbes'),
  ('Sonja'  , 'Pauley');

INSERT INTO airline
  (name)
VALUES
  ('United'),
  ('Delta') ,
  ('Avianca Brasil'),
  ('Air China') ,
  ('TUI Fly Belgium'),
  ('American Airlines'),
  ('British Airways');



INSERT INTO tickets
  (customerid, seat, departure, arrival, airlineid, from_city, to_city)
VALUES
  (2, '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 1, 3),
  (5 , '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 7, 10, 11),
  (7 , '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 2, 2, 7),
  (2, '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 2, 3, 12),
  (1, '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 5, 13, 14),
  (5, '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 4, 15, 16),
  (4, '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 1, 4, 6),
  (3, '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 6, 5, 8),
  (4, '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 6, 6, 9),
  (6, '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 3, 17, 18);