import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import {toast} from 'react-toastify';
import AccessibilityRoundedIcon from '@mui/icons-material/AccessibilityRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {Modal} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import useAuth from '../util/AuthContext';
import RequestModal from './RequestOpportunityModal';
import OpportunityForm from './OpportunityForm';
import ThemedButton from './ThemedButton';

import { DataStore } from '@aws-amplify/datastore';
import { Opportunity, Profile, Request, Role, RequestStatus } from '../../models';


const IconStyling = {
  fontSize: '0.9rem',
};

const Card = styled((props) => (
  <MuiCard elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '100%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Avatar = ({image}, props) => (
  <MuiAvatar
    {...props}
    src={image}
    sx={{
      height: '25px',
      width: '25px',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
    }}
  />
);

const Banner = ({image}, props) => {
  return (
    <MuiBox sx={{height: '130px', width: '130px'}} {...props}>
      <img
        src={image}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          border: '0.5px solid rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
        }}
      />
    </MuiBox>
  );
};

const OutlinedIconButton = ({
  children,
  type,
  onClick,
  opportunityid,
  profileid,
  getPendingOpportunities,
  getAllOpportunities}, props) => (
  <ButtonBase
    component='div'
    onMouseDown={(e) => {
      e.stopPropagation();
    }}
    onClick={onClick ? onClick : async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (type === 'pending') {
        /*
        // fetch the request
        fetch(`/api/getPendingRequestsSent/${profileid}/${opportunityid}`)
            .then((res) => {
              if (!res.ok) {
                throw res;
              }
              return res.json();
            })
            .then((json) => {
              fetch(`/api/deleteRequest/`, {
                method: 'DELETE',
                body: JSON.stringify({requestId: json[0].requestid}),
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                  .then(() => {
                    getPendingOpportunities();
                    getAllOpportunities();
                  });
            })
            .catch((err) => {
              console.log(err);
              alert('Error deleting request');
            });
        */
       const opp = await DataStore.query(Opportunity, opportunityid);
       const prof = await DataStore.query(Profile, profileid);
       const req = await DataStore.query(Request, (r) => r.and(r => [
        r.status.eq('PENDING'),
        r.opportunityID.eq(opp.id),
        r.profileID.eq(prof.id)
       ]))
       if(req !== undefined) {
        DataStore.delete(req);
        getPendingOpportunities();
        getAllOpportunities();
       }
      }
    }}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
      width: '40px',
      padding: 0,
      background: 'transparent',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
      borderRadius: '5px',
    }}
    {...props}
  >
    {children}
  </ButtonBase>
);

const OutlinedButton = (props) => {
  const {handleModalOpen, ...rest} = props;
  return (
    <ButtonBase
      component='div'
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        handleModalOpen();
        e.stopPropagation();
        e.preventDefault();
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        width: '80px',
        padding: 0,
        background: 'var(--secondary-yellow-main)',
        border: '0.5px solid rgba(0, 0, 0, 0.15)',
        borderRadius: '5px',
      }}
      {...rest}
    >
      {props.children}
    </ButtonBase>
  );
};

/**
 * @return {JSX}
 */
export default function OpportunitiesCard({
  type,
  opportunity,
  getPendingOpportunities,
  getCreatedOpportunities,
  getAllOpportunities,
}) {
  const [creator, setCreator] = useState('');

  const [showReqForm, setshowReqForm] = useState(false);
  const [showOppForm, setShowOppForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [requestMessage, setRequestMessage] = React.useState('');
  const {userProfile} = useAuth();

  const handleReqModalClose = () => {
    setshowReqForm(false);
  };

  const handleReqModalOpen = () => {
    setshowReqForm(true);
  };

  const handleOppModalClose = () => {
    setShowOppForm(false);
  };

  const handleOppModalOpen = () => {
    setShowOppForm(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteForm(false);
  };

  const handleDeleteModalOpen = () => {
    setShowDeleteForm(true);
  };

  const handleRequestMessage = (e) => {
    setRequestMessage(e.target.value);
  };

  const handleRequestClick = (e) => {
    // Send request here
    // For consistency in the db, instead of null
    // role will be empty string
    const requestData = {
      requestee: creator.profileid,
      requester: userProfile.profileid,
      requestmessage: requestMessage,
      opportunityid: opportunity.eventid,
      role: '',
      toevent: true,
    };
    postRequestToOpportunity(requestData);
    setshowReqForm(false);
    setRequestMessage('');
  };

  const handleEditOpp = async (data) => {
    const editedOpportunity = {
      Roles: opportunity.Roles,
      eventBanner: opportunity.eventBanner,
      status: opportunity.status,
      profilesJoined: opportunity.profilesJoined,
      //preferences: {},
      profileID: opportunity.profileID,
      Requests: opportunity.Requests,
      ...data,
    };
    console.log("Object created...");
    console.log(editedOpportunity);
    /*
    fetch(`/api/updateOpportunity`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        })
        .then((json) => {
          toast.success('Opportunity Updated', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          handleOppModalClose();
          if (getCreatedOpportunities) {
            getCreatedOpportunities();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    */
        const original = await DataStore.query(Opportunity, opportunity.id);
  
        const updatedPost = await DataStore.save(
          Opportunity.copyOf(original, updated => {
            updated.zoomLink = editedOpportunity.zoomLink
            updated.organizations = editedOpportunity.organizations
            updated.description = editedOpportunity.description
            updated.eventBanner = editedOpportunity.eventBanner
            updated.eventName = editedOpportunity.eventName
            updated.startTime = editedOpportunity.startTime
            updated.endTime = editedOpportunity.endTime
            updated.locationType = editedOpportunity.locationType
            updated.location = editedOpportunity.location
            updated.eventData = editedOpportunity.eventData
            updated.subject = editedOpportunity.subject
            updated.preferences = editedOpportunity.preferences
            updated.profileID = editedOpportunity.profileID
            updated.status = editedOpportunity.status
            updated.Roles = editedOpportunity.Roles
            updated.Posts = editedOpportunity.Posts
            updated.Requests = editedOpportunity.Requests
            updated.profilesJoined = editedOpportunity.profilesJoined
            updated.keywords = editedOpportunity.keywords
            
          })
        );
        console.log(updatedPost);
        if (getCreatedOpportunities) {
          getCreatedOpportunities();
        }
  };

  const handleDeleteOpp = async (opportunity) => {
    /*
    fetch(`/api/deleteOpportunity/${opportunity.eventid}`, {
      method: 'DELETE',
      body: JSON.stringify(opportunity),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        })
        .then((json) => {
          toast.success('Opportunity Deleted', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          handleDeleteModalClose();
          if (getCreatedOpportunities) {
            getCreatedOpportunities();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    */
        const modelToDelete = await DataStore.query(Opportunity, opportunity.id);
        DataStore.delete(modelToDelete);
        if (getCreatedOpportunities) {
          getCreatedOpportunities();
        }
  };

  const postRequestToOpportunity = async (requestData) => {
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
            getPendingOpportunities();
            getAllOpportunities();
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
      const requestedRole = await DataStore.query(Role, (r) => r.and(r => [
        r.name.eq(requestData.role),
        r.opportunityID.eq(requestData.opportunityid)
       ]))
      const req = await DataStore.query(Request, (r) => r.and(r => [
        r.roleID.eq(requestedRole.id),
        r.opportunityID.eq(requestData.opportunityid),
        r.profileID.eq(requestData.requester)
       ]))
      if (req === undefined) {
        const newRequest = await DataStore.save(
            new Request({
            "status": RequestStatus.PENDING,
            "responseMessage": " ",
            "requestTime": new Date().toISOString(),
            "responseTime": new Date().toISOString(),
            "requestMessage": requestData.requestmessage,
            "opportunityID": requestData.opportunityid,
            "roleID": requestedRole.id,
            "profileID": requestData.requester
          })
        );
        console.log(newRequest);
        getPendingOpportunities();
        getAllOpportunities();
      }
      else {
        console.log("You have already applied to this opportunity.");
      }
  };

  const formatDate = (date, time) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const convertDate = new Date(date).toLocaleDateString([], dateOptions);
    const convertTime = new Date(time).toLocaleTimeString([], timeOptions);

    return `${convertDate} at ${convertTime}`;
  };

  const calculateDuration = (date1, date2) => {
    const convertDate1 = new Date(date1);
    const convertDate2 = new Date(date2);

    const compare = Math.abs(convertDate1 - convertDate2);

    if (compare == 0) {
      return 'No Duration';
    };

    const compareInMinutes = Math.floor(compare / (1000 * 60));
    const compareInHours = Math.floor(compare / (1000 * 60 * 60));
    const compareInDays = Math.floor(compare / (1000 * 60 * 60 * 24));

    const minutes = compareInMinutes && (!compareInHours && !compareInDays);
    const hours = compareInHours && (compareInMinutes && !compareInDays);
    const days = compareInDays && (compareInMinutes && compareInHours);

    if (minutes) return `${compareInMinutes} Minutes`;
    if (hours) return `${compareInHours} Hours`;
    if (days) return `${compareInDays} Days`;
    return 'Error calculating dates';
  };

  const getOpportunityCreator = async () => {
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
    
    DataStore.query(Profile, opportunity.profileID)
    .then((res) => {
      setCreator(res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving opportunity creators profile');
    });
    
    //const creatorCall = await DataStore.query(Profile, opportunity.profileID);
    //console.log(creatorCall);
  };

  
  useEffect(() => {
    getOpportunityCreator(opportunity);
  }, [opportunity]);

  return (
    <>
      {opportunity &&(
        <Card className='clickable'>
          <div
            className='flex-space-between flex-align-center'
            style={{padding: '1.5em'}}
          >
            <CardActionArea
              component={RouterLink}
              to={`/Opportunity/${opportunity.id}`}
            >
              <MuiBox>
                <h4 className='text-dark ellipsis'>
                  {opportunity.eventName}
                </h4>
                <div className='flex-flow-large flex-align-center'>
                  <Avatar image={creator.picture} />
                  <p className='text-bold text-disabled'>
                    Hosted by:&nbsp;
                    <span className='text-blue'>
                      {`${creator.firstName} ${creator.lastName}`}
                    </span>
                  </p>
                </div>
              </MuiBox>
            </CardActionArea>
            <div className='flex-flow-large' style={{marginLeft: '50px'}}>
              {(
                type === 'upcoming' ||
                type === 'created' ||
                type === 'pending'
              ) && (
                <Box>
                  <OutlinedIconButton
                    type={type}
                    opportunityid={opportunity.id}
                    profileid={userProfile.id}
                    getPendingOpportunities={getPendingOpportunities}
                    getAllOpportunities={getAllOpportunities}
                    onClick={ type === 'created' ?
                      handleDeleteModalOpen : null
                    }
                  >
                    <CloseRoundedIcon
                      sx={{
                        height: '20px',
                        width: '20px',
                        color: 'var(--error-red-main)',
                        stroke: 'var(--error-red-main)',
                        strokeWidth: '2px',
                      }}
                    />
                  </OutlinedIconButton>
                  {/* DELETE OPP MODAL */}
                  <Modal
                    open={showDeleteForm}
                    onBackdropClick={handleDeleteModalClose}
                    onClose={handleDeleteModalClose}
                    sx={{
                      overflow: 'scroll',
                      display: 'grid',
                      justifyContent: 'center',
                    }}
                  >
                    <Paper
                      sx={{
                        backgroundColor: 'rgb(240, 240, 240)',
                        zIndex: '10',
                        boxShadow: '-3px 5px 8px 0px rgba(84, 84, 84, 0.81)',
                        borderRadius: '10px',
                        margin: '3rem',
                        padding: '2rem',
                        display: 'grid',
                        gridGap: '5px',
                        justifyContent: 'center',
                        height: 'fit-content',
                      }}
                    >
                      <Box>
                        Are you sure you would like to
                        delete {opportunity.eventName}?
                      </Box>
                      <Box
                        sx={{
                          display: 'grid',
                          gridAutoFlow: 'column',
                          gridGap: '10px',
                        }}
                      >
                        <ThemedButton
                          color={'blue'}
                          variant={'themed'}
                          onClick={handleDeleteModalClose}
                          sx={{
                            height: 'fit-content',
                          }}
                        >
                          Back
                        </ThemedButton>
                        <ThemedButton
                          color={'gray'}
                          variant={'cancel'}
                          onClick={() => handleDeleteOpp(opportunity)}
                          sx={{
                            height: 'fit-content',
                          }}
                        >
                          Delete
                        </ThemedButton>
                      </Box>
                    </Paper>
                  </Modal>
                </Box>
              )}
              {type === 'created' && (
                <Box>
                  <OutlinedIconButton
                    type={type}
                    onClick={handleOppModalOpen}
                  >
                    <EditRoundedIcon
                      sx={{
                        height: '20px',
                        width: '20px',
                        color: 'var(--tertiary-gray-main)',
                      }}
                    />
                  </OutlinedIconButton>
                  {/* EDIT OPP FORM */}
                  <Modal
                    open={showOppForm}
                    onBackdropClick={() => setShowOppForm(false)}
                    onClose={() => setShowOppForm(false)}
                    sx={{overflow: 'scroll'}}
                  >
                    <OpportunityForm
                      onClose={handleOppModalClose}
                      defaultValues={opportunity}
                      onSubmit={handleEditOpp}
                    />
                  </Modal>
                </Box>
              )}
              {type === 'all' && (
                <OutlinedButton handleModalOpen={handleReqModalOpen}>
                  <p className='text-xbold text-white'>Apply</p>
                </OutlinedButton>
              )}
            </div>
          </div>
          <CardActionArea
            component={RouterLink}
            to={`/Opportunity/${opportunity.id}`}
          >
            <Divider sx={{borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)'}} />
            <div
              className='flex-horizontal flex-align-center'
              style={{padding: '1.5em'}}
            >
              <Banner image={opportunity.eventBanner} />
              <div className='flex-vertical'>
                <div
                  className='flex-horizontal flex-flow-large flex-align-center'
                  style={{paddingInline: '2em'}}
                >
                  <EventNoteRoundedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {//formatDate(opportunity.startdate, opportunity.starttime)
                     opportunity.startTime
                    }
                  </p>
                  <ArrowForwardRoundedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {//formatDate(opportunity.enddate, opportunity.endtime)
                     opportunity.endTime
                    }
                  </p>
                </div>
                <div
                  className='flex-horizontal flex-flow-large flex-align-center'
                  style={{paddingInline: '2em', marginTop: '0.25em'}}
                >
                  <TimerOutlinedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {
                      calculateDuration(
                          opportunity.startTime, opportunity.endTime,
                      )
                    }
                  </p>
                </div>
                <div
                  className='flex-horizontal flex-flow-large flex-align-center'
                  style={{paddingInline: '2em', marginTop: '0.25em'}}
                >
                  <AccessibilityRoundedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {
                      opportunity.locationType// + opportunity.locationType.slice(1)
                          //.charAt(0).toUpperCase() +
                          //opportunity.locationType.slice(1)
                    }
                  </p>
                </div>
                {
                  opportunity.locationType && (
                    opportunity.locationType === 'in-person' ||
                    opportunity.locationType === 'hybrid'
                  ) &&
                  <div
                    className='
                      flex-horizontal
                      flex-flow-large
                      flex-align-center
                    '
                    style={{paddingInline: '2em', marginTop: '0.25em'}}
                  >
                    <FmdGoodOutlinedIcon sx={IconStyling} />
                    <p className='text-bold'>
                      {`
                        ${opportunity.location.address}
                        ${opportunity.location.city},
                        ${opportunity.location.state}
                        ${opportunity.location.zip}
                      `}
                    </p>
                  </div>
                }
                {
                  opportunity.locationType && (
                    opportunity.locationType === 'remote' ||
                    opportunity.locationType === 'hybrid'
                  ) &&
                  <div
                    className='
                      flex-horizontal
                      flex-flow-large
                      flex-align-center
                    '
                    style={{paddingInline: '2em', marginTop: '0.25em'}}
                  >
                    <DevicesOutlinedIcon sx={IconStyling} />
                    <p className='text-bold'>
                      {opportunity.zoomLink}
                    </p>
                  </div>
                }
              </div>
            </div>
          </CardActionArea>
          <RequestModal
            showReqForm={showReqForm}
            handleModalClose={handleReqModalClose}
            requestMessage={requestMessage}
            handleRequestMessage={handleRequestMessage}
            handleRequestClick={handleRequestClick}
            opportunityName={opportunity.eventname}
          />
        </Card>
      )}
    </>
  );
}