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
import { OpportunityStatus, Keyword } from '../../models';


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
  const [allKeywords, setAllKeywords] = useState([]);

  const getAllKeywords = () => {
    console.log("Getting keywords...");
    DataStore.query(Keyword)
    .then((res) => {
      setAllKeywords(res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving keywords');
    });
  }

  const getJoinedOpportunities = () => {
    console.log("Getting joined...");
    const currTime = new Date().toISOString();
    DataStore.query(Opportunity, (o) => o.and(o => [
      o.profilesJoined.profile.id.eq(userProfile.id),
      o.endTime.gt(currTime)
    ]))
    .then((res) => {
      setJoinedOpportunities(res);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving joined opportunities');
    });
  };

  const getCreatedOpportunities = () => {
    console.log("Getting created...");
      DataStore.query(Opportunity, o => o.profileID.eq(userProfile.id))
      .then((res) => {
        setCreatedOpportunities(res);
      })
      .catch((err) => {
        console.log(err);
        alert('Error retrieving created opportunities');
      });
  };

  const getPastOpportunities = () => {
    console.log("Getting past...");
    const currTime = new Date().toISOString();
    DataStore.query(Opportunity, (o) => o.and(o => [
      o.profilesJoined.profile.id.eq(userProfile.id),
      o.endTime.lt(currTime)
    ]))
    .then((res) => {
      setPastOpportunities(res);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving past joined opportunities');
    });
  };
  
  const getPendingOpportunities = () => {
    console.log("Getting pending...");
    DataStore.query(Opportunity, (o) => o.and(o => [
      o.Requests.profileID.eq(userProfile.id),
      o.Requests.status.eq('PENDING')
    ]))
    .then((res) => {
      setPendingOpportunities(res);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving pending opportunities');
    });
};

const getAllOpportunities = () => {
  console.log("Getting all...");
  //DataStore.query(Opportunity, (o) => o.status.eq('APPROVED'))
  DataStore.query(Opportunity, (o) => o.and(o => [
    o.status.eq('APPROVED'),
    o.profileID.ne(userProfile.id),
  ]))
  .then((res) => {
    const firstList = res;
    DataStore.query(Opportunity, (o) => o.and(o => [
      o.Requests.profileID.eq(userProfile.id)
    ]))
    .then((res) => {
      console.log(firstList);
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < firstList.length; j++) {
          if (res[i].id === firstList[j].id) {
            firstList.splice(j, 1);
          }
        }
      }
      const timeBoxedList = [];
      for (let i = 0; i < firstList.length; i++) {
        if (new Date(firstList[i].startTime) > Date.now()) {
          timeBoxedList.push(firstList[i]);
        }
      }
      setAllOpportunities(timeBoxedList);
    })
  })
  .catch((err) => {
    console.log(err);
    alert('Error retrieving opportunities');
  });
};

  useEffect(() => {
    getJoinedOpportunities();
    getCreatedOpportunities();
    getPastOpportunities();
    getPendingOpportunities();
    getAllOpportunities();
    getAllKeywords();
  }, []);

  return (
    <>
      {
        joinedOpportunities &&
        createdOpportunities &&
        pastOpportunities &&
        pendingOpportunities &&
        allOpportunities &&
        allKeywords &&
          <Opportunities
            getPendingOpportunities={getPendingOpportunities}
            joinedOpportunities={joinedOpportunities}
            createdOpportunities={createdOpportunities}
            pastOpportunities={pastOpportunities}
            pendingOpportunities={pendingOpportunities}
            allOpportunities={allOpportunities}
            getAllOpportunities={getAllOpportunities}
            getCreatedOpportunities={getCreatedOpportunities}
            allKeywords={allKeywords}
            getAllKeywords={getAllKeywords}
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
  allKeywords,
  getPendingOpportunities,
  getAllOpportunities,
  getCreatedOpportunities,
  getAllKeywords,
}, props) {
  const {userProfile} = useAuth();
  const location = useLocation();
  //const keywords = await DataStore.query(Keyword);
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
    //eventName: '',
    locationType: 'in-person',
    location: {
      'address': '',
      'state': '',
      'city': '',
      'zip': '',
    },
    //sponsortype: 'user sponsor',
    zoomLink: '',
    organization: [],
    description: '',
    eventData: '',
    startdate: new Date(),
    enddate: new Date(),
    //organizationtype: '',
    //opportunitytype: '',
    starttime: new Date(),
    endtime: new Date(),
    subject: '',
    //keywords: [allKeywords],
  };

  const handleModalClose = () => {
    setShowOppForm(!showOppForm);
  };

  const onSubmit = async (data) => {
    console.log("Starting process...");
    const newOpportunity = {
      assignedRoles: {},
      eventBanner: 'https://www.sorenkaplan.com/wp-content/uploads/2017/07/Testing.jpg',
      status: OpportunityStatus.PENDING,
      profilesJoined: [],
      //preferences: {},
      profileID: userProfile.id,
      Requests: {},
      ...data,
    };
    console.log("Object created...");
    console.log(newOpportunity);
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
        const ampOpp = await DataStore.save(
          new Opportunity({
          "zoomLink": newOpportunity.zoomLink,
          "organizations": [newOpportunity.organization],
          "description": newOpportunity.description,
          "eventBanner":  newOpportunity.eventBanner,
          "eventName": newOpportunity.name,
          "startTime": newOpportunity.startTime.toISOString(),
          "endTime": newOpportunity.endTime.toISOString(),
          "locationType": newOpportunity.locationType,
          "location": newOpportunity.location,
          "eventData": newOpportunity.eventdata,
          "subject": newOpportunity.subject,
          "preferences": [],
          "Roles": newOpportunity.roles,
          "Posts": newOpportunity.Posts,
          "Requests": newOpportunity.Requests,
          "profileID": newOpportunity.profileID,
          "profilesJoined": newOpportunity.profilesJoined,
          "keywords": newOpportunity.keywords,
          "status": newOpportunity.status
        })
      );
      console.log(ampOpp);
      console.log("Saved...");
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
        console.log("New roles: " + newOpportunity.roles.length);
          const gp = {
            opportunityID: ampOpp.id,
            // keeping it null until it's fully implemented
            //tagid: 'c7e29de9-5b88-49fe-a3f5-750a3a62aee5',
            responsibility: '',
            description: '',
            isfilled: false,
            name: "General Participant",
            qualifications: [],
            capacity: 0,
            Majors: [],
            Profiles: [],
            Requests: []
          };
          const gpCreation = await DataStore.save(
            new Role({
            "name": gp.name,
            "description": gp.description,
            "isFilled": gp.isfilled,
            "qualifications": gp.qualifications,
            "Majors": gp.Majors,
            "Profiles": gp.Profiles,
            "opportunityID": gp.opportunityID,
            "Requests": gp.Requests,
            "capacity": gp.capacity
          })
          );
          console.log("Making new role...");
          console.log(gpCreation);
        
          for (let i = 0; i < newOpportunity.roles.length; i++) {
            const newRole = {
              opportunityID: ampOpp.id,
              // keeping it null until it's fully implemented
              //tagid: 'c7e29de9-5b88-49fe-a3f5-750a3a62aee5',
              responsibility: '',
              description: '',
              isfilled: false,
              name: newOpportunity.roles[i],
              qualifications: [],
              capacity: 0,
              Majors: [],
              Profiles: [],
              Requests: []
            };
            const newRoleCreation = await DataStore.save(
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
            console.log("Making new role...");
            console.log(newRoleCreation);
        }
      console.log("Creating...");
  };

  // Reset filters when switching tabs
  useEffect(() => {
    setLocationFilter([]);
    //setOppTypeFilter([]);
    //setOrgTypeFilter([]);
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