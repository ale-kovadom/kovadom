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

--changeset alescaroux:3
create table if not exists brand (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(20) NOT NULL UNIQUE,
  description VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  catch_words VARCHAR(200) NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_date TIMESTAMP NOT NULL DEFAULT NOW()
) DEFAULT CHARSET=utf8;

CREATE TABLE if not exists brand_activity (
  brand_id INT UNSIGNED NOT NULL,
  activity_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (`brand_id`,`activity_id`),
  CONSTRAINT `fk_brandActivity_brandId_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `fk_brandActivity_activityId_activity_id` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`)
) DEFAULT CHARSET=utf8;

ALTER TABLE activity CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci;

--changeset alescaroux:4
ALTER TABLE activity DROP COLUMN description;
ALTER TABLE brand DROP COLUMN description;

ALTER TABLE brand ADD COLUMN description VARCHAR(1300);
ALTER TABLE brand ADD COLUMN sale_process VARCHAR(1300);
