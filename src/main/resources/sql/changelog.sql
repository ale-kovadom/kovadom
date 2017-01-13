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

--changeset alescaroux:5
create table if not exists host (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  email VARCHAR(500) NULL,
  created_date TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_date TIMESTAMP NOT NULL DEFAULT NOW()
) DEFAULT CHARSET=utf8;


create table if not exists sale (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  brand_id INT UNSIGNED NOT NULL,
  host_id INT UNSIGNED NOT NULL,
  city VARCHAR(255) NOT NULL,
  stakeholder_count SMALLINT NOT NULL,
  extra_information VARCHAR(1500) ,
  date TIMESTAMP NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_date TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT `fk_sale_brandId_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `fk_host_hostId_host_id` FOREIGN KEY (`host_id`) REFERENCES `host` (`id`)
) DEFAULT CHARSET=utf8;

--changeset alescaroux:6
alter table brand_activity drop FOREIGN KEY fk_brandActivity_activityId_activity_id;
ALTER TABLE activity MODIFY id INT UNSIGNED AUTO_INCREMENT;
ALTER table brand_activity add CONSTRAINT `fk_brandActivity_activityId_activity_id` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);
