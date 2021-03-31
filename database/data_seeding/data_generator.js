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

module.exports.generateData = (batchSize, startingId, dataType, table) => {
  if (batchSize === undefined || startingId === undefined || dataType === undefined) {
    throw new Error('Must pass in a batchSize, startingId and dataType in order to generate data');
  }

  let data;

  dataType === 'nosql' ? data = generateNoSqlData(batchSize, startingId) : data = generateSqlData(batchSize, startingId, table);

  return data;
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
  console.log(formattedData);

  return formattedData;
}

const fullFakeDataRecord = {
  productId: 10000001,
  banner: {
    header: 'Meet the all-new Echo',
    text: ['Talk about well-rounded. Echo combines premium sound, a built-in Zigbee smart home hub, and a temperature sensor. Powerful speakers deliver clear highs, dynamic mids, and deep bass for rich, detailed sound that adapts to any room.', 'Just ask Alexa to play music, answer questions, make calls, and tell you the news, sports scores, weather, and more.']
  },
  features: [
    {
      header: '“Alexa, play music everywhere”',
      description: 'Use your voice to play a song, artist, or genre through Amazon Music, Apple Music, Spotify, Pandora, and others. With multi-room music, you can fill your whole home with music, radio stations, podcasts, and Audible using compatible Echo devices in different rooms. You can even pair your Echo with compatible Fire TV devices to feel scenes come to life with home theater audio.'
    },
    {
      header: 'Built-in smart home hub with simple setup',
      description: 'The built-in smart home hub lets you easily set up and manage dozens of smart devices that use Zigbee. Just power on compatible lights, plugs, sensors, and locks and say, “Alexa, discover my devices.” The hub also works with Ring Smart Lighting (coming soon).'
    },
    {
      header: 'Alexa Guard can help you keep your home safe',
      description: 'Set up Guard for free in the Alexa app to get mobile alerts if your Echo device detects the sound of a smoke alarm or glass breaking while you’re away. And subscribe to Guard Plus for even more help protecting your home, like an Emergency Helpline you can call with just your voice and more. Learn more about Guard and Guard Plus.'
    },
    {
      header: 'Alexa is happy to help',
      description: 'Make your life easier at home. Set timers, ask questions, add items to lists, and create calendar events and reminders. Check the traffic and weather, or play the news. Access tens of thousands of Alexa skills. You can even bring new life to game night with Song Quiz, Jeopardy!, Common Knowledge, and more.'
    },
    {
      header: 'Stay connected and in sync',
      description: 'Instantly drop in on other rooms in your home or make an announcement to every room that has a compatible Echo device. Let everyone know dinner is ready, or remind the kids that it’s bedtime. You can also stay in touch with friends and family with hands-free calling.'
    },
    {
      header: 'Alexa for kids',
      description: 'Make Alexa kid-friendly at no extra charge. Turn on parental controls with Amazon Kids (FreeTime), right in the Alexa app. Alexa will automatically give kid-friendly responses, filter explicit songs and block shopping. Parents can also enable communications features, set time limits, and review activity. Children’s privacy is important to us. Learn more about using Amazon Kids with Alexa.'
    },
    {
      header: 'Designed to protect your privacy',
      description: 'Alexa and Echo devices are built with multiple layers of privacy protection. Echo smart speakers have a microphone off button that electronically disconnects the microphones. You also have control over your voice recordings and can view, hear, or delete them at any time. Learn more about Alexa privacy.'
    }
  ],
  featureSetup: {
    header: 'Simple to set up and use',
    description: ['1. Plug in Echo and connect to the internet with the Alexa app.', '2. Just ask Alexa for music, weather, news, and more.', '3. For simple setup with compatible smart home devices, say, “Alexa, discover my devices.”'],
  },
  additionalFeatures: {
    header: 'Every day is an earth day',
    description: 'You don’t have to be an environmental scientist to make sustainable choices. We considered sustainability in the design of this device. Here’s how:',
    contentGrid: [
      {
        title: 'Materials',
        description: '50% post-consumer recycled plastics 100% post-consumer recycled fabric 100% recycled die-cast aluminum Device, cable and adapter include'
      },
      {
        title: 'Clean Energy',
        description: 'Amazon is building new wind and solar farms to produce clean energy equivalent to the electricity used by this device.'
      },
      {
        title: 'Low Power Mode',
        description: 'To reduce its energy consumption, this device will enter Low Power Mode when it is idle. Low Power Mode is not available for certain user configurations. To learn more, see Low Power Mode Restrictions.'
      },
      {
        title: 'Alexa',
        description: 'Track and manage the energy usage of your Alexa-connected devices with a new energy dashboard, coming soon to the Alexa app.'
      },
      {
        title: 'Device Packaging',
        description: '99% of this device’s packaging is made of wood fiber-based materials from responsibly managed forests or recycled sources.'
      },
    ]
  }
}
