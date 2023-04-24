import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {visuallyHidden} from '@mui/utils';
import {alpha} from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import ThemedButton from './ThemedButton';
import ViewOpportunityRequestCard from './ViewOpportunityRequestCard';
import useAuth from '../util/AuthContext';

/**
 * Create request data
 * @param {*} name
 * @param {*} role
 * @param {*} dateOfRequest
 * @param {*} status
 * @return {Object}
 */
function createData(name, role, dateOfRequest, status) {
  return {
    name,
    role,
    dateOfRequest,
    status,
  };
}

const rows = [
  createData('Bob Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
  createData('Bill Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
  createData('Ben Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
  createData('Jen Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
  createData('Jill Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
];

/**
 * Descending comparator
 * @param {*} a
 * @param {*} b
 * @param {*} orderBy
 * @return {Number}
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Get comparator
 * @param {*} order
 * @param {*} orderBy
 * @return {Function}
 */
function getComparator(order, orderBy) {
  return order === 'desc' ?
    (a, b) => descendingComparator(a, b, orderBy) :
    (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Requested Role',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date of Request',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

/**
 * Table head
 * @return {JSX}
 */
function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all requests',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <span className='text-bold'>{headCell.label}</span>
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const {numSelected} = props;

  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <h4 className='text-blue' style={{flex: '1 1 100%'}}>
          {numSelected} selected
        </h4>
      ) : (
        <h4 className='text-dark' style={{flex: '1 1 100%'}}>
          Requests
        </h4>
      )}

      {numSelected > 0 ? (
        <Box
          className='flex-horizontal flex-flow-large'
          sx={{marginRight: '5px'}}
        >
          <ThemedButton color='yellow' variant='gradient' size='small'>
            Approve
          </ThemedButton>
          <ThemedButton color='gray' variant='themed' size='small'>
            Deny
          </ThemedButton>
        </Box>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

/**
 * @return {JSX}
 */
export default function FetchWrapper() {
  const params = useParams();
  const {userProfile} = useAuth();
  const [requests, setRequests] = useState([]);

  const getPendingRequestsReceived = () => {
    fetch(`/api/getPendingRequestsReceived/` +
    `${userProfile.profileid}/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          if (json.length > 0) {
            json.map((request) => request.status = 'Pending'),
            setRequests((prevRequests) => ([
              ...prevRequests,
              ...json,
            ]));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getApprovedRequests = () => {
    fetch(`/api/getApprovedRequests/` +
    `${userProfile.profileid}/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          if (json.length > 0) {
            json.map((request) => request.status = 'Approved'),
            setRequests((prevRequests) => ([
              ...prevRequests,
              ...json,
            ]));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getRejectedRequests = () => {
    fetch(`/api/getRejectedRequests/` +
    `${userProfile.profileid}/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          if (json.length > 0) {
            json.map((request) => request.status = 'Denied'),
            setRequests((prevRequests) => ([
              ...prevRequests,
              ...json,
            ]));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    getPendingRequestsReceived();
    getApprovedRequests();
    getRejectedRequests();
  }, []);

  return (
    <>
      {requests && <ViewOpportunityRequests requests={requests} />}
    </>
  );
}

/**
 * Enhanced table
 * @return {JSX}
 */
function ViewOpportunityRequests({requests}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [requester, setRequester] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const getRequester = (requester) => {
    fetch(`/api/getProfileByProfileId/${requester}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setRequester(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving requester profile, please try again');
        });
  };

  return (
    <Box sx={{width: 'auto'}}>
      <Paper
        elevation={0}
        sx={{
          width: 'auto',
          mt: '1em',
          boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
          border: '0.5px solid rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
        }}
      >
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={requests.length}
            />
            <TableBody>
              {requests
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request, index) => {
                    const isItemSelected = isSelected(request.requester);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <ViewOpportunityRequestCard
                        key={`request-${index}`}
                        request={request}
                        requester={requester}
                        getRequester={getRequester}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        handleClick={handleClick}
                      />
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
