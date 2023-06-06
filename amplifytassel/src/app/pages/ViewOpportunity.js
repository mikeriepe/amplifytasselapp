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
import { DataStore, Storage } from 'aws-amplify';
import { Opportunity, Role, Profile, Keyword, Request } from '../../models';
import { PointsAddition } from '../util/PointsAddition';
import useAnimation from '../util/AnimationContext';
import { calculateIfUserLeveledUp } from '../util/PointsAddition';

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
  const {userProfile, setUserProfile} = useAuth();
  const [isCreator, setIsCreator] = useState(false);
  const [creator, setCreator] = useState(null);
  const [tab, setTab] = useState(0);
  const [banner, setBanner] = useState(null);

  const [showReqForm, setshowReqForm] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState('');
  const [requestedRole, setRequestedRole] = React.useState('');

  const {
    setShowConfettiAnimation,
    setShowStarAnimation
  } = useAnimation();
  // REMOVE REQUESTED ROLE STATE
  // list of all the participants

  useState(opportunity);

  // list of assigned roles in the opportunity
  // console.log(opportunity);
  const [members, setMembers] = useState(opportunity?.profilesJoined);

  const updateMembers = (newMembers) => {
    setMembers(newMembers);
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
      requester: userProfile.id,
      requestmessage: requestMessage,
      opportunityid: opportunity.id,
      role: requestedRole,
    };

    postRequestToOpportunity(requestData);
    setshowReqForm(false);
    setRequestMessage('');
  };

  const postRequestToOpportunity = async (requestData, toasterStr) => {
    // Check if the profile already sent a request to this opportunity
    // extract the general participant role from the roles
    let genParticipantRole = {}
    for (let i = 0; i < opportunity?.roles.length; i++) {
      if(opportunity?.roles[i].name === 'General Participant') {
        genParticipantRole = {...opportunity?.roles[i]};
        break;
      }
    }

    const requests = await DataStore.query(Request, (r) => r.and(r => [
      r.profileID.eq(requestData.requester),
      r.opportunityID.eq(opportunity?.id)
    ]));

    // if the profile applied return toast notification
    if(requests.length > 0) {
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
      let toasterStr = '';
      const oldPoints = userProfile.points;
      const isLevelUp = calculateIfUserLeveledUp(oldPoints, 25);
      PointsAddition(25, requestData.requester, setUserProfile);
      if (isLevelUp) {
        // Display confetti animation
        setShowConfettiAnimation(true);
        toasterStr = 'and you leveled up!';
      } else {
        // Display star animation
        setShowStarAnimation(true);
        toasterStr = 'and you earned 25 points!';
      }

      await DataStore.save(
        new Request({
          status: 'PENDING',
          requestTime: new Date().toISOString(),
          requestMessage: requestData.requestmessage,
          opportunityID: requestData.opportunityid,
          roleID: genParticipantRole.id,
          profileID: requestData.requester,
        })
      );
      // toast notification
      toast.success(`Applied to ${opportunity.eventName} ${toasterStr}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
    {
      name: 'Requests',
      component: <ViewOpportunityRequests
        updateMembers={updateMembers}
        members={members}
      />,
    },
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
    const check = userProfile.id === opportunity.profileID;
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
  };

  const downloadFile = async () => {
    const img = await Storage.get(opportunity.bannerKey, {
      level: "public"
    });
    setBanner(img);
  }

  useEffect(() => {
    if (opportunity) {
      getOpportunityCreator();
      handleIsCreator();
    }
    downloadFile();
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
              hostprofileid={creator?.id}
              avatar={creator?.picture}
              banner={banner}
              backUrl={'/opportunities'}
              data={opportunity}
              components={
                <ThemedButton
                  aria-label='Request to Join Opportunity'
                  variant='gradient'
                  color='yellow'
                  size='small'
                  onClick={() => {
                    handleModalOpen('General Participant');
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
                profileid: creator?.id,
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
            profile
          />
        </>
      }
    </Page>
  );
}
