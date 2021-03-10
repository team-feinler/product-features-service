const request = require('supertest');
const app = require('../server');

const db = require('../database/database.js');

const fakeData = require('../database/seed-data/fakeDataRecord.js');

describe('API Endpoints', () => {
  it('Should post a record to the db via a POST request to /product-features', (done) => {
    const record = fakeData.fakeDataRecord;

    request(app)
      .post('/product-features')
      .send({ record: record })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          db.deleteRecord(record.productId, (err2, res) => {
            if (err2) {
              return done(err2);
            } else {
              return done();
            }
          });
        }
      });
  });

  it('Should retreive a record from the db for a valid ID via a GET request to /product-features', (done) => {
    const record = fakeData.fakeDataRecord;

    db.insertRecord(record, (err, res) => {
      if (err) {
        return done(err);
      } else {
        request(app)
          .get('/product-features/10000001')
          .expect(200)
          .end((err2, res2) => {
            if (err2) {
              return done(err2);
            } else {
              db.deleteRecord(record.productId, (err3, res3) => {
                if (err3) {
                  return done(err3);
                } else {
                  return done();
                }
              });
            }
          });
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
