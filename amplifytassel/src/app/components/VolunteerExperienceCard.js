import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import useAuth from '../util/AuthContext';
import VolunteerExperienceEditModal from './VolunteerExperienceEditModal';
import VolunteerExperienceDeleteModal from './VolunteerExperienceDeleteModal';
import {Modal} from '@mui/material';

const Card = styled((props) => (
  <MuiCard elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '100%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
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
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
      borderRadius: '5px',
    }}
    {...props}
  >
    {children}
  </ButtonBase>
);

/**
 * @param {Object} jobExperience
 * @return {JSX}
 */
export default function VolunteerExperienceCard({jobIndex}) {
  const {userProfile} = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const index = jobIndex;

  return (
    <>
      <Card className='clickable'>
        <div
          className='flex-space-between flex-align-center'
          style={{padding: '1.5em', background: 'var(--background-primary)'}}
        >
          <MuiBox>
            <div>
              <h5>{userProfile.volunteerExperience[jobIndex].title}</h5>
              <p className='text-bold text-blue'>
                {userProfile.volunteerExperience[jobIndex].company}</p>
              <p>{userProfile.volunteerExperience[jobIndex].location}</p>
              <p>{userProfile.volunteerExperience[jobIndex].start +
                ' - ' + (userProfile.volunteerExperience[jobIndex].end === '' || userProfile.volunteerExperience[jobIndex].currentPosition ?
                'Present' : userProfile.volunteerExperience[jobIndex].end)}</p>
              <p style={{marginTop: '0.5em'}}>
                {userProfile.volunteerExperience[jobIndex].description}</p>
            </div>
          </MuiBox>
          <div className='flex-flow-large' style={{marginLeft: '50px'}}>
            {(
              <OutlinedIconButton>
                <EditRoundedIcon
                  sx={{
                    height: '20px',
                    width: '20px',
                    color: 'var(--tertiary-gray-main)',
                  }}
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                />
              </OutlinedIconButton>
            )}
          </div>
        </div>
        <Divider sx={{borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)'}} />
      </Card>
      <Modal
        open={showEditModal}
        onBackdropClick={() => setShowEditModal(false)}
        onClose={() => setShowEditModal(false)}
      >
        <VolunteerExperienceEditModal onClose={() =>
          setShowEditModal(!showEditModal)}
        index={jobIndex}/>
      </Modal>
      {/* <Modal
        open={showDeleteModal}
        onBackdropClick={() => setShowDeleteModal(false)}
        onClose={() => setShowDeleteModal(false)}
      >
        <VolunteerExperienceDeleteModal onClose={() =>
          setShowDeleteModal(!showDeleteModal)}
        index={index}/>
      </Modal> */}
    </>
  );
}
