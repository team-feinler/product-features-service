DROP DATABASE IF EXISTS product_features;

CREATE DATABASE product_features;

\c product_features;

CREATE TABLE fake_table (
  id uuid PRIMARY KEY,
  firstName VARCHAR(200) NOT NULL,
  middleName VARCHAR(200) DEFAULT NULL,
  lastName VARCHAR(200) DEFAULT NULL
);
