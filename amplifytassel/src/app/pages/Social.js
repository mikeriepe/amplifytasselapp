import React, { useEffect, useState } from 'react';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import PageHeader from '../components/CustomComponents/PageHeader';
import CompressedTabBar from '../components/CustomComponents/CompressedTabBar';
import SocialUsers from '../components/Social/SocialUsers'
import SocialFriends from '../components/Social/SocialChatBox'
import SocialIncomingRequests from '../components/Social/SocialIncomingRequests';
import SocialOutgoingRequests from '../components/Social/SocialOutgoingRequests';
import SocialMessages from '../components/Social/SocialMessages';
import useAuth from '../util/AuthContext';

const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: 'auto',
  background: 'var(--background-primary)',
}));

/**
 * creates socials page
 * @return {HTML} socials page
 */
export default function Socials() {
  const [tab, setTab] = useState(0);
  const {userProfile} = useAuth();

  const tabs = (userProfile.status === "ADMIN" || userProfile.status === "APPROVED") ? [
    {name: 'Users', component: <SocialUsers/>},
    {name: 'Friends', component: <SocialFriends/>},
    {name: 'Incoming', component: <SocialIncomingRequests/>},
    {name: 'Outgoing', component: <SocialOutgoingRequests/>},
    {name: 'Messages', component: <SocialMessages/>}
  ]: [{name: 'Messages', component: <SocialMessages/>}];
  return (
    <Page>
      <MuiBox>
        <PageHeader
          title='Socials'
          subtitle='Add or delete friends and message them!'
          tabs={<CompressedTabBar data={tabs} tab={tab} setTab={setTab}/>}
        />
        {tabs[tab].component}
      </MuiBox>
    </Page>
  );
}
