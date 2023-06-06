import Box from '@mui/material/Box';
import React from 'react';
import {StepLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {TextInput2} from './TextInput2';
import {DateInput2} from './DateInput2';
import {CheckboxInput2} from './CheckboxInput2';
import ThemedButton from './ThemedButton';
import useAuth from '../util/AuthContext';
import { DataStore } from 'aws-amplify';
import { Profile } from '../../models';


/**
 * WorkExperienceEditModal
 * WorkExperienceEditModal
 * Displays form to collect data for new Work Experience
 * @param {Function} onClose
 * @return {HTML} WorkExperienceEditModal component
 */
export default function WorkExperienceEditModal({onClose, index}) {
  const {userProfile, setUserProfile} = useAuth();

  const existingLocation = userProfile.experience[index].location.split(', ');

  const formValues = {
    jobtitle: userProfile.experience[index].title,
    company: userProfile.experience[index].company,
    jobcity: existingLocation[0],
    jobstate: existingLocation[1],
    description: userProfile.experience[index].description,
    startdate: (new Date(userProfile.experience[index].start)),
    enddate: userProfile.experience[index].end === '' ? '' :
    (new Date(userProfile.experience[index].end)),
    currentPosition: userProfile.experience[index].currentPosition,
  };

  const methods = useForm({defaultValues: formValues});
  const {handleSubmit, control, register} = methods;

  const updateProfile = (data) => {
    
    let startDate = '';
    if (data.startdate !== '') {
      startDate = data.startdate.toISOString().split('T')[0];
      const startDateValues = startDate.split('-').reverse('');
      startDate = startDateValues[1] + '/' +
      startDateValues[0] + '/' + startDateValues[2];
    }

    let endDate = '';
    if (data.enddate !== '' && data.enddate !== null) {
      endDate = data.enddate.toISOString().split('T')[0];
      const endDateValues = endDate.split('-').reverse('');
      endDate = endDateValues[1] + '/' +
      endDateValues[0] + '/' + endDateValues[2];
    }

    let newLocation = '';
    if (data.jobcity !== '' && data.jobstate !== '') {
      newLocation = data.jobcity + ', ' + data.jobstate;
    } else if (data.jobstate === '') {
      newLocation = data.jobcity;
    } else {
      newLocation = data.jobstate;
    }
    const newWorkExperience = {
      title: data.jobtitle,
      company: data.company,
      location: newLocation,
      description: data.description,
      start: startDate,
      end: data.enddate !== null ? endDate : '',
      currentPosition: data.currentPosition,
    };

    console.log('gothere44');
    DataStore.query(Profile, userProfile.id)
      .then((profile) => {
        // console.log(JSON.stringify(profile.experience));
        DataStore.save(Profile.copyOf(profile, updated => {
          updated.experience[index].title = newWorkExperience.title;
          updated.experience[index].company = newWorkExperience.company;
          updated.experience[index].location = newWorkExperience.location;
          updated.experience[index].description = newWorkExperience.description;
          updated.experience[index].start = newWorkExperience.start;
          updated.experience[index].end = newWorkExperience.end;
          updated.experience[index].currentPosition = newWorkExperience.currentPosition;
        }))
          .then(() => {
            DataStore.query(Profile, userProfile.id)
              .then((profile) => {
                setUserProfile(profile);
                toast.success('Account updated', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              })
          })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    updateProfile(data);
    onClose();
  };

  return (
    <Paper
      sx={{
        backgroundColor: 'rgb(240, 240, 240)',
        zIndex: '10',
        boxShadow: '-3px 5px 8px 0px rgba(84, 84, 84, 0.81)',
        borderRadius: '10px',
        marginTop: '3rem',
        marginRight: '3rem',
        marginLeft: '3rem',
        padding: '1rem',
      }}
    >
      <StepLabel
        sx={{
          display: 'flex',
          color: 'darkgray',
          opacity: '50%',
          marginBottom: '10px',
        }}
      >
        Edit Work Experience
      </StepLabel>

      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridGap: '1vw',
          marginBottom: '10px',
        }}
      >
        <Box>
          <TextInput2
            name='jobtitle'
            control={control}
            label='Job Title'
            register={register}
          />

          <TextInput2
            name='company'
            control={control}
            label='Company'
            register={register}
          />

          {/* Dropdown Menus*/}
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridGap: '10px',
            }}
          >
            {
              <TextInput2
                name='jobcity'
                control={control}
                label='City'
                register={register}
              />
            }
            <TextInput2
              name='jobstate'
              control={control}
              label='State'
              register={register}
            />
          </Box>

          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>

              {/* DATE PICKER WRAPPER */}
              <Box
                sx={{
                  display: 'grid',
                  gridAutoFlow: 'column',
                  gridGap: '10px',
                }}
              >
                <DateInput2
                  name='startdate'
                  control={control}
                  label='Start Date'
                  register={register}
                />
                <DateInput2
                  name='enddate'
                  control={control}
                  label='End Date'
                  register={register}
                />
              </Box>
            </LocalizationProvider>
          </Box>

          <TextInput2
            name='description'
            control={control}
            label='Enter Description'
            multi={true}
            register={register}
          />

          <CheckboxInput2
            name='currentPosition'
            control={control}
            defaultChecked={userProfile.experience[index].currentPosition}
            label='Current Position'
          />
        </Box>
      </Box>

      {/* Submit/Cancel Button wrapper */}
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'max-content',
          justifyContent: 'end',
        }}
      >
        <div className='grid-flow-small'>
          <div className='flex-flow-large'>
            <ThemedButton
              onClick={() => {
                onClose();
              }}
              aria-label='Work Experience Edit Modal Cancel Button'
              color={'yellow'}
              variant={'themed'}
              sx={{
                marginRight: '10px',
              }}
            >
              Cancel
            </ThemedButton>
            <ThemedButton
              aria-label='Next step button'
              color={'blue'}
              variant={'themed'}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </ThemedButton>
          </div>
        </div>
      </Box>
    </Paper>
  );
}
