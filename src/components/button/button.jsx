import React from 'react';
import propTypes from 'prop-types';
import { Buttons } from './style';

export default function Button(props) {
  const {
    color, disabled, style, value, onClick,
  } = props;
  return (
    <>
      <Buttons
        value={value}
        disabled={disabled}
        style={style}
        onClick={onClick}
        color={color}
      >
        <b>
          {value}
        </b>
      </Buttons>
    </>
  );
}

Button.propTypes = {
  color: propTypes.string,
  disabled: propTypes.bool,
  style: propTypes.objectOf(propTypes.string),
  value: propTypes.string.isRequired,
  onClick: propTypes.func,
};
Button.defaultProps = {
  color: 'primary',
  disabled: false,
  style: {},
  onClick: undefined,
};
