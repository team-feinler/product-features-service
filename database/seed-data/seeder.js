const mongoose = require('mongoose');
const ProductFeatures = require('../database.js');
const { fakeDataGenerator } = require('./fakeDataGenerator.js');

async function seedDatabase(recordsToCreate, startingRecordID) {
  try {
    let fakeData = await fakeDataGenerator(recordsToCreate, startingRecordID);
    console.log(`Seeding database with ${fakeData.length} record(s).`);

    mongoose.connect('mongodb://localhost/fec_product_features', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.once('open', () => console.log('Mongoose connection established for seeding.'));

    ProductFeatures.insertMany(fakeData)
    .then(() => console.log('Database seeding complete.'))
    .catch((err) => console.log('Error seeding database', err))
    .finally(() => mongoose.connection.close());
  }
  catch(error) {
    // catch fakeDataGenerator error
    console.log(error);
    mongoose.connection.close();
  }
};

// load seedDatabase with (recordsToCreate, startingRecordID)
seedDatabase(100, 1000);

module.exports.seedDatabase = seedDatabase;