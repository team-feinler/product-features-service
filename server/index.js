const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const { formatData } = require('../database/data_seeding/data_generator.js');
const {
  addFeatureRecord,
  getFeatureRecord,
  updateFeatureRecord,
  deleteFeatureRecord,
} = require('../database/database.js');

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname + '/../public')));
app.use('/:id', express.static(path.join(__dirname + '/../public')));

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200
// }

app.post('/product-features', async (req, res) => {
  const { body: { table, record } } = req;

  try {
    const response = await addFeatureRecord(table, record);
    res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/product-features/:id', async (req, res) => {
  const { params: { id: productId } } = req;

  try {
    const { rows } = await getFeatureRecord(productId);
    const formattedData = formatData(rows);
    res.send(formattedData);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/product-features/:id', async (req, res) => {
  const { params: { id: productId } } = req;
  const { body: { table, updates } } = req;

  try {
    const response = await updateFeatureRecord(table, productId, updates);
    res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/product-features/:id', async (req, res) => {
  const { params: { id: productId } } = req;
  const { body: { table } } = req;

  try {
    const response = await deleteFeatureRecord(table, productId);
    res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
