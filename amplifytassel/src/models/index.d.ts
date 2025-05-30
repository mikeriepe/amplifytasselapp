import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum OpportunityStatus {
  PENDING = "PENDING",
  UPDATED = "UPDATED",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  REQUESTED = "REQUESTED"
}

export enum ProfileStatus {
  PENDING = "PENDING",
  REQUESTED = "REQUESTED",
  UPDATED = "UPDATED",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  ADMIN = "ADMIN"
}

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED"
}

type EagerDaysOfWeek = {
  readonly monday?: TimeSpan | null;
  readonly tuesday?: TimeSpan | null;
  readonly wednesday?: TimeSpan | null;
  readonly thrusday?: TimeSpan | null;
  readonly friday?: TimeSpan | null;
  readonly saturday?: TimeSpan | null;
  readonly sunday?: TimeSpan | null;
}

type LazyDaysOfWeek = {
  readonly monday?: TimeSpan | null;
  readonly tuesday?: TimeSpan | null;
  readonly wednesday?: TimeSpan | null;
  readonly thrusday?: TimeSpan | null;
  readonly friday?: TimeSpan | null;
  readonly saturday?: TimeSpan | null;
  readonly sunday?: TimeSpan | null;
}

export declare type DaysOfWeek = LazyLoading extends LazyLoadingDisabled ? EagerDaysOfWeek : LazyDaysOfWeek

export declare const DaysOfWeek: (new (init: ModelInit<DaysOfWeek>) => DaysOfWeek)

type EagerLocation = {
  readonly zip?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly address?: string | null;
}

type LazyLocation = {
  readonly zip?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly address?: string | null;
}

export declare type Location = LazyLoading extends LazyLoadingDisabled ? EagerLocation : LazyLocation

export declare const Location: (new (init: ModelInit<Location>) => Location)

type EagerAvailability = {
  readonly times?: DaysOfWeek | null;
  readonly year?: number | null;
}

type LazyAvailability = {
  readonly times?: DaysOfWeek | null;
  readonly year?: number | null;
}

export declare type Availability = LazyLoading extends LazyLoadingDisabled ? EagerAvailability : LazyAvailability

export declare const Availability: (new (init: ModelInit<Availability>) => Availability)

type EagerTimeSpan = {
  readonly startTime?: string | null;
  readonly endTime?: string | null;
}

type LazyTimeSpan = {
  readonly startTime?: string | null;
  readonly endTime?: string | null;
}

export declare type TimeSpan = LazyLoading extends LazyLoadingDisabled ? EagerTimeSpan : LazyTimeSpan

export declare const TimeSpan: (new (init: ModelInit<TimeSpan>) => TimeSpan)

type EagerWorkHistory = {
  readonly end?: string | null;
  readonly start?: string | null;
  readonly title?: string | null;
  readonly company?: string | null;
  readonly location?: string | null;
  readonly description?: string | null;
  readonly currentPosition?: boolean | null;
}

type LazyWorkHistory = {
  readonly end?: string | null;
  readonly start?: string | null;
  readonly title?: string | null;
  readonly company?: string | null;
  readonly location?: string | null;
  readonly description?: string | null;
  readonly currentPosition?: boolean | null;
}

export declare type WorkHistory = LazyLoading extends LazyLoadingDisabled ? EagerWorkHistory : LazyWorkHistory

export declare const WorkHistory: (new (init: ModelInit<WorkHistory>) => WorkHistory)

type EagerOrganizationHistory = {
  readonly end?: string | null;
  readonly start?: string | null;
  readonly role?: string | null;
  readonly organization?: string | null;
  readonly school?: string | null;
  readonly location?: string | null;
  readonly description?: string | null;
  readonly currentPosition?: boolean | null;
}

type LazyOrganizationHistory = {
  readonly end?: string | null;
  readonly start?: string | null;
  readonly role?: string | null;
  readonly organization?: string | null;
  readonly school?: string | null;
  readonly location?: string | null;
  readonly description?: string | null;
  readonly currentPosition?: boolean | null;
}

export declare type OrganizationHistory = LazyLoading extends LazyLoadingDisabled ? EagerOrganizationHistory : LazyOrganizationHistory

export declare const OrganizationHistory: (new (init: ModelInit<OrganizationHistory>) => OrganizationHistory)

type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ChatRoomID: string;
  readonly Sender: string;
  readonly Time: string;
  readonly Content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ChatRoomID: string;
  readonly Sender: string;
  readonly Time: string;
  readonly Content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ChatName?: string | null;
  readonly Messages?: (Message | null)[] | null;
  readonly Profiles?: (ProfileChatRoom | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ChatName?: string | null;
  readonly Messages: AsyncCollection<Message>;
  readonly Profiles: AsyncCollection<ProfileChatRoom>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerChatRoom : LazyChatRoom

export declare const ChatRoom: (new (init: ModelInit<ChatRoom>) => ChatRoom) & {
  copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

type EagerFriendRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FriendRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Sender?: string | null;
  readonly Receiver?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFriendRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FriendRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Sender?: string | null;
  readonly Receiver?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FriendRequest = LazyLoading extends LazyLoadingDisabled ? EagerFriendRequest : LazyFriendRequest

export declare const FriendRequest: (new (init: ModelInit<FriendRequest>) => FriendRequest) & {
  copyOf(source: FriendRequest, mutator: (draft: MutableModel<FriendRequest>) => MutableModel<FriendRequest> | void): FriendRequest;
}

type EagerFriend = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Friend, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profileID: string;
  readonly Friend?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFriend = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Friend, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profileID: string;
  readonly Friend?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Friend = LazyLoading extends LazyLoadingDisabled ? EagerFriend : LazyFriend

export declare const Friend: (new (init: ModelInit<Friend>) => Friend) & {
  copyOf(source: Friend, mutator: (draft: MutableModel<Friend>) => MutableModel<Friend> | void): Friend;
}

type EagerKeyword = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Keyword, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Profiles?: (KeywordProfile | null)[] | null;
  readonly Opportunities?: (KeywordOpportunity | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyKeyword = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Keyword, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Profiles: AsyncCollection<KeywordProfile>;
  readonly Opportunities: AsyncCollection<KeywordOpportunity>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Keyword = LazyLoading extends LazyLoadingDisabled ? EagerKeyword : LazyKeyword

export declare const Keyword: (new (init: ModelInit<Keyword>) => Keyword) & {
  copyOf(source: Keyword, mutator: (draft: MutableModel<Keyword>) => MutableModel<Keyword> | void): Keyword;
}

type EagerOrganization = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organization, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly website?: string | null;
  readonly description?: string | null;
  readonly instagram?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrganization = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organization, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly website?: string | null;
  readonly description?: string | null;
  readonly instagram?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Organization = LazyLoading extends LazyLoadingDisabled ? EagerOrganization : LazyOrganization

export declare const Organization: (new (init: ModelInit<Organization>) => Organization) & {
  copyOf(source: Organization, mutator: (draft: MutableModel<Organization>) => MutableModel<Organization> | void): Organization;
}

type EagerComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly createdTimestamp?: number | null;
  readonly postID: string;
  readonly profileID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly createdTimestamp?: number | null;
  readonly postID: string;
  readonly profileID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

type EagerRole = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Role, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly isFilled?: boolean | null;
  readonly qualifications?: (string | null)[] | null;
  readonly Majors?: (RoleMajor | null)[] | null;
  readonly Profiles?: (ProfileRole | null)[] | null;
  readonly opportunityID: string;
  readonly Requests?: (Request | null)[] | null;
  readonly capacity?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRole = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Role, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly isFilled?: boolean | null;
  readonly qualifications?: (string | null)[] | null;
  readonly Majors: AsyncCollection<RoleMajor>;
  readonly Profiles: AsyncCollection<ProfileRole>;
  readonly opportunityID: string;
  readonly Requests: AsyncCollection<Request>;
  readonly capacity?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Role = LazyLoading extends LazyLoadingDisabled ? EagerRole : LazyRole

export declare const Role: (new (init: ModelInit<Role>) => Role) & {
  copyOf(source: Role, mutator: (draft: MutableModel<Role>) => MutableModel<Role> | void): Role;
}

type EagerMajor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Major, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly profiles?: (ProfileMajor | null)[] | null;
  readonly Roles?: (RoleMajor | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMajor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Major, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly profiles: AsyncCollection<ProfileMajor>;
  readonly Roles: AsyncCollection<RoleMajor>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Major = LazyLoading extends LazyLoadingDisabled ? EagerMajor : LazyMajor

export declare const Major: (new (init: ModelInit<Major>) => Major) & {
  copyOf(source: Major, mutator: (draft: MutableModel<Major>) => MutableModel<Major> | void): Major;
}

type EagerProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Profile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly volunteerExperience?: (WorkHistory | null)[] | null;
  readonly about?: string | null;
  readonly location?: string | null;
  readonly availability?: Availability | null;
  readonly picture?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly status?: ProfileStatus | keyof typeof ProfileStatus | null;
  readonly graduationYear?: string | null;
  readonly active?: boolean | null;
  readonly isAdmin?: boolean | null;
  readonly isApproved?: boolean | null;
  readonly Majors?: (ProfileMajor | null)[] | null;
  readonly Roles?: (ProfileRole | null)[] | null;
  readonly Posts?: (Post | null)[] | null;
  readonly Comments?: (Comment | null)[] | null;
  readonly OpportunitiesJoined?: (OpportunityProfile | null)[] | null;
  readonly OpportunitiesOwned?: (Opportunity | null)[] | null;
  readonly experience?: (WorkHistory | null)[] | null;
  readonly schoolEmail?: string | null;
  readonly infoRequest?: string | null;
  readonly infoResponse?: string | null;
  readonly Requests?: (Request | null)[] | null;
  readonly keywords?: (KeywordProfile | null)[] | null;
  readonly banner?: string | null;
  readonly points?: number | null;
  readonly FriendRequests?: (FriendRequest | null)[] | null;
  readonly Friends?: (Friend | null)[] | null;
  readonly Chatrooms?: (ProfileChatRoom | null)[] | null;
  readonly Messages?: (Message | null)[] | null;
  readonly Analytics?: ProfileAnalytics | null;
  readonly InfoRequestChatroom?: ChatRoom | null;
  readonly linkedin?: string | null;
  readonly dateOfBirth?: string | null;
  readonly collegeAffiliation?: string | null;
  readonly pronouns?: string | null;
  readonly username?: string | null;
  readonly organizationExperience?: (OrganizationHistory | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly profileAnalyticsId?: string | null;
  readonly profileInfoRequestChatroomId?: string | null;
}

type LazyProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Profile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly volunteerExperience?: (WorkHistory | null)[] | null;
  readonly about?: string | null;
  readonly location?: string | null;
  readonly availability?: Availability | null;
  readonly picture?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly status?: ProfileStatus | keyof typeof ProfileStatus | null;
  readonly graduationYear?: string | null;
  readonly active?: boolean | null;
  readonly isAdmin?: boolean | null;
  readonly isApproved?: boolean | null;
  readonly Majors: AsyncCollection<ProfileMajor>;
  readonly Roles: AsyncCollection<ProfileRole>;
  readonly Posts: AsyncCollection<Post>;
  readonly Comments: AsyncCollection<Comment>;
  readonly OpportunitiesJoined: AsyncCollection<OpportunityProfile>;
  readonly OpportunitiesOwned: AsyncCollection<Opportunity>;
  readonly experience?: (WorkHistory | null)[] | null;
  readonly schoolEmail?: string | null;
  readonly infoRequest?: string | null;
  readonly infoResponse?: string | null;
  readonly Requests: AsyncCollection<Request>;
  readonly keywords: AsyncCollection<KeywordProfile>;
  readonly banner?: string | null;
  readonly points?: number | null;
  readonly FriendRequests: AsyncCollection<FriendRequest>;
  readonly Friends: AsyncCollection<Friend>;
  readonly Chatrooms: AsyncCollection<ProfileChatRoom>;
  readonly Messages: AsyncCollection<Message>;
  readonly Analytics: AsyncItem<ProfileAnalytics | undefined>;
  readonly InfoRequestChatroom: AsyncItem<ChatRoom | undefined>;
  readonly linkedin?: string | null;
  readonly dateOfBirth?: string | null;
  readonly collegeAffiliation?: string | null;
  readonly pronouns?: string | null;
  readonly username?: string | null;
  readonly organizationExperience?: (OrganizationHistory | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly profileAnalyticsId?: string | null;
  readonly profileInfoRequestChatroomId?: string | null;
}

export declare type Profile = LazyLoading extends LazyLoadingDisabled ? EagerProfile : LazyProfile

export declare const Profile: (new (init: ModelInit<Profile>) => Profile) & {
  copyOf(source: Profile, mutator: (draft: MutableModel<Profile>) => MutableModel<Profile> | void): Profile;
}

type EagerSiteAnalytics = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SiteAnalytics, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly monthlySignups?: (number | null)[] | null;
  readonly dailySignups?: (number | null)[] | null;
  readonly MonthlyPopularEvents?: (string | null)[] | null;
  readonly MonthlyPopularTags?: (string | null)[] | null;
  readonly monthlyUserTasselTime?: number | null;
  readonly monthlyUserVolunteerTime?: number | null;
  readonly monthlyUserApps?: number | null;
  readonly monthlyNoShows?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySiteAnalytics = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SiteAnalytics, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly monthlySignups?: (number | null)[] | null;
  readonly dailySignups?: (number | null)[] | null;
  readonly MonthlyPopularEvents?: (string | null)[] | null;
  readonly MonthlyPopularTags?: (string | null)[] | null;
  readonly monthlyUserTasselTime?: number | null;
  readonly monthlyUserVolunteerTime?: number | null;
  readonly monthlyUserApps?: number | null;
  readonly monthlyNoShows?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SiteAnalytics = LazyLoading extends LazyLoadingDisabled ? EagerSiteAnalytics : LazySiteAnalytics

export declare const SiteAnalytics: (new (init: ModelInit<SiteAnalytics>) => SiteAnalytics) & {
  copyOf(source: SiteAnalytics, mutator: (draft: MutableModel<SiteAnalytics>) => MutableModel<SiteAnalytics> | void): SiteAnalytics;
}

type EagerProfileAnalytics = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProfileAnalytics, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profileViews?: (number | null)[] | null;
  readonly hoursSpentVolunteering?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProfileAnalytics = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProfileAnalytics, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profileViews?: (number | null)[] | null;
  readonly hoursSpentVolunteering?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProfileAnalytics = LazyLoading extends LazyLoadingDisabled ? EagerProfileAnalytics : LazyProfileAnalytics

export declare const ProfileAnalytics: (new (init: ModelInit<ProfileAnalytics>) => ProfileAnalytics) & {
  copyOf(source: ProfileAnalytics, mutator: (draft: MutableModel<ProfileAnalytics>) => MutableModel<ProfileAnalytics> | void): ProfileAnalytics;
}

type EagerOpportunityAnalytics = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OpportunityAnalytics, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly recentApps?: (number | null)[] | null;
  readonly apps?: number | null;
  readonly PopularUserTags?: (string | null)[] | null;
  readonly appRate?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOpportunityAnalytics = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OpportunityAnalytics, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly recentApps?: (number | null)[] | null;
  readonly apps?: number | null;
  readonly PopularUserTags?: (string | null)[] | null;
  readonly appRate?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OpportunityAnalytics = LazyLoading extends LazyLoadingDisabled ? EagerOpportunityAnalytics : LazyOpportunityAnalytics

export declare const OpportunityAnalytics: (new (init: ModelInit<OpportunityAnalytics>) => OpportunityAnalytics) & {
  copyOf(source: OpportunityAnalytics, mutator: (draft: MutableModel<OpportunityAnalytics>) => MutableModel<OpportunityAnalytics> | void): OpportunityAnalytics;
}

type EagerRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Request, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: RequestStatus | keyof typeof RequestStatus | null;
  readonly responseMessage?: string | null;
  readonly requestTime?: string | null;
  readonly responseTime?: string | null;
  readonly requestMessage?: string | null;
  readonly opportunityID: string;
  readonly roleID: string;
  readonly profileID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Request, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: RequestStatus | keyof typeof RequestStatus | null;
  readonly responseMessage?: string | null;
  readonly requestTime?: string | null;
  readonly responseTime?: string | null;
  readonly requestMessage?: string | null;
  readonly opportunityID: string;
  readonly roleID: string;
  readonly profileID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Request = LazyLoading extends LazyLoadingDisabled ? EagerRequest : LazyRequest

export declare const Request: (new (init: ModelInit<Request>) => Request) & {
  copyOf(source: Request, mutator: (draft: MutableModel<Request>) => MutableModel<Request> | void): Request;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly createdTimestamp?: number | null;
  readonly profileID: string;
  readonly Comments?: (Comment | null)[] | null;
  readonly opportunityID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly createdTimestamp?: number | null;
  readonly profileID: string;
  readonly Comments: AsyncCollection<Comment>;
  readonly opportunityID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

type EagerOpportunity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Opportunity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly zoomLink?: string | null;
  readonly organizations?: (string | null)[] | null;
  readonly description?: string | null;
  readonly eventBanner?: string | null;
  readonly eventName?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly locationType?: string | null;
  readonly location?: Location | null;
  readonly eventData?: string | null;
  readonly subject?: string | null;
  readonly preferences?: (string | null)[] | null;
  readonly Roles?: (Role | null)[] | null;
  readonly Posts?: (Post | null)[] | null;
  readonly Requests?: (Request | null)[] | null;
  readonly profileID: string;
  readonly profilesJoined?: (OpportunityProfile | null)[] | null;
  readonly keywords?: (KeywordOpportunity | null)[] | null;
  readonly status?: OpportunityStatus | keyof typeof OpportunityStatus | null;
  readonly bannerKey?: string | null;
  readonly Analytics?: OpportunityAnalytics | null;
  readonly maxApplicants?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly opportunityAnalyticsId?: string | null;
}

type LazyOpportunity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Opportunity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly zoomLink?: string | null;
  readonly organizations?: (string | null)[] | null;
  readonly description?: string | null;
  readonly eventBanner?: string | null;
  readonly eventName?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly locationType?: string | null;
  readonly location?: Location | null;
  readonly eventData?: string | null;
  readonly subject?: string | null;
  readonly preferences?: (string | null)[] | null;
  readonly Roles: AsyncCollection<Role>;
  readonly Posts: AsyncCollection<Post>;
  readonly Requests: AsyncCollection<Request>;
  readonly profileID: string;
  readonly profilesJoined: AsyncCollection<OpportunityProfile>;
  readonly keywords: AsyncCollection<KeywordOpportunity>;
  readonly status?: OpportunityStatus | keyof typeof OpportunityStatus | null;
  readonly bannerKey?: string | null;
  readonly Analytics: AsyncItem<OpportunityAnalytics | undefined>;
  readonly maxApplicants?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly opportunityAnalyticsId?: string | null;
}

export declare type Opportunity = LazyLoading extends LazyLoadingDisabled ? EagerOpportunity : LazyOpportunity

export declare const Opportunity: (new (init: ModelInit<Opportunity>) => Opportunity) & {
  copyOf(source: Opportunity, mutator: (draft: MutableModel<Opportunity>) => MutableModel<Opportunity> | void): Opportunity;
}

type EagerNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Note = LazyLoading extends LazyLoadingDisabled ? EagerNote : LazyNote

export declare const Note: (new (init: ModelInit<Note>) => Note) & {
  copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

type EagerProfileChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProfileChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly profileId?: string | null;
  readonly chatRoom: ChatRoom;
  readonly profile: Profile;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProfileChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProfileChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly profileId?: string | null;
  readonly chatRoom: AsyncItem<ChatRoom>;
  readonly profile: AsyncItem<Profile>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProfileChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerProfileChatRoom : LazyProfileChatRoom

export declare const ProfileChatRoom: (new (init: ModelInit<ProfileChatRoom>) => ProfileChatRoom) & {
  copyOf(source: ProfileChatRoom, mutator: (draft: MutableModel<ProfileChatRoom>) => MutableModel<ProfileChatRoom> | void): ProfileChatRoom;
}

type EagerKeywordProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KeywordProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly keywordId?: string | null;
  readonly profileId?: string | null;
  readonly keyword: Keyword;
  readonly profile: Profile;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyKeywordProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KeywordProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly keywordId?: string | null;
  readonly profileId?: string | null;
  readonly keyword: AsyncItem<Keyword>;
  readonly profile: AsyncItem<Profile>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type KeywordProfile = LazyLoading extends LazyLoadingDisabled ? EagerKeywordProfile : LazyKeywordProfile

export declare const KeywordProfile: (new (init: ModelInit<KeywordProfile>) => KeywordProfile) & {
  copyOf(source: KeywordProfile, mutator: (draft: MutableModel<KeywordProfile>) => MutableModel<KeywordProfile> | void): KeywordProfile;
}

type EagerKeywordOpportunity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KeywordOpportunity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly keywordId?: string | null;
  readonly opportunityId?: string | null;
  readonly keyword: Keyword;
  readonly opportunity: Opportunity;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyKeywordOpportunity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KeywordOpportunity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly keywordId?: string | null;
  readonly opportunityId?: string | null;
  readonly keyword: AsyncItem<Keyword>;
  readonly opportunity: AsyncItem<Opportunity>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type KeywordOpportunity = LazyLoading extends LazyLoadingDisabled ? EagerKeywordOpportunity : LazyKeywordOpportunity

export declare const KeywordOpportunity: (new (init: ModelInit<KeywordOpportunity>) => KeywordOpportunity) & {
  copyOf(source: KeywordOpportunity, mutator: (draft: MutableModel<KeywordOpportunity>) => MutableModel<KeywordOpportunity> | void): KeywordOpportunity;
}

type EagerRoleMajor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleMajor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly roleId?: string | null;
  readonly majorId?: string | null;
  readonly role: Role;
  readonly major: Major;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRoleMajor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleMajor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly roleId?: string | null;
  readonly majorId?: string | null;
  readonly role: AsyncItem<Role>;
  readonly major: AsyncItem<Major>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RoleMajor = LazyLoading extends LazyLoadingDisabled ? EagerRoleMajor : LazyRoleMajor

export declare const RoleMajor: (new (init: ModelInit<RoleMajor>) => RoleMajor) & {
  copyOf(source: RoleMajor, mutator: (draft: MutableModel<RoleMajor>) => MutableModel<RoleMajor> | void): RoleMajor;
}

type EagerProfileRole = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProfileRole, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly roleId?: string | null;
  readonly profileId?: string | null;
  readonly role: Role;
  readonly profile: Profile;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProfileRole = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProfileRole, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly roleId?: string | null;
  readonly profileId?: string | null;
  readonly role: AsyncItem<Role>;
  readonly profile: AsyncItem<Profile>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProfileRole = LazyLoading extends LazyLoadingDisabled ? EagerProfileRole : LazyProfileRole

export declare const ProfileRole: (new (init: ModelInit<ProfileRole>) => ProfileRole) & {
  copyOf(source: ProfileRole, mutator: (draft: MutableModel<ProfileRole>) => MutableModel<ProfileRole> | void): ProfileRole;
}

type EagerProfileMajor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProfileMajor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly majorId?: string | null;
  readonly profileId?: string | null;
  readonly major: Major;
  readonly profile: Profile;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProfileMajor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProfileMajor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly majorId?: string | null;
  readonly profileId?: string | null;
  readonly major: AsyncItem<Major>;
  readonly profile: AsyncItem<Profile>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProfileMajor = LazyLoading extends LazyLoadingDisabled ? EagerProfileMajor : LazyProfileMajor

export declare const ProfileMajor: (new (init: ModelInit<ProfileMajor>) => ProfileMajor) & {
  copyOf(source: ProfileMajor, mutator: (draft: MutableModel<ProfileMajor>) => MutableModel<ProfileMajor> | void): ProfileMajor;
}

type EagerOpportunityProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OpportunityProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profileId?: string | null;
  readonly opportunityId?: string | null;
  readonly profile: Profile;
  readonly opportunity: Opportunity;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOpportunityProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OpportunityProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profileId?: string | null;
  readonly opportunityId?: string | null;
  readonly profile: AsyncItem<Profile>;
  readonly opportunity: AsyncItem<Opportunity>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OpportunityProfile = LazyLoading extends LazyLoadingDisabled ? EagerOpportunityProfile : LazyOpportunityProfile

export declare const OpportunityProfile: (new (init: ModelInit<OpportunityProfile>) => OpportunityProfile) & {
  copyOf(source: OpportunityProfile, mutator: (draft: MutableModel<OpportunityProfile>) => MutableModel<OpportunityProfile> | void): OpportunityProfile;
}