import React from 'react';
import { mount } from 'enzyme';
import MathDemo from './Math';

const props = {
  first: 10,
  second: 20,
  operator: '+',
};

describe('BMath Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MathDemo {...props} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('render math component: ', () => {
    const result = wrapper.find('MathDemo');
    expect(result).toEqual({});
  });
});
