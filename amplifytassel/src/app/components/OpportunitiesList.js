import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import MuiBox from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import OpportunitiesCard from './OpportunitiesCard';
import OpportunitiesFilters from './OpportunitiesFilters';
import ThemedDropdown from './ThemedDropdown';

const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  gap: '1em',
  height: 'auto',
  width: 'auto',
  marginInline: '3em',
  marginBlock: '1em',
}));

/**
 * Creates list of opportunities
 * @param {Object} opportunities
 * @return {JSX}
 */
export default function OpportunitiesList({
  type,
  opportunities,
  locationFilter,
  setLocationFilter,
  oppTypeFilter,
  setOppTypeFilter,
  orgTypeFilter,
  setOrgTypeFilter,
}) {
  const [displayOpps, setDisplayOpps] = useState([]);

  // Component first renders
  useEffect(() => {
    setDisplayOpps(opportunities);
  }, [opportunities]);

  // Update displayed opportunities when filters are updated
  useEffect(() => {
    applyFilters();
  }, [locationFilter, oppTypeFilter, orgTypeFilter]);

  const applyFilters = () => {
    // Set all filters to lowercase for comparison
    const locationFilterLower = locationFilter.map((filter) => {
      return filter.toLowerCase();
    });

    const oppTypeFilterLower = oppTypeFilter.map((filter) => {
      return filter.toLowerCase();
    });

    const orgTypeFilterLower = orgTypeFilter.map((filter) => {
      return filter.toLowerCase();
    });

    // Filter opportunities and store in displayOpps
    const copyOpps = opportunities.filter((opp) => {
      const location = locationFilterLower.length == 0 ?
        true :
        opp.locationtype ?
        locationFilterLower.indexOf(opp.locationtype.toLowerCase()) > -1 :
        false;
      const oppType = oppTypeFilter.length == 0 ?
        true :
        opp.opportunitytype ?
        oppTypeFilterLower.indexOf(opp.opportunitytype.toLowerCase()) > -1 :
        false;
      const orgType = orgTypeFilter.length == 0 ?
        true :
        opp.organizationtype ?
        orgTypeFilterLower.indexOf(opp.organizationtype.toLowerCase()) > -1 :
        false;

      return location && oppType && orgType;
    });

    setDisplayOpps(copyOpps);
  };

  return (
    <Page>
      <MuiBox className='flow-small' sx={{flexGrow: 1}}>
        <div
          className='flex-horizontal flex-space-between'
          style={{width: '100%', marginBottom: '1em'}}
        >
          <TextField
            placeholder='Search'
            size='small'
            InputProps={{
              style: {
                fontSize: '0.9rem',
                backgroundColor: 'white',
                borderRadius: '10px',
              },
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchRoundedIcon color='tertiary' />
                </InputAdornment>
              ),
            }}
            sx={{
              'width': 'auto',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.15)',
                },
              },
            }}
          />
          <ThemedDropdown menuItems={['Recommended', 'Alphabet', 'Major']} />
        </div>
        {displayOpps.map((opportunity, index) => (
          <OpportunitiesCard
            key={`opportunity-${index}`}
            type={type}
            opportunity={opportunity}
          />
        ))}
      </MuiBox>
      <OpportunitiesFilters
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        oppTypeFilter={oppTypeFilter}
        setOppTypeFilter={setOppTypeFilter}
        orgTypeFilter={orgTypeFilter}
        setOrgTypeFilter={setOrgTypeFilter}
      />
    </Page>
  );
}
