import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "../../components/common/Avatar";
import CircularProgress from "../../components/common/CircularProgress";
import { Box } from "@mui/system";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "@mui/material/Link";
import { stopPropagationRow } from "../../components/common/FormHelpers";

dayjs.extend(relativeTime);

const requestsToRows = ({
  id,
  active,
  decisionStatus,
  type,
  created,
  requestedProject: {
    name,
    licencePlate,
    projectOwner,
    primaryTechnicalLead,
    secondaryTechnicalLead,
    ministry,
    cluster,
    provider,
  },
}) => ({
  id,
  onClickPath: (isAdmin) =>
    `/registry/${isAdmin.admin || isAdmin.readOnlyAdmin ? "admin" : "user"}/${
      provider && !cluster ? "public-cloud" : "private-cloud"
    }/request/${id}`,

  name: <span style={{ fontSize: 18, fontWeight: "500" }}>{name}</span>,
  created: <span style={{ fontSize: 16 }}> {dayjs(created).fromNow()}</span>,
  licencePlate: (
    <b style={{ fontSize: 16, fontWeight: "500" }}>{licencePlate}</b>
  ),
  ministry,
  cluster: provider === "AWS" ? "ROSA" : cluster,
  projectOwner: (
    <Link
      underline="hover"
      onClick={(e) => stopPropagationRow(e, "mailto:" + projectOwner.email)}
    >
      <Chip
        key={projectOwner.githubId}
        style={{ width: "fit-content" }}
        avatar={
          <Avatar
            firstName={projectOwner.firstName}
            email={projectOwner.email}
            lastName={projectOwner.lastName}
          />
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
        .map(({ firstName, lastName, githubId, email }) => (
          <Link
            underline="hover"
            onClick={(e) => stopPropagationRow(e, "mailto:" + email)}
          >
            <Chip
              key={githubId}
              style={{ width: "fit-content" }}
              avatar={
                <Avatar
                  firstName={firstName}
                  email={email}
                  lastName={lastName}
                />
              }
              label={`${firstName} ${lastName}`}
              variant="outlined"
            />
          </Link>
        ))}
    </Stack>
  ),
  status: (
    <Box sx={{ display: "flex" }}>
      {decisionStatus === "APPROVED" ? <CircularProgress /> : null}
      {decisionStatus === "REJECTED" ? (
        <CancelIcon fontSize="small" color="error" sx={{ mt: 0.7 }} />
      ) : null}
      {decisionStatus === "PENDING" ? (
        <HourglassBottomRoundedIcon
          fontSize="small"
          color="secondary"
          sx={{ mt: 0.7 }}
        />
      ) : null}
      {decisionStatus === "PROVISIONED" ? (
        <CheckCircleRoundedIcon
          fontSize="small"
          color="success"
          sx={{ mt: 0.7 }}
        />
      ) : null}
      <Chip
        style={{ borderRadius: 7, fontWeight: "500", border: "none" }}
        // color={decisionStatusColourLookup[decisionStatus]}
        variant="outlined"
        label={decisionStatusLookup[decisionStatus]}
      />
    </Box>
  ),

  type: <Chip style={{ borderRadius: 7 }} label={type} />,
});

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

const decisionStatusLookup = {
  APPROVED: "PROCESSING",
  PENDING: "PENDING DECISION",
  PROVISIONED: "PROVISIONED",
  REJECTED: "REJECTED",
};

const decisionStatusColourLookup = {
  APPROVED: "success",
  PENDING: "secondary",
  REJECTED: "error",
  PROVISIONED: "success",
};

const columns = [
  { id: "type", label: "Type", minWidth: 0 },
  { id: "status", label: "Status", minWidth: 0 },
  { id: "name", label: "Name", minWidth: 0 },
  { id: "ministry", label: "Ministry", minWidth: 0 },
  { id: "cluster", label: "Cluster", minWidth: 0 },
  { id: "projectOwner", label: "Project Owner", minWidth: 0 },
  { id: "technicalLeads", label: "Technical Leads", minWidth: 0 },
  { id: "created", label: "Created", minWidth: 200 },
  { id: "licencePlate", label: "License Plate", minWidth: 0 },
];

export { requestsToRows, columns };
