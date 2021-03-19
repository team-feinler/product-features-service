DROP DATABASE IF EXISTS product_features;

CREATE DATABASE product_features;

\c product_features;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE features (
  id_encid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  id_decid SERIAL NOT NULL UNIQUE,
  feature_banner_header TEXT NOT NULL,
  feature_banner_text_1 TEXT NOT NULL,
  feature_banner_text_2 TEXT NOT NULL,
  feature_setup_header TEXT NOT NULL,
  feature_setup_description_1 TEXT NOT NULL,
  feature_setup_description_2 TEXT NOT NULL,
  feature_setup_description_3 TEXT NOT NULL,
  additional_features_header TEXT NOT NULL,
  additional_features_description TEXT NOT NULL
);

CREATE TABLE features_list (
  id_encid uuid DEFAULT uuid_generate_v4() PRIMARY KEY ,
  id_decid SERIAL NOT NULL,
  header TEXT NOT NULL,
  description TEXT NOT NULL,
  feature_id_decid INT NOT NULL REFERENCES features (id_decid)
);

CREATE TABLE content_grid_feature_items (
  id_encid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  id_decid SERIAL NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  feature_id_decid INT NOT NULL REFERENCES features (id_decid)
);
