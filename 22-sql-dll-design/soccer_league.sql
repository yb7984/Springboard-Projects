DROP DATABASE IF EXISTS soccer_league;
CREATE DATABASE soccer_league;

\c soccer_league;

CREATE TABLE "team" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50)
);

CREATE INDEX team_name ON team(name);

CREATE TABLE "player" (
  "id" SERIAL PRIMARY KEY,
  "teamid" INT REFERENCES team(id),
  "last_name" VARCHAR(50),
  "first_name" VARCHAR(50)
);

CREATE INDEX player_name ON player(first_name , last_name);

CREATE TABLE "referee" (
  "id" SERIAL PRIMARY KEY,
  "last_name" VARCHAR(50),
  "first_name" VARCHAR(50)
);
CREATE INDEX referee_name ON referee(first_name , last_name);

CREATE TABLE "season" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50),
  "start_date" TIMESTAMP,
  "end_date" TIMESTAMP
);

CREATE TABLE "match" (
  "id" SERIAL PRIMARY KEY,
  "mdate" TIMESTAMP,
  "seasonid" INT REFERENCES season(id),
  "team1" INT REFERENCES team(id),
  "team2" INT REFERENCES team(id)
);

CREATE TABLE "match_referee" (
  "id" SERIAL PRIMARY KEY,
  "matchid" INT REFERENCES match(id),
  "refereeid" INT REFERENCES referee(id),
  "ismain" BOOLEAN DEFAULT TRUE
);

CREATE TABLE "goal" (
  "id" SERIAL PRIMARY KEY,
  "seasonid" INT REFERENCES season(id),
  "matchid" INT REFERENCES match(id),
  "playerid" INT REFERENCES player(id),
  "goaltime" INT,
  "owngoal" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "season_standing" (
  "id" SERIAL PRIMARY KEY,
  "seasonid" INT REFERENCES season(id),
  "teamid" INT REFERENCES team(id),
  "standings" INT ,
  "rankings" INT
);


INSERT INTO team (name) VALUES 
  ('team1') ,
  ('team2') ,
  ('team3');


INSERT INTO player (teamid , first_name , last_name) VALUES
  (1 , 'p1' , 'A') ,
  (2 , 'p2' , 'B') ,
  (3 , 'p3' , 'C') ,
  (1 , 'p4' , 'D') ,
  (2 , 'p5' , 'E') ,
  (3 , 'p6' , 'F') ,
  (1 , 'p7' , 'G');

INSERT INTO referee (first_name , last_name) VALUES
  ('r1' , 'H') ,
  ('r2' , 'I') ,
  ('r3' , 'J') ;

INSERT INTO season (name , start_date , end_date) VALUES
  ('2019' , '2019-10-1' , '2020-7-1'), 
  ('2020' , '2020-10-1' , '2021-7-1');


INSERT INTO match (mdate , seasonid , team1 , team2) VALUES
  ('2019-11-1' , 1 , 1 , 2) ,
  ('2019-12-1' , 1 , 3 , 2) ,
  ('2019-12-20' , 1 , 1 , 3) ,
  ('2020-1-1' , 1 , 1 , 2) ,
  ('2020-12-1' , 2 , 2 , 3) ,
  ('2020-12-11' , 2 , 1 , 2);


INSERT INTO match_referee (matchid , refereeid , ismain) VALUES
  (1 , 1 , TRUE) ,
  (1 , 2 , FALSE) ,
  (2 , 2 , TRUE) ,
  (2 , 3 , FALSE) ,
  (3 , 3 , TRUE) ,
  (3 , 1 , FALSE);


INSERT INTO goal (seasonid , matchid , playerid , goaltime , owngoal) VALUES
  (1 , 1 , 1 , 120 , FALSE),
  (1 , 2 , 2 , 1200 , FALSE) ,
  (2 , 5 , 3 , 240 , FALSE);


INSERT INTO season_standing (seasonid , teamid , standings , rankings) VALUES
  (1 , 1, 1 , 5) ,
  (1 , 2 , 2 , 3) ,
  (1 , 3 , 3 , 4) ,
  (2 , 1 , 1 , 5) ,
  (2 , 2 , 3 , 5) ,
  (2 , 3 , 2 , 5);