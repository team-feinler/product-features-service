import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductFeatures from '../client/src/components/app.jsx';
import DummyProductPhotos from '../client/src/dummyImages.js';
import renderer from 'react-test-renderer';
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

configure({ adapter: new Adapter() });

describe('<ProductFeatures /> component', () => {
  it('renders without crashing', () => {
    shallow(<ProductFeatures />);
  });

  it('renders dummy product photos from state', () => {
    const wrapper = shallow(<ProductFeatures />);
    expect(wrapper.state('productPhotos')).toBe(DummyProductPhotos);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<ProductFeatures />);
    expect(wrapper).toMatchSnapshot();
  });
});

