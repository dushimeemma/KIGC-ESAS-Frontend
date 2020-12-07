import React from 'react';
import { shallow } from 'enzyme';

import Routes from '../../Routes';

describe('<Routes/>', () => {
  it('Should render different routes', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});
