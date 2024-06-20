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
    dataPeinture BYTEA,
    laCategorie VARCHAR CONSTRAINT fkCategorie REFERENCES Categorie(nomCategorie),
    ordrePeinture SERIAL
);

INSERT INTO Categorie(nomCategorie) VALUES
('Peintures'),
('Stylo à bille'),
('Encre et lying'),
('Croquis traits continus 1977-1979'),
('Dessins 2012');