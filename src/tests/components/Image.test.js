import React from 'react';
import { shallow } from 'enzyme';

import HomeImage from '../../components/Image';

describe('<HomeImage/>', () => {
  it('Should render navigation', () => {
    const wrapper = shallow(<HomeImage />);
    expect(wrapper).toMatchSnapshot();
  });
});
