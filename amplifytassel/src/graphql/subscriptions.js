/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      ChatRoomID
      Sender
      Time
      Content
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      ChatRoomID
      Sender
      Time
      Content
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      ChatRoomID
      Sender
      Time
      Content
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      ChatName
      Messages {
        nextToken
        startedAt
        __typename
      }
      Profiles {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      ChatName
      Messages {
        nextToken
        startedAt
        __typename
      }
      Profiles {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      ChatName
      Messages {
        nextToken
        startedAt
        __typename
      }
      Profiles {
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
export const onCreateFriendRequest = /* GraphQL */ `
  subscription OnCreateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onCreateFriendRequest(filter: $filter) {
      id
      Sender
      Receiver
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onUpdateFriendRequest(filter: $filter) {
      id
      Sender
      Receiver
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onDeleteFriendRequest(filter: $filter) {
      id
      Sender
      Receiver
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend($filter: ModelSubscriptionFriendFilterInput) {
    onCreateFriend(filter: $filter) {
      id
      profileID
      Friend
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend($filter: ModelSubscriptionFriendFilterInput) {
    onUpdateFriend(filter: $filter) {
      id
      profileID
      Friend
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend($filter: ModelSubscriptionFriendFilterInput) {
    onDeleteFriend(filter: $filter) {
      id
      profileID
      Friend
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateKeyword = /* GraphQL */ `
  subscription OnCreateKeyword($filter: ModelSubscriptionKeywordFilterInput) {
    onCreateKeyword(filter: $filter) {
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
export const onUpdateKeyword = /* GraphQL */ `
  subscription OnUpdateKeyword($filter: ModelSubscriptionKeywordFilterInput) {
    onUpdateKeyword(filter: $filter) {
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
export const onDeleteKeyword = /* GraphQL */ `
  subscription OnDeleteKeyword($filter: ModelSubscriptionKeywordFilterInput) {
    onDeleteKeyword(filter: $filter) {
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
export const onUpdateRole = /* GraphQL */ `
  subscription OnUpdateRole($filter: ModelSubscriptionRoleFilterInput) {
    onUpdateRole(filter: $filter) {
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
export const onDeleteRole = /* GraphQL */ `
  subscription OnDeleteRole($filter: ModelSubscriptionRoleFilterInput) {
    onDeleteRole(filter: $filter) {
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
export const onCreateMajor = /* GraphQL */ `
  subscription OnCreateMajor($filter: ModelSubscriptionMajorFilterInput) {
    onCreateMajor(filter: $filter) {
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
export const onUpdateMajor = /* GraphQL */ `
  subscription OnUpdateMajor($filter: ModelSubscriptionMajorFilterInput) {
    onUpdateMajor(filter: $filter) {
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
export const onDeleteMajor = /* GraphQL */ `
  subscription OnDeleteMajor($filter: ModelSubscriptionMajorFilterInput) {
    onDeleteMajor(filter: $filter) {
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
      FriendRequests {
        nextToken
        startedAt
        __typename
      }
      Friends {
        nextToken
        startedAt
        __typename
      }
      Chatrooms {
        nextToken
        startedAt
        __typename
      }
      Messages {
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
      FriendRequests {
        nextToken
        startedAt
        __typename
      }
      Friends {
        nextToken
        startedAt
        __typename
      }
      Chatrooms {
        nextToken
        startedAt
        __typename
      }
      Messages {
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
      FriendRequests {
        nextToken
        startedAt
        __typename
      }
      Friends {
        nextToken
        startedAt
        __typename
      }
      Chatrooms {
        nextToken
        startedAt
        __typename
      }
      Messages {
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
      __typename
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
      __typename
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
      __typename
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateOpportunity = /* GraphQL */ `
  subscription OnCreateOpportunity(
    $filter: ModelSubscriptionOpportunityFilterInput
  ) {
    onCreateOpportunity(filter: $filter) {
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
export const onUpdateOpportunity = /* GraphQL */ `
  subscription OnUpdateOpportunity(
    $filter: ModelSubscriptionOpportunityFilterInput
  ) {
    onUpdateOpportunity(filter: $filter) {
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
export const onDeleteOpportunity = /* GraphQL */ `
  subscription OnDeleteOpportunity(
    $filter: ModelSubscriptionOpportunityFilterInput
  ) {
    onDeleteOpportunity(filter: $filter) {
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
      __typename
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
      __typename
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
      __typename
    }
  }
`;
export const onCreateProfileChatRoom = /* GraphQL */ `
  subscription OnCreateProfileChatRoom(
    $filter: ModelSubscriptionProfileChatRoomFilterInput
  ) {
    onCreateProfileChatRoom(filter: $filter) {
      id
      chatRoomId
      profileId
      chatRoom {
        id
        ChatName
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
export const onUpdateProfileChatRoom = /* GraphQL */ `
  subscription OnUpdateProfileChatRoom(
    $filter: ModelSubscriptionProfileChatRoomFilterInput
  ) {
    onUpdateProfileChatRoom(filter: $filter) {
      id
      chatRoomId
      profileId
      chatRoom {
        id
        ChatName
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
export const onDeleteProfileChatRoom = /* GraphQL */ `
  subscription OnDeleteProfileChatRoom(
    $filter: ModelSubscriptionProfileChatRoomFilterInput
  ) {
    onDeleteProfileChatRoom(filter: $filter) {
      id
      chatRoomId
      profileId
      chatRoom {
        id
        ChatName
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
export const onCreateKeywordProfile = /* GraphQL */ `
  subscription OnCreateKeywordProfile(
    $filter: ModelSubscriptionKeywordProfileFilterInput
  ) {
    onCreateKeywordProfile(filter: $filter) {
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
export const onUpdateKeywordProfile = /* GraphQL */ `
  subscription OnUpdateKeywordProfile(
    $filter: ModelSubscriptionKeywordProfileFilterInput
  ) {
    onUpdateKeywordProfile(filter: $filter) {
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
export const onDeleteKeywordProfile = /* GraphQL */ `
  subscription OnDeleteKeywordProfile(
    $filter: ModelSubscriptionKeywordProfileFilterInput
  ) {
    onDeleteKeywordProfile(filter: $filter) {
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
export const onCreateKeywordOpportunity = /* GraphQL */ `
  subscription OnCreateKeywordOpportunity(
    $filter: ModelSubscriptionKeywordOpportunityFilterInput
  ) {
    onCreateKeywordOpportunity(filter: $filter) {
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
export const onUpdateKeywordOpportunity = /* GraphQL */ `
  subscription OnUpdateKeywordOpportunity(
    $filter: ModelSubscriptionKeywordOpportunityFilterInput
  ) {
    onUpdateKeywordOpportunity(filter: $filter) {
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
export const onDeleteKeywordOpportunity = /* GraphQL */ `
  subscription OnDeleteKeywordOpportunity(
    $filter: ModelSubscriptionKeywordOpportunityFilterInput
  ) {
    onDeleteKeywordOpportunity(filter: $filter) {
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
