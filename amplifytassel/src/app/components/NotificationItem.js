import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
// import useAuth from '../util/AuthContext';
import {useNavigate} from 'react-router-dom';

/**
 * Notification Item
 * Displays the notification items
 * @return {HTML} notification items
 */
export default function NotificationItem({data}) {
  // const {userProfile} = useAuth();
  const [requesterProfile, setProfile] = React.useState(null);
  const [opportunity, setOpportunity] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const getProfile = () => {
    fetch(`/api/getProfileByProfileId/${data.requester}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setProfile(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving profile, please try again');
        });
  };

  const getOpportunity = () => {
    fetch(`/api/getOpportunity/${data.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setOpportunity(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving selected opportunity');
        });
  };

  const gotoNotificationDetail = (e) => {
    // todo data.requestid
  };

  const handleClickRequester = (e) => {
    navigate(`/profile/${data.requester}`);
  };

  const handleClickOpportunity = (e) => {
    navigate(`/opportunity/${data.opportunityid}`);
  };


  React.useEffect(() => {
    getProfile();
    getOpportunity();
  }, []);

  React.useEffect(() => {
    if (requesterProfile && opportunity) {
      setLoading(false);
    }
  }, [requesterProfile, opportunity]);

  return (
    <div>
      {
        loading ?
        <p>Loading</p> :
        <ListItemButton
          alignItems="flex-start"
          onClick={gotoNotificationDetail()}
        >
          <ListItemAvatar>
            <Avatar
              alt={requesterProfile.firstname + ' ' + requesterProfile.lastname}
              src={requesterProfile.profilepicture}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  sx={{display: 'inline'}}
                  component="span"
                  variant="body"
                  color="text.primary"
                >
                  {'Request from '}
                </Typography>
                <Typography
                  sx={{display: 'inline'}}
                  component="span"
                  variant="body"
                  color='#fbc02d'
                  onClick={handleClickRequester}
                >
                  {requesterProfile &&
                requesterProfile.firstname + ' ' + requesterProfile.lastname}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{display: 'inline'}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {'for '}
                </Typography>
                <Typography
                  sx={{display: 'inline'}}
                  component="span"
                  variant="body2"
                  color="#42a5f5"
                  onClick={handleClickOpportunity}
                >
                  {opportunity && opportunity.eventname}
                </Typography>
                {` ${data.requestmessage}`}
              </React.Fragment>
            }
          />
        </ListItemButton>
      }
      {/* {(data.requester == userProfile.profileid) &&
      data.requeststatus != 'pending' &&
      <ListItemButton
        alignItems="flex-start"
        onClick={gotoNotificationDetail}
      >
        <ListItemAvatar>
          <Avatar alt={opportunity.eventname} src={opportunity.eventbanner} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {'Your Request for '}
              </Typography>
              <Typography
                sx={{display: 'inline'}}
                component="span"
                variant="body2"
                color="#42a5f5"
                onClick={handleClickOpportunity}
              >
                {opportunity && opportunity.eventname}
              </Typography>
              <Typography
                sx={{display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {` is ${data.requeststatus}`}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {data.requestopportunity}
              </Typography>
              {` ${data.requestmessage}`}
            </React.Fragment>
          }
        />
      </ListItemButton>
      } */}
      <Divider variant="inset" component="li" />
    </div>
  );
}
