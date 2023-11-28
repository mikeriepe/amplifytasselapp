import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, TextField, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import useAuth from '../util/AuthContext';
import { DataStore, Predicates } from 'aws-amplify';
import { Message, Profile } from './../../models';
import Filter from 'bad-words';

const filter = new Filter();

const Bubble = styled((props) => (
  <Box {...props} />
))(({ theme }) => ({
  padding: '0.75em',
  borderRadius: '10px',
  background: theme.palette.tertiary.bright,
}));

const formatTimestamp = (timestamp) => {
  const options = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  return new Date(timestamp).toLocaleString(undefined, options);
}; 

const ChatModal = ({ open, handleClose, chatroomName, chatroomID, chatroomMessages: initialChatroomMessages }) => {
  const {userProfile} = useAuth();
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [showProfanityWarning, setShowProfanityWarning] = useState(false);
  
  const chatboxRef = useRef(null);
  const [chatroomMessages, setChatroomMessages] = useState(initialChatroomMessages);
  const messagesContainerRef = useRef(null);
  
  // useEffect(() => {
  //     // const subscription = DataStore.observe(Message, Predicates.ALL).subscribe({
  //     //   next: (msg) => {
  //     //     // Update the state when a new message is received
  //     //     setChatroomMessages((prevMessages) => [...prevMessages, msg]);
  //     //     console.log("New message received:", msg);
          
  //     //   },  
  //     // });  


  //     // useEffect(() => {
  //     //   const subscription = DataStore.observe(Message, Predicates.ALL).subscribe({
  //     //     next: (msg) => {
  //     //       const messages = DataStore.query(Message, Predicates.ALL);
  //     //       const filteredMessages = messages.filter((msg) => msg.ChatRoomID === chatroomID);
  //     //       setChatroomMessages(filteredMessages);
            
  //     //     },
  //     //   });
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const messages = await DataStore.query(Message, Predicates.ALL);
  //        console.log("messages", messages);
  //     const filteredMessages = messages.filter((msg) => msg.ChatRoomID === chatroomID);
  //     setChatroomMessages(filteredMessages);
  //   };

  //   const subscription = DataStore.observe(Message).subscribe(() => {
  //     fetchMessages();
  //   });

  //   fetchMessages();

  //   return () => subscription.unsubscribe(); 
  // }, []);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await DataStore.query(Message, Predicates.ALL);
  
        const enrichedMessages = await Promise.all(
          messages.map(async (msg) => {
            // Fetch the sender's profile using msg.Sender
            const senderProfile = await DataStore.query(Profile, msg.Sender);
  
            return {
              ...msg,
              senderName: `${senderProfile?.firstName || 'Unknown User'} ${senderProfile?.lastName || ''}`,
              Time: new Date(msg.Time).toLocaleString(), // Format the timestamp
            };
          })
        );
  
        const filteredMessages = enrichedMessages.filter((msg) => msg.ChatRoomID === chatroomID);
        setChatroomMessages(filteredMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
  
    const subscription = DataStore.observe(Message).subscribe(() => {
      fetchMessages();
    });
  
    fetchMessages();
  
    return () => subscription.unsubscribe();
  }, [chatroomID]);




  const handleCloseModal = () => {
    // Close the modal
    handleClose();

    // Refresh here to refresh chatroomMessages from the frontend
    //window.location.reload();
  };

  const handleEnterKeyPress = (e) => {
    if ((e.key === 'Enter' && !e.shiftKey) && (!message.trim())) {
      // Prevent the default behavior of the Enter key if message is empty or only contains spaces
      e.preventDefault();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage();
    }
  };
  
  const handleSendMessage = async () => {
    console.log("New msg sent", message);

    if (filter.isProfane(message)) {
      setShowProfanityWarning(true);
      return;
    }
    const currentDate = new Date();
    const formattedTimestamp = currentDate.toISOString();
    
    const newMessage = await DataStore.save(
      new Message({
        "ChatRoomID": chatroomID,
        "Content": message,
        "Sender": userProfile.id,
        "Time": formattedTimestamp,
      })
    );

    // Clone the original message to avoid modifying the saved instance
    const chatMessage = { ...newMessage };
    // Update the Sender property with the concatenated first and last names
    chatMessage.senderName  = `${userProfile.firstName} ${userProfile.lastName}`;
    // Update the Time property with the formatted timestamp
    chatMessage.Time = formatTimestamp(formattedTimestamp);
    
    console.log("chatMsg", chatMessage);

    setChatroomMessages((prevMessages) => [...prevMessages, chatMessage]);
    setMessage('');
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);

    if (chatboxRef.current) {
      const rect = chatboxRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2; // Calculate offset from the center
      const offsetY = e.clientY - rect.top - rect.height / 2;
      setDragOffset({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging && chatboxRef.current) {
      const left = e.clientX - dragOffset.x;
      const top = e.clientY - dragOffset.y;
      chatboxRef.current.style.left = left + 'px';
      chatboxRef.current.style.top = top + 'px';
    }
  };


  useEffect(() => {
    // Scroll to the bottom when messages are updated
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [chatroomMessages]);


  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        ref={chatboxRef}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          cursor: isDragging ? 'grabbing' : 'grab',
          borderRadius: '10px',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Box
          sx={{
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '8px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {chatroomName}
          </Typography>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '16px',
          }}
        >
          <div
            ref={messagesContainerRef}
            style={{
              height: '400px',
              overflowY: 'scroll',
            }}
          >
            {chatroomMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.Sender === userProfile.id ? 'flex-end' : 'flex-start',
              marginBottom: '8px',
            }}
          >
            <Typography variant="caption" gutterBottom>
              {msg.senderName} - {msg.Time}
            </Typography>
            <Bubble>
              <Typography variant="body1">{msg.Content}</Typography>
            </Bubble>
          </div>
        ))}
          </div>
        </div>
 
        <Grid container spacing={1} alignItems="center">
          {showProfanityWarning && (
            <Grid item xs={12}>
              <Typography color="error" style={{ textAlign: 'center' }}>
                Message cannot be sent due to profanity.
              </Typography>
            </Grid>
          )}

          <Grid item xs>
            <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (showProfanityWarning) {
                setShowProfanityWarning(false);
              }
            }}
            onKeyDown={handleEnterKeyPress}
          />

          </Grid>
          <Grid item>
            <IconButton
              onClick={(e) => handleSendMessage(e)}
              color="primary"
              disabled={!message.trim()} // Disable the button if message is empty or only contains spaces
              sx={{
                display: 'flex',
                height: '48px',
                width: '48px',
                padding: '8px',
              }}
            >
              <SendRoundedIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ChatModal;
