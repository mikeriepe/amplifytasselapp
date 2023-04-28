import Box from '@mui/material/Box';
import React from 'react';
import {StepLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {TextInput} from './TextInput';
import {DateInput} from './DateInput';
import ThemedButton from './ThemedButton';
import useAuth from '../util/AuthContext';


/**
 * VolunteerExperienceEditModal
 * VolunteerExperienceEditModal
 * Displays form to collect data for new Volunteer Experience
 * @param {Function} onClose
 * @return {HTML} VolunteerExperienceEditModal component
 */
export default function VolunteerExperienceEditModal({onClose, index}) {
  const {userProfile} = useAuth();

  const existingLocation =
  userProfile.volunteeringexperience[index].location.split(', ');

  const formValues = {
    jobtitle: userProfile.volunteeringexperience[index].title,
    company: userProfile.volunteeringexperience[index].company,
    jobcity: existingLocation[0],
    jobstate: existingLocation[1],
    description: userProfile.volunteeringexperience[index].description,
    startdate: (new Date(userProfile.volunteeringexperience[index].start)),
    enddate: userProfile.volunteeringexperience[index].end === '' ? '' :
    (new Date(userProfile.volunteeringexperience[index].end)),
  };

  const methods = useForm({defaultValues: formValues});
  const {handleSubmit, control, register} = methods;

  const updateVolunteerExperience = (data) => {
    let startDate = '';
    if (data.startdate !== '') {
      startDate = data.startdate.toISOString().split('T')[0];
      const startDateValues = startDate.split('-').reverse('');
      startDate = startDateValues[1] + '/' +
      startDateValues[0] + '/' + startDateValues[2];
    }

    let endDate = '';
    console.log(data.enddate);
    if (data.enddate === null) {
      console.log(data.enddate);
    }
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
    const newVolunteerExperience = {
      title: data.jobtitle,
      company: data.company,
      location: newLocation,
      description: data.description,
      start: startDate,
      end: data.enddate !== null ? endDate : '',
    };
    userProfile.volunteeringexperience[index] = newVolunteerExperience;
  };

  const updateProfile = () => {
    fetch(`/api/updateProfile`, {
      method: 'POST',
      body: JSON.stringify({userid: userProfile.userid, ...userProfile}),
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
    return;
  };

  const onSubmit = (data) => {
    updateVolunteerExperience(data);
    updateProfile();
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
          <TextInput
            name='jobtitle'
            control={control}
            label='Job Title'
            register={register}
          />

          <TextInput
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
