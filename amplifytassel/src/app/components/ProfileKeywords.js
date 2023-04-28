import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import MuiPaper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import { DataStore } from '@aws-amplify/datastore';
import { Keyword } from '../../models';

const Keywords = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5em',
  padding: '2em',
  height: 'auto',
  width: '60%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));
/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileKeywords({ data }) {
  const [keywords, setKeywords] = useState(null);

  useEffect(() => {
    console.log('gothere3');
    // console.log('data.id', data.id);
    DataStore.query(Keyword, (k) => k.Profiles.profile.id.eq(data.id))
      .then((keywords) => {
        // console.log('keywords', keywords);
        // keywords.map((word, index) => (console.log(word)));
        setKeywords(keywords);
        console.log('gothere4');

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Keywords>
      <h4 className='text-dark'>Interests</h4>
      <div>
        {keywords && keywords.map((word, index) => (
          <Chip
            label={word.name}
            key={`role${index}`}
            id={index.toString()}
            sx={{
              padding: '5px',
              margin: '2px',
            }}
          />
        ))}
      </div>
    </Keywords>
  );
}
