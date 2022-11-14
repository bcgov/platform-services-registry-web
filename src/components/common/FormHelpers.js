import * as yup from "yup";

const metaDataSchema = {
  name: yup.string().required(),
  description: yup.string().required(),
  projectOwner: yup.string().email("Must be a valid email address").required(),
  primaryTechnicalLead: yup
    .string()
    .email("Must be a valid email address")
    .required(),
  secondaryTechnicalLead: yup.string().email("Must be a valid email address"),
  ministry: yup.string().required(),
  cluster: yup.string().required(),
};

const customQuotaSchema = {
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

const quotaSchema = {
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

const commonComponentsSchema = {
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

const projectFormSchema = yup
  .object()
  .shape({ ...metaDataSchema, ...quotaSchema, ...commonComponentsSchema });

const createProjectFormSchema = yup
  .object()
  .shape({ ...metaDataSchema, ...commonComponentsSchema });

const userProjectToFormData = (userPrivateCloudProject) => {
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
    secondaryTechnicalLead: userPrivateCloudProject.secondaryTechnicalLead?.email,
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

const formDataToUserProject = (data, dirtyFields) => {
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

export {
  userProjectToFormData,
  formDataToUserProject,
  projectFormSchema,
  createProjectFormSchema,
};
