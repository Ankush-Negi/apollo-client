import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { MathDemo } from '../../components/Math';

export default class CalculatorDemo extends Component {
  children = (objectOfKeys) => {
    const {
      first, second, operator, result,
    } = objectOfKeys;
    switch (operator) {
    case '+':
      return (
        <>
          Sum of
          {' '}
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          is equal to
          {' '}
          {result}
          {' '}
        </>
      );
    case '-':
      return (
        <>
          Difference of
          {' '}
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          is equal to
          {' '}
          {result}
          {' '}
        </>
      );
    case '/':
      return (
        <>
          Division of
          {' '}
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          is equal to
          {' '}
          {result}
          {' '}
        </>
      );
    case '*':
      return (
        <>
          Multiplication of
          {' '}
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          is equal to
          {' '}
          {result}
          {' '}
        </>
      );
    default:
      return (
        <>
          Result of
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          {result}
        </>
      );
    }
  }

  render() {
    return (
      <>
        <MathDemo first={7} second={4} operator="+">{this.children}</MathDemo>
        <br />
        <MathDemo first={7} second={3} operator="-">{this.children}</MathDemo>
        <br />
        <MathDemo first={28} second={0} operator="/">{this.children}</MathDemo>
        <br />
        <MathDemo first={7} second={4} operator="*">{this.children}</MathDemo>
        <br />
        <Typography>
          <MathDemo first={7} second={3} operator="+">{this.children}</MathDemo>
        </Typography>
      </>
    );
  }
}
