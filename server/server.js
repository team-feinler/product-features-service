const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('../database/database.js');

app.use(cors());

// keeping for development
// app.use('/', express.static(__dirname + '/../client/dist'));
// app.use('/:id', express.static(__dirname + '/../client/dist'));

// use for proxy server
app.use('/', express.static(__dirname + '/../public'));
app.use('/:id', express.static(__dirname + '/../public'));

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}


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
  const productId = req.params.id;
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