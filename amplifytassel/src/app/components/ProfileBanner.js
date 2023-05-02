import React, { useState, useEffect } from 'react';
import MuiBox from '@mui/material/Box';
import ExampleCover from '../assets/examplecover.png';
import { v4 as uuidv4 } from 'uuid';
import { DataStore } from '@aws-amplify/datastore';
import { Storage } from 'aws-amplify';
import { Profile } from '../../models';
import {toast} from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * creates Profile header
 * @return {HTML} Profile header component
 */
 export default function ProfileBanner({ selectedFile, data}) {
  // Display the default banner if there is an error
  const [fileKey, setFileKey] = useState(null);
  const [banner, setBanner] = useState(ExampleCover);
  const [loading, setLoading] = useState(true);

  const BANNER_FILE_SIZE_LIMIT = 2097152;

  const handleError = (e) => {
    e.target.src = ExampleCover;
  };

  const getBannerKey = async () => {
    let user = await DataStore.query(Profile, p => p.id.eq(data.id));
    setFileKey(user[0].banner);
  };

  const downloadFile = async () => {
    if (fileKey !== null) {
      const file = await Storage.get(fileKey, {
        level: "public"
      });
      setBanner(file);
    } else {
      setBanner(ExampleCover);
    }
    setLoading(false);
  };

  const uploadFile = async () => {
    try {
      setLoading(true);
      // Check the banner size
      if(selectedFile.size > BANNER_FILE_SIZE_LIMIT){
        toast.error(
          `The image cannot be larger than 2 MB, please try again.`,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
          return;
      };

      const result = await Storage.put(selectedFile.name + "-" + uuidv4(), selectedFile, {
        contentType: selectedFile.type,
      });
      // fetch the user
      let user = await DataStore.query(Profile, p => p.id.eq(data.id));
  
      // Delete the old banner
      await Storage.remove(user[0].banner);
  
      // update the banner field
      await DataStore.save(
        Profile.copyOf(user[0], updated => {
          updated.banner = result.key;
        })
      );
      setFileKey(result.key);
      toast.success(
        `Successfully uploaded ${selectedFile.name}`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    } catch {
      toast.error(
        `There has been an error, please try again later.`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setLoading(false);
    }
  };

  useEffect(() => {
    getBannerKey();
  }, []);

  useEffect(() => {
    if (fileKey !== null) {
      downloadFile();
    } else {
      setLoading(false);
    }
  }, [fileKey]);

  useEffect(() => {
    // A file has been selected upload it to the db
    if (selectedFile){
      uploadFile();
    }
  }, [selectedFile])

  return (
    <MuiBox
      sx={{
        height: '65%',
        width: '100%',
        borderRadius: '10px',
      }}
      >
        {
        loading ?
          <Box
            sx={{display: 'flex'}} 
            style={{
              padding: '2rem',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <CircularProgress />
          </Box> :
        <img
          src={banner}
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            borderRadius: '10px 10px 0 0',
          }}
          onError={handleError}
        />
      }
    </MuiBox>
  );
}
