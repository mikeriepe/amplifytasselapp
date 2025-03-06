import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import useAuth from '../../util/AuthContext';

import OrganizationExperienceEditModal from './OrganizationExperienceEditModal';
import OrganizationExperienceDeleteModal from './OrganizationExperienceDeleteModal';

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
export default function OrganizationExperienceCard({organizationIndex}) {
  const {userProfile} = useAuth();

  const [showDeleteOrganizationModal, setShowDeleteOrganizationModal] = useState(false);
  const [showEditOrganizationModal, setShowEditOrganizationModal] = useState(false);

  const index = organizationIndex;

  return (
    <>
      <Card className='clickable'>
        <div
          className='flex-space-between flex-align-center'
          style={{padding: '1.5em', background: 'var(--background-primary)'}}
        >
          <MuiBox>
            <div>
              <h5>{userProfile.organizationExperience[organizationIndex].role}</h5>
              <p className='text-bold text-blue'>
                {userProfile.organizationExperience[organizationIndex].organization}</p>
              <p>{userProfile.organizationExperience[organizationIndex].school}</p>
              <p>{userProfile.organizationExperience[organizationIndex].location}</p>
              <p>{userProfile.organizationExperience[organizationIndex].start +
                ' - ' + (userProfile.organizationExperience[organizationIndex].end === '' || userProfile.organizationExperience[organizationIndex].currentPosition ?
                'Present' : userProfile.organizationExperience[organizationIndex].end)}</p>
              <p style={{marginTop: '0.5em'}}>
                {userProfile.organizationExperience[organizationIndex].description}</p>
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
                    setShowEditOrganizationModal(true);
                  }}
                />
              </OutlinedIconButton>
            )}
          </div>
        </div>
        <Divider sx={{borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)'}} />
      </Card>
      <Modal
        open={showEditOrganizationModal}
        onBackdropClick={() => setShowEditOrganizationModal(false)}
        onClose={() => setShowEditOrganizationModal(false)}
      >
        <OrganizationExperienceEditModal onClose={() =>
          setShowEditOrganizationModal(!showEditOrganizationModal)}
        index={organizationIndex}/>
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
