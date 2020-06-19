import React from 'react';
import propTypes from 'prop-types';
import { Select, Error } from './style';

const SelectField = (props) => {
  const {
    error, options, onChange, defaultText, onBlur,
  } = props;
  return (
    <>
      <Select onChange={onChange} onBlur={onBlur}>
        <option>{defaultText}</option>
        {
          options
          && options.map(({ value, label }) => <option key={label} value={value}>{label}</option>)
        }
      </Select>
      {error ? <Error>{error}</Error> : <br />}
    </>
  );
};

SelectField.propTypes = {
  onBlur: propTypes.func.isRequired,
  defaultText: propTypes.string,
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
  options: propTypes.arrayOf(propTypes.shape({
    label: propTypes.string,
    value: propTypes.string,
  })),
};
SelectField.defaultProps = {
  defaultText: 'select',
  error: '',
  options: [],
};

export default SelectField;
