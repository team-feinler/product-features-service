const mongoose = require('mongoose');
const ProductFeatures = require('../database/database.js');
const { fakeDataGenerator } = require('../database/seed-data/fakeDataGenerator.js');
const assert = require('assert');

describe('Database seeding', () => {
  describe('Fake Data Generator', () => {
    it('should generate 100 records when 100 records are requested', () => {
      let fakeTestData = fakeDataGenerator(100, 0);
      assert.equal(fakeTestData.length, 100);
    });
  });

  describe('Seeding Script', () => {
    it('throws an error if no parameters are passed into fakeDataGenerator()', (done) => {
      assert.throws(() => fakeDataGenerator(), Error, 'Must include recordsToCreate and startingRecordID params')
      done();
    });

    // open mongoose connection for database saving
    mongoose.connect('mongodb://localhost/fec_product_features');
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

    beforeEach('Clear database of test document record', (done) => {
      ProductFeatures.deleteOne({ productId: 1 }, (err) => {
        done();
      });
    });

    it('creates and saves record(s) in the database successfully', (done) => {
      let fakeTestData = fakeDataGenerator(1, 1);
      let fakeProductFeatures = new ProductFeatures(fakeTestData[0]);
      fakeProductFeatures.save()
        .then(() => {
          assert(!fakeProductFeatures.isNew);
        })
        .finally(() => {
          done();
        });
    });

    after('Close mongoose connection', (done) => {
      mongoose.connection.close();
      done();
    })
  });
});