import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Form } from 'reactstrap';

import Login from '../../components/Login';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
let setMsg = jest.fn();
let preventDefault = jest.fn();

let useEffect;
let useState;

jest.mock('react-redux', () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));

let mockUseEffect = () => {
  useEffect.mockImplementationOnce((f) => f());
};

describe('<Login/>', () => {
  let wrapper;
  let state = [
    { name: 'email', value: 'dushimeemma@gmail.com' },
    { name: 'password', value: 'Password123' },
  ];
  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    useState = jest.spyOn(React, 'useState');
    useState.mockImplementation((msg) => [msg, setMsg]);
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    wrapper = shallow(<Login />);
  });
  it('Should render with no errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('Should test on change', () => {
    let inputs = wrapper.find(Input);
    for (let index = 0; index < inputs.length; index++) {
      inputs.at(index).simulate('change', {
        target: {
          name: state[index].name,
          value: state[index].value,
        },
      });
    }
    wrapper.find(Form).at(0).simulate('submit', { preventDefault });
    expect(preventDefault).toBeCalled();
  });
  it('Should test setState', () => {
    let inputs = wrapper.find(Input);
    for (let index = 0; index < inputs.length; index++) {
      inputs.at(index).simulate('change', {
        target: {
          name: state[index].name,
          value: state[index].value,
        },
      });
    }
    wrapper.find(Form).at(0).simulate('submit', { preventDefault });
    expect(setMsg).toBeCalledTimes(6);
  });
});
