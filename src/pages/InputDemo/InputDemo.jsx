import React from 'react';
import * as yup from 'yup';
import { options, footballRadioOptions, cricketRadioOptions } from '../../configs/constants';
import { TextField } from '../../components/TextField';
import { SelectField } from '../../components/SelectField';
import { RadioGroup } from '../../components/RadioGroup/index';
import { Button } from '../../components/button';

const ValidationSchema = yup.object().shape({
  TextField: yup
    .string()
    .required('Name is a required field')
    .min(3)
    .matches('^[A-Za-z\\s]+$'),
  SelectField: yup
    .string()
    .required('Sport is a required field'),
  RadioGroup: yup
    .string()
    .required('What you do is a required field'),
});


class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      isValid: true,
      allError: {},
      touch: {
        TextField: true,
        SelectField: true,
        RadioGroup: true,
      },
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSportChange = (e) => {
    this.setState({ sport: e.target.value });
    if (e.target.value === 'cricket') {
      this.setState({ football: '' });
    }
    if (e.target.value === 'football') {
      this.setState({ cricket: '' });
    }
    if (e.target.value === 'select') {
      this.setState({ sport: '', cricket: '', football: '' });
    } else {
      this.setState({ cricket: '', football: '' });
    }
  };

  hasError = (field) => {
    const {
      allError, name, sport, football, cricket,
    } = this.state;
    ValidationSchema.validateAt(field, {
      TextField: name,
      SelectField: sport,
      RadioGroup: cricket || football,
    }).then(() => {
      if (allError[field]) {
        delete allError[field];
        this.setState(allError);
      }
    }).catch((error) => {
      if (allError[field] !== error.message) {
        this.setState({
          allError: {
            ...allError,
            [field]: error.message,
          },
        });
      }
    });
  };

  isTouched = (value) => {
    const { touch } = this.state;
    delete touch[value];
    this.setState({ touch });
  };

  getError = (field) => {
    const { touch, allError, isValid } = this.state;
    this.hasError(field);
    if (!Object.keys(touch).length && !Object.keys(allError).length && isValid) {
      this.setState({ isValid: false });
    }
    if (allError[field] && !touch[field]) {
      if (!isValid) {
        this.setState({ isValid: true });
      }
      return allError[field];
    }
  };

  handleChange = (e) => {
    const { sport } = this.state;
    if (sport === 'cricket') {
      this.setState({ cricket: e.target.value });
    }
    if (sport === 'football') {
      this.setState({ football: e.target.value });
    }
  };

  radioOption = () => {
    const { sport } = this.state;
    return (sport === 'cricket' ? cricketRadioOptions : footballRadioOptions);
  };

  render() {
    const { sport, isValid } = this.state;
    return (
      <>
        <p>Name</p>
        <TextField
          error={this.getError('TextField')}
          onChange={this.handleNameChange}
          onBlur={() => this.isTouched('TextField')}
        />
        <p>Select the game you play?</p>
        <SelectField
          error={this.getError('SelectField')}
          onChange={this.handleSportChange}
          options={options}
          onBlur={() => this.isTouched('SelectField')}
        />
        <div>
          {
            (sport === '' || sport === 'Select') ? ''
              : (
                <>
                  <p>What you do?</p>
                  <RadioGroup
                    error={this.getError('RadioGroup')}
                    options={this.radioOption()}
                    onChange={this.handleChange}
                    onBlur={() => this.isTouched('RadioGroup')}
                  />
                </>
              )
          }
        </div>
        <>
          <div align="right">
            <Button value="Cancel" />
            <Button value="Submit" disabled={isValid} />
          </div>
        </>
      </>
    );
  }
}

export default InputDemo;
