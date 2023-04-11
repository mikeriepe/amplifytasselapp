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
import '../stylesheets/ProfileAlert.css';
/**
 * creates ProfileAlert
 * @return {HTML} Alert component
 */
export default function ProfileAlert({data}) {
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [response, setResponse] = React.useState('');
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
    // console.log(data.profileid);
    // e.preventDefault();
    // const body = {
    //   status: 3,
    //   response: response,
    //   profileid: data.profileid,
    // };
    // console.log(body);
    // fetch(`/api/changeProfileRequestResponse`, {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw res;
    //       }
    //       console.log(res.json());
    //       setOpen(false);
    //       setResponse('');
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       alert('Error submitting your response, please try again');
    //     });
  };

  return (
    <div>
      {data.status == 1 &&
        <Alert
          style={{width: '800px', marginTop: '20px'}}
          severity="warning"
          icon={<WarningIcon fontSize="inherit" className='icon' />}
        >
          <div className='alert-text' color="warning">
            Your account is <strong>pending approval</strong>. <br />
            In the mean time, tell us a little about yourself!
          </div>
        </Alert>
      }

      {data.status == 99 &&
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

      {data.status == 2 &&
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

      {data.status == 3 &&
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
            <div className='dialog-text'>
              An admin has requested for more info:
              <strong> {data.requestinfo}</strong>
            </div>
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
            <div className='dialog-text'>{data.requestinfo}:</div>
          </DialogContentText>
          <TextField
            disabled
            value={data.requestresponse}
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
