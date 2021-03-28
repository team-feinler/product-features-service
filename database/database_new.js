const { Client } = require('pg');
const { userName, password } = require('../database_configs/sql_database.config.js');
const { getFeaturesForProductId } = require('./data_seeding/query_generator.js');

const client =  new Client({
  user: userName,
  password: password,
  host: 'localhost',
  database: 'product_features',
  port: 5432,
});

module.exports.getFeatureDataForProductId = async (productId) => {
  const query = getFeaturesForProductId(productId);

  try {
    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res;
  } catch (err) {
    return err;
  }
}
