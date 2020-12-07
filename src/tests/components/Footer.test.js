import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../components/Footer';

describe('<Footer/>', () => {
  it('Should render footer without error', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
