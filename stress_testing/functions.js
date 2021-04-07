const { featuresTableRecord } = require('../database/data_seeding/fake_data_records.js');

function setUrlWithProductId(requestParams, context, ee, next) {
  const bottomTenPercentId = 9000000 + Math.ceil(Math.random() * 1000000);
  const url = `/product-features/${bottomTenPercentId}`;

  requestParams.url = url;
  return next();
}

function generateFakeFeaturesRecord() {
  // code
}

module.exports = {
  setUrlWithProductId,
  generateFakeFeaturesRecord,
}