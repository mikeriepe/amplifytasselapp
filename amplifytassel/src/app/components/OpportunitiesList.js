import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import MuiBox from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import OpportunitiesCard from "./OpportunitiesCard";
import OpportunitiesFilters from "./OpportunitiesFilters";
import ThemedDropdown from "./ThemedDropdown";
import Fuse from "fuse.js";
import useAuth from "../util/AuthContext";
import {
  createOppProfile,
  createUserProfile,
} from "../util/ExtractInformation";
import { Grid } from "@mui/material";

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
  getAllOpportunities,
  getJoinedOpportunities,
}) {
  const [displayOpps, setDisplayOpps] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownSelect, setDropdownSelect] = useState("Major");
  const { userProfile } = useAuth();

  const handleDropdown = (dropdown) => {
    console.log(dropdown);
    setDropdownSelect(dropdown);
  };
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
  // Function to sort the opportunities based on the custom order
  function sortOpportunitiesByCustomOrder(opportunities, order) {
    const opportunityMap = new Map();

    // Create a map of opportunities keyed by their ID for quick access
    opportunities.forEach((opportunity) => {
      opportunityMap.set(opportunity.id, opportunity);
    });
    let sortedOpportunities = [];
    //console.log("hello");
    order.forEach((id) => {
      let opp = opportunityMap.get(id);
      sortedOpportunities.push(opp);
    });
    // Create a new sorted array based on the custom order
    //const sortedOpportunities = order.map(id => opportunityMap.get(id)).filter(Boolean);
    return sortedOpportunities;
  }

  // Call lambda function to get matching recommendations
  const fetchOpportunities = async (mergedJSON) => {
    try {
      const url =
        "https://2vx9se0n7e.execute-api.us-west-1.amazonaws.com/default/recommendation-engine";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(mergedJSON),
      });

      const data = await response.json();
      return data["order"];
    } catch (error) {
      console.error("Could not fetch opportunities: ", error);
    }
  };

  const handleSort = async (opps) => {
    let sortedOpps;
    if (dropdownSelect === "Alphabet") {
      sortedOpps = opps.sort((a, b) => a.eventName.localeCompare(b.eventName));
    } else if (dropdownSelect === "Major") {
      sortedOpps = opps.sort((a, b) =>
        (a.subject ? a.subject : "zzz").localeCompare(
          b.subject ? b.subject : "zzz"
        )
      );
    } else if (dropdownSelect === "Recommended") {
      const oppFields = { events: [] };
      const userFields = { users: [] };
      let num = -1;
      for await (const [index, opp] of opps.entries()) {
        num++;
        oppFields.events[num] = {};
        try {
          const oppProfile = createOppProfile(opp);
          var profileRetrieved = true;
          oppProfile
            .then(
              // eslint-disable-next-line no-loop-func
              (oppProfileRes) => {
                oppFields.events[num] = oppProfileRes;
              }
            )
            .catch(
              // eslint-disable-next-line no-loop-func
              () => {
                num--;
                profileRetrieved = false;
              }
            );

          if (!profileRetrieved) {
            continue;
          }

          oppFields.events[num] = await oppProfile;
          console.log("oppFields:", oppFields);
        } catch (error) {
          console.error("Error fetching keywords:", error);
          return 0;
        }
      }

      //Fetch user profile data
      console.log(userProfile);

      userFields.users[0] = await createUserProfile(userProfile);

      console.log("userFields:", userFields);

      console.log("oppFields:", oppFields);

      // Merge JSON objects
      // send this JSON to flask endpoint
      const mergedJSON = Object.assign({}, userFields, oppFields);

      //console.log(mergedJSON);
      const orderOfOpps = await fetchOpportunities(mergedJSON);
      console.log("orderOfOpps", orderOfOpps);
      sortedOpps = sortOpportunitiesByCustomOrder(opps, orderOfOpps);

      /*
        const oppsWithCommonKeywords = [];
        for await (const opp of opps) {
          const commonKeywords = await calcNumMatchKeywords(opp);
          oppsWithCommonKeywords.push({ opp, commonKeywords });
        }

        sortedOpps = oppsWithCommonKeywords.sort((a, b) => b.commonKeywords - a.commonKeywords)
        .map(({ opp }) => opp);
        */
    }

    return sortedOpps;
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
    // Set all filters to lowercase for comparison
    const locationFilterLower = locationFilter.map((filter) => {
      return filter.toLowerCase();
    });

    const oppTypeFilterLower = oppTypeFilter.map((filter) => {
      return filter.toLowerCase();
    });

    const orgTypeFilterLower = orgTypeFilter.map((filter) => {
      return filter.toLowerCase();
    });

    // Filter opportunities and store in displayOpps
    const copyOpps = opportunities.filter((opp) => {
      const location =
        locationFilterLower.length == 0
          ? true
          : opp.locationType
          ? locationFilterLower.indexOf(opp.locationType.toLowerCase()) > -1
          : false;
      /*
      const oppType = oppTypeFilter.length == 0 ?
        true :
        opp.opportunitytype ?
        oppTypeFilterLower.indexOf(opp.opportunitytype.toLowerCase()) > -1 :
        false;
      const orgType = orgTypeFilter.length == 0 ?
        true :
        opp.organizationtype ?
        orgTypeFilterLower.indexOf(opp.organizationtype.toLowerCase()) > -1 :
        false;
      */
      return location; //&& oppType && orgType;
    });

    // setDisplayOpps(copyOpps);
    const filteredOpps = await handleSort(copyOpps);
    // searches the filtered opp list
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
            <ThemedDropdown
              menuItems={["Recommended", "Alphabet", "Major"]}
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
              <OpportunitiesCard
                type={type}
                opportunity={opportunity}
                getPendingOpportunities={getPendingOpportunities}
                getCreatedOpportunities={getCreatedOpportunities}
                getAllOpportunities={getAllOpportunities}
                getJoinedOpportunities={getJoinedOpportunities}
              />
            </Grid>
          ))}
        </Grid>
      </MuiBox>
    </Page>
  );
}
