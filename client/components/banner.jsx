import React from 'react';
import styled from 'styled-components';

const StyledBanner = styled.div`
  min-height: 832px;
  max-width: 1504px;
`;

const Header = styled.h2`
  padding: 45px 0px 0px 0px;
  display: flex;
  justify-content: center;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: -1px;
`;

const BannerBackground = styled.div`
  height: 832px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Text = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TextblockLeft = styled.p`
  max-width: 380px;
  margin-right: 30px;
`;

const TextblockRight = styled.p`
  max-width: 380px;
  font-size: 16px;
`;

const Banner = (props) => {
  const image = props.bannerImage[0];
  const text = props.bannerText;

  return (
    <StyledBanner>
      <BannerBackground style={{backgroundImage: `url(${image})`}}>
        <Header> {text.header} </Header>
        <Text>
          <TextblockLeft>
            {text.text[0]}
          </TextblockLeft>
          <TextblockRight>
            {text.text[1]}
          </TextblockRight>
        </Text>
      </BannerBackground>
    </StyledBanner>
  )
};

export default Banner;