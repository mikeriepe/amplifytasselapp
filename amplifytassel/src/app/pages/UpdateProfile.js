import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { toast } from "react-toastify";
import useAuth from "../util/AuthContext";
import ThemedInput from "../components/Themed/ThemedInput";
import ThemedButton from "../components/Themed/ThemedButton";
import { InputContext } from "../components/Themed/ThemedInput";
import { MultiSelectContext } from "../components/CustomComponents/MultiSelect";
import { Link } from "react-router-dom";
import WorkExperienceList from "../components/WorkExperience/WorkExperienceList";
import ThemedDropdown from "../components/Themed/ThemedDropdown";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ButtonBase from "@mui/material/ButtonBase";
import WorkExperienceForm from "../components/WorkExperience/WorkExperienceForm";
import WorkExperienceDeleteModal from "../components/WorkExperience/WorkExperienceDeleteModal";
import VolunteerExperienceForm from "../components/VolunteerExperience/VolunteerExperienceForm";
import VolunteerExperienceDeleteModal from "../components/VolunteerExperience/VolunteerExperienceDeleteModal";
import VolunteerExperienceList from "../components/VolunteerExperience/VolunteerExperienceList";
import ProfileBanner from "../components/Profile/ProfileBanner";

// Added by Kenny on 11/3/2024
import OrganizationExperienceForm from "../components/Organization/OrganizationExperienceForm";
import OrganizationExperienceDeleteModal from "../components/Organization/OrganizationExperienceDeleteModal";
import OrganizationExperienceList from "../components/Organization/OrganizationExperienceList";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import Alert from "@mui/material/Alert";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import CheckIcon from "@mui/icons-material/Check";

import useAnimation from "../util/AnimationContext";
import { DataStore } from "@aws-amplify/datastore";
import {
  Keyword,
  KeywordProfile,
  Profile,
  Major,
  ProfileMajor,
} from "../../models";
import MultiSelect from "../components/CustomComponents/MultiSelect";
import { Dataset } from "@mui/icons-material";
import { PointsAddition } from "../util/PointsAddition";

// Animations
import { calculateIfUserLeveledUp } from "../util/PointsAddition";

const Page = styled((props) => <MuiBox {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1em",
  marginBlock: "1em",
  overflow: "auto",
}));

const OutlinedIconButton = ({ children }, props) => (
  <ButtonBase
    component="div"
    onMouseDown={(e) => {
      e.stopPropagation();
    }}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
    }}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "40px",
      width: "40px",
      padding: 0,
      background: "transparent",
    }}
    {...props}
  >
    {children}
  </ButtonBase>
);

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

/**
 * updates Profile Calendar
 * @return {HTML} Update Profile component
 */
export default function UpdateProfile() {
  const navigate = useNavigate();
  const { user, userProfile, setUserProfile } = useAuth();
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showDeleteVolunteerModal, setShowDeleteVolunteerModal] =
    useState(false);
  
  // Added by Kenny for Organization/Club Activity - 11/3/2024
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);
  const [showDeleteOrganizationModal, setShowDeleteOrganizationModal] = useState(false);
  
  const [selectedMajors, setSelectedMajors] = useState([]);
  const [totalMajors, setTotalMajors] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);
  const [values, setValues] = useState({
    1: {
      graduationYear: userProfile.graduationYear,
      location: userProfile.location,
      about: userProfile.about,
      linkedin: userProfile.linkedin,
      // Added by Kenny Losier 11/3/2024:
      username: userProfile.username,
      college: userProfile.college,
      firstName: userProfile.firstName || "",
      lastName: userProfile.lastName || "",
    },
  });

  // animations
  const { setShowConfettiAnimation, setShowStarAnimation } = useAnimation();
  // add util file and util functions that adds the points when called
  const handleDeleteTag = (tagIndex) => () => {
    const tempSelectedTags = [...selectedKeywords];
    // add the to be deleted tag back to all tags
    const tempAllTags = [...allKeywords];
    tempAllTags.push(tempSelectedTags[tagIndex]);
    // delete the tag from the selected tags array
    tempSelectedTags.splice(tagIndex, 1);
    // update the arrays
    setSelectedKeywords(tempSelectedTags);
    setAllKeywords(tempAllTags);
  };

  const handleAddTag = (tagIndex) => () => {
    const tempAllTags = [...allKeywords];
    // add the tag to the selected tags array
    const tempSelectedTags = [...selectedKeywords];
    tempSelectedTags.push(tempAllTags[tagIndex]);

    // delete the to be added tag from all tags array
    tempAllTags.splice(tagIndex, 1);
    // update the arrays
    setSelectedKeywords(tempSelectedTags);
    setAllKeywords(tempAllTags);
  };

  const calculatePointsEarned = async (
    userProfile,
    selctdMajors,
    selctdKeywords,
    selctdVals
  ) => {
    var pointsToBeAdded = 0;

    // Check location
    if (userProfile.location === null && selctdVals[1].location !== null) {
      pointsToBeAdded += 20;
    }

    // Check username - added by Kenny 11/3/2024
    if (userProfile.username === null && selctdVals[1].username !== null) {
      pointsToBeAdded += 20;
    }

    // Check college - added by Kenny 11/3/2024
    if (userProfile.college === null && selctdVals[1].college !== null) {
      pointsToBeAdded += 20;
    }

    // Check about
    if (userProfile.about === null && selctdVals[1].about !== null) {
      pointsToBeAdded += 20;
    }

    const existingKeywords = await DataStore.query(KeywordProfile, (kp) =>
      kp.profileId.eq(userProfile.id)
    );
    // Check Keywords
    if (existingKeywords.length === 0 && selctdKeywords.length > 0) {
      pointsToBeAdded += 20;
    }

    const existingMajors = await DataStore.query(ProfileMajor, (pm) =>
      pm.profileId.eq(userProfile.id)
    );
    // Check Majors
    if (existingMajors.length === 0 && selctdMajors.length > 0) {
      pointsToBeAdded += 20;
    }

    return pointsToBeAdded;
  };

  // selectedTags, keywords, selectedMajors, majors
  const updateProfile = async () => {
    // Calculate the points and add them
    const pointsToAdd = await calculatePointsEarned(
      userProfile,
      selectedMajors,
      selectedKeywords,
      values
    );
    const oldPoints = userProfile.points;
    PointsAddition(pointsToAdd, userProfile.id, setUserProfile);
    // Check if they leveled up
    let toasterStr = "";
    if (pointsToAdd > 0) {
      const isLevelUp = calculateIfUserLeveledUp(oldPoints, pointsToAdd);
      if (isLevelUp) {
        // Display confetti animation
        setShowConfettiAnimation(true);
        toasterStr = "and you leveled up!";
      } else {
        // Display star animation
        setShowStarAnimation(true);
        toasterStr = `and you earned ${pointsToAdd} points!`;
      }
    }

    // console.log('selectedKeywords', selectedKeywords);
    // console.log('allKeywoards', allKeywords);
    // // UPDATE KEYWORDS Relationship(so that it == selectedKeywords)
    const selectedKeywordIDs = selectedKeywords.map((keyword) => keyword.id);
    // console.log('selectedKeywordIDs', selectedKeywordIDs);
    const keywordProfiles = await DataStore.query(KeywordProfile, (kp) =>
      kp.profileId.eq(userProfile.id)
    );
    // delete keywords that no longer belong to profile(not in selectedKeywords)
    for (const keywordProfile of keywordProfiles) {
      if (!selectedKeywordIDs.includes(keywordProfile.keywordId)) {
        await DataStore.delete(keywordProfile);
      }
    }
    // add new keywords(keywords that are in selectedKeywords but not in keywordProfiles)
    const kpKeywordIDs = keywordProfiles.map((kp) => kp.keywordId);
    // console.log('kpKeywordIDs', kpKeywordIDs);
    for (const selectedKeywordID of selectedKeywordIDs) {
      if (!kpKeywordIDs.includes(selectedKeywordID)) {
        let keyword = await DataStore.query(Keyword, selectedKeywordID);
        let profile = await DataStore.query(Profile, userProfile.id);
        // console.log('keyword', keyword);
        // console.log('profile', profile);
        await DataStore.save(
          new KeywordProfile({
            keyword: keyword,
            profile: profile,
          })
        );
      }
    }

    // Update Majors Relationship
    const profileMajors = await DataStore.query(ProfileMajor, (pm) =>
      pm.profileId.eq(userProfile.id)
    );
    // console.log('profileMajors', profileMajors);
    for (const pm of profileMajors) {
      await DataStore.delete(pm);
    }
    const profile = await DataStore.query(Profile, userProfile.id);
    for (const majorName of selectedMajors) {
      let [major] = await DataStore.query(Major, (m) => m.name.eq(majorName));
      // console.log('major', major);
      await DataStore.save(
        new ProfileMajor({
          major: major,
          profile: profile,
        })
      );
    }

    // Update Profile Fields: graduationYear, location, about
    let res = await DataStore.query(Profile, userProfile.id);
    console.log(res);
    await DataStore.save(
      Profile.copyOf(res, (updated) => {
        updated.graduationYear = values[1].graduationYear;
        updated.location = values[1].location;
        updated.about = values[1].about;
        updated.linkedin = values[1].linkedin;
        updated.username = values[1].username;
        updated.college = values[1].college;
        updated.firstName = values[1].firstName;
        updated.lastName = values[1].lastName;
      })
    );
    res = await DataStore.query(Profile, userProfile.id);
    setUserProfile(res);
    // console.log('userProfile', userProfile);
    toast.success(`Account updated ${toasterStr}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    // get selectedKeywords, keywords, allKeywords
    DataStore.query(Keyword, (k) => k.Profiles.profile.id.eq(userProfile.id))
      .then((keywords) => {
        keywords = keywords.sort(function (a, b) {
          return a.name > b.name ? 1 : -1;
        });
        setSelectedKeywords(keywords);
        setValues({
          1: {
            graduationYear: userProfile.graduationYear,
            majors: null, //FIXME
            location: userProfile.location,
            about: userProfile.about,
            keywords: keywords,
            linkedin: userProfile.linkedin,
            username: userProfile.username,
            college: userProfile.college,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
          },
        });
        DataStore.query(Keyword).then((keywordsAll) => {
          // console.log('keywords', keywords);
          // console.log('keywordsAll', keywordsAll);
          keywordsAll = keywordsAll.sort(function (a, b) {
            return a.name > b.name ? 1 : -1;
          });
          let keywordsIdArray = keywords.map((obj) => obj.id);
          setAllKeywords(
            keywordsAll.filter((k) => !keywordsIdArray.includes(k.id))
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // get all majors
    DataStore.query(Major)
      .then((majorsTotal) => {
        // console.log('majorsTotal', majorsTotal);
        majorsTotal = majorsTotal.sort(function (a, b) {
          return a.name > b.name ? 1 : -1;
        });
        setTotalMajors(majorsTotal.map((major) => major.name));
        return DataStore.query(Major, (m) =>
          m.profiles.profileId.eq(userProfile.id)
        );
      })
      .then((majorsSelected) => {
        // console.log('majorsSelected', majorsSelected.map(major => major.name));
        setSelectedMajors(majorsSelected.map((major) => major.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form behavior

    // Validate required fields
    if (!values[1].username.trim()) {
      toast.error(`Username is required`, toastOptions);
      return;
    }

    if (values[1].username.length > 20) {
      toast.error(`Username is too long`, toastOptions);
      return;
    }

    if (!values[1].graduationYear.trim()) {
      toast.error(`Gradutaion Year is required`, toastOptions);
      return;
    }

    try {
      await updateProfile();
      navigate("/myProfile");
    } catch (error) {
      toast.error(`Failed to update profile`, toastOptions);
    }
  };

  return (
    <Page>
      <InputContext.Provider value={[values, setValues]}>
        <MultiSelectContext.Provider
          value={[selectedMajors, setSelectedMajors]}
        >
          <Box className="updatepage" width="100%" aria-label="Signup form">
            <Box className="update-card-content">
              <div className="flex-space-multi" style={{ display: null }}>
                <div>
                  {(userProfile.points === null ||
                    userProfile.points === 0) && (
                    <div>
                      <Alert
                        style={{
                          width: "800px",
                          marginTop: "20px",
                          textAlign: "center",
                        }}
                        severity="info"
                        icon={<InfoIcon fontSize="inherit" className="icon" />}
                      >
                        <div className="alert-text" color="warning">
                          Earn <strong>+100</strong> Tassel points by filling
                          out your profile!
                        </div>
                      </Alert>
                      <div>
                        <br></br>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-normal">Update Profile</h2>
                </div>
                <div className="grid-flow-large" width="100%">
                  <div
                    className="flex-horizontal flex-space-between"
                    aria-label={"Update Profile Real Name"}
                    style={{ marginTop: "1em", display: "flex", gap: "1em", width: "100%" }}
                    >
                  <div style={{ flex: "1" }}>
                    <p className="text-bold">
                      Real First Name
                      {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                    </p>
                    <ThemedInput
                      placeholder={"First Name"}
                      type={"text"}
                      index={"firstName"}
                      step={1}
                      fill={"firstName"}
                      content={values[1].firstName}
                      required={true} // Make the input required
                      onChange={(e) =>
                        setValues((prevValues) => ({
                          ...prevValues,
                          1: {
                            ...prevValues[1],
                            firstName: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div style = {{ flex: "1" }}>
                    <p className="text-bold">Real Last Name</p>
                    <ThemedInput
                      placeholder={"Last Name"}
                      type={"text"}
                      index={"lastName"}
                      step={1}
                      fill={"lastName"}
                      content={values[1].lastName}
                      required={true}
                      onChange={(e) =>
                        setValues((prevValues) => ({
                          ...prevValues,
                          1: {
                            ...prevValues[1],
                            lastName: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  </div>
                  <div
                    className="grid-flow-small"
                    aria-label={"Update Profile Username"}
                  >
                    <p className="text-bold">
                      Username
                      {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                    </p>
                    <ThemedInput
                      placeholder={"e.g., Bobsmith1"}
                      type={"text"}
                      index={"username"}
                      step={1}
                      fill={"username"}
                      content={values[1].username}
                      required={true}
                      onChange={(e) => {
                        /*setValues((prevValues) => ({
                          ...prevValues,
                          1: {
                            ...prevValues[1],
                            username: e.target.value,
                          },
                        }))
                      }*/ // Added below to ensure a character limit //
                        const newValue = values[1].username.slice(0, 20);
                        if (newValue.length <= 20) {
                          setValues((prevValues) => ({
                            ...prevValues,
                            1: {
                              ...prevValues[1],
                              username: newValue,
                            },
                          }));
                        }
                      }}
                    />
                    {values[1].username && values[1].username.length > 20 && (
                      <p className="text-warning" style={{ color: "red", fontSize: "small" }}>
                        Usernames are limited to a maximum of 20 characters
                      </p>
                    )}
                  </div>
                  <div
                    className="grid-flow-small"
                    aria-label={"Update Profile Major"}
                  >
                    <p className="text-bold">
                      Major
                      {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                    </p>
                    <div>
                      {totalMajors.length && <MultiSelect data={totalMajors} />}
                    </div>
                  </div>
                  <div
                    className="grid-flow-small"
                    aria-label={"Update Profile Grad Year"}
                  >
                    <p className="text-bold">
                      Graduation Year
                      {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                    </p>
                    <ThemedInput
                      placeholder={"Enter your graduation year"}
                      type={"text"}
                      index={"graduationYear"}
                      step={1}
                      fill={"graduationYear"}
                      content={
                        values[1].graduationYear === ""
                          ? null
                          : values[1].graduationYear
                      }
                      required={true} // Make the input required
                      onChange={(e) =>
                        setValues((prevValues) => ({
                          ...prevValues,
                          1: {
                            ...prevValues[1],
                            graduationYear: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div
                    className="grid-flow-small"
                    aria-label={"Update Profile Location"}
                  >
                    <p className="text-bold">
                      Location
                      {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                    </p>

                    <ThemedInput
                      placeholder={"Santa Cruz, CA"}
                      type={"text"}
                      index={"location"}
                      step={1}
                      fill={"location"}
                      content={
                        values[1].location === "" ? null : values[1].location
                      }
                    />
                  </div>
                  <div
                    className="grid-flow-small"
                    aria-label={"Update Socials"}
                  >
                    <p className="text-bold">
                      Socials
                      {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                    </p>
                    <ThemedInput
                      placeholder={"LinkedIn Link"}
                      type={"text"}
                      index={"linkedin"}
                      step={1}
                      fill={"linkedin"}
                      content={
                        values[1].linkedin === "" ? null : values[1].linkedin
                      }
                    />
                  </div>
                  <div
                    className="grid-flow-small"
                    aria-label={"Update Profile College"}
                  >
                    <p className="text-bold">
                      College Affiliation
                      {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                    </p>
                    <ThemedInput
                      placeholder={"e.g., Cowell College"}
                      type={"text"}
                      index={"college"}
                      step={1}
                      fill={"college"}
                      content={
                        values[1].college === "" ? null : values[1].college
                      }
                    />
                  </div>
                  <div
                    className="grid-flow-small"
                    aria-label={"Update Profile About"}
                  >
                    <p className="text-bold">
                      About You
                      {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                    </p>
                    <ThemedInput
                      placeholder={"Tell people a little about yourself"}
                      type={"text"}
                      index={"about"}
                      step={1}
                      fill={"about"}
                      content={values[1].about === "" ? null : values[1].about}
                    />
                  </div>
                  <div className="grid-flow-small">
                    <div
                      className="flex-space-between flex-align-center"
                      style={{ background: "var(--background-primary)" }}
                    >
                      <p
                        className="text-bold"
                        aria-label={"Update Profile Work Experience"}
                      >
                        Work Experience
                        {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                      </p>
                      <div className="flex-space-between flex-align-center">
                        {
                          <OutlinedIconButton>
                            <RemoveIcon
                              aria-label={"Remove Work Experience"}
                              sx={{
                                height: "20px",
                                width: "20px",
                                color: "var(--text-gray)",
                                stroke: "var(--text-gray)",
                                strokeWidth: "2px",
                              }}
                              onClick={() => setShowDeleteModal(true)}
                            />
                          </OutlinedIconButton>
                        }
                        {
                          <OutlinedIconButton>
                            <AddIcon
                              aria-label={"Add Work Experience"}
                              sx={{
                                height: "20px",
                                width: "20px",
                                color: "var(--text-gray)",
                                stroke: "var(--text-gray)",
                                strokeWidth: "2px",
                              }}
                              onClick={() => setShowWorkForm(true)}
                            />
                          </OutlinedIconButton>
                        }
                      </div>
                    </div>
                    <WorkExperienceList
                      workExperience={userProfile.experience}
                    />
                  </div>
                  <div className="grid-flow-small">
                    <div
                      className="flex-space-between flex-align-center"
                      style={{ background: "var(--background-primary)" }}
                    >
                      <p
                        className="text-bold"
                        aria-label={"Update Profile Volunteer Experience"}
                      >
                        Volunteer Experience
                        {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                      </p>
                      <div className="flex-space-between flex-align-center">
                        {
                          <OutlinedIconButton>
                            <RemoveIcon
                              aria-label={"Remove Volunteer Experience"}
                              sx={{
                                height: "20px",
                                width: "20px",
                                color: "var(--text-gray)",
                                stroke: "var(--text-gray)",
                                strokeWidth: "2px",
                              }}
                              onClick={() => setShowDeleteVolunteerModal(true)}
                            />
                          </OutlinedIconButton>
                        }
                        {
                          <OutlinedIconButton>
                            <AddIcon
                              aria-label={"Add Volunteer Experience"}
                              sx={{
                                height: "20px",
                                width: "20px",
                                color: "var(--text-gray)",
                                stroke: "var(--text-gray)",
                                strokeWidth: "2px",
                              }}
                              onClick={() => setShowVolunteerForm(true)}
                            />
                          </OutlinedIconButton>
                        }
                      </div>
                    </div>
                    <VolunteerExperienceList
                      volunteerExperience={userProfile.volunteerExperience}
                    />
                  </div>
                  <div className="grid-flow-small">
                    <div
                      className="flex-space-between flex-align-center"
                      style={{ background: "var(--background-primary)" }}
                    >
                      <p
                        className="text-bold"
                        aria-label={"Update Profile Organization"}
                      >
                        Organization/Club Activity
                        {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                      </p>
                      <div className="flex-space-between flex-align-center">
                        {
                          <OutlinedIconButton>
                            <RemoveIcon
                              aria-label={"Remove Organization"}
                              sx={{
                                height: "20px",
                                width: "20px",
                                color: "var(--text-gray)",
                                stroke: "var(--text-gray)",
                                strokeWidth: "2px",
                              }}
                              onClick={() => setShowDeleteOrganizationModal(true)}
                            />
                          </OutlinedIconButton>
                        }
                        {
                          <OutlinedIconButton>
                            <AddIcon
                              aria-label={"Add Organization"}
                              sx={{
                                height: "20px",
                                width: "20px",
                                color: "var(--text-gray)",
                                stroke: "var(--text-gray)",
                                strokeWidth: "2px",
                              }}
                              onClick={() => setShowOrganizationForm(true)}
                            />
                          </OutlinedIconButton>
                        }
                      </div>
                    </div>
                    <OrganizationExperienceList
                      organizationExperience={userProfile.organizationExperience}
                    />
                  </div>
                  <div className="grid-flow-small">
                    <div
                      className="flex-space-between flex-align-center"
                      style={{ background: "var(--background-primary)" }}
                    >
                      <p
                        className="text-bold"
                        aria-label={"Update Profile Interests"}
                      >
                        Interests
                        {/* <Tooltip title="Fill out this field to get 10 points" arrow>
                        <HelpIcon fontSize="small" style={{ cursor: 'pointer', marginLeft: '5px' , marginBottom: '-5px', color:'gray' }} />
                      </Tooltip> */}
                      </p>
                    </div>
                    <div className="flex">
                      <div className="flex-justify-center">
                        <p
                          className="flex-justify-center
                        text-bold"
                        >
                          Your Interests
                        </p>
                      </div>
                      <div>
                        {selectedKeywords && (
                          <div
                            className="border"
                            aria-label="Update Profile Interests Chips"
                          >
                            {selectedKeywords.map((label, index) => (
                              <div key={index} className="label-box">
                                <Chip
                                  data-test-id={`Interests ${label.id}`}
                                  label={label.name}
                                  key={`role${index}`}
                                  id={index.toString()}
                                  sx={{
                                    padding: "5px",
                                    margin: "2px",
                                  }}
                                  onDelete={handleDeleteTag(index)}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <p
                          className="flex-justify-center
                        text-bold "
                        >
                          Categories
                        </p>

                        <div>
                          {allKeywords && (
                            <div className="border">
                              {allKeywords.map((label, index) => (
                                <Chip
                                  data-test-id={`Categories ${label.id}`}
                                  label={label.name}
                                  key={`role${index}`}
                                  id={index.toString()}
                                  sx={{
                                    padding: "5px",
                                    margin: "2px",
                                  }}
                                  onClick={handleAddTag(index)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid-flow-small">
                  <div className="flex-flow-large">
                    <Link to="/myprofile">
                      <ThemedButton
                        aria-label="Next step button"
                        color={"blue"}
                        variant={"themed"}
                      >
                        Back
                      </ThemedButton>
                    </Link>
                    <ThemedButton
                      aria-label="Next step button"
                      color={"yellow"}
                      variant={"themed"}
                      onClick={handleSubmit}
                    >
                      Save
                    </ThemedButton>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </MultiSelectContext.Provider>
      </InputContext.Provider>
      <Modal
        open={showWorkForm}
        onBackdropClick={() => setShowWorkForm(false)}
        onClose={() => setShowWorkForm(false)}
      >
        <WorkExperienceForm onClose={() => setShowWorkForm(!showWorkForm)} />
      </Modal>
      <Modal
        open={showDeleteModal}
        onBackdropClick={() => setShowDeleteModal(false)}
        onClose={() => setShowDeleteModal(false)}
      >
        <WorkExperienceDeleteModal
          onClose={() => setShowDeleteModal(!showDeleteModal)}
        />
      </Modal>
      <Modal
        open={showOrganizationForm}
        onBackdropClick={() => setShowOrganizationForm(false)}
        onClose={() => setShowOrganizationForm(false)}
      >
        <OrganizationExperienceForm onClose={() => setShowOrganizationForm(!showOrganizationForm)} />
      </Modal>
      <Modal
        open={showDeleteOrganizationModal}
        onBackdropClick={() => setShowDeleteOrganizationModal(false)}
        onClose={() => setShowDeleteOrganizationModal(false)}
      >
        <OrganizationExperienceDeleteModal
          onClose={() => setShowDeleteOrganizationModal(!showDeleteOrganizationModal)}
        />
      </Modal>
      <Modal
        open={showVolunteerForm}
        onBackdropClick={() => setShowVolunteerForm(false)}
        onClose={() => setShowVolunteerForm(false)}
      >
        <VolunteerExperienceForm
          onClose={() => setShowVolunteerForm(!showVolunteerForm)}
        />
      </Modal>
      <Modal
        open={showDeleteVolunteerModal}
        onBackdropClick={() => setShowDeleteVolunteerModal(false)}
        onClose={() => setShowDeleteVolunteerModal(false)}
      >
        <VolunteerExperienceDeleteModal
          onClose={() => setShowDeleteVolunteerModal(!showDeleteVolunteerModal)}
        />
      </Modal>
    </Page>
  );
}
