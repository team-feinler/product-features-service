const request = require('supertest');
const app = require('../server');

const db = require('../database/database.js');

const {
  featuresTableRecord,
  featuresListTableRecord,
  contentGridTableRecord,
} = require('../database/data_seeding/fake_data_records.js');

let testingProductId;

describe('API Endpoints', () => {
  it('Should post a record to the features table in the db via a POST request to /product-features', (done) => {

    request(app)
      .post('/product-features')
      .send({
        table: 'features',
        record: featuresTableRecord,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          const { body: { rows: [ { product_id } ] } } = res;
          testingProductId = product_id;
          expect(product_id).toBeDefined();
          return done();
        }
      });
  });

  it('Should post a record to the features_list table in the db via a POST request to /product-features', (done) => {
    featuresListTableRecord.product_id = testingProductId;

    request(app)
      .post('/product-features')
      .send({
        table: 'features_list',
        record: featuresListTableRecord,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          const { body: { rows: [ { product_id } ] } } = res;
          expect(product_id).toBeDefined();
          return done();
        }
      });
  });

  it('Should post a record to the content_grid table in the db via a POST request to /product-features', (done) => {
    contentGridTableRecord.product_id = testingProductId;

    request(app)
      .post('/product-features')
      .send({
        table: 'content_grid_feature_items',
        record: contentGridTableRecord,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          const { body: { rows: [ { product_id } ] } } = res;
          expect(product_id).toBeDefined();
          return done();
        }
      });
  });

  it('Should retreive a record and all associated feature data from the db for a valid ID via a GET request to /product-features', (done) => {
    request(app)
      .get(`/product-features/${testingProductId}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          const { body: {
            productId,
            banner,
            features,
            featureSetup,
            additionalFeatures,
          } } = res;
          expect(productId).toBeDefined();
          expect(banner).toBeDefined();
          expect(features).toBeDefined();
          expect(featureSetup).toBeDefined();
          expect(additionalFeatures).toBeDefined();
          return done();
        }
      });
  });

  it('Should update a record in the db for a valid ID via a PUT request to /product-features', (done) => {
    const updates = {
      feature_setup_header: "'hello'",
    };
    request(app)
      .put(`/product-features/${testingProductId}`)
      .send({
        table: 'features',
        updates: updates,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          const { body: { rows } } = res;
          expect(rows[0].feature_setup_header).toEqual('hello');
          return done();
        }
      });
  });

  it('Should delete a records in the db for a valid ID via a DELETE request to /product-features', (done) => {
    request(app)
      .delete(`/product-features/${testingProductId}`)
      .send({
        table: 'features_list'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          const { body: { rows: [ { product_id } ] } } = res;
          expect(product_id).toEqual(testingProductId);
          return done();
        }
      });

      request(app)
        .delete(`/product-features/${testingProductId}`)
        .send({
          table: 'content_grid_feature_items'
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          } else {
            const { body: { rows: [ { product_id } ] } } = res;
            expect(product_id).toEqual(testingProductId);
            return done();
          }
        });

        request(app)
          .delete(`/product-features/${testingProductId}`)
          .send({
            table: 'features'
          })
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            } else {
              const { body: { rows: [ { product_id } ] } } = res;
              expect(product_id).toEqual(testingProductId);
              return done();
            }
          });
  });
});
