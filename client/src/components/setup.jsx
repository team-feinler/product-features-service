import React from 'react';
import styled from 'styled-components';

const StyledSetup = styled.div`
  margin-left: 120px;
  margin-right: 120px;
`;

const Header = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;

const Row = styled(Header)`
  flex-direction: row;
`;

const Item = styled(Header)`
  flex-direction: column;
  justify-content: flex-start;
  width: 333px;
  margin-right: 10px;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: -1px;
`;

const P = styled.p`
  font-size: 16px;
`;


const Setup = (props) => {
  const header = props.featuresText.header;
  const instructions = props.featuresText.description;
  const photos = props.featuresSetupPhotos.slice(9, 12);
  const pStyle = {margin: 'auto', textAlign: 'center'};

  return (
    <StyledSetup>
      <Header>
        <H2>{header}</H2>
      </Header>
      <Row>
        {instructions.map((item, i) => {
          return (
            <Item key={i}>
              <img src={photos[i]} style={{height: 'auto', width: 'auto'}}></img>
              <P style={pStyle}>{item}</P>
            </Item>
          )
        })}
      </Row>
    </StyledSetup>
  )
};

export default Setup;