SET client_encoding = 'UTF8';

DELETE FROM Peinture;
DELETE FROM Galerie;
DELETE FROM Collection;

INSERT INTO Collection VALUES
('Peintures', 'Découvrir la galerie peinture', '../images/peinture/peinture_1981/peinture1.jpg'),
('Stylo à bille', 
'Lorsque j''étais étudiant sur le campus Marseille/Luminy, revenant de mon premier et éprouvant voyage en Inde,
 j''ai été attiré par une expression minimaliste et j''ai réduit mes outils à du « papier carotte »,
  papier utilisé par les différents journaux de Marseille, et un stylo à bille noir.<br><br>'
'J''ai découvert que cette technique s''imposait à moi uniquement parce qu''elle exprimait parfaitement « mon monde » d''alors.<br><br>
Cela s''est vérifié à chaque fois par la suite. Lorsque mon monde intérieur changeait, une technique différente s''imposait.',
'../images/stylo_à_bille/peinture1.jpg'),
('Encre et lying',
'Environ un an et demi plus tard, mon monde intérieur fut une succession de clairs-obscurs. 
Un support lumineux, inconnu pour moi jusqu''à ce jour, apparut dans ma vie.<br><br>Il s''appelle papier chromecôte.
Il se caractérise par une finition brillante et lisse sur une face, tandis que l''autre face peut avoir une finition mate 
ou légèrement rugueuse, offrant des possibilités d''impression de haute qualité et une esthétique attrayante.<br><br>
Je pouvais le gratter avec une pointe, l''user avec du papier émeri ; le stylo à bille laissa place à l''encre de Chine peinte et 
aux stylos Rotring, des stylos d''écriture techniques principalement utilisés par les professionnels dans les domaines de l''art, 
de l''architecture et du design, permettant des traits de différentes largeurs.<br><br> 
Ainsi, ces images apparurent.',
'../images/encre_et_lying/encre_et_lying_1976/peinture1.jpg'),
('Croquis traits continus 1977-1979',
 'Découvrir la galerie croquis traits continus',
 '../images/croquis_traits_continus_1977-1979/peinture1.jpg'),
 ('Dessins 2012', 'Décrouvrir la galerie dessins 2012', '../images/dessins_2012/peinture1.jpg');

INSERT INTO Galerie VALUES
  ('Encre et lying 1976', 'Découvrir la galerie encre et lying 1976','../images/encre_et_lying/encre_et_lying_1976/peinture1.jpg',3),
  ('Encre et lying 1977', 'Découvrir la galerie encre et lying 1977','../images/encre_et_lying/encre_et_lying_1977/peinture1.jpg',3),
  ('Encre et lying 1978', 'Découvrir la galerie encre et lying 1978','../images/encre_et_lying/encre_et_lying_1978/peinture1.jpg',3),
  ('Encre et lying 1979', 'Découvrir la galerie encre et lying 1979','../images/encre_et_lying/encre_et_lying_1979/peinture1.jpg',3),
  ('Encre et lying 1981', 'Découvrir la galerie encre et lying 1981','../images/encre_et_lying/encre_et_lying_1981/peinture1.jpg',3);

INSERT INTO Galerie VALUES 
  ('Peinture 1981', 'Découvrir la galerie peinture 1981', '../images/peinture/peinture_1981/peinture1.jpg',1),
  ('Peintures 1986', 'Décrouvrir la galerie peintures 1986', '../images/peinture/peinture_1986/peinture1.jpg',1),
  ('Peintures 1987', 'Décrouvrir la galerie peintures 1987', '../images/peinture/peinture_1987/peinture1.jpg',1),
  ('Peintures 1988', 'Décrouvrir la galerie peintures 1988', '../images/peinture/peinture_1988/peinture1.jpg',1),
  ('Peintures 1989', 'Décrouvrir la galerie peintures 1989', '../images/peinture/peinture_1989/peinture1.jpg',1),
  ('Peintures 1990', 'Décrouvrir la galerie peintures 1990', '../images/peinture/peinture_1990/peinture1.jpg',1),
  ('Peintures 1991', 'Décrouvrir la galerie peintures 1991', '../images/peinture/peinture_1991/peinture1.jpg',1),
  ('Peintures 1992', 'Décrouvrir la galerie peintures 1992', '../images/peinture/peinture_1992/peinture1.jpg',1),
  ('Peintures 1993', 'Décrouvrir la galerie peintures 1993', '../images/peinture/peinture_1993/peinture1.jpg',1),
  ('Peinture 1994', 'Décrouvrir la galerie peinture 1994', '../images/peinture/peinture_1994/peinture1.jpg',1),
  ('Peintures 2010', 'Décrouvrir la galerie peintures 2010', '../images/peinture/peinture_2010/peinture1.jpg',1),
  ('Peintures 2011', 'Décrouvrir la galerie peintures 2011', '../images/peinture/peinture_2011/peinture1.jpg',1),
  ('Peintures 2013', 'Décrouvrir la galerie peintures 2013', '../images/peinture/peinture_2013/peinture1.jpg',1),
  ('Peintures 2015', 'Décrouvrir la galerie peintures 2015', '../images/peinture/peinture_2015/peinture1.jpg',1);

INSERT INTO Galerie VALUES
('Stylo à bille', '', '',2),
('Croquis traits continus 1977-1979', '', '',4),
('Dessins 2012', '', '',5);

INSERT INTO Peinture VALUES
('Janvier 1976', '57.5cm x 67cm', '/images/encre_et_lying/encre_et_lying_1976/peinture1.jpg',1),
('Février 1976 : "Passage"', '59.5cm x 62cm', '/images/encre_et_lying/encre_et_lying_1976/peinture2.jpg',1),
('Février 1976 : "Naissance"', '53cm x 36.5cm', '/images/encre_et_lying/encre_et_lying_1976/peinture3.jpg',1),
('Mars 1976 : "Un jour, la pluie"', '67.5cm x 61cm','/images/encre_et_lying/encre_et_lying_1976/peinture4.jpg',1),
('Mars 1976 : "Marécage"', '45cm x 76cm', '/images/encre_et_lying/encre_et_lying_1976/peinture5.jpg',1),
('Avril 1976 : "L''eau"', '67.5cm x 70cm', '/images/encre_et_lying/encre_et_lying_1976/peinture6.jpg',1),
('Mai 1976 : "Interférence"', '51cm x 51cm','/images/encre_et_lying/encre_et_lying_1976/peinture7.jpg',1),
('Juin 1976 : "La traversée"', '70cm x 70cm','/images/encre_et_lying/encre_et_lying_1976/peinture8.jpg',1),
('Novembre 1976 : "Traversée"', '48cm x 52cm','/images/encre_et_lying/encre_et_lying_1976/peinture9.jpg',1);

INSERT INTO Peinture VALUES
('Encre et lying 1977 n°1','','/images/encre_et_lying/encre_et_lying_1977/peinture1.jpg',2),
('Encre et lying 1977 n°2','','/images/encre_et_lying/encre_et_lying_1977/peinture2.jpg',2),
('Encre et lying 1977 n°3','','/images/encre_et_lying/encre_et_lying_1977/peinture3.jpg',2),
('Encre et lying 1977 n°4','','/images/encre_et_lying/encre_et_lying_1977/peinture4.jpg',2),
('Encre et lying 1977 n°5','','/images/encre_et_lying/encre_et_lying_1977/peinture5.jpg',2),
('Encre et lying 1977 n°6','','/images/encre_et_lying/encre_et_lying_1977/peinture6.jpg',2),
('Encre et lying 1977 n°7','','/images/encre_et_lying/encre_et_lying_1977/peinture7.jpg',2),
('Encre et lying 1977 n°8','','/images/encre_et_lying/encre_et_lying_1977/peinture8.jpg',2),
('Encre et lying 1977 n°9','','/images/encre_et_lying/encre_et_lying_1977/peinture9.jpg',2),
('Encre et lying 1977 n°10','','/images/encre_et_lying/encre_et_lying_1977/peinture10.jpg',2);

INSERT INTO Peinture VALUES
('Encre et lying 1978 n°1','','/images/encre_et_lying/encre_et_lying_1978/peinture1.jpg',3),
('Encre et lying 1978 n°2','','/images/encre_et_lying/encre_et_lying_1978/peinture2.jpg',3),
('Encre et lying 1978 n°3','','/images/encre_et_lying/encre_et_lying_1978/peinture3.jpg',3);

INSERT INTO Peinture VALUES
('Encre et lying 1979 n°1','','/images/encre_et_lying/encre_et_lying_1979/peinture1.jpg',4),
('Encre et lying 1979 n°2','','/images/encre_et_lying/encre_et_lying_1979/peinture2.jpg',4),
('Encre et lying 1979 n°3','','/images/encre_et_lying/encre_et_lying_1979/peinture3.jpg',4),
('Encre et lying 1979 n°4','','/images/encre_et_lying/encre_et_lying_1979/peinture4.jpg',4),
('Encre et lying 1979 n°5','','/images/encre_et_lying/encre_et_lying_1979/peinture5.jpg',4);

INSERT INTO Peinture VALUES
('Encre et lying 1981 n°1','','/images/encre_et_lying/encre_et_lying_1981/peinture1.jpg',5);

INSERT INTO Peinture VALUES
('Dessins 2012 n°1','','/images/dessins_2012/peinture1.jpg',22),
('Dessins 2012 n°2','','/images/dessins_2012/peinture2.jpg',22),
('Dessins 2012 n°3','','/images/dessins_2012/peinture3.jpg',22),
('Dessins 2012 n°4','','/images/dessins_2012/peinture4.jpg',22);

INSERT INTO Peinture VALUES
('Croquis traits continus 1977-1979 n°1','','/images/croquis_traits_continus_1977-1979/peinture1.jpg',21),
('Croquis traits continus 1977-1979 n°2','','/images/croquis_traits_continus_1977-1979/peinture2.jpg',21),
('Croquis traits continus 1977-1979 n°3','','/images/croquis_traits_continus_1977-1979/peinture3.jpg',21),
('Croquis traits continus 1977-1979 n°4','','/images/croquis_traits_continus_1977-1979/peinture4.jpg',21),
('Croquis traits continus 1977-1979 n°5','','/images/croquis_traits_continus_1977-1979/peinture5.jpg',21),
('Croquis traits continus 1977-1979 n°6','','/images/croquis_traits_continus_1977-1979/peinture6.jpg',21),
('Croquis traits continus 1977-1979 n°7','','/images/croquis_traits_continus_1977-1979/peinture7.jpg',21),
('Croquis traits continus 1977-1979 n°8','','/images/croquis_traits_continus_1977-1979/peinture8.jpg',21),
('Croquis traits continus 1977-1979 n°9','','/images/croquis_traits_continus_1977-1979/peinture9.jpg',21),
('Croquis traits continus 1977-1979 n°10','','/images/croquis_traits_continus_1977-1979/peinture10.jpg',21),
('Croquis traits continus 1977-1979 n°11','','/images/croquis_traits_continus_1977-1979/peinture11.jpg',21),
('Croquis traits continus 1977-1979 n°12','','/images/croquis_traits_continus_1977-1979/peinture12.jpg',21),
('Croquis traits continus 1977-1979 n°13','','/images/croquis_traits_continus_1977-1979/peinture13.jpg',21);

INSERT INTO Peinture VALUES
('Stylo à bille n°1','','/images/stylo_à_bille/peinture1.jpg',20),
('Stylo à bille n°2','','/images/stylo_à_bille/peinture2.jpg',20),
('Stylo à bille n°3','','/images/stylo_à_bille/peinture3.jpg',20),
('Stylo à bille n°4','','/images/stylo_à_bille/peinture4.jpg',20),
('Stylo à bille n°5','','/images/stylo_à_bille/peinture5.jpg',20),
('Stylo à bille n°6','','/images/stylo_à_bille/peinture6.jpg',20),
('Stylo à bille n°7','','/images/stylo_à_bille/peinture7.jpg',20);

INSERT INTO Peinture VALUES
('Peinture 1981 n°1','','/images/peinture/peinture_1981/peinture1.jpg',6);

INSERT INTO Peinture VALUES
('Peinture 1986 n°1','','/images/peinture/peinture_1986/peinture1.jpg',7),
('Peinture 1986 n°2','','/images/peinture/peinture_1986/peinture2.jpg',7),
('Peinture 1986 n°3','','/images/peinture/peinture_1986/peinture3.jpg',7),
('Peinture 1986 n°4','','/images/peinture/peinture_1986/peinture4.jpg',7),
('Peinture 1986 n°5','','/images/peinture/peinture_1986/peinture5.jpg',7),
('Peinture 1986 n°6','','/images/peinture/peinture_1986/peinture6.jpg',7);

INSERT INTO Peinture VALUES
('Peinture 1987 n°1','','/images/peinture/peinture_1987/peinture1.jpg',8),
('Peinture 1987 n°2','','/images/peinture/peinture_1987/peinture2.jpg',8),
('Peinture 1987 n°3','','/images/peinture/peinture_1987/peinture3.jpg',8),
('Peinture 1987 n°4','','/images/peinture/peinture_1987/peinture4.jpg',8);

INSERT INTO Peinture VALUES
('Peinture 1988 n°1','','/images/peinture/peinture_1988/peinture1.jpg',9),
('Peinture 1988 n°2','','/images/peinture/peinture_1988/peinture2.jpg',9),
('Peinture 1988 n°3','','/images/peinture/peinture_1988/peinture3.jpg',9);

INSERT INTO Peinture VALUES
('Peinture 1989 n°1','','/images/peinture/peinture_1989/peinture1.jpg',10),
('Peinture 1989 n°2','','/images/peinture/peinture_1989/peinture2.jpg',10),
('Peinture 1989 n°3','','/images/peinture/peinture_1989/peinture3.jpg',10),
('Peinture 1989 n°4','','/images/peinture/peinture_1989/peinture4.jpg',10),
('Peinture 1989 n°5','','/images/peinture/peinture_1989/peinture5.jpg',10),
('Peinture 1989 n°6','','/images/peinture/peinture_1989/peinture6.jpg',10),
('Peinture 1989 n°7','','/images/peinture/peinture_1989/peinture7.jpg',10);

INSERT INTO Peinture VALUES
('Peinture 1990 n°1','','/images/peinture/peinture_1990/peinture1.jpg',11),
('Peinture 1990 n°2','','/images/peinture/peinture_1990/peinture2.jpg',11),
('Peinture 1990 n°3','','/images/peinture/peinture_1990/peinture3.jpg',11),
('Peinture 1990 n°4','','/images/peinture/peinture_1990/peinture4.jpg',11),
('Peinture 1990 n°5','','/images/peinture/peinture_1990/peinture5.jpg',11),
('Peinture 1990 n°6','','/images/peinture/peinture_1990/peinture6.jpg',11),
('Peinture 1990 n°7','','/images/peinture/peinture_1990/peinture7.jpg',11);

INSERT INTO Peinture VALUES
('Peinture 1991 n°1','','/images/peinture/peinture_1991/peinture1.jpg',12),
('Peinture 1991 n°2','','/images/peinture/peinture_1991/peinture2.jpg',12),
('Peinture 1991 n°3','','/images/peinture/peinture_1991/peinture3.jpg',12),
('Peinture 1991 n°4','','/images/peinture/peinture_1991/peinture4.jpg',12),
('Peinture 1991 n°5','','/images/peinture/peinture_1991/peinture5.jpg',12);

INSERT INTO Peinture VALUES
('Peinture 1992 n°1','','/images/peinture/peinture_1992/peinture1.jpg',13),
('Peinture 1992 n°2','','/images/peinture/peinture_1992/peinture2.jpg',13),
('Peinture 1992 n°3','','/images/peinture/peinture_1992/peinture3.jpg',13),
('Peinture 1992 n°4','','/images/peinture/peinture_1992/peinture4.jpg',13),
('Peinture 1992 n°5','','/images/peinture/peinture_1992/peinture5.jpg',13),
('Peinture 1992 n°6','','/images/peinture/peinture_1992/peinture6.jpg',13),
('Peinture 1992 n°7','','/images/peinture/peinture_1992/peinture7.jpg',13);

INSERT INTO Peinture VALUES
('Peinture 1993 n°1','','/images/peinture/peinture_1993/peinture1.jpg',14),
('Peinture 1993 n°2','','/images/peinture/peinture_1993/peinture2.jpg',14);

INSERT INTO Peinture VALUES
('Peinture 1994 n°1','','/images/peinture/peinture_1994/peinture1.jpg',15);

INSERT INTO Peinture VALUES
('Peinture 2010 n°1','','/images/peinture/peinture_2010/peinture1.jpg',16),
('Peinture 2010 n°2','','/images/peinture/peinture_2010/peinture2.jpg',16),
('Peinture 2010 n°3','','/images/peinture/peinture_2010/peinture3.jpg',16),
('Peinture 2010 n°4','','/images/peinture/peinture_2010/peinture4.jpg',16);

INSERT INTO Peinture VALUES
('Peinture 2011 n°1','','/images/peinture/peinture_2011/peinture1.jpg',17),
('Peinture 2011 n°2','','/images/peinture/peinture_2011/peinture2.jpg',17),
('Peinture 2011 n°3','','/images/peinture/peinture_2011/peinture3.jpg',17);

INSERT INTO Peinture VALUES
('Peinture 2013 n°1','','/images/peinture/peinture_2013/peinture1.jpg',18),
('Peinture 2013 n°2','','/images/peinture/peinture_2013/peinture2.jpg',18),
('Peinture 2013 n°3','','/images/peinture/peinture_2013/peinture3.jpg',18),
('Peinture 2013 n°4','','/images/peinture/peinture_2013/peinture4.jpg',18),
('Peinture 2013 n°5','','/images/peinture/peinture_2013/peinture5.jpg',18),
('Peinture 2013 n°6','','/images/peinture/peinture_2013/peinture6.jpg',18),
('Peinture 2013 n°7','','/images/peinture/peinture_2013/peinture7.jpg',18),
('Peinture 2013 n°8','','/images/peinture/peinture_2013/peinture8.jpg',18),
('Peinture 2013 n°9','','/images/peinture/peinture_2013/peinture9.jpg',18),
('Peinture 2013 n°10','','/images/peinture/peinture_2013/peinture10.jpg',18);

INSERT INTO Peinture VALUES
('Peinture 2015 n°1','','/images/peinture/peinture_2015/peinture1.jpg',19),
('Peinture 2015 n°2','','/images/peinture/peinture_2015/peinture2.jpg',19),
('Peinture 2015 n°3','','/images/peinture/peinture_2015/peinture3.jpg',19),
('Peinture 2015 n°4','','/images/peinture/peinture_2015/peinture4.jpg',19),
('Peinture 2015 n°5','','/images/peinture/peinture_2015/peinture5.jpg',19);