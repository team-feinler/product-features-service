import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Banner from './banner.jsx';
import Features from './features.jsx';
import Setup from './setup.jsx';
import AdditionalFeatures from './additionalFeatures.jsx';
import dummyImages from '../dummyImages.js';

const ProductFeaturesStyle = styled.div`
  font-family:'Amazon Ember', Arial, sans-serif;
  max-width: 1504px;
  margin: 0px auto 0px auto;
`;

class ProductFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productFeatures: [],
      productPhotos: dummyImages,
      httpStatusCode: null
    }
  }

  getProductFeatures(productId) {
    return axios.get(`http://localhost:4000/product-features/${productId}`)
  }

  getProductPhotos(productId) {
    return axios.get(`http://localhost:4002/photos/features/${productId}`)
  }

  fetchData(productId) {
    Promise.all([
      this.getProductFeatures(productId),
      this.getProductPhotos(productId)
    ])
    .then((res) => {
      this.setState({
        productFeatures: res[0].data,
        productPhotos: res[1].data.featuresUrls
      })
    })
    .catch((err) => {
      this.setState({
        httpStatusCode: 404
      })
      console.log(err);
    })
  }

  componentDidMount() {
    const productId = window.location.pathname.split('/')[1] || 1000;
    this.fetchData(productId);
  }

  render() {
    const text = this.state.productFeatures[0];
    const img = this.state.productPhotos;

    return (
      (this.state.httpStatusCode === 404
      ? <h1 style={{textAlign: 'center'}}>Product Features Service Unavailable 404</h1>
      : this.state.productFeatures.length === 0
      ? <div>Loading...</div>
      : <ProductFeaturesStyle>
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
        </ProductFeaturesStyle>
      )
    )
  }
}

export default ProductFeatures;