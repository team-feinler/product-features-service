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
  console.log('Mongoose connected established.');
});

const productFeaturesSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true
  },
  banner: {
    header: String,
    text: String
  },
  features: [{
    header: String,
    description: String
  }],
  featureSetup: {
    header: String,
    description: []
  },
  additionalFeatures: {
    header: String,
    description: String,
    contentGrid: [{
      title: String,
      description: String
    }]
  }
});

const ProductFeatures = mongoose.model('ProductFeatures', productFeaturesSchema);

module.exports = ProductFeatures;
