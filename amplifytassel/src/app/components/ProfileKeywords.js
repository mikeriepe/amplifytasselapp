import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import MuiPaper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';


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
  const [userKeywords, setUserKeywords] = useState([]);


  const extractKeywords = () => {
    const p = Promise.resolve(data[0].keywords.values);
    const keywordNames = [];
    p.then(value => {
      for (let i = 0; i < value.length; i++) {
        const k =  Promise.resolve(value[i].keyword);
        k.then(value => {
          keywordNames.push(value.name);
        });
      }
    });
    setUserKeywords(keywordNames);
  };
  useEffect(() => {
    extractKeywords();
  }, []);

  return (
    <Keywords>
      <h4 className='text-dark'>Interests</h4>
      <div>
        {userKeywords &&userKeywords.length>0 ? userKeywords.map((word, index) => (
          <Chip
            label={userKeywords[index]}
            key={`role${index}`}
            id={index.toString()}
            sx={{
              padding: '5px',
              margin: '2px',
            }}
          />
        ))
      : <p>None</p>
      } 
      </div>
    </Keywords>
  );
}
