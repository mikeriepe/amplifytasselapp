/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getKeyword = /* GraphQL */ `
  query GetKeyword($id: ID!) {
    getKeyword(id: $id) {
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
export const listKeywords = /* GraphQL */ `
  query ListKeywords(
    $filter: ModelKeywordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKeywords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncKeywords = /* GraphQL */ `
  query SyncKeywords(
    $filter: ModelKeywordFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncKeywords(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
      _version
      _deleted
      _lastChangedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        opportunityID
        capacity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        opportunityID
        capacity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        opportunityID
        capacity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getMajor = /* GraphQL */ `
  query GetMajor($id: ID!) {
    getMajor(id: $id) {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
      nextToken
      startedAt
      __typename
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
      nextToken
      startedAt
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        opportunityID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        opportunityID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        opportunityID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        opportunityID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
      nextToken
      startedAt
      __typename
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
      nextToken
      startedAt
      __typename
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
      nextToken
      startedAt
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getKeywordProfile = /* GraphQL */ `
  query GetKeywordProfile($id: ID!) {
    getKeywordProfile(id: $id) {
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
export const listKeywordProfiles = /* GraphQL */ `
  query ListKeywordProfiles(
    $filter: ModelKeywordProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKeywordProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        keywordId
        profileId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncKeywordProfiles = /* GraphQL */ `
  query SyncKeywordProfiles(
    $filter: ModelKeywordProfileFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncKeywordProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        keywordId
        profileId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const keywordProfilesByKeywordId = /* GraphQL */ `
  query KeywordProfilesByKeywordId(
    $keywordId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelKeywordProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    keywordProfilesByKeywordId(
      keywordId: $keywordId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        keywordId
        profileId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const keywordProfilesByProfileId = /* GraphQL */ `
  query KeywordProfilesByProfileId(
    $profileId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelKeywordProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    keywordProfilesByProfileId(
      profileId: $profileId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        keywordId
        profileId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getKeywordOpportunity = /* GraphQL */ `
  query GetKeywordOpportunity($id: ID!) {
    getKeywordOpportunity(id: $id) {
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
export const listKeywordOpportunities = /* GraphQL */ `
  query ListKeywordOpportunities(
    $filter: ModelKeywordOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKeywordOpportunities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        keywordId
        opportunityId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncKeywordOpportunities = /* GraphQL */ `
  query SyncKeywordOpportunities(
    $filter: ModelKeywordOpportunityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncKeywordOpportunities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        keywordId
        opportunityId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const keywordOpportunitiesByKeywordId = /* GraphQL */ `
  query KeywordOpportunitiesByKeywordId(
    $keywordId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelKeywordOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    keywordOpportunitiesByKeywordId(
      keywordId: $keywordId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        keywordId
        opportunityId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const keywordOpportunitiesByOpportunityId = /* GraphQL */ `
  query KeywordOpportunitiesByOpportunityId(
    $opportunityId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelKeywordOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    keywordOpportunitiesByOpportunityId(
      opportunityId: $opportunityId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        keywordId
        opportunityId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
