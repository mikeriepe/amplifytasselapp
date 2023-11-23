// SocialMessageSetting.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function SocialMessageSetting({ open, handleClose, currentChatName, updateChatName }) {
  const [chatName, setChatName] = useState(currentChatName);

  const handleChatNameChange = (event) => {
    setChatName(event.target.value);
  };

  const handleSubmit = () => {
    // Call the updateChatName function with the new chat name
    updateChatName(chatName);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="chat-name"
            label="Chat Name"
            type="text"
            fullWidth
            variant="standard"
            value={chatName}
            onChange={handleChatNameChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SocialMessageSetting;
