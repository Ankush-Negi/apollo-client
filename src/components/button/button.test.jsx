import React from 'react';
import { mount } from 'enzyme';
import Button from './button';

const props = {
  value: 'Submit',
};

describe('Button Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Button {...props} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('render button click', () => {
    const clicked = wrapper.find(Button).simulate('click');
    expect(clicked.length).toBe(1);
  });
});
