const faker = require('faker');

let fakeHeader = () => faker.lorem.sentence().slice(0, -1);
let fakeSentence = () => faker.lorem.sentence();
let fakeDescription = () => faker.lorem.sentences();
let fakeTitle = () => faker.name.jobArea();

let fakeDataGenerator = (recordsToCreate, startingRecordID) => {

  if (recordsToCreate === undefined || startingRecordID === undefined) {
    throw new Error('Must include recordsToCreate and startingRecordID params');
  }

  let data = [];

  while (recordsToCreate > 0) {
    data.push({
      productId: startingRecordID,
      banner: {
        header: fakeHeader(),
        text: fakeDescription()
      },
      features: [
        {
          header: fakeHeader(),
          description: fakeDescription()
        },
        {
          header: fakeHeader(),
          description: fakeDescription()
        },
        {
          header: fakeHeader(),
          description: fakeDescription()
        },
        {
          header: fakeHeader(),
          description: fakeDescription()
        },
        {
          header: fakeHeader(),
          description: fakeDescription()
        },
        {
          header: fakeHeader(),
          description: fakeDescription()
        },
        {
          header: fakeHeader(),
          description: fakeDescription()
        }
      ],
      featureSetup: {
        header: fakeHeader(),
        description: [fakeSentence(), fakeSentence(), fakeSentence()]
      },
      additionalFeatures: {
        header: fakeHeader(),
        description: fakeDescription(),
        contentGrid: [
          {
            title: fakeTitle(),
            description: fakeDescription()
          },
          {
            title: fakeTitle(),
            description: fakeDescription()
          },
          {
            title: fakeTitle(),
            description: fakeDescription()
          },
          {
            title: fakeTitle(),
            description: fakeDescription()
          },
          {
            title: fakeTitle(),
            description: fakeDescription()
          },
        ]
      }
    });

    recordsToCreate--;
    startingRecordID++;
  }

  return data;
};

module.exports.fakeDataGenerator = fakeDataGenerator;