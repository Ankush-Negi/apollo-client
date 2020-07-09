import React from 'react';
import { mount } from 'enzyme';
import App from '../../App';
import { MyContext, SnackBarProvider } from './SnackBarProvider';

const mockProps = {
  open: 'true',
  onClose: 'close',
  status: 'running',
  message: 'All Good',
  children: { App },
};

describe('SnackBar Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <>
        <MyContext.Provider>
          <SnackBarProvider {...mockProps} />
        </MyContext.Provider>
      </>,
    );
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('snackbar length', () => {
    const opened = wrapper.find('SnackBars');
    expect(opened).toHaveLength(0);
  });
  it('snackbar value', () => {
    const opened = wrapper.find(SnackBarProvider).value;
    expect(opened).toEqual(undefined);
  });
  it('snackbar children', () => {
    const opened = wrapper.find(MyContext.Provider).value;
    expect(opened).toBe(undefined);
  });
});
