import React, {useState, useContext, createContext, useEffect} from 'react';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

export const MultiSelectContext = createContext();
export const useMultiSelectContext = () => useContext(MultiSelectContext);

export default function MultiSelect({data}) {
  useEffect(() => {
    console.log(data);
    console.log('hi');
  }, [])
  
  const value = useMultiSelectContext();
  const [selectedMajors, setSelectedMajors] = value;
  return (
    <FormControl sx={{ m: 1, width: 500 }}>
      <InputLabel>Select Major(s)</InputLabel>
      <Select
        multiple
        value={selectedMajors}
        onChange={(e) => setSelectedMajors(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setSelectedMajors(
                    selectedMajors.filter((item) => item !== value)
                  )
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {data.map((major, index) => (
          <MenuItem
            key={index}
            value={major}
            sx={{ justifyContent: "space-between" }}
          >
            {major}
            {selectedMajors.includes(major) ? <CheckIcon color="info" /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}