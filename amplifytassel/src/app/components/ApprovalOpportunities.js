import * as React from 'react';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import MuiAvatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import ThemedButton from './ThemedButton';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {opportunityStatusToText, opportunityStatusToColor} from '../util/OpportunityStatus';
import CircularProgress from '@mui/material/CircularProgress';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {styled} from '@mui/material/styles';
import '../stylesheets/ApprovalTable.css';

import { DataStore, Storage } from 'aws-amplify';
import { Opportunity } from './../../models';
import { Profile } from './../../models';

const Page = styled((props) => (
  <Box {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  height: 'auto',
  width: 'auto',
  marginInline: '3em',
  marginBlock: '1em',
}));

const Card = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5em 2em 1.5em 2em',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Avatar = ({image}, props) => (
  <MuiAvatar
    {...props}
    src={image}
    sx={{
      height: '2.5rem',
      width: '2.5rem',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
      marginRight: '1rem',
    }}
  />
);

/**
 * row for account table
 * @param {*} props
 * @return {*} row object
 */
function Row(props) {
  const {row, handleSelect, profile} = props;
  const [open, setOpen] = useState(false);

  const [banner, setBanner] = useState(null);

  const downloadFile = async () => {
    const img = await Storage.get(row.bannerKey, {
      level: "public"
    });
    setBanner(img);
  }

  useEffect(() => {
    downloadFile();
  }, []);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className='data-cell' padding='checkbox'>
          <Checkbox value={row.id} onChange={handleSelect}/>
        </TableCell>
        <TableCell className='data-cell' padding='checkbox'>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* eslint-disable-next-line max-len */}
        <TableCell className='data-cell' component='th' scope='row'
          sx={{display: 'flex',
            flexDirection: 'row'}}>
          <Avatar image={banner} />
          {/* eslint-disable-next-line max-len */}
          <div className='text-center-vert'>{`${row.eventName}`}</div>
        </TableCell>
        <TableCell className='data-cell'>{row.description}</TableCell>
        <TableCell className='data-cell' component='th' scope='row'
          sx={{display: 'flex',
            flexDirection: 'row'}}>
          <Avatar image={profile.profilePicture} />
          {/* eslint-disable-next-line max-len */}
          <div className='text-center-vert'>{`${profile.firstName} ${profile.lastName}`}</div>
        </TableCell>
        <TableCell className='data-cell'>
          <div style={{display: 'flex',
            flexDirection: 'row',
            color: opportunityStatusToColor(row.status)}}>
            <FiberManualRecordIcon sx={{
              fontSize: '1em',
              paddingTop: '.21rem',
              paddingRight: '.21rem'}}/>
            <div>{opportunityStatusToText(row.status)}</div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{margin: 1}}>
              <Typography variant='h1' component='div'>
                More Information
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/**
 * creates opportunity approval content
 * @return {HTML} opportunity approval content
 */
export default function ApprovalOpportunities() {
  const [opps, setOpps] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestInfo, setRequestInfo] = useState('');
  const [sortTitleOrder, setSortTitleOrder] = useState('');
  const [sortDescriptionOrder, setSortDescriptionOrder] = useState('');
  const [sortCreatorOrder, setSortCreatorOrder] = useState('');
  const [sortStatusOrder, setSortStatusOrder] = useState('');

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleRequestInfo = (e) => {
    setRequestInfo(e.target.value);
    console.log(e.target.value);
  };

  const handleDialogSubmit = () => {
    console.log(requestInfo);
    setDialogOpen(false);
  };

  const sortOpps = (json, sortBy, reset) => {
    if (reset === true) {
      setOpps(json.sort(function(a, b) {
        /* eslint-disable-next-line max-len */
        return opportunityStatusToText(a.status) > opportunityStatusToText(b.status) ? -1 : 1;
      }));
      setSortStatusOrder('asc');
      return;
    }
    if (sortBy === 'status') {
      if (sortStatusOrder === '') {
        setOpps(json.sort(function(a, b) {
          /* eslint-disable-next-line max-len */
          return opportunityStatusToText(a.status) > opportunityStatusToText(b.status) ? -1 : 1;
        }));
        setSortStatusOrder('asc');
      } else if (sortStatusOrder === 'asc') {
        setOpps(json.sort(function(a, b) {
          /* eslint-disable-next-line max-len */
          return opportunityStatusToText(a.status) > opportunityStatusToText(b.status) ? 1 : -1;
        }));
        setSortStatusOrder('desc');
      } else if (sortStatusOrder === 'desc') {
        setOpps(json.sort(function(a, b) {
          /* eslint-disable-next-line max-len */
          return opportunityStatusToText(a.status) > opportunityStatusToText(b.status) ? -1 : 1;
        }));
        setSortStatusOrder('asc');
      }
    }
    if (sortBy === 'title') {
      if (sortTitleOrder === '') {
        setOpps(json.sort(function(a, b) {
          return (a.eventName > b.eventName) ? 1 : -1;
        }));
        setSortTitleOrder('asc');
      } else if (sortTitleOrder === 'asc') {
        setOpps(json.sort(function(a, b) {
          return (a.eventName > b.eventName) ? -1 : 1;
        }));
        setSortTitleOrder('desc');
      } else if (sortTitleOrder === 'desc') {
        setOpps(json.sort(function(a, b) {
          return (a.eventName > b.eventName) ? 1 : -1;
        }));
        setSortTitleOrder('asc');
      }
    }
    if (sortBy === 'description') {
      if (sortDescriptionOrder === '') {
        setOpps(json.sort(function(a, b) {
          return (a.description > b.description) ? 1 : -1;
        }));
        setSortDescriptionOrder('asc');
      } else if (sortDescriptionOrder === 'asc') {
        setOpps(json.sort(function(a, b) {
          return (a.description > b.description) ? -1 : 1;
        }));
        setSortDescriptionOrder('desc');
      } else if (sortDescriptionOrder === 'desc') {
        setOpps(json.sort(function(a, b) {
          return (a.description > b.description) ? 1 : -1;
        }));
        setSortDescriptionOrder('asc');
      }
    }
    if (sortBy === 'creator') {
      if (sortCreatorOrder === '') {
        setOpps(json.sort(function(a, b) {
          const first = profiles.find((profile) =>
            profile.id === a.profileID);
          const second = profiles.find((profile) =>
            profile.id === b.profileID);
          return (first.firstName > second.firstName) ? 1 : -1;
        }));
        setSortCreatorOrder('asc');
      } else if (sortCreatorOrder === 'asc') {
        setOpps(json.sort(function(a, b) {
          const first = profiles.find((profile) =>
            profile.id === a.profileID);
          const second = profiles.find((profile) =>
            profile.id === b.profileID);
          return (first.firstName > second.firstName) ? -1 : 1;
        }));
        setSortCreatorOrder('desc');
      } else if (sortCreatorOrder === 'desc') {
        setOpps(json.sort(function(a, b) {
          const first = profiles.find((profile) =>
            profile.id === a.profileID);
          const second = profiles.find((profile) =>
            profile.id === b.profileID);
          return (first.firstName > second.firstName) ? 1 : -1;
        }));
        setSortCreatorOrder('asc');
      }
    }
  };

  const getOpps = (sortBy, reset) => {
    DataStore.query(Opportunity)
    .then((res) => {
      sortOpps(res, sortBy, reset);
      console.log(res);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving opportunities, please try again');
    });
  };

  const getProfiles = () => {
    DataStore.query(Profile)
    .then((res) => {
      setProfiles(res);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving profile, please try again');
    });
  };

  const handleSelect = (event) => {
    const eventname = event.target.value;
    const currentIndex = selected.indexOf(eventname);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(eventname);
    } else {
      newSelected.splice(currentIndex, 1);
    }
    setSelected(newSelected);
  };

  const handleStatusAction = (event) => {
    let status = 1;
    switch (event.target.textContent) {
      case 'Approve':
        status = 'APPROVED';
        break;
      case 'Request More Info':
        status = 'REQUESTED';
        break;
      case 'Deny':
        status = 'DENIED';
        break;
      default:
        status = 'PENDING'
        break;
    }
    const opportunities = selected.map((opportunity) => {
      const info = opps.find((opp) => opp.id === opportunity);
      return info;
    });
    setLoading(true);
    // eslint-disable-next-line guard-for-in
    for (let index = 0; index < opportunities.length; index++) {
      const opp = opportunities[index];
      DataStore.save(
        Opportunity.copyOf(opp, updated => {
          updated.status = status
        }))
        .then((res) => {
          getOpps('status', true);
          getProfiles();
          setSelected([]);
      })
      .catch((err) => {
        console.log(err);
        alert('Error approving opportunity, please try again');
      });
    }
  };

  
  useEffect(() => {
    getProfiles();
    getOpps('status', true);
    // eslint-disable-next-line
  }, []);

  const handleSort = (rowId) => {
    setLoading(true);
    if (rowId === 'title') {
      getOpps(rowId, false);
    }
    if (rowId === 'description') {
      getOpps(rowId, false);
    }
    if (rowId === 'creator') {
      getOpps(rowId, false);
    }
    if (rowId === 'status') {
      getOpps(rowId, false);
    }
    setLoading(false);
  };

  const getArrowDirection = (row) => {
    if (row === 'title') {
      return sortTitleOrder;
    } else if (row === 'description') {
      return sortDescriptionOrder;
    } else if (row === 'creator') {
      return sortCreatorOrder;
    } else if (row === 'status') {
      return sortStatusOrder;
    }
  };

  // TODO: make more fancy
  // https://mui.com/material-ui/react-table/#sorting-amp-selecting
  const headCells = [
    {
      id: 'title',
      disablePadding: false,
      label: 'Opportunity',
    },
    {
      id: 'description',
      disablePadding: false,
      label: 'Description',
    },
    {
      id: 'creator',
      disablePadding: false,
      label: 'Creator',
    },
    {
      id: 'status',
      disablePadding: false,
      label: 'Status',
    },
  ];

  return (
    <Page>
      <Card style={{padding: '.5rem'}}>
        <Toolbar>
          <Box
            aria-label='Opportunity Actions'
            style={{
              marginRight: '1rem',
            }}
          >
            <ThemedButton
              color={'green'}
              variant={'gradient'}
              type={'submit'}
              style={{
                fontSize: '0.875rem',
                marginRight: '.5rem',
              }}
              onClick={handleStatusAction}
            >
                Approve
            </ThemedButton>
            <ThemedButton
              color={'blue'}
              variant={'themed'}
              type={'submit'}
              style={{
                fontSize: '0.875rem',
                marginRight: '.5rem',
              }}
              onClick={handleDialogOpen}
            >
              Request More Info
            </ThemedButton>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Request More Info</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Describe what other information you would like to
                  get from the selected users.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Information"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleRequestInfo}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleDialogSubmit}>Send Requests</Button>

              </DialogActions>
            </Dialog>
            <ThemedButton
              color={'gray'}
              variant={'themed'}
              type={'submit'}
              style={{
                fontSize: '0.875rem',
                marginRight: '.5rem',
              }}
              onClick={handleStatusAction}
            >
            Deny
            </ThemedButton>
          </Box>
          {/* <Typography variant='h4'>Search Bar</Typography> */}
        </Toolbar>
      </Card>
      <Card>
        {
          loading ?
          <Box sx={{display: 'flex'}} style={{padding: '2rem'}}>
            <CircularProgress />
          </Box> :
          <Table
            style={{
              backgroundColor: 'white',
            }}
          >
            <TableHead aria-label='Opportunities Table Head'>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    color='primary'
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  // inputProps={{
                  //   'aria-label': 'select all desserts',
                  // }}
                  />
                </TableCell>
                <TableCell padding='checkbox'/>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    id='table-head-cell'
                    onClick={() => handleSort(headCell.id)}
                  >
                    <TableSortLabel
                    // active={orderBy === headCell.id}
                    // direction={orderBy === headCell.id ? order : 'asc'}
                    // onClick={createSortHandler(headCell.id)}
                      /* eslint-disable-next-line max-len */
                      direction={getArrowDirection(headCell.id) !== '' ? getArrowDirection(headCell.id) : 'desc'}
                    >
                      {headCell.label}
                      {/* {orderBy === headCell.id ? (
                      <Box component='span' sx={visuallyHidden}>
                        {order === 'desc' ?
                        'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null} */}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody aria-label='Opportunities Table Body'>
              {
                opps.map((opp) => {
                  return (
                    <Row
                      key={opp.id}
                      row={opp}
                      profile={profiles.find((profile) =>
                        profile.id === opp.profileID)}
                      handleSelect={handleSelect}
                    />
                  );
                })
              }
            </TableBody>
            {/* TODO: footer with pagination and number selected */}
            {/* <TableFooter>
            <div
              style={{
                position: 'absolute',
                padding: '1rem',
                fontSize: '0.875rem',
                color: 'primary',
              }}
            >
              0 rows selected
            </div>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                colSpan={12}
                count={50}
                rowsPerPage={5}
                page={0}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter> */}
          </Table>
        }
      </Card>
    </Page>
  );
}
