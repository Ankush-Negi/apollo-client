import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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

handleClickOpen = () => {
  this.setState({ open: true });
};

handleClose = () => {
  this.setState({ open: false, editOpen: false, removeOpen: false });
};

onSubmitHandle = (values) => {
  this.setState({ open: false, editOpen: false });
  const { page, rowsPerPage } = this.state;
  const {
    data: {
      getAllTrainee: {
        count = 0,
      } = {},
      refetch,
    },
  } = this.props;
  refetch({ skip: page * rowsPerPage, limit: rowsPerPage });
  console.log(values);
}

handleOnSubmitDelete = (values) => {
  this.setState({ open: false, removeOpen: false });
  const { page, rowsPerPage } = this.state;
  const {
    data: {
      getAllTrainee: {
        count = 0,
      } = {},
      refetch,
    },
  } = this.props;
  if (count - page * rowsPerPage === 1 && page > 0) {
    this.setState({ page: page - 1 }, () => {
      const { page: updatePage } = this.state;
      refetch({ skip: updatePage, limit: rowsPerPage });
    });
  }
  console.log(values);
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
  console.log('-----------', { skip: newPage * rowsPerPage, limit: rowsPerPage });
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
    match: { url }, classes,
  } = this.props;
  const {
    open, order, orderBy, page, editOpen, rowData, removeOpen,
    rowsPerPage,
  } = this.state;
  const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');
  return (
    <>
      <div className={classes.button}>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Add Trainee
        </Button>
      </div>
      <AddDialog open={open} onClose={this.handleClose} onSubmit={this.onSubmitHandle} />
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
        onSubmit={this.onSubmitHandle}
        data={rowData}
      />
      <RemoveDialog
        open={removeOpen}
        onClose={this.handleClose}
        onSubmit={this.handleOnSubmitDelete}
        data={rowData}
      />
    </>
  );
}
}

TraineeList.contextType = MyContext;

TraineeList.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
  classes: propTypes.objectOf(propTypes.string).isRequired,
  data: propTypes.objectOf(propTypes.any).isRequired,
};

export default Compose(withStyles(style, { withTheme: true }),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 20 } },
  }))(TraineeList);
