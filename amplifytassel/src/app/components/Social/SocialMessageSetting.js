import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DataStore } from '@aws-amplify/datastore';
import { ChatRoom } from '../../../models';

function SocialMessageSetting({ open, handleClose, chatroomID }) {
  const [chatName, setChatName] = useState('');

  useEffect(() => {
    // Observe the chat room model to keep state updated
    const subscription = DataStore.observe(ChatRoom, chatroomID).subscribe((model) => {
      if (model) {
        setChatName(model.ChatName);
      }
    });

    return () => subscription.unsubscribe();
  }, [chatroomID]);

  const handleChatNameChange = (event) => {
    setChatName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Fetch the chat room data by ID (optional since we observe the model)
      const chatRoom = await DataStore.query(ChatRoom, chatroomID);
      // Create a copy of the chat room with the updated name
      const updatedChatRoom = ChatRoom.copyOf(chatRoom, (updated) => {
        updated.ChatName = chatName;
      });

      // Save the updated chat room
      await DataStore.save(updatedChatRoom);

      // Close the dialog
      handleClose();

      window.location.reload();
    } catch (error) {
      console.error('Error updating chat room name:', error);
      // Handle the error if needed
    }
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
