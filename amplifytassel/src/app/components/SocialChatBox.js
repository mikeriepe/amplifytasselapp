import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, TextField, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import useAuth from '../util/AuthContext';

const Bubble = styled((props) => (
  <Box {...props} />
))(({ theme }) => ({
  padding: '0.75em',
  borderRadius: '10px',
  background: theme.palette.tertiary.bright,
}));

const ChatModal = ({ open, handleClose, chatroomName, chatroomID, chatroomMessages }) => {
  const {userProfile} = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatboxRef = useRef(null);

  const handleEnterKeyPress = (e) => {
    if ((e.key === 'Enter' && !e.shiftKey) && (!message.trim())) {
      // Prevent the default behavior of the Enter key if message is empty or only contains spaces
      e.preventDefault();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    console.log(chatroomMessages);
    const currentTime = new Date().toLocaleTimeString();
    const newMessage = {
      id: messages.length + 1,
      text: message,
      userId: 1,
      username: 'UserA',
      timestamp: currentTime,
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = chatboxRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const left = e.clientX - dragOffset.x;
      const top = e.clientY - dragOffset.y;
      chatboxRef.current.style.left = left + 'px';
      chatboxRef.current.style.top = top + 'px';
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        ref={chatboxRef}
        sx={{
          position: 'absolute',
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
            onClick={handleClose}
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
          <Grid item xs>
            <TextField
              label="Type your message"
              variant="outlined"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
