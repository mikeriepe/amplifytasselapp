import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import {Controller} from 'react-hook-form';

export const DropdownInput = ({
  name,
  control,
  label,
  options,
  customOnChange,
  register,
}) => {
  const generateSingleOptions = () => {
    if (options) {
      return options.map((option) => {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        );
      });
    } else {
      return [];
    }
  };

  return (
    <FormControl sx={{width: '-webkit-fill-available'}}>
      <InputLabel id='select-label'>{label}</InputLabel>
      <Controller
        render={({
          field: {onChange, value},
          fieldState: {error},
          formState,
        }) => (
          <Box>
            <Select
              {...register(name)}
              sx={{
                input: {color: '#00C2FF'},
                backgroundColor: 'rgb(255, 255, 255)',
                marginBottom: '5px',
                width: '-webkit-fill-available',
              }}
              label={label}
              labelId='select-label'
              onChange={(e) => {
                if (customOnChange) {
                  customOnChange(e);
                }
                onChange(e);
              }}
              value={value}
            >
              {generateSingleOptions()}
            </Select>
            <FormHelperText error={!!error}>
              {error ? error.message : ''}
            </FormHelperText>
          </Box>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};