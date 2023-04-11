import React, {useState, useContext, createContext} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const InputContext = createContext();
export const useInputContext = () => useContext(InputContext);

const inputStyling = {
  'paddingInline': '10px',
  'height': '40px',
  'width': '100%',
  'borderRadius': '15px',
  'fontFamily': 'Montserrat',
  'fontSize': '0.8rem',
  'fontWeight': '600',
  'color': '#3C4047',
  '.MuiOutlinedInput-input:-webkit-autofill': {
    'padding': 0,
    'paddingInline': '14px',
    'height': '40px',
    '-webkit-box-shadow': '0 0 0 30px white inset !important',
    '-webkit-text-fill-color': '#3C4047',
  },
};

const visibilityStyling = {
  marginRight: '10px',
  fontSize: '20px',
  color: '#8B95A5',
};

/**
 * Themed input
 * @return {JSX}
 */
export default function ThemedInput({
  placeholder,
  type,
  index,
  step,
  fill,
  error,
  content=null,
}) {
  const value = useInputContext();
  const [values, setValues] = value;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [step]: {...prevValues[step], [index]: e.target.value},
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {type === 'text' ? (
        <OutlinedInput
          inputProps={{'aria-label': 'Input text'}}
          placeholder={placeholder}
          type={type}
          value={content !== null ? content : values[index]}
          onChange={handleChange}
          autoComplete={fill}
          error={error}
          sx={inputStyling}
        />
      ) : (
        <OutlinedInput
          inputProps={{'aria-label': 'Input password'}}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          value={values[index]}
          onChange={handleChange}
          error={error}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
                disableRipple
              >
                {showPassword ?
                  <VisibilityOff sx={visibilityStyling} /> :
                  <Visibility sx={visibilityStyling} />
                }
              </IconButton>
            </InputAdornment>
          }
          sx={inputStyling}
        />
      )}
    </>
  );
}
