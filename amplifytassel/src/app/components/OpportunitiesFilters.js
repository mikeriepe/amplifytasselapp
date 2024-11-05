import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormGroup from "@mui/material/FormGroup";
import MuiBox from "@mui/material/Box";
import MuiPaper from "@mui/material/Paper";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";

const Box = styled((props) => <MuiBox {...props} />)(() => ({
  height: "auto",
  width: "360px",
}));

const Paper = styled((props) => <MuiPaper elevation={0} {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "auto",
  width: "auto",
  background: "white",
  boxShadow: "0px 4px 50px -15px rgba(0, 86, 166, 0.15)",
  border: "0.5px solid rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
}));

const BootstrapInput = styled((props) => <InputBase {...props} />)(
  ({ theme }) => ({
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "0.5px solid rgba(0, 0, 0, 0.15)",
      fontSize: "0.8rem",
      padding: "7px 26px 7px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: "Montserrat",
      "&:focus": {
        borderRadius: "10px",
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.15)",
      },
    },
  })
);

/**
 * Filters section for view opportunity
 * @return {JSX}
 */
export default function OpportunityFilters({
  locationFilter,
  setLocationFilter,
  oppTypeFilter,
  setOppTypeFilter,
  orgTypeFilter,
  setOrgTypeFilter,
}) {
  // Get filter lists from the database
  const locations = ["In-Person", "Remote", "Hybrid"];
  const [oppTypes, setOppTypes] = useState([]);
  // const [orgTypes, setOrgTypes] = useState([]);
  const [collapseLocation, setCollapseLocation] = useState(true);
  const [collapseDate, setCollapseDate] = useState(true);
  const [collapseOppType, setCollapseOppType] = useState(true);
  // const [collapseOrgType, setCollapseOrgType] = useState(true);

  const handleCheckAll = () => {
    setLocationFilter(locations);
    setOppTypeFilter(oppTypes);
    // setOrgTypeFilter(orgTypes);
  };

  const handleCheckNone = () => {
    setLocationFilter([]);
    setOppTypeFilter([]);
    // setOrgTypeFilter([]);
  };

  // Handle checkboxes for location
  const handleToggleLocation = (event) => {
    const value = event.target.value;
    setLocationFilter(value); // Directly set the selected values array
  };

  // Handle checkboxes for opp types
  const handleToggleOppType = (value) => () => {
    const currentIndex = oppTypeFilter.indexOf(value);
    const newOppFilterType = [...oppTypeFilter];

    if (currentIndex === -1) {
      newOppFilterType.push(value);
    } else {
      newOppFilterType.splice(currentIndex, 1);
    }
    setOppTypeFilter(newOppFilterType);
  };

  // Handle checkboxes for org types
  /*
  const handleToggleOrgType = (value) => () => {
    const currentIndex = orgTypeFilter.indexOf(value);
    const newOrgTypeFilter = [...orgTypeFilter];

    if (currentIndex === -1) {
      newOrgTypeFilter.push(value);
    } else {
      newOrgTypeFilter.splice(currentIndex, 1);
    }
    setOrgTypeFilter(newOrgTypeFilter);
  };
  */

  const handleCollapseLocation = () => {
    setCollapseLocation(!collapseLocation);
  };

  const handleCollapseDate = () => {
    setCollapseDate(!collapseDate);
  };

  const handleCollapseOppType = () => {
    setCollapseOppType(!collapseOppType);
  };

  /*
  const handleCollapseOrgType = () => {
    setCollapseOrgType(!collapseOrgType);
  };
  */
  /*
  const getOpportunityTypes = () => {
    fetch(`/api/getOpportunityTypes`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          const tempOppTypes = json.map((elem) => (elem.name));
          setOppTypes(tempOppTypes);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity types');
        });
  };
  */
  /*
  const getOrganizationTypes = () => {
    fetch(`/api/getOrganizationTypes`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          const tempOrgTypes = json.map((elem) => (elem.name));
          setOrgTypes(tempOrgTypes);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving organization types');
        });
  };
  */

  useEffect(() => {
    //getOpportunityTypes();
    // getOrganizationTypes();
  }, []);

  return (
    <Box>
      {/* Dropdown for Location Filters */}
      <div>
        <FormControl>
          <Select
            multiple
            displayEmpty
            value={locationFilter}
            onChange={handleToggleLocation}
            input={<BootstrapInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span>Location</span>;
              }
              return selected.join(", ");
            }}
          >
            {locations.map((location, index) => (
              <MenuItem key={`location-filter-${index}`} value={location}>
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={locationFilter.indexOf(location) !== -1}
                />
                <ListItemText primary={location} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}
