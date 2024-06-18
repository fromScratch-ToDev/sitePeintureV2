SET client_encoding = 'UTF8';

DROP TABLE IF EXISTS Categorie, Peinture;

CREATE TABLE Categorie(
    nomCategorie VARCHAR CONSTRAINT pkCategorie PRIMARY KEY,
    ordreCategorie SERIAL
);

CREATE TABLE Peinture(
    numPeinture SERIAL CONSTRAINT pkPeinture PRIMARY KEY ,
    nomPeinture VARCHAR ,
    descriptionPeinture VARCHAR,
    cheminPeinture VARCHAR,
    laCategorie VARCHAR CONSTRAINT fkCategorie REFERENCES Categorie(nomCategorie),
    ordrePeinture SERIAL
);