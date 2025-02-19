import React from 'react';
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { MobileTimePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { parseISO } from 'date-fns'

export const TimeInput = ({name, control, label, register}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {onChange, value=parseISO('2006-11-26-11.25.36')},
        fieldState: {error},
        formState,
      }) => (
        <Box>
          <MobileTimePicker
            onChange={(e) => {
              const time = new Date(e);
              onChange(time);
            }}
            value={value}
            label={label}
            timeFormat="HH:mm"
            name={name}
            renderInput={(params) => <TextField {...params}
              sx={{
                input: {color: '#00C2FF'},
                backgroundColor: 'rgb(255, 255, 255)',
                marginBottom: '10px',
              }}
            />}
          />
          <FormHelperText error={!!error}>
            {error ? error.message : ''}
          </FormHelperText>
        </Box>
      )}
    />
  );
};