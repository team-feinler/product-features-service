const { Client } = require('pg');

const { generateInsertQuery } = require('./database/data_seeding/query_generator.js');

const client =  new Client({
  user: 'tylerbrown',
  password: '',
  host: 'localhost',
  database: 'product_features',
  port: 5432,
});

client.connect();

const data = {
  feature_banner_header: "'fake_data'",
  feature_banner_text: "'fake_data'",
  feature_setup_header: "'fake_data'",
  feature_setup_description: "'fake_data'",
  additional_features_header: "'fake_data'",
  additional_features_description: "'fake_data'",
};

const query = generateInsertQuery('features', data);

client.query(query, (err, res) => {
  if (err) {
    console.log(err);
    client.end();
  } else {
    console.log(res);
    client.end();
  }
});
