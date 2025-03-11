import * as React from 'react';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import PageHeader from '../components/CustomComponents/PageHeader';
import CompressedTabBar from '../components/CustomComponents/CompressedTabBar';
import ApprovalAccounts from '../components/CustomComponents/ApprovalAccounts';
import ApprovalOpportunities from '../components/CustomComponents/ApprovalOpportunities';

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
    {name: 'Opportunities', component: <ApprovalOpportunities/>},
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
