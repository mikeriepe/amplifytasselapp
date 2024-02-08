import React, { useEffect, useState } from 'react';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import PageHeader from '../components/PageHeader';
import CompressedTabBar from '../components/CompressedTabBar';
import ApprovalAccounts from '../components/ApprovalAccounts';
import ApprovalOpportunities from '../components/ApprovalOpportunities';
import { useNavigate } from 'react-router-dom';
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
 * creates approvals page
 * @return {HTML} approvals page
 */
export default function Approvals() {
  const { loadingAuth, user, userProfile } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loadingAuth && userProfile?.status !== 'ADMIN') {
      if (user) navigate('/dashboard');
      else navigate('/');
    }
  }, [loadingAuth, user, userProfile, navigate]);

  const [tab, setTab] = useState(0);
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
        {userProfile?.status === 'ADMIN' && tabs[tab].component}
      </MuiBox>
    </Page>
  );
}
