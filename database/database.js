const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/fec_product_features', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

db.on('error', console.error.bind(console, 'connection error:'));

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
    description: [{type: String}]
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

const load = (productId, callback) => {
  ProductFeatures.find({ productId: productId })
    .exec((err, data) => {
      if (err) {
        console.log(`Error loading product ${productId} from database`);
        callback(err);
      } else {
        callback(null, data);
      }
    });
}

module.exports.ProductFeatures = ProductFeatures;
module.exports.load = load;
