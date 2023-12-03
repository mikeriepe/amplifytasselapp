/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createKeyword = /* GraphQL */ `
  mutation CreateKeyword(
    $input: CreateKeywordInput!
    $condition: ModelKeywordConditionInput
  ) {
    createKeyword(input: $input, condition: $condition) {
      id
      name
      Profiles {
        nextToken
        startedAt
        __typename
      }
      Opportunities {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateKeyword = /* GraphQL */ `
  mutation UpdateKeyword(
    $input: UpdateKeywordInput!
    $condition: ModelKeywordConditionInput
  ) {
    updateKeyword(input: $input, condition: $condition) {
      id
      name
      Profiles {
        nextToken
        startedAt
        __typename
      }
      Opportunities {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteKeyword = /* GraphQL */ `
  mutation DeleteKeyword(
    $input: DeleteKeywordInput!
    $condition: ModelKeywordConditionInput
  ) {
    deleteKeyword(input: $input, condition: $condition) {
      id
      name
      Profiles {
        nextToken
        startedAt
        __typename
      }
      Opportunities {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
      id
      name
      email
      website
      description
      instagram
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
      id
      name
      email
      website
      description
      instagram
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
      id
      name
      email
      website
      description
      instagram
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      content
      createdTimestamp
      postID
      profileID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      content
      createdTimestamp
      postID
      profileID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      content
      createdTimestamp
      postID
      profileID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createRole = /* GraphQL */ `
  mutation CreateRole(
    $input: CreateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    createRole(input: $input, condition: $condition) {
      id
      name
      description
      isFilled
      qualifications
      Majors {
        nextToken
        startedAt
        __typename
      }
      Profiles {
        nextToken
        startedAt
        __typename
      }
      opportunityID
      Requests {
        nextToken
        startedAt
        __typename
      }
      capacity
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateRole = /* GraphQL */ `
  mutation UpdateRole(
    $input: UpdateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    updateRole(input: $input, condition: $condition) {
      id
      name
      description
      isFilled
      qualifications
      Majors {
        nextToken
        startedAt
        __typename
      }
      Profiles {
        nextToken
        startedAt
        __typename
      }
      opportunityID
      Requests {
        nextToken
        startedAt
        __typename
      }
      capacity
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteRole = /* GraphQL */ `
  mutation DeleteRole(
    $input: DeleteRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    deleteRole(input: $input, condition: $condition) {
      id
      name
      description
      isFilled
      qualifications
      Majors {
        nextToken
        startedAt
        __typename
      }
      Profiles {
        nextToken
        startedAt
        __typename
      }
      opportunityID
      Requests {
        nextToken
        startedAt
        __typename
      }
      capacity
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createMajor = /* GraphQL */ `
  mutation CreateMajor(
    $input: CreateMajorInput!
    $condition: ModelMajorConditionInput
  ) {
    createMajor(input: $input, condition: $condition) {
      id
      name
      profiles {
        nextToken
        startedAt
        __typename
      }
      Roles {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateMajor = /* GraphQL */ `
  mutation UpdateMajor(
    $input: UpdateMajorInput!
    $condition: ModelMajorConditionInput
  ) {
    updateMajor(input: $input, condition: $condition) {
      id
      name
      profiles {
        nextToken
        startedAt
        __typename
      }
      Roles {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteMajor = /* GraphQL */ `
  mutation DeleteMajor(
    $input: DeleteMajorInput!
    $condition: ModelMajorConditionInput
  ) {
    deleteMajor(input: $input, condition: $condition) {
      id
      name
      profiles {
        nextToken
        startedAt
        __typename
      }
      Roles {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
      id
      email
      volunteerExperience {
        end
        start
        title
        company
        location
        description
        currentPosition
        __typename
      }
      about
      location
      availability {
        year
        __typename
      }
      picture
      firstName
      lastName
      status
      graduationYear
      active
      isAdmin
      isApproved
      Majors {
        nextToken
        startedAt
        __typename
      }
      Roles {
        nextToken
        startedAt
        __typename
      }
      Posts {
        nextToken
        startedAt
        __typename
      }
      Comments {
        nextToken
        startedAt
        __typename
      }
      OpportunitiesJoined {
        nextToken
        startedAt
        __typename
      }
      OpportunitiesOwned {
        nextToken
        startedAt
        __typename
      }
      experience {
        end
        start
        title
        company
        location
        description
        currentPosition
        __typename
      }
      schoolEmail
      infoRequest
      infoResponse
      Requests {
        nextToken
        startedAt
        __typename
      }
      keywords {
        nextToken
        startedAt
        __typename
      }
      banner
      points
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      email
      volunteerExperience {
        end
        start
        title
        company
        location
        description
        currentPosition
        __typename
      }
      about
      location
      availability {
        year
        __typename
      }
      picture
      firstName
      lastName
      status
      graduationYear
      active
      isAdmin
      isApproved
      Majors {
        nextToken
        startedAt
        __typename
      }
      Roles {
        nextToken
        startedAt
        __typename
      }
      Posts {
        nextToken
        startedAt
        __typename
      }
      Comments {
        nextToken
        startedAt
        __typename
      }
      OpportunitiesJoined {
        nextToken
        startedAt
        __typename
      }
      OpportunitiesOwned {
        nextToken
        startedAt
        __typename
      }
      experience {
        end
        start
        title
        company
        location
        description
        currentPosition
        __typename
      }
      schoolEmail
      infoRequest
      infoResponse
      Requests {
        nextToken
        startedAt
        __typename
      }
      keywords {
        nextToken
        startedAt
        __typename
      }
      banner
      points
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
      id
      email
      volunteerExperience {
        end
        start
        title
        company
        location
        description
        currentPosition
        __typename
      }
      about
      location
      availability {
        year
        __typename
      }
      picture
      firstName
      lastName
      status
      graduationYear
      active
      isAdmin
      isApproved
      Majors {
        nextToken
        startedAt
        __typename
      }
      Roles {
        nextToken
        startedAt
        __typename
      }
      Posts {
        nextToken
        startedAt
        __typename
      }
      Comments {
        nextToken
        startedAt
        __typename
      }
      OpportunitiesJoined {
        nextToken
        startedAt
        __typename
      }
      OpportunitiesOwned {
        nextToken
        startedAt
        __typename
      }
      experience {
        end
        start
        title
        company
        location
        description
        currentPosition
        __typename
      }
      schoolEmail
      infoRequest
      infoResponse
      Requests {
        nextToken
        startedAt
        __typename
      }
      keywords {
        nextToken
        startedAt
        __typename
      }
      banner
      points
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createRequest = /* GraphQL */ `
  mutation CreateRequest(
    $input: CreateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    createRequest(input: $input, condition: $condition) {
      id
      status
      responseMessage
      requestTime
      responseTime
      requestMessage
      opportunityID
      roleID
      profileID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateRequest = /* GraphQL */ `
  mutation UpdateRequest(
    $input: UpdateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    updateRequest(input: $input, condition: $condition) {
      id
      status
      responseMessage
      requestTime
      responseTime
      requestMessage
      opportunityID
      roleID
      profileID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteRequest = /* GraphQL */ `
  mutation DeleteRequest(
    $input: DeleteRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    deleteRequest(input: $input, condition: $condition) {
      id
      status
      responseMessage
      requestTime
      responseTime
      requestMessage
      opportunityID
      roleID
      profileID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      content
      createdTimestamp
      profileID
      Comments {
        nextToken
        startedAt
        __typename
      }
      opportunityID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      content
      createdTimestamp
      profileID
      Comments {
        nextToken
        startedAt
        __typename
      }
      opportunityID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      content
      createdTimestamp
      profileID
      Comments {
        nextToken
        startedAt
        __typename
      }
      opportunityID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createOpportunity = /* GraphQL */ `
  mutation CreateOpportunity(
    $input: CreateOpportunityInput!
    $condition: ModelOpportunityConditionInput
  ) {
    createOpportunity(input: $input, condition: $condition) {
      id
      zoomLink
      organizations
      description
      eventBanner
      eventName
      startTime
      endTime
      locationType
      location {
        zip
        city
        state
        address
        __typename
      }
      eventData
      subject
      preferences
      Roles {
        nextToken
        startedAt
        __typename
      }
      Posts {
        nextToken
        startedAt
        __typename
      }
      Requests {
        nextToken
        startedAt
        __typename
      }
      profileID
      profilesJoined {
        nextToken
        startedAt
        __typename
      }
      keywords {
        nextToken
        startedAt
        __typename
      }
      status
      bannerKey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateOpportunity = /* GraphQL */ `
  mutation UpdateOpportunity(
    $input: UpdateOpportunityInput!
    $condition: ModelOpportunityConditionInput
  ) {
    updateOpportunity(input: $input, condition: $condition) {
      id
      zoomLink
      organizations
      description
      eventBanner
      eventName
      startTime
      endTime
      locationType
      location {
        zip
        city
        state
        address
        __typename
      }
      eventData
      subject
      preferences
      Roles {
        nextToken
        startedAt
        __typename
      }
      Posts {
        nextToken
        startedAt
        __typename
      }
      Requests {
        nextToken
        startedAt
        __typename
      }
      profileID
      profilesJoined {
        nextToken
        startedAt
        __typename
      }
      keywords {
        nextToken
        startedAt
        __typename
      }
      status
      bannerKey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteOpportunity = /* GraphQL */ `
  mutation DeleteOpportunity(
    $input: DeleteOpportunityInput!
    $condition: ModelOpportunityConditionInput
  ) {
    deleteOpportunity(input: $input, condition: $condition) {
      id
      zoomLink
      organizations
      description
      eventBanner
      eventName
      startTime
      endTime
      locationType
      location {
        zip
        city
        state
        address
        __typename
      }
      eventData
      subject
      preferences
      Roles {
        nextToken
        startedAt
        __typename
      }
      Posts {
        nextToken
        startedAt
        __typename
      }
      Requests {
        nextToken
        startedAt
        __typename
      }
      profileID
      profilesJoined {
        nextToken
        startedAt
        __typename
      }
      keywords {
        nextToken
        startedAt
        __typename
      }
      status
      bannerKey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createKeywordProfile = /* GraphQL */ `
  mutation CreateKeywordProfile(
    $input: CreateKeywordProfileInput!
    $condition: ModelKeywordProfileConditionInput
  ) {
    createKeywordProfile(input: $input, condition: $condition) {
      id
      keywordId
      profileId
      keyword {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateKeywordProfile = /* GraphQL */ `
  mutation UpdateKeywordProfile(
    $input: UpdateKeywordProfileInput!
    $condition: ModelKeywordProfileConditionInput
  ) {
    updateKeywordProfile(input: $input, condition: $condition) {
      id
      keywordId
      profileId
      keyword {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteKeywordProfile = /* GraphQL */ `
  mutation DeleteKeywordProfile(
    $input: DeleteKeywordProfileInput!
    $condition: ModelKeywordProfileConditionInput
  ) {
    deleteKeywordProfile(input: $input, condition: $condition) {
      id
      keywordId
      profileId
      keyword {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createKeywordOpportunity = /* GraphQL */ `
  mutation CreateKeywordOpportunity(
    $input: CreateKeywordOpportunityInput!
    $condition: ModelKeywordOpportunityConditionInput
  ) {
    createKeywordOpportunity(input: $input, condition: $condition) {
      id
      keywordId
      opportunityId
      keyword {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      opportunity {
        id
        zoomLink
        organizations
        description
        eventBanner
        eventName
        startTime
        endTime
        locationType
        eventData
        subject
        preferences
        profileID
        status
        bannerKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateKeywordOpportunity = /* GraphQL */ `
  mutation UpdateKeywordOpportunity(
    $input: UpdateKeywordOpportunityInput!
    $condition: ModelKeywordOpportunityConditionInput
  ) {
    updateKeywordOpportunity(input: $input, condition: $condition) {
      id
      keywordId
      opportunityId
      keyword {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      opportunity {
        id
        zoomLink
        organizations
        description
        eventBanner
        eventName
        startTime
        endTime
        locationType
        eventData
        subject
        preferences
        profileID
        status
        bannerKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteKeywordOpportunity = /* GraphQL */ `
  mutation DeleteKeywordOpportunity(
    $input: DeleteKeywordOpportunityInput!
    $condition: ModelKeywordOpportunityConditionInput
  ) {
    deleteKeywordOpportunity(input: $input, condition: $condition) {
      id
      keywordId
      opportunityId
      keyword {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      opportunity {
        id
        zoomLink
        organizations
        description
        eventBanner
        eventName
        startTime
        endTime
        locationType
        eventData
        subject
        preferences
        profileID
        status
        bannerKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createRoleMajor = /* GraphQL */ `
  mutation CreateRoleMajor(
    $input: CreateRoleMajorInput!
    $condition: ModelRoleMajorConditionInput
  ) {
    createRoleMajor(input: $input, condition: $condition) {
      id
      roleId
      majorId
      role {
        id
        name
        description
        isFilled
        qualifications
        opportunityID
        capacity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      major {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateRoleMajor = /* GraphQL */ `
  mutation UpdateRoleMajor(
    $input: UpdateRoleMajorInput!
    $condition: ModelRoleMajorConditionInput
  ) {
    updateRoleMajor(input: $input, condition: $condition) {
      id
      roleId
      majorId
      role {
        id
        name
        description
        isFilled
        qualifications
        opportunityID
        capacity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      major {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteRoleMajor = /* GraphQL */ `
  mutation DeleteRoleMajor(
    $input: DeleteRoleMajorInput!
    $condition: ModelRoleMajorConditionInput
  ) {
    deleteRoleMajor(input: $input, condition: $condition) {
      id
      roleId
      majorId
      role {
        id
        name
        description
        isFilled
        qualifications
        opportunityID
        capacity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      major {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createProfileRole = /* GraphQL */ `
  mutation CreateProfileRole(
    $input: CreateProfileRoleInput!
    $condition: ModelProfileRoleConditionInput
  ) {
    createProfileRole(input: $input, condition: $condition) {
      id
      roleId
      profileId
      role {
        id
        name
        description
        isFilled
        qualifications
        opportunityID
        capacity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateProfileRole = /* GraphQL */ `
  mutation UpdateProfileRole(
    $input: UpdateProfileRoleInput!
    $condition: ModelProfileRoleConditionInput
  ) {
    updateProfileRole(input: $input, condition: $condition) {
      id
      roleId
      profileId
      role {
        id
        name
        description
        isFilled
        qualifications
        opportunityID
        capacity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteProfileRole = /* GraphQL */ `
  mutation DeleteProfileRole(
    $input: DeleteProfileRoleInput!
    $condition: ModelProfileRoleConditionInput
  ) {
    deleteProfileRole(input: $input, condition: $condition) {
      id
      roleId
      profileId
      role {
        id
        name
        description
        isFilled
        qualifications
        opportunityID
        capacity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createProfileMajor = /* GraphQL */ `
  mutation CreateProfileMajor(
    $input: CreateProfileMajorInput!
    $condition: ModelProfileMajorConditionInput
  ) {
    createProfileMajor(input: $input, condition: $condition) {
      id
      majorId
      profileId
      major {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateProfileMajor = /* GraphQL */ `
  mutation UpdateProfileMajor(
    $input: UpdateProfileMajorInput!
    $condition: ModelProfileMajorConditionInput
  ) {
    updateProfileMajor(input: $input, condition: $condition) {
      id
      majorId
      profileId
      major {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteProfileMajor = /* GraphQL */ `
  mutation DeleteProfileMajor(
    $input: DeleteProfileMajorInput!
    $condition: ModelProfileMajorConditionInput
  ) {
    deleteProfileMajor(input: $input, condition: $condition) {
      id
      majorId
      profileId
      major {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createOpportunityProfile = /* GraphQL */ `
  mutation CreateOpportunityProfile(
    $input: CreateOpportunityProfileInput!
    $condition: ModelOpportunityProfileConditionInput
  ) {
    createOpportunityProfile(input: $input, condition: $condition) {
      id
      profileId
      opportunityId
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      opportunity {
        id
        zoomLink
        organizations
        description
        eventBanner
        eventName
        startTime
        endTime
        locationType
        eventData
        subject
        preferences
        profileID
        status
        bannerKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateOpportunityProfile = /* GraphQL */ `
  mutation UpdateOpportunityProfile(
    $input: UpdateOpportunityProfileInput!
    $condition: ModelOpportunityProfileConditionInput
  ) {
    updateOpportunityProfile(input: $input, condition: $condition) {
      id
      profileId
      opportunityId
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      opportunity {
        id
        zoomLink
        organizations
        description
        eventBanner
        eventName
        startTime
        endTime
        locationType
        eventData
        subject
        preferences
        profileID
        status
        bannerKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteOpportunityProfile = /* GraphQL */ `
  mutation DeleteOpportunityProfile(
    $input: DeleteOpportunityProfileInput!
    $condition: ModelOpportunityProfileConditionInput
  ) {
    deleteOpportunityProfile(input: $input, condition: $condition) {
      id
      profileId
      opportunityId
      profile {
        id
        email
        about
        location
        picture
        firstName
        lastName
        status
        graduationYear
        active
        isAdmin
        isApproved
        schoolEmail
        infoRequest
        infoResponse
        banner
        points
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      opportunity {
        id
        zoomLink
        organizations
        description
        eventBanner
        eventName
        startTime
        endTime
        locationType
        eventData
        subject
        preferences
        profileID
        status
        bannerKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
