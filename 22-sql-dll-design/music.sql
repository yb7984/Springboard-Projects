-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY ,
  name TEXT NOT NULL
);
CREATE TABLE producers
(
  id SERIAL PRIMARY KEY ,
  name TEXT NOT NULL
);

CREATE TABLE albums
(
  id SERIAL PRIMARY KEY ,
  name TEXT NOT NULL
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  albumid INT REFERENCES albums(id)
);

CREATE TABLE songs_artists
(
  id SERIAL PRIMARY KEY,
  songid INT REFERENCES songs(id) ,
  artistid INT REFERENCES artists(id)
);

CREATE TABLE songs_producers
(
  id SERIAL PRIMARY KEY,
  songid INT REFERENCES songs(id) ,
  producerid INT REFERENCES producers(id)
);

INSERT INTO albums
  (name)
VALUES
  ('Silver Side Up'),
  ('Prism'),
  ('Hands All Over'),
  ('A Night at the Opera'),
  ('Middle of Nowhere'),
  ('Let Go'),
  ('The Writing''s on the Wall'),
  ('A Star Is Born'),
  ('Daydream'),
  ('The Blueprint 3');

INSERT INTO artists
  (name)
VALUES
  ('Hanson'),
  ('Queen'),
  ('Mariah Cary') ,
  ('Boyz II Men'),
  ('Lady Gaga') ,
  ('Bradley Cooper'),
  ('Nickelback'),
  ('Jay Z') ,
  ('Alicia Keys'),
  ('Katy Perry') ,
  ('Juicy J'),
  ('Maroon 5') ,
  ('Christina Aguilera'),
  ('Avril Lavigne'),
  ('Destiny''s Child');

INSERT INTO producers
  (name)
VALUES
  ('Dust Brothers') ,
  ('Stephen Lironi') ,
  ('Roy Thomas Baker') ,
  ('Walter Afanasieff') ,
  ('Benjamin Rice') ,
  ('Rick Parashar') ,
  ('Al Shux') ,
  ('Max Martin'),
  ('Cirku') ,
  ('Shellback'),
  ('Benny Blanco') ,
  ('The Matrix'),
  ('Darkchild');


INSERT INTO songs
  (title, duration_in_seconds, release_date, albumid)
VALUES
  ('MMMBop', 238, '04-15-1997', 5),
  ('Bohemian Rhapsody', 355, '10-31-1975', 4),
  ('One Sweet Day', 282, '11-14-1995' , 9),
  ('Shallow', 216, '09-27-2018', 8),
  ('How You Remind Me', 223, '08-21-2001', 1),
  ('New York State of Mind', 276, '10-20-2009', 10),
  ('Dark Horse', 215, '12-17-2013', 2),
  ('Moves Like Jagger', 201, '06-21-2011', 3),
  ('Complicated', 244, '05-14-2002', 6),
  ('Say My Name', 240, '11-07-1999', 7);


INSERT INTO songs_artists
  (songid , artistid)
VALUES
  (1 , 1),
  (2 , 2) ,
  (3 , 3) ,
  (3 , 4) ,
  (4 , 5) ,
  (4 , 6) ,
  (5 , 7) ,
  (6 , 8) ,
  (6 , 9) ,
  (7 , 10) ,
  (7 , 11) ,
  (8 , 12) ,
  (8 , 13) ,
  (9 , 14) ,
  (10 , 15);

INSERT INTO songs_producers
  (songid , producerid)
VALUES
  (1 , 1) ,
  (1 , 2) ,
  (2 , 3) ,
  (3 , 4) ,
  (4 , 5) ,
  (5 , 6) ,
  (6 , 7) ,
  (7 , 8) ,
  (7 , 9) ,
  (8 , 10) ,
  (8 , 11) ,
  (9 , 12) ,
  (10 , 13);