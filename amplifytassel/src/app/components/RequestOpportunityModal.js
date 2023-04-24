import React from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import ThemedButton from './ThemedButton';


/**
 * Modal for request request
 * @param {Object} props
 * @return {Object} JSX
 */
export default function RequestModal(props) {
  const {
    showReqForm,
    handleModalClose,
    requestMessage,
    handleRequestMessage,
    handleRequestClick,
    opportunityName,
  } = props;

  return (
    <Modal
      open={showReqForm}
      onClose={handleModalClose}
    >
      <Paper
        sx={{
          position: 'absolute',
          padding: '1.5em',
          top: '50%',
          left: '50%',
          height: 'auto',
          width: '600px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <div className='request-title'>
          {opportunityName}
        </div>
        <div className='request-subtitle'>
        Express your interest in {opportunityName}:
        </div>
        <div className='request-message'>
          <textarea
            value={requestMessage}
            onChange={handleRequestMessage}
            placeholder='Optional (Max 400 Characters)'
            maxLength={400}
            style={{
              resize: 'none',
              height: '200px',
              width: '595px',
              outline: 'none',
            }}
          />
        </div>
        <div className='request-buttons'>
          <div className='request-buttons-request'>
            <ThemedButton
              color={'yellow'}
              variant={'themed'}
              onClick={handleRequestClick}
            >
              Send Request to Join
            </ThemedButton>
          </div>
          <div className='request-buttons-cancel'>
            <ThemedButton
              color={'gray'}
              variant={'cancel'}
              onClick={handleModalClose}
            >
              Cancel
            </ThemedButton>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}
