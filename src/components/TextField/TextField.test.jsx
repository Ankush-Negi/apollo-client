import React from 'react';
import { mount } from 'enzyme';
import TextField from './TextField';

describe('Button Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<TextField />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('render textbox', () => {
    const clicked = wrapper.find('TextField');
    expect(clicked.length).toBe(1);
  });
  it('render text inside', () => {
    const clicked = wrapper.find('TextField').value;
    expect(clicked).toEqual(undefined);
  });
});
