const mongoose = require('mongoose');
const ProductFeatures = require('../database.js');
const { fakeDataGenerator } = require('./fakeDataGenerator.js');

(async function seedDatabase() {
  try {
    // load fakeDataGenerator with (recordsToCreate, startingRecordID)
    let fakeData = await fakeDataGenerator(100, 1000);
    console.log(`Seeding database with ${fakeData.length} record(s).`);

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
})();