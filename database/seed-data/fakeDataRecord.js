const fakeDataRecord = {
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
    description: ['1. Plug in Echo and connect to the internet with the Alexa app.', '2. Just ask Alexa for music, weather, news, and more.', '3. For simple setup with compatible smart home devices, say, “Alexa, discover my devices.”']
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

module.exports.fakeDataRecord = fakeDataRecord;
