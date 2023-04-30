import React, {useEffect, useState} from 'react';
import {Modal, Box} from '@mui/material';
import {styled} from '@mui/material';
import MuiBox from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {toast} from 'react-toastify';
import useAuth from '../util/AuthContext';
import ThemedInput from '../components/ThemedInput';
import ThemedButton from '../components/ThemedButton';
import {InputContext} from '../components/ThemedInput';
import {Link} from 'react-router-dom';
import WorkExperienceList from '../components/WorkExperienceList';
import ThemedDropdown from '../components/ThemedDropdown';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonBase from '@mui/material/ButtonBase';
import WorkExperienceForm from '../components/WorkExperienceForm';
import WorkExperienceDeleteModal from '../components/WorkExperienceDeleteModal';
import VolunteerExperienceForm from '../components/VolunteerExperienceForm';
import VolunteerExperienceDeleteModal from
  '../components/VolunteerExperienceDeleteModal';
import VolunteerExperienceList from '../components/VolunteerExperienceList';

import { DataStore } from '@aws-amplify/datastore';
import { Keyword, KeywordProfile, Profile, Major } from '../../models';



const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1em',
  marginBlock: '1em',
  overflow: 'auto',
}));


const OutlinedIconButton = ({children}, props) => (
  <ButtonBase
    component='div'
    onMouseDown={(e) => {
      e.stopPropagation();
    }}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
    }}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
      width: '40px',
      padding: 0,
      background: 'transparent',
    }}
    {...props}
  >
    {children}
  </ButtonBase>
);


/**
 * updates Profile Calendar
 * @return {HTML} Update Profile component
 */
export default function UpdateProfile() {
  const {user, userProfile, setUserProfile} = useAuth();
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showDeleteVolunteerModal, setShowDeleteVolunteerModal] = useState(false);
  
  // const [displayOpps, setDisplayOpps] = useState([]);
  // const [search, setSearch] = useState('');
  // const [majors, setMajors] = useState([]);
  // const [selectedMajors, setSelectedMajors] = useState([]);
  // const [allMajors, setAllMajors] = useState([]);

  const [profileKeywords, setProfileKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);

  // // Fuzzy search on given searchData
  // // If the search bar is empty, the searchData is all the opps
  // const searchMajors = (query, searchData=allMajors) => {
  //   if (!query) {
  //     setDisplayOpps(searchData);
  //     return;
  //   }
  //   const fuse = new Fuse(searchData, {
  //     // more parameters can be added for search
  //     keys: ['eventname', 'description'],
  //     threshold: 0.3,
  //   });
  //   const result = fuse.search(query);
  //   const finalResult = [];
  //   if (result.length) {
  //     result.forEach((item) => {
  //       finalResult.push(item.item);
  //     });
  //     setDisplayOpps(finalResult);
  //   } else {
  //     setDisplayOpps([]);
  //   }
  // };

  const handleDeleteTag = (tagIndexToDelete) => () => {
    const tempSelectedTags = [...selectedKeywords];
    // add the to be deleted tag back to all tags
    const tempAllTags = [...allKeywords];
    tempAllTags.push(tempSelectedTags[tagIndexToDelete]);
    // delete the tag from the selected tags array
    tempSelectedTags.splice(tagIndexToDelete, 1);
    // update the arrays
    setSelectedKeywords(tempSelectedTags);
    setAllKeywords(tempAllTags);
  };

  const handleAddTag = (tagIndexToAdd) => () => {
    const tempAllTags = [...allKeywords];
    // add the tag to the selected tags array
    const tempSelectedTags = [...selectedKeywords];
    tempSelectedTags.push(tempAllTags[tagIndexToAdd]);

    // delete the to be added tag from all tags array
    tempAllTags.splice(tagIndexToAdd, 1);
    // update the arrays
    setSelectedKeywords(tempSelectedTags);
    setAllKeywords(tempAllTags);
  };

  if (userProfile.experience === null) {
    userProfile.experience = {};
  }
  if (userProfile.volunteerExperience === null) {
    userProfile.volunteerExperience = {};
  }

  // selectedTags, keywords, selectedMajors, majors
  const updateProfile = () => {
    // Update Keywords Relationship
    // Update Majors Relationship
    // Update Profile Fields
  };

  // const convertTagsToObject = (tags) => {
  //   const tagsObject = {};
  //   for (let i = 0; i < tags.length; i++) {
  //     tagsObject[`keyword${i}`] = tags[i];
  //   }
  //   return tagsObject;
  // };
  
  useEffect(() => {
    // get selectedKeywords, keywords, allKeywords
    DataStore.query(Keyword, (k) => k.Profiles.profile.id.eq(userProfile.id))
      .then((keywords) => {
        setProfileKeywords(keywords);
        setSelectedKeywords(keywords);
        DataStore.query(Keyword)
          .then((keywordsAll) => {
            setAllKeywords(keywordsAll);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const [values, setValues] = useState({
    1: {
      graduationYear: userProfile.graduationYear,
      majors: null, //FIXME
      location: userProfile.location,
      about: userProfile.about,
      keywords: selectedKeywords,
    },
  });
  
  // const updateLocalUserProfileData = () => {
  //   userProfile.graduationYear = values[1].graduationYear;
  //   // userProfile.majors = values[1].majors;
  //   userProfile.location = values[1].location;
  //   userProfile.about = values[1].about;
  // };

  const handleSubmit = (e) => {
    // const tagsToSubmit = convertTagsToObject(selectedKeywords);
    // userProfile.keywords = tagsToSubmit;
    // updateLocalUserProfileData();
    updateProfile();
  };

  return (
    <Page>
      <InputContext.Provider value={[values, setValues]}>
        <Box className='updatepage' width='100%' aria-label='Signup form'>
          <Box className='update-card-content'>
            <div className='flex-space-multi' style={
              { display: null }
            }>
              <div>
                <h2 className='text-normal'>Update Profile</h2>
                <p className='text-light text-warning'>
                  Required <span className='text-bold'>*</span>
                </p>
              </div>
              <div className='grid-flow-large' width='100%'>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    Graduation Year
                    <span className='text-bold text-warning'>*</span>
                  </p>
                  <ThemedInput
                    placeholder={'Enter your graduation year'}
                    type={'text'}
                    index={'graduationYear'}
                    step={1}
                    fill={'graduationYear'}
                    content={values[1].graduationYear === '' ?
                      null : values[1].graduationYear}
                  />
                </div>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    Major <span className='text-bold text-warning'>*</span>
                  </p>
                  {/* SEARCH MAJORS(UNFINISHED) */}
                  {/* <MuiBox className='flow-small' sx={{ flexGrow: 1 }}>
                    <div
                      className='flex-horizontal flex-space-between'
                      style={{ width: '100%', marginBottom: '1em' }}
                    >
                      <TextField
                        placeholder='Search'
                        size='small'
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                          style: {
                            fontSize: '0.9rem',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                          },
                          startAdornment: (
                            <InputAdornment position='start'>
                              <SearchRoundedIcon color='tertiary' />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          'width': 'auto',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.15)',
                            },
                          },
                        }}
                      />
                      <ThemedDropdown
                        menuItems={['Recommended', 'Alphabet', 'Major']}
                        sortSelection={handleDropdown}
                      />
                    </div>
                    {displayOpps.map((opportunity, index) => (
                      <OpportunitiesCard
                        key={`opportunity-${index}`}
                        type={type}
                        opportunity={opportunity}
                        getPendingOpportunities={getPendingOpportunities}
                        getCreatedOpportunities={getCreatedOpportunities}
                        getAllOpportunities={getAllOpportunities}
                      />
                    ))}
                  </MuiBox> */}
                </div>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    Location
                  </p>
                  <ThemedInput
                    placeholder={'Let people know where you are'}
                    type={'text'}
                    index={'location'}
                    step={1}
                    fill={'location'}
                    content={values[1].location === '' ?
                      null : values[1].location}
                  />
                </div>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    About You
                  </p>
                  <ThemedInput
                    placeholder={'Tell people a little about yourself'}
                    type={'text'}
                    index={'about'}
                    step={1}
                    fill={'about'}
                    content={values[1].about === '' ?
                      null : values[1].about}
                  />
                </div>
                <div className='grid-flow-small'>
                  <div
                    className='flex-space-between flex-align-center'
                    style={{ background: 'var(--background-primary)' }}
                  >
                    <p className='text-bold'>
                      Work Experience
                    </p>
                    <div className='flex-space-between flex-align-center'>
                      {(
                        <OutlinedIconButton>
                          <RemoveIcon
                            sx={{
                              height: '20px',
                              width: '20px',
                              color: 'var(--text-gray)',
                              stroke: 'var(--text-gray)',
                              strokeWidth: '2px',
                            }}
                            onClick={() => setShowDeleteModal(true)}
                          />
                        </OutlinedIconButton>
                      )}
                      {(
                        <OutlinedIconButton>
                          <AddIcon
                            sx={{
                              height: '20px',
                              width: '20px',
                              color: 'var(--text-gray)',
                              stroke: 'var(--text-gray)',
                              strokeWidth: '2px',
                            }}
                            onClick={() => setShowWorkForm(true)}
                          />
                        </OutlinedIconButton>
                      )}
                    </div>
                  </div>
                  <WorkExperienceList
                    workExperience={userProfile.experience} />
                </div>
                <div className='grid-flow-small'>
                  <div
                    className='flex-space-between flex-align-center'
                    style={{ background: 'var(--background-primary)' }}
                  >
                    <p className='text-bold'>
                      Volunteer Experience
                    </p>
                    <div className='flex-space-between flex-align-center'>
                      {(
                        <OutlinedIconButton>
                          <RemoveIcon
                            sx={{
                              height: '20px',
                              width: '20px',
                              color: 'var(--text-gray)',
                              stroke: 'var(--text-gray)',
                              strokeWidth: '2px',
                            }}
                            onClick={() => setShowDeleteVolunteerModal(true)}
                          />
                        </OutlinedIconButton>
                      )}
                      {(
                        <OutlinedIconButton>
                          <AddIcon
                            sx={{
                              height: '20px',
                              width: '20px',
                              color: 'var(--text-gray)',
                              stroke: 'var(--text-gray)',
                              strokeWidth: '2px',
                            }}
                            onClick={() => setShowVolunteerForm(true)}
                          />
                        </OutlinedIconButton>
                      )}
                    </div>
                  </div>
                  <VolunteerExperienceList
                    volunteerExperience={userProfile.volunteerExperience} />
                </div>
                <div className='grid-flow-small'>
                  <div
                    className='flex-space-between flex-align-center'
                    style={{ background: 'var(--background-primary)' }}
                  >
                    <p className='text-bold'>
                      Interests
                    </p>
                  </div>
                  <div className='flex'>
                    <div className='flex-justify-center'>
                      <p className='flex-justify-center
                      text-bold'>Your Interests
                      </p>
                    </div>
                    <div>
                      {profileKeywords &&
                        <div className='border'>
                          {selectedKeywords.map((label, index) => (
                            <div key={index} className="label-box">
                              <Chip
                                label={label}
                                key={`role${index}`}
                                id={index.toString()}
                                sx={{
                                  padding: '5px',
                                  margin: '2px',
                                }}
                                onDelete={handleDeleteTag(index)}
                              />

                            </div>
                          ))}
                        </div>
                      }
                    </div>
                    <div>
                      <p className='flex-justify-center
                      text-bold '>Categories</p>

                      <div>
                        {profileKeywords &&
                          <div className='border'>
                            {allKeywords.map((label, index) => (
                              <Chip
                                label={label}
                                key={`role${index}`}
                                id={index.toString()}
                                sx={{
                                  padding: '5px',
                                  margin: '2px',
                                }}
                                onClick={handleAddTag(index)}
                              />
                            ))}
                          </div>
                        }
                      </div>
                    </div>
                  </div>


                </div>
              </div>
              <div className='grid-flow-small'>
                <div className='flex-flow-large'>
                  <Link to='/myprofile'>
                    <ThemedButton
                      aria-label='Next step button'
                      color={'blue'}
                      variant={'themed'}
                    >
                      Back
                    </ThemedButton>
                  </Link>
                  <Link to='/myprofile'>
                    <ThemedButton
                      aria-label='Next step button'
                      color={'yellow'}
                      variant={'themed'}
                      onClick={(e) => handleSubmit(e)}
                    >
                      Save
                    </ThemedButton>
                  </Link>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </InputContext.Provider>
      <Modal
        open={showWorkForm}
        onBackdropClick={() => setShowWorkForm(false)}
        onClose={() => setShowWorkForm(false)}
      >
        <WorkExperienceForm onClose={() =>
          setShowWorkForm(!showWorkForm)} />
      </Modal>
      <Modal
        open={showDeleteModal}
        onBackdropClick={() => setShowDeleteModal(false)}
        onClose={() => setShowDeleteModal(false)}
      >
        <WorkExperienceDeleteModal onClose={() =>
          setShowDeleteModal(!showDeleteModal)} />
      </Modal>
      <Modal
        open={showVolunteerForm}
        onBackdropClick={() => setShowVolunteerForm(false)}
        onClose={() => setShowVolunteerForm(false)}
      >
        <VolunteerExperienceForm onClose={() =>
          setShowVolunteerForm(!showVolunteerForm)} />
      </Modal>
      <Modal
        open={showDeleteVolunteerModal}
        onBackdropClick={() => setShowDeleteVolunteerModal(false)}
        onClose={() => setShowDeleteVolunteerModal(false)}
      >
        <VolunteerExperienceDeleteModal onClose={() =>
          setShowDeleteVolunteerModal(!showDeleteVolunteerModal)} />
      </Modal>

    </Page>
  );
}
