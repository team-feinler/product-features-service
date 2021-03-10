const { user, password } = require('../../database_configs/nosql_database.config.js');
const nano = require('nano')(`http://${user}:${password}@localhost:5984`);
const { generateData } = require('./data_generator.js');

const destroyDb = async (dbName) => {
  await nano.db.destroy(dbName);
}

const createDb = async (dbName) => {
  await nano.db.create(dbName)
    .then((res) => {
      console.log('Database successfully created', res);
    })
    .catch((err) => {
      console.log('Error creating database', err);
    });
}

const insertData = (data) => {
  // code
}

const seedNoSqlData = async (numRecords, pace) => {

  await destroyDb('product_features');
  await createDb('product_features');
  const pf = nano.use('product_features');

  // while (numRecords < 0) {
  //   // seed
  // }
  const data = generateData(5, 1, 'nosql');

  data.map((record) => {
    const { productIdEncid } = record;
    pf.insert(record, productIdEncid)
      .then((res) => {
        console.log('Inserted record successfully', res);
      })
      .catch((err) => {
        console.log('Error inserting record', err);
      });
  });
}

seedNoSqlData(10000000, 1000);
