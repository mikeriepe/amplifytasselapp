import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import useAuth from '../util/AuthContext';
import '../stylesheets/ProfileAlert.css';

import { ProfileStatus } from '../../models';
import { Profile } from '../../models';
import { DataStore } from '@aws-amplify/datastore';


/**
 * creates ProfileAlert
 * @return {HTML} Alert component
 */
export default function ProfileAlert({data}) {
  const { setUserProfile } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [response, setResponse] = React.useState('');
  const [reRender, setReRender] = React.useState(0);

  const handleDialog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleViewDialog = () => {
    setOpenView(true);
  };
  const handleViewDialogClose = () => {
    setOpenView(false);
  };

  const handleSubmit = async (e) => {
    // UPDATE profile.infoResponse
    e.preventDefault();
    DataStore.query(Profile, p => p.email.eq(data.profileEmail))
      .then((profiles) => {
        // console.log('profile', profiles);
        DataStore.save(Profile.copyOf(profiles[0], updated => {
          updated.infoResponse = response;
          updated.status = ProfileStatus.UPDATED;
        }))
          .then(() => {
            DataStore.query(Profile, c => c.email.eq(data.profileEmail))
              .then((profile) => {
                setUserProfile(profile[0]);
              })
            setOpen(false);
            setResponse('');
          });
      })
      .catch((err) => {
        console.log('error retreiving/updating profile: ', err);
      });
  };

  return (
    <div>
      {data.status === ProfileStatus.PENDING &&
        <Alert
          style={{width: '800px', marginTop: '20px'}}
          severity="warning"
          icon={<WarningIcon fontSize="inherit" className='icon' />}
        >
          <div className='alert-text' color="warning">
            Your account is <strong>pending approval</strong>. <br /><br />
            In the meantime, here’s a little bit about us: <br /><br />
            The Tassel Alumni Micro-Volunteering platform provides an easy way for users to post volunteering opportunities, find qualified volunteers, and join opportunities. <br /><br />
            We strive to create a close knit, genuine community for all alumni who wish to connect with their alma mater. To do this, we’ve devised a participation system that rewards you for your active involvement on the platform. <br /><br />
            As you complete different tasks on Tassel, you will earn Tassel points. This is a great way to show your enthusiasm and engagement to your fellow alumni! <br /><br />
            Try this out now by editing your personal info and telling us a little bit about yourself! <br /><br />
          </div>
        </Alert>
      }

      {data.status === ProfileStatus.DENIED &&
        <Alert
          style={{width: '800px', marginTop: '20px'}}
          severity="error"
          icon={<ErrorIcon fontSize="inherit" className='icon' />}
        >
          <div className='alert-text' color="error">
            Your account has been <strong>denied</strong> by an admin
          </div>
        </Alert>
      }

      {/* {data.status == 4 &&
        <Alert
          style={{width: '800px', marginTop: '20px'}}
          severity="success"
          icon={<CheckIcon fontSize="inherit" className='icon' />}
        >
          <div className='alert-text' color="success">
            You have been <strong>approved</strong> by an admin!
          </div>
        </Alert>
      } */}

      {data.status === ProfileStatus.REQUESTED &&
        <Alert
          style={{width: '800px', marginTop: '20px'}}
          severity="info"
          icon={<InfoIcon fontSize="inherit" className='icon' />}
          action={
            <Button onClick={handleDialog} color="inherit" size="small">
              <div className='alert-button-text'>Respond</div>
            </Button>
          }
        >
          <div className='alert-text' color="info">
            An admin has <strong>requested more info</strong>
          </div>
        </Alert>
      }

      {data.status === ProfileStatus.UPDATED &&
        <Alert
          style={{width: '800px', marginTop: '20px'}}
          icon={<CheckIcon fontSize="inherit" className='icon' />}
          severity="info"
          color="info"
          action={
            <div>
              <Button onClick={handleViewDialog} color="info" size="small">
                <div className='alert-button-text'>View</div>
              </Button>
            </div>
          }
        >
          <div className='alert-text' color="info">
            You have responded to <strong>request for more info</strong>
          </div>
        </Alert>
      }

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className='alert-text'>
            Respond to request for more info:
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className='dialog-text'>
              An admin has requested for more info:
              <strong> {data.infoRequest}</strong>
            </span>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="response"
            label="Your response:"
            type="text"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openView} onClose={handleViewDialogClose}>
        <DialogTitle>
          <div className='alert-text'>
            View your response to the following request:
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className='dialog-text'>{data.infoRequest}:</span>
          </DialogContentText>
          <TextField
            disabled
            value={data.infoResponse}
            style={{marginTop: '10px'}}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleViewDialogClose}
            className='alert-button-text'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
