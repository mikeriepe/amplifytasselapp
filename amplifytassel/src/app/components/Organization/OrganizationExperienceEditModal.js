import Box from '@mui/material/Box';
import React from 'react';
import {StepLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {TextInput2} from '../Forms/TextInput2';
import {DateInput2} from '../Forms/DateInput2';
import {CheckboxInput2} from '../Forms/CheckboxInput2';
import ThemedButton from '../Themed/ThemedButton';
import useAuth from '../../util/AuthContext';
import { DataStore } from 'aws-amplify';
import { Profile } from '../../../models';

/**
 * OrganizationExperienceEditModal
 * OrganizationExperienceEditModal
 * Displays form to collect data for new Organization Experience
 * @param {Function} onClose
 * @return {HTML} OrganizationExperienceEditModal component
 */
export default function VolunteerExperienceEditModal({onClose, index}) {
  const {userProfile, setUserProfile} = useAuth();

  const existingLocation =
  userProfile.organizationExperience[index].location.split(', ');

  const formValues = {
    organizationrole: userProfile.organizationExperience[index].role,
    organization: userProfile.organizationExperience[index].organization,
    school: userProfile.organizationExperience[index].school,
    organizationcity: existingLocation[0],
    organizationstate: existingLocation[1],
    description: userProfile.organizationExperience[index].description,
    startdate: (new Date(userProfile.organizationExperience[index].start)),
    enddate: userProfile.organizationExperience[index].end === '' ? '' :
    (new Date(userProfile.organizationExperience[index].end)),
    currentPosition: userProfile.organizationExperience[index].currentPosition,
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
    if (data.organizationcity !== '' && data.organizationstate !== '') {
      newLocation = data.organizationcity + ', ' + data.organizationstate;
    } else if (data.organizationstate === '') {
      newLocation = data.organizationcity;
    } else {
      newLocation = data.organizationstate;
    }

    console.log('data.currentPosition', data.currentPosition);

    const newOrganizationExperience = {
      role: data.organizationrole,
      organization: data.organization,
      school: data.school,
      location: newLocation,
      description: data.description,
      start: startDate,
      end: data.enddate !== null ? endDate : '',
      currentPosition: data.currentPosition,
    };
    
    // userProfile.volunteerExperience[index] = newVolunteerExperience;
    //console.log('gothere69');
    let profile = await DataStore.query(Profile, userProfile.id);
    await DataStore.save(Profile.copyOf(profile, updated => {
      updated.organizationExperience[index] = newOrganizationExperience;
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
    // updateOrganizationExperience(data);
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
        Edit Organization Activity
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
            name='organizationrole'
            control={control}
            label='Organization Role'
            register={register}
          />

          <TextInput2
            name='organization'
            control={control}
            label='Organization'
            register={register}
          />

          <TextInput2
            name='school'
            control={control}
            label='School'
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
                name='organizationcity'
                control={control}
                label='City'
                register={register}
              />
            }
            <TextInput2
              name='organizationstate'
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
            defaultChecked={userProfile.organizationExperience[index].currentPosition}
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
              aria-label='Organization Experience Edit Modal Cancel Button'
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
