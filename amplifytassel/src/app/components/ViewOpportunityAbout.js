import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiPaper from '@mui/material/Paper';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ThemedButton from './ThemedButton';
import RequestModal from './RequestOpportunityModal';
import useAuth from '../util/AuthContext';
import {toast} from 'react-toastify';
import Chip from '@mui/material/Chip';
import { DataStore } from '@aws-amplify/datastore';
import { Major, Request, Profile } from '../../models';
import useAnimation from '../util/AnimationContext';
import { calculateIfUserLeveledUp } from '../util/PointsAddition';
import { PointsAddition } from '../util/PointsAddition';

/**
 * About tab for view opportunity
 * @return {JSX}
 */
export default function ViewOpportunityAbout({
  isCreator,
  description,
  roles,
  opportunityName,
  creator,
  opportunityid,
  tags,
}) {
  return (
    <>
      <DescriptionCard description={description} />
      <RolesCard
        isCreator={isCreator}
        roles={roles}
        opportunityName={opportunityName}
        creator={creator}
        opportunityid={opportunityid}
      />
      <TagsCard
        tags={tags}
      />
    </>
  );
};

// COMPONENTS FOR ABOUT PAGE DESCRIPTION SECTION -------------------------------

const Description = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1em',
  padding: '1.5em 2em 1.5em 2em',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

/**
 * Opportunity details card
 * @return {JSX}
 */
function DescriptionCard({description}) {
  return (
    <Description>
      <h4 className='text-dark' style={{paddingBottom: '1.5em'}}>
        Description
      </h4>
      <p aria-label='View Opportunity Description'>{description}</p>
    </Description>
  );
}

const TagsPaper = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'block',
  flexDirection: 'column',
  marginTop: '1em',
  padding: '1.5em 2em 1.5em 2em',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

/**
 * Opportunity tags card
 * @return {JSX}
 */
function TagsCard({tags}) {
  // convert tags to an array
  const tagsArr = [...tags];
  return (
    <TagsPaper aria-label='View Opportunity Keywords'>
      <h4 className='text-dark' style={{paddingBottom: '1.5em'}}>
        Tags
      </h4>
      {tagsArr && tagsArr.map((tag, index) => (
        <Chip
          label={tag.name}
          key={`role${index}`}
          id={index.toString()}
          sx={{
            padding: '5px',
            margin: '2px',
          }}
        />
      ))}
    </TagsPaper>
  );
}

// COMPONENTS FOR ABOUT PAGE ROLES SECTION -------------------------------------

const Roles = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1em',
  height: 'auto',
  width: '100%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  'paddingInline': '2em',
  'borderBlock': `0.5px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:last-child': {
    borderBottom: 0.,
    borderRadius: '0 0 10px 10px',
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}} />}
    {...props}
  />
))(() => ({
  'backgroundColor': 'white',
  'paddingInline': 0,
  'paddingBlock': '0.5em',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  paddingInline: theme.spacing(0),
}));

/**
 * Opportunity roles card
 * @return {JSX}
 */
function RolesCard({
  isCreator,
  roles,
  opportunityName,
  opportunityid,
  creator,
}) {
  const [expanded, setExpanded] = React.useState(null);
  const [majors, setMajors] = React.useState([]);

  const {userProfile, setUserProfile} = useAuth();
  const [showReqForm, setshowReqForm] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState('');
  const [requestedRole, setRequestedRole] = React.useState(null);

  const {
    setShowConfettiAnimation,
    setShowStarAnimation
  } = useAnimation();

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
      opportunityid: opportunityid,
      role: requestedRole,
    };
    postRequestToOpportunity(requestData);
    setshowReqForm(false);
    setRequestMessage('');
  };

  const postRequestToOpportunity = async (requestData) => {
    // Check if the profile already sent a request to this opportunity
    const requests = await DataStore.query(Request, (r) => r.and(r => [
      r.profileID.eq(requestData.requester),
      r.opportunityID.eq(requestData.opportunityid)
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
          roleID: requestData.role.id,
          profileID: requestData.requester,
        })
      );
      // toast notification
      toast.success(`Applied to ${opportunityName} ${toasterStr}`, {
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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getTag = (tagid) => {
    const tag = majors.filter((major) => major.majorid === tagid);
    if (tag.length === 0) return 'none';
    return tag[0].majorname;
  };

  const getMajors = async () => {
    let temp = await DataStore.query(Major);
    setMajors([...temp]);
    /*
    fetch(`/api/getMajors`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setMajors(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity majors');
        });
    */
  };

  useEffect(() => {
    getMajors();
  }, []);

  return (
    <Roles>
      <h4 className='text-dark' style={{padding: '1.5em 2em 1.5em 2em'}}>
        Roles
      </h4>
      <Box aria-label='View Opportunity Roles'>
        {
          roles && roles.map((role, index) => (
            <Accordion
              key={`panel${index}`}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                id={`panel${index}d-header`}
                aria-controls={`panel${index}d-content`}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    justifyContent: 'space-between',
                    marginRight: '2em',
                  },
                }}
              >
                <Box className='flex-vertical flex-justify-center'>
                  <p className='text-bold text-blue'>
                    {`${role.name}`}
                  </p>
                  <p className='text-xsmall text-gray'>
                    {getTag(role.tagid)}
                  </p>
                </Box>
                {
                  !isCreator &&
                  <ThemedButton
                    aria-label={`Request ${role.name}`}
                    variant='themed'
                    color='yellow'
                    size='small'
                    onClick={(e) => {
                      handleModalOpen(role);
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    Request Role
                  </ThemedButton>
                }
              </AccordionSummary>
              <AccordionDetails
                className='flex-vertical flex-flow-large flow-small'
              >
                { role.description ?
                  <div className='flex-vertical'>
                    <p className='text-bold'>Responsibilites</p>
                    <p className='text-xsmall text-gray'>
                      {role.description}
                    </p>
                  </div> : ''
                }
                { role.qualifications ?
                  <div className='flex-vertical'>
                    <p className='text-bold'>
                      Preferred Qualifications
                    </p>
                    <ul style={{padding: 0, margin: 0}}>
                      {role.qualifications ?
                        role.qualifications.map((qualification, index) => (
                          <p
                            className='text-xsmall text-gray'
                            key={`qualification-${index}`}
                          >
                            {`· ${qualification}`}
                          </p>
                        )) : (
                          <p className='text-xsmall text-gray'>None</p>
                        )
                      }
                    </ul>
                  </div> : ''
                }
              </AccordionDetails>
            </Accordion>
          ))
        }
      </Box>
      <RequestModal
        showReqForm={showReqForm}
        handleModalClose={handleModalClose}
        requestMessage={requestMessage}
        handleRequestMessage={handleRequestMessage}
        handleRequestClick={handleRequestClick}
        opportunityName={opportunityName}
      />
    </Roles>
  );
}
