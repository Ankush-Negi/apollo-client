import React from 'react';
import propTypes from 'prop-types';

const MathDemo = (props) => {
  const {
    first, second, operator, children,
  } = props;
  let { result } = props;
  switch (operator) {
  case '+':
    result = first + second;
    break;
  case '-':
    result = first - second;
    break;
  case '/':
    if (second) {
      result = first / second;
    } else {
      result = 'infinity';
    }
    break;
  case '*':
    result = first * second;
    break;
  default:
    result = 'Invalid Operator';
    break;
  }
  if (children) {
    return children({
      first, second, operator, result,
    });
  }
  return (
    <>
      <h4>
        {first}
        {' '}
        {operator}
        {' '}
        {second}
        {' '}
          =
        {' '}
        {result}
      </h4>
    </>
  );
};

MathDemo.propTypes = {
  result: propTypes.number,
  first: propTypes.number.isRequired,
  second: propTypes.number.isRequired,
  operator: propTypes.oneOf(['+', '-', '/', '*']).isRequired,
  children: propTypes.func,
};

MathDemo.defaultProps = {
  result: undefined,
  children: undefined,
};

export default MathDemo;
