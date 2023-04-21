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
import { Major } from '../../models';

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
      <p>{description}</p>
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
    <TagsPaper>
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

  const {userProfile} = useAuth();
  const [showReqForm, setshowReqForm] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState('');
  const [requestedRole, setRequestedRole] = React.useState('');

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
      requestee: creator.profileid,
      requester: userProfile.profileid,
      requestmessage: requestMessage,
      opportunityid: opportunityid,
      role: requestedRole,
      toevent: true,
    };
    postRequestToOpportunity(requestData);
    setshowReqForm(false);
    setRequestMessage('');
  };

  const postRequestToOpportunity = (requestData) => {
    console.log('request clicked');
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
            toast.success(`Applied to ${opportunityName}`, {
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
    console.log(temp);
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
      <Box>
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
                    variant='themed'
                    color='yellow'
                    size='small'
                    onClick={(e) => {
                      handleModalOpen(role.name);
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
