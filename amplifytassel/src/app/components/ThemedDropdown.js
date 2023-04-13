import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled((props) => (
  <InputBase {...props} />
))(({theme}) => ({
  '& .MuiInputBase-input': {
    'borderRadius': '10px',
    'position': 'relative',
    'backgroundColor': theme.palette.background.paper,
    'border': '0.5px solid rgba(0, 0, 0, 0.15)',
    'fontSize': '0.8rem',
    'padding': '7px 26px 7px 12px',
    'transition': theme.transitions.create(['border-color', 'box-shadow']),
    'fontFamily': 'Montserrat',
    '&:focus': {
      borderRadius: '10px',
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.15)',
    },
  },
}));

/**
 * Themed dropdown
 * @return {JSX}
 */
export default function ThemedDropdown({menuItems}) {
  const [menuName, setMenuName] = useState('Recommended');

  const handleChange = (event) => {
    setMenuName(event.target.value);
  };

  return (
    <div>
      <FormControl variant='standard'>
        <Select
          value={menuName}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {
            menuItems.map((item) => (
              <MenuItem
                key={`menu-${item}`}
                value={item}
                sx={{fontSize: '0.8rem'}}
              >
                <p>Sort by: <span className='text-bold'>{item}</span></p>
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}
