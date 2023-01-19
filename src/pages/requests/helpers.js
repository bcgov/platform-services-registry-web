import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

const requestsToRows = ({
  id,
  active,
  decisionStatus,
  type,
  requestedProject: {
    name,
    description,
    licencePlate,
    projectOwner,
    primaryTechnicalLead,
    secondaryTechnicalLead,
     ministry,
    cluster,
  },
}) => ({
  id,
  name: <span style={{ fontSize: 18, fontWeight: "500" }}>{name}</span>,
  description: (
    <span style={{ fontSize: 18 }}> {truncate(description, 130)}</span>
  ),
  licencePlate: (
    <b style={{ fontSize: 18, fontWeight: "500" }}>{licencePlate}</b>
  ),
  ministry,
  cluster,
  projectOwner: (
    <Chip
      key={projectOwner.githubId}
      style={{ width: "fit-content" }}
      avatar={
        <Avatar
          alt={projectOwner.firstName}
          src={`https://github.com/${projectOwner.githubId}.png`}
        />
      }
      label={`${projectOwner.firstName} ${projectOwner.lastName}`}
      variant="outlined"
    />
  ),
  technicalLeads: (
    <Stack direction="column" spacing={1}>
      {[primaryTechnicalLead, secondaryTechnicalLead].filter(Boolean).map(({ firstName, lastName, githubId }) => (
        <Chip
          key={githubId}
          style={{ width: "fit-content" }}
          avatar={
            <Avatar
              alt={firstName}
              src={`https://github.com/${githubId}.png`}
            />
          }
          label={`${firstName} ${lastName}`}
          variant="outlined"
        />
      ))}
    </Stack>
  ),
  status: (
    <Chip
      style={{ borderRadius: 7, fontWeight: "500" }}
      color={decisionStatusColourLookup[decisionStatus]}
      variant="outlined"
      label={decisionStatusLookup[decisionStatus]}
    />
  ),
  type: <Chip style={{ borderRadius: 7 }} label={type} />,
});

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

const decisionStatusLookup = {
  APPROVED: "APPROVED",
  PENDING: "PENDING DECISION",
};

const decisionStatusColourLookup = {
  APPROVED: "success",
  PENDING: "secondary",
  REJECTED: "error",
};

const columns = [
  { id: "type", label: "Type", minWidth: 0 },
  { id: "status", label: "Status", minWidth: 0 },
  { id: "name", label: "Name", minWidth: 0 },
  { id: "description", label: "Description", minWidth: 200 },
  { id: "ministry", label: "Ministry", minWidth: 0 },
  { id: "cluster", label: "Cluster", minWidth: 0 },
  { id: "projectOwner", label: "Project Owner", minWidth: 0 },
  { id: "technicalLeads", label: "Technical Leads", minWidth: 0 },
  { id: "licencePlate", label: "License Plate", minWidth: 0 },
];

export { requestsToRows, columns };
