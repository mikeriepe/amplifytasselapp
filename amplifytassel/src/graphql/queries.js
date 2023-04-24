/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrganizations = /* GraphQL */ `
  query SyncOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrganizations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
      nextToken
      startedAt
    }
  }
`;
export const syncRoles = /* GraphQL */ `
  query SyncRoles(
    $filter: ModelRoleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRoles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
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
      nextToken
      startedAt
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
      nextToken
      startedAt
    }
  }
`;
export const syncMajors = /* GraphQL */ `
  query SyncMajors(
    $filter: ModelMajorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMajors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
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
      nextToken
      startedAt
    }
  }
`;
export const syncProfiles = /* GraphQL */ `
  query SyncProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncRequests = /* GraphQL */ `
  query SyncRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          startedAt
        }
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
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        content
        createdTimestamp
        profileID
        Comments {
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
      nextToken
      startedAt
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
          startedAt
        }
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
          startedAt
        }
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
      nextToken
      startedAt
    }
  }
`;
export const syncOpportunities = /* GraphQL */ `
  query SyncOpportunities(
    $filter: ModelOpportunityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOpportunities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const opportunitiesByProfileID = /* GraphQL */ `
  query OpportunitiesByProfileID(
    $profileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    opportunitiesByProfileID(
      profileID: $profileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotes = /* GraphQL */ `
  query SyncNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        major {
          id
          name
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
      nextToken
      startedAt
    }
  }
`;
export const syncRoleMajors = /* GraphQL */ `
  query SyncRoleMajors(
    $filter: ModelRoleMajorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRoleMajors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          _version
          _deleted
          _lastChangedAt
        }
        major {
          id
          name
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
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        major {
          id
          name
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
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        major {
          id
          name
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
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
    }
  }
`;
export const syncProfileRoles = /* GraphQL */ `
  query SyncProfileRoles(
    $filter: ModelProfileRoleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProfileRoles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
    }
  }
`;
export const syncProfileMajors = /* GraphQL */ `
  query SyncProfileMajors(
    $filter: ModelProfileMajorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProfileMajors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
    }
  }
`;
export const getOpportunityProfile = /* GraphQL */ `
  query GetOpportunityProfile($id: ID!) {
    getOpportunityProfile(id: $id) {
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
export const listOpportunityProfiles = /* GraphQL */ `
  query ListOpportunityProfiles(
    $filter: ModelOpportunityProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityProfiles(
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOpportunityProfiles = /* GraphQL */ `
  query SyncOpportunityProfiles(
    $filter: ModelOpportunityProfileFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOpportunityProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const opportunityProfilesByProfileId = /* GraphQL */ `
  query OpportunityProfilesByProfileId(
    $profileId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOpportunityProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    opportunityProfilesByProfileId(
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const opportunityProfilesByOpportunityId = /* GraphQL */ `
  query OpportunityProfilesByOpportunityId(
    $opportunityId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOpportunityProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    opportunityProfilesByOpportunityId(
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
