/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        items {
          id
          roleId
          majorId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Profiles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      opportunityID
      Requests {
        items {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        items {
          id
          roleId
          majorId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Profiles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      opportunityID
      Requests {
        items {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        items {
          id
          roleId
          majorId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Profiles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      opportunityID
      Requests {
        items {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        items {
          id
          majorId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Roles {
        items {
          id
          roleId
          majorId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        items {
          id
          majorId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Roles {
        items {
          id
          roleId
          majorId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        items {
          id
          majorId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Roles {
        items {
          id
          roleId
          majorId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      }
      about
      location {
        zip
        city
        state
        address
      }
      availability {
        year
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
        items {
          id
          majorId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Roles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Posts {
        items {
          id
          title
          content
          createdTimestamp
          profileID
          opportunityID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
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
        }
        nextToken
        startedAt
      }
      OpportunitiesJoined {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      OpportunitiesOwned {
        items {
          id
          zoomLink
          organizations
          description
          isApproved
          eventBanner
          eventName
          startTime
          endTime
          locationType
          eventData
          subject
          preferences
          profileID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      experience {
        end
        start
        title
        company
        location
        description
        currentPosition
      }
      schoolEmail
      infoRequest
      infoResponse
      Requests {
        items {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      }
      about
      location {
        zip
        city
        state
        address
      }
      availability {
        year
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
        items {
          id
          majorId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Roles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Posts {
        items {
          id
          title
          content
          createdTimestamp
          profileID
          opportunityID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
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
        }
        nextToken
        startedAt
      }
      OpportunitiesJoined {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      OpportunitiesOwned {
        items {
          id
          zoomLink
          organizations
          description
          isApproved
          eventBanner
          eventName
          startTime
          endTime
          locationType
          eventData
          subject
          preferences
          profileID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      experience {
        end
        start
        title
        company
        location
        description
        currentPosition
      }
      schoolEmail
      infoRequest
      infoResponse
      Requests {
        items {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      }
      about
      location {
        zip
        city
        state
        address
      }
      availability {
        year
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
        items {
          id
          majorId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Roles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Posts {
        items {
          id
          title
          content
          createdTimestamp
          profileID
          opportunityID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
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
        }
        nextToken
        startedAt
      }
      OpportunitiesJoined {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      OpportunitiesOwned {
        items {
          id
          zoomLink
          organizations
          description
          isApproved
          eventBanner
          eventName
          startTime
          endTime
          locationType
          eventData
          subject
          preferences
          profileID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      experience {
        end
        start
        title
        company
        location
        description
        currentPosition
      }
      schoolEmail
      infoRequest
      infoResponse
      Requests {
        items {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        items {
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
        }
        nextToken
        startedAt
      }
      opportunityID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        items {
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
        }
        nextToken
        startedAt
      }
      opportunityID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        items {
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
        }
        nextToken
        startedAt
      }
      opportunityID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      isApproved
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
      }
      eventData
      subject
      preferences
      Roles {
        items {
          id
          name
          description
          isFilled
          qualifications
          opportunityID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Posts {
        items {
          id
          title
          content
          createdTimestamp
          profileID
          opportunityID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Requests {
        items {
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
        }
        nextToken
        startedAt
      }
      profileID
      profilesJoined {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      isApproved
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
      }
      eventData
      subject
      preferences
      Roles {
        items {
          id
          name
          description
          isFilled
          qualifications
          opportunityID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Posts {
        items {
          id
          title
          content
          createdTimestamp
          profileID
          opportunityID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Requests {
        items {
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
        }
        nextToken
        startedAt
      }
      profileID
      profilesJoined {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      isApproved
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
      }
      eventData
      subject
      preferences
      Roles {
        items {
          id
          name
          description
          isFilled
          qualifications
          opportunityID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Posts {
        items {
          id
          title
          content
          createdTimestamp
          profileID
          opportunityID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Requests {
        items {
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
        }
        nextToken
        startedAt
      }
      profileID
      profilesJoined {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Majors {
          nextToken
          startedAt
        }
        Profiles {
          nextToken
          startedAt
        }
        opportunityID
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      major {
        id
        name
        profiles {
          nextToken
          startedAt
        }
        Roles {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Majors {
          nextToken
          startedAt
        }
        Profiles {
          nextToken
          startedAt
        }
        opportunityID
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      major {
        id
        name
        profiles {
          nextToken
          startedAt
        }
        Roles {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Majors {
          nextToken
          startedAt
        }
        Profiles {
          nextToken
          startedAt
        }
        opportunityID
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      major {
        id
        name
        profiles {
          nextToken
          startedAt
        }
        Roles {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Majors {
          nextToken
          startedAt
        }
        Profiles {
          nextToken
          startedAt
        }
        opportunityID
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      profile {
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
        }
        about
        location {
          zip
          city
          state
          address
        }
        availability {
          year
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
        }
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        OpportunitiesJoined {
          nextToken
          startedAt
        }
        OpportunitiesOwned {
          nextToken
          startedAt
        }
        experience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        schoolEmail
        infoRequest
        infoResponse
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Majors {
          nextToken
          startedAt
        }
        Profiles {
          nextToken
          startedAt
        }
        opportunityID
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      profile {
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
        }
        about
        location {
          zip
          city
          state
          address
        }
        availability {
          year
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
        }
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        OpportunitiesJoined {
          nextToken
          startedAt
        }
        OpportunitiesOwned {
          nextToken
          startedAt
        }
        experience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        schoolEmail
        infoRequest
        infoResponse
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Majors {
          nextToken
          startedAt
        }
        Profiles {
          nextToken
          startedAt
        }
        opportunityID
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      profile {
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
        }
        about
        location {
          zip
          city
          state
          address
        }
        availability {
          year
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
        }
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        OpportunitiesJoined {
          nextToken
          startedAt
        }
        OpportunitiesOwned {
          nextToken
          startedAt
        }
        experience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        schoolEmail
        infoRequest
        infoResponse
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        profiles {
          nextToken
          startedAt
        }
        Roles {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      profile {
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
        }
        about
        location {
          zip
          city
          state
          address
        }
        availability {
          year
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
        }
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        OpportunitiesJoined {
          nextToken
          startedAt
        }
        OpportunitiesOwned {
          nextToken
          startedAt
        }
        experience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        schoolEmail
        infoRequest
        infoResponse
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        profiles {
          nextToken
          startedAt
        }
        Roles {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      profile {
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
        }
        about
        location {
          zip
          city
          state
          address
        }
        availability {
          year
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
        }
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        OpportunitiesJoined {
          nextToken
          startedAt
        }
        OpportunitiesOwned {
          nextToken
          startedAt
        }
        experience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        schoolEmail
        infoRequest
        infoResponse
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        profiles {
          nextToken
          startedAt
        }
        Roles {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      profile {
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
        }
        about
        location {
          zip
          city
          state
          address
        }
        availability {
          year
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
        }
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        OpportunitiesJoined {
          nextToken
          startedAt
        }
        OpportunitiesOwned {
          nextToken
          startedAt
        }
        experience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        schoolEmail
        infoRequest
        infoResponse
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        volunteerExperience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        about
        location {
          zip
          city
          state
          address
        }
        availability {
          year
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
        }
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        OpportunitiesJoined {
          nextToken
          startedAt
        }
        OpportunitiesOwned {
          nextToken
          startedAt
        }
        experience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        schoolEmail
        infoRequest
        infoResponse
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      opportunity {
        id
        zoomLink
        organizations
        description
        isApproved
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
        }
        eventData
        subject
        preferences
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Requests {
          nextToken
          startedAt
        }
        profileID
        profilesJoined {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        volunteerExperience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        about
        location {
          zip
          city
          state
          address
        }
        availability {
          year
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
        }
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        OpportunitiesJoined {
          nextToken
          startedAt
        }
        OpportunitiesOwned {
          nextToken
          startedAt
        }
        experience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        schoolEmail
        infoRequest
        infoResponse
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      opportunity {
        id
        zoomLink
        organizations
        description
        isApproved
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
        }
        eventData
        subject
        preferences
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Requests {
          nextToken
          startedAt
        }
        profileID
        profilesJoined {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        volunteerExperience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        about
        location {
          zip
          city
          state
          address
        }
        availability {
          year
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
        }
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        OpportunitiesJoined {
          nextToken
          startedAt
        }
        OpportunitiesOwned {
          nextToken
          startedAt
        }
        experience {
          end
          start
          title
          company
          location
          description
          currentPosition
        }
        schoolEmail
        infoRequest
        infoResponse
        Requests {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      opportunity {
        id
        zoomLink
        organizations
        description
        isApproved
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
        }
        eventData
        subject
        preferences
        Roles {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Requests {
          nextToken
          startedAt
        }
        profileID
        profilesJoined {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
