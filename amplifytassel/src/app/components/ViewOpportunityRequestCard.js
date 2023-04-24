import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import MuiAvatar from '@mui/material/Avatar';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Avatar = ({image}, props) => (
  <MuiAvatar sx={{height: '30px', width: '30px'}} src={image} {...props} />
);

/**
 * @return {JSX}
 */
export default function ViewOpportunityRequestCard({
  request,
  requester,
  getRequester,
  isItemSelected,
  labelId,
  handleClick,
}) {
  useEffect(() => {
    getRequester(request.requester);
  }, []);

  const formatDate = (date) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const convertDate = new Date(date).toLocaleDateString([], dateOptions);
    const convertTime = new Date(date).toLocaleTimeString([], timeOptions);

    return `${convertDate} at ${convertTime}`;
  };

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, request.requester)}
      role='checkbox'
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          color='primary'
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      <TableCell
        component='th'
        id={labelId}
        scope='row'
        padding='none'
      >
        <div className='flex-horizontal flex-align-center flex-flow-large'>
          <Avatar />
          <p>{`${requester?.firstname} ${requester?.lastname}`}</p>
        </div>
      </TableCell>
      <TableCell align='left'>
        <p>{/* request.role not implemented yet */}None</p>
      </TableCell>
      <TableCell align='left'>
        <p>{formatDate(request.requestdatetime)}</p>
      </TableCell>
      <TableCell align='left'>
        <Chip
          label={request.status}
          variant='outlined'
          color={
            request.status === 'Approved' ? 'success' :
            request.status === 'Denied' ? 'error' :
            request.status === 'Pending' ? 'secondary' :
            'primary'
          }
          size='small'
          icon={
            <Box
              style={{
                marginLeft: '10px',
                height: '6px',
                width: '6px',
                background:
                request.status === 'Approved' ? 'var(--success-green-main)' :
                request.status === 'Denied' ? 'var(--error-red-main)' :
                request.status === 'Pending' ? 'var(--secondary-yellow-main)' :
                'var(--primary-blue-main)',
                borderRadius: '50%',
              }}
            />
          }
        />
      </TableCell>
    </TableRow>
  );
}
