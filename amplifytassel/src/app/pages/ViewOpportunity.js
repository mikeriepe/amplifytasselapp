import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiBox from "@mui/material/Box";
import CompressedTabBar from "../components/CustomComponents/CompressedTabBar";
import PageHeader from "../components/CustomComponents/PageHeader";
import ThemedButton from "../components/Themed/ThemedButton";
import ButtonBase from "@mui/material/ButtonBase";
import ViewOpportunityAbout from "../components/ViewOpportunity/ViewOpportunityAbout";
import ViewOpportunityForums from "../components/ViewOpportunity/ViewOpportunityForums";
import ViewOpportunityMembers from "../components/ViewOpportunity/ViewOpportunityMembers";
import ViewOpportunityRequests from "../components/ViewOpportunity/ViewOpportunityRequests";
import ViewOpportunityFindPeople from "../components/ViewOpportunity/ViewOpportunityPeople";
import useAuth from "../util/AuthContext";
import OpportunityForm from "../components/Opportunities/OpportunityForm";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RequestModal from "../components/CustomComponents/RequestOpportunityModal";
import { toast } from "react-toastify";
import { DataStore, Storage } from "aws-amplify";
import { PointsAddition } from "../util/PointsAddition";
import useAnimation from "../util/AnimationContext";
import { calculateIfUserLeveledUp } from "../util/PointsAddition";
import { useNavigate } from "react-router-dom";
import { Modal, Tooltip, Paper } from "@mui/material";
import {
  Opportunity,
  Profile,
  Request,
  Role,
  RequestStatus,
  ProfileRole,
  OpportunityProfile,
  Keyword,
  KeywordOpportunity,
} from "../../models";
import { v4 as uuidv4 } from "uuid";

const Page = styled((props) => <MuiBox {...props} />)(() => ({
  margin: "2em 2em",
  display: "flex",
  height: "auto",
  width: "auto",
  background: "var(--background-primary)",
}));

const OutlinedIconButton = ({ children, onClick }, props) => (
  <ButtonBase
    component="div"
    onMouseDown={(e) => {
      e.stopPropagation();
    }}
    onClick={
      onClick
        ? onClick
        : async (e) => {
            e.stopPropagation();
            e.preventDefault();
          }
    }
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "40px",
      width: "40px",
      padding: 0,
      background: "transparent",
      border: "0.5px solid rgba(0, 0, 0, 0.15)",
      borderRadius: "5px",
    }}
    {...props}
  >
    {children}
  </ButtonBase>
);

/**
 * Passes fetched data to view opportunity page
 * @return {JSX}
 */
export default function FetchWrapper() {
  const params = useParams();
  const [fetchedData, setFetchedData] = useState(null);

  const getOpportunity = async () => {
    let tempOpp = await DataStore.query(Opportunity, (o) =>
      o.and((o) => [o.id.eq(params.opportunityid)])
    );
    let cpyOpp = {
      ...tempOpp[0],
    };

    let temp1 = await DataStore.query(Profile, (p) =>
      p.and((p) => [
        p.OpportunitiesJoined.opportunity.id.eq(params.opportunityid),
      ])
    );

    let temp2 = await DataStore.query(Role, (r) =>
      r.and((r) => [r.opportunityID.eq(params.opportunityid)])
    );

    let temp3 = await DataStore.query(Keyword, (k) =>
      k.Opportunities.opportunityId.eq(params.opportunityid)
    );

    cpyOpp.profilesJoined = [...temp1];
    cpyOpp.roles = [...temp2];
    cpyOpp.keywords = [...temp3];
    cpyOpp.keywords.sort((a, b) => a.name.localeCompare(b.name));
    setFetchedData(cpyOpp);
  };

  useEffect(() => {
    if (params.opportunityid) {
      getOpportunity();
    }
  }, []);

  return (
    <>
      {fetchedData && fetchedData.profileID && (
        <ViewOpportunity opportunity={fetchedData}/>
      )}
    </>
  );
}

/**
 * View opportunity page
 * @return {JSX}
 */
function ViewOpportunity({ opportunity }) {
  const params = useParams();
  const { userProfile, setUserProfile } = useAuth();
  const [isCreator, setIsCreator] = useState(false);
  const [creator, setCreator] = useState(null);
  const [tab, setTab] = useState(0);
  const [banner, setBanner] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showReqForm, setshowReqForm] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState("");
  const [requestedRole, setRequestedRole] = React.useState("");


  // NEW CODE FOR EDIT OPP BUTTON
const [showEditForm,setShowEditForm] = useState(false)
const [editOppValues,setEditOppValues] = useState({})
// assume roles and keywords are fetched if not empty lists
const oppRoles = useState(false);
const oppKeywords = useState(false);

// opens edit modal with default values
const handleEditModalOpen = () => {
  //Default Values for edit Form
  const editOppFormValues = {
    oppId: opportunity.id,
    starttime: new Date(opportunity.startTime),
    startdate: new Date(opportunity.startTime),
    endtime: new Date(opportunity.endTime),
    enddate: new Date(opportunity.endTime),
    //organization: [],
    zoomLink: opportunity.zoomLink,
    organizations: opportunity.organizations,
    description: opportunity.description,
    //eventBanner : opportunity.eventBanner,
    name: opportunity.eventName,
    startTime: opportunity.startTime,
    endTime: opportunity.endTime,
    locationType: opportunity.locationType,
    location: opportunity.location,
    eventdata: opportunity.eventData,
    subject: opportunity.subject,
    preferences: opportunity.preferences,
    profileID: opportunity.profileID,
    status: opportunity.status,
    Roles: oppRoles,
    keywords: oppKeywords,
    bannerKey: opportunity.bannerKey,
  };

  setEditOppValues(editOppFormValues)
  setShowEditForm(true)

}

// closes edit modal
const handleEditModalClose = () => {
  setShowEditForm(false)
}

  const handleEditOpp = async (data) => {
    if (oppRoles.length > data.roles.length) {
      for (let i = 1; i < data.roles.length; i++) {
        if (oppRoles[i] === data.roles[i]) {
          //keep
        } else {
          DataStore.delete(Role, (r) =>
            r.and((r) => [
              r.name.eq(oppRoles[i].name),
              r.opportunityID.eq(opportunity.id),
            ])
          );
          DataStore.save(
            new Role({
              name: data.roles[i],
              opportunityID: opportunity.id,
            })
          );
        }
      }
      for (let i = data.roles.length; i < oppRoles.length; i++) {
        DataStore.delete(Role, (r) =>
          r.and((r) => [
            r.name.eq(oppRoles[i].name),
            r.opportunityID.eq(opportunity.id),
          ])
        );
      }
    } else if (oppRoles.length < data.roles.length) {
      console.log("data.roles.length is longer...");
      for (let i = 1; i < oppRoles.length; i++) {
        if (oppRoles[i] === data.roles[i]) {
          //keep
        } else {
          DataStore.delete(Role, (r) =>
            r.and((r) => [
              r.name.eq(oppRoles[i].name),
              r.opportunityID.eq(opportunity.id),
            ])
          );
          DataStore.save(
            new Role({
              name: data.roles[i],
              opportunityID: opportunity.id,
            })
          );
        }
      }
      for (let i = oppRoles.length; i < data.roles.length; i++) {
        DataStore.save(
          new Role({
            name: data.roles[i],
            opportunityID: opportunity.id,
          })
        );
      }
    } else {
      console.log("same length...");
      for (let i = 1; i < oppRoles.length; i++) {
        if (oppRoles[i] === data.roles[i]) {
          //keep
        } else {
          DataStore.delete(Role, (r) =>
            r.and((r) => [
              r.name.eq(oppRoles[i].name),
              r.opportunityID.eq(opportunity.id),
            ])
          );
          DataStore.save(
            new Role({
              name: data.roles[i],
              opportunityID: opportunity.id,
            })
          );
        }
      }
    }

    let allKeywords = [];
    const keywordsToUpdate = [];
    DataStore.query(Keyword)
      .then((res) => {
        allKeywords = res;
        allKeywords.sort();
        for (let i = 0; i < res.length; i++) {
          for (let j = 0; j < Object.keys(data.keywords).length; j++) {
            if (data.keywords[`keyword${j}`] === res[i].name) {
              keywordsToUpdate.push(res[i]);
            }
          }
        }
      })
      .then((res) => {
        if (keywordsToUpdate.length > oppKeywords.length) {
          console.log("Need to add keyword relation");
          DataStore.query(KeywordOpportunity).then((res) => {
            let relationshipExists = false;
            for (let j = 0; j < keywordsToUpdate.length; j++) {
              for (let i = 0; i < res.length; i++) {
                if (
                  res[i].keywordId === keywordsToUpdate[j].id &&
                  res[i].opportunityId === opportunity.id
                ) {
                  relationshipExists = true;
                }
              }
              if (relationshipExists === false) {
                DataStore.save(
                  new KeywordOpportunity({
                    keywordId: keywordsToUpdate[j].id,
                    opportunityId: opportunity.id,
                  })
                );
              }
              relationshipExists = false;
            }
          });
        } else if (keywordsToUpdate.length < oppKeywords.length) {
          console.log("Need to delete keyword relation");
          let needToRemove = true;
          for (let i = 0; i < oppKeywords.length; i++) {
            for (let j = 0; j < keywordsToUpdate.length; j++) {
              if (oppKeywords[i] === keywordsToUpdate[j].name) {
                needToRemove = false;
              }
            }
            if (needToRemove === true) {
              let idToRemove = "";
              for (let n = 0; n < allKeywords.length; n++) {
                if (allKeywords[n].name === oppKeywords[i]) {
                  idToRemove = allKeywords[n].id;
                }
              }
              DataStore.delete(KeywordOpportunity, (k) =>
                k.and((k) => [
                  k.keywordId.eq(idToRemove),
                  k.opportunityId.eq(opportunity.id),
                ])
              );
            }
            needToRemove = true;
          }
        } else {
          console.log("No action needed on keyword relations");
        }
      })
      .then(async (res) => {
        if (data.imgData == null) {
          const image = await Storage.get(opportunity.bannerkey, {
            level: "public",
          });
          DataStore.save(
            Opportunity.copyOf(opportunity, (updated) => {
              updated.eventName = data.name;
              updated.description = data.description;
              updated.eventData = data.eventdata;
              updated.startTime = data.startTime.toISOString();
              updated.endTime = data.endTime.toISOString();
              updated.locationType = data.locationType;
              updated.location = data.location;
              updated.organizations = data.organizations;
              updated.subject = data.subject;
              updated.bannerKey = opportunity.bannerKey;
              updated.eventBanner = image;
            })
          ).then((res) => {
            handleEditModalClose();
            console.log(res);
          });
        } else {
          if (data.imgData.name != "sc.jpg") {
            Storage.put(uuidv4() + "-" + data.imgData.name, data.imgData, {
              contentType: data.imgData.type,
            }).then(async (res2) => {
              const image = await Storage.get(res2.key, {
                level: "public",
              });
              if (opportunity.bannerKey != "sc.jpg") {
                await Storage.remove(opportunity.bannerKey);
              }
              //console.log(data.bannerKey);
              DataStore.save(
                Opportunity.copyOf(opportunity, (updated) => {
                  updated.eventName = data.name;
                  updated.description = data.description;
                  updated.eventData = data.eventdata;
                  updated.startTime = data.startTime.toISOString();
                  updated.endTime = data.endTime.toISOString();
                  updated.locationType = data.locationType;
                  updated.location = data.location;
                  updated.organizations = data.organizations;
                  updated.subject = data.subject;
                  updated.bannerKey = res2.key;
                  updated.eventBanner = image;
                })
              ).then((res) => {
                handleEditModalClose();
                console.log(res);
              });
            });
          } else {
            const image = await Storage.get(opportunity.bannerkey, {
              level: "public",
            });
            DataStore.save(
              Opportunity.copyOf(opportunity, (updated) => {
                updated.eventName = data.name;
                updated.description = data.description;
                updated.eventData = data.eventdata;
                updated.startTime = data.startTime.toISOString();
                updated.endTime = data.endTime.toISOString();
                updated.locationType = data.locationType;
                updated.location = data.location;
                updated.organizations = data.organizations;
                updated.subject = data.subject;
                updated.bannerKey = opportunity.bannerKey;
                updated.eventBanner = image;
              })
            ).then((res) => {
              handleEditModalClose();
              console.log(res);
            });
          }
        }
      });
  };

  const navigate = useNavigate();

  const { setShowConfettiAnimation, setShowStarAnimation } = useAnimation();
  // REMOVE REQUESTED ROLE STATE
  // list of all the participants

  useState(opportunity);

  // list of assigned roles in the opportunity
  // console.log(opportunity);
  const [members, setMembers] = useState(opportunity?.profilesJoined);

  const updateMembers = (newMembers) => {
    setMembers(newMembers);
  };

  const handleModalClose = () => {
    setRequestedRole("");
    setshowReqForm(false);
  };

  const handleModalOpen = (role) => {
    setRequestedRole(role);
    setshowReqForm(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteForm(false);
  };

  const handleDeleteModalOpen = () => {
    setShowDeleteForm(true);
  };

  const handleDeleteOpp = async (opportunity) => {
    const modelToDelete = await DataStore.query(Opportunity, opportunity.id);
    DataStore.delete(modelToDelete);
    handleDeleteModalClose();
    navigate("/opportunities");
  };

  const handleRequestMessage = (e) => {
    setRequestMessage(e.target.value);
  };

  const handleRequestClick = (e) => {
    // Send request here
    const requestData = {
      requester: userProfile.id,
      requestmessage: requestMessage,
      opportunityid: opportunity.id,
      role: requestedRole,
    };

    postRequestToOpportunity(requestData);
    setshowReqForm(false);
    setRequestMessage("");
  };

  const postRequestToOpportunity = async (requestData, toasterStr) => {
    // Check if the profile already sent a request to this opportunity
    // extract the general participant role from the roles
    let genParticipantRole = {};
    for (let i = 0; i < opportunity?.roles.length; i++) {
      if (opportunity?.roles[i].name === "General Participant") {
        genParticipantRole = { ...opportunity?.roles[i] };
        break;
      }
    }

    const requests = await DataStore.query(Request, (r) =>
      r.and((r) => [
        r.profileID.eq(requestData.requester),
        r.opportunityID.eq(opportunity?.id),
      ])
    );

    // if the profile applied return toast notification
    if (requests.length > 0) {
      toast.warning(`You Already Applied to This Event`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let toasterStr = "";
      const oldPoints = userProfile.points;
      const isLevelUp = calculateIfUserLeveledUp(oldPoints, 25);
      PointsAddition(25, requestData.requester, setUserProfile);
      if (isLevelUp) {
        // Display confetti animation
        setShowConfettiAnimation(true);
        toasterStr = "and you leveled up!";
      } else {
        // Display star animation
        setShowStarAnimation(true);
        toasterStr = "and you earned 25 points!";
      }

      await DataStore.save(
        new Request({
          status: "PENDING",
          requestTime: new Date().toISOString(),
          requestMessage: requestData.requestmessage,
          opportunityID: requestData.opportunityid,
          roleID: genParticipantRole.id,
          profileID: requestData.requester,
        })
      );
      // toast notification
      toast.success(`Applied to ${opportunity.eventName} ${toasterStr}`, {
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

  const noncreatorTabs = [
    {
      name: "About",
      component: (
        <ViewOpportunityAbout
          isCreator={isCreator && isCreator}
          description={opportunity?.description}
          roles={opportunity?.roles}
          opportunityName={opportunity?.eventName}
          opportunityid={opportunity?.id}
          creator={creator}
          tags={opportunity?.keywords}
        />
      ),
    },
    {
      name: "Forums",
      component: <ViewOpportunityForums id={opportunity.id} />,
    },
  ];

  const creatorTabs = [
    {
      name: "About",
      component: (
        <ViewOpportunityAbout
          isCreator={isCreator && isCreator}
          description={opportunity?.description}
          roles={opportunity?.roles}
          tags={opportunity?.keywords}
        />
      ),
    },
    {
      name: "Forums",
      component: <ViewOpportunityForums id={params.opportunityid} />,
    },
    {
      name: "Applicants",
      component: (
        <ViewOpportunityRequests
          updateMembers={updateMembers}
          members={members}
        />
      ),
    },
    // Find people tab is finally implemented in Spring 2024!
    {
      name: "Find Volunteers",
      component: (
        <ViewOpportunityFindPeople
          opp={opportunity}
          handleCardClick={(profileid) => {
            navigate(`/Profile/${profileid}`);
          }}
        />
      ),
    },
  ];

  const handleIsCreator = () => {
    const check = userProfile.id === opportunity.profileID;
    setIsCreator(check);
  };

  const getOpportunityCreator = async () => {
    DataStore.query(Profile, (p) =>
      p.and((r) => [p.id.eq(opportunity.profileID)])
    )
      .then((res) => {
        // do some stuff
        setCreator(res[0]);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving opportunity creator");
      });
    // there will be only 1 match
    // Add error check here for the case where there are no matching opps
  };

  const downloadFile = async () => {
    const img = await Storage.get(opportunity.bannerKey, {
      level: "public",
    });
    setBanner(img);
  };

  useEffect(() => {
    if (opportunity) {
      getOpportunityCreator();
      handleIsCreator();
    }
    downloadFile();
  }, []);

  return (
    <Page>
      {opportunity && creator && (
        <>
          <MuiBox sx={{ width: "70%", marginRight: "2em" }}>
            <PageHeader
              type="viewopportunity"
              isCreator={isCreator}
              title={opportunity?.eventName}
              subtitle="Hosted by:"
              host={`${creator?.firstName} ${creator?.lastName}`}
              hostprofileid={creator?.id}
              avatar={creator?.picture}
              banner={banner}
              backUrl={"/opportunities"}
              data={opportunity}
              components={
                isCreator ? (
                  <MuiBox>
                    <OutlinedIconButton onClick={handleDeleteModalOpen}>
                      <Tooltip title="Delete">
                        <CloseRoundedIcon
                          aria-label={`Delete ${opportunity.eventName}`}
                          sx={{
                            height: "20px",
                            width: "20px",
                            color: "var(--error-red-main)",
                            stroke: "var(--error-red-main)",
                            strokeWidth: "2px",
                          }}
                        />
                      </Tooltip>
                    </OutlinedIconButton>
                    {/* DELETE OPP MODAL */}
                    <Modal
                      open={showDeleteForm}
                      onBackdropClick={handleDeleteModalClose}
                      onClose={handleDeleteModalClose}
                      sx={{
                        overflow: "scroll",
                        display: "grid",
                        justifyContent: "center",
                      }}
                    >
                      <Paper
                        sx={{
                          backgroundColor: "rgb(240, 240, 240)",
                          zIndex: "10",
                          boxShadow: "-3px 5px 8px 0px rgba(84, 84, 84, 0.81)",
                          borderRadius: "10px",
                          margin: "3rem",
                          padding: "2rem",
                          display: "grid",
                          gridGap: "5px",
                          justifyContent: "center",
                          height: "fit-content",
                        }}
                      >
                        <MuiBox>
                          Are you sure you would like to delete{" "}
                          {opportunity.eventName}?
                        </MuiBox>
                        <MuiBox
                          sx={{
                            display: "grid",
                            gridAutoFlow: "column",
                            gridGap: "10px",
                          }}
                        >
                          <ThemedButton
                            color={"blue"}
                            variant={"themed"}
                            onClick={handleDeleteModalClose}
                            sx={{
                              height: "fit-content",
                            }}
                          >
                            Back
                          </ThemedButton>
                          <ThemedButton
                            aria-label={"Delete Opp"}
                            color={"gray"}
                            variant={"cancel"}
                            onClick={() => handleDeleteOpp(opportunity)}
                            sx={{
                              height: "fit-content",
                            }}
                          >
                            Delete
                          </ThemedButton>
                        </MuiBox>
                      </Paper>
                    </Modal>
                    <OutlinedIconButton onClick={handleEditModalOpen}>
                        <Tooltip title="Edit">
                            <EditRoundedIcon
                                aria-label={`Edit ${opportunity.eventName}`}
                                sx={{
                                    height: "20px",
                                    width: "20px",
                                    color: "var(--secondary-gray-main)",
                                }}
                            />
                        </Tooltip>
                    </OutlinedIconButton>
                    {/* Edit Modal */}
                    <Modal
                        open={showEditForm}
                        onBackdropClick={handleEditModalClose}
                        onClose={handleEditModalClose}
                        sx={{ overflow: "scroll" }}
                    >
                        <OpportunityForm
                            onClose={handleEditModalClose}
                            defaultValues={editOppValues}
                            onSubmit={(data) => {
                                // Handle the submission logic here
                                console.log('Updated Opportunity Data:', data);
                                handleEditModalClose();
                            }}
                        />
                    </Modal>
                  </MuiBox>

                ) : (
                  <ThemedButton
                    aria-label="Request to Join Opportunity"
                    variant="gradient"
                    color="yellow"
                    size="small"
                    onClick={() => {
                      handleModalOpen("General Participant");
                    }}
                  >
                    Request to Join
                  </ThemedButton>
                )
              }
              tabs={
                isCreator ? (
                  <CompressedTabBar
                    type="viewopportunity"
                    data={creatorTabs}
                    tab={tab}
                    setTab={setTab}
                  />
                ) : (
                  <CompressedTabBar
                    type="viewopportunity"
                    data={noncreatorTabs}
                    tab={tab}
                    setTab={setTab}
                  />
                )
              }
              tabNumber={tab}
            />
            {isCreator
              ? creatorTabs[tab].component
              : noncreatorTabs[tab].component}
          </MuiBox>
          <MuiBox sx={{ width: "30%" }}>
            <ViewOpportunityMembers
              isCreator={isCreator}
              owner={{
                name: `${creator?.firstName} ${creator?.lastName}`,
                avatar: creator?.picture,
                profileid: creator?.id,
              }}
              members={members}
              roles={opportunity?.roles}
            />
          </MuiBox>
          <RequestModal
            showReqForm={showReqForm}
            handleModalClose={handleModalClose}
            requestMessage={requestMessage}
            handleRequestMessage={handleRequestMessage}
            handleRequestClick={handleRequestClick}
            opportunityName={opportunity.eventName}
            profile
          />
        </>
      )}
    </Page>
  );
}
