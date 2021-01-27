import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import dummyImages from './dummyImages.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productPhotos: dummyImages
    }
  }

  render() {
    let img = this.state.productPhotos;
    return (
      <div className="product-features">
        <div className="banner">
          <div className ="banner-background"
          style={{backgroundImage: `url(${img.bannerImage})`}}>
            <div className="banner-header">
              <h2>Meet the all-new Echo</h2>
            </div>
            <div>
              <div className="banner-text">
                <p className="banner-textblock-left">Talk about well-rounded. Echo combines premium sound, a built-in Zigbee smart home hub, and a temperature sensor. Powerful speakers deliver clear highs, dynamic mids, and deep bass for rich, detailed sound that adapts to any room.</p>
                <p className="banner-textblock-right">Just ask Alexa to play music, answer questions, make calls, and tell you the news, sports scores, weather, and more.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="feature-block-1">
            <h2>More music in more rooms</h2>
            <p>Use your voice to play a song, artist, or genre through Amazon Music, Apple Music, Spotify, Pandora, and others. With multi-room music, you can fill your whole home with music, radio stations, podcasts, and Audible using compatible Echo devices in different rooms. You can even pair your Echo with compatible Fire TV devices to feel scenes come to life with home theater audio.</p>
          </div>
          <img className="feature-block-1-media" src={img.featuresBlock1logo}></img>
          <img className="feature-logo-banner" src={img.featuresBlock1media}></img>
          <div className="feature-block-2-background" style={{backgroundImage: `url(${img.featuresBlock2})`}}>
            <div className="feature-block-2">
              <div className="feature-block-2-content">
                <h2>Built-in smart home hub with simple setup</h2>
                <p>The built-in smart home hub lets you easily set up and manage dozens of smart devices that use Zigbee. Just power on compatible lights, plugs, sensors, and locks and say, “Alexa, discover my devices.” The hub also works with Ring Smart Lighting (coming soon).</p>
              </div>
            </div>
          </div>
          <div className="feature-block-3-background" style={{backgroundImage: `url(${img.featuresBlock3})`}}>
            <div className="feature-block-3">
              <h2>Alexa Guard can help you keep your home safe</h2>
              <p>Set up Guard for free in the Alexa app to get mobile alerts if your Echo device detects the sound of a smoke alarm or glass breaking while you’re away. And subscribe to Guard Plus for even more help protecting your home, like an Emergency Helpline you can call with just your voice and more. Learn more about Guard and Guard Plus.</p>
            </div>
          </div>
          <div className="feature-block-4-background" style={{backgroundImage: `url(${img.featuresBlock4})`}}>
            <div className="feature-block-4">
              <h2>Alexa is happy to help</h2>
              <p>Make your life easier at home. Set timers, ask questions, add items to lists, and create calendar events and reminders. Check the traffic and weather, or play the news. Access tens of thousands of Alexa skills. You can even bring new life to game night with Song Quiz, Jeopardy!, Common Knowledge, and more.</p>
            </div>
          </div>
          <div className="feature-block-5-background" style={{backgroundImage: `url(${img.featuresBlock5})`}}>
            <div className="feature-block-5">
              <h2>Stay connected and in sync</h2>
              <p>Instantly drop in on other rooms in your home or make an announcement to every room that has a compatible Echo device. Let everyone know dinner is ready, or remind the kids that it’s bedtime. You can also stay in touch with friends and family with hands-free calling.</p>
            </div>
          </div>
          <div className="feature-block-6-background" style={{backgroundImage: `url(${img.featuresBlock6})`}}>
            <div className="feature-block-6">
              <h2>Alexa for kids</h2>
              <p>Make Alexa kid-friendly at no extra charge. Turn on parental controls with Amazon Kids (FreeTime), right in the Alexa app. Alexa will automatically give kid-friendly responses, filter explicit songs and block shopping. Parents can also enable communications features, set time limits, and review activity. Children’s privacy is important to us. Learn more about using Amazon Kids with Alexa.</p>
            </div>
          </div>
          <div className="feature-block-7">
            <img className="feature-block-7-media" src={img.featuresBlock7}></img>
            <div className="feature-block-7-text">
              <h2>Designed to protect your privacy</h2>
              <p>Alexa and Echo devices are built with multiple layers of privacy protection. Echo smart speakers have a microphone off button that electronically disconnects the microphones. You also have control over your voice recordings and can view, hear, or delete them at any time. Learn more about Alexa privacy.</p>
            </div>
          </div>
        </div>

        <div className="feature-setup">
          <div className="feature-setup-header">
            <h2>Simple to set up and use</h2>
          </div>
          <div className="feature-setup-row">
            <div className="feature-setup-item">
              <img className="feature-block-7-media" src={img.featuresBlock8[0]}></img>
              <p>1. Plug in Echo and connect to the internet with the Alexa app.</p>
            </div>
            <div>
              <img className="feature-block-7-media" src={img.featuresBlock8[1]}></img>
              <p>2. Just ask Alexa for music, weather, news, and more.</p>
            </div>
            <div>
              <img className="feature-block-7-media" src={img.featuresBlock8[2]}></img>
              <p>3. For simple setup with compatible smart home devices, say, “Alexa, discover my devices.”</p>
            </div>
          </div>
        </div>

        <div className="additional-features">
          <div className="additional-features-header">
            <h2>Every day is an earth day</h2>
          </div>
          <div className="additional-features-text">
            <p>You don’t have to be an environmental scientist to make sustainable choices. We considered sustainability in the design of this device. Here’s how:</p>
          </div>
          <div className="additional-features-rows">
            <div className="additional-features-row">
              <img className="additional-features-icon" src={img.featuresBlock9[0]}></img>
              <div className="additional-features-item">
                <h4>Materials</h4>
                  <p>50% post-consumer recycled plastics<br/>
                  100% post-consumer recycled fabric<br/>
                  100% recycled die-cast aluminum<br/>
                  Device, cable and adapter included</p>
              </div>
              <img className="additional-features-icon" src={img.featuresBlock9[1]}></img>
              <div className="additional-features-item">
                <h4>Clean Energy</h4>
                  <p>Amazon is building new wind and solar farms to produce clean energy equivalent to the electricity used by this device.</p>
              </div>
              <img className="additional-features-icon" src={img.featuresBlock9[2]}></img>
              <div className="additional-features-item">
                <h4>Low Power Mode</h4>
                  <p>To reduce its energy consumption, this device will enter Low Power Mode when it is idle. Low Power Mode is not available for certain user configurations. To learn more, see Low Power Mode Restrictions.</p>
              </div>
            </div>
            <div className="additional-features-row">
              <img className="additional-features-icon" src={img.featuresBlock9[3]}></img>
              <div className="additional-features-item">
                <h4>Alexa</h4>
                  <p>Track and manage the energy usage of your Alexa-connected devices with a new energy dashboard, coming soon to the Alexa app.</p>
              </div>
              <img className="additional-features-icon" src={img.featuresBlock9[4]}></img>
              <div className="additional-features-item">
                <h4>Device Packaging</h4>
                  <p>99% of this device’s packaging is made of wood fiber-based materials from responsibly managed forests or recycled sources.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));