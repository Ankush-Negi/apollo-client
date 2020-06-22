import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import propTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as moment from 'moment';
import ls from 'local-storage';
import callApi from '../../../../lib/utils/api';
import { MyContext } from '../../../../contexts';

class RemoveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      loader: false,
    };
  }

  handleCallApiForRemove=(data, openSnackBar) => {
    const id = data.originalId;
    const { onSubmit } = this.props;
    this.setState({ loader: true });
    callApi({ headers: { Authorization: ls.get('token') } },
      `/trainee/${id}`, 'delete').then((response) => {
      const { status } = response;
      if (status === 'ok') {
        this.setState({
          message: 'This is a success Message! ',
          loader: false,
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'success');
          onSubmit(data);
        });
      } else {
        this.setState({
          message: 'This is an error',
          loader: false,
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'error');
        });
      }
    });
  }

  handleSnackBar = (data, openSnackBar) => {
    const date = '2019-02-14T18:15:11.778Z';
    const isAfter = (moment(data.createdAt).isAfter(date));
    if (isAfter) {
      this.handleCallApiForRemove(data, openSnackBar);
    } else {
      this.setState({
        message: 'This is an error',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  render = () => {
    const { loader } = this.state;
    const {
      onClose, open, onSubmit, data,
    } = this.props;
    return (
      <Dialog fullWidth maxWidth="lg" onClose={() => onClose()} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title"><center>Remove Trainee</center></DialogTitle>
        <div>
          <DialogContentText>
            Do you really want to delete trainee ?
          </DialogContentText>
        </div>
        <DialogContent>
          <DialogActions>
            <Button onClick={() => onClose()} variant="contained">
              Cancel
            </Button>
            <MyContext.Consumer>
              {(value) => {
                const { openSnackBar } = value;
                return (
                  <>
                    <Button
                      disabled={loader}
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        onSubmit(data);
                        this.handleSnackBar(data, openSnackBar);
                      }}
                    >
                      <span>
                        {loader ? <CircularProgress size={20} /> : ''}
                      </span>
                    Delete
                    </Button>
                  </>
                );
              }}
            </MyContext.Consumer>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

RemoveDialog.propTypes = {
  onClose: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
  onSubmit: propTypes.func.isRequired,
  data: propTypes.objectOf(propTypes.string).isRequired,
};

export default RemoveDialog;
