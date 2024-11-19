import React, { createContext, useState, useEffect, useContext } from "react";
import { handleSort } from "../util/RecommendationAlgorithm";
import { DataStore } from "@aws-amplify/datastore";
import { Opportunity } from "../../models";
import useAuth from "../util/AuthContext";

const RecommendationsContext = createContext();

// Custom hook to use the context
export const useRecommendations = () => useContext(RecommendationsContext);

export const RecommendationsProvider = ({ children }) => {
  const { userProfile } = useAuth(); // Access the user profile
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [recommendedOpps, setRecommendedOpps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all opportunities (only when needed)
  const fetchAllOpportunities = async () => {
    try {
      const opportunities = await DataStore.query(Opportunity, (o) =>
        o.and((o) => [o.status.eq("APPROVED"), o.profileID.ne(userProfile.id)])
      );
      const filteredOpportunities = opportunities.filter(
        (opp) => new Date(opp.startTime) > Date.now()
      );
      setAllOpportunities(filteredOpportunities);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };

  // Run the recommendation algorithm
  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const sortedOpportunities = await handleSort(
        allOpportunities,
        userProfile,
        "Recommended",
        true // Sorting direction (ascending)
      );
      setRecommendedOpps(sortedOpportunities);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on login or when allOpportunities changes
  useEffect(() => {
    if (userProfile) {
      fetchAllOpportunities();
    }
  }, [userProfile]);

  useEffect(() => {
    if (allOpportunities.length > 0) {
      fetchRecommendations();
    }
  }, [allOpportunities]);

  return (
    <RecommendationsContext.Provider
      value={{ recommendedOpps, loading, allOpportunities }}
    >
      {children}
    </RecommendationsContext.Provider>
  );
};
