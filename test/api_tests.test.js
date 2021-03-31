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
          const { body: [ {
            feature_banner_header,
            feature_banner_text_1,
            feature_banner_text_2,
            feature_setup_header,
            feature_setup_description_1,
            feature_setup_description_2,
            feature_setup_description_3,
            additional_features_header,
            additional_features_description,
            fl_header,
            fl_description,
            cg_title,
            cg_description,
          } ] } = res;
          expect(feature_banner_header).toBeDefined();
          expect(feature_banner_text_1).toBeDefined();
          expect(feature_banner_text_2).toBeDefined();
          expect(feature_setup_header).toBeDefined();
          expect(feature_setup_description_1).toBeDefined();
          expect(feature_setup_description_2).toBeDefined();
          expect(feature_setup_description_3).toBeDefined();
          expect(additional_features_header).toBeDefined();
          expect(additional_features_description).toBeDefined();
          expect(fl_header).toBeDefined();
          expect(fl_description).toBeDefined();
          expect(cg_title).toBeDefined();
          expect(cg_description).toBeDefined();
          return done();
        }
      });
  });

  it('Should update a record in the db for a valid ID via a PUT request to /product-features', (done) => {
    const record = fakeData.fakeDataRecord;

    db.insertRecord(record, (err, res) => {
      if (err) {
        return done(err);
      } else {
        request(app)
          .put('/product-features')
          .send({ productId: record.productId, updates: { banner: { header: 'This is a new header', text: 'This is new text' }}})
          .expect(200)
          .end((err2, res2) => {
            if (err2) {
              return done(err2);
            } else {
              db.getRecord(record.productId, (err3, res3) => {
                if (err3) {
                  return done(err3);
                } else {
                  expect(res3[0].banner.header).toEqual('This is a new header');
                  expect(res3[0].banner.text[0]).toEqual('This is new text');
                  db.deleteRecord(record.productId, (err4, res4) => {
                    if (err4) {
                      return done(err4);
                    } else {
                      return done();
                    }
                  });
                }
              });
            }
          });
      }
    });
  });

  it('Should delete a record in the db for a valid ID via a DELETE request to /product-features', (done) => {
    const record = fakeData.fakeDataRecord;

    db.insertRecord(record, (err, res) => {
      if (err) {
        return done(err);
      } else {
        request(app)
          .delete('/product-features')
          .send({ productId: record.productId })
          .expect(200)
          .end((err2, res2) => {
            if (err2) {
              return done(err2);
            } else {
              db.getRecord(record.productId, (err3, res3) => {
                if(err3) {
                  return done();
                } else {
                  return done(new Error('Record deletion unsuccessful'));
                }
              });
            }
          });
      }
    });
  });
});
