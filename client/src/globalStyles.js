import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family:'Amazon Ember', Arial, sans-serif;
    max-width: 1504px;
    margin: 0px auto 0px auto;
  }

  h2 {
    font-weight: 400;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: -1px;
  }

  h4 {
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: -.3px;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
  }
`;

export default GlobalStyles;