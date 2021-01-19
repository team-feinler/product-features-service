const express = require('express');
const app = express();
const port = 4000;
const db = require('../database/database.js');

app.get('/', (req, res) => {
  res.send('Hello World');
  res.statusCode(200);
})

app.get('/product-features/1000', (req, res) => {
  db.load((err, data) => {
    if (err) {
      console.log('Error loading data');
    }
    res.send(data);
  })
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
})