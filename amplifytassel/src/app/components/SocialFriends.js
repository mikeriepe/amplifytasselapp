import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import MuiAvatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
import InputAdornment from '@mui/material/InputAdornment';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import ThemedButton from './ThemedButton';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {profileStatusToColor} from '../util/ProfileStatus';
import CircularProgress from '@mui/material/CircularProgress';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {styled} from '@mui/material/styles';
import {toast} from 'react-toastify';
import Fuse from 'fuse.js';
import useAuth from '../util/AuthContext';
import '../stylesheets/ApprovalTable.css';
import SocialChatBox from './SocialChatBox'; // Import the SocialChatBox component



import { DataStore } from '@aws-amplify/datastore';
import { Profile, Friend, ChatRoom, ProfileChatRoom } from './../../models';
import { Storage } from 'aws-amplify';
import { Chat, Dataset } from '@mui/icons-material';

import { createNewChatRoom, findExistingChatRoom } from '../util/SocialChatRooms';

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

const Avatar = ({ image, handleAvatarClick, profileid }, props) => (
  <MuiAvatar
    {...props}
    src={image}
    onClick={() => handleAvatarClick(profileid)}
    sx={{
      height: '2.5rem',
      width: '2.5rem',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
      marginRight: '1rem',
      ':hover': {
        cursor: 'pointer'
      }
    }}
  />
);

/**
 * row for account table
 * @param {*} props
 * @return {*} row object
 */
function Row(props) {
  const {row, handleSelect, selectAllChecked, selected} = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  const downloadProfilePicture = async () => {
    if (row.picture !== null) {
      const file = await Storage.get(row.picture, {
        level: "public"
      });
      setProfilePicture(file);
    } else {
      setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };

  useEffect(() => {
    downloadProfilePicture();
  }, [row])

  function handleAvatarClick(profileid) {
    navigate(`/Profile/${profileid}`);
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className='data-cell' padding='checkbox'>
          <Checkbox checked={selectAllChecked || selected.includes(row.email)} value={row.email} onChange={(event) => handleSelect(event, row)}/>
        </TableCell>
        <TableCell className='data-cell' padding='checkbox'>
        </TableCell>
        {/* eslint-disable-next-line max-len */}
        <TableCell className='data-cell' component='th' scope='row'
          sx={{display: 'flex',
            flexDirection: 'row'}}>
          <Avatar image={profilePicture} 
          handleAvatarClick={handleAvatarClick} 
          profileid={row.id}/>
          {/* eslint-disable-next-line max-len */}
          <div className='text-center-vert'>{`${row.firstName} ${row.lastName}`}</div>
        </TableCell>
        <TableCell className='data-cell'>{row.email}</TableCell>
        <TableCell className='data-cell'>{row.graduationYear}</TableCell>
        <TableCell className='data-cell'>
          <div style={{display: 'flex',
            flexDirection: 'row',
            color: profileStatusToColor(row.status)}}>
            <FiberManualRecordIcon sx={{
              fontSize: '1em',
              paddingTop: '.21rem',
              paddingRight: '.21rem'}}/>
            <div>{row.status}</div>
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

const formatTimestamp = (timestamp) => {
  const options = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  return new Date(timestamp).toLocaleString(undefined, options);
}; 

/**
 * creates account approval content
 * @return {HTML} account approval content
 */
export default function SocialFriends() {
  const {userProfile} = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [displayFriends, setDisplayFriends] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const [selectedChatroomid, setSelectedChatroomid] = useState('');
  const [selectedChatroomName, setselectedChatroomName] = useState('');
  const [chatroomMessages, setChatroomMessages] = useState([]);

  const handleOpenChatModal = async (chatroom) => {
    chatroom = await Promise.resolve(chatroom);
    const messageAsyncCollection = chatroom.Messages;
    const messages = await messageAsyncCollection.values;
    const sortedMessages = messages.sort((a, b) => new Date(a.Time) - new Date(b.Time));

    // updates the objects with a sender name
    const updatedMessages = await Promise.all(
      sortedMessages.map(async (msg) => {
        const senderProfile = await DataStore.query(Profile, (p) => p.id.eq(msg.Sender));
        const senderName = `${senderProfile[0].firstName} ${senderProfile[0].lastName}`;
        return { ...msg, senderName: senderName };
      })
    );

    // Format timestamps
    const formattedMessages = updatedMessages.map((msg) => ({
      ...msg,
      Time: formatTimestamp(msg.Time),
    }));
      
    setselectedChatroomName(chatroom.ChatName);
    setSelectedChatroomid(chatroom.id);
    setChatroomMessages(formattedMessages);
    setChatModalOpen(true);
  };

  const getAccounts = (sortBy, reset) => {
    DataStore.query(Profile)
    .then((res) => {
      setAccounts(res);
      setLoading(false);
    })
    .catch((err) => {
      alert('Error retrieving profiles, please try again');
      console.log(err);
    });
  };

  const handleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);
    if (!selectAllChecked) {
      const newSelected = displayFriends.map((user) => user.email);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (event, row) => {
    if (selectAllChecked) {
      setSelected([]);
    } else {
      const email = event.target.value;
      const currentIndex = selected.indexOf(email);
      const newSelected = [...selected];
  
      if (currentIndex === -1) {
        newSelected.push(email);
      } else {
        newSelected.splice(currentIndex, 1);
      }
      setSelected(newSelected);
    }
  };

  const handleDeleteAction = async (event) => {
    if (selected.length === 0) {
      toast.error('Select at least one user to send friend requests.');
      return;
    }
    try {
      const toProfileIDs = [];
      for (const email of selected) {
        // finds all accounts that match with the email profile
        const matchingProfile = accounts.find((profile) => profile.email === email);
        if (matchingProfile) {
          toProfileIDs.push(matchingProfile.id);
        }
      }
      // fetches Friend model that matches
      for (const toProfileID of toProfileIDs){
        try{
          const friendToDelete1 = await DataStore.query(Friend, (c) => c.and(c => [
            c.profileID.eq(toProfileID),
            c.Friend.eq(userProfile.id)
          ]));

          if(friendToDelete1.length){
            DataStore.delete(friendToDelete1[0]);
          }
          else{
            const friendToDelete2 = await DataStore.query(Friend, (c) => c.and(c => [
              c.profileID.eq(userProfile.id),
              c.Friend.eq(toProfileID)
            ]));
            DataStore.delete(friendToDelete2[0]);
          }
        } catch (error){
          console.error("Error finding Friend", error);
        }
      }
      reloadPageAfterDelay();
    } catch (error) {
      console.error("Error deleting friend", error);
    }
  }
    
  const reloadPageAfterDelay = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleMessageAction = async (event) => {
    const profileIDs = [userProfile.id];
    selected.forEach(async(email) => {
      const profile = await DataStore.query(Profile, p => p.email.eq(email));
      profileIDs.push(profile[0].id);
    });
    const allChatRooms = await DataStore.query(ChatRoom);
    const existingChatRoom = await findExistingChatRoom(allChatRooms, profileIDs);
    if(existingChatRoom == null){
      const newChatroom = createNewChatRoom(selected);
      handleOpenChatModal(newChatroom);
    }
    else{
      handleOpenChatModal(existingChatRoom);
    }
  };

  // Taken from Approvals, searches admin/approved accounts based on query
  const searchFriends = async (query) => {
    if (!query) {
      setDisplayFriends([]);
      return;
    }
  
    try {
      const friendIDs = [];
      const profileResults = [];
  
      // Fetch all friends with friend and profileID equal to the user's id
      const friends1 = await DataStore.query(Friend, f => f.Friend.eq(userProfile.id));
      const friends2 = await DataStore.query(Friend, f => f.profileID.eq(userProfile.id));
      
      // push matching ids
      friends1.forEach((item) => {
        friendIDs.push(item.profileID);
      });
  
      friends2.forEach((item) => {
        friendIDs.push(item.Friend);
      });
      
      // fetch profiles of friendIDs
      const profilePromises = friendIDs.map(async (item) => {
        const profile = await DataStore.query(Profile, p => p.id.eq(item));
        if (profile.length > 0) {
          return profile[0];
        }
        return null;
      });
  
      const profiles = await Promise.all(profilePromises);
      console.log("profiles",profiles);
      const fuse = new Fuse(profiles, {
        keys: ['firstName', 'email', 'graduationYear'],
        threshold: 0.3,
      });
      
      // Need to push items again since fuse added refIndex
      const result = fuse.search(query);
      result.forEach((item) => {
        profileResults.push(item.item);
      });
      setDisplayFriends(profileResults);
    } catch (error) {
      console.error("Error displaying friends", error);
    }
  };
  


  useEffect(() => {
    getAccounts('status', true);
    // eslint-disable-next-line
  }, []);


  // TODO: make more fancy
  // https://mui.com/material-ui/react-table/#sorting-amp-selecting
  const headCells = [
    {
      id: 'name',
      disablePadding: false,
      label: 'Name',
    },
    {
      id: 'email',
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'year',
      disablePadding: false,
      label: 'Grad Yr',
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
            aria-label='Account Actions'
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
                marginRight: '2rem',
              }}
              onClick={handleMessageAction}
            >
                Message
            </ThemedButton>
            <TextField
            placeholder='Search'
            size='small'
            onChange={(e) => searchFriends(e.target.value)}
            InputProps={{
              style: {
                marginTop: "0.1rem",
                marginRight: "5rem",
                fontSize: '0.9rem',
                backgroundColor: 'white',
                borderRadius: '10px',
                width: '30rem'
              },
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchRoundedIcon color='tertiary' />
                </InputAdornment>
              ),
            }}
            sx={{
              'width': 'auto',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.15)',
                },
              },
            }}
          />
          <ThemedButton
              color={'gray'}
              variant={'themed'}
              type={'submit'}
              style={{
                fontSize: '0.875rem',
                marginLeft: '54rem', // Move the Delete button to the very right
              }}
              onClick={handleDeleteAction}
            >
                Delete
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
            <TableHead aria-label='Accounts Table Head'>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                      checked={selectAllChecked}
                      onChange={handleSelectAll}
                    />
                </TableCell>
                <TableCell padding='checkbox'/>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    id='table-head-cell'
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody aria-label='Accounts Table Body'>
              {
                displayFriends.map((account) => {
                  return (
                    <Row
                      key={account.id}
                      row={account}
                      handleSelect={handleSelect}
                      selectAllChecked={selectAllChecked}
                      selected={selected}
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
      {isChatModalOpen && (
      <SocialChatBox
        open={isChatModalOpen}
        handleClose={() => setChatModalOpen(false)}
        chatroomName={selectedChatroomName}
        chatroomID={selectedChatroomid} // Pass the chatroom name here
        chatroomMessages={chatroomMessages}
      />)}
    </Page>
  );
}
