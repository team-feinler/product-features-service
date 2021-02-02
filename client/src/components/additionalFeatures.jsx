import React from 'react';
import styled from 'styled-components';

const StyledAdditionalFeatures = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  min-width: 590px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

`;

const Icon = styled.img`
  width: 62px;
  height: 61px;
  margin-right: 10px;
  margin-top: 35px;
  float: left;
`;

const Item = styled.div`
  width: 320px;
  margin-right: 10px;
`;

const AdditionalFeatures = (props) => {
  const header = props.additionalFeaturesText.header;
  const description = props.additionalFeaturesText.description;
  const row1text = props.additionalFeaturesText.contentGrid.slice(0, 3);
  const row1images = props.additionalFeaturesPhotos.slice(12, 15);
  const row2text = props.additionalFeaturesText.contentGrid.slice(3);
  const row2images = props.additionalFeaturesPhotos.slice(15);
  const pStyle = {fontSize: '14px'};

  return (
    <StyledAdditionalFeatures>
      <h2 style={{textAlign: 'center'}}>{header}</h2>
      <Text>{description}</Text>
      <Row>
        {row1text.map((item, i) => {
          return (
            <Item key={i}>
              <Icon src={row1images[i]}></Icon>
              <h4>{item.title}</h4>
              <p style={pStyle}>{item.description}</p>
            </Item>
          )
        })}
      </Row>
      <Row>
        {row2text.map((item, i) => {
          return (
            <div key={i}>
              <Icon src={row2images[i]}></Icon>
              <Item>
                <h4>{item.title}</h4>
                <p style={pStyle}>{item.description}</p>
              </Item>
            </div>
          )
        })}
      </Row>
    </StyledAdditionalFeatures>
  )
};

export default AdditionalFeatures;