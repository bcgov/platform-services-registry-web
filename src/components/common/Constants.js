const ministries = [
  "AEST",
  "AG",
  "AGRI",
  "ALC",
  "BCPC",
  "CITZ",
  "DBC",
  "EAO",
  "EDUC",
  "EMBC",
  "EMPR",
  "ENV",
  "FIN",
  "FLNR",
  "HLTH",
  "IRR",
  "JEDC",
  "LBR",
  "LDB",
  "MAH",
  "MCF",
  "MMHA",
  "PSA",
  "PSSG",
  "SDPR",
  "TCA",
  "TRAN"
];

const clusters = [
  "CLAB",
  "KLAB",
  "SILVER",
  "GOLD",
  "GOLDDR",
  "KLAB2",
  "EMERALD"
];

const clusterNames = [
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
  {
    id: 5,
    name: "GOLDDR",
    humanFriendlyName: "Gold (DR) Calgary"
  },
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
  MEMORY_REQUEST_64_LIMIT_128: "64 GB Request, 128 GB Limit",
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

export {
  ministries,
  clusters,
  defaultCpuOptions,
  defaultMemoryOptions,
  defaultStorageOptions,
  clusterNames,
  defaultCpuOptionsLookup,
  defaultMemoryOptionsLookup,
  defaultStorageOptionsLookup
};
