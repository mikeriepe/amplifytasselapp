import * as React from 'react';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import PageHeader from '../components/PageHeader';
import CompressedTabBar from '../components/CompressedTabBar';
import ApprovalAccounts from '../components/ApprovalAccounts';

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
 * creates approvals page
 * @return {HTML} approvals page
 */
export default function Approvals() {
  const [tab, setTab] = React.useState(0);
  const tabs = [
    {name: 'Accounts', component: <ApprovalAccounts/>},
    {name: 'Opportunities', component: <p>Hello World</p>},
  ];
  return (
    <Page>
      <MuiBox>
        <PageHeader
          title='Approvals'
          subtitle='Approve or reject accounts and opportunities'
          tabs={<CompressedTabBar data={tabs} tab={tab} setTab={setTab}/>}
        />
        {tabs[tab].component}
      </MuiBox>
    </Page>
  );
}
