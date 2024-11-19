const extractOppKeywords = async (opp) => {
    try {
      const value = await Promise.resolve(opp?.keywords?.values);
      const keywordNames = [];
      for (let i = 0; i < value.length; i++) {
        const k = await Promise.resolve(value[i].keyword);
        keywordNames.push(k.name);
      }
      keywordNames.sort();
      //setUserKeywords(keywordNames);
      return keywordNames

    } catch (error) {
      console.error(error);
    }
  };

const extractUserKeywords = async (userProfile) => {
    try {
      const value = await Promise.resolve(userProfile?.keywords?.values);
      const keywordNames = [];
      for (let i = 0; i < value.length; i++) {
        const k = await Promise.resolve(value[i].keyword);
        keywordNames.push(k.name);
      }
      keywordNames.sort();
      //setUserKeywords(keywordNames);
      return keywordNames

    } catch (error) {
      console.error(error);
    }
};

export const createOppProfile = async (opp) => {
    const eventID = await opp?.id;
    const eventName = await opp?.eventName;
    const descEvent = await opp?.description;
    const eventData = await opp?.eventData;
    const prefs = await opp?.preferences?.values;
    const sub = await opp?.subject;
    const tags = await extractOppKeywords(await opp);

    const oppFields = {}
    if (descEvent === null && eventData == null 
        && prefs == null && sub == null) {
        return Promise.reject("Failed to retrieve one or more fields.")
    }

    oppFields["eventID"] = eventID ? eventID : "";
    oppFields["eventName"] = eventName ? eventName : "";
    oppFields["description"] = descEvent ? descEvent : "";
    oppFields["eventData"] = eventData ? eventData : "";
    oppFields["subject"] = sub ? sub : "";
    oppFields["tags"] = tags ? tags : "";


    
    return oppFields
}

export const createUserProfile = async (user) => {
        const profileAbout = await user?.about ? await user?.about : "";
        const profileVolunteerExp = await user?.volunteerExperience ? await user?.volunteerExperience : "";
        const profileOrganizationExp = await user?.organizationExperience ? await user?.organizationExperience : "";
        const workExp = await user?.experience ? await user?.experience : [];
        const profileCollege = await user?.college ? await user?.college : "";
        const id = await user.id;   
        const firstName = await user?.firstName;
        const lastName = await user?.lastName;

        const userFields = {}
        userFields["id"] = id;
        userFields["description"] = profileAbout;
        userFields["college"] = profileCollege;
        userFields["volunteerExp"] = user?.volunteerExperience ? (profileVolunteerExp.map(exp => exp.description)).toString() : "";
        userFields["organizationExp"] = user?.organizationExperience ? (profileOrganizationExp.map(exp => exp.description)).toString() : "";
        userFields["workExp"] = (workExp.map(exp => exp.description)).toString();
        userFields["tags"] = await extractUserKeywords(user);
        userFields["firstName"] = firstName;
        userFields["lastName"] = lastName;

        return userFields
}