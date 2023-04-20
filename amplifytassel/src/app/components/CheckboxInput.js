import React from 'react';
import {
  FormControl,
  FormLabel,
  Checkbox,
  Box,
} from '@mui/material';
import {Controller} from 'react-hook-form';

export const CheckboxInput = ({
  name,
  control,
  label,
  customOnChange,
  defaultChecked,
}) => {
  return (
    <FormControl component="fieldset">
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridGap: '10px',
        }}
      >
        <Controller
          name={name}
          control={control}
          render={({
            field: {onChange, value},
            fieldState: {error},
            formState,
          }) => (
            <Checkbox
              value={value}
              defaultChecked={
                defaultChecked ? defaultChecked : false
              }
              onChange={(e) => {
                if (customOnChange) {
                  customOnChange(e);
                }
                onChange(e);
              }}
            >
            </Checkbox>
          )}
        />
        <FormLabel name='currentposition' value='currentposition'
          id='currentpositionlabel'
          sx={{
            fontSize: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          {label}
        </FormLabel>
      </Box>
    </FormControl>
  );
};
