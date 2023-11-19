import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, TextField, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';

const Bubble = styled((props) => (
  <Box {...props} />
))(({ theme }) => ({
  padding: '0.75em',
  borderRadius: '10px',
  background: theme.palette.tertiary.bright,
}));

const ChatModal = ({ open, handleClose, chatroom }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatboxRef = useRef(null);

  const simulatedDatabaseMessages = [
    { id: 1, text: 'Dear god, how do I fork the backend database!', userId: 1, username: 'UserA', timestamp: '10:00 AM' },
    { id: 2, text: 'I still haven\'t been able to search query...', userId: 1, username: 'UserA', timestamp: '10:05 AM' },
    { id: 3, text: 'But hey, Atleast i got this cool chat window', userId: 2, username: 'UserB', timestamp: '10:10 AM' },
    { id: 4, text: 'It has userID, username, timestamp, and a scrollbar WOW!', userId: 1, username: 'UserA', timestamp: '10:15 AM' },
  ];

  useEffect(() => {
    setMessages(simulatedDatabaseMessages);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent the default behavior of the Enter key (e.g., newline in the textarea)
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
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
            {chatroom}
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
            {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.userId === 1 ? 'flex-end' : 'flex-start',
              marginBottom: '8px',
            }}
          >
            <Typography variant="caption" gutterBottom>
              {msg.username} - {msg.timestamp}
            </Typography>
            <Bubble>
              <Typography variant="body1">{msg.text}</Typography>
            </Bubble>
          </div>
        ))}
          </div>
        </div>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Modal>
  );
};

export default ChatModal;
