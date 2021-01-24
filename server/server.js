const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const db = require('../database/database.js');

app.use('/:id', express.static(__dirname + '/../client/dist'));

// open mongoose connection
mongoose.connect('mongodb://localhost/fec_product_features', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// express middleware
app.get('/product-features/:id', (req, res) => {
  let productId = req.query.productId;
  console.log(`Requesting product ${productId} from the database.`)
  db.load(productId, (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
    res.json(data);
  });
});

const server = app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

module.exports = server;