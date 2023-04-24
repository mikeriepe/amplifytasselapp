import React from 'react';
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

export const TextInput = ({name, control, label, register}) => {
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
          <TextField
            sx={{
              input: {color: '#00C2FF'},
              backgroundColor: 'rgb(255, 255, 255)',
              marginBottom: '5px',
            }}
            {...register(name)}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant='outlined'
          />
          <FormHelperText error={!!error}>
            {error ? error.message : ''}
          </FormHelperText>
        </Box>
      )}
    />
  );
};
