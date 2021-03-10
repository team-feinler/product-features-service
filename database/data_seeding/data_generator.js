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
