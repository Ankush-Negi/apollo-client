import React from 'react';
import propTypes from 'prop-types';
import { Value, Error } from './style';

const TextField = (props) => {
  const {
    value, error, onChange, onBlur, readOnly,
  } = props;
  return (
    <>
      <Value type="text" value={value} readOnly={readOnly} onChange={onChange} onBlur={onBlur} />
      {error ? <Error>{error}</Error> : <br />}
    </>
  );
};

TextField.propTypes = {
  readOnly: propTypes.bool,
  onBlur: propTypes.func,
  value: propTypes.string,
  onChange: propTypes.func,
  error: propTypes.string,
};
TextField.defaultProps = {
  onBlur: undefined,
  value: undefined,
  error: '',
  onChange: undefined,
  readOnly: undefined,
};

export default TextField;
