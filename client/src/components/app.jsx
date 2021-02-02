import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Banner from './banner.jsx';
import Features from './features.jsx';
import Setup from './setup.jsx';
import AdditionalFeatures from './additionalFeatures.jsx';
import GlobalStyles from '../globalStyles.js'
import dummyImages from '../dummyImages.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productFeatures: [],
      productPhotos: dummyImages // pending call to photos service in componentDidMount()
    }

    this.getProductFeatures = this.getProductFeatures.bind(this);
  }

  getProductFeatures(productId) {
    axios.get(`/product-features/${productId}`, {
        params: { productId: productId }
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          productFeatures: response.data
        });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  getProductPhotos(productId) {
    axios.get(`/photos/id/${productId}`)
    .then(res => res.json())
    .then((response) => {
      this.setState({
        productPhotos: response.productUrls
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }

  componentDidMount() {
    const productId = window.location.pathname.split('/')[1];
    this.getProductFeatures(productId);
    // this.getProductPhotos(productId); // pending service availability
  }

  render() {
    const text = this.state.productFeatures[0];
    const img = this.state.productPhotos;
    return (
      (text === undefined
        ? <h1 style={{textAlign: 'center'}}>Product Features Service Unavailable 404</h1>
        : <div>
            <GlobalStyles />
            <Banner
              bannerText={text.banner}
              bannerImage={img} />
            <Features
              featuresText={text.features}
              featuresPhotos={img} />
            <Setup
              featuresText={text.featureSetup}
              featuresSetupPhotos={img} />
            <AdditionalFeatures
              additionalFeaturesText={text.additionalFeatures}
              additionalFeaturesPhotos={img} />
          </div>
      )
    );
  }
}

export default App;