import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Banner from './banner.jsx';
import Features from './features.jsx';
import Setup from './setup.jsx';
import AdditionalFeatures from './additionalFeatures.jsx';
import GlobalStyles from '../globalStyles.js';
// import Spinner from './spinner.gif';
import dummyImages from '../dummyImages.js';

class ProductFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productFeatures: [],
      productPhotos: dummyImages,
      isLoading: true
    }
  }

  getProductFeatures(productId) {
    axios.get(`http://ec2-3-21-59-121.us-east-2.compute.amazonaws.com:4000/product-features/${productId}`)
      .then((response) => {
        this.setState({
          productFeatures: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProductPhotos(productId) {
    axios.get(`http://ec2-3-15-164-34.us-east-2.compute.amazonaws.com:4002/photos/features/${productId}`)
    .then((response) => {
      console.log(response)
      this.setState({
        productPhotos: response.data.featuresUrls
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }

  async componentDidMount() {
    const productId = window.location.pathname.split('/')[1] || 1000;
    await this.getProductFeatures(productId);
    await this.getProductPhotos(productId);
    this.setState({isLoading: false});
  }

  render() {
    const text = this.state.productFeatures[0];
    const img = this.state.productPhotos;
    return (
      (this.state.isLoading
        ? <div>Loading...</div>
        : (text === undefined
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
      )
    )
  }
}

export default ProductFeatures;