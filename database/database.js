const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/fec_product_features', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose connected successfully!');
});

const productFeaturesSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true
  },
  banner: {
    header: String,
    text: [{
      description: String
    }]
  },
  features: [{
    header: String,
    description: String
  }],
  additionalFeatures: [{
    header: String,
    description: String
  }]
});

const ProductFeatures = mongoose.model('productFeatures', productFeaturesSchema);

module.exports = ProductFeatures;
