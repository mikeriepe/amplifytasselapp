import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EventIcon from "@mui/icons-material/Event";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SchoolIcon from "@mui/icons-material/School";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import UCSCIcon from "../../assets/ucsc-logo.jpg";
import Notification from "../CustomComponents/Notification.js";
import ThemedButton from "../Themed/ThemedButton.js";
import useAuth from "../../util/AuthContext.js";
import * as Nav from "./NavBarComponents";
import { Storage } from "aws-amplify";
import { useTabIndex } from "../../context/TabIndexContext.js";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Auth } from "aws-amplify";

const LogoStyling = {
  position: "absolute",
  width: "100%",
  bottom: 0,
  marginBottom: "65px",
};

const LogoutStyling = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  borderTop: "0.5px solid rgba(0, 0, 0, 0.15)",
};

const BrandStyling = {
  // 20px = Button Side Padding
  // 8px = Button Width (32px) - Icon Width (24px)
  // 6px = Icon Width (24px) - Vector Width (18px)
  // 2px = Account for scale
  display: "flex",
  alignItems: "center",
  paddingLeft: "calc(20px - 8px + 6px - 2px)",
  width: "100%",
  cursor: "pointer",
};

const ListButtonStyling = {
  minHeight: 48,
  px: 2.5,
};

const ListIconStyling = {
  minWidth: 0,
  ml: "4px",
};

const ListTextStyling = {
  ".MuiTypography-root": {
    fontWeight: "600",
    fontSize: "0.9rem",
  },
};

/**
 * @return {JSX} NavBar Component
 */
export default function NavBarLoggedIn() {
  const { userProfile, setLoadingAuth } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { tabIndex, setTabIndex } = useTabIndex();
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  // Pages ---------------------------------------------------------------------

  const pages = [
    ["Dashboard", "/dashboard", <GridViewRoundedIcon key="Dashboard" />],
    ["Opportunities", null, <EventIcon key="Opportunities" />,
      [
        ["Host", "/opportunities/hosts", <EditCalendarIcon key="Host" />],
        ["Volunteer", "/opportunities/volunteers", <VolunteerActivismIcon key="Volunteer" />],
      ]
    ],
    ["Help", "/help", <HelpOutlineIcon key="help" />],
  ];
  /* Settings and Social page deleted here, put back in array if needed back
  To re-add Social page, also un-comment line 321
  ["Settings", "/settings", <SettingsIcon key="Settings" />]
  ["Social", "/social", <PeopleAltIcon key="Social" />] */
  // add approvals page if user is admin
  if (userProfile && userProfile?.status === "ADMIN") {
    pages.splice(1, 0, [
      "Approvals",
      "/approvals",
      <AssignmentTurnedInIcon key="Approvals" />,
    ]);
  }

  // NavBar Dropdowns -------------------------------------------------------------
  const [expandedMenus, setExpandedMenus] = useState({});
  const handleMenuToggle = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Notifications -------------------------------------------------------------

  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const showNotification = Boolean(notificationAnchorEl);

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const notificationId = "notification-popover";
  const renderNotification = (
    <Notification
      props={{
        notificationAnchorEl: notificationAnchorEl,
        notificationId: notificationId,
        showNotification: showNotification,
        setNotificationAnchorEl: setNotificationAnchorEl,
        setNotificationCount: setNotificationCount,
      }}
    />
  );

  // Profile Drop Down Menu -------------------------------------------------------------

  const [anchorEl, setAnchorEl] = React.useState(null);
  const profOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleClose(); // Close the menu
    setTabIndex("");
    navigate("/myprofile"); // Navigate to /myprofile
  };

  // Profile -------------------------------------------------------------------

  const downloadProfilePicture = async () => {
    if (userProfile.picture !== null) {
      const file = await Storage.get(userProfile.picture, {
        level: "public",
      });
      setProfilePicture(file);
    } else {
      setProfilePicture(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    }
  };

  const handleError = (e) => {
    e.target.src =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  };

  const handleLogout = () => {
    console.log("logout api called here");
    Auth.signOut()
      .then(() => {
        setLoadingAuth(true);
      })
      .catch((err) => {
        console.log("error logging out: ", err);
      });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTabClick = (index) => {
    // console.log(index);
    setTabIndex(index);
  };

  const pagesToButtons = (pages) => {
    return (
      <List>
        {pages.map((arr) => {
          const [label, route, icon, subTabs] = arr;
          if (subTabs) {
            return (
              <React.Fragment key={label}>
                <ListItemButton
                  onClick={() => handleMenuToggle(label)}
                  sx={ListButtonStyling}
                >
                  <ListItemIcon
                    sx={{
                      ...ListIconStyling,
                      mr: open ? 3 : "auto",
                      color: "var(--tertiary-gray-main)",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      ...ListTextStyling,
                      ".MuiTypography-root": {
                        ...ListTextStyling[".MuiTypography-root"],
                        color: "var(--tertiary-gray-main)",
                      },
                      opacity: open ? 1 : 0,
                    }}
                  >
                    {label}
                  </ListItemText>
                  {expandedMenus[label] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                
                {expandedMenus[label] && (
                  <List component="div" disablePadding>
                    {subTabs.map(([subLabel, subRoute, subIcon]) => (
                      <Link key={subLabel} to={subRoute}>
                        <Tooltip title={subLabel} placement="right">
                          <ListItemButton
                            onClick={() => handleTabClick(subRoute)}
                            sx={{
                              ...ListButtonStyling,
                              pl: 4,
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                ...ListIconStyling,
                                mr: open ? 3 : "auto",
                                color:
                                  subRoute === tabIndex
                                    ? "var(--primary-blue-main)"
                                    : "var(--tertiary-gray-main)",
                              }}
                            >
                              {subIcon}
                            </ListItemIcon>
                            <ListItemText
                              sx={{
                                ...ListTextStyling,
                                ".MuiTypography-root": {
                                  ...ListTextStyling[".MuiTypography-root"],
                                  color:
                                    subRoute === tabIndex
                                      ? "var(--primary-blue-main)"
                                      : "var(--tertiary-gray-main)",
                                },
                                opacity: open ? 1 : 0,
                              }}
                            >
                              {subLabel}
                            </ListItemText>
                          </ListItemButton>
                        </Tooltip>
                      </Link>
                    ))}
                  </List>
                )}
              </React.Fragment>
            );
          }
      
          return (
            <Link key={label} to={route}>
              <Tooltip title={label} placement="right">
                <ListItemButton
                  onClick={() => handleTabClick(route)}
                  sx={ListButtonStyling}
                >
                  <ListItemIcon
                    sx={{
                      ...ListIconStyling,
                      mr: open ? 3 : "auto",
                      color:
                        route === tabIndex
                          ? "var(--primary-blue-main)"
                          : "var(--tertiary-gray-main)",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      ...ListTextStyling,
                      ".MuiTypography-root": {
                        ...ListTextStyling[".MuiTypography-root"],
                        color:
                          route === tabIndex
                            ? "var(--primary-blue-main)"
                            : "var(--tertiary-gray-main)",
                      },
                      opacity: open ? 1 : 0,
                    }}
                  >
                    {label}
                  </ListItemText>
                </ListItemButton>
              </Tooltip>
            </Link>
          );
        })}
      </List>
    );
  };

  useEffect(() => {
    setTabIndex(window.location.pathname);
  }, []);

  useEffect(() => {
    downloadProfilePicture();
  }, [userProfile]);

  return (
    <>
      <Nav.AppBarLoggedIn
        position="fixed"
        open={open}
        sx={{
          boxShadow: "0 .5px 2px #d1d1d1",
        }}
      >
        <Toolbar className="navbar-height">
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            color="inherit"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon className="icon-gray" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* Notification Icon. Currently not functional*/}
            {/* <Tooltip title="Notifications">
              <IconButton
                aria-label="show number of new notifications"
                aria-controls={notificationId}
                aria-haspopup="true"
                onClick={handleNotificationOpen}
                size="large"
                sx={{ height: "45px", marginTop: "8px" }}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsRoundedIcon className="icon-gray" />
                </Badge>
              </IconButton>
            </Tooltip> */}
            {/*{showNotification && renderNotification}*/}
            {/* Profile Icon */}

            <Tooltip title="Profile Options">
              <ThemedButton
                startIcon={
                  <Avatar
                    src={profilePicture}
                    alt="Remy Sharp"
                    onError={handleError}
                    style={{ marginRight: -8, marginLeft: 4 }}
                  />
                }
                color={"white"}
                variant={"themed"}
                style={{ borderRadius: 30, padding: 10 }}
                id="basic-button"
                onClick={handleClick}
              >
                {/* TODO: replace with userProfile's first name */}
                <Box className="text-xbold text-lineheight-16 text-dark">
                  {profOpen ? (
                    <ExpandLessIcon className="icon-gray" />
                  ) : (
                    <ExpandMoreIcon className="icon-gray" />
                  )}
                </Box>
              </ThemedButton>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={profOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                style: {
                  width: 100,
                },
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent", // Remove hover background color
                },
              }}
            >
              {/* Profile drop down menu items */}
              <MenuItem
                onClick={handleProfileClick}
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Nav.AppBarLoggedIn>
      <Nav.Drawer variant="permanent" open={open}>
        <Nav.DrawerHeader>
          <Link
            to={
              userProfile?.status === "PENDING" ||
              userProfile?.status === "REQUESTED" ||
              userProfile?.status === "UPDATED" ||
              userProfile?.status === "DENIED"
                ? "/myprofile"
                : "/dashboard"
            }
          >
            <Box onClick={() => handleTabClick("/dashboard")} sx={BrandStyling}>
              <SchoolIcon
                className="icon-yellow"
                sx={{ mr: 3, transform: "scale(1.5)" }}
              />
              <h3
                className="text-italic text-yellow"
                style={{ display: "block", opacity: open ? 1 : 0 }}
              >
                SlugMatch
              </h3>
            </Box>
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon className="icon-gray" />
            ) : (
              <ChevronLeftIcon className="icon-gray" />
            )}
          </IconButton>
        </Nav.DrawerHeader>
        {userProfile?.status === "PENDING" ||
        userProfile?.status === "REQUESTED" ||
        userProfile?.status === "UPDATED" ||
        userProfile?.status === "DENIED"
          ? pagesToButtons([
              /*['Social', '/social', <PeopleAltIcon key='Social' />]*/
            ])
          : pagesToButtons(pages)}
        <Box sx={LogoStyling}>
          <img src={UCSCIcon}></img>
        </Box>
        <Box sx={LogoutStyling}>
          <List>
            <Tooltip title="Logout" placement="right">
              <ListItemButton onClick={handleLogout} sx={ListButtonStyling}>
                <ListItemIcon
                  sx={{
                    ...ListIconStyling,
                    mr: open ? 3 : "auto",
                  }}
                >
                  <LogoutIcon className="icon-gray" />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    ...ListTextStyling,
                    opacity: open ? 1 : 0,
                  }}
                >
                  Logout
                </ListItemText>
              </ListItemButton>
            </Tooltip>
          </List>
        </Box>
      </Nav.Drawer>
    </>
  );
}
