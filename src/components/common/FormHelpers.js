import * as yup from "yup";
import {
  CreateUserInputSchema,
  CommonComponentsInputSchema,
  QuotaInputSchema,
} from "../../__generated__/resolvers-types";

export const metaDataSchema = {
  name: yup.string().required(),
  description: yup.string().required(),
  projectOwner: yup.string().email("Must be a valid email address").required(),
  projectOwnerUserExists: yup.boolean().required().oneOf([true]),
  primaryTechnicalLead: yup
    .string()
    .email("Must be a valid email address")
    .required(),
  primaryTechnicalLeadUserExists: yup.boolean().required().oneOf([true]),
  secondaryTechnicalLead: yup.string().email("Must be a valid email address"),
  secondaryTechnicalLeadUserExists: yup
    .boolean()
    .when("secondaryTechnicalLead", {
      is: (val) => val != null,
      then: yup.boolean().required(),
    }),
  ministry: yup.string().required(),
  cluster: yup.string().required(),
};

export const customQuotaSchema = {
  cpuRequests: yup.number().required().positive(),
  cpuLimits: yup.number().required().positive(),
  memoryRequests: yup.number().required().positive().integer(),
  memoryLimits: yup.number().required().positive().integer(),
  storageBlock: yup.number().required().positive().integer(),
  storageFile: yup.number().required().positive().integer(),
  storageBackup: yup.number().required().positive().integer(),
  storageCapacity: yup.number().required().positive().integer(),
  storagePvcCount: yup.number().required().positive().integer(),
  snapshotCount: yup.number().required().positive().integer(),
};

export const quotaSchema = {
  productionCpu: yup.string().required(),
  productionMemory: yup.string().required(),
  productionStorage: yup.string().required(),
  developmentCpu: yup.string().required(),
  developmentMemory: yup.string().required(),
  developmentStorage: yup.string().required(),
  testCpu: yup.string().required(),
  testMemory: yup.string().required(),
  testStorage: yup.string().required(),
  toolsCpu: yup.string().required(),
  toolsMemory: yup.string().required(),
  toolsStorage: yup.string().required(),
};

export const commonComponentsSchema = {
  addressAndGeolocation: yup.string().nullable(),
  workflowManagement: yup.string().nullable(),
  formDesignAndSubmission: yup.string().nullable(),
  identityManagement: yup.string().nullable(),
  paymentServices: yup.string().nullable(),
  documentManagement: yup.string().nullable(),
  endUserNotificationAndSubscription: yup.string().nullable(),
  publishing: yup.string().nullable(),
  businessIntelligence: yup.string().nullable(),
  other: yup.string().nullable(),
  noServices: yup.boolean().required(),
};

export const projectFormSchema = yup
  .object()
  .shape({ ...metaDataSchema, ...quotaSchema, ...commonComponentsSchema });

export const createProjectFormSchema = yup
  .object()
  .shape({ ...metaDataSchema, ...commonComponentsSchema });

export const stopPropagationRow = (e, email) => {
  e.stopPropagation()
  window.location.assign(email);
}

export const userProjectToFormData = (userPrivateCloudProject) => {
  if (userPrivateCloudProject === undefined) return {};

  const {
    productionQuota,
    testQuota,
    developmentQuota,
    toolsQuota,
    name,
    description,
    ministry,
    cluster,
    commonComponents,
  } = userPrivateCloudProject;

  return {
    name,
    description,
    ministry,
    cluster,
    ...commonComponents,
    projectOwner: userPrivateCloudProject?.projectOwner.email,
    primaryTechnicalLead: userPrivateCloudProject.primaryTechnicalLead?.email,
    secondaryTechnicalLead:
      userPrivateCloudProject.secondaryTechnicalLead?.email,
    productionCpu:
      `CPU_REQUEST_${productionQuota.cpu.requests}_LIMIT_${productionQuota.cpu.limits}`.replaceAll(
        ".",
        "_"
      ),
    productionMemory:
      `MEMORY_REQUEST_${productionQuota.memory.requests}_LIMIT_${productionQuota.memory.limits}`.replaceAll(
        ".",
        "_"
      ),
    productionStorage: `STORAGE_${productionQuota.storage.file}`.replaceAll(
      ".",
      "_"
    ),
    developmentCpu:
      `CPU_REQUEST_${developmentQuota.cpu.requests}_LIMIT_${developmentQuota.cpu.limits}`.replaceAll(
        ".",
        "_"
      ),
    developmentMemory:
      `MEMORY_REQUEST_${developmentQuota.memory.requests}_LIMIT_${developmentQuota.memory.limits}`.replaceAll(
        ".",
        "_"
      ),
    developmentStorage: `STORAGE_${developmentQuota.storage.file}`.replaceAll(
      ".",
      "_"
    ),
    testCpu:
      `CPU_REQUEST_${testQuota.cpu.requests}_LIMIT_${testQuota.cpu.limits}`.replaceAll(
        ".",
        "_"
      ),
    testMemory:
      `MEMORY_REQUEST_${testQuota.memory.requests}_LIMIT_${testQuota.memory.limits}`.replaceAll(
        ".",
        "_"
      ),
    testStorage: `STORAGE_${testQuota.storage.file}`.replaceAll(".", "_"),
    toolsCpu:
      `CPU_REQUEST_${toolsQuota.cpu.requests}_LIMIT_${toolsQuota.cpu.limits}`.replaceAll(
        ".",
        "_"
      ),
    toolsMemory:
      `MEMORY_REQUEST_${toolsQuota.memory.requests}_LIMIT_${toolsQuota.memory.limits}`.replaceAll(
        ".",
        "_"
      ),
    toolsStorage: `STORAGE_${toolsQuota.storage.file}`.replaceAll(".", "_"),
  };
};

export const formDataToUserProject = (data, dirtyFields) => {
  const changedFields = dirtyFields
    ? Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {})
    : data;

  const {
    name,
    description,
    projectOwner,
    primaryTechnicalLead,
    secondaryTechnicalLead,
    ministry,
    cluster,
    productionCpu,
    productionMemory,
    productionStorage,
    developmentCpu,
    developmentMemory,
    developmentStorage,
    testCpu,
    testMemory,
    testStorage,
    toolsCpu,
    toolsMemory,
    toolsStorage,
    addressAndGeolocation,
    workflowManagement,
    formDesignAndSubmission,
    identityManagement,
    paymentServices,
    documentManagement,
    endUserNotificationAndSubscription,
    publishing,
    businessIntelligence,
    other,
  } = changedFields;

  // const selectedCommonComponents = Object.fromEntries(
  //   Object.entries(commonComponents).filter(([_, v]) => v != null)
  // );

  const metaData = {
    name,
    description,
    projectOwner,
    primaryTechnicalLead,
    secondaryTechnicalLead,
    ministry,
    cluster,
  };

  const commonComponents = {
    addressAndGeolocation,
    workflowManagement,
    formDesignAndSubmission,
    identityManagement,
    paymentServices,
    documentManagement,
    endUserNotificationAndSubscription,
    publishing,
    businessIntelligence,
    other,
  };

  const quota = {
    productionQuota: {
      cpu: productionCpu,
      memory: productionMemory,
      storage: productionStorage,
    },
    developmentQuota: {
      cpu: developmentCpu,
      memory: developmentMemory,
      storage: developmentStorage,
    },
    testQuota: {
      cpu: testCpu,
      memory: testMemory,
      storage: testStorage,
    },
    toolsQuota: {
      cpu: toolsCpu,
      memory: toolsMemory,
      storage: toolsStorage,
    },
  };

  return {
    metaData,
    quota,
    commonComponents,
  };
};

export const cpuToDefaultOption = (quota) =>
  `CPU_REQUEST_${quota.cpuRequests}_LIMIT_${quota.cpuLimits}`.replaceAll(
    ".",
    "_"
  );

export const memoryToDefaultOption = (quota) =>
  `MEMORY_REQUEST_${quota.memoryRequests}_LIMIT_${quota.memoryLimits}`.replaceAll(
    ".",
    "_"
  );

export const storageToDefaultOption = (quota) =>
  `STORAGE_${quota.storageFile}`.replaceAll(".", "_");

export const createProjectInputInitalValues = {
  name: "",
  description: "",
  projectOwner: {
    firstName: "",
    lastName: "",
    email: "",
    ministry: "",
    githubId: "",
  },
  primaryTechnicalLead: {
    firstName: "",
    lastName: "",
    email: "",
    ministry: "",
    githubId: "",
  },
  secondaryTechnicalLead: {
    firstName: "",
    lastName: "",
    email: "",
    ministry: "",
    githubId: "",
  },
  ministry: "",
  cluster: "",
  commonComponents: {
    addressAndGeolocation: "",
    workflowManagement: "",
    formDesignAndSubmission: "",
    identityManagement: "",
    paymentServices: "",
    documentManagement: "",
    endUserNotificationAndSubscription: "",
    publishing: "",
    businessIntelligence: "",
    other: "",
    noServices: false,
  },
};

const quotaInitialValues = {
  productionQuota: {
    cpu: "",
    memory: "",
    storage: "",
  },
  developmentQuota: {
    cpu: "",
    memory: "",
    storage: "",
  },
  testQuota: {
    cpu: "",
    memory: "",
    storage: "",
  },
  toolsQuota: {
    cpu: "",
    memory: "",
    storage: "",
  },
};

export const projectInitialValues = {
  ...createProjectInputInitalValues,
  ...quotaInitialValues,
};

export const replaceNullsWithEmptyString = (obj) =>
  JSON.parse(
    JSON.stringify(obj, (key, value) => (value === null ? "" : value))
  );

export const stripTypeName = (payloadWithTypeName) =>
  JSON.parse(
    JSON.stringify(payloadWithTypeName, (name, val) => {
      if (name === "__typename") {
        delete val[name];
      } else {
        return val;
      }
    })
  );

export const replaceEmptyStringWithNull = (obj) =>
  JSON.parse(
    JSON.stringify(obj, (key, value) => (value === "" ? null : value))
  );

export const createProjectInputValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  ministry: yup.string().required(),
  cluster: yup.string().required(),
  projectOwner: CreateUserInputSchema(),
  primaryTechnicalLead: CreateUserInputSchema(),
  secondaryTechnicalLead: yup
    .object(CreateUserInputSchema)
    .optional()
    .default(null),
  commonComponents: CommonComponentsInputSchema(),
});
