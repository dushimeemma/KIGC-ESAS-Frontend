import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch } from 'react-redux';

import Navs from '../../components/Header';

const mockDispatch = jest.fn();
const onClick = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('<Navs/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navs />);
  });
  it('Should render navigation', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('Should logout user', () => {
    let username = 'dushime emmanuel';
    localStorage.setItem('username', username);
    const wrapper = shallow(<Navs />);
    const logout = wrapper.find('#logout');
    logout.simulate('click', { onClick });
    expect(wrapper).toMatchSnapshot();
  });
  afterEach(() => {
    localStorage.removeItem('username');
  });
});
