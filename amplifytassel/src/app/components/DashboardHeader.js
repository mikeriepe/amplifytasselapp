import React, {useEffect, useState} from 'react';
import MuiBox from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useAuth from '../util/AuthContext';

import { DataStore } from '@aws-amplify/datastore';
import { Opportunity } from './../../models';

const Header = ({children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: '3em',
      marginTop: '1em',
      height: '100%',
      width: 'calc(100% - 3em)',
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

/**
 * creates Dashboard header
 * @return {HTML} Dashboard header component
 */
export default function DashboardHeader({data}) {
  const {userProfile} = useAuth();
  const [joinedOpportunities, setJoinedOpportunities] = useState([]);

  const getJoinedOpportunities = () => {
    const currTime = new Date().toISOString();
    DataStore.query(Opportunity, (o) => o.and(o => [
      o.profilesJoined.profile.id.eq(userProfile.id),
      o.endTime.gt(currTime)
    ]))
    .then((res) => {
      setJoinedOpportunities(res);
    })
    .catch((err) => {
      alert('Error retrieving joined opportunities');
      console.log(err);
    });
  };

  useEffect(() => {
    getJoinedOpportunities();
  }, []);

  const numOpps = joinedOpportunities.length;

  return (
    <Header>
      <h2 className='text-dark ellipsis text-large' aria-label='Dashboard Header'>
         Welcome back, {data.firstName}!
      </h2>
      <h5 className='text-bold ellipsis' aria-label='Dashboard Header Count'>
      You have
        <span className='text-bold text-blue ellipsis'> {numOpps} </span>
       upcoming event{numOpps === 1 ? '' : 's'}
      </h5>
      <Divider sx={{borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)',
        marginRight: '3em',
        marginTop: '2em'}} />
    </Header>
  );
}
