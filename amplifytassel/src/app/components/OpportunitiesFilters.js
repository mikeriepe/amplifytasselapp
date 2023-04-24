import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const Box = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  height: 'auto',
  width: '360px',
}));

const Paper = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

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
  const locations = ['In-Person', 'Remote', 'Hybrid'];
  const [oppTypes, setOppTypes] = useState([]);
  const [orgTypes, setOrgTypes] = useState([]);
  const [collapseLocation, setCollapseLocation] = useState(true);
  const [collapseOppType, setCollapseOppType] = useState(true);
  const [collapseOrgType, setCollapseOrgType] = useState(true);

  const handleCheckAll = () => {
    setLocationFilter(locations);
    setOppTypeFilter(oppTypes);
    setOrgTypeFilter(orgTypes);
  };

  const handleCheckNone = () => {
    setLocationFilter([]);
    setOppTypeFilter([]);
    setOrgTypeFilter([]);
  };

  // Handle checkboxes for location
  const handleToggleLocation = (value) => () => {
    const currentIndex = locationFilter.indexOf(value);
    const newOppFilterLocation = [...locationFilter];

    if (currentIndex === -1) {
      newOppFilterLocation.push(value);
    } else {
      newOppFilterLocation.splice(currentIndex, 1);
    }
    setLocationFilter(newOppFilterLocation);
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

  const handleCollapseLocation = () => {
    setCollapseLocation(!collapseLocation);
  };

  const handleCollapseOppType = () => {
    setCollapseOppType(!collapseOppType);
  };

  const handleCollapseOrgType = () => {
    setCollapseOrgType(!collapseOrgType);
  };

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

  useEffect(() => {
    getOpportunityTypes();
    getOrganizationTypes();
  }, []);

  return (
    <Box>
      <Paper>
        <div style={{padding: '2em 3em calc(1.5em - 0.5em) 3em'}}>
          <h4 className='text-dark'>
            Filters
          </h4>
          <div className='flex-horizontal flex-align-center text-bold'>
            <p
              className='text-blue hover-underline clickable no-highlight'
              onClick={handleCheckAll}
            >
              Select All
            </p>
            <span className='text-gray'>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            <p
              className='text-blue hover-underline clickable no-highlight'
              onClick={handleCheckNone}
            >
                Clear All
            </p>
          </div>
        </div>
        <div
          className='flex-vertical flow-small'
          style={{padding: '0 3em', paddingBottom: '2em'}}
        >
          {/* Location Filters */}
          <div className='flex-vertical flow-tiny'>
            <MuiBox
              className='
                flex-space-between
                flex-align-center
                clickable
                no-highlight
              '
              onClick={handleCollapseLocation}
            >
              <h5>Location</h5>
              {collapseLocation ?
                <ExpandLessRoundedIcon /> :
                 <ExpandMoreRoundedIcon />
              }
            </MuiBox>
            <Collapse in={collapseLocation} timeout='auto' unmountOnExit>
              <FormGroup className='flex-vertical flex-flow-small'>
                {locations.map((location, index) => (
                  <div key={`location-filter-${index}`}>
                    <FormControlLabel
                      className='no-highlight'
                      control={
                        <Checkbox
                          color='secondary'
                          size='small'
                          onChange={handleToggleLocation(location)}
                          checked={locationFilter.indexOf(location) !== -1}
                          tabIndex={-1}
                          disableRipple
                          sx={{paddingBlock: '0'}}
                        />
                      }
                      label={location}
                      componentsProps={{
                        typography: {
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--text-disabled)',
                        },
                      }}
                    />
                  </div>
                ))}
              </FormGroup>
            </Collapse>
          </div>
          {/* Opportunity Types Filters */}
          <div className='flex-vertical flow-tiny'>
            <MuiBox
              className='
                flex-space-between
                flex-align-center
                clickable
                no-highlight
              '
              onClick={handleCollapseOppType}
            >
              <h5>Opportunity Types</h5>
              {collapseOppType ?
                <ExpandLessRoundedIcon /> :
                 <ExpandMoreRoundedIcon />
              }
            </MuiBox>
            <Collapse in={collapseOppType} timeout='auto' unmountOnExit>
              <FormGroup className='flex-vertical flex-flow-small'>
                {oppTypes.map((type, index) => (
                  <div key={`opportunity-type-filter-${index}`}>
                    <FormControlLabel
                      className='no-highlight'
                      control={
                        <Checkbox
                          color='secondary'
                          size='small'
                          onChange={handleToggleOppType(type)}
                          checked={oppTypeFilter.indexOf(type) !== -1}
                          tabIndex={-1}
                          disableRipple
                          sx={{paddingBlock: '0'}}
                        />
                      }
                      label={type}
                      componentsProps={{
                        typography: {
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--text-disabled)',
                        },
                      }}
                    />
                  </div>
                ))}
              </FormGroup>
            </Collapse>
          </div>
          {/* Organization Types Filters */}
          <div className='flex-vertical flow-tiny'>
            <MuiBox
              className='
                flex-space-between
                flex-align-center
                clickable
                no-highlight
              '
              onClick={handleCollapseOrgType}
            >
              <h5>Organization Types</h5>
              {collapseOrgType ?
                <ExpandLessRoundedIcon /> :
                 <ExpandMoreRoundedIcon />
              }
            </MuiBox>
            <Collapse in={collapseOrgType} timeout='auto' unmountOnExit>
              <FormGroup className='flex-vertical flex-flow-small'>
                {orgTypes.map((type, index) => (
                  <div key={`organization-type-filter-${index}`}>
                    <FormControlLabel
                      className='no-highlight'
                      control={
                        <Checkbox
                          color='secondary'
                          size='small'
                          value={type}
                          onChange={handleToggleOrgType(type)}
                          checked={orgTypeFilter.indexOf(type) !== -1}
                          tabIndex={-1}
                          disableRipple
                          sx={{paddingBlock: '0'}}
                        />
                      }
                      label={type}
                      componentsProps={{
                        typography: {
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--text-disabled)',
                        },
                      }}
                    />
                  </div>
                ))}
              </FormGroup>
            </Collapse>
          </div>
        </div>
      </Paper>
    </Box>
  );
};
