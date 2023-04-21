import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import CompressedTabBar from '../components/CompressedTabBar';
import PageHeader from '../components/PageHeader';
import ThemedButton from '../components/ThemedButton';
import ViewOpportunityAbout from '../components/ViewOpportunityAbout';
import ViewOpportunityForums from '../components/ViewOpportunityForums';
import ViewOpportunityMembers from '../components/ViewOpportunityMembers';
import ViewOpportunityRequests from '../components/ViewOpportunityRequests';
import useAuth from '../util/AuthContext';
import RequestModal from '../components/RequestOpportunityModal';
import {toast} from 'react-toastify';
import { DataStore } from '@aws-amplify/datastore';
import { Opportunity, Role, Profile, Keyword } from '../../models';

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

  const getOpportunity = async () => {
    let tempOpp = await DataStore.query(Opportunity, (o) => o.and(o => [o.id.eq(params.opportunityid)]));
    let cpyOpp = {
      ...tempOpp[0],
    }

    let temp1 = await DataStore.query(Profile, (p) => p.and(p => [p.OpportunitiesJoined.opportunity.id.eq(params.opportunityid)]));

    let temp2 = await DataStore.query(Role, (r) => r.and(r => [r.opportunityID.eq(params.opportunityid)]));

    let temp3 = await DataStore.query(Keyword, k => k.Opportunities.opportunityId.eq(params.opportunityid));
    
    cpyOpp.profilesJoined = [...temp1];
    cpyOpp.roles = [...temp2];
    cpyOpp.keywords = [...temp3];
    setFetchedData(cpyOpp);
  };

  /*
  const getOpportunity = () => {
    let temp = {};
    DataStore.query(Opportunity, (o) => o.and(o => [
      o.id.eq(params.opportunityid)
    ]))
    .then((res) => {
      // do some stuff
      temp = res[0];
    }).then(() => {
        DataStore.query(Profile, (p) => p.and(p => [
          p.OpportunitiesJoined.opportunity.id.eq(params.opportunityid)
        ]))
        .then((res) => {
          // do some stuff
          temp = {...temp, profilesJoined: res};
          setFetchedData(temp)
          getOpportunityRoles();
        })
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving opportunity participants');
    });
  };

  const getOpportunityRoles = () => {
    DataStore.query(Role, (r) => r.and(r => [
      r.opportunityID.eq(params.opportunityid)
    ]))
    .then((res) => {
      // do some stuff
      setFetchedData((prevData) => ({
        ...prevData,
        roles: res,
      }));
    }).then(() => {
      getOpportunityKeywords();
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving opportunity roles');
    });
  };

  const getOpportunityKeywords = () => {
    DataStore.query(Keyword, k => k.Opportunities.opportunityId.eq(params.opportunityid))
    .then((res) => {
      // do some stuff
      setFetchedData((prevData) => ({
        ...prevData,
        keywords: res,
      }));
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving opportunity roles');
    });
  };
  */

  useEffect(() => {
    if (params.opportunityid) {
      getOpportunity();
    }
  }, []);

  return (
    <>
      {
        fetchedData &&
        fetchedData.profileID &&
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

  const [showReqForm, setshowReqForm] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState('');
  const [requestedRole, setRequestedRole] = React.useState('');
  // REMOVE REQUESTED ROLE STATE
  // list of all the participants
  const [participants, setParticipants] =
  useState(opportunity);

  // list of assigned roles in the opportunity
  // console.log(opportunity);
  const [members, setMembers] = useState(opportunity?.profilesJoined);

  const updateMembers = (newMembers) => {
    setMembers(newMembers);
  };

  const updateParticipants = (newParticipants) => {
    setParticipants(newParticipants);
  };

  const handleModalClose = () => {
    setRequestedRole('');
    setshowReqForm(false);
  };

  const handleModalOpen = (role) => {
    setRequestedRole(role);
    setshowReqForm(true);
  };

  const handleRequestMessage = (e) => {
    setRequestMessage(e.target.value);
  };

  const handleRequestClick = (e) => {
    // Send request here
    const requestData = {
      requestee: creator.profileID,
      requester: userProfile.profileID,
      requestmessage: requestMessage,
      opportunityid: opportunity.id,
      role: requestedRole,
    };
    postRequestToOpportunity(requestData);
    setshowReqForm(false);
    setRequestMessage('');
  };

  const postRequestToOpportunity = (requestData) => {
    console.log('Join requested');
    console.log(requestData);
    /*
    fetch(`/api/postRequest`, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (res.status === 201) {
            toast.success(`Applied to ${opportunity.eventname}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (res.status === 409) {
            toast.warning(`You Already Applied to This Event`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(`Something Went Wrong. Please Try Again.`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Something Went Wrong. Please Try Again.');
        });
        */
  };

  const noncreatorTabs = [
    {
      name: 'About',
      component:
        <ViewOpportunityAbout
          isCreator={isCreator && isCreator}
          description={opportunity?.description}
          roles={opportunity?.roles}
          opportunityName={opportunity?.eventName}
          opportunityid={opportunity?.id}
          creator={creator}
          tags={opportunity?.keywords}
        />,
    },
    {
      name: 'Forums',
      component:
        <ViewOpportunityForums
          id={opportunity.id}
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
          tags={opportunity?.keywords}
        />,
    },
    {
      name: 'Forums',
      component:
        <ViewOpportunityForums
          id={params.opportunityid}
        />,
    },
    /*
    {
      name: 'Requests',
      component: <ViewOpportunityRequests
        updateParticipants={updateParticipants}
        participants={participants}
        updateMembers={updateMembers}
        members={members}
      />,
    },
    */
    // Find people tab will be implemented in Spring 2023
    // For now it will stay hidden
    /*
    {
      name: 'Find People',
      component: <ViewOpportunityFindPeople />,
    },
    */
  ];

  const handleIsCreator = () => {
    console.log(userProfile);
    const check = userProfile.profileid === opportunity.profileID;
    setIsCreator(check);
  };

  const getOpportunityCreator = async () => {
    DataStore.query(Profile, (p) => p.and(r => [
      p.id.eq(opportunity.profileID)
    ]))
    .then((res) => {
      // do some stuff
      setCreator(res[0]);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving opportunity creator');
    });
    // there will be only 1 match
    // Add error check here for the case where there are no matching opps
    /*
    fetch(`/api/getProfileName/${opportunity.usersponsors.creator}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setCreator(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity creators profile');
        });
    */
  };

  useEffect(() => {
    console.log(opportunity);
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
              title={opportunity?.eventName}
              subtitle='Hosted by:'
              host={`${creator?.firstName} ${creator?.lastName}`}
              avatar={creator?.picture}
              banner={opportunity?.eventBanner}
              backUrl={'/opportunities'}
              data={opportunity}
              components={
                <ThemedButton
                  variant='gradient'
                  color='yellow'
                  size='small'
                  onClick={() => {
                    handleModalOpen('');
                  }}
                >
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
                name: `${creator?.firstName} ${creator?.lastName}`,
                avatar: creator?.picture,
                profileid: creator?.profileID,
              }}
              members={members}
              roles={opportunity?.roles}
            />
          </MuiBox>
          <RequestModal
            showReqForm={showReqForm}
            handleModalClose={handleModalClose}
            requestMessage={requestMessage}
            handleRequestMessage={handleRequestMessage}
            handleRequestClick={handleRequestClick}
            opportunityName={opportunity.eventName}
          />
        </>
      }
    </Page>
  );
}
