import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Input, Error } from './style';

export default function RadioGroup(props) {
  const {
    error, options, onChange, onBlur,
  } = props;

  return (
    <>
      {
        options && options.map(({ label, value }) => {
          return (
            <Fragment key={label}>
              <Input type="radio" onChange={onChange} name="sport" value={value} onBlur={onBlur} />
              {label}
              <br />
            </Fragment>
          );
        })
      }
      {error ? <Error>{error}</Error> : <br />}
    </>
  );
}

RadioGroup.propTypes = {
  onBlur: propTypes.func.isRequired,
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
  options: propTypes.arrayOf(propTypes.object),
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
};
