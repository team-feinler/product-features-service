const mongoose = require('mongoose');
const ProductFeatures = require('../database/database.js');
const { fakeDataGenerator } = require('../database/seed-data/fakeDataGenerator.js');

// require dev-dependencies for testing
const assert = require('assert');
const chai = require('chai'), chaiHttp = require('chai-http'), expect = require('chai').expect;
chai.use(chaiHttp);
const request = require('request');


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

    // before running testing, delete test document record
    beforeEach((done) => {
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
          mongoose.connection.close();
          done();
        });
    });
  });
});

describe('Express Server', () => {
  describe('Express Middleware', () => {
    it('should return status 200 at "http://localhost:4000/:id"', (done) => {
      chai.request(require('../server/server.js'))
        .get('/:id')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should GET a single "product feature" record', (done) => {
      chai.request(require('../server/server.js'))
        .get('/product-features/:id')
        .query({
          productId: 1000
        })
        .end((err, res) => {
          expect(res.body).to.be.a('array')
          expect(res.body[0].productId).to.equal(1000)
          done();
        });
    });

    it('should return 404 for "product feature" record that does not exist', (done) => {
      chai.request(require('../server/server.js'))
        .get('/product-features/:id')
        .query({
          productId: 9000
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          mongoose.connection.close();
          done();
        });
    });
  });
});