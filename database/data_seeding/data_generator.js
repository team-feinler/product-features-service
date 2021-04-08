const faker = require('faker');

const fakeHeader = () => faker.lorem.sentence().slice(0, -1);
const fakeSentence = () => faker.lorem.sentence();
const fakeDescription = () => faker.lorem.sentences();
const fakeTitle = () => faker.name.jobArea();

const generateNoSqlData = (batchSize, startingId) => {
  const data = [];

  while (batchSize > 0) {

    const generatedRecord = {
      productIdDecid: startingId,
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

module.exports.generateFeaturesTableRow = () => {
  const bannerHeader = fakeHeader();
  const bannerText1 = fakeDescription();
  const bannerText2 = fakeDescription();
  const setupHeader = fakeHeader();
  const setupDescription1 = fakeSentence();
  const setupDescription2 = fakeSentence();
  const setupDescription3 = fakeSentence();
  const additionalFeaturesHeader = fakeHeader();
  const additionalFeaturesDescription = fakeDescription();

  return`${bannerHeader},${bannerText1},${bannerText2},${setupHeader},1. ${setupDescription1},2. ${setupDescription2},3. ${setupDescription3},${additionalFeaturesHeader},${additionalFeaturesDescription}\n`;
}

module.exports.generateFeaturesListTableRow = (featureIdDecid) => {
  const header = fakeHeader();
  const description = fakeDescription();

  return `${header},${description},${featureIdDecid}\n`;
}

module.exports.generateContentGridRow = (featureIdDecid) => {
  const title = fakeTitle();
  const description = fakeDescription();

  return `${title},${description},${featureIdDecid}\n`;
}

module.exports.generateData = (batchSize, startingId, dataType, table) => {
  if (batchSize === undefined || startingId === undefined || dataType === undefined) {
    throw new Error('Must pass in a batchSize, startingId and dataType in order to generate data');
  }

  const data = generateNoSqlData(batchSize, startingId);

  return data;
}

module.exports.generatefFeaturesTableRecord = () => {
  const record = {
    feature_banner_header: `'${fakeHeader()}'`,
    feature_banner_text_1: `'${fakeDescription()}'`,
    feature_banner_text_2: `'${fakeDescription()}'`,
    feature_setup_header: `'${fakeHeader()}'`,
    feature_setup_description_1: `'${fakeSentence()}'`,
    feature_setup_description_2: `'${fakeSentence()}'`,
    feature_setup_description_3: `'${fakeSentence()}'`,
    additional_features_header: `'${fakeHeader()}'`,
    additional_features_description: `'${fakeDescription()}'`,
  };

  return record;
}

module.exports.formatData = (data) => {
  //extract shallow data points
  const dataSample = data[0];
  const {
    product_id,
    feature_banner_header,
    feature_banner_text_1,
    feature_banner_text_2,
    feature_setup_header,
    feature_setup_description_1,
    feature_setup_description_2,
    feature_setup_description_3,
    additional_features_header,
    additional_features_description,
  } = dataSample;

  //establish data collection variables
  const featuresList = [];
  const featuresListIds = [];
  const contentGridItems = [];
  const contentGridIds = [];

  //collect unique feature list items and content grid items
  data.map((row) => {
    if (featuresListIds.indexOf(row.fl_id_encid) === -1) {
      featuresList.push({
        header: row.fl_header,
        description: row.fl_description,
      });
      featuresListIds.push(row.fl_id_encid);
    }

    if (contentGridIds.indexOf(row.cg_id_encid) === -1) {
      contentGridItems.push({
        title: row.cg_title,
        description: row.cg_description,
      });
      contentGridIds.push(row.cg_id_encid);
    }

  });

  //put it all together
  const formattedData = {
    productId: product_id,
    banner: {
      header: feature_banner_header,
      text: [ feature_banner_text_1, feature_banner_text_2 ],
    },
    features: featuresList,
    featureSetup: {
      header: feature_setup_header,
      description: [ feature_setup_description_1, feature_setup_description_2, feature_setup_description_3 ],
    },
    additionalFeatures: {
      header: additional_features_header,
      description: additional_features_description,
      contentGrid: contentGridItems,
    }
  }

  return formattedData;
}
