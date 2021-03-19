const faker = require('faker');
const fs = require('fs');
const { Pool } = require('pg');
const copyFrom  = require('pg-copy-streams').from;

const lines = 2000000;
const fileName = 'test.csv';
const stream = fs.createWriteStream(fileName);

const { generateFeaturesTableRow } = require('./database/data_seeding/data_generator.js');
const { generateCopyQuery } = require('./database/data_seeding/query_generator.js');


const pool = new Pool({
  user: 'tylerbrown',
  password: '',
  host: 'localhost',
  database: 'product_features',
  port: 5432,
});

const createUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const age = Math.ceil(Math.random() * 100);
  const likesHiking = Math.ceil(Math.random() * 10) > 5;

  return `${firstName},${lastName},${age},${likesHiking}\n`;
}

const startWriting = (writeStream, encoding, done) => {
  let i = lines;

  const writing = () => {
    let canWrite = true;

    do {
      i--;
      let data = generateFeaturesTableRow();
      if (i === 0) {
        writeStream.write(data, encoding, done);
      } else {
        writeStream.write(data, encoding);
      }
    } while (i > 0 && canWrite);

    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
}

const copyToDb = async (filePath) => {
  const columns = [
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
  stream.write(`${columns.join(',')}\n`);

  try {
    await startWriting(stream, 'utf-8', () => {
      stream.end();
    });
  } catch (err) {
    console.log(err);
  }

  pool.connect((err, client, done) => {
    const query = generateCopyQuery('features', columns);
    const queryStream = client.query(copyFrom(query));
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', done);
    queryStream.on('error', done);
    queryStream.on('finish', done);
    fileStream.pipe(queryStream);
  });
}

copyToDb(`${__dirname}/test.csv`);
