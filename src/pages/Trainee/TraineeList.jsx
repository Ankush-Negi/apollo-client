import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Mutation } from '@apollo/react-components';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';
import { GET_TRAINEE } from './query';
import {
  AddDialog, EditDialog, RemoveDialog,
} from './components';
import { TableComponent } from '../../components/Table';
import { MyContext } from '../../contexts';

const style = {

  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: 'Date',
      page: 0,
      editOpen: false,
      removeOpen: false,
      rowData: {},
      rowsPerPage: 20,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, editOpen: false, removeOpen: false });
  };

  handleOnSubmitAdd = (createTrainee) => async (values) => {
    try {
      const { name, email, password } = values;
      console.log('going to add', values);
      const response = await createTrainee({ variables: { name, email, password } });
      console.log('value of response in add', response);
      const { data } = response;
      const { createTrainee: resData } = data;
      this.setState({ open: false });
      if (data) {
        this.handleSnackBar('Successfully Created', 'success');
      }
      this.setState({ open: false });
      return resData;
    } catch (error) {
      console.log(error);
      this.handleSnackBar('There is an Error!', 'error');
    }
  }

  handleOnSubmitEdit = (updateTrainee) => async (values) => {
    try {
      const { name, email, originalId } = values;
      const response = await updateTrainee({ variables: { id: originalId, name, email } });
      if (response) {
        this.handleSnackBar('Successfully Updated', 'success');
      }
      this.setState({ editOpen: false });
      return response;
    } catch (error) {
      console.log(error);
      this.handleSnackBar('There is an Error!', 'error');
    }
  }

  handleSnackBar = (message, status) => {
    const contextValue = this.context;
    const { openSnackBar } = contextValue;
    return openSnackBar(message, status);
  }

  handleOnSubmitDelete = (deleteTrainee) => async (values) => {
    try {
      const { originalId } = values;
      const { page, rowsPerPage } = this.state;
      const {
        data: {
          getAllTrainee: {
            count = 0,
          } = {},
          refetch,
        },
      } = this.props;
      const response = await deleteTrainee({ variables: { id: originalId } });
      if (count - page * rowsPerPage === 1 && page > 0) {
        this.setState({ page: page - 1 }, () => {
          const { page: updatePage } = this.state;
          refetch({ skip: updatePage, limit: rowsPerPage });
        });
      }
      this.setState({ removeOpen: false });
      if (response) {
        this.handleSnackBar('Successfully Deleted', 'success');
      }
      return response;
    } catch (error) {
      this.handleSnackBar('There is an Error!', 'error');
    }
  }

  handleSort = (value) => {
    const { orderBy, order } = this.state;
    const isAsc = orderBy === value && order === 'asc';
    const data = isAsc ? 'desc' : 'asc';
    this.setState({
      order: data,
      orderBy: value,
    });
  }

  handleSelectChange = (value) => {
    console.log(value);
  }

  handleEditDialogOpen = (values) => {
    this.setState({ editOpen: true, rowData: values });
  }

  handleRemoveDialogOpen = (values) => {
    this.setState({ removeOpen: true, rowData: values });
  }

  handleChangePage = (refetch) => (event, newPage) => {
    const { rowsPerPage } = this.state;
    refetch({ skip: newPage * rowsPerPage, limit: rowsPerPage });
    this.setState({ page: newPage });
  };

  render() {
    const {
      data: {
        getAllTrainee: {
          records = [],
          count = 0,
        } = {},
        loading,
        refetch,
      },
      classes,
    } = this.props;
    const {
      open, order, orderBy, page, editOpen, rowData, removeOpen,
      rowsPerPage,
    } = this.state;
    const variables = { skip: page * rowsPerPage, limit: rowsPerPage };
    const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');
    return (
      <Mutation
        mutation={DELETE_TRAINEE}
        refetchQueries={[{ query: GET_TRAINEE, variables }]}
      >
        {(deleteTrainee) => (
          <Mutation
            mutation={UPDATE_TRAINEE}
            refetchQueries={[{ query: GET_TRAINEE, variables }]}
          >
            {(updateTrainee) => (
              <Mutation
                mutation={CREATE_TRAINEE}
                refetchQueries={[{ query: GET_TRAINEE, variables }]}
              >
                {(createTrainee) => (
                  <>
                    <div className={classes.button}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.handleOpen}
                      >
                        Add Trainee
                      </Button>
                    </div>
                    <AddDialog
                      open={open}
                      onClose={this.handleClose}
                      onSubmit={this.handleOnSubmitAdd(createTrainee)}
                    />
                    <TableComponent
                      id={page}
                      data={records}
                      column={[{
                        field: 'name',
                        label: 'Name',
                      },
                      {
                        field: 'email',
                        label: 'Email-Address',
                        format: (value) => value && value.toUpperCase(),
                      },
                      {
                        field: 'createdAt',
                        label: 'Date',
                        align: 'right',
                        format: getDateFormatted,
                      }]}

                      actions={[{
                        icons: <EditIcon />,
                        handler: this.handleEditDialogOpen,
                      },
                      {
                        icons: <DeleteIcon />,
                        handler: this.handleRemoveDialogOpen,
                      }]}

                      order={order}
                      orderBy={orderBy}
                      onSort={this.handleSort}
                      onSelect={this.handleSelectChange}
                      count={count}
                      page={page}
                      onChangePage={this.handleChangePage(refetch)}
                      rowsPerPage={rowsPerPage}
                      loader={loading}
                      dataLength={count}
                    />
                    <EditDialog
                      open={editOpen}
                      onClose={this.handleClose}
                      onSubmit={this.handleOnSubmitEdit(updateTrainee)}
                      data={rowData}
                    />
                    <RemoveDialog
                      open={removeOpen}
                      onClose={this.handleClose}
                      onSubmit={this.handleOnSubmitDelete(deleteTrainee)}
                      data={rowData}
                    />
                  </>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

TraineeList.contextType = MyContext;

TraineeList.propTypes = {
  classes: propTypes.objectOf(propTypes.any).isRequired,
  data: propTypes.objectOf(propTypes.any).isRequired,
};

export default Compose(withStyles(style, { withTheme: true }),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 20 } },
  }))(TraineeList);
