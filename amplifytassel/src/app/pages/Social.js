import * as React from 'react';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import PageHeader from '../components/PageHeader';
import CompressedTabBar from '../components/CompressedTabBar';
import SocialUsers from '../components/SocialUsers'
import SocialFriends from '../components/SocialFriends'

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
  const [tab, setTab] = React.useState(0);
  const tabs = [
    {name: 'Users', component: <SocialUsers/>},
    {name: 'Friends', component: <SocialFriends/>},
  ];
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
