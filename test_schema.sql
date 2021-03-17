DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

\c test;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL,
  likes_hiking BOOLEAN NOT NULL
);
