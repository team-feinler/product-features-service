const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('../database/database.js');

app.use(cors());
app.use('/', express.static(path.join(__dirname + '/../public')));
app.use('/:id', express.static(path.join(__dirname + '/../public')));

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.get('/product-features/:id', (req, res) => {
  const productId = req.params.id;
  db.load(productId, (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
    res.json(data);
  });
});

app.post('/product-features/:id', () => {
  // code
});

app.delete('/product-features/:id', () => {
  // code
});

app.put('/product-features/:id', () => {
  // code
});

module.exports = app;
