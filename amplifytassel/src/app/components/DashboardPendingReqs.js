import React, {useEffect, useState} from 'react';
import MuiBox from '@mui/material/Box';
import useAuth from '../util/AuthContext';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DashboardPendingOppCard from './DashboardPendingOppCard';
import DashboardPendingReqCard from './DashboardPendingReqCard';
import TablePagination from '@mui/material/TablePagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import { DataStore } from '@aws-amplify/datastore';
import { Opportunity } from './../../models';

const PendingSection = ({children}, props) => (
  <MuiBox className='grid-flow-large'
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: '3em',
      marginRight: '3em',
      height: '100%',
      width: 'calc(100% - 2.3em)',
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const Text = ({children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'left',
      height: '100%',
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

/**
 * creates Dashboard upcoming events section
 * @return {HTML} Dashboard upcoming events component
 */
export default function DashboardPendingReqs({
  createdOpps,
  getCreatedOpportunities,
}) {
  const {userProfile} = useAuth();
  const [pendingOpps, setPendingOpps] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedReq, setSelectedReq] = useState('Incoming Requests');
  // set this value to change rows per pending requests page
  const rowsPerPage = 3;
  const handleChangeSelected = (event) => {
    setSelectedReq(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getPendingOpportunities = () => {
    DataStore.query(Opportunity, (o) => o.and(o => [
          o.Requests.profileID.eq(userProfile.id),
          o.Requests.status.eq('PENDING')
        ]))
        .then((res) => {
          const pendingOpps = [];
          for (let i = 0; i < res.length; i++) {
            const p = Promise.resolve(res[i].Requests.values);
            p.then(value => {
              for (let j = 0; j < value.length; j++) {
                if (value[j].profileID === userProfile.id && value[j].status === 'PENDING') {
                  pendingOpps.push(res[i]);
                }
              }
            });
          }
          setPendingOpps(pendingOpps);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving pending opportunities');
        });
  };

  useEffect(() => {
    getCreatedOpportunities();
    getPendingOpportunities();
  }, []);

  let emptyCreatedRows = 0;
  let emptyPendingRows = 0;
  // if the user is on the last page
  if (Math.floor(createdOpps.length / rowsPerPage) === page) {
    emptyCreatedRows = rowsPerPage - (createdOpps.length % rowsPerPage);
  }
  if (Math.floor(pendingOpps.length / rowsPerPage) === page) {
    emptyPendingRows = rowsPerPage - (pendingOpps.length % rowsPerPage);
  }
  return (
    <PendingSection>
      <Text>
        <h2 className='text-dark ellipsis text-medium' aria-label='Dashboard Pending Title'>
          Pending Requests
        </h2>
      </Text>
      <Paper
        elevation={0}
        sx={{
          width: 'auto',
          mt: '1em',
          boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
          borderRadius: '10px',
        }}
      >
        <div
          className='flex-horizontal flex-align-center flex-flow-large'
          style={{justifyContent: 'space-between'}}
          aria-label='Dashboard Pending Dropdown'
        >
          <Box sx={{minWidth: 120}}>
            <FormControl
              variant="standard"
              style={{padding: '1em'}}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedReq}
                label="Selected Requests Page"
                onChange={handleChangeSelected}
              >
                <MenuItem
                  value={'Incoming Requests'}
                >
                    Incoming Requests
                </MenuItem>
                <MenuItem
                  value={'Outgoing Requests'}
                >
                  Outgoing Requests
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TablePagination
            component='div'
            count={selectedReq === 'Incoming Requests' ?
                createdOpps.length : pendingOpps.length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[]}
          />
        </div>
        <TableContainer>
          <Table>
            <TableBody>
              {selectedReq === 'Incoming Requests' && createdOpps
                  .slice()
                  .sort((a, b) => a.eventName.localeCompare(b.eventName))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((opp, index) => {
                    return (
                      <DashboardPendingOppCard
                        key={`opportunity-${index}`}
                        opportunity={opp}
                      />
                    );
                  })
              }
              {selectedReq === 'Incoming Requests' && emptyCreatedRows > 0 && (
                <TableRow style={{height: 95 * emptyCreatedRows}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {selectedReq === 'Outgoing Requests' && pendingOpps
                  .slice()
                  .sort((a, b) => a.eventName.localeCompare(b.eventName))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((opp, index) => {
                    return (
                      <DashboardPendingReqCard
                        key={`opportunity-${index}`}
                        opportunity={opp}
                      />
                    );
                  })
              }
              {selectedReq === 'Outgoing Requests' && emptyPendingRows > 0 && (
                <TableRow style={{height: 95 * emptyPendingRows}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </PendingSection>
  );
}
