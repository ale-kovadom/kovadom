create table if not exists activity (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(7) NOT NULL UNIQUE,
  description VARCHAR(100) NOT NULL,
  label VARCHAR(100) NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_date TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO activity (code, description, label) values ('LINGERI', 'Lingerie', 'Vente de lingerie');
INSERT INTO activity (code, description, label) values ('WINE', 'Wine', 'Dégustation de vin');
INSERT INTO activity (code, description, label) values ('SEXT', 'Sex toys', 'Sex toys');
INSERT INTO activity (code, description, label) values ('BIO', 'Bio products', 'Produits bio');