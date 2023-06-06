import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import AccessibilityRoundedIcon from '@mui/icons-material/AccessibilityRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Storage } from 'aws-amplify';

const IconStyling = {
  fontSize: '0.9rem',
};

const Header = ({type, children}, props) => (
  <MuiPaper
    elevation={0}
    sx={{
      height: 'auto',
      width: 'auto',
      border: type === 'viewopportunity' ? '1px solid rgba(0, 0, 0, 0.15)' : 0,
      borderRadius: type === 'viewopportunity' ? '10px' : 0,
    }}
    {...props}
  >
    {children}
  </MuiPaper>
);

const Avatar = ({image}, props) => (
  <MuiAvatar sx={{height: '50px', width: '50px'}} src={image} {...props} />
);

const Banner = ({image, backUrl, type}, props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(backUrl);
  };

  return (
    <MuiBox sx={{height: '30vh', width: '100%'}} {...props}>
      {
        backUrl &&
        <IconButton
          onClick={handleNavigate}
          sx={{
            'position': 'absolute',
            'margin': '1em',
            'height': '50px',
            'width': '50px',
            'background': 'white',
            'border': '0.5px solid rgba(0, 0, 0, 0.15)',
            '&:hover': {
              background: 'var(--tertiary-gray-bright)',
            },
          }}
        >
          <ArrowBackRoundedIcon sx={{color: 'var(--text-dark)'}} />
        </IconButton>
      }
      <img
        src={image}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          borderRadius: type === 'viewopportunity' ? '10px 10px 0 0' : 0,
        }}
      />
    </MuiBox>
  );
};

const Details = ({border, children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      paddingBlock: '2em',
      height: '25%',
      width: '100%',
      borderBottom: border ? '0.5px solid rgba(0, 0, 0, 0.12)' : 0,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const SubDetails = ({type, children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 3em',
      height: 'inherit',
      width: 'auto',
      whiteSpace: type === 'viewopportunity' ? 'nowrap' : 'none',
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const Data = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  paddingBlock: '1.5em',
  height: 'auto',
  width: '100%',
  borderBottom: '0.5px solid rgba(0, 0, 0, 0.12)',
}));

/**
 * Modular component, page header
 * @param {String} title Main title for page header
 * @param {String} subtitle Subtitles underneath title
 * @param {Image} image Optional image for the banner
 * @param {Object} rightComponent Optional components to the right
 * @return {JSX} Page header
 */
export default function PageHeader({
  type,
  isCreator,
  title,
  subtitle,
  host,
  hostprofileid,
  avatar,
  banner,
  backUrl,
  data,
  components,
  tabs,
  tabNumber,
}) {
  const [profilePicture, setProfilePicture] = useState(null);

  const downloadProfilePicture = async () => {
    if (avatar !== null) {
      const file = await Storage.get(avatar, {
        level: "public"
      });
      setProfilePicture(file);
    } else {
      setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
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

    return {date: convertDate, time: convertTime};
  };

  const calculateDuration = (date1, date2) => {
    const convertDate1 = new Date(date1);
    const convertDate2 = new Date(date2);

    const compare = Math.abs(convertDate1 - convertDate2);
    
    if (compare == 0) {
      return 'No Duration';
    };

    const compareInMinutes = Math.floor(compare / (1000 * 60));
    const compareInHours = Math.floor(compare / (1000 * 60 * 60));
    const compareInDays = Math.floor(compare / (1000 * 60 * 60 * 24));

    const minutes = compareInMinutes && (!compareInHours && !compareInDays);
    const hours = compareInHours && (compareInMinutes && !compareInDays);
    const days = compareInDays && (compareInMinutes && compareInHours);

    if (minutes) return `${compareInMinutes} Minutes`;
    if (hours) return `${compareInHours} Hours`;
    if (days) return `${compareInDays} Days`;
    return 'Error calculating dates';
  };
  const navigate = useNavigate();
  function hostProfileFunction(profileid) {
    navigate(`/profile/${profileid}`);
  }

  useEffect(() => {
    downloadProfilePicture();
  }, [avatar]);

  return (
    <Header type={type}>
      {banner && <Banner image={banner} backUrl={backUrl} type={type} />}
      <Details border={data}>
        <div
          className='flex-horizontal flex-align-center flex-flow-large'
          style={{paddingInline: '3em'}}
        >
          {avatar && <Avatar image={profilePicture} />}
          <div className='flex-vertical flex-flow-small text-lineheight-24' aria-label='Page Header Title'>
            {type === 'viewopportunity' ? (
              <h3 className='text-dark'>
                {title}
              </h3>
            ) : (
              <h2 className='text-bold text-dark'>
                {title}
              </h2>
            )}
            <p className='text-bold' aria-label='Page Header Host'>
              {`${subtitle}`}
              &nbsp;&nbsp;
              <span className='text-blue clickable' onClick={() => hostProfileFunction(hostprofileid)}>{host}</span>
            </p>
          </div>
        </div>
        <div
          style={
            type === 'viewopportunity' ?
            {
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'right',
            } : {}
          }
        >
          {
            components && !isCreator &&
            <SubDetails type={type}>
              {components}
            </SubDetails>
          }
        </div>
      </Details>
      {!data && <Divider />}
      {data && tabNumber === 0 && (
        <Data>
          <div
            className='flex-horizontal flex-flow-large flex-align-center'
            style={{paddingInline: '3em'}}
          >
            <EventNoteRoundedIcon sx={IconStyling} />
            <p className='text-bold' aria-label='Page Header Start Date'>
              {
                `
                  ${formatDate(data?.startTime).date}
                  ${formatDate(data?.startTime).time}
                `
              }
            </p>
            <ArrowForwardRoundedIcon sx={IconStyling} />
            <p className='text-bold' aria-label='Page Header End Date'>
              {
                data.endTime ?
                `
                  ${formatDate(data?.endTime).date}
                  ${formatDate(data?.endTime).time}
                ` :
                `
                  ${formatDate(data?.startTime).date}
                  ${formatDate(data?.startTime).time}
                `
              }
            </p>
          </div>
          <div
            className='flex-horizontal flex-flow-large flex-align-center'
            style={{paddingInline: '3em', marginTop: '0.25em'}}
          >
            <TimerOutlinedIcon sx={IconStyling} />
            <p className='text-bold' aria-label='Page Header Duration'>
              {calculateDuration(data?.startTime, data?.endTime)}
            </p>
          </div>
          <div
            className='flex-horizontal flex-flow-large flex-align-center'
            style={{paddingInline: '3em', marginTop: '0.25em'}}
          >
            <AccessibilityRoundedIcon sx={IconStyling} />
            <p className='text-bold ellipsis' aria-label='Page Header Location Type'>
              {
                data?.locationType?.charAt(0).toUpperCase() +
                  data?.locationType?.slice(1)
              }
            </p>
          </div>
          {data.locationType && (
            data.locationType === 'in-person' ||
            data.locationType === 'hybrid'
          ) &&
            <div
              className='flex-horizontal flex-flow-large flex-align-center'
              style={{paddingInline: '3em', marginTop: '0.25em'}}
              aria-label='Page Header Location'
            >
              <FmdGoodOutlinedIcon sx={IconStyling} />
              <p className='text-bold'>
                {`${data.location.address} ${data.location.city}, `}
                {`${data.location.state} ${data.location.zip}`}
              </p>
            </div>
          }
          {data.locationType && (
            data.locationType === 'remote' ||
            data.locationType === 'hybrid'
          ) &&
            <div
              className='flex-horizontal flex-flow-large flex-align-center'
              style={{paddingInline: '3em', marginTop: '0.25em'}}
            >
              <DevicesOutlinedIcon sx={IconStyling} />
              <p className='text-bold'>
                {data.zoomLink}
              </p>
            </div>
          }
        </Data>
      )}
      {tabs && tabs}
    </Header>
  );
}
