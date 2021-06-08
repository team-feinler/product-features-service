# E-Commerce Product Page - Product Features Microservice

> An e-commerce application built on SOA principles allowing users to find and purchase products

## Related Projects

  - https://github.com/team-feinler/

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Start the server (port 4000) -
```sh
npm start
```
> Bundle with webpack (watch mode) -
```sh
npm run build
```
> Seed SQL DB (PostgreSQL) -
```sh
npm run seed-sql
```
> Seed NoSQL DB (CouchDB) -
```sh
npm run seed-nosql
```
> Run stress tests (artillery.io) -
```sh
npm run stress-test-get
npm run stress-test-post
```
> Clean the DB out after testing (deletes every record with ID over 10,000,000) -
```sh
npm run clean-db
```

### Crud API

- POST
> Endpoint: "/product-features"
> Required body: record to insert
> Response: Will return 200 if successul, 500 unsuccessful

- GET
> Endpoint: "/product-features/:id"
> Required body: NA
> Response: Will return 200 and response data if successul, 500 if unsuccessful
> Response data format: { productId: INTEGER, banner: OBJECT, features: ARRAY, featureSetup: OBJECT, additionalFeatures: OBJECT }

- PUT
> Endpoint: "/product-features/:id"
> Required body: productId to update, JSON of updates to make in this format - { productId: product_id, updates: { updates_to_make }}
> Response: Will return 200 if successul, 500 if unsuccessful

- DELETE
> Endpoint: "/product-features/:id"
> Required body: productId to delete
> Response: Will return 200 if successul, 500 if unsuccessful

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Postgres 13.2
- CouchDB 3.1.1

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install -g nodemon
npm install
```

