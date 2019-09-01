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

UPDATE societe SET label = 'leroyMErlin' WHERE id = 1;

INSERT INTO societe(label)
VALUES
('L-SOCIETY');

DELETE FROM societe
WHERE id = 1;




