/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onCreateOrganization(filter: $filter) {
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
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onUpdateOrganization(filter: $filter) {
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
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onDeleteOrganization(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateRole = /* GraphQL */ `
  subscription OnCreateRole($filter: ModelSubscriptionRoleFilterInput) {
    onCreateRole(filter: $filter) {
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
export const onUpdateRole = /* GraphQL */ `
  subscription OnUpdateRole($filter: ModelSubscriptionRoleFilterInput) {
    onUpdateRole(filter: $filter) {
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
export const onDeleteRole = /* GraphQL */ `
  subscription OnDeleteRole($filter: ModelSubscriptionRoleFilterInput) {
    onDeleteRole(filter: $filter) {
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
export const onCreateMajor = /* GraphQL */ `
  subscription OnCreateMajor($filter: ModelSubscriptionMajorFilterInput) {
    onCreateMajor(filter: $filter) {
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
export const onUpdateMajor = /* GraphQL */ `
  subscription OnUpdateMajor($filter: ModelSubscriptionMajorFilterInput) {
    onUpdateMajor(filter: $filter) {
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
export const onDeleteMajor = /* GraphQL */ `
  subscription OnDeleteMajor($filter: ModelSubscriptionMajorFilterInput) {
    onDeleteMajor(filter: $filter) {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onCreateProfile(filter: $filter) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onUpdateProfile(filter: $filter) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
    onDeleteProfile(filter: $filter) {
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
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($filter: ModelSubscriptionRequestFilterInput) {
    onCreateRequest(filter: $filter) {
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
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($filter: ModelSubscriptionRequestFilterInput) {
    onUpdateRequest(filter: $filter) {
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
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest($filter: ModelSubscriptionRequestFilterInput) {
    onDeleteRequest(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateOpportunity = /* GraphQL */ `
  subscription OnCreateOpportunity(
    $filter: ModelSubscriptionOpportunityFilterInput
  ) {
    onCreateOpportunity(filter: $filter) {
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
export const onUpdateOpportunity = /* GraphQL */ `
  subscription OnUpdateOpportunity(
    $filter: ModelSubscriptionOpportunityFilterInput
  ) {
    onUpdateOpportunity(filter: $filter) {
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
export const onDeleteOpportunity = /* GraphQL */ `
  subscription OnDeleteOpportunity(
    $filter: ModelSubscriptionOpportunityFilterInput
  ) {
    onDeleteOpportunity(filter: $filter) {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
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
export const onCreateRoleMajor = /* GraphQL */ `
  subscription OnCreateRoleMajor(
    $filter: ModelSubscriptionRoleMajorFilterInput
  ) {
    onCreateRoleMajor(filter: $filter) {
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
export const onUpdateRoleMajor = /* GraphQL */ `
  subscription OnUpdateRoleMajor(
    $filter: ModelSubscriptionRoleMajorFilterInput
  ) {
    onUpdateRoleMajor(filter: $filter) {
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
export const onDeleteRoleMajor = /* GraphQL */ `
  subscription OnDeleteRoleMajor(
    $filter: ModelSubscriptionRoleMajorFilterInput
  ) {
    onDeleteRoleMajor(filter: $filter) {
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
export const onCreateProfileRole = /* GraphQL */ `
  subscription OnCreateProfileRole(
    $filter: ModelSubscriptionProfileRoleFilterInput
  ) {
    onCreateProfileRole(filter: $filter) {
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
export const onUpdateProfileRole = /* GraphQL */ `
  subscription OnUpdateProfileRole(
    $filter: ModelSubscriptionProfileRoleFilterInput
  ) {
    onUpdateProfileRole(filter: $filter) {
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
export const onDeleteProfileRole = /* GraphQL */ `
  subscription OnDeleteProfileRole(
    $filter: ModelSubscriptionProfileRoleFilterInput
  ) {
    onDeleteProfileRole(filter: $filter) {
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
export const onCreateProfileMajor = /* GraphQL */ `
  subscription OnCreateProfileMajor(
    $filter: ModelSubscriptionProfileMajorFilterInput
  ) {
    onCreateProfileMajor(filter: $filter) {
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
export const onUpdateProfileMajor = /* GraphQL */ `
  subscription OnUpdateProfileMajor(
    $filter: ModelSubscriptionProfileMajorFilterInput
  ) {
    onUpdateProfileMajor(filter: $filter) {
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
export const onDeleteProfileMajor = /* GraphQL */ `
  subscription OnDeleteProfileMajor(
    $filter: ModelSubscriptionProfileMajorFilterInput
  ) {
    onDeleteProfileMajor(filter: $filter) {
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
export const onCreateOpportunityProfile = /* GraphQL */ `
  subscription OnCreateOpportunityProfile(
    $filter: ModelSubscriptionOpportunityProfileFilterInput
  ) {
    onCreateOpportunityProfile(filter: $filter) {
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
export const onUpdateOpportunityProfile = /* GraphQL */ `
  subscription OnUpdateOpportunityProfile(
    $filter: ModelSubscriptionOpportunityProfileFilterInput
  ) {
    onUpdateOpportunityProfile(filter: $filter) {
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
export const onDeleteOpportunityProfile = /* GraphQL */ `
  subscription OnDeleteOpportunityProfile(
    $filter: ModelSubscriptionOpportunityProfileFilterInput
  ) {
    onDeleteOpportunityProfile(filter: $filter) {
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
