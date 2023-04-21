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
import {toast} from 'react-toastify';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';


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
    id: 'firstname',
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
    id: 'requestdatetime',
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
  {
    id: 'requestmessage',
    numeric: false,
    disablePadding: false,
    // label: 'Message',
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
  onRequestSort,
  requests,
  rowsPerPage,
  page,
  displayReqs,
}) {
  const createSortHandler = (property, requests) => (event) => {
    onRequestSort(event, property, requests);
  };

  // number of pending requests on current page
  let numberOfReqs = 0;
  for (let i = page * rowsPerPage;
    i < displayReqs.length && i < (page * rowsPerPage + rowsPerPage);
    i++) {
    numberOfReqs++;
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < numberOfReqs}
            checked={numSelected > 0 && numSelected === numberOfReqs}
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

            {headCell.id !== 'requestmessage' && <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id, requests)}
            >
              <span className='text-bold'>{headCell.label}</span>
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>}
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
};


/**
 * @return {JSX}
 */
function EnhancedTableToolbar({
  numSelected,
  selected,
  requests,
  updateRequests,
  resetSelected,
  participants,
  updateParticipants,
  updateDisplayReqs,
  members,
  updateMembers,
}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterValues, setFilterValues] = useState([]);

  const handleFilterClick = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    applyFilters();
  }, [filterValues, requests]);

  const applyFilters = () => {
    const copyReqs = requests.filter((req) => {
      const reqFilter = filterValues.length == 0 ?
        true :
        req.status ?
        filterValues.indexOf(req.status) > -1 :
        false;
      return reqFilter;
    });
    updateDisplayReqs(copyReqs);
  };

  const handleToggleFilter = (value) => {
    const currentIndex = filterValues.indexOf(value);
    const newReqFilter = [...filterValues];
    if (currentIndex === -1) {
      newReqFilter.push(value);
    } else {
      newReqFilter.splice(currentIndex, 1);
    }
    setFilterValues(newReqFilter);
  };

  const Paper = styled((props) => (
    <MuiPaper elevation={0} {...props} />
  ))(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: 'auto',
    background: 'white',
    boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
    border: '0.5px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '10px',
  }));

  const approveRequests = async () => {
    // prepare the post data
    // required params requestId and opportunityid
    // right now it will only approve one request
    // a for loop is required to approve multiple requests
    const selectedRequests = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < requests.length; j++) {
        if (selected[i] === requests[j].requester) {
          // push the request and its index
          selectedRequests.push([requests[j], j]);
        }
      }
    }

    for (let i = 0; i < selectedRequests.length; i++) {
      if (selectedRequests[i][0].requeststatus !== 'approved') {
        const toBeApproved = {
          requestId: selectedRequests[i][0].requestid,
          opportunityid: selectedRequests[i][0].opportunityid,
          requester: selectedRequests[i][0].requester,
          role: selectedRequests[i][0].role,
        };
        await fetch(`/api/approveRequest`, {
          method: 'POST',
          body: JSON.stringify(toBeApproved),
          headers: {
            'Content-Type': 'application/json',
          },
        })
            .then((res) => {
              if (!res.ok) {
                throw res;
              }
              return res;
            })
            .then((json) => {
            })
            .catch((err) => {
              console.log(err);
              toast.error(
                  `Something Went Wrong. Please Try Again.`,
                  {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
              return;
            });
      }
    }
    const updatedRequests = [...requests];
    const updatedParticipants = [...participants];
    const updatedMembers = {...members};
    for (let i = 0; i < selectedRequests.length; i++) {
      updatedRequests[selectedRequests[i][1]].requeststatus = 'approved';
      updatedRequests[selectedRequests[i][1]].status = 'Approved';
      // add the requester to the opp
      // if he already isn't in the opp
      // to prevent double rendering of approving users twice
      const index = updatedParticipants
          .indexOf(selectedRequests[i][0].requester);
      if (index === -1) {
        updatedParticipants.
            push(updatedRequests[selectedRequests[i][1]].requester);
      }
      // add the approved requesters that request roles
      const reqRole = updatedRequests[selectedRequests[i][1]].role;
      // a role is requested
      if (reqRole) {
        // if there are already people in that role push the requester
        // into the existing list
        if (members[reqRole]) {
          const temp = [...members[reqRole]];
          // check if the person already exists
          const index = temp
              .indexOf(selectedRequests[i][0].requester);
          if (index === -1) {
            temp.
                push(updatedRequests[selectedRequests[i][1]].requester);
          }
          // set the state to new list
          updatedMembers[reqRole] = temp;
        } else {
          // if nobody exists in that role create a list and push it
          const temp = [updatedRequests[selectedRequests[i][1]].requester];
          updatedMembers[reqRole] = temp;
        }
      }
    }
    updateMembers(updatedMembers);
    updateParticipants(updatedParticipants);
    updateRequests(updatedRequests);
    resetSelected();
    const reqStr = selectedRequests.length > 1 ? 'requests' : 'request';
    toast.success(
        `Successfully approved ${selectedRequests.length} ${reqStr}`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  };

  const denyRequests = async () => {
    const selectedRequests = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < requests.length; j++) {
        if (selected[i] === requests[j].requester) {
          // push the request and its index
          selectedRequests.push([requests[j], j]);
        }
      }
    }
    for (let i = 0; i < selectedRequests.length; i++) {
      // if it's already rejected don't send a request to the db
      if (selectedRequests[i][0].requeststatus !== 'rejected') {
        const toBeRejected = {
          requestId: selectedRequests[i][0].requestid,
          // opportunityid: request.opportunityid,
        };
        await fetch(`/api/rejectRequest`, {
          method: 'POST',
          body: JSON.stringify(toBeRejected),
          headers: {
            'Content-Type': 'application/json',
          },
        })
            .then((res) => {
              if (!res.ok) {
                throw res;
              }
              return res.json();
            })
            .then((json) => {
            })
            .catch((err) => {
              console.log(err);
              toast.error(
                  `Something Went Wrong. Please Try Again.`,
                  {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
              return;
            });
        // if it was previously approved
        // delete the userparticipant from the opportunity
        // delete the assignedrole as well
        // and set the members
        if (selectedRequests[i][0].requeststatus === 'approved') {
          // first get the opportunity to update
          let updatedOpp;
          await fetch(`/api/getOpportunity/${
            selectedRequests[i][0].opportunityid}`)
              .then((res) => {
                if (!res.ok) {
                  throw res;
                }
                return res.json();
              })
              .then((json) => {
                updatedOpp = json;
              })
              .catch((err) => {
                console.log(err);
                alert('Error retrieving selected opportunity');
              });
          // delete the requester from the opp
          const index = updatedOpp.userparticipants
              .indexOf(selectedRequests[i][0].requester);
          if (index !== -1) {
            updatedOpp.userparticipants.splice(index, 1);
          }
          // delete the assigned role
          const reqRole = selectedRequests[i][0].role;
          // a role was requested
          if (reqRole) {
            const assignedRoles = updatedOpp.assignedroles;
            const temp = assignedRoles[reqRole];
            const index = temp
                .indexOf(selectedRequests[i][0].requester);
            if (index !== -1) {
              temp.splice(index, 1);
            }
          }
          // send the updated opportunity to the db
          await fetch(`/api/updateOpportunity`, {
            method: 'POST',
            body: JSON.stringify(updatedOpp),
            headers: {
              'Content-Type': 'application/json',
            },
          })
              .then((res) => {
                if (!res.ok) {
                  throw res;
                }
                return res.json();
              })
              .then((json) => {
              })
              .catch((err) => {
                console.log(err);
                toast.error(
                    `Something Went Wrong. Please Try Again.`,
                    {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                return;
              });
        }
      }
    }
    const updatedRequests = [...requests];
    const updatedParticipants = [...participants];
    const updatedMembers = {...members};
    for (let i = 0; i < selectedRequests.length; i++) {
      updatedRequests[selectedRequests[i][1]].requeststatus = 'rejected';
      updatedRequests[selectedRequests[i][1]].status = 'Denied';
      // delete the requester from the members
      const index = updatedParticipants
          .indexOf(selectedRequests[i][0].requester);
      if (index !== -1) {
        updatedParticipants.splice(index, 1);
      }

      // delete the rejected requesters that request roles
      const reqRole = updatedRequests[selectedRequests[i][1]].role;
      // a role is requested
      if (reqRole) {
        // if there are already people in that role pop the requester
        // from the existing list
        if (members[reqRole]) {
          const temp = [...members[reqRole]];
          // check if the person already exists
          // remove if exists else do nothing
          const index = temp
              .indexOf(selectedRequests[i][0].requester);
          if (index !== -1) {
            temp.splice(index, 1);
          }
          // set the state to new list
          updatedMembers[reqRole] = temp;
        }
      }
    }
    updateMembers(updatedMembers);
    updateParticipants(updatedParticipants);
    updateRequests(updatedRequests);
    resetSelected();
    const reqStr = selectedRequests.length > 1 ? 'requests' : 'request';
    toast.success(
        `Successfully rejected ${selectedRequests.length} ${reqStr}`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  };

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
          <ThemedButton
            color='yellow'
            variant='gradient'
            size='small'
            onClick={() => {
              approveRequests();
            }}
          >
            Approve
          </ThemedButton>
          <ThemedButton
            color='gray'
            variant='themed'
            size='small'
            onClick={() => {
              denyRequests();
            }}
          >
            Deny
          </ThemedButton>
        </Box>
      ) : (
        <>
          <Paper
            sx={{paddingLeft: '8px'}}
          >
            <MuiBox
              className='
              flex-space-between
              flex-align-center
              clickable
              no-highlight
              '
            >
              <div className='flex-horizontal flow-tiny'>
                <Collapse in={openFilter} timeout='auto' unmountOnExit>
                  <FormGroup
                    className='flex-horizontal flex-flow-small'
                    sx={{paddingBlock: '8px'}}
                  >
                    <FormControlLabel
                      className='no-highlight'
                      control={
                        <Checkbox
                          color='secondary'
                          size='small'
                          onChange={() => {
                            handleToggleFilter('Approved');
                          }}
                          checked={filterValues.indexOf('Approved') !== -1}
                          tabIndex={-1}
                          disableRipple
                          sx={{paddingBlock: '1px'}}

                        />
                      }
                      label={'Approved'}
                      componentsProps={{
                        typography: {
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--text-disabled)',
                        },
                      }}
                    />
                    <FormControlLabel
                      className='no-highlight'
                      control={
                        <Checkbox
                          color='secondary'
                          size='small'
                          onChange={() => {
                            handleToggleFilter('Denied');
                          }}
                          checked={filterValues.indexOf('Denied') !== -1}
                          tabIndex={-1}
                          disableRipple
                          sx={{paddingBlock: '1px'}}
                        />
                      }
                      label={'Denied'}
                      componentsProps={{
                        typography: {
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--text-disabled)',
                        },
                      }}
                    />
                    <FormControlLabel
                      className='no-highlight'
                      control={
                        <Checkbox
                          color='secondary'
                          size='small'
                          onChange={() => {
                            handleToggleFilter('Pending');
                          }}
                          checked={filterValues.indexOf('Pending') !== -1}
                          tabIndex={-1}
                          disableRipple
                          sx={{paddingBlock: '1px'}}
                        />
                      }
                      label={'Pending'}
                      componentsProps={{
                        typography: {
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--text-disabled)',
                        },
                      }}
                    />
                  </FormGroup>
                </Collapse>
              </div>
            </MuiBox>
          </Paper>
          <Tooltip
            title='Filter list'
          >
            <IconButton onClick={handleFilterClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
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
export default function FetchWrapper({
  updateParticipants,
  participants,
  updateMembers,
  members,
}) {
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
          if (json.length > 0) {
            json.map((request) => request.status = 'Pending');
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
          if (json.length > 0) {
            json.map((request) => request.status = 'Approved');
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
          if (json.length > 0) {
            json.map((request) => request.status = 'Denied');
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

  const updateRequests = (updatedRequests) => {
    setRequests(updatedRequests);
  };

  useEffect(() => {
    getPendingRequestsReceived();
    getApprovedRequests();
    getRejectedRequests();
  }, []);

  return (
    <>
      {requests && <ViewOpportunityRequests
        requests={requests}
        updateRequests={updateRequests}
        updateParticipants={updateParticipants}
        participants={participants}
        updateMembers={updateMembers}
        members={members}
      />}
    </>
  );
}

/**
 * Enhanced table
 * @return {JSX}
 */
function ViewOpportunityRequests({
  requests,
  updateRequests,
  updateParticipants,
  participants,
  updateMembers,
  members,
}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [displayReqs, setDisplayReqs] = useState([...requests]);
  // const [requester, setRequester] = useState(null);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const updateDisplayReqs = (newRequests) => {
    setDisplayReqs(newRequests);
  };
  const getRequesterNames = async () => {
    for (let i = 0; i < requests.length; i++) {
      await fetch(`/api/getProfileByProfileId/${requests[i].requester}`)
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then((json) => {
            requests[i].firstname = json.firstname;
          })
          .catch((err) => {
            console.log(err);
            alert('Error retrieving requester profile, please try again');
          });
    }
  };

  useEffect(() => {
    getRequesterNames();
  }, [requests]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelecteds = rows.map((n) => n.name);
      const newSelecteds = [];
      const temp = displayReqs.sort(getComparator(order, orderBy));
      for (let i = page * rowsPerPage;
        i < temp.length && i < (page * rowsPerPage + rowsPerPage);
        i++) {
        newSelecteds.push(temp[i].requester);
      }
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

  const resetSelected = () => {
    setSelected([]);
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
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          requests={requests}
          updateRequests={updateRequests}
          resetSelected={resetSelected}
          updateParticipants={updateParticipants}
          participants={participants}
          updateDisplayReqs={updateDisplayReqs}
          members={members}
          updateMembers={updateMembers}
        />
        <TableContainer>
          <Table aria-labelledby='tableTitle'>
            <EnhancedTableHead
              rowsPerPage={rowsPerPage}
              page={page}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              requests={requests}
              displayReqs={displayReqs}
            />
            <TableBody>
              {displayReqs
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
          count={displayReqs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
