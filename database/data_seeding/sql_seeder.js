const faker = require('faker');
const fs = require('fs');
const util = require('util');
const { Pool } = require('pg');
const copyFrom  = require('pg-copy-streams').from;

const { userName, password } = require('../../database_configs/sql_database.config.js');
const { generateFeaturesTableRow, generateFeaturesListTableRow, generateContentGridTableRow } = require('./data_generator.js');
const { generateCopyQuery } = require('./query_generator.js');
const outputFile = `${__dirname}/seeding.csv`;

const pool =  new Pool({
  user: userName,
  password: password,
  host: 'localhost',
  database: 'product_features',
  port: 5432,
});

const writeToCsv = async (lines, encoding, headers, createData) => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(outputFile);
    writeStream.write(headers, encoding);

    const done = () => {
      writeStream.end()
    }

    const writing = () => {
      let canWrite = true;

      do {
        lines--;
        let row = createData();
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

const copyToDb = (table, columns, filePath) => {
  return new Promise((resolve, reject) => {
    const query = generateCopyQuery(table, columns, filePath);

    pool.connect((err, client, done) => {
      const dataStream = client.query(copyFrom(query));
      const fileStream = fs.createReadStream(filePath);

      fileStream.on('error', (err) => { reject(err); });
      dataStream.on('error', (err) => { reject(err); });
      dataStream.on('finish', () => { resolve(true); });
      fileStream.pipe(dataStream);
    });
  });
}

const seedSqlData = async (numRecords, batchSize, filePath) => {

  if ((numRecords / batchSize) - Math.floor(numRecords / batchSize) !== 0) {
    throw new Error('Number of records must be divisible by batch size (ex: 1,000 records in batch sizes of 100)');
  }

  let numFeaturesTableRecords = numRecords;
  let numFeaturesListTableRecords = numRecords * 7;
  let numContentGrieTableRecords = numRecords * 5;

  //seed features table
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
  const csvHeaders = `${featuresColumns.join(',')}\n`;

  while (numFeaturesTableRecords > 0) {

    try {
      await writeToCsv(batchSize, 'utf-8', csvHeaders, generateFeaturesTableRow);
      await copyToDb('features', featuresColumns, filePath);
    } catch (err) {
      console.log(err);
    }

    numFeaturesTableRecords -= batchSize;
  }

  console.log(`${numRecords} feature records successfully seeded`);

  //seed features list table

  //seed content grid table
}

seedSqlData(25, 5, outputFile);
