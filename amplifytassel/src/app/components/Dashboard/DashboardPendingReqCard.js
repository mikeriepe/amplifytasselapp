import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MuiBox from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { Storage } from "aws-amplify";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import AccessibilityRoundedIcon from "@mui/icons-material/AccessibilityRounded";
import PeopleIcon from "@mui/icons-material/People";

import {
  CardContent,
  CardMedia,
  Typography,
  Box,
  ListItem,
} from "@mui/material";

/**
 * @return {JSX}
 */
export default function DashboardPendingReqCard({ opportunity }) {
  const [banner, setBanner] = useState(null);
  const [participants, setParticipants] = useState(0);

  const downloadFile = async () => {
    const img = await Storage.get(opportunity.bannerKey, {
      level: "public",
    });
    setBanner(img);
  };

  useEffect(() => {
    downloadFile();
  }, []);

  useEffect(() => {
    if (opportunity?.profilesJoined?.values) {
      opportunity.profilesJoined.values
        .then((result) => {
          setParticipants(result.length);
        })
    }
  }, [opportunity]);

  const navigate = useNavigate();
  const navigateToOpp = (oppid) => {
    navigate(`/Opportunity/${oppid}`);
  };

  const formatDate = (date) => {
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const timeOptions = {
      hour: "numeric",
      minute: "2-digit",
    };

    const convertDate = new Date(date).toLocaleDateString([], dateOptions);
    const convertTime = new Date(date).toLocaleTimeString([], timeOptions);

    return `${convertDate} at ${convertTime}`;
  };

  const Banner = ({ image }, props) => {
    return (
      <MuiBox
        sx={{
          height: "60px",
          width: "60px",
          flexDirection: "row",
          justifyContent: "center",
          padding: "1em",
        }}
        {...props}
      >
        <img
          src={image}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            border: "0.5px solid rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
          }}
        />
      </MuiBox>
    );
  };

  const EventTitleText = ({ children }, props) => (
    <MuiBox
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        lineHeight: 1.5,
        fontWeight: "bold",
        fontSize: "0.9rem",
        color: "var(--secondary-yellow-main)",
      }}
      {...props}
    >
      {children}
    </MuiBox>
  );

  return (
    <ListItem
      onClick={() => navigateToOpp(opportunity.id)}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        justifyContent: "space-between",
        "&:hover": { backgroundColor: "#f5f5f5" },
        padding: 2,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={banner}
          alt="Event Banner"
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            objectFit: "cover",
            border: "0.5px solid rgba(0, 0, 0, 0.15)",
          }}
        />
        <CardContent
          sx={{
            marginLeft: 2,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <MuiBox sx={{ display: "flex" }}>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ color: "var(--text-dark)", marginRight: "10px" }}
            >
              {opportunity?.eventName}
            </Typography>
            <Chip label={participants} icon={<PeopleIcon />} size="small" />
          </MuiBox>
          <Typography variant="body2" color="var(--text-gray)">
            <div className="flex-horizontal flex-flow-large flex-align-center">
              <EventNoteRoundedIcon sx={{ fontSize: "0.9rem" }} />
              <p className="text-bold ellipsis">
                {formatDate(opportunity.startTime)}
              </p>
            </div>
          </Typography>
          <Typography variant="body2" color="var(--text-gray)">
            <div className="flex-horizontal flex-flow-large flex-align-center">
              <AccessibilityRoundedIcon sx={{ fontSize: "0.9rem" }} />
              <p className="text-bold ellipsis">{opportunity.locationType}</p>
            </div>
          </Typography>
        </CardContent>
      </Box>
      <Chip
        label={"Pending"}
        variant="outlined"
        color={"secondary"}
        size="small"
        icon={
          <Box
            style={{
              marginLeft: "10px",
              height: "6px",
              width: "6px",
              background: "var(--secondary-yellow-main)",
              borderRadius: "50%",
            }}
          />
        }
      />
    </ListItem>
  );
}
