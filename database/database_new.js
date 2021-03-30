const { Client } = require('pg');
const { userName, password } = require('../database_configs/sql_database.config.js');
const {
  generateInsertFeatureQuery,
  generateGetFeatureQuery,
  generateUpdateFeatureQuery,
  generateDeleteFeatureQuery,
} = require('./data_seeding/query_generator.js');

const client =  new Client({
  user: userName,
  password: password,
  host: 'localhost',
  database: 'product_features',
  port: 5432,
});

module.exports.addFeatureRecord = (data) => {
  const query = generateInsertFeatureQuery(data);

  try {
    await client.connect();
    const res = await client.query(query);
    return res;
  } catch (err) {
    return err;
  }
}

module.exports.getFeatureRecord = async (productId) => {
  const query = generateGetFeatureQuery(productId);

  try {
    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res;
  } catch (err) {
    return err;
  }
}

module.exports.updateFeatureRecord = (productId, data) => {
  const query = generateUpdateFeatureQuery(productId, data);

  try {
    await client.connect();
    const res = await client.query(query);
    return res;
  } catch (err) {
    return err;
  }
}

module.exports.deleteFeatureRecord = (data) => {
  const query = generateDeleteFeatureQuery(productId);

  try {
    await client.connect();
    const res = await client.query(query);
    return res;
  } catch (err) {
    return err;
  }
}
