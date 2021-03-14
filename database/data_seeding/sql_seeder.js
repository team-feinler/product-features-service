const { userName, password } = require('../../database_configs/sql_database.config.js');
const { Client } = require('pg');

const { generateData } = require('./data_generator.js');
const { generateInsertQuery } = require('./query_generator.js');


const client =  new Client({
  user: userName,
  password: password,
  host: 'localhost',
  database: 'product_features',
  port: 5432,
});

const seedSqlData = async (numRecords, batchSize, startingId) => {

  if ((numRecords / batchSize) - Math.floor(numRecords / batchSize) !== 0) {
    throw new Error('Number of records must be divisible by batch size (ex: 1,000 records in batch sizes of 100)');
  }

  client.connect();

  let data = generateData(batchSize, startingId, 'sql');
  data.map(async (item) => {
    const { feature, featuresList, contentGridFeatureItems } = item;
    const featuresQuery = generateInsertQuery('features', feature);

    await client.query(featuresQuery, (err) => {
      if (err) {
        console.log(err);
      }
    });

    for (let i = 0; i < featuresList.length; i++) {
      const featuresListQuery = generateInsertQuery('features_list', featuresList[i]);
      console.log(featuresListQuery);

      await client.query(featuresListQuery, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    for (let i = 0; i < contentGridFeatureItems.length; i++) {
      const contentGridQuery = generateInsertQuery('content_grid_feature_items', contentGridFeatureItems[i]);
      console.log(contentGridQuery);

      await client.query(contentGridQuery, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });

  console.log(`SQL data seeded for all ${batchSize} items`);
  data = [];
}

seedSqlData(2000, 2000, 1);
