import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiPaper from "@mui/material/Paper";
import MuiAvatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import useAuth from "../../util/AuthContext";
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
import InputAdornment from "@mui/material/InputAdornment";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import ThemedButton from "../Themed/ThemedButton";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { profileStatusToColor } from "../../util/ProfileStatus";
import CircularProgress from "@mui/material/CircularProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import Fuse from "fuse.js";
import "../../stylesheets/ApprovalTable.css";

import { DataStore } from "@aws-amplify/datastore";
import { FriendRequest, Profile, Friend } from "../../../models";
import { Storage } from "aws-amplify";

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
    navigate(`/Profile/${profileid}`);
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
        <TableCell className="data-cell" padding="checkbox"></TableCell>
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
export default function SocialUsers() {
  const { userProfile } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const getAccounts = (sortBy, reset) => {
    DataStore.query(Profile)
      .then((res) => {
        setAccounts(res);
        initializeSocial(res);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error retrieving profiles, please try again");
        console.log(err);
      });
  };

  const initializeSocial = (accounts) => {
    var tempResult = [];
    accounts.forEach((account) => {
      if (account.status == "ADMIN" || account.status == "APPROVED") {
        if (account.id !== userProfile.id) {
          tempResult.push(account);
        }
      }
    });
    itemsToRemove(tempResult);
  };

  // Top of page master check box select all
  const handleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);
    if (!selectAllChecked) {
      const newSelected = displayUsers.map((user) => user.email);
      console.log(newSelected);
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
      console.log(newSelected);
      setSelected(newSelected);
    }
  };

  const handleFriendRequestAction = async (event) => {
    if (selected.length === 0) {
      toast.error("Select at least one user to send friend requests.");
      return;
    }
    try {
      const toProfileIDs = [];
      for (const email of selected) {
        const matchingProfile = accounts.find(
          (profile) => profile.email === email
        );
        if (matchingProfile) {
          toProfileIDs.push(matchingProfile.id);
        }
      }
      for (const toProfileID of toProfileIDs) {
        try {
          console.log("toProfileID", toProfileID);
          await DataStore.save(
            new FriendRequest({
              Sender: userProfile.id, // user's profile
              Receiver: toProfileID, // The ID of the recipient's profile
            })
          );
          console.log("Friend Request sent successfully");
          // Clear the selected users after sending requests
          setSelected([]);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          console.log("error on adding friendreq");
        }
      }
    } catch (error) {
      console.error("Error sending friend requests:", error);
      toast.error("An error occurred while sending friend requests.");
    }
  };

  const itemsToRemove = (tempResult) => {
    const itemsToRemove = [];
    tempResult.forEach(async (item) => {
      try {
        const friendRequests = await DataStore.query(FriendRequest, (c) =>
          c.and((c) => [c.Sender.eq(userProfile.id), c.Receiver.eq(item.id)])
        );
        const friends1 = await DataStore.query(Friend, (f) =>
          f.Friend.eq(userProfile.id)
        );
        const friends2 = await DataStore.query(Friend, (f) =>
          f.profileID.eq(userProfile.id)
        );

        // // If there are matching Friends, mark the item for removals
        friends1.forEach((item) => {
          itemsToRemove.push(item.profileID);
        });

        friends2.forEach((item) => {
          itemsToRemove.push(item.Friend);
        });

        console.log("items to remove", itemsToRemove);
        console.log("tempResult", tempResult);
        console.log(tempResult);
        console.log(itemsToRemove.length);

        // filtering out matching results from query
        const filteredResult = tempResult.filter(
          (item) => !itemsToRemove.includes(item.id)
        );
        console.log("filteredResults", filteredResult);
        setDisplayUsers(filteredResult);
      } catch (error) {
        console.error("Error querying FriendRequests:", error);
      }
    });
  };

  // Taken from Approvals, searches admin/approved accounts based on query
  const searchUsers = (query) => {
    if (!query) {
      initializeSocial(accounts);
      return;
    }
    const fuse = new Fuse(accounts, {
      keys: ["firstName", "email", "graduationYear"],
      threshold: 0.3,
    });
    const result = fuse.search(query);
    // const finalResult = [];
    var tempResult = [];
    console.log(result);
    if (result.length) {
      result.forEach((item) => {
        if (item.item.status == "ADMIN" || item.item.status == "APPROVED") {
          if (item.item.id !== userProfile.id) {
            tempResult.push(item.item);
          }
        }
      });
      console.log("tempresult", tempResult);
      itemsToRemove(tempResult);

      // Remove the marked items from tempResult
    } else {
      setDisplayUsers([]);
    }
  };

  useEffect(() => {
    getAccounts("status", true);

    // eslint-disable-next-line
  }, []);

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

  return (
    <Page>
      <Card style={{ padding: ".5rem" }}>
        <Toolbar>
          <Box
            aria-label="Account Actions"
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
                marginRight: "2rem",
              }}
              onClick={handleFriendRequestAction}
            >
              Add
            </ThemedButton>
            <TextField
              placeholder="Search"
              size="small"
              onChange={(e) => searchUsers(e.target.value)}
              InputProps={{
                style: {
                  marginTop: "0.1rem",
                  fontSize: "0.9rem",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  width: "30rem",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon color="tertiary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "auto",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.15)",
                  },
                },
              }}
            />
          </Box>
          {/* <Typography variant='h4'>Search Bar</Typography> */}
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
                  <Checkbox
                    checked={selectAllChecked}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell padding="checkbox" />
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    padding={headCell.disablePadding ? "none" : "normal"}
                    id="table-head-cell"
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody aria-label="Accounts Table Body">
              {displayUsers.map((account) => {
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
