--liquibase formatted sql

--changeset alescaroux:1
create table if not exists activity (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(7) NOT NULL UNIQUE,
  description VARCHAR(100) NOT NULL,
  label VARCHAR(100) NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_date TIMESTAMP NOT NULL DEFAULT NOW()
);

--changeset alescaroux:2
ALTER TABLE activity MODIFY code VARCHAR(20);
ALTER TABLE activity MODIFY id INT UNSIGNED;