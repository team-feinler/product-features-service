const faker = require('faker');
const fs = require('fs');
const { Pool } = require('pg');
const copyFrom  = require('pg-copy-streams').from;

const { userName, password } = require('../../database_configs/sql_database.config.js');
const { generateFeaturesTableRow, generateFeaturesListTableRow, generateContentGridRow } = require('./data_generator.js');
const { generateCopyQuery, addPrimaryKey, addForeignKey, addUniqueConstraint, createIndex } = require('./query_generator.js');
const outputFile = `${__dirname}/seeding.csv`;

const pool =  new Pool({
  user: userName,
  password: password,
  host: 'localhost',
  database: 'product_features',
  port: 5432,
});

const writeToCsv = async (lines, encoding, headers, createData, startingId, counter = null) => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(outputFile);
    writeStream.write(headers, encoding);

    const done = () => {
      writeStream.end()
    }

    let copyOfCounter = counter;
    copyOfCounter ? copyOfCounter++ : null;

    const writing = () => {
      let canWrite = true;

      do {
        lines--;

        if (copyOfCounter === 1) {
          copyOfCounter = counter;
          startingId++;
        } else if (counter !== null) {
          copyOfCounter--;
        }

        let row = createData(startingId);
        if (lines === 0) {
          writeStream.write(row, encoding, done);
        } else {
          writeStream.write(row, encoding);
        }
      } while (lines > 0 && canWrite);

      if (lines > 0 && !canWrite) {
        writeStream.once('drain', writing);
      }
    }
    writing();

    writeStream.on('finish', () => { resolve(true); });
    writeStream.on('error', (err) => { reject(err); });
  });
}

const copyToDb = (table, columns, filePath, client) => {
  return new Promise((resolve, reject) => {
    const query = generateCopyQuery(table, columns);

    const dataStream = client.query(copyFrom(query));
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (err) => { reject(err); });
    dataStream.on('error', (err) => { reject(err); });
    dataStream.on('finish', () => { resolve(true); });
    fileStream.pipe(dataStream);
  });
}

const seedSqlData = (numRecords, batchSize, filePath) => {

  if ((numRecords / batchSize) - Math.floor(numRecords / batchSize) !== 0) {
    throw new Error('Number of records must be divisible by batch size (ex: 1,000 records in batch sizes of 100)');
  }

  let numFeaturesTableRecords = numRecords;
  let numFeaturesListTableRecords = numRecords * 7;
  let numContentGridTableRecords = numRecords * 5;

  let featuresBatchSize = batchSize;
  let featuresListBatchSize = batchSize * 7;
  let contentGridBatchSize = batchSize * 5;

  const featuresColumns = [
    'feature_banner_header',
    'feature_banner_text_1',
    'feature_banner_text_2',
    'feature_setup_header',
    'feature_setup_description_1',
    'feature_setup_description_2',
    'feature_setup_description_3',
    'additional_features_header',
    'additional_features_description',
  ];
  const featuresListColumns = [
    'header',
    'description',
    'product_id',
  ];
  const contentGridColumns = [
    'title',
    'description',
    'product_id',
  ];

  const featuresCsvHeaders = `${featuresColumns.join(',')}\n`;
  const featuresListCsvHeaders = `${featuresListColumns.join(',')}\n`;
  const contentGridCsvHeaders = `${contentGridColumns.join(',')}\n`;

  pool.connect(async (err, client, done) => {

    // seed features table
    while (numFeaturesTableRecords > 0) {

      try {
        await writeToCsv(featuresBatchSize, 'utf-8', featuresCsvHeaders, generateFeaturesTableRow);
        await copyToDb('features', featuresColumns, filePath, client);
      } catch (err) {
        throw new Error(err);
      }

      numFeaturesTableRecords -= featuresBatchSize;
      numFeaturesTableRecords % 1000000 === 0 ? console.log(`${numFeaturesTableRecords} feature table records left to seed`) : null;
    }

    console.log(`${numRecords} feature table records successfully seeded`);

    const featuresPkQuery = addPrimaryKey('features', 'id_encid');
    const uniqueConstraintQuery = addUniqueConstraint('features', 'features_unique_constraint', 'product_id');
    try {
      await client.query(featuresPkQuery);
      await client.query(uniqueConstraintQuery);
    } catch (err) {
      throw new Error(err);
    }
    console.log('Primary key and unique constraint added for features table');

    // seed features list table
    let featuresListStartingId = 1;
    while (numFeaturesListTableRecords > 0) {
      const numPerFeature = 7;

      try {
        await writeToCsv(featuresListBatchSize, 'utf-8', featuresListCsvHeaders, generateFeaturesListTableRow, featuresListStartingId, numPerFeature);
        await copyToDb('features_list', featuresListColumns, filePath, client);
      } catch (err) {
        throw new Error(err);
      }

      featuresListStartingId += (featuresListBatchSize / numPerFeature);
      numFeaturesListTableRecords -= featuresListBatchSize;
      numFeaturesListTableRecords % 7000000 === 0 ? console.log(`${numFeaturesListTableRecords} feature_lists table records left to seed`) : null;
    }

    console.log(`${numRecords * 7} feature_list table records successfully seeded`);

    const featuresListPkQuery = addPrimaryKey('features_list', 'id_encid');
    const featuresListFkQuery = addForeignKey('features_list', 'product_id', 'features', 'product_id');
    try {
      await client.query(featuresListPkQuery);
      await client.query(featuresListFkQuery);
    } catch (err) {
      throw new Error(err);
    }
    console.log('Primary key and foreign key added for features_list table');

    //seed content grid table
    let contentGridListStartingId = 1;
    while (numContentGridTableRecords > 0) {
      const numPerFeature = 5;

      try {
        await writeToCsv(contentGridBatchSize, 'utf-8', contentGridCsvHeaders, generateContentGridRow, contentGridListStartingId, numPerFeature);
        await copyToDb('content_grid_feature_items', contentGridColumns, filePath, client);
      } catch (err) {
        throw new Error(err);
      }

      contentGridListStartingId += (contentGridBatchSize / numPerFeature);
      numContentGridTableRecords -= contentGridBatchSize;
      numContentGridTableRecords % 5000000 === 0 ? console.log(`${numContentGridTableRecords} content_grid table records left to seed`) : null;
    }

    console.log(`${numRecords * 5} content_grid table records successfully seeded`);

    const contentGridPkQuery = addPrimaryKey('content_grid_feature_items', 'id_encid');
    const contentGridFkQuery = addForeignKey('content_grid_feature_items', 'product_id', 'features', 'product_id');
    try {
      await client.query(contentGridPkQuery);
      await client.query(contentGridFkQuery);
    } catch (err) {
      throw new Error(err);
    }
    console.log('Primary key and foreign key added for content_grid table');

    const featuresListIndexQuery = createIndex('features_list', 'fl_product_id', 'product_id');
    const contentGridIndexQuery = createIndex('content_grid_feature_items', 'cg_product_id', 'product_id');
    try {
      await client.query(featuresListIndexQuery);
      await client.query(contentGridIndexQuery);
    } catch (err) {
      throw new Error(err);
    }
    console.log('Indexes added for database optimization');

    console.log('SQL data seeded successfully');
  });
}

seedSqlData(10000000, 100000, outputFile);
