import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CompressedTabBar from '../components/CompressedTabBar';
import OpportunitiesList from '../components/OpportunitiesList';
import PageHeader from '../components/PageHeader';
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

const AddButton = (props) => (
  <MuiBox
    className='
      flex-horizontal
      flex-flow-xlarge
      flex-align-center
      text-lineheight-16
      clickable
    '
  >
    <h5
      className='text-small text-yellow'
      style={{
        margin: 0,
        width: '100px',
        textAlign: 'right',
      }}
    >
      Create New Opportunity
    </h5>
    <MuiBox
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        width: '40px',
        padding: 0,
        background: 'var(--secondary-yellow-main)',
        borderRadius: '5px',
      }}
      {...props}
    >
      <AddRoundedIcon
        sx={{
          height: '20px',
          width: '20px',
          stroke: 'white',
          strokeWidth: '2px',
        }}
      />
    </MuiBox>
  </MuiBox>
);

/**
 * Passes fetched data to opportunities list component
 * @return {JSX}
 */
export default function FetchWrapper() {
  const {userProfile} = useAuth();
  const [joinedOpportunities, setJoinedOpportunities] = useState([]);
  const [createdOpportunities, setCreatedOpportunities] = useState([]);
  const [pastOpportunities, setPastOpportunities] = useState([]);
  const [pendingOpportunities, setPendingOpportunities] = useState([]);
  const [allOpportunities, setAllOpportunities] = useState([]);

  const getJoinedOpportunities = () => {
    fetch(`/api/getJoinedOpportunities/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setJoinedOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving joined opportunities');
        });
  };

  const getCreatedOpportunities = () => {
    fetch(`/api/getCreatedOpportunities/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setCreatedOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving created opportunities');
        });
  };

  const getPastOpportunities = () => {
    fetch(`/api/getPastOpportunities/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setPastOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving past opportunities');
        });
  };

  const getPendingOpportunities = () => {
    fetch(`/api/getPendingOpportunities/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setPendingOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving past opportunities');
        });
  };

  const getAllOpportunities = () => {
    fetch(`/api/getOpportunities`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setAllOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving all opportunities');
        });
  };

  useEffect(() => {
    getJoinedOpportunities();
    getCreatedOpportunities();
    getPastOpportunities();
    getPendingOpportunities();
    getAllOpportunities();
  }, []);

  return (
    <>
      {
        joinedOpportunities &&
        createdOpportunities &&
        pastOpportunities &&
        pendingOpportunities &&
        allOpportunities &&
          <Opportunities
            joinedOpportunities={joinedOpportunities}
            createdOpportunities={createdOpportunities}
            pastOpportunities={pastOpportunities}
            pendingOpportunities={pendingOpportunities}
            allOpportunities={allOpportunities}
          />
      }
    </>
  );
}

/**
 * creates opportunities page
 * @return {HTML} opportunities page
 */
function Opportunities({
  joinedOpportunities,
  createdOpportunities,
  pastOpportunities,
  pendingOpportunities,
  allOpportunities,
}) {
  const [tab, setTab] = useState(0);
  const [locationFilter, setLocationFilter] = useState([]);
  const [oppTypeFilter, setOppTypeFilter] = useState([]);
  const [orgTypeFilter, setOrgTypeFilter] = useState([]);

  const tabs = [
    {
      name: 'Upcoming',
      component:
        <OpportunitiesList
          key='upcoming'
          type='upcoming'
          opportunities={joinedOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
        />,
    },
    {
      name: 'Created',
      component:
        <OpportunitiesList
          key='created'
          type='created'
          opportunities={createdOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
        />,
    },
    {
      name: 'Pending',
      component:
        <OpportunitiesList
          key='pending'
          type='pending'
          opportunities={pendingOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
        />,
    },
    {
      name: 'Completed',
      component:
        <OpportunitiesList
          key='completed'
          type='completed'
          opportunities={pastOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
        />,
    },
    {
      name: 'Browse',
      component:
        <OpportunitiesList
          key='all'
          type='all'
          opportunities={allOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
        />,
    },
  ];

  // Reset filters when switching tabs
  useEffect(() => {
    setLocationFilter([]);
    setOppTypeFilter([]);
    setOrgTypeFilter([]);
  }, [tab]);

  return (
    <Page>
      <PageHeader
        title='Opportunities'
        subtitle='View and join opportunities'
        tabs={<CompressedTabBar data={tabs} tab={tab} setTab={setTab} />}
        components={<AddButton />}
      />
      {tabs[tab].component}
    </Page>
  );
}
