import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('<App/>', () => {
  it('Should render without errors', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
