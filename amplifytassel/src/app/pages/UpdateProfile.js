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

  // TODO: use this state to implement select and update profile majors
  // const [selectedMajors, setSelectedMajors] = useState([]);
  // const [allMajors, setAllMajors] = useState([]);

  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);

  const [values, setValues] = useState({
    1: {
      graduationYear: userProfile.graduationYear,
      location: userProfile.location,
      about: userProfile.about,
    },
  });

  const handleDeleteTag = (tagIndex) => () => {
    const tempSelectedTags = [...selectedKeywords];
    // add the to be deleted tag back to all tags
    const tempAllTags = [...allKeywords];
    tempAllTags.push(tempSelectedTags[tagIndex]);
    // delete the tag from the selected tags array
    tempSelectedTags.splice(tagIndex, 1);
    // update the arrays
    setSelectedKeywords(tempSelectedTags);
    setAllKeywords(tempAllTags);
  };

  const handleAddTag = (tagIndex) => () => {
    const tempAllTags = [...allKeywords];
    // add the tag to the selected tags array
    const tempSelectedTags = [...selectedKeywords];
    tempSelectedTags.push(tempAllTags[tagIndex]);

    // delete the to be added tag from all tags array
    tempAllTags.splice(tagIndex, 1);
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
    // TODO: Update Keywords Relationship to selectedKeywords
    // const selectedKeywordIDs = selectedKeywords.map((keyword) => keyword.id);
    // DataStore.query(KeywordProfile, kp => kp.profileId.eq(userProfile.id))
    //   .then((keywordProfiles) => {
    //     console.log(keywordProfiles);
    //     // delete keyword relationships not in selectedKeywords
    //     for (let i = 0; i < keywordProfiles.length; i++) {
    //       if (!selectedKeywordIDs.includes(keywordProfiles[i].keywordId)) {
    //         await DataStore.delete(KeywordProfile, kp => kp.)
    //       }
    //     }
    //   });
    // TODO: Update Majors Relationship
    // Update Profile Fields: graduationYear, location, about
    DataStore.query(Profile, userProfile.id)
      .then((res) => {
        DataStore.save(Profile.copyOf(res, updated => {
          updated.graduationYear = values[1].graduationYear;
          updated.location = values[1].location;
          updated.about = values[1].about;
        }))
      })
      .then(() => {
        console.log('volunteer experience updated');
        const userProfileCpy = {...userProfile};
        userProfileCpy.graduationYear = values[1].graduationYear;
        userProfileCpy.location = values[1].location;
        userProfileCpy.about = values[1].about;
        setUserProfile(userProfileCpy);
        toast.success('Account updated', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    // get selectedKeywords, keywords, allKeywords
    DataStore.query(Keyword, (k) => k.Profiles.profile.id.eq(userProfile.id))
      .then((keywords) => {
        // setProfileKeywords(keywords);
        setSelectedKeywords(keywords);
        setValues({
          1: {
            graduationYear: userProfile.graduationYear,
            majors: null, //FIXME
            location: userProfile.location,
            about: userProfile.about,
            keywords: keywords,
          },
        });
        DataStore.query(Keyword)
          .then((keywordsAll) => {
            // console.log('keywords', keywords);
            // console.log('keywordsAll', keywordsAll);
            let keywordsIdArray = keywords.map((obj) => (obj.id));
            setAllKeywords(keywordsAll.filter(k => !keywordsIdArray.includes(k.id)));
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
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
                  {/* TODO: implement search and select majors */}
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
                    placeholder={'Santa Cruz, CA'}
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
                      {selectedKeywords &&
                        <div className='border'>
                          {selectedKeywords.map((label, index) => (
                            <div key={index} className="label-box">
                              <Chip
                                label={label.name}
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
                        {allKeywords &&
                          <div className='border'>
                            {allKeywords.map((label, index) => (
                              <Chip
                                label={label.name}
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
