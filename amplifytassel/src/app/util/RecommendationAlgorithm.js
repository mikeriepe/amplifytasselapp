// src/util/RecommendationAlgorithm.js

import { createOppProfile, createUserProfile } from "./ExtractInformation";

export const fetchOpportunities = async (mergedJSON) => {
  const url =
    "https://2vx9se0n7e.execute-api.us-west-1.amazonaws.com/default/recommendation-engine";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mergedJSON),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data["order"];
  } catch (error) {
    console.error("Could not fetch opportunities:", error);
    return []; // Return an empty array to prevent runtime errors
  }
};

export const sortOpportunitiesByCustomOrder = (opportunities, order) => {
  const opportunityMap = new Map(opportunities.map((opp) => [opp.id, opp]));
  return order.map((id) => opportunityMap.get(id)).filter(Boolean); // Filter out undefined entries for robustness
};

export const handleSort = async (
  opps,
  userProfile,
  dropdownSelect,
  isAscending
) => {
  let sortedOpps;

  if (dropdownSelect === "Alphabet") {
    sortedOpps = opps.sort((a, b) => {
      const comparison = a.eventName.localeCompare(b.eventName);
      return isAscending ? comparison : -comparison;
    });
    return sortedOpps;
  } else if (dropdownSelect === "Major") {
    sortedOpps = opps.sort((a, b) =>
      (a.subject ? a.subject : "zzz").localeCompare(
        b.subject ? b.subject : "zzz"
      )
    );
    return sortedOpps;
  } else if (dropdownSelect === "Date") {
    sortedOpps = opps.sort((a, b) => {
      // Use startTime for primary sorting; fall back to endTime if startTimes are equal
      const startA = a.startTime
        ? new Date(a.startTime)
        : new Date("9999-12-31"); // Default far-future date if missing
      const startB = b.startTime
        ? new Date(b.startTime)
        : new Date("9999-12-31");

      // If startTime is the same, sort by endTime
      const endA = a.endTime ? new Date(a.endTime) : new Date("9999-12-31");
      const endB = b.endTime ? new Date(b.endTime) : new Date("9999-12-31");
      const comparison = startA - startB || endA - endB;
      return isAscending ? comparison : -comparison;
      //return endA - endB;
    });
    return sortedOpps;
  } else if (dropdownSelect === "Recommended") {
    try {
      const [userFields, oppProfiles] = await Promise.all([
        createUserProfile(userProfile),
        Promise.all(
          opps.map(async (opp) => {
            try {
              return await createOppProfile(opp);
            } catch (error) {
              console.error(`Error creating profile for opportunity: ${error}`);
              return null; // Skip invalid opportunities
            }
          })
        ),
      ]);

      const validOppProfiles = oppProfiles.filter(Boolean);
      const mergedJSON = { users: [userFields], events: validOppProfiles };

      const orderOfOpps = await fetchOpportunities(mergedJSON);

      return sortOpportunitiesByCustomOrder(opps, orderOfOpps);
    } catch (error) {
      console.error("Error in handleSort:", error);
      return [];
    }
  }
};
