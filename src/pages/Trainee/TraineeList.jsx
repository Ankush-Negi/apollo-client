import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ls from 'local-storage';
import {
  AddDialog, EditDialog, RemoveDialog,
} from './components';
import { TableComponent } from '../../components/Table';
import callApi from '../../lib/utils/api';
import { MyContext } from '../../contexts';

const useStyles = {

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
      tableData: [],
      message: '',
      status: '',
      count: 0,
      loader: true,
      tableDataLength: 0,
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
  this.handleTableData({
    params: { skip: page * rowsPerPage, limit: rowsPerPage },
    headers: { Authorization: ls.get('token') },
  }, '/trainee', 'Get');
  console.log(values);
}

handleOnSubmitDelete = (values) => {
  this.setState({ open: false, removeOpen: false, loader: true });
  const { page, rowsPerPage, count } = this.state;
  console.log(values);
  if (count - page * rowsPerPage !== 1) {
    this.handleTableData({
      params: {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
      },
      headers: { Authorization: ls.get('token') },
    }, '/trainee', 'Get');
  } else if (page !== 0) {
    this.setState({ page: page - 1 });
    this.handleTableData({
      params: {
        skip: (page - 1) * rowsPerPage,
        limit: rowsPerPage,
      },
      headers: { Authorization: ls.get('token') },
    }, '/trainee', 'Get');
  } else {
    this.handleTableData({
      params: {
        skip: (page) * rowsPerPage,
        limit: rowsPerPage,
      },
      headers: { Authorization: ls.get('token') },
    }, '/trainee', 'Get');
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

handleChangePage = (event, newPage) => {
  const { rowsPerPage, message, status } = this.state;
  const { openSnackBar } = this.context;
  return status === 'ok' ? (this.setState({ page: newPage, loader: true }),
  this.handleTableData({
    params: {
      skip: newPage * rowsPerPage,
      limit: rowsPerPage,
    },
    headers: { Authorization: ls.get('token') },
  }, '/trainee', 'Get'))
    : (openSnackBar(message, status));
};

handleTableData = (data, url, method) => {
  callApi(data, url, method).then((response) => {
    const { records, count } = response.data;
    this.setState({
      tableData: records,
      loader: false,
      tableDataLength: records.length,
      count,
    });
  });
}

componentDidMount = async () => {
  await callApi({
    params: {
      skip: 0, limit: 20,
    },
    headers: { authorization: ls.get('token') },
  },
  '/trainee',
  'Get').then((response) => {
    const { status, message, data } = response;
    const { records, count } = data;
    this.setState({
      tableData: records,
      tableDataLength: records.length,
      message,
      status,
      count,
      loader: false,
    });
  });
}

render() {
  const { classes } = this.props;
  const {
    open, order, orderBy, page, editOpen, rowData, removeOpen,
    rowsPerPage, tableData, count, loader, tableDataLength,
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
        data={tableData}
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
        onChangePage={this.handleChangePage}
        rowsPerPage={rowsPerPage}
        loader={loader}
        dataLength={tableDataLength}

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
export default withStyles(useStyles, { withTheme: true })(TraineeList);
TraineeList.propTypes = {
  classes: propTypes.objectOf(propTypes.any).isRequired,
};

TraineeList.contextType = MyContext;
