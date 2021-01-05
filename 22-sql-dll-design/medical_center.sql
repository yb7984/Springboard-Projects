DROP DATABASE IF EXISTS medical_center;
CREATE DATABASE medical_center;

\c medical_center;

CREATE TABLE medical_center (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(50) ,
    location VARCHAR(100)
);

CREATE INDEX mc_name ON medical_center(name);

CREATE TABLE doctor (
    id SERIAL PRIMARY KEY,
    mcid INT REFERENCES medical_center(id) ,
    first_name VARCHAR(50) ,
    last_name VARCHAR(50)
);

CREATE INDEX doctor_name ON doctor(first_name , last_name);

CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) ,
    last_name VARCHAR(50)
);

CREATE INDEX patient_name ON patient(first_name , last_name);


CREATE TABLE disease(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE INDEX disease_name ON disease(name);


CREATE TABLE visit (
    id SERIAL PRIMARY KEY,
    mcid INT REFERENCES medical_center(id) ,
    doctorid INT REFERENCES doctor(id) ,
    patientid INT REFERENCES patient(id),
    visit_date TIMESTAMP
);

CREATE TABLE visit_disease(
    id SERIAL PRIMARY KEY,
    visitid INT REFERENCES visit(id) ,
    diseaseid INT REFERENCES disease(id) ,
    patientid INT REFERENCES patient(id)
);

INSERT INTO medical_center (name , location) VALUES
    ('m1' , 'Boston'),
    ('m2' , 'New york') ,
    ('m3' , 'Boston');


INSERT INTO doctor (mcid , first_name , last_name) VALUES
    (1 , 'A' , 'H'),
    (2 , 'B' , 'I'),
    (3 , 'C' , 'J'),
    (1 , 'D' , 'K'),
    (2 , 'E' , 'L');

INSERT INTO patient (first_name , last_name) VALUES
    ('P1' , 'M'),
    ('P2' , 'N'),
    ('P3' , 'O'),
    ('P4' , 'P'),
    ('P5' , 'Q');


INSERT INTO disease (name) VALUES 
    ('Cold') ,
    ('Fever') ,
    ('Headache') ,
    ('High Blood Presure');

INSERT INTO visit (mcid , doctorid , patientid , visit_date) VALUES
    (1 , 1 , 1 , '2020 11-01') ,
    (2 , 2 , 2 , '2020 11-03') ,
    (2 , 2 , 3 , '2020 11-03') ,
    (3 , 3 , 4 , '2020 11-11') ,
    (1 , 4 , 5 , '2020 11-22') ; 

INSERT INTO visit_disease (visitid , diseaseid , patientid) VALUES
    (1 , 2 , 1), 
    (1 , 3 , 1), 
    (1 , 4 , 1), 
    (3 , 1 , 3), 
    (3 , 2 , 3), 
    (4 , 2 , 4), 
    (5 , 2 , 5), 
    (2 , 2 , 2);

SELECT * FROM medical_center 
    JOIN doctor ON medical_center.id = doctor.mcid 
    JOIN visit ON visit.doctorid = doctor.id 
    JOIN patient ON visit.patientid = patient.id 
    JOIN visit_disease ON visit_disease.visitid = visit.id;
