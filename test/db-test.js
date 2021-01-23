const assert = require('assert');
const expect = require('chai').expect;
const request = require('request');
const mongoose = require('mongoose');
const db = mongoose.connection;
const ProductFeatures = require('../database/database.js');
const { fakeDataGenerator } = require('../database/seed-data/fakeDataGenerator.js');

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

    mongoose.connect('mongodb://localhost/fec_product_features');
    mongoose.connection
      .on('error', (error) => {
        console.warn('Error: ', error);
      });

    beforeEach((done) => {
      db.collections.productfeatures.drop(() => {
        done();
      });
    });

    it('creates and saves record(s) in the database sucessfully', (done) => {
      let fakeTestData = fakeDataGenerator(1, 0);
      let fakeProductFeatures = new ProductFeatures(fakeTestData);
      fakeProductFeatures.save()
        .then(() => {
          assert(!fakeProductFeatures.isNew);
          done();
        })
        .finally(() => mongoose.connection.close());
    });
  });
});

describe('Express Server', () => {
  const url = 'http://localhost:4000/:id';
  describe('Loading Express', () => {
    it('should return status 200 at "http://localhost:4000/:id"', (done) => {
      request(url, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});