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

const { Organization, Comment, Role, Major, Profile, Request, Post, Opportunity, Note, RoleMajor, ProfileRole, ProfileMajor, ProfileOpportunity, DaysOfWeek, Location, Availability, TimeSpan, WorkHistory } = initSchema(schema);

export {
  Organization,
  Comment,
  Role,
  Major,
  Profile,
  Post,
  Opportunity,
  Request,
  Note,
  RoleMajor,
  ProfileRole,
  ProfileMajor,
  ProfileOpportunity,
  ProfileStatus,
  RequestStatus,
  WorkHistory,
  Location,
  Availability,
  DaysOfWeek,
  TimeSpan
};