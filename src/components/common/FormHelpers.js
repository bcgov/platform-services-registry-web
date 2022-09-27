const userProjectToFormData = (userPrivateCloudProject) => {

  if (userPrivateCloudProject === undefined) return {};

  const productionQuota = userPrivateCloudProject?.productionQuota;
  const testQuota = userPrivateCloudProject?.testQuota;
  const developmentQuota = userPrivateCloudProject?.developmentQuota;
  const toolsQuota = userPrivateCloudProject?.toolsQuota;

  return {
    ...userPrivateCloudProject,
    projectOwner: userPrivateCloudProject.projectOwner.email,
    primaryTechnicalLead: userPrivateCloudProject.technicalLeads[0]?.email,
    secondaryTechnicalLead: userPrivateCloudProject.technicalLeads[1]?.email,
    projectOwnerGithubId: userPrivateCloudProject.projectOwner.githubId,
    primaryTechnicalLeadGithubId: userPrivateCloudProject.technicalLeads[0]?.githubId,
    secondaryTechnicalLeadGithubId: userPrivateCloudProject.technicalLeads[1]?.githubId,
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

const formDataToUserProject = (formData) => {
  const {
    name,
    description,
    projectOwner,
    primaryTechnicalLead,
    secondaryTechnicalLead,
    projectOwnerGithubId,
    primaryTechnicalLeadGithubId,
    secondaryTechnicalLeadGithubId,
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
  } = formData;

  return {
    metaData: {
      name,
      description,
      projectOwner,
      technicalLeads: [primaryTechnicalLead, secondaryTechnicalLead].filter(
        Boolean
      ),
      projectOwnerGithubId,
      technicalLeadsGithubIds: [ primaryTechnicalLeadGithubId, secondaryTechnicalLeadGithubId].filter(
        Boolean
      ),
      ministry,
      cluster,
    },
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
};

export { userProjectToFormData, formDataToUserProject };
