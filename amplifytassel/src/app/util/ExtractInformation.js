const extractOppKeywords = async (opp) => {
  try {
    // Ensure value is resolved properly before using it
    const value = await opp?.keywords?.values; // Await the promise here

    if (!Array.isArray(value)) {
      console.warn("Expected array for keywords.values but got:", value);
      return []; // Return empty array if value is not an array
    }

    const keywordNames = value
      .map((v) => v.keyword?.name) // Safely access keyword names
      .filter(Boolean); // Remove undefined or null entries

    return keywordNames.sort(); // Sort and return the keywords
  } catch (error) {
    console.error("Error in extractOppKeywords:", error);
    return []; // Return empty array on error
  }
};

const extractUserKeywords = async (userProfile) => {
  try {
    // Ensure value is resolved properly before using it
    const value = await userProfile?.keywords?.values; // Await the promise here

    if (!Array.isArray(value)) {
      console.warn("Expected array for keywords.values but got:", value);
      return []; // Return empty array if value is not an array
    }

    const keywordNames = value
      .map((v) => v.keyword?.name) // Safely access keyword names
      .filter(Boolean); // Remove undefined or null entries

    return keywordNames.sort(); // Sort and return the keywords
  } catch (error) {
    console.error("Error in extractUserKeywords:", error);
    return []; // Return empty array on error
  }
};

export const createOppProfile = async (opp) => {
  try {
    const oppFields = {
      eventID: opp?.id || "",
      eventName: opp?.eventName || "",
      description: opp?.description || "",
      eventData: opp?.eventData || "",
      subject: opp?.subject || "",
      tags: (await extractOppKeywords(opp)) || "",
    };

    if (!oppFields.description && !oppFields.eventData && !oppFields.subject) {
      throw new Error("Failed to retrieve one or more fields.");
    }

    return oppFields;
  } catch (error) {
    console.error("Error in createOppProfile:", error);
    throw error;
  }
};

export const createUserProfile = async (user) => {
  try {
    const userFields = {
      id: user?.id || "",
      description: user?.about || "",
      volunteerExp: user?.volunteerExperience
        ? user.volunteerExperience.map((exp) => exp.description).join(", ")
        : "",
      workExp: user?.experience
        ? user.experience.map((exp) => exp.description).join(", ")
        : "",
      tags: (await extractUserKeywords(user)) || [],
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    };

    return userFields;
  } catch (error) {
    console.error("Error in createUserProfile:", error);
    throw error;
  }
};
