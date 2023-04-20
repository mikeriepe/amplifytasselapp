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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonBase from '@mui/material/ButtonBase';
import WorkExperienceForm from '../components/WorkExperienceForm';
import WorkExperienceDeleteModal from '../components/WorkExperienceDeleteModal';
import VolunteerExperienceForm from '../components/VolunteerExperienceForm';
import VolunteerExperienceDeleteModal from
  '../components/VolunteerExperienceDeleteModal';
import VolunteerExperienceList from '../components/VolunteerExperienceList';


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
  const {user, userProfile} = useAuth();
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showDeleteVolunteerModal,
    setShowDeleteVolunteerModal] = useState(false);

  const [keywords, setKeywords] = useState(null);
  const [selectedTags, setSelectedTags] = useState(
    userProfile.keywords ?
    Object.values(userProfile.keywords) :
    [],
  );

  const [allTags, setAllTags] = useState([]);
  const handleDeleteTag = (tagIndexToDelete) => () => {
    const tempSelectedTags = [...selectedTags];
    // add the to be deleted tag back to all tags
    const tempAllTags = [...allTags];
    tempAllTags.push(tempSelectedTags[tagIndexToDelete]);
    // delete the tag from the selected tags array
    tempSelectedTags.splice(tagIndexToDelete, 1);
    // update the arrays
    setSelectedTags(tempSelectedTags);
    setAllTags(tempAllTags);
  };

  const handleAddTag = (tagIndexToAdd) => () => {
    const tempAllTags = [...allTags];
    // add the tag to the selected tags array
    const tempSelectedTags = [...selectedTags];
    tempSelectedTags.push(tempAllTags[tagIndexToAdd]);

    // delete the to be added tag from all tags array
    tempAllTags.splice(tagIndexToAdd, 1);
    // update the arrays
    setSelectedTags(tempSelectedTags);
    setAllTags(tempAllTags);
  };

  const getKeywords = () => {
    fetch(`/api/getKeywords`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setKeywords(json);
          console.log(json);
          const tempKeywords = [];
          for (let i = 0; i < json.length; i++) {
            tempKeywords.push(json[i].value);
          }
          const filteredAllTags = tempKeywords.
              filter((x) => !selectedTags.includes(x));
          setAllTags(filteredAllTags);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving keywords, please try again');
        });
  };

  if (userProfile.experience === null) {
    userProfile.experience = {};
  }
  if (userProfile.volunteerExperience === null) {
    userProfile.volunteerExperience = {};
  }
  if (userProfile.keywords === null) {
    userProfile.keywords = {};
  }

  const [values, setValues] = useState({
    1: {
      graduationYear: userProfile.graduationYear,
      major: userProfile.major,
      location: userProfile.location,
      about: userProfile.about,
      keywords: userProfile.keywords,
    },
  });
  const updateProfile = () => {
    fetch(`/api/updateProfile`, {
      method: 'POST',
      body: JSON.stringify({userid: user.userid, ...userProfile}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        }); toast.success('Account updated', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const updateLocalUserProfileData = () => {
    userProfile.graduationYear = values[1].graduationYear;
    userProfile.major = values[1].major;
    userProfile.location = values[1].location;
    userProfile.about = values[1].about;
  };
  const convertTagsToObject = (tags) => {
    const tagsObject = {};
    for (let i = 0; i < tags.length; i++) {
      tagsObject[`keyword${i}`] = tags[i];
    }
    return tagsObject;
  };
  const handleSubmit = (e) => {
    const tagsToSubmit = convertTagsToObject(selectedTags);
    userProfile.keywords = tagsToSubmit;
    updateLocalUserProfileData();
    updateProfile();
  };

  useEffect(() => {
    getKeywords();
  }, []);

  return (
    <Page>
      <InputContext.Provider value={[values, setValues]}>
        <Box className='updatepage' width='100%' aria-label='Signup form'>
          <Box className='update-card-content'>
            <div className='flex-space-multi' style={
              {display: null}
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
                  <ThemedInput
                    placeholder={'Enter your major'}
                    type={'text'}
                    index={'major'}
                    step={1}
                    fill={'major'}
                    content={values[1].major === '' ?
                    null : values[1].major}
                  />
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
                    style={{background: 'var(--background-primary)'}}
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
                    style={{background: 'var(--background-primary)'}}
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
                    style={{background: 'var(--background-primary)'}}
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
                      {keywords &&
                    <div className='border'>
                      {selectedTags.map((label, index) => (
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
                        {keywords &&
                    <div className='border'>
                      {allTags.map((label, index) => (
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
          setShowWorkForm(!showWorkForm)}/>
      </Modal>
      <Modal
        open={showDeleteModal}
        onBackdropClick={() => setShowDeleteModal(false)}
        onClose={() => setShowDeleteModal(false)}
      >
        <WorkExperienceDeleteModal onClose={() =>
          setShowDeleteModal(!showDeleteModal)}/>
      </Modal>
      <Modal
        open={showVolunteerForm}
        onBackdropClick={() => setShowVolunteerForm(false)}
        onClose={() => setShowVolunteerForm(false)}
      >
        <VolunteerExperienceForm onClose={() =>
          setShowVolunteerForm(!showVolunteerForm)}/>
      </Modal>
      <Modal
        open={showDeleteVolunteerModal}
        onBackdropClick={() => setShowDeleteVolunteerModal(false)}
        onClose={() => setShowDeleteVolunteerModal(false)}
      >
        <VolunteerExperienceDeleteModal onClose={() =>
          setShowDeleteVolunteerModal(!showDeleteVolunteerModal)}/>
      </Modal>

    </Page>
  );
}
