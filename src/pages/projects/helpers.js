import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import GroupAvatars from "../../components/common/Contacts";
import Avatar from "../../components/common/Avatar";
import Link from "@mui/material/Link";
import { stopPropagationRow } from "../../components/common/FormHelpers";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

const columns = [
  { id: "name", label: "Name", minWidth: 180, width: 180 },
  { id: "description", label: "Description", minWidth: 200, width: 200 },
  { id: "ministry", label: "Ministry", minWidth: 0, width: 100 },
  { id: "cluster", label: "Cluster", minWidth: 0, width: 100 },
  { id: "projectOwner", label: "Project Owner", minWidth: 0, width: 180 },
  { id: "technicalLeads", label: "Technical Leads", minWidth: 0, width: 180 },
  { id: "licencePlate", label: "License Plate", minWidth: 0, width: 100 },
];

const columnsXs = [
  { id: "name", label: "Name", minWidth: 40, width: 60 },
  { id: "contacts", label: "Contacts", minWidth: 0, width: 100 },
  { id: "licencePlate", label: "License Plate", minWidth: 0, width: 100 },
];

const projectsToRows = ({
  id,
  name,
  description,
  projectOwner,
  primaryTechnicalLead,
  secondaryTechnicalLead,
  ministry,
  cluster,
  licencePlate,
}) => ({
  id,
  name: <span style={{ fontSize: 18, fontWeight: "450" }}>{name}</span>,
  description: (
    <span style={{ fontSize: 18 }}> {truncate(description, 130)}</span>
  ),
  ministry,
  cluster,
  licencePlate: (
    <Link
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      underline="hover"
      onClick={(e) =>
        stopPropagationRow(
          e,
          `https://console.apps.${cluster}.devops.gov.bc.ca/topology/ns/${licencePlate}-prod`
        )
      }
    >
      <b style={{ fontSize: 16, fontWeight: "500" }}>{licencePlate}</b>
    </Link>
  ),
  projectOwner: (
    <Link
      underline="hover"
      onClick={(e) => stopPropagationRow(e, "mailto:" + projectOwner.email)}
    >
      <Chip
        // key={projectOwner.githubId + licencePlate + "po"}
        style={{ width: "fit-content" }}
        avatar={
          <Avatar email={projectOwner.email} firstName={projectOwner.firstName} lastName={projectOwner.lastName} />
        }
        label={`${projectOwner.firstName} ${projectOwner.lastName}`}
        variant="outlined"
      />
    </Link>
  ),
  technicalLeads: (
    <Stack direction="column" spacing={1}>
      {[primaryTechnicalLead, secondaryTechnicalLead]
        .filter(Boolean)
        .map(({ firstName, lastName, email }, i) => (
          <Link
            underline="hover"
            onClick={(e) => stopPropagationRow(e, "mailto:" + email)}
          >
            <Chip
              key={firstName + i + "project"}
              style={{ width: "fit-content" }}
              avatar={<Avatar firstName={firstName} email={email} lastName={lastName} />}
              label={`${firstName} ${lastName}`}
              variant="outlined"
            />
          </Link>
        ))}
    </Stack>
  ),
});

const projectsToRowsXs = ({
  id,
  name,
  projectOwner,
  primaryTechnicalLead,
  secondaryTechnicalLead,
  licencePlate,
  cluster,
}) => ({
  id,
  name: <span style={{ fontSize: 18, fontWeight: "450" }}>{name}</span>,
  contacts: (
    <GroupAvatars
      users={[
        projectOwner,
        primaryTechnicalLead,
        secondaryTechnicalLead,
      ].filter(Boolean)}
    />
  ),
  licencePlate: (
    <Link
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      underline="hover"
      onClick={(e) =>
        stopPropagationRow(
          e,
          `https://console.apps.${cluster}.devops.gov.bc.ca/topology/ns/${licencePlate}-prod`
        )
      }
    >
      <b style={{ fontSize: 16, fontWeight: "500" }}>{licencePlate}</b>
    </Link>
  ),
});

export { columns, columnsXs, projectsToRows, projectsToRowsXs };
