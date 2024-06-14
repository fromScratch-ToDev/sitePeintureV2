SET client_encoding = 'UTF8';

DROP TABLE IF EXISTS Collection, Galerie, Peinture;

CREATE TABLE Collection(
    nomC VARCHAR(100) CONSTRAINT pkCollection PRIMARY KEY,
    descriptionC VARCHAR(1000),
    cheminC VARCHAR(200) CONSTRAINT uqCheminC UNIQUE,
    numCollection SERIAL UNIQUE,
    ordre_creation SERIAL
);

CREATE TABLE Galerie(
    nomG VARCHAR(100) CONSTRAINT pkGalerie PRIMARY KEY,
    descriptionG VARCHAR(1000),
    cheminG VARCHAR(200),
    laCollection INT CONSTRAINT fkCollection REFERENCES Collection(numCollection),
    numGalerie SERIAL UNIQUE,
    ordre_creation SERIAL 
);

CREATE TABLE Peinture(
    nomP VARCHAR(100) CONSTRAINT pkPeinture PRIMARY KEY,
    descriptionP VARCHAR(1000),
    cheminP VARCHAR(200),
    laGalerie INT CONSTRAINT fkGalerie REFERENCES Galerie(numGalerie),
    ordre_creation SERIAL 
);