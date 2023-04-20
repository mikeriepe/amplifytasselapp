import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CompressedTabBar from '../components/CompressedTabBar';
import OpportunitiesList from '../components/OpportunitiesList';
import PageHeader from '../components/PageHeader';
import useAuth from '../util/AuthContext';
import OpportunityForm from '../components/OpportunityForm';
import {Modal} from '@mui/material';
import {toast} from 'react-toastify';
import {useLocation} from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Opportunity } from '../../models';
import { Role } from '../../models';
import { Profile } from '../../models';

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

  const getJoinedOpportunities = async () => {
    console.log("Getting joined...");
    /*
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
      */
      const usersJoined = await DataStore.query(Opportunity, (o) => o.profilesJoined.profile.id.eq(userProfile.id));
      console.log(usersJoined);
  };
  //const usersJoined = await DataStore.query(Opportunity, (o) => o.profilesJoined.Profile.id.eq(userProfile.id));
  const getCreatedOpportunities = async () => {
    console.log("Getting created...");
    /*
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
    */
      const createdOpps = await DataStore.query(Opportunity, o => o.profileID.eq(userProfile.id));
      console.log(createdOpps);
  };
  //const createdOpps = await DataStore.query(Opportunity, o => o.profileID.eq(userProfile.id));
  const getPastOpportunities = async () => {
    console.log("Getting past...");
    /*
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
    */
    const currTime = new Date().toISOString();
    const usersJoinedPast = await DataStore.query(Opportunity, (o) => o.and(o => [
      o.profilesJoined.profile.id.eq(userProfile.id),
      o.endTime.lt(currTime)
    ]));
    console.log(usersJoinedPast);
    const createdOppsPast = await DataStore.query(Opportunity, (o) => o.and(o => [
      o.profileID.eq(userProfile.id),
      o.endTime.lt(currTime)
    ]));
    console.log(createdOppsPast);
  };
  //const past1 = await DataStore.query(Request, (r) => r.and(r => [
    //r.profile.id.eq(userProfile.profileid),
    //r.status.eq(RequestStatus.APPROVED)
  //]));
  //const past2 = await past1.past2.toArray();
  //const currTime = new Date().toISOString();
  //const past3 = await DataStore.query(Opportunity, (o) => o.endTime.lt(currTime));
  //const usersJoined = await DataStore.query(Opportunity, (o) => o.and(o => [
    //o.profilesJoined.Profile.id.eq(userProfile.id),
    //o.endTime.lt(currTime);
  //]));
  //const createdOpps = await DataStore.query(Opportunity, (o) => o.and(o => [
    //o.profileID.eq(userProfile.id),
    //o.endTime.lt(currTime);
  //]));
  
  const getPendingOpportunities = () => {
    /*
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
    */
    console.log("Getting pending...");
    DataStore.query(Opportunity, (o) => o.and(o => [
      o.Requests.profileID.eq(userProfile.id),
      o.Requests.status.eq('PENDING')
    ]))
    .then((res) => {
      // do some stuff
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving pending opportunities');
    });
};  

  const getAllOpportunities = async () => {
    /*
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
      */
    console.log("Getting all...");
    const models = await DataStore.query(Opportunity);
    console.log(models);
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
            getPendingOpportunities={getPendingOpportunities}
            joinedOpportunities={joinedOpportunities}
            createdOpportunities={createdOpportunities}
            pastOpportunities={pastOpportunities}
            pendingOpportunities={pendingOpportunities}
            allOpportunities={allOpportunities}
            getAllOpportunities={getAllOpportunities}
            getCreatedOpportunities={getCreatedOpportunities}
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
  getPendingOpportunities,
  getAllOpportunities,
  getCreatedOpportunities,
}, props) {
  const {userProfile} = useAuth();
  const location = useLocation();

  let defaultTab = null;
  if (location.state === null) {
    defaultTab = 0;
  } else if (location.state.defaultTab === 'browse') {
    defaultTab = 4;
  } else if (location.state.defaultTab === 'upcoming') {
    defaultTab = 0;
  } else {
    defaultTab = 0;
  }

  const [tab, setTab] = useState(defaultTab);
  const [locationFilter, setLocationFilter] = useState([]);
  const [oppTypeFilter, setOppTypeFilter] = useState([]);
  const [orgTypeFilter, setOrgTypeFilter] = useState([]);
  const [showOppForm, setShowOppForm] = useState(false);

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
          getCreatedOpportunities={getCreatedOpportunities}
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
          getPendingOpportunities={getPendingOpportunities}
          getAllOpportunities={getAllOpportunities}
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
          getPendingOpportunities={getPendingOpportunities}
          getAllOpportunities={getAllOpportunities}
        />,
    },
  ];

  const formValues = {
    eventName: '',
    locationType: 'in-person',
    location: {
      'address': '',
      'state': '',
      'city': '',
      'zip': '',
    },
    //sponsortype: 'user sponsor',
    zoomLink: '',
    organizations: '',
    description: '',
    eventData: '',
    //startDate: new Date(),
    //enddate: new Date(),
    //organizationtype: '',
    //opportunitytype: '',
    startTime: new Date(),
    endTime: new Date(),
    subject: '',
  };

  const handleModalClose = () => {
    setShowOppForm(!showOppForm);
  };

  const onSubmit = async (data) => {
    const newOpportunity = {
      Roles: {},
      eventBanner: 'https://www.sorenkaplan.com/wp-content/uploads/2017/07/Testing.jpg',
      status: null,
      profilesJoined: [],
      //preferences: {},
      profileID: {'creator': userProfile.profileid},
      Requests: {},
      ...data,
    };
    /*
    fetch(`/api/postOpportunity`, {
      method: 'POST',
      body: JSON.stringify(newOpportunity),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then(async (res) => {
          toast.success('Opportunity Created', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          handleModalClose();
          // insert the roles into role table
          for (let i = 0; i < newOpportunity.roles.length; i++) {
            const newRole = {
              opportunityid: res.opportunityid,
              // keeping it null until it's fully implemented
              tagid: 'c7e29de9-5b88-49fe-a3f5-750a3a62aee5',
              responsibility: '',
              isfilled: false,
              rolename: newOpportunity.roles[i],
              qualifications: [],
            };
            // console.log(newRole);
            await fetch(`/api/postRole`, {
              method: 'POST',
              body: JSON.stringify(newRole),
              headers: {
                'Content-Type': 'application/json',
              },
            })
                .then((res) => {
                  // console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
          }
        })
        .then(() => {
          getCreatedOpportunities();
        })
        .catch((error) => {
          console.log(error);
        });
      */
        await DataStore.save(
          new Opportunity({
          "zoomLink": newOpportunity.zoomLink,
          "organizations": newOpportunity.organizations,
          "description": newOpportunity.description,
          "eventBanner":  newOpportunity.eventBanner,
          "eventName": newOpportunity.eventName,
          "startTime": newOpportunity.startTime,
          "endTime": newOpportunity.endTime,
          "locationType": newOpportunity.locationType,
          "location": newOpportunity.location,
          "eventData": newOpportunity.eventData,
          "subject": newOpportunity.subject,
          //"preferences": [],
          "Roles": newOpportunity.Roles,
          "Posts": newOpportunity.Posts,
          "Requests": newOpportunity.Requests,
          "profileID": newOpportunity.profileID,
          "profilesJoined": newOpportunity.profilesJoined,
          "keywords": newOpportunity.keywords,
          "status": newOpportunity.status
        })
      );
        toast.success('Opportunity Created', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleModalClose();
        for (let i = 0; i < newOpportunity.Roles.length; i++) {
          const newRole = {
            opportunityID: newOpportunity.opportunityID,
            // keeping it null until it's fully implemented
            //tagid: 'c7e29de9-5b88-49fe-a3f5-750a3a62aee5',
            //responsibility: '',
            description: '',
            isfilled: false,
            name: newOpportunity.Roles[i],
            qualifications: [],
            capacity: 0,
            Majors: [],
            Profiles: [],
            Requests: []
          };
          await DataStore.save(
            new Role({
            "name": newRole.name,
            "description": newRole.description,
            "isFilled": newRole.isfilled,
            "qualifications": newRole.qualifications,
            "Majors": newRole.Majors,
            "Profiles": newRole.Profiles,
            "opportunityID": newRole.opportunityID,
            "Requests": newRole.Requests,
            "capacity": newRole.capacity
          })
        );
        };
      console.log("Creating...");
  };

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
        components={<AddButton onClick={() => setShowOppForm(true)}/>}
      />
      <Modal
        open={showOppForm}
        onBackdropClick={() => setShowOppForm(false)}
        onClose={() => setShowOppForm(false)}
        sx={{overflow: 'scroll'}}
      >
        <OpportunityForm
          onClose={handleModalClose}
          defaultValues={formValues}
          onSubmit={onSubmit}
        />
      </Modal>
      {tabs[tab].component}
    </Page>
  );
};