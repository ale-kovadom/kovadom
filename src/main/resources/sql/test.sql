CREATE DATABASE IF NOT EXISTS kovadom  DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

create table if not exists greeting (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10)
);

insert into greeting (name) values('Kovadom');