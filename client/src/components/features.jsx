import React from 'react';
import styled from 'styled-components';
import { Block1, BlockHeader, BlockText, Block1Photo,
  LargeBlock, LargeBlockWrapper, LargeBlockContent, Banner,
  NarrowBlockLeftText, NarrowBlockLeftContent, NarrowBlockRightText,
  NarrowBlockRightContent, BottomBlock } from './features.styled.js';


const Features = (props) => {
  const text = props.featuresText;
  const photos = props.featuresPhotos;
  return (
    <div>
      {/* Section 1 */}
      <Block1>
        <BlockHeader>{text[0].header}</BlockHeader>
        <BlockText>{text[0].description}</BlockText>
      </Block1>
      <Block1Photo src={photos[1]}></Block1Photo>
      <Banner src={photos[2]}></Banner>

      {/* Section 2 */}
      <LargeBlock style={{ backgroundImage: `url(${photos[3]})`}}>
        <LargeBlockWrapper>
          <LargeBlockContent>
            <h2>{text[1].header}</h2>
            <p>{text[1].description}</p>
          </LargeBlockContent>
        </LargeBlockWrapper>
      </LargeBlock>

      {/* Section 3 */}
      <NarrowBlockLeftText style={{ backgroundImage: `url(${photos[4]})`}}>
        <NarrowBlockLeftContent>
          <h2>{text[2].header}</h2>
          <p>{text[2].description}</p>
        </NarrowBlockLeftContent>
      </NarrowBlockLeftText>

      {/* Section 4 */}
      <NarrowBlockRightText style={{ backgroundImage: `url(${photos[5]})`}}>
        <NarrowBlockRightContent>
          <h2>{text[3].header}</h2>
          <p>{text[3].description}</p>
        </NarrowBlockRightContent>
      </NarrowBlockRightText>

      {/* Section 5 */}
      <NarrowBlockLeftText style={{ backgroundImage: `url(${photos[6]})`}}>
        <NarrowBlockLeftContent>
          <h2>{text[4].header}</h2>
          <p>{text[4].description}</p>
        </NarrowBlockLeftContent>
      </NarrowBlockLeftText>

      {/* Section 6 */}
      <LargeBlock style={{ backgroundImage: `url(${photos[7]})`}}>
        <LargeBlockWrapper>
          <LargeBlockContent>
            <h2>{text[5].header}</h2>
            <p>{text[5].description}</p>
          </LargeBlockContent>
        </LargeBlockWrapper>
      </LargeBlock>

      {/* Section 7 */}
      <BottomBlock>
      <img style={{height: '454px', width: 'auto'}} src={photos[8]}></img>
          <div style={{marginLeft: '20px', width: '300px'}}>
            <h2>{text[6].header}</h2>
            <p>{text[6].description}</p>
          </div>
      </BottomBlock>
    </div>
  )
};

export default Features;