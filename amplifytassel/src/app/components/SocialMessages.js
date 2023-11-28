import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import SocialChatBox from './SocialChatBox'; // Import the SocialChatBox component
import SocialMessageSetting from './SocialMessageSetting';
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
import useAuth from '../util/AuthContext';
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
import SettingsIcon from '@mui/icons-material/Settings';
import {profileStatusToColor} from '../util/ProfileStatus';
import CircularProgress from '@mui/material/CircularProgress';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {styled} from '@mui/material/styles';
import {toast} from 'react-toastify';
import Fuse from 'fuse.js';
import '../stylesheets/ApprovalTable.css';

import { DataStore } from '@aws-amplify/datastore';
import { FriendRequest, Profile, Friend, ChatRoom } from './../../models';
import { Storage } from 'aws-amplify';

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


/**
 * row for account table
 * @param {*} props
 * @return {*} row object
 */
function Row(props) {
  const { row, profiles, handleMessageAction, onChatButtonClick, handleSettingsClick} = props;
  const formattedProfiles = profiles.join(', ');

  const handleChatButtonClick = () => {
    // Call handleMessageAction with the chat room information
    handleMessageAction(row);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className='data-cell' padding='checkbox'>
          {/* Pass the handleChatButtonClick function to the ThemedButton */}
          <ThemedButton
          color={'green'}
          variant={'gradient'}
          type={'submit'}
          style={{ fontSize: '0.875rem', marginRight: '2rem' }}
          onClick={() => onChatButtonClick(row.ChatName)} // Pass the chatroom name here
        >
          Chat
        </ThemedButton>
          </TableCell>
          <TableCell className='data-cell' padding='checkbox'></TableCell>
          <TableCell
          className='data-cell'
          component='th'
          scope='row'
          style={{
            display: 'flex',
            alignItems: 'center', // Vertically align the content
            justifyContent: 'flex-start', // Align content to the left
            height: '56px', // Ensuring consistent height; adjust as needed
          }}
        >
          <div className='text-center-vert'>{row.ChatName}</div>
        </TableCell>
          <TableCell className='data-cell' style={{ whiteSpace: 'normal' }}>
            {formattedProfiles}
          </TableCell>
          <TableCell className='data-cell'>{/* Add content for this cell */}</TableCell>
          <TableCell className='data-cell'>
          <IconButton aria-label="settings" onClick={() => handleSettingsClick()}>
            <SettingsIcon />
          </IconButton>
        </TableCell>
        </TableRow>
        <TableRow></TableRow>
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
export default function SocialMessages() {
  const {userProfile} = useAuth();
  const [displayChats, setDisplayChats] = useState([]);
  const [profilesOfJoined, setProfilesOfJoined] = useState([]);
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const [selectedChatroomid, setSelectedChatroomid] = useState('');
  const [selectedChatroomName, setselectedChatroomName] = useState('');
  const [chatroomMessages, setChatroomMessages] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const handleOpenChatModal = async (chatroom) => {
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
  const handleSettingsClick = async (chatroom) => {
    setselectedChatroomName(chatroom.ChatName);
    setSelectedChatroomid(chatroom.id);
    setIsSettingsOpen(true);
  };
  // Taken from Approvals, searches admin/approved accounts based on query
  const searchChats = async (query) => {
    try {
      const profile = await DataStore.query(Profile, (p) => p.id.eq(userProfile.id));
      const chatRoomAsyncCollection = profile[0].Chatrooms;
      const chatroom = await chatRoomAsyncCollection.values;
  
      const results = await Promise.all(
        chatroom.map(async (chat) => {
          const chats = await DataStore.query(ChatRoom, (c) => c.id.eq(chat.chatRoomId));
          const ProfilesAsyncCollection = chats[0].Profiles;
          const profiles = await ProfilesAsyncCollection.values;
  
          const profileIdsArray = profiles
            .filter((profile) => profile.profileId !== userProfile.id)
            .map((profile) => profile.profileId);
  
          const fullNameArray = await Promise.all(
            profileIdsArray.map(async (id) => {
              const profile = await DataStore.query(Profile, (p) => p.id.eq(id));
              return `${profile[0].firstName} ${profile[0].lastName}`;
            })
          );
  
          return {
            chatroom: chats[0],
            fullNameArray,
          };
        })
      );
  
      if (!query) {
        setDisplayChats(results.map((result) => result.chatroom));
        setProfilesOfJoined(results.map((result) => result.fullNameArray));
      } else {
        const searchableData = results.map(({ chatroom, fullNameArray }) => ({
          chatName: chatroom.ChatName,
          profiles: fullNameArray.join(', '),
          originalData: chatroom,
        }));
  
        const fuse = new Fuse(searchableData, {
          keys: ['chatName', 'profiles'], 
          threshold: 0.3,
        });
  
        const fuseResults = fuse.search(query).map(result => result.item);
        const chatroomsResults = fuseResults.map(result => result.originalData);
        const profilesResults = fuseResults.map(result => result.profiles.split(', '));
  
        setDisplayChats(chatroomsResults);
        setProfilesOfJoined(profilesResults);
      }
    } catch (error) {
      console.error("Error searching chats", error);
    }
  };
  

  // TODO: make more fancy
  // https://mui.com/material-ui/react-table/#sorting-amp-selecting
  const headCells = [
    {
      id: 'name',
      disablePadding: false,
      label: 'Chat Name',
    },
    {
      id: 'members',
      disablePadding: false,
      label: 'Members',
    },
    {
      id: 'placeholder',
      disablePadding: false,
      label: '',
    },
    {
      id: 'settings',
      disablePadding: false,
      label: 'Settings',
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
            <TextField
            placeholder='Search'
            size='small'
            onChange={(e) => searchChats(e.target.value)}
            InputProps={{
              style: {
                marginTop: "0.1rem",
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
          </Box>
          {/* <Typography variant='h4'>Search Bar</Typography> */}
        </Toolbar>
      </Card>
      <Card>
        {
          <Table
            style={{
              backgroundColor: 'white',
            }}
          >
            <TableHead aria-label='Accounts Table Head'>
              <TableRow>
                <TableCell padding='checkbox'>
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
                  {displayChats.map((chatroom, index) => {
                  const profileOfJoined = profilesOfJoined[index];
                  return (
                    <Row
                    key={chatroom.id}
                    row={chatroom}
                    profiles={profileOfJoined}
                    onChatButtonClick={() => handleOpenChatModal(chatroom)} // Pass a function here
                    handleSettingsClick={() => handleSettingsClick(chatroom)}
                    />
                )})}
                
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
          {isSettingsOpen && (
      <SocialMessageSetting
        open={isSettingsOpen}
        handleClose={() => setIsSettingsOpen(false)}
        chatroomID={selectedChatroomid}
        chatroomName={selectedChatroomName}
      />
    )}
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
