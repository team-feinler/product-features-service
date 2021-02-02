import styled from 'styled-components';

export const Block1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const BlockHeader = styled.h2`
  display: flex;
  max-width: 380px;
  margin-right: 20px;
`;

export const BlockText = styled.p`
  max-width: 380px;
  margin: auto 0 auto 20px;
`;

export const Block1Photo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 960px;
`;

export const LargeBlock = styled(Block1)`
  min-height: 832px;
  max-width: 1504px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

export const LargeBlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 440px;
`;

export const LargeBlockContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Banner = styled.img`
  display: block;
  width: 960px;
  margin: 30px auto 30px auto;
`;

export const NarrowBlockLeftText = styled.div`
  min-width: 1504px;
  height: 568px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 50px;
`;

export const NarrowBlockLeftContent = styled.div`
  position: relative;
  width: 320px;
  margin-left: 280px;
  padding-top: 50px;
`;

export const NarrowBlockRightText = styled.div`
  min-width: 1504px;
  display: flex;
  flex-direction: row-reverse;
  height: 568px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 50px;
`;

export const NarrowBlockRightContent = styled.div`
  position: relative;
  max-width: 330px;
  margin-right: 300px;
`;

export const BottomBlock = styled.div`
  display: flex;
  justify-content: center;
`;

export const BottomBlockText = styled.div`

`;