import React from 'react';
import { Dialog, DialogActions, DialogContent, List, ListItemButton, ListItemText } from '@mui/material';
import MuiAvatar from "@mui/material/Avatar";
import ThemedButton from './ThemedButton';
import { toast } from "react-toastify";

const Avatar = ({ image }, props) => (
  <MuiAvatar
    {...props}
    src={image}
    sx={{
      height: "2.5rem",
      width: "2.5rem",
      border: "0.5px solid rgba(0, 0, 0, 0.15)",
      marginRight: "1rem",
      ":hover": {
        cursor: "pointer",
      },
    }}
  />
);

const toastOptions = {
  position: 'top-right',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export default function EmailDialog({ emails, accounts, profilePictures, open, setClose }) {

  const copyEmails = () => {
    if (emails.length === 0) return;
    navigator.clipboard.writeText(emails.join(' '));
    toast.success(`Copied to clipboard`, toastOptions);
  };

  const sendEmail = () => {
    /**
    * @link https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#email_links
    * @link https://www.30secondsofcode.org/react/s/mailto/
    */
    const Mailto = ({ emails, subject = '', body = '', children }) => {
      let params = subject || body ? '?' : '';
      if (subject) params += `subject=${encodeURIComponent(subject)}`;
      if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

      return `mailto:${emails.join(',')}${params}`;
    };
    if (emails.length > 0) {
      window.open(Mailto({ emails }));
    }
  };

  return (
    <Dialog open={open} onClose={setClose}>
      <DialogContent>
        <List>
          {emails.length > 0 ? emails.map((email) => {
            const info = accounts.find((account) => account.email === email);
            return (
              <ListItemButton key={info.id} onClick={() => window.open(`/Profile/${info.id}`, '_blank')}>
                <Avatar image={profilePictures[info.id] ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                <ListItemText primary={info.firstName + ' ' + info.lastName} secondary={info.email} />
              </ListItemButton>
            );
          }) :
          <ListItemButton>
            <ListItemText primary={"No emails selected"} />
          </ListItemButton>}
        </List>
      </DialogContent>
      <DialogActions>
        <ThemedButton disabled={emails.length === 0} color={"green"} variant={"gradient"} type={"submit"} onClick={sendEmail}>
          Send Email
        </ThemedButton>
        <ThemedButton disabled={emails.length === 0} color={"blue"} variant={"themed"} type={"submit"} onClick={copyEmails}>
          Copy Emails
        </ThemedButton>
        <ThemedButton color={"yellow"} variant={"themed"} type={"submit"} onClick={setClose}>
          Close
        </ThemedButton>
      </DialogActions>
    </Dialog>
  );
}
