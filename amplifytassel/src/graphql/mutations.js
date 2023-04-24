/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
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
        }
        nextToken
      }
      Profiles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        nextToken
      }
      Profiles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        nextToken
      }
      Profiles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        nextToken
      }
      Roles {
        items {
          id
          roleId
          majorId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        nextToken
      }
      Roles {
        items {
          id
          roleId
          majorId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        nextToken
      }
      Roles {
        items {
          id
          roleId
          majorId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        nextToken
      }
      Roles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
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
        }
        nextToken
      }
      OpportunitiesOwned {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
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
      createdAt
      updatedAt
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
        }
        nextToken
      }
      Roles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
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
        }
        nextToken
      }
      OpportunitiesOwned {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
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
      createdAt
      updatedAt
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
        }
        nextToken
      }
      Roles {
        items {
          id
          roleId
          profileId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
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
        }
        nextToken
      }
      OpportunitiesOwned {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
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
      createdAt
      updatedAt
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
        }
        nextToken
      }
      opportunityID
      createdAt
      updatedAt
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
        }
        nextToken
      }
      opportunityID
      createdAt
      updatedAt
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
        }
        nextToken
      }
      opportunityID
      createdAt
      updatedAt
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
        }
        nextToken
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
        }
        nextToken
      }
      Owners {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        nextToken
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
        }
        nextToken
      }
      Owners {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        nextToken
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
        }
        nextToken
      }
      Owners {
        items {
          id
          profileId
          opportunityId
          createdAt
          updatedAt
        }
        nextToken
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
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        Profiles {
          nextToken
        }
        opportunityID
        Requests {
          nextToken
        }
        createdAt
        updatedAt
      }
      major {
        id
        name
        profiles {
          nextToken
        }
        Roles {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        }
        Profiles {
          nextToken
        }
        opportunityID
        Requests {
          nextToken
        }
        createdAt
        updatedAt
      }
      major {
        id
        name
        profiles {
          nextToken
        }
        Roles {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        }
        Profiles {
          nextToken
        }
        opportunityID
        Requests {
          nextToken
        }
        createdAt
        updatedAt
      }
      major {
        id
        name
        profiles {
          nextToken
        }
        Roles {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        }
        Profiles {
          nextToken
        }
        opportunityID
        Requests {
          nextToken
        }
        createdAt
        updatedAt
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
        }
        Roles {
          nextToken
        }
        Posts {
          nextToken
        }
        Comments {
          nextToken
        }
        OpportunitiesOwned {
          nextToken
        }
        Requests {
          nextToken
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        }
        Profiles {
          nextToken
        }
        opportunityID
        Requests {
          nextToken
        }
        createdAt
        updatedAt
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
        }
        Roles {
          nextToken
        }
        Posts {
          nextToken
        }
        Comments {
          nextToken
        }
        OpportunitiesOwned {
          nextToken
        }
        Requests {
          nextToken
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        }
        Profiles {
          nextToken
        }
        opportunityID
        Requests {
          nextToken
        }
        createdAt
        updatedAt
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
        }
        Roles {
          nextToken
        }
        Posts {
          nextToken
        }
        Comments {
          nextToken
        }
        OpportunitiesOwned {
          nextToken
        }
        Requests {
          nextToken
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        }
        Roles {
          nextToken
        }
        createdAt
        updatedAt
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
        }
        Roles {
          nextToken
        }
        Posts {
          nextToken
        }
        Comments {
          nextToken
        }
        OpportunitiesOwned {
          nextToken
        }
        Requests {
          nextToken
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        }
        Roles {
          nextToken
        }
        createdAt
        updatedAt
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
        }
        Roles {
          nextToken
        }
        Posts {
          nextToken
        }
        Comments {
          nextToken
        }
        OpportunitiesOwned {
          nextToken
        }
        Requests {
          nextToken
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        }
        Roles {
          nextToken
        }
        createdAt
        updatedAt
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
        }
        Roles {
          nextToken
        }
        Posts {
          nextToken
        }
        Comments {
          nextToken
        }
        OpportunitiesOwned {
          nextToken
        }
        Requests {
          nextToken
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createProfileOpportunity = /* GraphQL */ `
  mutation CreateProfileOpportunity(
    $input: CreateProfileOpportunityInput!
    $condition: ModelProfileOpportunityConditionInput
  ) {
    createProfileOpportunity(input: $input, condition: $condition) {
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
        }
        Roles {
          nextToken
        }
        Posts {
          nextToken
        }
        Comments {
          nextToken
        }
        OpportunitiesOwned {
          nextToken
        }
        Requests {
          nextToken
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
        createdAt
        updatedAt
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
        }
        Posts {
          nextToken
        }
        Owners {
          nextToken
        }
        Requests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProfileOpportunity = /* GraphQL */ `
  mutation UpdateProfileOpportunity(
    $input: UpdateProfileOpportunityInput!
    $condition: ModelProfileOpportunityConditionInput
  ) {
    updateProfileOpportunity(input: $input, condition: $condition) {
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
        }
        Roles {
          nextToken
        }
        Posts {
          nextToken
        }
        Comments {
          nextToken
        }
        OpportunitiesOwned {
          nextToken
        }
        Requests {
          nextToken
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
        createdAt
        updatedAt
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
        }
        Posts {
          nextToken
        }
        Owners {
          nextToken
        }
        Requests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProfileOpportunity = /* GraphQL */ `
  mutation DeleteProfileOpportunity(
    $input: DeleteProfileOpportunityInput!
    $condition: ModelProfileOpportunityConditionInput
  ) {
    deleteProfileOpportunity(input: $input, condition: $condition) {
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
        }
        Roles {
          nextToken
        }
        Posts {
          nextToken
        }
        Comments {
          nextToken
        }
        OpportunitiesOwned {
          nextToken
        }
        Requests {
          nextToken
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
        createdAt
        updatedAt
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
        }
        Posts {
          nextToken
        }
        Owners {
          nextToken
        }
        Requests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
