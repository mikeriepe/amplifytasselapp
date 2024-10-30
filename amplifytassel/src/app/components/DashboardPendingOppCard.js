import React, { useEffect, useState } from "react";
import {
  CardContent,
  CardMedia,
  Typography,
  Box,
  ListItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataStore, Storage } from "aws-amplify";
import { Request } from "./../../models";
import MuiBox from "@mui/material/Box";
import { Grid } from "@mui/material";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import AccessibilityRoundedIcon from "@mui/icons-material/AccessibilityRounded";

export default function DashboardPendingOppCard({ opportunity }) {
  const [requests, setRequests] = useState([]);
  const [banner, setBanner] = useState(null);
  const navigate = useNavigate();

  const navigateToOpp = (oppid) => {
    navigate(`/Opportunity/${oppid}`);
  };

  const getPendingRequestsReceived = () => {
    DataStore.query(Request, (r) =>
      r.and((r) => [r.opportunityID.eq(opportunity.id), r.status.eq("PENDING")])
    )
      .then((res) => {
        setRequests(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving pending requests");
      });
  };

  const downloadFile = async () => {
    const img = await Storage.get(opportunity.bannerKey, {
      level: "public",
    });
    setBanner(img);
  };

  useEffect(() => {
    setRequests([]);
    getPendingRequestsReceived();
    downloadFile();
  }, [opportunity]);

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

  const RequestsText = ({ children }, props) => {
    return (
      <MuiBox
        sx={{
          height: "45px",
          width: "150px",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#ED4949",
          borderRadius: "1em",
          color: "#FFFFFF",
          letterSpacing: "-0.015em",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "18px",
          margin: "auto",
          alignItems: "center",
          display: "flex",
        }}
        {...props}
      >
        {children}
      </MuiBox>
    );
  };

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
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: "var(--text-dark)" }}
          >
            {opportunity?.eventName}
          </Typography>
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
      {requests.length ? (
        <RequestsText sx={{ marginLeft: 4 }}>
          {requests.length} Pending Request{requests.length === 1 ? "" : "s"}
        </RequestsText>
      ) : null}
    </ListItem>
  );
}
