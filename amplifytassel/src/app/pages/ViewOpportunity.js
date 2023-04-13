import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import CompressedTabBar from '../components/CompressedTabBar';
import PageHeader from '../components/PageHeader';
import ThemedButton from '../components/ThemedButton';
import ViewOpportunityAbout from '../components/ViewOpportunityAbout';
import ViewOpportunityFindPeople from '../components/ViewOpportunityFindPeople';
import ViewOpportunityForums from '../components/ViewOpportunityForums';
import ViewOpportunityMembers from '../components/ViewOpportunityMembers';
import ViewOpportunityRequests from '../components/ViewOpportunityRequests';
import useAuth from '../util/AuthContext';

const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  margin: '2em 2em',
  display: 'flex',
  height: 'auto',
  width: 'auto',
  background: 'var(--background-primary)',
}));

/**
 * Passes fetched data to view opportunity page
 * @return {JSX}
 */
export default function FetchWrapper() {
  const params = useParams();
  const [fetchedData, setFetchedData] = useState(null);

  const getOpportunity = () => {
    fetch(`/api/getOpportunity/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setFetchedData(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving selected opportunity');
        });
  };

  const getOpportunityRoles = () => {
    fetch(`/api/getRoles/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setFetchedData((prevData) => ({
            ...prevData,
            roles: json,
          }));
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity roles');
        });
  };

  useEffect(() => {
    if (params.opportunityid) {
      getOpportunity();
      getOpportunityRoles();
    }
  }, []);

  return (
    <>
      {
        fetchedData &&
        fetchedData.usersponsors &&
        <ViewOpportunity opportunity={fetchedData} />
      }
    </>
  );
}

/**
 * View opportunity page
 * @return {JSX}
 */
function ViewOpportunity({opportunity}) {
  const params = useParams();
  const {userProfile} = useAuth();
  const [isCreator, setIsCreator] = useState(false);
  const [creator, setCreator] = useState(null);
  const [tab, setTab] = useState(0);

  const noncreatorTabs = [
    {
      name: 'About',
      component:
        <ViewOpportunityAbout
          isCreator={isCreator && isCreator}
          description={opportunity?.description}
          roles={opportunity?.roles}
        />,
    },
    {
      name: 'Forums',
      component:
        <ViewOpportunityForums
          id={opportunity.eventid}
        />,
    },
  ];

  const creatorTabs = [
    {
      name: 'About',
      component:
        <ViewOpportunityAbout
          isCreator={isCreator && isCreator}
          description={opportunity?.description}
          roles={opportunity?.roles}
        />,
    },
    {
      name: 'Forums',
      component:
        <ViewOpportunityForums
          id={params.opportunityid}
        />,
    },
    {
      name: 'Requests',
      component: <ViewOpportunityRequests />,
    },
    {
      name: 'Find People',
      component: <ViewOpportunityFindPeople />,
    },
  ];

  const handleIsCreator = () => {
    const check = userProfile.profileid === opportunity.usersponsors.creator;
    setIsCreator(check);
  };

  const getOpportunityCreator = () => {
    fetch(`/api/getProfileName/${opportunity.usersponsors.creator}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setCreator(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity creators profile');
        });
  };

  useEffect(() => {
    if (opportunity) {
      getOpportunityCreator();
      handleIsCreator();
    }
  }, []);

  return (
    <Page>
      {
        opportunity && creator &&
        <>
          <MuiBox sx={{width: '70%', marginRight: '2em'}}>
            <PageHeader
              type='viewopportunity'
              isCreator={isCreator}
              title={opportunity?.eventname}
              subtitle='Hosted by:'
              host={`${creator?.firstname} ${creator?.lastname}`}
              avatar={creator?.profilepicture}
              banner={opportunity?.eventbanner}
              backUrl={'/opportunities'}
              data={opportunity}
              components={
                <ThemedButton variant='gradient' color='yellow' size='small'>
                  Request to Join
                </ThemedButton>
              }
              tabs={isCreator ?
                <CompressedTabBar
                  type='viewopportunity'
                  data={creatorTabs}
                  tab={tab}
                  setTab={setTab}
                /> :
                <CompressedTabBar
                  type='viewopportunity'
                  data={noncreatorTabs}
                  tab={tab}
                  setTab={setTab}
                />
              }
              tabNumber={tab}
            />
            {isCreator ?
              creatorTabs[tab].component :
              noncreatorTabs[tab].component
            }
          </MuiBox>
          <MuiBox sx={{width: '30%'}}>
            <ViewOpportunityMembers
              isCreator={isCreator}
              owner={{
                name: `${creator?.firstname} ${creator?.lastname}`,
                avatar: creator?.profilepicture,
                profileid: creator?.profileid,
              }}
              members={opportunity?.assignedroles}
            />
          </MuiBox>
        </>
      }
    </Page>
  );
}
