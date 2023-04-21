// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

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

const { Keyword, Organization, Comment, Role, Major, Profile, Request, Post, Opportunity, Note, KeywordProfile, KeywordOpportunity, RoleMajor, ProfileRole, ProfileMajor, OpportunityProfile, DaysOfWeek, Location, Availability, TimeSpan, WorkHistory } = initSchema(schema);

export {
  Keyword,
  Organization,
  Comment,
  Role,
  Major,
  Profile,
  Request,
  Post,
  Opportunity,
  Note,
  KeywordProfile,
  KeywordOpportunity,
  RoleMajor,
  ProfileRole,
  ProfileMajor,
  OpportunityProfile,
  ProfileStatus,
  RequestStatus,
  DaysOfWeek,
  Location,
  Availability,
  TimeSpan,
  WorkHistory
};