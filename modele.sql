DROP table if exists ligne_comptable,
type_ligne_comptable,
societe CASCADE;

CREATE TABLE type_ligne_comptable(
  id serial PRIMARY KEY NOT NULL,
  label text NOT NULL
);

CREATE TABLE societe(
  id serial PRIMARY KEY NOT NULL,
  label text NOT NULL
);

CREATE TABLE ligne_comptable(
  id serial PRIMARY KEY NOT NULL,
  date_facture date NOT NULL,
  date_encaissement date,
  montant_TTC decimal NOT NULL,
  montant_HT decimal NOT NULL,
  montant_TVA decimal NOT NULL,
  transmis_compta bool NOT NULL,
  commentaires text,
  typeligne_id int REFERENCES type_ligne_comptable(id),
  societe_id int REFERENCES societe(id)
);



societes

UPDATE societe SET label = 'leroyMErlin' WHERE id = 1;

INSERT INTO societe(label)
VALUES
('L-SOCIETY');

DELETE FROM societe
WHERE id = 1;


ligne_comptable

INSERT INTO ligne_comptable(date_facture,date_encaissement,montant_ttc,montant_ht, montant_tva,transmis_compta,commentaires,typeligne_id,societe_id)
VALUES
('18/09/1987', '20/09/1987', '10', '10', '1', 'TRUE', 'test', 13, 83);

SELECT date_facture,date_encaissement,
montant_ttc,montant_ht, montant_tva,transmis_compta,commentaires,typeligne_id,societe_id
FROM ligne_comptable;


type_LIGNE COMPTABLE

INSERT INTO type_ligne_comptable(label)
VALUES
('resto');





SELECT *
FROM ligne_comptable
INNER JOIN societe on societe.id = ligne_comptable.id
INNER JOIN type_ligne_comptable on typeligne_id = ligne_comptable.id;
