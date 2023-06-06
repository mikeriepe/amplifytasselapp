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
 * VolunteerExperienceEditModal
 * VolunteerExperienceEditModal
 * Displays form to collect data for new Volunteer Experience
 * @param {Function} onClose
 * @return {HTML} VolunteerExperienceEditModal component
 */
export default function VolunteerExperienceEditModal({onClose, index}) {
  const {userProfile, setUserProfile} = useAuth();

  const existingLocation =
  userProfile.volunteerExperience[index].location.split(', ');

  const formValues = {
    jobtitle: userProfile.volunteerExperience[index].title,
    company: userProfile.volunteerExperience[index].company,
    jobcity: existingLocation[0],
    jobstate: existingLocation[1],
    description: userProfile.volunteerExperience[index].description,
    startdate: (new Date(userProfile.volunteerExperience[index].start)),
    enddate: userProfile.volunteerExperience[index].end === '' ? '' :
    (new Date(userProfile.volunteerExperience[index].end)),
    currentPosition: userProfile.volunteerExperience[index].currentPosition,
  };

  const methods = useForm({defaultValues: formValues});
  const {handleSubmit, control, register} = methods; 

  const updateProfile = async (data) => {
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

    console.log('data.currentPosition', data.currentPosition);

    const newVolunteerExperience = {
      title: data.jobtitle,
      company: data.company,
      location: newLocation,
      description: data.description,
      start: startDate,
      end: data.enddate !== null ? endDate : '',
      currentPosition: data.currentPosition,
    };
    
    // userProfile.volunteerExperience[index] = newVolunteerExperience;
    console.log('gothere69');
    let profile = await DataStore.query(Profile, userProfile.id);
    await DataStore.save(Profile.copyOf(profile, updated => {
      updated.volunteerExperience[index] = newVolunteerExperience;
    }));
    profile = await DataStore.query(Profile, userProfile.id);
    setUserProfile(profile);
    toast.success('Account updated', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async (data) => {
    // updateVolunteerExperience(data);
    await updateProfile(data);
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
        Edit Volunteer Experience
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
            label='Organization'
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
            defaultChecked={userProfile.volunteerExperience[index].currentPosition}
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
              aria-label='Volunteer Experience Edit Modal Cancel Button'
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
