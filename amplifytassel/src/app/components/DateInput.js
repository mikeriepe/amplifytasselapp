import React from 'react';
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

export const DateInput = ({name, control, label, register, minDate}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {onChange, value},
        fieldState: {error},
        formState,
      }) => (
        <Box>
          <DesktopDatePicker
            minDate={minDate ? minDate : null}
            label={label}
            inputFormat="MM/dd/yyyy"
            name={name}
            value={value}
            {...register(name)}
            onChange={onChange}
            renderInput={(params) => <TextField {...params}
              name={name}
              sx={{
                input: {color: '#00C2FF'},
                backgroundColor: 'rgb(255, 255, 255)',
                marginBottom: '5px',
              }}/>}
          />
          <FormHelperText error={!!error}>
            {error ? error.message : ''}
          </FormHelperText>
        </Box>
      )}
    />
  );
};
