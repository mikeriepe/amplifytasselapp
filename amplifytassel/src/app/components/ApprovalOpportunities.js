import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MuiPaper from "@mui/material/Paper";
import MuiAvatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import FilterListIcon from '@mui/icons-material/FilterList';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MuiBox from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ThemedButton from "./ThemedButton";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  opportunityStatusToText,
  opportunityStatusToColor,
} from "../util/OpportunityStatus";
import CircularProgress from "@mui/material/CircularProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import "../stylesheets/ApprovalTable.css";

import { DataStore, Storage } from "aws-amplify";
import { Opportunity, Profile, ChatRoom } from "./../../models";
import {
  createNewChatRoom,
  findExistingInfoChatRoom,
} from "../util/SocialChatRooms";
import { sendMessage } from "../util/SocialChat";
import useAuth from "../util/AuthContext";
import moment from "moment";

const Page = styled((props) => <Box {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  height: "auto",
  width: "auto",
  marginInline: "3em",
  marginBlock: "1em",
}));

const Card = styled((props) => <MuiPaper elevation={0} {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "1.5em 2em 1.5em 2em",
  height: "auto",
  width: "auto",
  background: "white",
  boxShadow: "0px 4px 50px -15px rgba(0, 86, 166, 0.15)",
  border: "0.5px solid rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
}));

const Avatar = ({ image }, props) => (
  <MuiAvatar
    {...props}
    src={image}
    sx={{
      height: "2.5rem",
      width: "2.5rem",
      border: "0.5px solid rgba(0, 0, 0, 0.15)",
      marginRight: "1rem",
    }}
  />
);

const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

/**
 * row for account table
 * @param {*} props
 * @return {*} row object
 */
function Row(props) {
  const { row, handleSelect, profile, selectAllChecked, selected } = props;
  const [open, setOpen] = useState(false);

  const [banner, setBanner] = useState(null);

  const downloadFile = async () => {
    const img = await Storage.get(row.bannerKey, {
      level: "public",
    });
    setBanner(img);
  };

  useEffect(() => {
    downloadFile();
  }, []);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className="data-cell" padding="checkbox">
          <Checkbox
            checked={selectAllChecked || selected.includes(row.id)}
            value={row.id}
            onChange={(event) => handleSelect(event, row)}
          />
        </TableCell>
        {/* This is a button to drop down additional info about a user. */}
        {/* To re-enable, uncomment this and the commented-out <TableCell /> component in the Table Head. */}
        {/* <TableCell className="data-cell" padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        {/* eslint-disable-next-line max-len */}
        <TableCell className="data-cell" scope="row">
          <div style={{ display: "flex" }}>
            <Avatar image={banner} />
            {/* eslint-disable-next-line max-len */}
            <div className="text-center-vert">{`${row.eventName}`}</div>
          </div>
        </TableCell>
        <TableCell className="data-cell">{row.description}</TableCell>
        <TableCell className="data-cell">
          {moment(row.startTime).format('MMMM Do YYYY, h:mm a')}
        </TableCell>
        <TableCell className="data-cell">
          {moment.duration(moment(row.startTime).diff(row.endTime)).humanize()}
        </TableCell>
        <TableCell className="data-cell" component="th" scope="row">
          <div style={{ display: "flex" }}>
            <Avatar image={profile?.profilePicture} />
            {/* eslint-disable-next-line max-len */}
            <div className="text-center-vert">{`${profile?.firstName} ${profile?.lastName}`}</div>
          </div>
        </TableCell>
        <TableCell className="data-cell">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              color: opportunityStatusToColor(row.status),
            }}
          >
            <FiberManualRecordIcon
              sx={{
                fontSize: "1em",
                paddingTop: ".21rem",
                paddingRight: ".21rem",
              }}
            />
            <div>{opportunityStatusToText(row.status)}</div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h1" component="div">
                More Information
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/**
 * creates opportunity approval content
 * @return {HTML} opportunity approval content
 */
export default function ApprovalOpportunities() {
  const [opps, setOpps] = useState([]);
  const [displayOpps, setDisplayOpps] = useState([]);
  const [filters, setFilters] = useState({
    approved: false,
    denied: false,
    pending: false,
    showPast: false,
    search: ''
  });
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const { approved, denied, pending, showPast, search } = filters;
    setDisplayOpps(opps.filter((opportunity) => {
      try {
        if (search !== '') {
          let ok = false;
          [opportunity.eventName, opportunity.description].forEach((field) => {
            if (typeof field !== 'string') return;
            if (field.toLowerCase().includes(search.toLowerCase())) ok = true;
          });
          if (!ok) return false;
        }
        if (!showPast && moment(opportunity.endTime).isBefore(moment())) return false;
        if (!approved && !denied && !pending) return true;
        if (!approved && opportunity.status === 'APPROVED') return false;
        if (!denied && opportunity.status === 'DENIED') return false;
        if (!pending && opportunity.status === 'PENDING') return false;
        return true;
      }
      catch (error) {
        console.error(error);
        return false;
      }
    }));
  }, [opps, filters]);

  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestInfo, setRequestInfo] = useState("");
  const [sortTitleOrder, setSortTitleOrder] = useState("");
  const [sortDescriptionOrder, setSortDescriptionOrder] = useState("");
  const [sortCreatorOrder, setSortCreatorOrder] = useState("");
  const [sortDateOrder, setSortDateOrder] = useState('');
  const [sortDurationOrder, setSortDurationOrder] = useState('');
  const [sortStatusOrder, setSortStatusOrder] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const { userProfile } = useAuth();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleRequestInfo = (e) => {
    setRequestInfo(e.target.value);
    console.log(e.target.value);
  };

  const handleDialogSubmit = () => {
    const opportunities = selected.map((oppId) =>
      opps.find((opp) => opp.id === oppId)
    );

    opportunities.forEach((opportunity) => {
      const posterProfileID = opportunity.profileID;

      // Set opportunities to REQUESTED
      DataStore.save(
        Opportunity.copyOf(opportunity, (updatedOpportunity) => {
          updatedOpportunity.status = "REQUESTED";
        })
      )
        .then(async (res) => {
          // Create a chatroom with its poster or identify with only the admin and the poster
          const allChatRooms = await DataStore.query(ChatRoom);

          var chat = await findExistingInfoChatRoom(
            userProfile,
            [posterProfileID],
            allChatRooms
          );

          if (chat === null) {
            chat = await createNewChatRoom(userProfile, [posterProfileID]);
          }

          // Send info request as message
          await sendMessage(
            chat.id,
            userProfile,
            `Admin ${userProfile.firstName} ${userProfile.lastName} is requesting some information about your opportunity "${opportunity.eventName}": \n${requestInfo}`
          );
        })
        .catch((err) => {
          console.log("Error requesting info:", err);
          alert("Error requesting info, please try again.");
        });
    });

    // Include link to the particular opportunity in the message (in case one poster has many opportunities).

    setRequestInfo("");
    setDialogOpen(false);
  };

  const sortOpps = (json, sortBy, reset) => {
    if (reset === true) {
      setOpps(
        json.sort(function (a, b) {
          /* eslint-disable-next-line max-len */
          return opportunityStatusToText(a.status) >
            opportunityStatusToText(b.status)
            ? -1
            : 1;
        })
      );
      setSortStatusOrder("asc");
      return;
    }
    if (sortBy === "status") {
      if (sortStatusOrder === "") {
        setOpps(
          json.sort(function (a, b) {
            /* eslint-disable-next-line max-len */
            return opportunityStatusToText(a.status) >
              opportunityStatusToText(b.status)
              ? -1
              : 1;
          })
        );
        setSortStatusOrder("asc");
      } else if (sortStatusOrder === "asc") {
        setOpps(
          json.sort(function (a, b) {
            /* eslint-disable-next-line max-len */
            return opportunityStatusToText(a.status) >
              opportunityStatusToText(b.status)
              ? 1
              : -1;
          })
        );
        setSortStatusOrder("desc");
      } else if (sortStatusOrder === "desc") {
        setOpps(
          json.sort(function (a, b) {
            /* eslint-disable-next-line max-len */
            return opportunityStatusToText(a.status) >
              opportunityStatusToText(b.status)
              ? -1
              : 1;
          })
        );
        setSortStatusOrder("asc");
      }
    }
    if (sortBy === "title") {
      if (sortTitleOrder === "") {
        setOpps(
          json.sort(function (a, b) {
            return a.eventName > b.eventName ? 1 : -1;
          })
        );
        setSortTitleOrder("asc");
      } else if (sortTitleOrder === "asc") {
        setOpps(
          json.sort(function (a, b) {
            return a.eventName > b.eventName ? -1 : 1;
          })
        );
        setSortTitleOrder("desc");
      } else if (sortTitleOrder === "desc") {
        setOpps(
          json.sort(function (a, b) {
            return a.eventName > b.eventName ? 1 : -1;
          })
        );
        setSortTitleOrder("asc");
      }
    }
    if (sortBy === "description") {
      if (sortDescriptionOrder === "") {
        setOpps(
          json.sort(function (a, b) {
            return a.description > b.description ? 1 : -1;
          })
        );
        setSortDescriptionOrder("asc");
      } else if (sortDescriptionOrder === "asc") {
        setOpps(
          json.sort(function (a, b) {
            return a.description > b.description ? -1 : 1;
          })
        );
        setSortDescriptionOrder("desc");
      } else if (sortDescriptionOrder === "desc") {
        setOpps(
          json.sort(function (a, b) {
            return a.description > b.description ? 1 : -1;
          })
        );
        setSortDescriptionOrder("asc");
      }
    }
    if (sortBy === "creator") {
      if (sortCreatorOrder === "") {
        setOpps(
          json.sort(function (a, b) {
            const first = profiles.find(
              (profile) => profile.id === a.profileID
            );
            const second = profiles.find(
              (profile) => profile.id === b.profileID
            );
            return first.firstName > second.firstName ? 1 : -1;
          })
        );
        setSortCreatorOrder("asc");
      } else if (sortCreatorOrder === "asc") {
        setOpps(
          json.sort(function (a, b) {
            const first = profiles.find(
              (profile) => profile.id === a.profileID
            );
            const second = profiles.find(
              (profile) => profile.id === b.profileID
            );
            return first.firstName > second.firstName ? -1 : 1;
          })
        );
        setSortCreatorOrder("desc");
      } else if (sortCreatorOrder === "desc") {
        setOpps(
          json.sort(function (a, b) {
            const first = profiles.find(
              (profile) => profile.id === a.profileID
            );
            const second = profiles.find(
              (profile) => profile.id === b.profileID
            );
            return first.firstName > second.firstName ? 1 : -1;
          })
        );
        setSortCreatorOrder("asc");
      }
    }
    if (sortBy === 'date') {
      if (sortDateOrder === '') {
        setOpps(
          json.sort(function (a, b) {
            return moment(a.startTime).isBefore(moment(b.startTime)) ? 1 : -1;
          })
        );
        setSortDateOrder('asc');
      } else {
        setOpps(
          json.sort(function (a, b) {
            return moment(a.startTime).isBefore(moment(b.startTime)) ? -1 : 1;
          })
        );
        setSortDateOrder('');
      }
    }
    if (sortBy === 'duration') {
      if (sortDurationOrder === '') {
        setOpps(
          json.sort(function (a, b) {
            return moment.duration(moment(a.startTime).diff(a.endTime)).asSeconds() > moment.duration(moment(b.startTime).diff(b.endTime)).asSeconds() ? 1 : -1;
          })
        );
        setSortDurationOrder('asc');
      } else {
        setOpps(
          json.sort(function (a, b) {
            return moment.duration(moment(a.startTime).diff(a.endTime)).asSeconds() > moment.duration(moment(b.startTime).diff(b.endTime)).asSeconds() ? -1 : 1;
          })
        );
        setSortDurationOrder('');
      }
    }
  };

  const getOpps = (sortBy, reset) => {
    DataStore.query(Opportunity)
      .then((res) => {
        sortOpps(res, sortBy, reset);
        // console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving opportunities, please try again");
      });
  };

  const getProfiles = () => {
    DataStore.query(Profile)
      .then((res) => {
        setProfiles(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving profile, please try again");
      });
  };

  const handleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);
    if (!selectAllChecked) {
      const newSelected = displayOpps.map((opps) => opps.id);
      console.log(newSelected);
      setSelected(newSelected);
    } else {
      setSelected([]);
      console.log(selected);
    }
  };

  const handleSelect = (event) => {
    if (selectAllChecked) {
      setSelected([]);
    } else {
      const eventname = event.target.value;
      const currentIndex = selected.indexOf(eventname);
      const newSelected = [...selected];

      if (currentIndex === -1) {
        newSelected.push(eventname);
      } else {
        newSelected.splice(currentIndex, 1);
      }
      console.log(newSelected);
      setSelected(newSelected);
    }
  };

  const handleStatusAction = (event) => {
    if (selected.length === 0) {
      toast.error("Select at least one user to approve or deny.");
      return;
    }

    let status = 1;
    switch (event.target.textContent) {
      case "Approve":
        status = "APPROVED";
        break;
      case "Request More Info":
        status = "REQUESTED";
        break;
      case "Deny":
        status = "DENIED";
        break;
      default:
        status = "PENDING";
        break;
    }
    const opportunities = selected.map((opportunity) => {
      const info = opps.find((opp) => opp.id === opportunity);
      return info;
    });
    setLoading(true);
    // eslint-disable-next-line guard-for-in
    for (let index = 0; index < opportunities.length; index++) {
      const opp = opportunities[index];
      console.log(`saving opportunity ${opp.eventName} as status ${status}`);
      DataStore.save(
        Opportunity.copyOf(opp, (updated) => {
          updated.status = status;
        })
      )
        .then(async (res) => {
          setSelected([]);
          getProfiles();
          await new Promise(r => setTimeout(r, 1000));
          getOpps("status", true);
          toast.success(`Opportunity status updated`, toastOptions);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.log ?? err.msg ?? err.name ?? err.message, toastOptions);
          // alert("Error approving opportunity, please try again");
        });
    }
  };

  useEffect(() => {
    getProfiles();
    getOpps("status", true);
    // eslint-disable-next-line
  }, []);

  const handleSort = (rowId) => {
    setLoading(true);
    if (rowId === "title") {
      getOpps(rowId, false);
    }
    if (rowId === "description") {
      getOpps(rowId, false);
    }
    if (rowId === "creator") {
      // getOpps(rowId, false);
    }
    if (rowId === "status") {
      getOpps(rowId, false);
    }
    if (rowId === 'date') {
      getOpps(rowId, false);
    }
    if (rowId === 'duration') {
      getOpps(rowId, false);
    }
    setLoading(false);
  };

  const getArrowDirection = (row) => {
    if (row === "title") {
      return sortTitleOrder;
    } else if (row === "description") {
      return sortDescriptionOrder;
    } else if (row === "creator") {
      return sortCreatorOrder;
    } else if (row === "status") {
      return sortStatusOrder;
    } else if (row === 'date') {
      return sortDateOrder;
    } else if (row === 'duration') {
      return sortDurationOrder;
    }
  };

  // TODO: make more fancy
  // https://mui.com/material-ui/react-table/#sorting-amp-selecting
  const headCells = [
    {
      id: "title",
      disablePadding: false,
      label: "Opportunity",
    },
    {
      id: "description",
      disablePadding: false,
      label: "Description",
    },
    {
      id: "date",
      disablePadding: false,
      label: "Start Date",
    },
    {
      id: "duration",
      disablePadding: false,
      label: "Duration",
    },
    {
      id: "creator",
      disablePadding: false,
      label: "Creator",
    },
    {
      id: "status",
      disablePadding: false,
      label: "Status",
    },
  ];

  return (
    <Page>
      <Card style={{ padding: ".5rem" }}>
        <Toolbar>
          <Box
            aria-label="Opportunity Actions"
            flex={1}
            flexDirection='row'
            style={{
              marginRight: "1rem",
            }}
          >
            <ThemedButton
              color={"green"}
              variant={"gradient"}
              type={"submit"}
              style={{
                fontSize: "0.875rem",
                marginRight: ".5rem",
              }}
              onClick={handleStatusAction}
            >
              Approve
            </ThemedButton>
            <ThemedButton
              color={"blue"}
              variant={"themed"}
              type={"submit"}
              style={{
                fontSize: "0.875rem",
                marginRight: ".5rem",
              }}
              onClick={handleDialogOpen}
            >
              Request More Info
            </ThemedButton>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Request More Info</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Describe what other information you would like to get from the
                  selected users.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Information"
                  type="text"
                  fullWidth
                  variant="standard"
                  onBlur={handleRequestInfo}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleDialogSubmit}>Send Requests</Button>
              </DialogActions>
            </Dialog>
            <ThemedButton
              color={"gray"}
              variant={"themed"}
              type={"submit"}
              style={{
                fontSize: "0.875rem",
                marginRight: ".5rem",
              }}
              onClick={handleStatusAction}
            >
              Deny
            </ThemedButton>
            <TextField
              placeholder='Search'
              size='small'
              onChange={(e) => setFilters({...filters, search: e.target.value})}
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
          </Box>

          <>
            <MuiPaper
              sx={{paddingLeft: '8px', height: openFilter ? undefined : '0px'}}
            >
              <MuiBox
                className='
                flex-space-between
                flex-align-center
                clickable
                no-highlight
                '
              >
                <div className='flex-horizontal flow-tiny'>
                  <Collapse in={openFilter} timeout='auto' unmountOnExit>
                    <FormGroup
                      className='flex-horizontal flex-flow-small'
                      sx={{paddingBlock: '8px'}}
                    >
                      <FormControlLabel
                        className='no-highlight'
                        control={
                          <Checkbox
                            color='secondary'
                            size='small'
                            onChange={(event) => {
                              setFilters({...filters, approved: event.target.checked});
                            }}
                            checked={filters.approved}
                            tabIndex={-1}
                            disableRipple
                            sx={{paddingBlock: '1px'}}
                          />
                        }
                        label={'Approved'}
                        componentsProps={{
                          typography: {
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: 'var(--text-disabled)',
                          },
                        }}
                      />
                      <FormControlLabel
                        className='no-highlight'
                        control={
                          <Checkbox
                            color='secondary'
                            size='small'
                            onChange={(event) => {
                              setFilters({...filters, denied: event.target.checked});
                            }}
                            checked={filters.denied}
                            tabIndex={-1}
                            disableRipple
                            sx={{paddingBlock: '1px'}}
                          />
                        }
                        label={'Denied'}
                        componentsProps={{
                          typography: {
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: 'var(--text-disabled)',
                          },
                        }}
                      />
                      <FormControlLabel
                        className='no-highlight'
                        control={
                          <Checkbox
                            color='secondary'
                            size='small'
                            onChange={(event) => {
                              setFilters({...filters, pending: event.target.checked});
                            }}
                            checked={filters.pending}
                            tabIndex={-1}
                            disableRipple
                            sx={{paddingBlock: '1px'}}
                          />
                        }
                        label={'Pending'}
                        componentsProps={{
                          typography: {
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: 'var(--text-disabled)',
                          },
                        }}
                      />
                      <FormControlLabel
                        className='no-highlight'
                        control={
                          <Checkbox
                            color='secondary'
                            size='small'
                            onChange={(event) => {
                              setFilters({...filters, showPast: event.target.checked});
                            }}
                            checked={filters.showPast}
                            tabIndex={-1}
                            disableRipple
                            sx={{paddingBlock: '1px'}}
                          />
                        }
                        label={'Show Completed Opportunities'}
                        componentsProps={{
                          typography: {
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: 'var(--text-disabled)',
                          },
                        }}
                      />
                    </FormGroup>
                  </Collapse>
                </div>
              </MuiBox>
            </MuiPaper>
            <Tooltip
              title='Filter list'
              flex={0}
            >
              <IconButton onClick={() => setOpenFilter(!openFilter)}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </>

        </Toolbar>
      </Card>
      <Card>
        {loading ? (
          <Box sx={{ display: "flex" }} style={{ padding: "2rem" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table
            style={{
              backgroundColor: "white",
            }}
          >
            <TableHead aria-label="Opportunities Table Head">
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectAllChecked}
                    onChange={handleSelectAll}
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    // onChange={onSelectAllClick}
                    // inputProps={{
                    //   'aria-label': 'select all desserts',
                    // }}
                  />
                </TableCell>
                {/* This is the Column header for a dropdown icon next to each profile. */}
                {/* To re-enable, uncomment this and the commented-out TableCell in the Row component. */}
                {/* <TableCell padding="checkbox" /> */}
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    padding={headCell.disablePadding ? "none" : "normal"}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    id="table-head-cell"
                    onClick={() => handleSort(headCell.id)}
                  >
                    <TableSortLabel
                      // active={orderBy === headCell.id}
                      // direction={orderBy === headCell.id ? order : 'asc'}
                      // onClick={createSortHandler(headCell.id)}
                      /* eslint-disable-next-line max-len */
                      direction={
                        getArrowDirection(headCell.id) !== ""
                          ? getArrowDirection(headCell.id)
                          : "desc"
                      }
                    >
                      {headCell.label}
                      {/* {orderBy === headCell.id ? (
                      <Box component='span' sx={visuallyHidden}>
                        {order === 'desc' ?
                        'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null} */}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody aria-label="Opportunities Table Body">
              {displayOpps.map((opp) => {
                return (
                  <Row
                    key={opp.id}
                    row={opp}
                    profile={profiles.find(
                      (profile) => profile.id === opp.profileID
                    )}
                    handleSelect={handleSelect}
                    selectAllChecked={selectAllChecked}
                    selected={selected}
                  />
                );
              })}
            </TableBody>
            {/* TODO: footer with pagination and number selected */}
            {/* <TableFooter>
            <div
              style={{
                position: 'absolute',
                padding: '1rem',
                fontSize: '0.875rem',
                color: 'primary',
              }}
            >
              0 rows selected
            </div>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                colSpan={12}
                count={50}
                rowsPerPage={5}
                page={0}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter> */}
          </Table>
        )}
      </Card>
    </Page>
  );
}
