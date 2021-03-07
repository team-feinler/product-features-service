# Amazon Product Page - Product Features

> Front End Capstone (FEC) Project

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

## Crud API

- POST
> Method: POST
> Endpoint: "/product-features"
> Required body: record to insert
> Response: Will return 200 if successul, 500 if not or if record already exists

- GET
> Method: GET
> Endpoint: "/product-features:id"
> Required body: NA
> Response: Will return 200 if successul, 500 if not

- PUT
> Method: PUT
> Endpoint: "/product-features"
> Required body: productId to update, JSON of updates to make in this format - { productId: product_id, updates: { updates_to_make }}
> Response: Will return 200 if successul, 500 if not or if record doesn't exist

- DELETE
> Method: DELETE
> Endpoint: "/product-features"
> Required body: productId to delete
> Response: Will return 200 if successul, 500 if not or if record doesn't exists

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

