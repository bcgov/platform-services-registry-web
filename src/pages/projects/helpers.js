import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

const columns = [
  { id: "name", label: "Name", minWidth: 180 },
  { id: "description", label: "Description", minWidth: 200 },
  { id: "ministry", label: "Ministry", minWidth: 0 },
  { id: "cluster", label: "Cluster", minWidth: 0 },
  { id: "projectOwner", label: "Project Owner", minWidth: 0 },
  { id: "technicalLeads", label: "Technical Leads", minWidth: 0 },
  { id: "licencePlate", label: "License Place", minWidth: 0 },
];

const projectsToRows = ({
  id,
  name,
  description,
  projectOwner,
  technicalLeads,
  ministry,
  cluster,
  licencePlate,
}) => ({
  id,
  name: <span style={{ fontSize: 16, fontWeight: "450" }}>{name}</span>,
  description: (
    <span style={{ fontSize: 14 }}> {truncate(description, 130)}</span>
  ),
  ministry,
  cluster,
  licencePlate: (
    <b style={{ fontSize: 16, fontWeight: "500" }}>{licencePlate}</b>
  ),
  projectOwner: (
    <Chip
      key={projectOwner.githubId + licencePlate + "po"}
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
      {technicalLeads.map(({ firstName, lastName, githubId }, i) => (
        <Chip
          key={projectOwner.githubId + licencePlate + i}
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
});

export { columns, projectsToRows };
