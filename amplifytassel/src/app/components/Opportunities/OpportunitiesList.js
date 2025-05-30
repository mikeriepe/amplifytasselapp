import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import MuiBox from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import OpportunitiesCard from "./OpportunitiesCard";
import OpportunitiesFilters from "./OpportunitiesFilters";
import ThemedDropdown from "../Themed/ThemedDropdown";
import { Tooltip } from "@mui/material";
import Fuse from "fuse.js";
import useAuth from "../../util/AuthContext";
import { Grid, CircularProgress } from "@mui/material";
import { handleSort } from "../../util/RecommendationAlgorithm";
import { useRecommendations } from "../../context/RecommendationsContext";

const Page = styled((props) => <MuiBox {...props} />)(() => ({
  display: "flex",
  gap: "1em",
  height: "auto",
  width: "auto",
  marginInline: "3em",
  marginBlock: "1em",
}));

/**
 * Creates list of opportunities
 * @param {Object} opportunities
 * @return {JSX}
 */
export default function OpportunitiesList({
  type,
  opportunities,
  locationFilter,
  setLocationFilter,
  oppTypeFilter,
  setOppTypeFilter,
  orgTypeFilter,
  setOrgTypeFilter,
  getPendingOpportunities,
  getCreatedOpportunities,
  getCreatorPendingOpportunities,
  getCreatorPastOpportunities,
  getAllOpportunities,
  getJoinedOpportunities,
}) {
  const [displayOpps, setDisplayOpps] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownSelect, setDropdownSelect] = useState("Major");
  const { recommendedOpps, loading } = useRecommendations();
  const { userProfile } = useAuth();

  // Filter Sorting - Ascending & Descending Order
  const [isAscending, setIsAscending] = useState(true);
  const [sortMessage, setSortMessage] = useState("");
  useEffect(() => {
    applyFilters();
  }, [isAscending]);
  useEffect(() => {
    applyFilters();
  }, [isAscending]);
  const handleDropdown = (dropdown) => {
    setDropdownSelect(dropdown);
  };

  useEffect(() => {
    if (dropdownSelect === "Date") {
      setSortMessage(isAscending ? "Most Recent First" : "Least Recent First");
    } else if (dropdownSelect === "Alphabet") {
      setSortMessage(isAscending ? "A-Z" : "Z-A");
    } else {
      setSortMessage(""); // Clear message if not sorting by Date or Alphabet
    }
  }, [dropdownSelect, isAscending]);

  // Component first renders
  useEffect(() => {
    console.log("Initializing display opps to", opportunities);
    setDisplayOpps(opportunities);
    applyFilters();
  }, [opportunities]);

  // Update displayed opportunities when filters are updated
  useEffect(() => {
    applyFilters();
  }, [locationFilter, oppTypeFilter, orgTypeFilter, search, dropdownSelect]);

  const profileKeywords = [];
  let numProfileKeywords = 0;
  if (userProfile.keywords !== null) {
    numProfileKeywords = Object.keys(userProfile.keywords).length;
  }
  if (userProfile.keywords !== null && numProfileKeywords !== 0) {
    const keys = Object.keys(userProfile.keywords);
    keys.forEach(function (key) {
      profileKeywords.push(userProfile.keywords[key]);
    });
  }

  const calcNumMatchKeywords = async (opp) => {
    const oppKeywords = [];
    const profileKeywords = [];

    try {
      // Fetch userProfile keywords
      const profileKeywordValues = await userProfile?.keywords?.values;
      profileKeywordValues.forEach(function (keywordObj) {
        profileKeywords.push(keywordObj.keywordId);
      });

      // Fetch opportunity keywords
      const oppKeywordValues = await opp?.keywords?.values;
      if (oppKeywordValues.length === 0) {
        //   console.log("EventName", opp.eventName);
        // console.log("returning 0");
        return 0;
      }
      oppKeywordValues.forEach(function (keywordObj) {
        oppKeywords.push(keywordObj.keywordId);
      });

      // Calculate common keywords
      const commonKeywords = oppKeywords.filter((keyword) =>
        profileKeywords.includes(keyword)
      );
      // console.log("EventName", opp.eventName);
      // console.log("Common Keywords", commonKeywords.length);
      return commonKeywords.length;
    } catch (error) {
      console.error("Error fetching keywords:", error);
      return 0;
    }
  };

  const asyncSort = async (array, compareFn) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        array.sort(compareFn);
        resolve(array);
      }, 0);
    });
  };

  // Fuzzy search on given searchData
  // If the search bar is empty, the searchData is all the opps
  // Function is called at the end of applyFilters() with the
  // filtered data set
  const searchOpportunity = (query, searchData = opportunities) => {
    if (!query) {
      console.log("Set Display Opps to:", searchData);
      setDisplayOpps(searchData);
      return;
    }

    const fuse = new Fuse(searchData, {
      // more parameters can be added for search
      keys: ["eventName", "description"],
      threshold: 0.3,
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      console.log("Set Display Opps to:", finalResult);
      setDisplayOpps(finalResult);
    } else {
      console.log("Set Display Opps to:", "[]");
      setDisplayOpps([]);
    }
  };

  const applyFilters = async () => {
    // Filter opportunities based on location
    const locationFilterLower = locationFilter.map((filter) =>
      filter.toLowerCase()
    );

    const copyOpps = opportunities.filter((opp) => {
      const location =
        locationFilterLower.length === 0
          ? true
          : opp.locationType
          ? locationFilterLower.includes(opp.locationType.toLowerCase())
          : false;

      return location;
    });

    // Apply sorting logic
    let filteredOpps;
    if (dropdownSelect === "Recommended") {
      if (recommendedOpps && recommendedOpps.length > 0) {
        // Use cached recommendations if available
        filteredOpps = recommendedOpps.filter((opp) =>
          locationFilterLower.length === 0
            ? true
            : opp.locationType
            ? locationFilterLower.includes(opp.locationType.toLowerCase())
            : false
        );
      } else {
        // Re-run recommendation algorithm if recommendations are empty
        filteredOpps = await handleSort(
          copyOpps,
          userProfile,
          dropdownSelect,
          isAscending
        );
      }
    } else {
      // Use sorting logic for other dropdown selections
      filteredOpps = await handleSort(
        copyOpps,
        userProfile,
        dropdownSelect,
        isAscending
      );
    }

    // Apply search filter
    searchOpportunity(search, filteredOpps);
  };

  return (
    <Page>
      <MuiBox className="flow-small" sx={{ flexGrow: 1 }}>
        <div
          className="flex-horizontal"
          style={{ width: "100%", marginBottom: "1em" }}
        >
          <TextField
            placeholder="Search"
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              style: {
                fontSize: "0.9rem",
                backgroundColor: "white",
                borderRadius: "10px",
                marginRight: "1em",
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
          <div style={{ marginRight: "1em" }}>
            {
              /* Filtering - Ascending/Descending */
              (dropdownSelect === "Alphabet" || dropdownSelect === "Date") && (
                <Tooltip title={sortMessage}>
                  <button
                    onClick={() => setIsAscending((prev) => !prev)}
                    style={{
                      marginLeft: "0.5em",
                      padding: "0.5em",
                      border: "none",
                      backgroundColor: "transparent",
                      //borderRadius: "5px",
                      cursor: "pointer",
                      display: "block",
                    }}
                  >
                    {isAscending ? (
                      <svg
                        fill="#000000"
                        height="20px"
                        width="20px"
                        version="1.1"
                        id="XMLID_227_"
                        xmlns="http://www.w3.org/2000/svg"
                        /*xmlns:xlink="http://www.w3.org/1999/xlink"*/ viewBox="0 0 24 24" /*xml:space="preserve"*/
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g id="ascend">
                            {" "}
                            <g>
                              {" "}
                              <path d="M24,24H11v-2h13V24z M8,24H6V4.1L1.7,7.7L0.4,6.2L7,0.7l6.5,5.5l-1.3,1.5L8,4.1V24L8,24z M22,20H11v-2h11V20z M20,16h-9 v-2h9V16z M18,12h-7v-2h7V12z"></path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                    ) : (
                      <svg
                        fill="#000000"
                        height="20px"
                        width="20px"
                        version="1.1"
                        id="XMLID_226_"
                        xmlns="http://www.w3.org/2000/svg"
                        /*xmlns:xlink="http://www.w3.org/1999/xlink"*/ viewBox="0 0 24 24" /*xml:space="preserve"*/
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g id="descend">
                            {" "}
                            <g>
                              {" "}
                              <path d="M7,23.3l-6.6-5.5l1.3-1.5L6,19.9V0h2v19.9l4.5-3.6l1.3,1.5L7,23.3z M18,14h-7v-2h7C18,12,18,14,18,14z M20,10h-9V8h9 C20,8,20,10,20,10z M22,6H11V4h11C22,4,22,6,22,6z M24,2H11V0h13V2z"></path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                    )}
                  </button>
                </Tooltip>
              )
            }
          </div>
          <div style={{ display: "flex", marginRight: "1em" }}>
            <ThemedDropdown
              menuItems={["Recommended", "Alphabet", "Major", "Date"]}
              sortSelection={handleDropdown}
              value={dropdownSelect}
            />
          </div>
          <OpportunitiesFilters
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            oppTypeFilter={oppTypeFilter}
            setOppTypeFilter={setOppTypeFilter}
            orgTypeFilter={orgTypeFilter}
            setOrgTypeFilter={setOrgTypeFilter}
          />
        </div>
        {loading && dropdownSelect === "Recommended" ? (
          <MuiBox
            sx={{
              display: "flex",
              justifyContent: "center", // Horizontally center
              alignItems: "center", // Vertically center
              height: "100vh", // Full viewport height
            }}
          >
            <CircularProgress
              sx={{
                width: "80px !important", // Make the spinner larger
                height: "80px !important",
              }}
            />
          </MuiBox>
        ) : (
          <Grid container spacing={{ sm: 1, md: 2 }} alignItems="stretch">
            {displayOpps.map((opportunity, index) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                key={`opportunity-${index}`}
                sx={{ display: "flex", padding: 2 }}
              >
                {/* Conditional renderiing to greyout card if browse tab contains a users created opportunity */}
                { opportunity.profileID === (userProfile.id) ? <OpportunitiesCard
                  type={type}
                  opportunity={opportunity}
                  getPendingOpportunities={getPendingOpportunities}
                  getCreatedOpportunities={getCreatedOpportunities}
                  getAllOpportunities={getAllOpportunities}
                  getJoinedOpportunities={getJoinedOpportunities}
                  isMyOpportunity = {true}
                /> : 
                <OpportunitiesCard
                  type={type}
                  opportunity={opportunity}
                  getPendingOpportunities={getPendingOpportunities}
                  getCreatedOpportunities={getCreatedOpportunities}
                  getCreatorPendingOpportunities={getCreatorPendingOpportunities}
                  getCreatorPastOpportunities={getCreatorPastOpportunities}
                  getAllOpportunities={getAllOpportunities}
                  getJoinedOpportunities={getJoinedOpportunities}
                  isMyOpportunity = {false}
                />
                }
              </Grid>
            ))}
          </Grid>
        )}
      </MuiBox>
    </Page>
  );
}
