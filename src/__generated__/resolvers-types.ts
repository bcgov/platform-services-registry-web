import * as yup from 'yup'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  EmailAddress: string;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export enum Cluster {
  Clab = 'CLAB',
  Emerald = 'EMERALD',
  Gold = 'GOLD',
  Golddr = 'GOLDDR',
  Klab = 'KLAB',
  Klab2 = 'KLAB2',
  Silver = 'SILVER'
}

export type CommonComponents = {
  __typename?: 'CommonComponents';
  addressAndGeolocation?: Maybe<CommonComponentsOptions>;
  businessIntelligence?: Maybe<CommonComponentsOptions>;
  documentManagement?: Maybe<CommonComponentsOptions>;
  endUserNotificationAndSubscription?: Maybe<CommonComponentsOptions>;
  formDesignAndSubmission?: Maybe<CommonComponentsOptions>;
  identityManagement?: Maybe<CommonComponentsOptions>;
  noServices: Scalars['Boolean'];
  other?: Maybe<Scalars['String']>;
  paymentServices?: Maybe<CommonComponentsOptions>;
  publishing?: Maybe<CommonComponentsOptions>;
  workflowManagement?: Maybe<CommonComponentsOptions>;
};

export type CommonComponentsInput = {
  addressAndGeolocation?: InputMaybe<CommonComponentsOptions>;
  businessIntelligence?: InputMaybe<CommonComponentsOptions>;
  documentManagement?: InputMaybe<CommonComponentsOptions>;
  endUserNotificationAndSubscription?: InputMaybe<CommonComponentsOptions>;
  formDesignAndSubmission?: InputMaybe<CommonComponentsOptions>;
  identityManagement?: InputMaybe<CommonComponentsOptions>;
  noServices?: InputMaybe<Scalars['Boolean']>;
  other?: InputMaybe<Scalars['String']>;
  paymentServices?: InputMaybe<CommonComponentsOptions>;
  publishing?: InputMaybe<CommonComponentsOptions>;
  workflowManagement?: InputMaybe<CommonComponentsOptions>;
};

export enum CommonComponentsOptions {
  Implemented = 'IMPLEMENTED',
  PlanningToUse = 'PLANNING_TO_USE'
}

export type CreateUserInput = {
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  ministry: Ministry;
};

export enum DecisionStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Provisioned = 'PROVISIONED',
  Rejected = 'REJECTED'
}

export enum DefaultCpuOptions {
  CpuRequest_0_5Limit_1_5 = 'CPU_REQUEST_0_5_LIMIT_1_5',
  CpuRequest_1Limit_2 = 'CPU_REQUEST_1_LIMIT_2',
  CpuRequest_2Limit_4 = 'CPU_REQUEST_2_LIMIT_4',
  CpuRequest_4Limit_8 = 'CPU_REQUEST_4_LIMIT_8',
  CpuRequest_8Limit_16 = 'CPU_REQUEST_8_LIMIT_16',
  CpuRequest_16Limit_32 = 'CPU_REQUEST_16_LIMIT_32',
  CpuRequest_32Limit_64 = 'CPU_REQUEST_32_LIMIT_64'
}

export enum DefaultMemoryOptions {
  MemoryRequest_2Limit_4 = 'MEMORY_REQUEST_2_LIMIT_4',
  MemoryRequest_4Limit_8 = 'MEMORY_REQUEST_4_LIMIT_8',
  MemoryRequest_8Limit_16 = 'MEMORY_REQUEST_8_LIMIT_16',
  MemoryRequest_16Limit_32 = 'MEMORY_REQUEST_16_LIMIT_32',
  MemoryRequest_32Limit_64 = 'MEMORY_REQUEST_32_LIMIT_64',
  MemoryRequest_64Limit_128 = 'MEMORY_REQUEST_64_LIMIT_128'
}

export enum DefaultStorageOptions {
  Storage_1 = 'STORAGE_1',
  Storage_2 = 'STORAGE_2',
  Storage_4 = 'STORAGE_4',
  Storage_16 = 'STORAGE_16',
  Storage_32 = 'STORAGE_32',
  Storage_64 = 'STORAGE_64',
  Storage_124 = 'STORAGE_124',
  Storage_256 = 'STORAGE_256',
  Storage_512 = 'STORAGE_512'
}

export enum Environment {
  Development = 'DEVELOPMENT',
  Production = 'PRODUCTION',
  Test = 'TEST',
  Tools = 'TOOLS'
}

export type FilterPrivateCloudProjectsInput = {
  cluster?: InputMaybe<Cluster>;
  ministry?: InputMaybe<Ministry>;
};

export enum Ministry {
  Af = 'AF',
  Ag = 'AG',
  Msfd = 'MSFD',
  Citz = 'CITZ',
  Ecc = 'ECC',
  Emcr = 'EMCR',
  Emli = 'EMLI',
  Env = 'ENV',
  Fin = 'FIN',
  For = 'FOR',
  Hlth = 'HLTH',
  Hous = 'HOUS',
  Irr = 'IRR',
  Jedi = 'JEDI',
  Lbr = 'LBR',
  Mmha = 'MMHA',
  Muni = 'MUNI',
  Psfs = 'PSFS',
  Pssg = 'PSSG',
  Sdpr = 'SDPR',
  Tacs = 'TACS',
  Moti = 'MOTI',
  Wlrs = 'WLRS',
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  privateCloudProjectDeleteRequest: PrivateCloudRequest;
  privateCloudProjectEditRequest: PrivateCloudRequest;
  privateCloudProjectRequest: PrivateCloudRequest;
  privateCloudRequestDecision?: Maybe<PrivateCloudRequest>;
  signUp: User;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationPrivateCloudProjectDeleteRequestArgs = {
  projectId: Scalars['ID'];
};


export type MutationPrivateCloudProjectEditRequestArgs = {
  commonComponents: CommonComponentsInput;
  description: Scalars['String'];
  developmentQuota: QuotaInput;
  ministry: Ministry;
  name: Scalars['String'];
  primaryTechnicalLead: CreateUserInput;
  productionQuota: QuotaInput;
  projectId: Scalars['ID'];
  projectOwner: CreateUserInput;
  secondaryTechnicalLead?: InputMaybe<CreateUserInput>;
  testQuota: QuotaInput;
  toolsQuota: QuotaInput;
};


export type MutationPrivateCloudProjectRequestArgs = {
  cluster: Cluster;
  commonComponents: CommonComponentsInput;
  description: Scalars['String'];
  ministry: Ministry;
  name: Scalars['String'];
  primaryTechnicalLead: CreateUserInput;
  projectOwner: CreateUserInput;
  secondaryTechnicalLead?: InputMaybe<CreateUserInput>;
};


export type MutationPrivateCloudRequestDecisionArgs = {
  decision: RequestDecision;
  requestId: Scalars['ID'];
};

export enum Platform {
  PrivateCloud = 'PRIVATE_CLOUD',
  PublicCloud = 'PUBLIC_CLOUD'
}

export type PrivateCloudProject = {
  __typename?: 'PrivateCloudProject';
  activeEditRequest?: Maybe<PrivateCloudRequest>;
  archived: Scalars['Boolean'];
  cluster: Cluster;
  commonComponents: CommonComponents;
  count?: Maybe<Scalars['Int']>;
  created: Scalars['DateTime'];
  description: Scalars['String'];
  developmentQuota: Quota;
  id: Scalars['ID'];
  licencePlate: Scalars['ID'];
  ministry: Ministry;
  name: Scalars['String'];
  primaryTechnicalLead: User;
  productionQuota: Quota;
  projectOwner: User;
  requestHistory: Array<Maybe<PrivateCloudRequest>>;
  secondaryTechnicalLead?: Maybe<User>;
  status: ProjectStatus;
  testQuota: Quota;
  toolsQuota: Quota;
};

export type PrivateCloudRequest = {
  __typename?: 'PrivateCloudRequest';
  active: Scalars['Boolean'];
  created: Scalars['DateTime'];
  createdBy: User;
  decisionDate?: Maybe<Scalars['DateTime']>;
  decisionMaker?: Maybe<User>;
  decisionStatus: DecisionStatus;
  humanComment: Scalars['String'];
  id: Scalars['ID'];
  project?: Maybe<PrivateCloudProject>;
  requestedProject?: Maybe<PrivateCloudProject>;
  type: RequestType;
};

export enum ProjectStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum PublicCloudPlatform {
  Aws = 'AWS',
  Google = 'GOOGLE'
}

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  privateCloudActiveRequestById: PrivateCloudRequest;
  privateCloudActiveRequests: Array<PrivateCloudRequest>;
  privateCloudActiveRequestsById: Array<PrivateCloudRequest>;
  privateCloudProjectById: PrivateCloudProject;
  privateCloudProjects: Array<PrivateCloudProject>;
  privateCloudProjectsById: Array<PrivateCloudProject>;
  privateCloudProjectsPaginated: ProjectsPaginatedOutput;
  privateCloudProjectsWithFilterSearch: Array<PrivateCloudProject>;
  privateCloudRequests: Array<PrivateCloudRequest>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userPrivateCloudActiveRequestById: PrivateCloudRequest;
  userPrivateCloudActiveRequests: Array<PrivateCloudRequest>;
  userPrivateCloudActiveRequestsByIds: PrivateCloudRequest;
  userPrivateCloudProjectById: PrivateCloudProject;
  userPrivateCloudProjects: Array<PrivateCloudProject>;
  userPrivateCloudProjectsByIds: PrivateCloudProject;
  userPrivateCloudRequestById: PrivateCloudRequest;
  userPrivateCloudRequests: Array<PrivateCloudRequest>;
  users: Array<User>;
  usersByIds: Array<User>;
};


export type QueryPrivateCloudActiveRequestByIdArgs = {
  requestId: Scalars['ID'];
};


export type QueryPrivateCloudActiveRequestsByIdArgs = {
  requestIds: Scalars['ID'];
};


export type QueryPrivateCloudProjectByIdArgs = {
  projectId: Scalars['ID'];
};


export type QueryPrivateCloudProjectsByIdArgs = {
  projectIds?: InputMaybe<Array<Scalars['ID']>>;
};


export type QueryPrivateCloudProjectsPaginatedArgs = {
  filter?: InputMaybe<FilterPrivateCloudProjectsInput>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryPrivateCloudProjectsWithFilterSearchArgs = {
  filter?: InputMaybe<FilterPrivateCloudProjectsInput>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['EmailAddress'];
};


export type QueryUserPrivateCloudActiveRequestByIdArgs = {
  requestId: Scalars['ID'];
};


export type QueryUserPrivateCloudActiveRequestsByIdsArgs = {
  requestIds?: InputMaybe<Array<Scalars['ID']>>;
};


export type QueryUserPrivateCloudProjectByIdArgs = {
  projectId: Scalars['ID'];
};


export type QueryUserPrivateCloudProjectsByIdsArgs = {
  projectIds?: InputMaybe<Array<Scalars['ID']>>;
};


export type QueryUserPrivateCloudRequestByIdArgs = {
  requestId: Scalars['ID'];
};


export type QueryUsersByIdsArgs = {
  ids: Array<Scalars['ID']>;
};

export type Quota = {
  __typename?: 'Quota';
  cpu: DefaultCpuOptions;
  memory: DefaultMemoryOptions;
  storage: DefaultStorageOptions;
};

export type QuotaInput = {
  cpu: DefaultCpuOptions;
  memory: DefaultMemoryOptions;
  storage: DefaultStorageOptions;
};

export enum RequestDecision {
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

export enum RequestType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Edit = 'EDIT'
}

export type SignUpInput = {
  ministry: Ministry;
};

export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type UpdateUserInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['EmailAddress']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  lastSeen?: InputMaybe<Scalars['DateTime']>;
  projectOwner?: InputMaybe<Array<Scalars['ID']>>;
  technicalLead?: InputMaybe<Array<Scalars['ID']>>;
};

export type User = {
  __typename?: 'User';
  archived: Scalars['Boolean'];
  created: Scalars['DateTime'];
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  lastSeen?: Maybe<Scalars['DateTime']>;
  ministry: Ministry;
  privateCloudProjectOwner: Array<Maybe<PrivateCloudProject>>;
  privateCloudProjectPrimaryTechnicalLead: Array<Maybe<PrivateCloudProject>>;
  privateCloudProjectSecondaryTechnicalLead: Array<Maybe<PrivateCloudProject>>;
};

export type ProjectsPaginatedOutput = {
  __typename?: 'projectsPaginatedOutput';
  projects: Array<PrivateCloudProject>;
  total: Scalars['Int'];
};


export function AdditionalEntityFieldsSchema(): yup.SchemaOf<AdditionalEntityFields> {
  return yup.object({
    path: yup.string(),
    type: yup.string()
  })
}

export const ClusterSchema = yup.mixed().oneOf([Cluster.Clab, Cluster.Emerald, Cluster.Gold, Cluster.Golddr, Cluster.Klab, Cluster.Klab2, Cluster.Silver]);

export function CommonComponentsInputSchema(): yup.SchemaOf<CommonComponentsInput> {
  return yup.object({
    addressAndGeolocation: yup.mixed(),
    businessIntelligence: yup.mixed(),
    documentManagement: yup.mixed(),
    endUserNotificationAndSubscription: yup.mixed(),
    formDesignAndSubmission: yup.mixed(),
    identityManagement: yup.mixed(),
    noServices: yup.boolean(),
    other: yup.string(),
    paymentServices: yup.mixed(),
    publishing: yup.mixed(),
    workflowManagement: yup.mixed()
  })
}

export const CommonComponentsOptionsSchema = yup.mixed().oneOf([CommonComponentsOptions.Implemented, CommonComponentsOptions.PlanningToUse]);

export function CreateUserInputSchema(): yup.SchemaOf<CreateUserInput> {
  return yup.object({
    email: yup.string().defined(),
    firstName: yup.string().defined(),
    lastName: yup.string().defined(),
    ministry: yup.mixed().defined()
  })
}

export const DecisionStatusSchema = yup.mixed().oneOf([DecisionStatus.Approved, DecisionStatus.Pending, DecisionStatus.Provisioned, DecisionStatus.Rejected]);

export const DefaultCpuOptionsSchema = yup.mixed().oneOf([DefaultCpuOptions.CpuRequest_0_5Limit_1_5, DefaultCpuOptions.CpuRequest_1Limit_2, DefaultCpuOptions.CpuRequest_2Limit_4, DefaultCpuOptions.CpuRequest_4Limit_8, DefaultCpuOptions.CpuRequest_8Limit_16, DefaultCpuOptions.CpuRequest_16Limit_32, DefaultCpuOptions.CpuRequest_32Limit_64]);

export const DefaultMemoryOptionsSchema = yup.mixed().oneOf([DefaultMemoryOptions.MemoryRequest_2Limit_4, DefaultMemoryOptions.MemoryRequest_4Limit_8, DefaultMemoryOptions.MemoryRequest_8Limit_16, DefaultMemoryOptions.MemoryRequest_16Limit_32, DefaultMemoryOptions.MemoryRequest_32Limit_64, DefaultMemoryOptions.MemoryRequest_64Limit_128]);

export const DefaultStorageOptionsSchema = yup.mixed().oneOf([DefaultStorageOptions.Storage_1, DefaultStorageOptions.Storage_2, DefaultStorageOptions.Storage_4, DefaultStorageOptions.Storage_16, DefaultStorageOptions.Storage_32, DefaultStorageOptions.Storage_64, DefaultStorageOptions.Storage_124, DefaultStorageOptions.Storage_256, DefaultStorageOptions.Storage_512]);

export const EnvironmentSchema = yup.mixed().oneOf([Environment.Development, Environment.Production, Environment.Test, Environment.Tools]);

export function FilterPrivateCloudProjectsInputSchema(): yup.SchemaOf<FilterPrivateCloudProjectsInput> {
  return yup.object({
    cluster: yup.mixed(),
    ministry: yup.mixed()
  })
}

export const MinistrySchema = yup.mixed().oneOf([Ministry.Af, Ministry.Ag, Ministry.Msfd, Ministry.Citz, Ministry.Ecc, Ministry.Emcr, Ministry.Emli, Ministry.Env, Ministry.Fin, Ministry.For, Ministry.Hlth, Ministry.Hous, Ministry.Irr, Ministry.Jedi, Ministry.Lbr, Ministry.Mmha, Ministry.Muni, Ministry.Psfs, Ministry.Pssg, Ministry.Sdpr, Ministry.Tacs, Ministry.Moti, Ministry.Wlrs]);

export const PlatformSchema = yup.mixed().oneOf([Platform.PrivateCloud, Platform.PublicCloud]);

export const ProjectStatusSchema = yup.mixed().oneOf([ProjectStatus.Active, ProjectStatus.Inactive]);

export const PublicCloudPlatformSchema = yup.mixed().oneOf([PublicCloudPlatform.Aws, PublicCloudPlatform.Google]);

export function QuotaInputSchema(): yup.SchemaOf<QuotaInput> {
  return yup.object({
    cpu: yup.mixed().defined(),
    memory: yup.mixed().defined(),
    storage: yup.mixed().defined()
  })
}

export const RequestDecisionSchema = yup.mixed().oneOf([RequestDecision.Approved, RequestDecision.Rejected]);

export const RequestTypeSchema = yup.mixed().oneOf([RequestType.Create, RequestType.Delete, RequestType.Edit]);

export function SignUpInputSchema(): yup.SchemaOf<SignUpInput> {
  return yup.object({
    ministry: yup.mixed().defined()
  })
}

export const SortOrderSchema = yup.mixed().oneOf([SortOrder.Ascending, SortOrder.Descending]);

export function UpdateUserInputSchema(): yup.SchemaOf<UpdateUserInput> {
  return yup.object({
    archived: yup.boolean(),
    email: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
    lastSeen: yup.string(),
    projectOwner: yup.array().of(yup.string().defined()).optional(),
    technicalLead: yup.array().of(yup.string().defined()).optional()
  })
}


