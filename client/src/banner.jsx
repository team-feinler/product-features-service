import React from 'react';
import styled from 'styled-components';

const StyledBanner = styled.div`
  min-height: 832px;
  max-width: 1504px;
`;

const Header = styled.h2`
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: -1px;

  padding: 45px 0px 0px 0px;
  display: flex;
  justify-content: center;
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
`;

const Banner = (props) => (
  <StyledBanner>
    <BannerBackground style={{backgroundImage: `url(${props.bannerImage})`}}>
      <Header>
        Meet the all-new Echo
      </Header>
      <Text>
        <TextblockLeft>Talk about well-rounded. Echo combines premium sound, a built-in Zigbee smart home hub, and a temperature sensor. Powerful speakers deliver clear highs, dynamic mids, and deep bass for rich, detailed sound that adapts to any room.</TextblockLeft>
        <TextblockRight>Just ask Alexa to play music, answer questions, make calls, and tell you the news, sports scores, weather, and more.</TextblockRight>
      </Text>
    </BannerBackground>
  </StyledBanner>
);

export default Banner;