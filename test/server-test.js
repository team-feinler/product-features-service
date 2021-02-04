const mongoose = require('mongoose');
const chai = require('chai'), chaiHttp = require('chai-http'), expect = require('chai').expect;
chai.use(chaiHttp);
const request = require('request');

// development server must be closed while testing, as tests also use port 4000
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
        .get('/product-features/1000')
        .end((err, res) => {
          expect(res.body).to.be.a('array')
          expect(res.body[0].productId).to.equal(1000)
          done();
        });
    });

    it('should return 404 for "product feature" record that does not exist', (done) => {
      chai.request(require('../server/server.js'))
        .get('/product-features/9000')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });

  after('Close mongoose connection', (done) => {
    mongoose.connection.close();
    done();
  })
});