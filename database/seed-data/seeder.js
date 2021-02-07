const mongoose = require('mongoose');
const ProductFeatures = require('../database.js');
const { fakeDataGenerator } = require('./fakeDataGenerator.js');
const { fakeDataRecord } = require('./fakeDataRecord.js');

async function seedDatabase(recordsToCreate, startingRecordID) {
  try {
    let fakeData = await fakeDataGenerator(recordsToCreate, startingRecordID);

    (async () => {
      try {
        await mongoose.connect('mongodb://localhost/fec_product_features', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        });
      } catch (error) {
        console.log('connection error', err);
      }
    })();

    mongoose.connection.once('open', () => console.log('Mongoose connection established for seeding.'));

    await ProductFeatures.deleteMany({});
    console.log('Clearning ProductFeatures database collection before seeding.');

    console.log(`Seeding database with ${fakeData.length} record(s).`);
    ProductFeatures.insertMany(fakeData)
    .then(() => {
      return ProductFeatures.findOneAndUpdate({ productId: startingRecordID }, fakeDataRecord, {
        returnOriginal: false
      })
    })
    .then(() => console.log('Database seeding complete.'))
    .catch((err) => console.log('Error seeding database.', err))
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