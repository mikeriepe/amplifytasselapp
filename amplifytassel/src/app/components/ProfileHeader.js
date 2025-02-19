import React, { useState, useEffect } from "react";
import { styled } from "@mui/material";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiPaper from "@mui/material/Paper";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Modal, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import ProfileBanner from "./ProfileBanner.js";
import useAuth from "../util/AuthContext.js";
//import level1 from '../assets/level1.png';
import {
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10,
} from "../util/LevelsIndex.js";
import LinearProgressWithLabel from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";


import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MuiCard from "@mui/material/Card"; 
import PointsExplainationCard from "./CustomComponents/PointsExplainationCard.js";

import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "aws-amplify";
import { Profile } from "../../models";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  calculateUserLevel,
  calculateXpBarPercentage,
  calculatePointsToNextLevel,
} from "../util/PointsAddition.js";
import ThemedButton from "./ThemedButton.js";
import EmailDialog from "./CustomComponents/EmailDialog.js";

const Header = styled((props) => <MuiPaper elevation={0} {...props} />)(() => ({
  position: "relative",
  width: "calc(60% + 4em)",
  height: "fit-content",
  boxShadow: "0px 4px 50px -15px rgba(0, 86, 166, 0.15)",
  border: "0.5px solid rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
  marginTop: "-1em",
}));

const Content = ({ children }, props) => (
  <MuiBox sx={{ height: "35%", display: "block" }} {...props}>
    {children}
  </MuiBox>
);

const Avatar = ({ image, handleError }, props) => (
  <MuiBox
    sx={{
      height: {
        xs: "150px",
        md: "15vw",
      },
      width: {
        xs: "150px",
        md: "15vw",
      },
      marginLeft: "2vw",
      float: "left",
      marginTop: "-10vw",
    }}
  >
    <MuiAvatar
      src={image}
      sx={{
        width: "100%",
        height: "100%",
        border: "6px solid white",
      }}
      alt="Remy Sharp"
      onError={handleError}
      {...props}
    />
  </MuiBox>
);

const Text = ({ children }, props) => (
  <MuiBox
    sx={{
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      lineHeight: 1.5,
      marginTop: "-1em",
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const ITEM_HEIGHT = 32;

const MoreIcon = ({
  anchorEl,
  open,
  handleClick,
  handleClose,
  hiddenFileInput,
  hiddenInputProfilePicture,
}) => (
  <MuiBox
    sx={{
      margin: "2em",
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      position: "relative",
    }}
  >
    <IconButton
      aria-label="more"
      id="long-button"
      aria-controls={open ? "long-menu" : undefined}
      aria-expanded={open ? "true" : undefined}
      aria-haspopup="true"
      onClick={handleClick}
      sx={{
        //marginTop: "1em", // Adjust to 50px if you want it further down
        position: "relative",
        top: "12.5px", // Adjust this value to control how far down the icon appears
        right: "1em", // Adjust this as needed for horizontal alignment
        transform: "translateY(5%)", // Fine-tune vertical alignment if needed
      }}
    >
      <MoreHorizIcon fontSize="large" 
        sx={{
          fontSize: "3rem", // Makes it 1.5 times bigger (default size for "large" is 1.5rem)
        }}
      />
    </IconButton>
    <Menu
      id="long-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "21.5ch",
        },
      }}
    >
      <Link to="/updateprofile">
        <MenuItem onClick={handleClose}>Edit Personal Info</MenuItem>
      </Link>
      <MenuItem
        onClick={() => {
          handleClose();
          hiddenFileInput.current.click();
        }}
      >
        Edit Profile Banner
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          hiddenInputProfilePicture.current.click();
        }}
      >
        Edit Profile Picture
      </MenuItem>
    </Menu>
  </MuiBox>
);
const Level = ({ level }) => (
  <MuiBox
    sx={{
      display: { xs: "none", sm: "flex" },
      alignItems: "center",
      marginLeft: "1em",
      marginRight: "1em",
      width: "5vw",
      maxWidth: "5vw",
      minWidth: "50px",
      height: "auto",
      marginTop: "2em",
    }}
    //  403x403
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <img src={level} alt="" />
      {/* <p style={{
    fontSize: '1.5em',
    color: 'gold'
  }}>
    Level {level}
  </p> */}
    </div>
  </MuiBox>
);
// make xp bar bigger
// add xp till next level
// check if it can have marks saying 25%,50%
const XPBar = ({ progress, pointsToNextLevel }) => (
  <MuiBox
    sx={{
      display: "flex",
      alignItems: "center",
      marginLeft: "1em",
      marginTop: "1.5em",
    }}
  >
    <div
      className="flex"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="caption"
          sx={{ /*marginTop: "0.5em",*/ fontSize: "1rem" }}
        >
          XP to next level: {pointsToNextLevel}
        </Typography>
      </div>
      <LinearProgressWithLabel
        variant="determinate"
        value={progress}
        sx={{ height: 20, width: "160px" }}
      />
    </div>
  </MuiBox>
);

/**
 * creates Profile header
 * @return {HTML} Profile header component
 */
export default function ProfileHeader({ data, editButton }) {
  const [majors, setMajors] = useState(null);
  const [showExplainationModal, setShowExplainationModal] = useState(false);

  // Profile Banner States
  const [selectedFile, setSelectedFile] = useState(null);
  const hiddenFileInput = React.useRef(null);
  // ----

  // Profile Picture States
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [fileKey, setFileKey] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const hiddenInputProfilePicture = React.useRef(null);
  const BANNER_FILE_SIZE_LIMIT = 2097152;
  // ---- Removed userProfile, as it wasn't being used or called
  const { /*userProfile,*/ setUserProfile } = useAuth();

  const getProfilePictureKey = async () => {
    let user = await DataStore.query(Profile, (p) => p.id.eq(data.id));
    setFileKey(user[0].picture);
  };

  const downloadFile = async () => {
    if (fileKey !== null) {
      const file = await Storage.get(fileKey, {
        level: "public",
      });
      setProfilePicture(file);
    } else {
      setProfilePicture(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    }
  };

  const uploadFile = async () => {
    try {
      // Check the banner size
      if (selectedProfileFile.size > BANNER_FILE_SIZE_LIMIT) {
        toast.error(`The image cannot be larger than 2 MB, please try again.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const result = await Storage.put(
        selectedProfileFile.name + "-" + uuidv4(),
        selectedProfileFile,
        {
          contentType: selectedProfileFile.type,
        }
      );
      // fetch the user
      let user = await DataStore.query(Profile, (p) => p.id.eq(data.id));

      // Delete the old profile picture
      await Storage.remove(user[0].picture);

      // update the profile picture
      const updatedUserProfile = await DataStore.save(
        Profile.copyOf(user[0], (updated) => {
          updated.picture = result.key;
        })
      );

      // update the userProfile context
      setUserProfile(updatedUserProfile);

      setFileKey(result.key);
      toast.success(`Successfully uploaded ${selectedProfileFile.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      toast.error(`There has been an error, please try again later.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const extractMajors = async () => {
    try {
      const value = await Promise.resolve(data.Majors.values);
      const majorNames = [];
      for (let i = 0; i < value.length; i++) {
        const k = await Promise.resolve(value[i].major);
        majorNames.push(k.name);
      }
      setMajors(majorNames);
    } catch (error) {
      console.error(error);
    }
  };
  
  // IGNORE THIS WARNING - Needed for proper functionality for updating major 
  useEffect(() => {
    extractMajors();
  }, []);

  const handleError = (e) => {
    e.target.src =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateSelectedFile = (file) => {
    setSelectedFile(file);
  };

  const updateSelectedProfilePic = (file) => {
    setSelectedProfileFile(file);
  };

  // IGNORE WARNINGS
  useEffect(() => {
    getProfilePictureKey();
  }, []);

  useEffect(() => {
    if (fileKey !== null) {
      downloadFile();
    }
  }, [fileKey]);

  useEffect(() => {
    // A file has been selected upload it to the db
    if (selectedProfileFile) {
      uploadFile();
    }
    // IGNORE WARNING
  }, [selectedProfileFile]);

  let level = 1; // replace this with a dynamic value
  // console.log(calculateUserLevel(data.points));
  switch (calculateUserLevel(data.points)) {
    case 1:
      level = level1;
      break;
    case 2:
      level = level2;
      break;
    case 3:
      level = level3;
      break;
    case 4:
      level = level4;
      break;
    case 5:
      level = level5;
      break;
    case 6:
      level = level6;
      break;
    case 7:
      level = level7;
      break;
    case 8:
      level = level8;
      break;
    case 9:
      level = level9;
      break;
    case 10:
      level = level10;
      break;
    default:
      level = level1;
  }
  let xpBarPercentage = calculateXpBarPercentage(data.points);
  let pointsToNextLevel = calculatePointsToNextLevel(data.points);
  // console.log(data.points);
  // console.log(xpBarPercentage);
  // console.log(pointsToNextLevel);

  const progress = 65;
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Header>
      <ProfileBanner selectedFile={selectedFile} data={data} />
      <Content>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Avatar image={profilePicture} handleError={handleError} />
          <Box
            sx={{
              paddingLeft: "2vw",
              display: "flex",
              marginTop: "1vw",
              paddingBottom: "1vw",
              flex: 1,
            }}
          >
            <Text>
              <h2
                className="text-dark ellipsis"
                aria-label="Profile Header Full Name"
              > 
                {data.firstName + " " + data.lastName + (data.username ? ` (${data.username})` : "")}
              </h2>
              <h5
                className="text-bold text-blue ellipsis"
                aria-label="Profile Header Majors"
              >
                {majors?.length > 0 &&
                  majors.map((major, index) => (
                    <p key={index}>{majors[index]}</p>
                  ))}
              </h5>
              <p
                className="ellipsis"
                aria-label="Profile Header Graduation Year"
              >
                Class of {data.graduationYear}
              </p>
              <p className="ellipsis" aria-label="Profile Header Location">
                {data.location}
              </p>
            </Text>
            <Level level={level} /*sx={{ flex: 1}} *//>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {editButton && (
                <XPBar
                  progress={xpBarPercentage}
                  pointsToNextLevel={pointsToNextLevel}
                  //sx={{ flex: 1 }}
                />
              )}
              {editButton && (
                <p
                  className="text-blue hover-underline clickable no-highlight text-small"
                  onClick={() => setShowExplainationModal(true)}
                >
                  What's this?
                </p>
              )}
            </Box>
            {editButton && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    //topMargin: "3em",
                  }}
                >
                  <MoreIcon
                    anchorEl={anchorEl}
                    open={open}
                    hiddenInputProfilePicture={hiddenInputProfilePicture}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    updateSelectedFile={updateSelectedFile}
                    hiddenFileInput={hiddenFileInput}
                  />
                  <input
                    type="file"
                    accept="image/x-png,image/jpeg"
                    ref={hiddenFileInput}
                    multiple={false}
                    onChange={(e) => updateSelectedFile(e.target.files[0])}
                    hidden
                  />
                  <input
                    type="file"
                    accept="image/x-png,image/jpeg"
                    ref={hiddenInputProfilePicture}
                    multiple={false}
                    onChange={(e) =>
                      updateSelectedProfilePic(e.target.files[0])
                    }
                    hidden
                  />
                </Box>
              </>
            )}
            {
              !editButton && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1em",
                }}
              >
                <ThemedButton
                  color={"blue"}
                  variant={"themed"}
                  type={"submit"}
                  style={{
                    fontSize: "0.875rem",
                    marginRight: "1.5em",
                    marginTop: "1em"
                  }}
                  onClick={() => setDialogOpen(true)}
                >
                  Message
                </ThemedButton>
                <EmailDialog
                  emails={[data.email]}
                  accounts={[data]}
                  profilePictures={{ [data.id]: profilePicture }}
                  open={dialogOpen}
                  setClose={() => setDialogOpen(false)}
                  canClickAvatar={false}
                />
              </Box>
            )}
          </Box>
        </div>
      </Content>
      <Modal
        open={showExplainationModal}
        onBackdropClick={() => setShowExplainationModal(false)}
        onClose={() => setShowExplainationModal(false)}
      >
        <PointsExplainationCard
          onClose={() => setShowExplainationModal(!showExplainationModal)}
        />
      </Modal>
    </Header>
  );
}
