import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import MuiAvatar from '@mui/material/Avatar';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {useNavigate} from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { DataStore } from '@aws-amplify/datastore';
import { Profile, Role } from '../../models';
import { Storage } from 'aws-amplify';


const Avatar = ({image}, props) => (
  <MuiAvatar sx={{height: '30px', width: '30px'}} src={image} {...props} />
);

/**
 * @return {JSX}
 */
export default function ViewOpportunityRequestCard({
  request,
  isItemSelected,
  labelId,
  handleClick,
}) {
  const [open, setOpen] = useState(false);
  const [requester, setRequester] = useState(null);
  const [role, setRole] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();
  const navigateToProfile = (profileid) => {
    navigate(`/Profile/${profileid}`);
  };

  const getRequester = async (request) => {
    let requesterProfile = await DataStore.query(Profile, (p) => p.and(p => [
      p.id.eq(request.profileID)
    ]));
    setRequester({...requesterProfile[0]});
  };

  const getRole = async (request) => {
    let requestRole = await DataStore.query(Role, (r) => r.and(r => [
      r.id.eq(request.roleID)
    ]));
    setRole(requestRole[0].name);
  };

  const downloadProfilePicture = async () => {
    if (requester.picture !== null) {
      const file = await Storage.get(requester.picture, {
        level: "public"
      });
      setProfilePicture(file);
    } else {
      setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };

  useEffect(() => {
    getRequester(request);
    getRole(request);
  }, [request]);

  useEffect(() => {
    if (requester) {
      downloadProfilePicture();
    }
  }, [requester]);

  const formatDate = (date) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const convertDate = new Date(date).toLocaleDateString([], dateOptions);
    const convertTime = new Date(date).toLocaleTimeString([], timeOptions);

    return `${convertDate} at ${convertTime}`;
  };

  return (
    <>
      <TableRow
        hover
        onClick={(event) => {
          if (!isItemSelected) {
            setOpen(true);
          } else {
            setOpen(false);
          }
          handleClick(event, request.profileID);
        }}
        role='checkbox'
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
      >
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
            aria-label={`Check ${request.firstName}`}
          />
        </TableCell>
        <TableCell
          component='th'
          id={labelId}
          scope='row'
          padding='none'
        >
          <div
            className='flex-horizontal flex-align-center flex-flow-large'
          >
            <div
              onClick={() => navigateToProfile(request.profileID)}
              style={{
                cursor: 'pointer',
              }}
            >
              <Avatar image={profilePicture}/>
            </div>
            <p>{`${requester?.firstName} ${requester?.lastName}`}</p>
          </div>
        </TableCell>
        <TableCell align='left'>
          <p>{role === '' ? 'None' : role}</p>
        </TableCell>
        <TableCell align='left'>
          <p>{formatDate(request.requestTime)}</p>
        </TableCell>
        <TableCell align='left'>
          <Chip
            label={request.status}
            variant='outlined'
            color={
              request.status === 'APPROVED' ? 'success' :
              request.status === 'REJECTED' ? 'error' :
              request.status === 'PENDING' ? 'secondary' :
              'primary'
            }
            size='small'
            icon={
              <Box
                style={{
                  marginLeft: '10px',
                  height: '6px',
                  width: '6px',
                  background:
                  request.status === 'APPROVED' ? 'var(--success-green-main)' :
                  request.status === 'REJECTED' ? 'var(--error-red-main)' :
                  request.status === 'PENDING' ?
                  'var(--secondary-yellow-main)' : 'var(--primary-blue-main)',
                  borderRadius: '50%',
                }}
              />
            }
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{margin: 1}}>
              <Typography gutterBottom component="div">
                Request Message:
              </Typography>
              <p>
                {request.requestMessage === '' ?
                '(This user did not leave a message)' :
                request.requestMessage}
              </p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
