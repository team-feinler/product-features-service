const assert = require('assert');
const expect = require('chai').expect;
const request = require('request');
const mongoose = require('mongoose');
const db = mongoose.connection;
const ProductFeatures = require('../database/database.js');
const { fakeDataGenerator } = require('../database/seed-data/fakeDataGenerator.js');

describe('Database seeding', function() {
  describe('Fake Data Generator', function() {
    it('should generate 100 records when 100 records are requested', function() {
      let fakeTestData = fakeDataGenerator(100, 0);
      assert.equal(fakeTestData.length, 100);
    });
  });

  describe('Seeding Script', function() {

    mongoose.connect('mongodb://localhost/fec_product_features');
    mongoose.connection
      .once('open', () => console.log('Database connected for testing!'))
      .on('error', (error) => {
        console.warn('Error: ', error);
      })

    beforeEach((done) => {
      db.collections.productfeatures.drop(() => {
        done();
      })
    })

    it('creates and saves records in the database sucessfully', (done) => {
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
  const url = 'http://localhost:4000/';
  describe('Loading Express', () => {
    it('should return status 200 at "http://localhost:4000/"', (done) => {
      request(url, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});