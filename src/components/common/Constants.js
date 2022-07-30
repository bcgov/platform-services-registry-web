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
  "TRAN",
];


const clusters = [
  'CLAB',
  'KLAB',
  'SILVER',
  'GOLD',
  'GOLDDR',
  'ARO',
]

const defaultCpuOptions = [
  'CPU_REQUEST_0_5_LIMIT_1_5',
  'CPU_REQUEST_1_LIMIT_2',
  'CPU_REQUEST_2_LIMIT_4',
  'CPU_REQUEST_4_LIMIT_8',
  'CPU_REQUEST_8_LIMIT_16',
  'CPU_REQUEST_16_LIMIT_32',
  'CPU_REQUEST_32_LIMIT_64',
]

const defaultMemoryOptions = [
  'MEMORY_REQUEST_2_LIMIT_4',
  'MEMORY_REQUEST_4_LIMIT_8',
  'MEMORY_REQUEST_8_LIMIT_16',
  'MEMORY_REQUEST_16_LIMIT_32',
  'MEMORY_REQUEST_32_LIMIT_64',
  'MEMORY_REQUEST_64_LIMIT_128',
]

const defaultStorageOptions = [
  'STORAGE_1',
  'STORAGE_2',
  'STORAGE_4',
  'STORAGE_16',
  'STORAGE_32',
  'STORAGE_64',
  'STORAGE_124',
  'STORAGE_256',
  'STORAGE_512',
]


export { ministries, clusters, defaultCpuOptions, defaultMemoryOptions, defaultStorageOptions };
