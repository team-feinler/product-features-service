const mongoose = require('mongoose');

// open mongoose connection
mongoose.connect('mongodb://localhost/fec_product_features', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

const productFeaturesSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true
  },
  banner: {
    header: String,
    text: [{ type: String }]
  },
  features: [{
    header: String,
    description: String
  }],
  featureSetup: {
    header: String,
    description: [{ type: String }]
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

const insertRecord = async (record, callback) => {
  const { productId } = record;
  const recordExists = await ProductFeatures.count({ productId: productId });

  if (recordExists) {
    callback(new Error('Record with that product ID already exists'), null);
  } else {
    ProductFeatures.create(record, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  }
}

const getRecord = (productId, callback) => {
  ProductFeatures.find({ productId: productId })
    .exec((err, data) => {
      if (err || data[0] === undefined || !data[0].productId) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
}

const updateRecord = async (productId, updates, callback) => {
  ProductFeatures.findOneAndUpdate({ productId: productId }, updates, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

const deleteRecord = (productId, callback) => {
  ProductFeatures.deleteOne({ productId: productId }, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

module.exports = ProductFeatures;
module.exports.insertRecord = insertRecord;
module.exports.getRecord = getRecord;
module.exports.updateRecord = updateRecord;
module.exports.deleteRecord = deleteRecord;
