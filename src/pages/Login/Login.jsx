import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PropTypes from 'prop-types';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import ls from 'local-storage';
// import callApi from '../../lib/utils/api';
import { MyContext } from '../../contexts';
import LoginValidationSchema from './helper';

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  avatar: {
    margin: 20,
    backgroundColor: 'red',
  },
  submit: {
    marginTop: 50,
  },
  grid: {
    padding: 10,
  },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: false,
      loader: false,
      allErrors: {},
      touch: {
        Email: true,
        Password: true,
      },
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  toggler = async () => {
    await this.setState((prevState) => ({
      loader: !prevState.loader,
      isValid: !prevState.isValid,
    }));
  }

  handleLoader = async (loginUser, openSnackBar) => {
    try {
      const { email, password } = await this.state;
      const { history } = await this.props;
      console.log('value of history', this.props);
      const response = await loginUser({ variables: { email, password } });
      const { data: { loginUser: token } } = await response;
      console.log('value of token', token);
      await ls.set('token', token);
      await history.push('/trainee');
      await this.toggler();
    } catch (error) {
      console.log('This is the value of error', error);
      this.toggler();
      openSnackBar('This is an Error!', 'error');
    }
  }

  hasError = (field) => {
    const {
      allErrors, email, password, touch,
    } = this.state;
    LoginValidationSchema.validateAt(field, {
      Email: email,
      Password: password,
    }).then(() => {
      if (allErrors[field] && !touch[field]) {
        delete allErrors[field];
        this.setState(allErrors);
      }
      return false;
    }).catch((error) => {
      if (allErrors[field] !== error.message && !touch[field]) {
        this.setState({
          allErrors: {
            ...allErrors,
            [field]: error.message,
          },
        });
      }
      return true;
    });
  };

  getError = (field) => {
    const {
      touch, allErrors, isValid,
    } = this.state;
    this.hasError(field);
    if (!Object.keys(touch).length && !Object.keys(allErrors).length && !isValid) {
      this.setState({ isValid: true });
      return allErrors[field];
    }
    if ((Object.keys(touch).length || Object.keys(allErrors).length) && isValid) {
      this.setState({ isValid: false });
    }
    return allErrors[field];
  }

  isTouched = (value) => {
    const { touch } = this.state;
    delete touch[value];
    this.setState({ touch });
  };

  render = () => {
    const { classes, loginUser } = this.props;
    const {
      isValid,
      loader,
    } = this.state;
    return (
      <div>
        <CssBaseline />
        <Grid container className={classes.container}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                error={this.getError('Email') ? true : false}
                helperText={this.getError('Email')}
                onChange={this.handleEmailChange}
                onBlur={() => this.isTouched('Email')}
              />
            </Grid>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOffIcon />
                    </InputAdornment>
                  ),
                }}
                error={this.getError('Password') ? true : false}
                helperText={this.getError('Password')}
                onChange={this.handlePasswordChange}
                onBlur={() => this.isTouched('Password')}
              />
            </Grid>
            <MyContext.Consumer>
              {(value) => (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isValid}
                  color="primary"
                  className={classes.submit}
                  onClick={async () => {
                    this.setState({ loader: true, isValid: false });
                    this.handleLoader(loginUser, value.openSnackBar);
                  }}
                >
                  <span>{loader ? <CircularProgress size={20} /> : ''}</span>
                  Sign In
                </Button>
              )}
            </MyContext.Consumer>
          </div>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.object,
  loginUser: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
  history: undefined,
};

export default withStyles(styles)(LoginPage);
