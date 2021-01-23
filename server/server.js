const express = require('express');
const app = express();
const port = 4000;
const db = require('../database/database.js');

app.use('/:id', express.static(__dirname + '/../client/dist'));

app.get('/product-features/:id', (req, res) => {
  let productId = req.query.productId;
  console.log(`Requesting product ${productId} from the database.`)
  db.load(productId, (err, data) => {
    if (err) {
      console.log('Error loading data');
    }
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

module.exports = app;