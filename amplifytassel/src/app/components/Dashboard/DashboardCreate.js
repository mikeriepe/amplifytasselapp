import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiBox from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import OpportunityForm from "../Opportunities/OpportunityForm";
import { Modal } from "@mui/material";
import useAuth from "../../util/AuthContext";
import { toast } from "react-toastify";
import useAnimation from "../../util/AnimationContext";
import { calculateIfUserLeveledUp } from "../../util/PointsAddition";

import { DataStore, Storage } from "aws-amplify";
import { Opportunity } from "../../../models";
import { Role } from "../../../models";
import { OpportunityStatus } from "../../../models";
import { PointsAddition } from "../../util/PointsAddition";
import { v4 as uuidv4 } from "uuid";

const Display = styled((props) => <MuiCard elevation={0} {...props} />)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  justifyContent: "space-between",
  "&:hover": { backgroundColor: "#f5f5f5" },
  // borderBottom: "1px solid #e0e0e0",
}));


/**
 * creates Dashboard header
 * @return {HTML} Dashboard header component
 */
export default function DashboardCreate({ getCreatedOpportunities }) {
  const { userProfile, setUserProfile } = useAuth();
  const [showOppForm, setShowOppForm] = useState(false);

  const { setShowConfettiAnimation, setShowStarAnimation } = useAnimation();

  const [formValues, setFormValues] = useState({
    name: "",
    isNewOpp: true,
    locationType: "in-person",
    location: {
      address: "",
      state: "",
      city: "",
      zip: "",
    },
    sponsortype: "user sponsor",
    zoomLink: "",
    //organization: [],
    description: "",
    eventData: "",
    startdate: new Date(),
    enddate: new Date(),
    //organizationtype: '',
    //opportunitytype: '',
    starttime: new Date(),
    endtime: new Date(),
    subject: "",
    eventdata: "",
    eventBanner:
      "https://www.places4students.com/P4SFiles/sliders/119_ucsc-02-main-entrance-sign.jpg",
    bannerKey: "",
    //keywords: [allKeywords],
  });

  const roundToNextHour = () => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 1);
    return now;
  };

  const handleModalOpen = () => {
    setFormValues({
      name: "",
      isNewOpp: true,
      locationType: "in-person",
      location: { address: "", state: "", city: "", zip: "" },
      sponsortype: "user sponsor",
      zoomLink: "",
      description: "",
      eventData: "",
      startdate: new Date(),
      enddate: new Date(),
      starttime: roundToNextHour(),
      endtime: roundToNextHour(),
      subject: "",
      eventdata: "",
      eventBanner: "https://www.places4students.com/P4SFiles/sliders/119_ucsc-02-main-entrance-sign.jpg",
      bannerKey: "",
      maxApplicants: "",
    });
    setShowOppForm(true);
  };

  const handleModalClose = () => {
    setShowOppForm(!showOppForm);
  };

  const onSubmit = async (data, isNewOpp) => {
    console.log(isNewOpp);
    console.log("Starting process...");
    const newOpportunity = {
      assignedRoles: {},
      //eventBanner: 'https://www.sorenkaplan.com/wp-content/uploads/2017/07/Testing.jpg',
      status: OpportunityStatus.PENDING,
      profilesJoined: [],
      //preferences: {},
      profileID: userProfile.id,
      Requests: {},
      ...data,
    };

    let toasterStr = "";
    const oldPoints = userProfile.points;
    const isLevelUp = calculateIfUserLeveledUp(oldPoints, 50);
    PointsAddition(50, userProfile.id, setUserProfile);
    if (isLevelUp) {
      // Display confetti animation
      setShowConfettiAnimation(true);
      toasterStr = "and you leveled up!";
    } else {
      // Display star animation
      setShowStarAnimation(true);
      toasterStr = "and you earned 50 points!";
    }

    if (data.imgData != null) {
      Storage.put(uuidv4() + "-" + data.imgData.name, data.imgData, {
        contentType: data.imgData.type,
      }).then((res) => {
        //setBKey(res.key);
        //console.log(bKey);
        Storage.get(res.key, {
          level: "public",
        }).then((res2) => {
          console.log("Object created...");
          console.log(newOpportunity);
          DataStore.save(
            new Opportunity({
              zoomLink: newOpportunity.zoomLink,
              organizations: [newOpportunity.organization],
              description: newOpportunity.description,
              eventBanner: res2,
              eventName: newOpportunity.name,
              startTime: newOpportunity.startTime.toISOString(),
              endTime: newOpportunity.endTime.toISOString(),
              locationType: newOpportunity.locationType,
              location: newOpportunity.location,
              eventData: newOpportunity.eventdata,
              subject: newOpportunity.subject,
              preferences: [],
              Roles: newOpportunity.roles,
              Posts: newOpportunity.Posts,
              Requests: newOpportunity.Requests,
              profileID: newOpportunity.profileID,
              profilesJoined: newOpportunity.profilesJoined,
              keywords: newOpportunity.keywords,
              status: newOpportunity.status,
              bannerKey: res.key,
              maxApplicants: data.maxApplicants === "" ? null : parseInt(data.maxApplicants),
            })
          )
            .then((res) => {
              // console.log(res);
              console.log("Saved...");
              toast.success(`Opportunity Created ${toasterStr}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              handleModalClose();
              console.log("New roles: " + newOpportunity.roles.length);
              for (let i = 0; i < newOpportunity.roles.length; i++) {
                const newRole = {
                  opportunityID: res.id,
                  // keeping it null until it's fully implemented
                  //tagid: 'c7e29de9-5b88-49fe-a3f5-750a3a62aee5',
                  responsibility: "",
                  description: "",
                  isfilled: false,
                  name: newOpportunity.roles[i],
                  qualifications: [],
                  capacity: 0,
                  Majors: [],
                  Profiles: [],
                  Requests: [],
                };
                DataStore.save(
                  new Role({
                    name: newRole.name,
                    description: newRole.description,
                    isFilled: newRole.isfilled,
                    qualifications: newRole.qualifications,
                    Majors: newRole.Majors,
                    Profiles: newRole.Profiles,
                    opportunityID: newRole.opportunityID,
                    Requests: newRole.Requests,
                    capacity: newRole.capacity,
                  })
                ).then((third) => {
                  console.log("Making new role...");
                  console.log(third);
                });
              }
              console.log("Creating...");
            })
            .then(() => {
              getCreatedOpportunities();
            });
        });
      });
    } else {
      Storage.get("sc.jpg", {
        level: "public",
      }).then((res) => {
        console.log("Object created...");
        console.log(newOpportunity);
        DataStore.save(
          new Opportunity({
            zoomLink: newOpportunity.zoomLink,
            organizations: [newOpportunity.organization],
            description: newOpportunity.description,
            eventBanner: res,
            eventName: newOpportunity.name,
            startTime: newOpportunity.startTime.toISOString(),
            endTime: newOpportunity.endTime.toISOString(),
            locationType: newOpportunity.locationType,
            location: newOpportunity.location,
            eventData: newOpportunity.eventdata,
            subject: newOpportunity.subject,
            preferences: [],
            Roles: newOpportunity.roles,
            Posts: newOpportunity.Posts,
            Requests: newOpportunity.Requests,
            profileID: newOpportunity.profileID,
            profilesJoined: newOpportunity.profilesJoined,
            keywords: newOpportunity.keywords,
            status: newOpportunity.status,
            bannerKey: "sc.jpg",
            maxApplicants: data.maxApplicants === "" ? null : parseInt(data.maxApplicants),
          })
        )
          .then((res) => {
            console.log(res);
            console.log("Saved...");
            toast.success(`Opportunity Created ${toasterStr}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            handleModalClose();
            console.log("New roles: " + newOpportunity.roles.length);
            for (let i = 0; i < newOpportunity.roles.length; i++) {
              const newRole = {
                opportunityID: res.id,
                // keeping it null until it's fully implemented
                //tagid: 'c7e29de9-5b88-49fe-a3f5-750a3a62aee5',
                responsibility: "",
                description: "",
                isfilled: false,
                name: newOpportunity.roles[i],
                qualifications: [],
                capacity: 0,
                Majors: [],
                Profiles: [],
                Requests: [],
              };
              DataStore.save(
                new Role({
                  name: newRole.name,
                  description: newRole.description,
                  isFilled: newRole.isfilled,
                  qualifications: newRole.qualifications,
                  Majors: newRole.Majors,
                  Profiles: newRole.Profiles,
                  opportunityID: newRole.opportunityID,
                  Requests: newRole.Requests,
                  capacity: newRole.capacity,
                })
              ).then((third) => {
                console.log("Making new role...");
                console.log(third);
              });
            }
            console.log("Creating...");
          })
          .then(() => {
            getCreatedOpportunities();
          });
      });
    }
  };

  return (
    <Display>
      <Button
        onClick={handleModalOpen}
        sx={{
          color: "var(--info-lightblue-main)",
          width: "100%",
          height: "80px",
          // backgroundColor: "var(--info-lightblue-main)",
          border: "1px solid var(--info-lightblue-main)",
          ":hover": {
            backgroundColor: "var(--info-lightblue-main)",
            color: "white",
          },
          // justifyContent: "left",
        }}
        endIcon={<AddIcon />}
      >
        Create Opportunity
      </Button>
      <Modal
        open={showOppForm}
        onBackdropClick={() => setShowOppForm(false)}
        onClose={() => setShowOppForm(false)}
        sx={{ overflow: "scroll" }}
      >
        <OpportunityForm
          onClose={handleModalClose}
          defaultValues={formValues}
          onSubmit={onSubmit}
        />
      </Modal>
    </Display>
  );
}
