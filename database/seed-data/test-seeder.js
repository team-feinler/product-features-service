const mongoose = require('mongoose');
const ProductFeatures = require('../database.js');

let exampleData = {
  productId: 9001,
  banner: {
    header: 'Meet the all-new Echo Dot',
    text: [{
      description: 'Round out any room with Alexa. Our most popular smart speaker has a sleek, compact design that fits perfectly into small spaces. It delivers crisp vocals and balanced bass for full sound you can enjoy anywhere in your home.'
    }]
  },
  features: [
    {
      header: 'More music in more rooms',
      description: 'Use your voice to play a song, artist, or genre through Amazon Music, Apple Music, Spotify, Pandora, and others. And with multi-room music, you can fill your whole home with music, radio stations, podcasts, and Audible using compatible Echo devices in different rooms.'
    },
    {
      header: 'Alexa is happy to help',
      description: 'Make your life easier at home. Set timers, ask questions, add items to lists, and create calendar events and reminders. Check the traffic and weather, or play the news. Access tens of thousands of Alexa skills, like Headspace or Sleep Sounds. And do it all with just your voice.'
    }
  ],
  additionalFeatures: [
    {
      header: 'Materials',
      description: '50% post-consumer recycled plastics 100% post-consumer recycled fabric 100% recycled die-cast aluminum Device, cable and adapter included'
    },
    {
      header: 'Clean Energy',
      description: 'Amazon is building new wind and solar farms to produce clean energy equivalent to the electricity used by this device.'
    },
    {
      header: 'Low Power Mode',
      description: 'To reduce its energy consumption, this device will enter Low Power Mode when it is idle. Low Power Mode is not available for certain user configurations. To learn more, see Low Power Mode Restrictions.'
    }
  ]
};

let seedDatabase = function() {
  console.log('Seeding Database');
  ProductFeatures.create(exampleData)
    .then((data) => {
      console.log('Product feature record(s) sucessfully created');
    })
    .catch((err) => {
      console.log('Error seeding database.', err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}();