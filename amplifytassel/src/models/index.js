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

const { Keyword, Profile, Major, Role, Request, Post, Comment, Opportunity, Organization, Note, KeywordProfile, KeywordOpportunity, ProfileMajor, ProfileRole, OpportunityProfile, RoleMajor, WorkHistory, Availability, DaysOfWeek, TimeSpan, Location } = initSchema(schema);

export {
  Keyword,
  Profile,
  Major,
  Role,
  Request,
  Post,
  Comment,
  Opportunity,
  Organization,
  Note,
  KeywordProfile,
  KeywordOpportunity,
  ProfileMajor,
  ProfileRole,
  OpportunityProfile,
  RoleMajor,
  OpportunityStatus,
  ProfileStatus,
  RequestStatus,
  WorkHistory,
  Availability,
  DaysOfWeek,
  TimeSpan,
  Location
};