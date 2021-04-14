DROP DATABASE IF EXISTS product_features;

CREATE DATABASE product_features;

\c product_features;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE features (
  id_encid uuid DEFAULT uuid_generate_v4(),
  product_id SERIAL NOT NULL,
  feature_banner_header VARCHAR(125) NOT NULL,
  feature_banner_text_1 VARCHAR(500) NOT NULL,
  feature_banner_text_2 VARCHAR(500) NOT NULL,
  feature_setup_header VARCHAR(125) NOT NULL,
  feature_setup_description_1 VARCHAR(125) NOT NULL,
  feature_setup_description_2 VARCHAR(125) NOT NULL,
  feature_setup_description_3 VARCHAR(125) NOT NULL,
  additional_features_header VARCHAR(125) NOT NULL,
  additional_features_description VARCHAR(500) NOT NULL
);

CREATE TABLE features_list (
  id_encid uuid DEFAULT uuid_generate_v4(),
  id_decid SERIAL NOT NULL,
  header VARCHAR(125) NOT NULL,
  description VARCHAR(500) NOT NULL,
  product_id INT NOT NULL
);

CREATE TABLE content_grid_feature_items (
  id_encid uuid DEFAULT uuid_generate_v4(),
  id_decid SERIAL NOT NULL,
  title VARCHAR(18) NOT NULL,
  description VARCHAR(500) NOT NULL,
  product_id INT NOT NULL
);
