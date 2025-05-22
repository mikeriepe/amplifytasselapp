import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import Alert from '@mui/material/Alert';
import WarningIcon from '@mui/icons-material/Warning';
const Page = styled((props) => <MuiBox {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1em",
  marginBlock: "1em",
}));

export default function PendingApproval() {

  return (
    <div>
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

    </div>
  );
}
