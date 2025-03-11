// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OpportunityStatus = {
  "PENDING": "PENDING",
  "UPDATED": "UPDATED",
  "APPROVED": "APPROVED",
  "DENIED": "DENIED",
  "REQUESTED": "REQUESTED"
};

const ProfileStatus = {
  "PENDING": "PENDING",
  "REQUESTED": "REQUESTED",
  "UPDATED": "UPDATED",
  "APPROVED": "APPROVED",
  "DENIED": "DENIED",
  "ADMIN": "ADMIN"
};

const RequestStatus = {
  "PENDING": "PENDING",
  "APPROVED": "APPROVED",
  "CANCELED": "CANCELED",
  "REJECTED": "REJECTED"
};

const { Message, ChatRoom, FriendRequest, Friend, Keyword, Organization, Comment, Role, Major, Profile, SiteAnalytics, ProfileAnalytics, OpportunityAnalytics, Request, Post, Opportunity, Note, ProfileChatRoom, KeywordProfile, KeywordOpportunity, RoleMajor, ProfileRole, ProfileMajor, OpportunityProfile, DaysOfWeek, Location, Availability, TimeSpan, WorkHistory, OrganizationHistory } = initSchema(schema);

export {
  Message,
  ChatRoom,
  FriendRequest,
  Friend,
  Keyword,
  Organization,
  Comment,
  Role,
  Major,
  Profile,
  SiteAnalytics,
  ProfileAnalytics,
  OpportunityAnalytics,
  Request,
  Post,
  Opportunity,
  Note,
  ProfileChatRoom,
  KeywordProfile,
  KeywordOpportunity,
  RoleMajor,
  ProfileRole,
  ProfileMajor,
  OpportunityProfile,
  OpportunityStatus,
  ProfileStatus,
  RequestStatus,
  DaysOfWeek,
  Location,
  Availability,
  TimeSpan,
  WorkHistory,
  OrganizationHistory
};