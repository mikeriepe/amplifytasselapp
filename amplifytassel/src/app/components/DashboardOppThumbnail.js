import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';
import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import { Storage } from 'aws-amplify';

const Card = styled((props) => (
  <MuiCard elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '100%',
  background: 'white',
}));

const Banner = ({image}, props) => {
  return (
    <MuiBox sx={{height: '130px',
      width: '130px',
      flexDirection: 'row',
      justifyContent: 'center',
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
      fontSize: '.9rem',
      paddingLeft: '1.5em',
      paddingTop: '.5em',
      color: 'var(--secondary-yellow-main)',
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const TimeText = ({children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      lineHeight: 1,
      fontWeight: 'bold',
      fontSize: '1rem',
      paddingLeft: '1.5em',
      paddingTop: '.5em',
      paddingBottom: '2em',
      paddingRight: '3em',
      color: 'var(--tertiary-gray-dark)',
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

/**
 * @return {JSX}
 */
export default function DashboardOppThumbnail({
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

  const formatDate = (startTime) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const convertDate = new Date(startTime).toLocaleDateString([], dateOptions);
    const convertTime = new Date(startTime).toLocaleTimeString([], timeOptions);

    return `${convertDate} at ${convertTime}`;
  };

  return (
    <>
      {opportunity && (
        <Card className='clickable'>
          <CardActionArea
            component={RouterLink}
            to={`/Opportunity/${opportunity.id}`}
          >
            <div
              className='flex-horizontal flex-align-center'
              style={{padding: '1.5em'}}
            >
              <Banner image={banner} />
            </div>
            <EventTitleText className='text-bold'>
              {`
                ${opportunity.eventName}
              `}
            </EventTitleText>
            <TimeText className='text-bold ellipsis'>
              {formatDate(opportunity.startTime)}
            </TimeText>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}
