const { userName, password } = require('../../database_configs/nosql_database.config.js');
const nano = require('nano')(`http://${userName}:${password}@localhost:5984`);
const { generateData } = require('./data_generator.js');

const seedNoSqlData = async (numRecords, batchSize, startingId) => {

  if ((numRecords / batchSize) - Math.floor(numRecords / batchSize) !== 0) {
    throw new Error('Number of records must be divisible by batch size (ex: 1,000 records in batch sizes of 100)');
  }

  const copyOfNumRecords = numRecords;

  try {
    // await nano.db.destroy('product_features');
    await nano.db.create('product_features');
  } catch (err) {
    throw new Error(err);
  }

  const pf = nano.use('product_features');

  while (numRecords > 0) {
    const data = generateData(batchSize, startingId, 'nosql');

    try {
      await pf.bulk({ docs: data });
    } catch (err) {
      throw new Error(`Error seeding database for IDs ${startingId} through ${(startingId + batchSize) - 1}`);
    }

    numRecords % 1000000 === 0 ? console.log(`${numRecords} left to seed`) : null;

    numRecords -= batchSize;
    startingId += batchSize;
  }

  console.log(`Database seeding for ${copyOfNumRecords} records complete`);
}

seedNoSqlData(10000000, 2000, 1);
