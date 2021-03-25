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

const generateFeaturesTableRow = () => {
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

const generateFeaturesListTableRow = (featureIdDecid) => {
  const header = fakeHeader();
  const description = fakeDescription();

  return `${header},${description},${featureIdDecid}\n`;
}

const generateContentGridRow = (featureIdDecid) => {
  const title = fakeTitle();
  const description = fakeDescription();

  return `${title},${description},${featureIdDecid}\n`;
}

const generateSqlData = (batchSize, startingId, table) => {
  const data = [];

  if (table === 'features') {

    while (batchSize > 0) {
      const dataString = `'${fakeHeader()}', '${fakeDescription()}', '${fakeDescription()}', '${fakeHeader()}', '1. ${fakeSentence()}', '2. ${fakeSentence()}', '3. ${fakeSentence()}', '${fakeHeader()}', '${fakeDescription()}'`;
      data.push(`(${dataString})`);
      batchSize--;
    }

  } else if (table === 'featuresList') {
    // code
  } else if (table === 'contentGrid') {
    // code
  }

  return data;
}

const generateData = (batchSize, startingId, dataType, table) => {
  if (batchSize === undefined || startingId === undefined || dataType === undefined) {
    throw new Error('Must pass in a batchSize, startingId and dataType in order to generate data');
  }

  let data;

  dataType === 'nosql' ? data = generateNoSqlData(batchSize, startingId) : data = generateSqlData(batchSize, startingId, table);

  return data;
}

module.exports.generateData = generateData;
module.exports.generateFeaturesTableRow = generateFeaturesTableRow;
module.exports.generateFeaturesListTableRow = generateFeaturesListTableRow;
module.exports.generateContentGridRow = generateContentGridRow;
