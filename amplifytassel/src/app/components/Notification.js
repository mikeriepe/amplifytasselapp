import React from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import NotificationItem from './NotificationItem';
import useAuth from '../util/AuthContext';
import {useEffect, useState} from 'react';

/**
 * Notification
 * Displays the notification popover
 * @return {HTML} notification
 */
export default function Notification({props}) {
  const {userProfile} = useAuth();
  console.log('printing');
  console.log(userProfile);
  const [notifications, setNotifications] = useState(null);

  const getUserRequests = () => {
    fetch(`/api/getUserIncomingRequests/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          // console.log(json);
          setNotifications(json);
        })
        .then(() => {
          if (notifications) {
            props.setNotificationCount(notifications.length);
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving notifications');
        });
    // console.log('called getUserRequests()');
  };

  const handleNotificationClose = () => {
    props.setNotificationAnchorEl(null);
  };

  useEffect(() => {
    getUserRequests();
  }, []);

  console.log(notifications);
  return (
    <div>
      <Popover
        id={props.notificationId}
        open={props.showNotification}
        anchorEl={props.notificationAnchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {width: '25%'},
        }}
      >
        <List
          sx={{
            width: '100%', maxWidth: 400, bgcolor: 'background.paper',
          }}>
          {notifications && notifications.map((notification, index) => (
            <NotificationItem
              key={`notification-item-${index}`}
              data={notification}
            />
          ))}
        </List>
      </Popover>
    </div>
  );
}
