import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiBox from "@mui/material/Box";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CompressedTabBar from "../components/CustomComponents/CompressedTabBar";
import OpportunitiesList from "../components/Opportunities/OpportunitiesList";
import PageHeader from "../components/CustomComponents/PageHeader";
import useAuth from "../util/AuthContext";
import OpportunityForm from "../components/Opportunities/OpportunityForm";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { DataStore, Storage } from "aws-amplify";
import { Opportunity } from "../../models";
import { Role } from "../../models";
import { OpportunityStatus, Keyword } from "../../models";
import { PointsAddition } from "../util/PointsAddition";
import useAnimation from "../util/AnimationContext";
import { calculateIfUserLeveledUp } from "../util/PointsAddition";
import { v4 as uuidv4 } from "uuid";

const Page = styled((props) => <MuiBox {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "auto",
  width: "auto",
  background: "var(--background-primary)",
}));

const AddButton = (props) => (
  <MuiBox
    sx={{
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      justifyContent: "space-between",
      height: "40px",
      width: "200px",
      cursor: "pointer",
      padding: 2,
      background: "var(--secondary-yellow-main)",
      borderRadius: "5px",
      "&:hover": { backgroundColor: "var(--secondary-yellow-dark)" },
    }}
    {...props}
  >
    <h5
      aria-label="Opportunities Create Opportunity"
      className="text-small"
      style={{
        color: "white",
      }}
    >
      Create New Opportunity
    </h5>
    <AddRoundedIcon
      sx={{
        height: "20px",
        width: "20px",
        stroke: "white",
        strokeWidth: "2px",
      }}
    />
  </MuiBox>
);

/**
 * Passes fetched data to opportunities list component
 * @return {JSX}
 */
export default function FetchWrapper() {
  const location = useLocation();
  const { userProfile } = useAuth();
  const [joinedOpportunities, setJoinedOpportunities] = useState([]);
  const [createdOpportunities, setCreatedOpportunities] = useState([]);
  const [pastOpportunities, setPastOpportunities] = useState([]);
  const [pendingOpportunities, setPendingOpportunities] = useState([]);
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);

  const getAllKeywords = () => {
    console.log("Getting keywords...");
    DataStore.query(Keyword)
      .then((res) => {
        setAllKeywords(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving keywords");
      });
  };

  const getJoinedOpportunities = () => {
    console.log("Getting joined...");
    const currTime = new Date().toISOString();
    DataStore.query(Opportunity, (o) =>
      o.and((o) => [
        o.profilesJoined.profile.id.eq(userProfile.id),
        o.endTime.gt(currTime),
      ])
    )
      .then((res) => {
        setJoinedOpportunities(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving joined opportunities");
      });
  };

  const getCreatedOpportunities = () => {
    console.log("Getting created...");
    DataStore.query(Opportunity, (o) => o.profileID.eq(userProfile.id))
      .then((res) => {
        setCreatedOpportunities(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving created opportunities");
      });
  };

  const getPastOpportunities = () => {
    console.log("Getting past...");
    const currTime = new Date().toISOString();
    DataStore.query(Opportunity, (o) =>
      o.and((o) => [
        o.profilesJoined.profile.id.eq(userProfile.id),
        o.endTime.lt(currTime),
      ])
    )
      .then((res) => {
        setPastOpportunities(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving past joined opportunities");
      });
  };
  const getPendingOpportunities = async () => {
    console.log("Getting pending...");
    try {
      const res = await DataStore.query(Opportunity, (o) =>
          o.and((o) => [o.Requests.profileID.eq(userProfile.id)])
      );
      console.log(res);
      const pendingOpps = [];
      for (let i = 0; i < res.length; i++) {
          const values = await Promise.resolve(res[i].Requests.values);
          for (let j = 0; j < values.length; j++) {
            if (
                values[j].profileID === userProfile.id &&
                values[j].status === "PENDING"
            ) {
                pendingOpps.push(res[i]);
                break;
            }
          }
      }
      setPendingOpportunities(pendingOpps);
    } catch (err) {
      console.log(err);
      alert("Error retrieving pending opportunities");
    }
  };

  const getAllOpportunities = () => {
    DataStore.query(Opportunity, (o) =>
      o.and((o) => [o.status.eq("APPROVED"), o.profileID.ne(userProfile.id)])
    )
      .then((res) => {
        var firstList = res;
        DataStore.query(Opportunity, (o) =>
          o.and((o) => [o.Requests.profileID.eq(userProfile.id)])
        ).then((res) => {
          firstList = firstList.filter((opp) => !res.includes(opp));
          const timeBoxedList = [];
          for (let i = 0; i < firstList.length; i++) {
            if (new Date(firstList[i].startTime) > Date.now()) {
              timeBoxedList.push(firstList[i]);
            }
          }
          setAllOpportunities(timeBoxedList);
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving opportunities");
      });
  };

  useEffect(() => {
    getJoinedOpportunities();
    getCreatedOpportunities();
    getPastOpportunities();
    getPendingOpportunities();
    getAllOpportunities();
    getAllKeywords();
  }, []);

  const creatorOrVolunteer = location.pathname.includes("/creators") ? "creators" : "volunteers";

  return (
    <>
      {joinedOpportunities &&
        createdOpportunities &&
        pastOpportunities &&
        pendingOpportunities &&
        allOpportunities &&
        allKeywords && (
          <Opportunities
            page={creatorOrVolunteer}
            getPendingOpportunities={getPendingOpportunities}
            joinedOpportunities={joinedOpportunities}
            createdOpportunities={createdOpportunities}
            pastOpportunities={pastOpportunities}
            pendingOpportunities={pendingOpportunities}
            allOpportunities={allOpportunities}
            getAllOpportunities={getAllOpportunities}
            getCreatedOpportunities={getCreatedOpportunities}
            getJoinedOpportunities={getJoinedOpportunities}
            allKeywords={allKeywords}
            getAllKeywords={getAllKeywords}
          />
        )}
    </>
  );
}

/**
 * creates opportunities page
 * @return {HTML} opportunities page
 */
function Opportunities(
  {
    page,
    joinedOpportunities,
    createdOpportunities,
    pastOpportunities,
    pendingOpportunities,
    allOpportunities,
    allKeywords,
    getPendingOpportunities,
    getAllOpportunities,
    getCreatedOpportunities,
    getAllKeywords,
    getJoinedOpportunities,
  },
  props
) {
  const { userProfile, setUserProfile } = useAuth();
  const location = useLocation();
  const { setShowConfettiAnimation, setShowStarAnimation } = useAnimation();
  //const keywords = await DataStore.query(Keyword);
  let defaultTab = null;
  // Use if you want button take nav to specific opportunities tab
  if (location.state === null) {
    defaultTab = 0;
  } else if (location.state.defaultTab === "browse") {
    defaultTab = 0;
  } else if (location.state.defaultTab === "upcoming") {
    defaultTab = 1;
  } else {
    defaultTab = 0;
  }

  const [tab, setTab] = useState(defaultTab);
  const [locationFilter, setLocationFilter] = useState([]);
  const [oppTypeFilter, setOppTypeFilter] = useState([]);
  const [orgTypeFilter, setOrgTypeFilter] = useState([]);
  const [showOppForm, setShowOppForm] = useState(false);
  // const [bKey, setBKey] = useState("");
  const creatorTabs = [
    {
      name: "Created",
      description: "See opportunities you created",
      component: (
        <OpportunitiesList
          aria-label="Opportunities Tab Created"
          key="created"
          type="created"
          opportunities={createdOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
          getCreatedOpportunities={getCreatedOpportunities}
        />
      ),
    },
    {
      name: "Upcoming",
      description: "Browse your upcoming opportunities",
      component: (
        <OpportunitiesList
          key="upcoming"
          type="upcoming"
          opportunities={joinedOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
          getJoinedOpportunities={getJoinedOpportunities}
          getAllOpportunities={getAllOpportunities}
        />
      ),
    },
  ];
  
  const volunteerTabs = [
    {
      name: "Browse",
      description: "Browse available opportunities",
      component: (
        <OpportunitiesList
          key="all"
          type="all"
          opportunities={allOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
          getPendingOpportunities={getPendingOpportunities}
          getAllOpportunities={getAllOpportunities}
        />
      ),
    },
    {
      name: "Upcoming",
      description: "Browse your upcoming opportunities",
      component: (
        <OpportunitiesList
          key="upcoming"
          type="upcoming"
          opportunities={joinedOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
          getJoinedOpportunities={getJoinedOpportunities}
          getAllOpportunities={getAllOpportunities}
        />
      ),
    },
    {
      name: "Pending",
      description: "Your pending applications",
      component: (
        <OpportunitiesList
          key="pending"
          type="pending"
          opportunities={pendingOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
          getPendingOpportunities={getPendingOpportunities}
          getAllOpportunities={getAllOpportunities}
        />
      ),
    },
    {
      name: "Completed",
      description: "Opportunities you joined that have completed",
      component: (
        <OpportunitiesList
          key="completed"
          type="completed"
          opportunities={pastOpportunities}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
        />
      ),
    },
  ]

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
      recurringEventOptions: "None",
      frequencyOptions: "1",
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
      });
      setShowOppForm(true);
    };

  const handleModalClose = () => {
    setShowOppForm(!showOppForm);
  };

  const onSubmit = async (data, isNewOpp) => {
    console.log(isNewOpp);
    console.log("Starting process...");
    const newOpportunityObject = {
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

    function opportunityToDatabase(newOpportunity) {
      return new Promise((resolve, reject) => {
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
                  resolve("resolved1");
                });
            });
          });
        } else {
          Storage.get("sc.jpg", {
            level: "public",
          }).then((res) => {
            console.log("Object created...");
            console.log(newOpportunity);
            console.log(
              "test: ",
              newOpportunity.startTime,
              newOpportunity.endTime
            );
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
                resolve("resolved2");
              });
          });
        }
      });
    }

    console.log("here:", newOpportunityObject);
    await opportunityToDatabase(newOpportunityObject);
    if (newOpportunityObject.recurringEventOptions !== "None") {
      const freq = newOpportunityObject.frequencyOptions;
      for (let i = 0; i < freq; i++) {
        const newStart = new Date(newOpportunityObject.startTime);
        const newEnd = new Date(newOpportunityObject.endTime);
        if (newOpportunityObject.recurringEventOptions === "Weekly") {
          newStart.setDate(newStart.getDate() + 7);
          newEnd.setDate(newEnd.getDate() + 7);
        } else if (newOpportunityObject.recurringEventOptions === "Biweekly") {
          newStart.setDate(newStart.getDate() + 14);
          newEnd.setDate(newEnd.getDate() + 14);
        } else if (newOpportunityObject.recurringEventOptions === "Monthly") {
          newStart.setMonth(newStart.getMonth() + 1);
          newEnd.setMonth(newEnd.getMonth() + 1);
        }
        newOpportunityObject.startTime = newStart;
        newOpportunityObject.endTime = newEnd;
        await opportunityToDatabase(newOpportunityObject);
      }
    }
  };

  // Reset filters when switching tabs
  useEffect(() => {
    setLocationFilter([]);
    //setOppTypeFilter([]);
    //setOrgTypeFilter([]);
  }, [tab]);

  const tabs = page === "creators" ? creatorTabs : volunteerTabs;

  return (
    <Page>
      <PageHeader
        title={
          page === "creators" ?
          "Opportunity Hosts" :
          "Opportunity Volunteers"
        }
        subtitle={
          page === "creators" ?
          "Create opportunities and find alumni to fill your roles!" :
          "Browse and join opportunities!"
        }
        tabs={<CompressedTabBar data={tabs} tab={tab} setTab={setTab} />}
        components={page === "creators" ? <AddButton onClick={handleModalOpen} /> : null}
      />
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
      {tabs[tab].component}
    </Page>
  );
}
