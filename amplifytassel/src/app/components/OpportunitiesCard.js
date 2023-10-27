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
import { PointsAddition } from '../util/PointsAddition';
import { DataStore } from 'aws-amplify';
import { Opportunity, Profile, Request, Role, RequestStatus, ProfileRole, OpportunityProfile, Keyword, KeywordOpportunity } from '../../models';
import { Storage } from 'aws-amplify';
import useAnimation from '../util/AnimationContext';
import { calculateIfUserLeveledUp } from '../util/PointsAddition';
import { v4 as uuidv4 } from 'uuid';


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
  getAllOpportunities,
  getJoinedOpportunities}, props) => (
  <ButtonBase
    component='div'
    onMouseDown={(e) => {
      e.stopPropagation();
    }}
    onClick={onClick ? onClick : async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (type === 'pending') {
        // A user can only have 1 request to an opportunity at a time
        // So we can assume the fetched request will be the pending one
        DataStore.query(Request, (r) => r.and(r => [
          r.status.eq('PENDING'),
          r.profileID.eq(profileid),
          r.opportunityID.eq(opportunityid),
        ]))
        .then((res) => {
          // delete the request
          DataStore.delete(res[0]);
        })
        .then(() => {
          getPendingOpportunities();
          getAllOpportunities();
        })
        .catch((err) => {
          console.log(err);
          alert('Error deleting the pending request');
        });
      } else if (type === 'upcoming') {
        console.log("upcoming delete button is clicked");
        // A user can only have 1 request to an opportunity at a time
        // So we can assume the fetched request will be the pending one
        const req = await DataStore.query(Request, (r) => r.and(r => [
          r.status.eq('APPROVED'),
          r.profileID.eq(profileid),
          r.opportunityID.eq(opportunityid),
        ]))
        .then(async (request) => {
          // fetch and delete the profile from the role
          const profRole = await DataStore.query(ProfileRole, (p) => p.and(p => [
            p.roleId.eq(request[0].roleID),
            p.profileId.eq(request[0].profileID)
          ]));
          await DataStore.delete(profRole[0]);

          // delete the profile from the opportunity
          const oppProf = await DataStore.query(OpportunityProfile, (o) => o.and(o => [
          o.opportunityId.eq(request[0].opportunityID),
          o.profileId.eq(request[0].profileID)
          ]));
          await DataStore.delete(oppProf[0]);

          // delete the request
          DataStore.delete(request[0]);
        })
        .then(() => {
          getJoinedOpportunities();
          getAllOpportunities();
        })
        .catch((err) => {
          console.log(err);
          alert('Error deleting the upcoming opportunity');
        });
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

const imageMimeType = /image\/(png|jpg|jpeg)/i;

/**
 * @return {JSX}
 */
export default function OpportunitiesCard({
  type,
  opportunity,
  getPendingOpportunities,
  getCreatedOpportunities,
  getJoinedOpportunities,
  getAllOpportunities,
}) {
  const [creator, setCreator] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [banner, setBanner] = useState(null);
  const [bKey, setBKey] = useState(null);
  const [showReqForm, setshowReqForm] = useState(false);
  const [showOppForm, setShowOppForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [requestMessage, setRequestMessage] = React.useState('');
  const [oppRoles, setOppRoles] = useState(false);
  const [oppKeywords, setOppKeywords] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const {userProfile, setUserProfile} = useAuth();

  const {
    setShowConfettiAnimation,
    setShowStarAnimation
  } = useAnimation();

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

  const downloadProfilePicture = async () => {
    if (creator.picture !== null) {
      const file = await Storage.get(creator.picture, {
        level: "public"
      });
      setProfilePicture(file);
    } else {
      setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };

  const downloadFile = async () => {
    //console.log(opportunity.bannerKey);
    const img = await Storage.get(opportunity.bannerKey, {
      level: "public"
    });
    setFileDataURL(img);
  }

  const extractRoles = () => {
    const p = Promise.resolve(opportunity.Roles.values);
    const roleNames = [];
    p.then(value => {
      for (let i = 0; i < value.length; i++) {
        const k =  Promise.resolve(value[i]);
        k.then(value => {
          roleNames.push(value);
        });
      }
    });
    setOppRoles(roleNames);
  };

  const extractKeywords = () => {
    const p = Promise.resolve(opportunity.keywords.values);
    const keywords = [];
    p.then(value => {
      for (let i = 0; i < value.length; i++) {
        const k =  Promise.resolve(value[i].keyword);
        k.then(value => {
          keywords.push(value.name);
        });
      }
    });
    setOppKeywords(keywords);
  };

  const handleRequestClick = (e) => {
    // Send request here
    // For consistency in the db, instead of null
    // role will be empty string
    const requestData = {
      requestee: creator.id,
      requester: userProfile.id,
      requestmessage: requestMessage,
      opportunityid: opportunity.id,
      role: '',
      toevent: true,
    };
    console.log(requestData);
    postRequestToOpportunity(requestData);
    setshowReqForm(false);
    setRequestMessage('');
    extractRoles();
  };

  const handleEditOpp = async (data) => {

    if (oppRoles.length > data.roles.length) {
      for (let i = 1; i < data.roles.length; i++) {
        if (oppRoles[i] === data.roles[i]) {
          //keep
        } else {
          DataStore.delete(Role, (r) => r.and(r => [
            r.name.eq(oppRoles[i].name),
            r.opportunityID.eq(opportunity.id)
            ]));
          DataStore.save(
            new Role({
              name: data.roles[i],
              opportunityID: opportunity.id,
            })
          );
        }
      }
      for (let i = data.roles.length; i < oppRoles.length; i++) {
        DataStore.delete(Role, (r) => r.and(r => [
          r.name.eq(oppRoles[i].name),
          r.opportunityID.eq(opportunity.id)
          ]));
      }

    } else if (oppRoles.length < data.roles.length) {
      console.log('data.roles.length is longer...');
      for (let i = 1; i < oppRoles.length; i++) {
        if (oppRoles[i] === data.roles[i]) {
          //keep
        } else {
          DataStore.delete(Role, (r) => r.and(r => [
            r.name.eq(oppRoles[i].name),
            r.opportunityID.eq(opportunity.id)
            ]));
          DataStore.save(
            new Role({
              name: data.roles[i],
              opportunityID: opportunity.id,
            })
          );
        }
      }
      for (let i = oppRoles.length; i < data.roles.length; i++) {
        DataStore.save(
          new Role({
            name: data.roles[i],
            opportunityID: opportunity.id,
          })
        );
      }

    } else {
      console.log('same length...');
      for (let i = 1; i < oppRoles.length; i++) {
        if (oppRoles[i] === data.roles[i]) {
          //keep
        } else {
          DataStore.delete(Role, (r) => r.and(r => [
            r.name.eq(oppRoles[i].name),
            r.opportunityID.eq(opportunity.id)
            ]));
          DataStore.save(
            new Role({
              name: data.roles[i],
              opportunityID: opportunity.id,
            })
          );
        }
      }
    }

    let allKeywords = [];
    const keywordsToUpdate = [];
    DataStore.query(Keyword)
    .then((res) => {
      allKeywords = res;
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < Object.keys(data.keywords).length; j++) {
          if (data.keywords[`keyword${j}`] === res[i].name) {
            keywordsToUpdate.push(res[i]);
          }
        }
      }
    })
    .then((res) => {
      if (keywordsToUpdate.length > oppKeywords.length) {
        console.log('Need to add keyword relation');
        DataStore.query(KeywordOpportunity)
        .then((res) => {
          let relationshipExists = false;
          for (let j = 0; j < keywordsToUpdate.length; j++) {
            for (let i = 0; i < res.length; i++) {
              if (res[i].keywordId === keywordsToUpdate[j].id && res[i].opportunityId === opportunity.id) {
                relationshipExists = true;
              }
            }
            if (relationshipExists === false) {
              DataStore.save(
                new KeywordOpportunity({
                  keywordId: keywordsToUpdate[j].id,
                  opportunityId: opportunity.id,
                })
              );
            }
            relationshipExists = false;
          }
        })
      } else if (keywordsToUpdate.length < oppKeywords.length) {
        console.log('Need to delete keyword relation');
        let needToRemove = true;
        for (let i = 0; i < oppKeywords.length; i++) {
          for (let j = 0; j < keywordsToUpdate.length; j++) {
            if (oppKeywords[i] === keywordsToUpdate[j].name) {
              needToRemove = false;
            }
          }
          if (needToRemove === true) {
            let idToRemove = '';
            for (let n = 0; n < allKeywords.length; n++) {
              if (allKeywords[n].name === oppKeywords[i]) {
                idToRemove = allKeywords[n].id;
              }
            }
            DataStore.delete(KeywordOpportunity, (k) => k.and(k => [
              k.keywordId.eq(idToRemove),
              k.opportunityId.eq(opportunity.id)
              ]));
          }
          needToRemove = true;
        }
      } else {
        console.log('No action needed on keyword relations');
      }
    })
    .then(async (res) => {
      if (data.imgData == null) {
        const image = await Storage.get(opportunity.bannerkey, {
          level: 'public'
        });
        DataStore.save(Opportunity.copyOf(opportunity, updated => {
          updated.eventName = data.name;
          updated.description = data.description;
          updated.eventData = data.eventdata;
          updated.startTime = data.startTime.toISOString();
          updated.endTime = data.endTime.toISOString();
          updated.locationType = data.locationType;
          updated.location = data.location;
          updated.organizations = data.organizations;
          updated.subject = data.subject;
          updated.bannerKey = opportunity.bannerKey;
          updated.eventBanner = image;
        })
        )
        .then((res) => {
          handleOppModalClose();
          getCreatedOpportunities();
          console.log(res);
        });
      } 
      else {
        if(data.imgData.name != 'sc.jpg') {
          Storage.put(uuidv4() + "-" + data.imgData.name, data.imgData, {
            contentType: data.imgData.type,
          })
          .then(async (res2) => {
            const image = await Storage.get(res2.key, {
              level: 'public'
            });
            if(opportunity.bannerKey != 'sc.jpg') {
              await Storage.remove(opportunity.bannerKey);
            }
            //console.log(data.bannerKey);
            DataStore.save(Opportunity.copyOf(opportunity, updated => {
              updated.eventName = data.name;
              updated.description = data.description;
              updated.eventData = data.eventdata;
              updated.startTime = data.startTime.toISOString();
              updated.endTime = data.endTime.toISOString();
              updated.locationType = data.locationType;
              updated.location = data.location;
              updated.organizations = data.organizations;
              updated.subject = data.subject;
              updated.bannerKey = res2.key;
              updated.eventBanner = image;
            })
            )
            .then((res) => {
              handleOppModalClose();
              getCreatedOpportunities();
              console.log(res);
            });
          })
        }
        else {
          const image = await Storage.get(opportunity.bannerkey, {
            level: 'public'
          });
          DataStore.save(Opportunity.copyOf(opportunity, updated => {
            updated.eventName = data.name;
            updated.description = data.description;
            updated.eventData = data.eventdata;
            updated.startTime = data.startTime.toISOString();
            updated.endTime = data.endTime.toISOString();
            updated.locationType = data.locationType;
            updated.location = data.location;
            updated.organizations = data.organizations;
            updated.subject = data.subject;
            updated.bannerKey = opportunity.bannerKey;
            updated.eventBanner = image;
          })
          )
          .then((res) => {
            handleOppModalClose();
            getCreatedOpportunities();
            console.log(res);
          });
        }
      }
    });
  };

  const handleDeleteOpp = async (opportunity) => {
        const modelToDelete = await DataStore.query(Opportunity, opportunity.id);
        DataStore.delete(modelToDelete);
        if (getCreatedOpportunities) {
          getCreatedOpportunities();
          handleDeleteModalClose();
        }
  };

  const postRequestToOpportunity = (requestData) => {
    DataStore.query(Role, (r) => r.and(r => [
      r.name.eq(requestData.role),
      r.opportunityID.eq(requestData.opportunityid)
    ]))
    .then((res) => {
      DataStore.query(Request, (r) => r.and(r => [
        r.roleID.eq(res.id),
        r.opportunityID.eq(requestData.opportunityid),
        r.profileID.eq(requestData.requester)
       ]))
       .then((json) => {
        if (json.length == 0) {
          let toasterStr = '';
          const oldPoints = userProfile.points;
          const isLevelUp = calculateIfUserLeveledUp(oldPoints, 25);
          if (isLevelUp) {
            // Display confetti animation
            setShowConfettiAnimation(true);
            toasterStr = 'and you leveled up!';
          } else {
            // Display star animation
            setShowStarAnimation(true);
            toasterStr = 'and you earned 25 points!';
          }
          PointsAddition(25, userProfile.id, setUserProfile);
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

          let rid;
          for (let i = 0; i < oppRoles.length; i++)
          {
            if(oppRoles[i].name == 'General Participant')
            {
              rid = oppRoles[i].id;
              break;
            }
          }
          DataStore.save(
              new Request({
              "status": RequestStatus.PENDING,
              "responseMessage": " ",
              "requestTime": new Date().toISOString(),
              "responseTime": new Date().toISOString(),
              "requestMessage": requestData.requestmessage,
              "roleID": rid,
              "opportunityID": requestData.opportunityid,
              "profileID": requestData.requester
            })
          )
          .then((third) => {
            getPendingOpportunities();
            getAllOpportunities();
          })
        }
        else {
          console.log("You have already applied to this opportunity.");
        }
       })
    })
};

  const formatDate = (time) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const convertDate = new Date(time).toLocaleDateString([], dateOptions);
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
    DataStore.query(Profile, opportunity.profileID)
    .then((res) => {
      setCreator(res);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving opportunity creators profile');
    });
  };

  //const bannerImage = await Storage.get(opportunity.bannerKey, {
    //level: 'public'
  //});

  const editOppFormValues = {
    oppId : opportunity.id,
    starttime: new Date(opportunity.startTime),
    startdate: new Date(opportunity.startTime),
    endtime: new Date(opportunity.endTime),
    enddate: new Date(opportunity.endTime),
    //organization: [],
    zoomLink : opportunity.zoomLink,
    organizations : opportunity.organizations,
    description : opportunity.description,
    //eventBanner : opportunity.eventBanner,
    name : opportunity.eventName,
    startTime : opportunity.startTime,
    endTime : opportunity.endTime,
    locationType : opportunity.locationType,
    location : opportunity.location,
    eventdata : opportunity.eventData,
    subject : opportunity.subject,
    preferences : opportunity.preferences,
    profileID : opportunity.profileID,
    status : opportunity.status,
    Roles : oppRoles,
    keywords : oppKeywords,
    bannerKey: opportunity.bannerKey

  };

  
  useEffect(() => {
    getOpportunityCreator(opportunity);
    extractRoles(opportunity);
    extractKeywords(opportunity);
  }, [opportunity]);

  useEffect(() => {
    if (creator) {
      downloadProfilePicture();
    }
    downloadFile();
  }, [creator]);

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
                <h4 className='text-dark ellipsis' aria-label={`Opportunity Card Title ${opportunity.eventName}`}>
                  {opportunity.eventName}
                </h4>
                <div className='flex-flow-large flex-align-center'>
                  <Avatar image={profilePicture} />
                  <p className='text-bold text-disabled'>
                    Hosted by:&nbsp;
                    <span className='text-blue' aria-label={`Opportunity Card Host ${opportunity.eventName}`}>
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
                    getJoinedOpportunities={getJoinedOpportunities}
                    onClick={ type === 'created' ?
                      handleDeleteModalOpen : null
                    }
                  >
                    <CloseRoundedIcon
                      aria-label={`Delete ${opportunity.eventName}`}
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
                          aria-label={'Delete Opp'}
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
                      data-test-id={`Edit Opportunity Form ${opportunity.id}`}
                      sx={{
                        height: '20px',
                        width: '20px',
                        color: 'var(--tertiary-gray-main)',
                      }}
                    />
                  </OutlinedIconButton>
                  {/* EDIT OPP FORM */}
                  <Modal
                    aria-label={'Opportunity Form'}
                    open={showOppForm}
                    onBackdropClick={() => setShowOppForm(false)}
                    onClose={() => setShowOppForm(false)}
                    sx={{overflow: 'scroll'}}
                  >
                    <OpportunityForm
                      onClose={handleOppModalClose}
                      defaultValues={editOppFormValues}
                      onSubmit={handleEditOpp}
                    />
                  </Modal>
                </Box>
              )}
              {type === 'all' && (
                <OutlinedButton handleModalOpen={handleReqModalOpen}>
                  <p className='text-xbold text-white' aria-label={`Apply ${opportunity.eventName}`}>Apply</p>
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
              <Banner image={fileDataURL} />
              <div className='flex-vertical'>
                <div
                  className='flex-horizontal flex-flow-large flex-align-center'
                  style={{paddingInline: '2em'}}
                >
                  <EventNoteRoundedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {formatDate(opportunity.startTime)
                    }
                  </p>
                  <ArrowForwardRoundedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {formatDate(opportunity.endTime)
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