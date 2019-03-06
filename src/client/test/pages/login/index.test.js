/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginPage from '../../../pages/login/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Login Page', () => {
  it('snapshot', () => {
    const wrapper = shallow(<LoginPage />);

    expect(wrapper).toMatchSnapshot();
  });
});
