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
import { DataStore, Storage } from 'aws-amplify';
import { Opportunity } from '../../models';
import { Role } from '../../models';
import { OpportunityStatus, Keyword } from '../../models';
import { PointsAddition } from '../util/PointsAddition';
import useAnimation from '../util/AnimationContext';
import { calculateIfUserLeveledUp } from '../util/PointsAddition';
import { v4 as uuidv4 } from 'uuid';


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
      aria-label='Opportunities Create Opportunity'
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
      //o.Requests.status.eq('PENDING')
    ]))
    .then((res) => {
      console.log(res);
      const pendingOpps = [];
      for (let i = 0; i < res.length; i++) {
        const p = Promise.resolve(res[i].Requests.values);
        p.then(value => {
          for (let j = 0; j < value.length; j++) {
            if (value[j].profileID === userProfile.id && value[j].status === 'PENDING') {
              pendingOpps.push(res[i]);
            }
          }
        });
      }
      setPendingOpportunities(pendingOpps);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving pending opportunities');
    });
};

const getAllOpportunities = () => {
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
            getJoinedOpportunities={getJoinedOpportunities}
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
  getJoinedOpportunities,
}, props) {
  const {userProfile, setUserProfile} = useAuth();
  const location = useLocation();
  const {
    setShowConfettiAnimation,
    setShowStarAnimation
  } = useAnimation();
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
  const [bKey, setBKey] = useState('');
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
          getJoinedOpportunities={getJoinedOpportunities}
          getAllOpportunities={getAllOpportunities}
        />,
    },
    {
      name: 'Created',
      component:
        <OpportunitiesList
          aria-label='Opportunities Tab Created'
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
    name: '',
    isNewOpp : true,
    locationType: 'in-person',
    location: {
      'address': '',
      'state': '',
      'city': '',
      'zip': '',
    },
    sponsortype: 'user sponsor',
    zoomLink: '',
    //organization: [],
    description: '',
    eventData: '',
    startdate: new Date(),
    enddate: new Date(),
    //organizationtype: '',
    //opportunitytype: '',
    starttime: new Date(),
    endtime: new Date(),
    subject: '',
    eventdata: '',
    eventBanner: 'https://www.places4students.com/P4SFiles/sliders/119_ucsc-02-main-entrance-sign.jpg',
    bannerKey: ''
    //keywords: [allKeywords],
  };

  const handleModalClose = () => {
    setShowOppForm(!showOppForm);
  };

  const onSubmit = async (data, isNewOpp) => {
    console.log(isNewOpp);
    console.log("Starting process...");
    const newOpportunity = {
      assignedRoles: {},
      //eventBanner: 'https://www.sorenkaplan.com/wp-content/uploads/2017/07/Testing.jpg',
      status: OpportunityStatus.PENDING,
      profilesJoined: [],
      //preferences: {},
      profileID: userProfile.id,
      Requests: {},
      ...data,
    };

    let toasterStr = '';
    const oldPoints = userProfile.points;
    const isLevelUp = calculateIfUserLeveledUp(oldPoints, 50);
    PointsAddition(50, userProfile.id, setUserProfile);
    if (isLevelUp) {
      // Display confetti animation
      setShowConfettiAnimation(true);
      toasterStr = 'and you leveled up!';
    } else {
      // Display star animation
      setShowStarAnimation(true);
      toasterStr = 'and you earned 50 points!';
    }

    if(data.imgData != null) {
      Storage.put(uuidv4() + "-" + data.imgData.name, data.imgData, {
        contentType: data.imgData.type,
      })
      .then((res) => {
        //setBKey(res.key);
        //console.log(bKey);
        Storage.get(res.key, {
          level: 'public'
        })
        .then((res2) => {
          console.log("Object created...");
          console.log(newOpportunity);
              DataStore.save(
                new Opportunity({
                "zoomLink": newOpportunity.zoomLink,
                "organizations": [newOpportunity.organization],
                "description": newOpportunity.description,
                "eventBanner":  res2,
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
                "status": newOpportunity.status,
                "bannerKey" : res.key
              })
            )
            .then((res) => {
              console.log(res);
              console.log("Saved...");
                toast.success(`Opportunity Created ${toasterStr}`, {
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
                  for (let i = 0; i < newOpportunity.roles.length; i++) {
                    const newRole = {
                      opportunityID: res.id,
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
                    DataStore.save(
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
                    )
                    .then((third) => {
                      console.log("Making new role...");
                      console.log(third);
                    })
                }
              console.log("Creating...");
            })
            .then(() => {
              getCreatedOpportunities();
            })
        })
        })
    }
    else {
      Storage.get('sc.jpg', {
        level: 'public'
      })
      .then((res) => {
        console.log("Object created...");
        console.log(newOpportunity);
            DataStore.save(
              new Opportunity({
              "zoomLink": newOpportunity.zoomLink,
              "organizations": [newOpportunity.organization],
              "description": newOpportunity.description,
              "eventBanner":  res,
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
              "status": newOpportunity.status,
              "bannerKey" : 'sc.jpg'
            })
          )
          .then((res) => {
            console.log(res);
            console.log("Saved...");
              toast.success(`Opportunity Created ${toasterStr}`, {
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
                for (let i = 0; i < newOpportunity.roles.length; i++) {
                  const newRole = {
                    opportunityID: res.id,
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
                  DataStore.save(
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
                  )
                  .then((third) => {
                    console.log("Making new role...");
                    console.log(third);
                  })
              }
            console.log("Creating...");
          })
          .then(() => {
            getCreatedOpportunities();
          })
      })
    }
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