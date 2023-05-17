import React, {useEffect, useState} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MuiBox from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';

import { DataStore, Storage } from 'aws-amplify';
import { Request } from './../../models';

/**
 * @return {JSX}
 */
export default function DashboardPendingOppCard({
  opportunity,
}) {
  const [requests, setRequests] = useState([]);
  const [banner, setBanner] = useState(null);
  const navigate = useNavigate();
  const navigateToOpp = (oppid) => {
    navigate(`/Opportunity/${oppid}`);
  };

  const getPendingRequestsReceived = () => {
    DataStore.query(Request, (r) => r.and(r => [
      r.opportunityID.eq(opportunity.id),
      r.status.eq('PENDING')
    ]))
    .then((res) => {
      setRequests(res);
    })
    .catch((err) => {
      console.log(err);
      alert('Error retrieving pending requests');
    });
  };

  const downloadFile = async () => {
    const img = await Storage.get(opportunity.bannerKey, {
      level: "public"
    });
    setBanner(img);
  }

  useEffect(() => {
    setRequests([]);
    getPendingRequestsReceived();
    downloadFile();
  }, [opportunity]);

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

  const RequestsText = ({children}, props) => {
    return (
      <MuiBox sx={{height: '45px',
        width: '45px',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ED4949',
        borderRadius: '1em',
        color: '#FFFFFF',
        letterSpacing: '-0.015em',
        fontSize: '16px',
        fontWeight: '700',
        lineHeight: '18px',
        margin: 'auto',
        alignItems: 'center',
        display: 'flex',
      }} {...props}>
        {children}
      </MuiBox>
    );
  };

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
        <TableCell>
          {requests.length ? <RequestsText>
            {requests.length}
          </RequestsText> : null}
        </TableCell>
      </TableRow>
    </>
  );
}
