import React, {useState, useEffect} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MuiBox from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Storage } from 'aws-amplify';

/**
 * @return {JSX}
 */
export default function DashboardPendingReqCard({
  opportunity,
}) {

  const [banner, setBanner] = useState(null);

  const downloadFile = async () => {
    const img = await Storage.get(opportunity.bannerKey, {
      level: "public"
    });
    setBanner(img);
  }

  useEffect(() => {
    downloadFile();
  }, []);

  const navigate = useNavigate();
  const navigateToOpp = (oppid) => {
    navigate(`/Opportunity/${oppid}`);
  };

  const formatDate = (date) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const convertDate = new Date(date).toLocaleDateString([], dateOptions);
    const convertTime = new Date(date).toLocaleTimeString([], timeOptions);

    return `${convertDate} at ${convertTime}`;
  };

  const Banner = ({image}, props) => {
    return (
      <MuiBox sx={{height: '60px',
        width: '60px',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '1em',
      }} {...props}>
        <img
          src={image}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            border: '0.5px solid rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
          }}
        />
      </MuiBox>
    );
  };

  const EventTitleText = ({children}, props) => (
    <MuiBox
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        lineHeight: 1.5,
        fontWeight: 'bold',
        fontSize: '0.9rem',
        color: 'var(--secondary-yellow-main)',
      }}
      {...props}
    >
      {children}
    </MuiBox>
  );

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        style={{height: 95, cursor: 'pointer'}}
        onClick={()=> navigateToOpp(opportunity.id)}
      >
        <TableCell
          component='th'
          scope='row'
          padding='none'
          align='left'
        >
          <div
            className='flex-horizontal flex-align-center flex-flow-large'
          >
            <Banner image={banner} />
            <div
              className='flex-vertical flex-align-left flex-flow-large'
            >
              <EventTitleText>{`${opportunity?.eventName}`}</EventTitleText>
              <p>{formatDate(opportunity.startTime)}</p>
            </div>
          </div>
        </TableCell>
        <TableCell
          align='right'
          style={{paddingRight: '6em'}}
        >
          <Chip
            label={'Pending'}
            variant='outlined'
            color={'secondary'}
            size='small'
            icon={
              <Box
                style={{
                  marginLeft: '10px',
                  height: '6px',
                  width: '6px',
                  background: 'var(--secondary-yellow-main)',
                  borderRadius: '50%',
                }}
              />
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
