const { generatefFeaturesTableRecord } = require('../database/data_seeding/data_generator.js');

function setUrlWithProductId(requestParams, context, ee, next) {
  const bottomTenPercentId = 9000000 + Math.ceil(Math.random() * 1000000);
  const url = `/product-features/${bottomTenPercentId}`;

  requestParams.url = url;
  return next();
}

function setFakeDataRecord(requestParams, context, ee, next) {
  const json = {
    table: 'features',
    record: generatefFeaturesTableRecord(),
  };

  requestParams.json = json;
  return next();
}


module.exports = {
  setUrlWithProductId,
  setFakeDataRecord,
}
