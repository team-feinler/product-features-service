import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/src/app.jsx';
import DummyProductPhotos from '../client/src/dummyImages.js';
configure({ adapter: new Adapter() });

describe('Product Features Service Static Page <App /> component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders dummy product photos from state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('productPhotos')).toBe(DummyProductPhotos);
  });

  it('renders banner header', () => {
    const wrapper = shallow(<App />);
    const header = <h2>Meet the all-new Echo</h2>;
    expect(wrapper.contains(header)).toEqual(true);
  });
});

