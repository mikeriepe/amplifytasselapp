import Box from '@mui/material/Box';
import React, { useState } from 'react';
import {StepLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {TextInput2} from './TextInput2';
import {DateInput2} from './DateInput2';
import {CheckboxInput2} from './CheckboxInput2';
import ThemedButton from '../components/ThemedButton';
import useAuth from '../util/AuthContext';
import useAnimation from '../util/AnimationContext';

import { DataStore } from '@aws-amplify/datastore';
import { Profile } from '../../models';
import { calculateIfUserLeveledUp } from '../util/PointsAddition';

export const sortWorkExperience = (experience) => {
  const experienceSorted = [...experience].sort((a, b) => (
    new Date(a.start).getTime() < new Date(b.start).getTime() ? 1 : -1
  ));
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
  const [curPosition, setCurPosition] = useState(false);

  // animations
  const {
    setShowConfettiAnimation,
    setShowStarAnimation
  } = useAnimation();

  const handleCurPositionChange = (e) => {
    const value = e.target.checked;
    setCurPosition(value);
  };

  const formValues = {
    jobtitle: '',
    company: '',
    jobcity: '',
    jobstate: '',
    description: '',
    startdate: (new Date()),
    enddate: null,
    currentPosition: false,
  };

  const validationSchema = Yup.object().shape({
    jobtitle: Yup.string().required('Job title is required'),
    company: Yup.string().required('Company name is required'),
    jobcity: Yup.string().required('Job city is required'),
    jobstate: Yup.string().required('Job state is required'),
    description: Yup.string().notRequired(),
    startdate: Yup
        .date()
        .required('Start date is required'),
    enddate: Yup.date().when([], {
      is: () => curPosition,
      then: () => Yup.date().notRequired(),
      otherwise: () => Yup.date().min(Yup.ref('startdate'), 'End date must be after start date').required('End date is required'),
    })
  });

  const {
    register,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formValues,
  });

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
      end: data.enddate !== null ? endDate : '',
      start: startDate,
      title: data.jobtitle,
      company: data.company,
      location: newLocation,
      description: data.description,
      currentPosition: data.currentPosition,
    };

    // IFNULL
    const experienceObj = (userProfile.experience ? [...(userProfile.experience)] : []);
    console.log('experienceObj', experienceObj);
    experienceObj.push(newWorkExperience);

    const sortedExperience = sortWorkExperience(experienceObj);
    console.log('sortedExperience', sortedExperience);
    
    let toasterStr = '';

    DataStore.query(Profile, userProfile.id)
      .then((res) => {
        DataStore.save(Profile.copyOf(res, updated => {
          updated.experience = sortedExperience;
          // Add 10 points everytime a work experience is added
          updated.points += 10;
        }))
        .then((updatedProfile) => {
          console.log(updatedProfile);
          setUserProfile(updatedProfile);
        })
        // Check if they leveled up
        const isLevelUp = calculateIfUserLeveledUp(res.points, 10);
        if (isLevelUp) {
          // Display confetti animation
          setShowConfettiAnimation(true);
          toasterStr = 'and you leveled up!';
        } else {
          // Display star animation
          setShowStarAnimation(true);
          toasterStr = 'and you earned 10 points!';
        }
        
      })
      .then(() => {
        console.log('experience updated');
        // const userProfileCpy = {...userProfile};
        // userProfileCpy.experience = sortedExperience;
        // setUserProfile(userProfileCpy);
        toast.success(`Account updated ${toasterStr}`, {
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
                {!curPosition &&
                  <DateInput2
                    name='enddate'
                    control={control}
                    label='End Date'
                    register={register}
                  />
                }
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
            label='Current Position'
            customOnChange={handleCurPositionChange}
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
              aria-label='Work Experience Form Cancel Button'
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
