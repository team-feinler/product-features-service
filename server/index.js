const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('../database/database.js');
const { getFeatureDataForProductId } = require('../database/database_new.js');

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname + '/../public')));
app.use('/:id', express.static(path.join(__dirname + '/../public')));

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.post('/product-features', (req, res) => {
  const { body: { record } } = req;

  db.insertRecord(record, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/product-features/:id', async (req, res) => {
  const productId = req.params.id;

  // try {
  //   const { rows } = await getFeatureDataForProductId(productId);
  //   console.log(rows);
  //   res.send(rows);
  // } catch (err) {
  //   res.status(500).send(err);
  // }

  db.getRecord(productId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.put('/product-features', (req, res) => {
  const { body: { productId, updates } } = req;

  db.updateRecord(productId, updates, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.delete('/product-features', (req, res) => {
  const { body: { productId } } = req;

  db.deleteRecord(productId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  })
});

module.exports = app;
