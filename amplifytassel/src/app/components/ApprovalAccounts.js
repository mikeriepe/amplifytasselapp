import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MuiBox from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Checkbox from "@mui/material/Checkbox";
import ThemedButton from "./ThemedButton";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { profileStatusToColor } from "../util/ProfileStatus";
import CircularProgress from "@mui/material/CircularProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import "../stylesheets/ApprovalTable.css";
import { DataStore } from '@aws-amplify/datastore';
import { Profile, ChatRoom } from './../../models';
import { Storage } from 'aws-amplify';
import { findExistingInfoChatRoom, createNewChatRoom } from '../util/SocialChatRooms';
import useAuth from '../util/AuthContext';
import { sendMessage } from '../util/SocialChat';
import { List, ListItemText, ListItemButton } from "@mui/material";
import EmailDialog from "./EmailDialog";

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

const Avatar = ({ image, handleAvatarClick, profileid }, props) => (
  <MuiAvatar
    {...props}
    src={image}
    onClick={() => handleAvatarClick(profileid)}
    sx={{
      height: "2.5rem",
      width: "2.5rem",
      border: "0.5px solid rgba(0, 0, 0, 0.15)",
      marginRight: "1rem",
      ":hover": {
        cursor: "pointer",
      },
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
  const { row, handleSelect, selectAllChecked, selected } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  const downloadProfilePicture = async () => {
    if (row.picture !== null) {
      const file = await Storage.get(row.picture, {
        level: "public",
      });
      setProfilePicture(file);
    } else {
      setProfilePicture(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    }
  };

  useEffect(() => {
    downloadProfilePicture();
  }, [row]);

  function handleAvatarClick(profileid) {
    window.open(`/Profile/${profileid}`, "_blank");
    // navigate(`/Profile/${profileid}`);
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className="data-cell" padding="checkbox">
          <Checkbox
            checked={selectAllChecked || selected.includes(row.email)}
            value={row.email}
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
        <TableCell className="data-cell" component="th" scope="row">
          <div style={{ display: "flex" }}>
            <Avatar
              image={profilePicture}
              handleAvatarClick={handleAvatarClick}
              profileid={row.id}
            />
            {/* eslint-disable-next-line max-len */}
            <div className="text-center-vert">{`${row.firstName} ${row.lastName}`}</div>
          </div>
        </TableCell>
        <TableCell className="data-cell">{row.email}</TableCell>
        <TableCell className="data-cell">{row.graduationYear}</TableCell>
        <TableCell className="data-cell">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              color: profileStatusToColor(row.status),
            }}
          >
            <FiberManualRecordIcon
              sx={{
                fontSize: "1em",
                paddingTop: ".21rem",
                paddingRight: ".21rem",
              }}
            />
            <div>{row.status}</div>
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
 * creates account approval content
 * @return {HTML} account approval content
 */
export default function ApprovalAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [displayAccounts, setDisplayAccounts] = useState([]);
  const [filters, setFilters] = useState({
    admin: false,
    approved: false,
    denied: false,
    pending: false,
    search: '',
  });
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const { admin, approved, denied, pending, search } = filters;
    setDisplayAccounts(accounts.filter((account) => {
      try {
        if (search !== '') {
          let ok = false;
          [account.graduationYear, account.email, account.firstName + ' ' + account.lastName].forEach((field) => {
            if (typeof field !== 'string') return;
            if (field.toLowerCase().includes(search.toLowerCase())) ok = true;
          });
          if (!ok) return false;
        }
        if (!admin && !approved && !denied && !pending) return true;
        if (!admin && account.status === 'ADMIN') return false;
        if (!approved && account.status === 'APPROVED') return false;
        if (!denied && account.status === 'DENIED') return false;
        if (!pending && account.status === 'PENDING') return false;
        return true;
      }
      catch (error) {
        console.error(error);
        return false;
      }
    }));
  }, [accounts, filters]);

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestInfo, setRequestInfo] = useState("");
  const [sortNameOrder, setSortNameOrder] = useState("");
  const [sortEmailOrder, setSortEmailOrder] = useState("");
  const [sortYearOrder, setSortYearOrder] = useState("");
  const [sortStatusOrder, setSortStatusOrder] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const {userProfile} = useAuth();

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

  const sortAccounts = (json, sortBy, reset) => {
    if (reset === true) {
      setAccounts(
        json.sort(function (a, b) {
          return a.status > b.status ? 1 : -1;
        })
      );
      setSortStatusOrder("asc");
      return;
    }
    if (sortBy === "status") {
      if (sortStatusOrder === "") {
        setAccounts(
          json.sort(function (a, b) {
            return a.status > b.status ? 1 : -1;
          })
        );
        setSortStatusOrder("asc");
      } else if (sortStatusOrder === "asc") {
        setAccounts(
          json.sort(function (a, b) {
            return a.status > b.status ? -1 : 1;
          })
        );
        setSortStatusOrder("desc");
      } else if (sortStatusOrder === "desc") {
        setAccounts(
          json.sort(function (a, b) {
            return a.status > b.status ? 1 : -1;
          })
        );
        setSortStatusOrder("asc");
      }
    }
    if (sortBy === "name") {
      if (sortNameOrder === "") {
        setAccounts(
          json.sort(function (a, b) {
            return a.firstName > b.firstName ? 1 : -1;
          })
        );
        setSortNameOrder("asc");
      } else if (sortNameOrder === "asc") {
        setAccounts(
          json.sort(function (a, b) {
            return a.firstName > b.firstName ? -1 : 1;
          })
        );
        setSortNameOrder("desc");
      } else if (sortNameOrder === "desc") {
        setAccounts(
          json.sort(function (a, b) {
            return a.firstName > b.firstName ? 1 : -1;
          })
        );
        setSortNameOrder("asc");
      }
    }
    if (sortBy === "email") {
      if (sortEmailOrder === "") {
        setAccounts(
          json.sort(function (a, b) {
            return a.email > b.email ? 1 : -1;
          })
        );
        setSortEmailOrder("asc");
      } else if (sortEmailOrder === "asc") {
        setAccounts(
          json.sort(function (a, b) {
            return a.email > b.email ? -1 : 1;
          })
        );
        setSortEmailOrder("desc");
      } else if (sortEmailOrder === "desc") {
        setAccounts(
          json.sort(function (a, b) {
            return a.email > b.email ? 1 : -1;
          })
        );
        setSortEmailOrder("asc");
      }
    }
    if (sortBy === "year") {
      if (sortYearOrder === "") {
        setAccounts(
          json.sort(function (a, b) {
            return a.graduationYear - b.graduationYear;
          })
        );
        setSortYearOrder("asc");
      } else if (sortYearOrder === "asc") {
        setAccounts(
          json.sort(function (a, b) {
            return b.graduationYear - a.graduationYear;
          })
        );
        setSortYearOrder("desc");
      } else if (sortYearOrder === "desc") {
        setAccounts(
          json.sort(function (a, b) {
            return a.graduationYear - b.graduationYear;
          })
        );
        setSortYearOrder("asc");
      }
    }
  };

  const getAccounts = (sortBy, reset) => {
    DataStore.query(Profile)
      .then((res) => {
        // console.log('Profiles (' + res.length + '):');
        // console.log(res.map((account) => account.email));
        res.forEach((account) => {
          downloadProfilePicture(account.id, account.picture);
        });
        sortAccounts(res, sortBy, reset);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error retrieving profiles, please try again");
        console.log(err);
      });
  };

  const handleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);
    if (!selectAllChecked) {
      const newSelected = displayAccounts.map((user) => user.email);
      // console.log("handleSelectAll newSelect:", newSelected);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (event, row) => {
    if (selectAllChecked) {
      setSelected([]);
    } else {
      const email = event.target.value;
      const currentIndex = selected.indexOf(email);
      const newSelected = [...selected];

      if (currentIndex === -1) {
        newSelected.push(email);
      } else {
        newSelected.splice(currentIndex, 1);
      }
      // console.log("handleSelect newSelect:", newSelected);
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
    const profiles = selected.map((profile) => {
      // console.log("Accounts:", accounts);
      const info = accounts.find((account) => account.email === profile);
      return info;
    });
    setLoading(true);
    // eslint-disable-next-line guard-for-in
    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];
      DataStore.save(
        Profile.copyOf(profile, (updated) => {
          updated.status = status;
        })
      )
        .then(async (res) => {
        // console.log(res);
        setSelected([]);
        await new Promise(r => setTimeout(r, 300));
        getAccounts('status', true);
        // console.log(selected);
        toast.success(`Account status updated`, toastOptions);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.log ?? err.msg ?? err.name ?? err.message, toastOptions);
        // alert('Error approving profiles, please try again');
      });
    }
  };

  const handleAdminPromotion = (event) => {
    const profiles = selected.map((profile) => {
      const info = accounts.find((account) => account.email === profile);
      return info;
    });
    setLoading(true);
    // eslint-disable-next-line guard-for-in
    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];
      DataStore.save(
        Profile.copyOf(profile, (updated) => {
          updated.status = "ADMIN";
        })
      )
        .then(async (res) => {
          setSelected([]);
          await new Promise(r => setTimeout(r, 300));
          getAccounts("status", true);
          toast.success("Admin promoted successfully!", toastOptions);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.log ?? err.msg ?? err.name ?? err.message, toastOptions);
          // alert("Error creating admin, please try again");
        });
    }
  };

  const handleDialogSubmit = () => {
    const status = 'REQUESTED';
    const profiles = selected.map((email) => {
      const info = accounts.find((account) => account.email === email);
      return info;
    });

    const selectedProfileIds = profiles.map((profile) => profile.id);

    setLoading(true);
    // eslint-disable-next-line guard-for-in
    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];
      DataStore.save(
        Profile.copyOf(profile, updated => {
          updated.status = status
        }))
        .then(async (res) => {
        // console.log(res);
        setDialogOpen(false);
        getAccounts('status', true);

        // Create a new chatroom if they don't have one attached, otherwise get the existing one - can be done without a special field for the time being.
        const allChatRooms = await DataStore.query(ChatRoom);
        
        var chat = null //await findExistingInfoChatRoom(userProfile, selectedProfileIds, allChatRooms);

        if (chat === null){
          // console.log("Selected:", selected);
          chat = await createNewChatRoom(userProfile, selected);
        }

        // console.log("Chatroom:", chat.id);
        // console.log("User:", userProfile);

        // Create a new message in the chatroom with the infoRequest as text
        await sendMessage(chat.id, userProfile, requestInfo);
      })
      .catch((err) => {
        console.log(err);
        alert('Error requesting info, please try again');
      });
    }
    setRequestInfo('');
  };

  const handleSort = (rowId) => {
    setLoading(true);
    if (rowId === "name") {
      getAccounts(rowId, false);
    }
    if (rowId === "email") {
      getAccounts(rowId, false);
    }
    if (rowId === "year") {
      getAccounts(rowId, false);
    }
    if (rowId === "status") {
      getAccounts(rowId, false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAccounts("status", true);
    // eslint-disable-next-line
  }, []);

  const getArrowDirection = (row) => {
    if (row === "name") {
      return sortNameOrder;
    } else if (row === "email") {
      return sortEmailOrder;
    } else if (row === "year") {
      return sortYearOrder;
    } else if (row === "status") {
      return sortStatusOrder;
    }
  };

  // TODO: make more fancy
  // https://mui.com/material-ui/react-table/#sorting-amp-selecting
  const headCells = [
    {
      id: "name",
      disablePadding: false,
      label: "Name",
    },
    {
      id: "email",
      disablePadding: false,
      label: "Email",
    },
    {
      id: "year",
      disablePadding: false,
      label: "Grad Yr",
    },
    {
      id: "status",
      disablePadding: false,
      label: "Status",
    },
  ];

  const [profilePictures, setProfilePictures] = useState({});
  const downloadProfilePicture = async (profileId, picture) => {
    if (profilePictures[profileId]) return;
    const file = await Storage.get(picture, {
      level: "public",
    });
    setProfilePictures((prev) => ({ ...prev, [profileId]: file }));
  };

  return (
    <Page>
      <Card style={{ padding: ".5rem" }}>
        <Toolbar>
          <Box
            aria-label="Account Actions"
            flex={1}
            flexDirection='row'
            style={{
              marginRight: "1rem"
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
            <EmailDialog
              emails={selected}
              accounts={accounts}
              profilePictures={profilePictures}
              open={dialogOpen}
              setClose={handleDialogClose}
            />
            {/*
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
            */}
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
            <ThemedButton
              color={"yellow"}
              variant={"gradient"}
              type={"submit"}
              style={{
                fontSize: "0.875rem",
                marginRight: ".5rem",
              }}
              onClick={handleAdminPromotion}
            >
              Promote Admin
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
                            onChange={(event) => setFilters({...filters, admin: event.target.checked})}
                            checked={filters.admin}
                            tabIndex={-1}
                            disableRipple
                            sx={{paddingBlock: '1px'}}

                          />
                        }
                        label={'Admin'}
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
            <TableHead aria-label="Accounts Table Head">
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    color='primary'
                    data-testid="account-checkbox"
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  // inputProps={{
                  //   'aria-label': 'select all desserts',
                  // }}
                  /> */}
                  <Checkbox
                    checked={selectAllChecked}
                    onChange={handleSelectAll}
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
                      // onClick={handleSort(headCell.id)}
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
            <TableBody aria-label="Accounts Table Body">
              {displayAccounts.map((account) => {
                return (
                  <Row
                    key={account.id}
                    row={account}
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
