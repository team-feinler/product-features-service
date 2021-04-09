const { Client } = require('pg');

const { userName, password } = require('./../configs/sql_database.config.js');
const { generateCleanTableQuery } = require('./data_seeding/query_generator.js');

const clientObj = {
  user: userName,
  password: password,
  host: 'localhost',
  database: 'product_features',
  port: 5432,
};

const cleanTable = async (table, ceilingProductId) => {
  const client = new Client(clientObj);
  const query = generateCleanTableQuery(table, ceilingProductId);

  try {
    await client.connect();
    await client.query(query);
    await client.end();
  } catch (err) {
    console.log(err);
  }

  console.log(`Table "${table}" successfully cleaned above ID ${ceilingProductId}`);
}

cleanTable('features', 10000000);
