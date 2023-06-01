const checkBoxMinistries = ["AG", "PSSG", "EMBC"];

const ministriesNames = [
  {
    id: 1,
    name: "AEST",
    humanFriendlyName: "Post-Secondary Education and Future Skills Contacts"
  },
  {
    id: 2,
    name: "AG",
    humanFriendlyName: "Attorney General"
  },
  {
    id: 3,
    name: "AGRI",
    humanFriendlyName: "Agriculture and Food"
  },
  {
    id: 4,
    name: "ALC",
    humanFriendlyName: "Advisory Committee Revitalization"
  },
  {
    id: 5,
    name: "BCPC",
    humanFriendlyName: "British Columbia Provincial Committee"
  },
  {
    id: 6,
    name: "CITZ",
    humanFriendlyName: "Citizens' Services"
  },
  {
    id: 7,
    name: "DBC",
    humanFriendlyName: "Drug Benefit Council"
  },
  {
    id: 8,
    name: "EAO",
    humanFriendlyName: "Environmental Assessment Office"
  },
  {
    id: 9,
    name: "EDUC",
    humanFriendlyName: "Education and Child Care"
  },
  {
    id: 10,
    name: "EMBC",
    humanFriendlyName: "Emergency management"
  },
  {
    id: 11,
    name: "EMPR",
    humanFriendlyName: "Energy, Mines and Low Carbon Innovation"
  },
  {
    id: 12,
    name: "ENV",
    humanFriendlyName: "Environment and Climate Change Strategy"
  },
  {
    id: 13,
    name: "FIN",
    humanFriendlyName: "Finance"
  },
  {
    id: 15,
    name: "FLNR",
    humanFriendlyName: "Forests, Lands, Natural Resource"
  },
  {
    id: 16,
    name: "HLTH",
    humanFriendlyName: "Health"
  },
  {
    id: 17,
    name: "IRR",
    humanFriendlyName: "Indigenous Relations & Reconciliation"
  },
  {
    id: 18,
    name: "JEDC",
    humanFriendlyName: "Jobs, Economic Development and Innovation"
  },
  {
    id: 19,
    name: "LBR",
    humanFriendlyName: "Labour"
  },
  {
    id: 20,
    name: "LDB",
    humanFriendlyName: "Liquor Distribution Branch"
  },
  {
    id: 21,
    name: "MAH",
    humanFriendlyName: "Municipal Affairs and Housing"
  },
  {
    id: 22,
    name: "MCF",
    humanFriendlyName: "Children and Family Development"
  },
  {
    id: 23,
    name: "MMHA",
    humanFriendlyName: "Mental Health and Addictions"
  },
  {
    id: 24,
    name: "PSA",
    humanFriendlyName: "Public Service Agency"
  },
  {
    id: 25,
    name: "PSSG",
    humanFriendlyName: "Public Safety and Solicitor General"
  },
  {
    id: 26,
    name: "SDPR",
    humanFriendlyName: "Social Development and Poverty Reduction"
  },
  {
    id: 28,
    name: "TCA",
    humanFriendlyName: "Tangible Capital Assets"
  },
  {
    id: 29,
    name: "TRAN",
    humanFriendlyName: "Transportation and Infrastructure"
  }
].sort((item1, item2) =>
  item1.humanFriendlyName > item2.humanFriendlyName
    ? 1
    : item1.humanFriendlyName < item2.humanFriendlyName
    ? -1
    : 0
);

// const ministriesNamesUpdated = [
//   {
//     id: 1,
//     name: "AF",
//     humanFriendlyName: "Agriculture and Food"
//   },
//   {
//     id: 2,
//     name: "AG",
//     humanFriendlyName: "Attorney General"
//   },
//   {
//     id: 3,
//     name: "MSFD",
//     humanFriendlyName: "Children and Family Development"
//   },
//   {
//     id: 4,
//     name: "CITZ",
//     humanFriendlyName: "Citizens' Services"
//   },
//   {
//     id: 5,
//     name: "ECC",
//     humanFriendlyName: "Education and Child Care"
//   },
//   {
//     id: 6,
//     name: "EMCR",
//     humanFriendlyName: "Emergency Management and Climate Readiness"
//   },
//   {
//     id: 7,
//     name: "EMLI",
//     humanFriendlyName: "Energy, Mines and Low Carbon Innovation"
//   },
//   {
//     id: 8,
//     name: "ENV",
//     humanFriendlyName: "Environment and Climate Change Strategy"
//   },
//   {
//     id: 9,
//     name: "FIN",
//     humanFriendlyName: "Finance"
//   },
//   {
//     id: 10,
//     name: "FOR",
//     humanFriendlyName: "Forests"
//   },
//   {
//     id: 11,
//     name: "HLTH",
//     humanFriendlyName: "Health"
//   },
//   {
//     id: 12,
//     name: "HOUS",
//     humanFriendlyName: "Housing"
//   },
//   {
//     id: 13,
//     name: "IRR",
//     humanFriendlyName: "Indigenous Relations & Reconciliation"
//   },
//   {
//     id: 14,
//     name: "JEDI",
//     humanFriendlyName: "Jobs, Economic Development and Innovation"
//   },
//   {
//     id: 15,
//     name: "LBR",
//     humanFriendlyName: "Labour"
//   },
//   {
//     id: 16,
//     name: "MMHA",
//     humanFriendlyName: "Mental Health and Addictions"
//   },
//   {
//     id: 17,
//     name: "MUNI",
//     humanFriendlyName: "Municipal Affairs"
//   },
//   {
//     id: 18,
//     name: "PSFS",
//     humanFriendlyName: "Post-Secondary Education and Future Skills"
//   },
//   {
//     id: 19,
//     name: "PSSG",
//     humanFriendlyName: "Public Safety and Solicitor General"
//   },
//   {
//     id: 20,
//     name: "SDPR",
//     humanFriendlyName: "Social Development and Poverty Reduction"
//   },
//   {
//     id: 21,
//     name: "TACS",
//     humanFriendlyName: "Tourism, Arts, Culture and Sport"
//   },
//   {
//     id: 22,
//     name: "MOTI",
//     humanFriendlyName: "Transportation and Infrastructure"
//   },
//   {
//     id: 23,
//     name: "WLRS",
//     humanFriendlyName: "Water, Land and Resource Stewardship"
//   },
// ];

const clusters = [
  "CLAB",
  "KLAB",
  "SILVER",
  "GOLD",
  // "GOLDDR",
  "KLAB2",
  "EMERALD"
];

const adminClusters = [
  {
    id: 1,
    name: "CLAB",
    humanFriendlyName: "CLAB Calgary"
  },
  {
    id: 2,
    name: "KLAB",
    humanFriendlyName: "KLAB Kamloops"
  },
  {
    id: 3,
    name: "SILVER",
    humanFriendlyName: "Silver Kamloops"
  },
  {
    id: 4,
    name: "GOLD",
    humanFriendlyName: "Gold Kamloops"
  },
  // {
  //   id: 5,
  //   name: "GOLDDR",
  //   humanFriendlyName: "Gold (DR) Calgary"
  // },
  {
    id: 6,
    name: "KLAB2",
    humanFriendlyName: "KLAB2 Kamloops"
  },
  {
    id: 7,
    name: "EMERALD",
    humanFriendlyName: "Emerald Hosting Tier"
  }
];

const userClusters = [
  {
    id: 3,
    name: "SILVER",
    humanFriendlyName: "Silver Kamloops"
  },
  {
    id: 4,
    name: "GOLD",
    humanFriendlyName: "Gold Kamloops"
  },
  {
    id: 7,
    name: "EMERALD",
    humanFriendlyName: "Emerald Hosting Tier"
  }
];

const defaultCpuOptionsLookup = {
  CPU_REQUEST_0_5_LIMIT_1_5: "0.5 CPU Request, 1.5 CPU Limit",
  CPU_REQUEST_1_LIMIT_2: "1 CPU Request, 2 CPU Limit",
  CPU_REQUEST_2_LIMIT_4: "2 CPU Request, 4 CPU Limit",
  CPU_REQUEST_4_LIMIT_8: "4 CPU Request, 8 CPU Limit",
  CPU_REQUEST_8_LIMIT_16: "8 CPU Request, 16 CPU Limit",
  CPU_REQUEST_16_LIMIT_32: "16 CPU Request, 32 CPU Limit",
  CPU_REQUEST_32_LIMIT_64: "32 CPU Request, 64 CPU Limit"
};

const defaultMemoryOptionsLookup = {
  MEMORY_REQUEST_2_LIMIT_4: "2 GB Request, 4 GB Limit",
  MEMORY_REQUEST_4_LIMIT_8: "4 GB Request, 8 GB Limit",
  MEMORY_REQUEST_8_LIMIT_16: "8 GB Request, 16 GB Limit",
  MEMORY_REQUEST_16_LIMIT_32: "16 GB Request, 32 GB Limit",
  MEMORY_REQUEST_32_LIMIT_64: "32 GB Request, 64 GB Limit",
  MEMORY_REQUEST_64_LIMIT_128: "64 GB Request, 128 GB Limit"
};

const defaultStorageOptionsLookup = {
  STORAGE_1: "1 GB",
  STORAGE_2: "2 GB",
  STORAGE_4: "4 GB",
  STORAGE_16: "16 GB",
  STORAGE_32: "32 GB",
  STORAGE_64: "64 GB",
  STORAGE_128: "128 GB",
  STORAGE_256: "256 GB",
  STORAGE_512: "512 GB"
};

const defaultCpuOptions = [
  "CPU_REQUEST_0_5_LIMIT_1_5",
  "CPU_REQUEST_1_LIMIT_2",
  "CPU_REQUEST_2_LIMIT_4",
  "CPU_REQUEST_4_LIMIT_8",
  "CPU_REQUEST_8_LIMIT_16",
  "CPU_REQUEST_16_LIMIT_32",
  "CPU_REQUEST_32_LIMIT_64"
];

const defaultMemoryOptions = [
  "MEMORY_REQUEST_2_LIMIT_4",
  "MEMORY_REQUEST_4_LIMIT_8",
  "MEMORY_REQUEST_8_LIMIT_16",
  "MEMORY_REQUEST_16_LIMIT_32",
  "MEMORY_REQUEST_32_LIMIT_64",
  "MEMORY_REQUEST_64_LIMIT_128"
];

const defaultStorageOptions = [
  "STORAGE_1",
  "STORAGE_2",
  "STORAGE_4",
  "STORAGE_16",
  "STORAGE_32",
  "STORAGE_64",
  "STORAGE_128",
  "STORAGE_256",
  "STORAGE_512"
];

const commonComponents = [
  { name: "addressAndGeolocation", description: "Address and geolocation" },
  {
    name: "workflowManagement",
    description: "Workflow Management (similar to Camunda)"
  },
  {
    name: "formDesignAndSubmission",
    description:
      "Form Design and Submission (similar to CHEFS, Gravity, Orbeon)"
  },
  {
    name: "identityManagement",
    description: "Identity management (user authentication and authorization)"
  },
  {
    name: "paymentServices",
    description:
      "Payment services (i.e. collection, processing, reconciliation, ledger management)"
  },
  {
    name: "documentManagement",
    description:
      "Document Management (file storage and transfer, PDF and other document generation)"
  },
  {
    name: "endUserNotificationAndSubscription",
    description:
      "End user notification and subscription service (email, text messages, automated phone calls, in-app pop up messages)"
  },
  { name: "publishing", description: "Publishing (web content management)" },
  {
    name: "businessIntelligence",
    description:
      "Business Intelligence Dashboard and Metrics reporting (i.e. diagrams and pie charts, report generation)"
  }
];

export {
  ministriesNames,
  clusters,
  defaultCpuOptions,
  defaultMemoryOptions,
  defaultStorageOptions,
  userClusters,
  adminClusters,
  defaultCpuOptionsLookup,
  defaultMemoryOptionsLookup,
  defaultStorageOptionsLookup,
  checkBoxMinistries,
  commonComponents
};
