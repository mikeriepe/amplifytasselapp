import Box from '@mui/material/Box';
import React from 'react';
import {StepLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {TextInput} from './TextInput';
import {DateInput} from './DateInput';
import {CheckboxInput} from './CheckboxInput';
import ThemedButton from '../components/ThemedButton';
import useAuth from '../util/AuthContext';

import { DataStore } from '@aws-amplify/datastore';
import { Profile } from '../../models';



export const sortWorkExperience = (experience) => {
  const experienceSorted = [...experience].sort((a, b) => (
    new Date(a.start).getTime() < new Date(b.start).getTime() ? -1 : 1
  ));
  console.log('experienceSorted', experienceSorted);
  return experienceSorted;
};

/**
 * WorkExperienceForm
 * Work Experience Form Component
 * Displays form to collect data for new Work Experience
 * @param {Function} onClose
 * @return {HTML} WorkExperienceForm component
 */
export default function WorkExperienceForm({onClose}) {
  const {userProfile, setUserProfile} = useAuth();

  const formValues = {
    jobtitle: '',
    company: '',
    jobcity: '',
    jobstate: '',
    description: '',
    startdate: (new Date()),
    enddate: null,
    currentposition: false,
  };

  const methods = useForm({defaultValues: formValues});
  const {handleSubmit, control, register} = methods;

  const addWorkExperienceToProfile = (data) => {
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
      end: data.enddate !== null ? endDate : '',
      start: startDate,
      title: data.jobtitle,
      company: data.company,
      location: newLocation,
      description: data.description,
      currentPosition: data.currentposition,
    };
    userProfile.experience.push(newWorkExperience);
  };

  const updateProfile = (sortedExperience) => {
    DataStore.query(Profile, p => p.id.eq(userProfile.id))
      .then((res) => {
        DataStore.save(Profile.copyOf(res[0], updated => {
          updated.experience = sortedExperience;
        }))
      })
      .then(() => {
        console.log('experience updated');
        userProfile.experience = sortedExperience;
        setUserProfile(userProfile);
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

  const onSubmit = (data) => {
    addWorkExperienceToProfile(data);
    const sortedExperience = sortWorkExperience(userProfile.experience);
    updateProfile(sortedExperience);
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
        Add New Work Experience
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
          <TextInput
            name='jobtitle'
            control={control}
            label='Job Title'
            register={register}
          />

          <TextInput
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
              <TextInput
                name='jobcity'
                control={control}
                label='City'
                register={register}
              />
            }
            <TextInput
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
                <DateInput
                  name='startdate'
                  control={control}
                  label='Start Date'
                  register={register}
                />
                <DateInput
                  name='enddate'
                  control={control}
                  label='End Date'
                  register={register}
                />
              </Box>
            </LocalizationProvider>
          </Box>

          <TextInput
            name='description'
            control={control}
            label='Enter Description'
            multi={true}
            register={register}
          />

          <CheckboxInput
            name='currentposition'
            control={control}
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
              onClick={onClose}
              aria-label='Next step button'
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
