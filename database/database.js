const { Client } = require('pg');
const { userName, password } = require('../configs/sql_database.config.js');
const {
  generateInsertFeatureQuery,
  generateGetFeatureQuery,
  generateUpdateFeatureQuery,
  generateDeleteFeatureQuery,
} = require('./data_seeding/query_generator.js');

const clientObj = {
  user: userName,
  password: password,
  host: 'localhost',
  database: 'product_features',
  port: 5432,
};

module.exports.addFeatureRecord = async (table, dataObj) => {
  const client = new Client(clientObj);
  const query = generateInsertFeatureQuery(table, dataObj);

  try {
    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res;
  } catch (err) {
    return err;
  }
}

module.exports.getFeatureRecord = async (productId) => {
  const client = new Client(clientObj);
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

module.exports.updateFeatureRecord = async (table, productId, dataObj) => {
  const client = new Client(clientObj);
  const query = generateUpdateFeatureQuery(table, productId, dataObj);

  try {
    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res;
  } catch (err) {
    return err;
  }
}

module.exports.deleteFeatureRecord = async (table, productId) => {
  const client = new Client(clientObj);
  const query = generateDeleteFeatureQuery(table, productId);

  try {
    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res;
  } catch (err) {
    return err;
  }
}
