const faker = require('faker');
const md5 = require('md5');

const fakeHeader = () => faker.lorem.sentence().slice(0, -1);
const fakeSentence = () => faker.lorem.sentence();
const fakeDescription = () => faker.lorem.sentences();
const fakeTitle = () => faker.name.jobArea();

const generateNoSqlData = (batchSize, startingId) => {
  const data = [];

  while (batchSize > 0) {

    const generatedRecord = {
      productIdDecid: startingId,
      productIdEncid: md5(startingId),
      banner: {
        header: fakeHeader(),
        text: [ fakeDescription(), fakeDescription() ],
      },
      features: [
        {
          header: fakeHeader(),
          description: fakeDescription(),
        },
        {
          header: fakeHeader(),
          description: fakeDescription(),
        },
        {
          header: fakeHeader(),
          description: fakeDescription(),
        },
        {
          header: fakeHeader(),
          description: fakeDescription(),
        },
        {
          header: fakeHeader(),
          description: fakeDescription(),
        },
        {
          header: fakeHeader(),
          description: fakeDescription(),
        },
        {
          header: fakeHeader(),
          description: fakeDescription(),
        },
      ],
      featureSetup: {
        header: fakeHeader(),
        description: [ `1. ${fakeSentence()}`, `2. ${fakeSentence()}`, `3. ${fakeSentence()}` ],
      },
      additionalFeatures: {
        header: fakeHeader(),
        description: fakeDescription(),
        contentGrid: [
          {
            title: fakeTitle(),
            description: fakeDescription(),
          },
          {
            title: fakeTitle(),
            description: fakeDescription(),
          },
          {
            title: fakeTitle(),
            description: fakeDescription(),
          },
          {
            title: fakeTitle(),
            description: fakeDescription(),
          },
          {
            title: fakeTitle(),
            description: fakeDescription(),
          },
        ],
      },
    };

    data.push(generatedRecord);

    startingId++;
    batchSize--;
  }

  return data;
}

const generateSqlData = (batchSize, startingId) => {
  const data = [];

  while (batchSize > 0) {
    const productFeaturesDataObject = {
      featuresList: [],
      contentGridFeatureItems: [],
    };

    let numFeatureListItems = 7;
    let numContentGridItems = 5;

    productFeaturesDataObject.feature = {
      id_decid: startingId,
      feature_banner_header: `'${fakeHeader()}'`,
      feature_banner_text_1: `'${fakeDescription()}'`,
      feature_banner_text_2: `'${fakeDescription()}'`,
      feature_setup_header: `'${fakeHeader()}'`,
      feature_setup_description_1: `'1. ${fakeSentence()}'`,
      feature_setup_description_2: `'2. ${fakeSentence()}'`,
      feature_setup_description_3: `'3. ${fakeSentence()}'`,
      additional_features_header: `'${fakeHeader()}'`,
      additional_features_description: `'${fakeDescription()}'`,
    };

    while (numFeatureListItems > 0) {
      productFeaturesDataObject.featuresList.push({
        header: `'${fakeHeader()}'`,
        description: `'${fakeDescription()}'`,
        feature_id_decid: startingId,
      });
      numFeatureListItems--;
    }

    while (numContentGridItems > 0) {
      productFeaturesDataObject.contentGridFeatureItems.push({
        title: `'${fakeTitle()}'`,
        description: `'${fakeDescription()}'`,
        feature_id_decid: startingId,
      });
      numContentGridItems--;
    }

    data.push(productFeaturesDataObject);
    startingId++;
    batchSize--;
  }

  return data;
}

const generateData = (batchSize, startingId, dataType) => {
  if (batchSize === undefined || startingId === undefined || dataType === undefined) {
    throw new Error('Must pass in a batchSize, startingId and dataType in order to generate data');
  }

  let data;

  dataType === 'nosql' ? data = generateNoSqlData(batchSize, startingId) : data = generateSqlData(batchSize, startingId);

  return data;
}

module.exports.generateData = generateData;
