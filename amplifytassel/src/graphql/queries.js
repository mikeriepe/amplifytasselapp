/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
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
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        website
        description
        instagram
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getRole = /* GraphQL */ `
  query GetRole($id: ID!) {
    getRole(id: $id) {
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
export const listRoles = /* GraphQL */ `
  query ListRoles(
    $filter: ModelRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMajor = /* GraphQL */ `
  query GetMajor($id: ID!) {
    getMajor(id: $id) {
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
export const listMajors = /* GraphQL */ `
  query ListMajors(
    $filter: ModelMajorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMajors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
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
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        createdTimestamp
        profileID
        Comments {
          nextToken
        }
        opportunityID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunity = /* GraphQL */ `
  query GetOpportunity($id: ID!) {
    getOpportunity(id: $id) {
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
export const listOpportunities = /* GraphQL */ `
  query ListOpportunities(
    $filter: ModelOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunities(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRoleMajor = /* GraphQL */ `
  query GetRoleMajor($id: ID!) {
    getRoleMajor(id: $id) {
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
export const listRoleMajors = /* GraphQL */ `
  query ListRoleMajors(
    $filter: ModelRoleMajorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoleMajors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        major {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfileRole = /* GraphQL */ `
  query GetProfileRole($id: ID!) {
    getProfileRole(id: $id) {
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
export const listProfileRoles = /* GraphQL */ `
  query ListProfileRoles(
    $filter: ModelProfileRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileRoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        profile {
          id
          email
          about
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfileMajor = /* GraphQL */ `
  query GetProfileMajor($id: ID!) {
    getProfileMajor(id: $id) {
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
export const listProfileMajors = /* GraphQL */ `
  query ListProfileMajors(
    $filter: ModelProfileMajorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileMajors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        majorId
        profileId
        major {
          id
          name
          createdAt
          updatedAt
        }
        profile {
          id
          email
          about
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfileOpportunity = /* GraphQL */ `
  query GetProfileOpportunity($id: ID!) {
    getProfileOpportunity(id: $id) {
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
export const listProfileOpportunities = /* GraphQL */ `
  query ListProfileOpportunities(
    $filter: ModelProfileOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileOpportunities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profileId
        opportunityId
        profile {
          id
          email
          about
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
          eventData
          subject
          preferences
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByPostID = /* GraphQL */ `
  query CommentsByPostID(
    $postID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPostID(
      postID: $postID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const commentsByProfileID = /* GraphQL */ `
  query CommentsByProfileID(
    $profileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByProfileID(
      profileID: $profileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const rolesByOpportunityID = /* GraphQL */ `
  query RolesByOpportunityID(
    $opportunityID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    rolesByOpportunityID(
      opportunityID: $opportunityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const requestsByOpportunityID = /* GraphQL */ `
  query RequestsByOpportunityID(
    $opportunityID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestsByOpportunityID(
      opportunityID: $opportunityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const requestsByRoleID = /* GraphQL */ `
  query RequestsByRoleID(
    $roleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestsByRoleID(
      roleID: $roleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const requestsByProfileID = /* GraphQL */ `
  query RequestsByProfileID(
    $profileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestsByProfileID(
      profileID: $profileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const postsByProfileID = /* GraphQL */ `
  query PostsByProfileID(
    $profileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByProfileID(
      profileID: $profileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        createdTimestamp
        profileID
        Comments {
          nextToken
        }
        opportunityID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByOpportunityID = /* GraphQL */ `
  query PostsByOpportunityID(
    $opportunityID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByOpportunityID(
      opportunityID: $opportunityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        createdTimestamp
        profileID
        Comments {
          nextToken
        }
        opportunityID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const roleMajorsByRoleId = /* GraphQL */ `
  query RoleMajorsByRoleId(
    $roleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRoleMajorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    roleMajorsByRoleId(
      roleId: $roleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        major {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const roleMajorsByMajorId = /* GraphQL */ `
  query RoleMajorsByMajorId(
    $majorId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRoleMajorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    roleMajorsByMajorId(
      majorId: $majorId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        major {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const profileRolesByRoleId = /* GraphQL */ `
  query ProfileRolesByRoleId(
    $roleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileRolesByRoleId(
      roleId: $roleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        profile {
          id
          email
          about
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const profileRolesByProfileId = /* GraphQL */ `
  query ProfileRolesByProfileId(
    $profileId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileRolesByProfileId(
      profileId: $profileId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        profile {
          id
          email
          about
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const profileMajorsByMajorId = /* GraphQL */ `
  query ProfileMajorsByMajorId(
    $majorId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileMajorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileMajorsByMajorId(
      majorId: $majorId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        majorId
        profileId
        major {
          id
          name
          createdAt
          updatedAt
        }
        profile {
          id
          email
          about
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const profileMajorsByProfileId = /* GraphQL */ `
  query ProfileMajorsByProfileId(
    $profileId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileMajorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileMajorsByProfileId(
      profileId: $profileId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        majorId
        profileId
        major {
          id
          name
          createdAt
          updatedAt
        }
        profile {
          id
          email
          about
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const profileOpportunitiesByProfileId = /* GraphQL */ `
  query ProfileOpportunitiesByProfileId(
    $profileId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileOpportunitiesByProfileId(
      profileId: $profileId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profileId
        opportunityId
        profile {
          id
          email
          about
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
          eventData
          subject
          preferences
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const profileOpportunitiesByOpportunityId = /* GraphQL */ `
  query ProfileOpportunitiesByOpportunityId(
    $opportunityId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileOpportunitiesByOpportunityId(
      opportunityId: $opportunityId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profileId
        opportunityId
        profile {
          id
          email
          about
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
          eventData
          subject
          preferences
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
