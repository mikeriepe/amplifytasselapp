import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CardActionArea from "@mui/material/CardActionArea";
import { Storage } from "aws-amplify";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import AccessibilityRoundedIcon from "@mui/icons-material/AccessibilityRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";

const CustomCard = ({ opportunity }) => {
  const [banner, setBanner] = useState(null);

  const downloadFile = async () => {
    const img = await Storage.get(opportunity.bannerKey, {
      level: "public",
    });
    setBanner(img);
  };

  useEffect(() => {
    downloadFile();
  }, []);

  const formatDate = (startTime) => {
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const timeOptions = {
      hour: "numeric",
      minute: "2-digit",
    };

    const convertDate = new Date(startTime).toLocaleDateString([], dateOptions);
    const convertTime = new Date(startTime).toLocaleTimeString([], timeOptions);

    return `${convertDate} at ${convertTime}`;
  };

  return (
    <Card
      sx={{ width: "100%", borderRadius: 4, boxShadow: 3 }}
      className="clickable"
    >
      <CardActionArea
        component={RouterLink}
        to={`/Opportunity/${opportunity.id}`}
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {/* Image Placeholder */}
        <CardMedia
          component="img"
          image={banner}
          alt="Event Banner"
          sx={{
            width: { sm: 100, lg: 150 }, // Full width on small screens
            height: { sm: 100, lg: 150 },
            borderRadius: "8px",
            margin: 2,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          {/* Title */}
          <Typography
            variant="h5"
            component="div"
            class="text-medium text-dark text-xbold title-margin"
            gutterBottom
          >
            {opportunity.eventName}
          </Typography>
          {/* Subtitle or Extra Information */}
          <Typography
            variant="body2"
            class="text-light text-lightgray title-margin"
            gutterBottom
          >
            <div className="flex-horizontal flex-flow-large flex-align-center">
              <AccessibilityRoundedIcon sx={{ fontSize: "0.9rem" }} />
              <p className="text-bold ellipsis">{opportunity.locationType}</p>
            </div>
          </Typography>
          {/* Date and Location Information */}
          <Typography variant="body1" class="text-bold text-dark">
            <div className="flex-horizontal flex-flow-large flex-align-center">
              <EventNoteRoundedIcon sx={{ fontSize: "0.9rem" }} />
              <p className="text-bold ellipsis">
                {formatDate(opportunity.startTime)}
              </p>
            </div>
          </Typography>
          {opportunity.locationType &&
            (opportunity.locationType === "in-person" ||
              opportunity.locationType === "hybrid") && (
              <div
                className="
                      flex-horizontal
                      flex-flow-large
                      flex-align-center
                    "
                style={{ marginRight: "0.25em", marginTop: "0.25em" }}
              >
                <FmdGoodOutlinedIcon sx={{ fontSize: "0.9rem" }} />
                <p className="text-bold">
                  {`
                        ${opportunity.location.address}
                        ${opportunity.location.city},
                        ${opportunity.location.state}
                        ${opportunity.location.zip}
                      `}
                </p>
              </div>
            )}
          {opportunity.locationType &&
            (opportunity.locationType === "remote" ||
              opportunity.locationType === "hybrid") && (
              <div
                className="
                      flex-horizontal
                      flex-flow-large
                      flex-align-center
                    "
                style={{ marginRight: "0.25em", marginTop: "0.25em" }}
              >
                <DevicesOutlinedIcon sx={{ fontSize: "0.9rem" }} />
                <p className="text-bold">{opportunity.zoomLink}</p>
              </div>
            )}
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CustomCard;
