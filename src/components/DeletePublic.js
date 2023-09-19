import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useQuery, gql } from "@apollo/client";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};


export default function DeletePublic({
  deleteOnClick,
  projectId,
  name,
  licencePlate,
  projectOwnerEmail: email
}) {
  const [projectLicencePlate, setLicencePlateNumber] = useState("");
  const [projectOwnerEmail, setProjectOwnerEmail] = useState("");


  return (
    <Box sx={style}>
      <Typography
        disabled={true}
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ mb: 2 }}
      >
        Please Confirm Your Delete Request
      </Typography>
      {/* <Chip
        sx={{ mb: 1 }}
        label={
          loading
            ? "Checking..."
            : data.userPublicCloudDeletionCheck
            ? "Ready to Delete"
            : "Not Ready to Delete"
        }
        icon={
          loading ? (
            <HourglassBottomRoundedIcon />
          ) : data.userPublicCloudDeletionCheck ? (
            <DoneIcon />
          ) : (
            <CancelIcon />
          )
        }
      />
      <p>
        {loading
          ? "Performing a deletion check on your namespace to make sure it is empty..."
          : data.userPublicCloudDeletionCheck
          ? "Deletion check has passed."
          : "Deletion check has failed. Please make sure your namespace is empty before deleting."}
      </p> */}
        <Box sx={{ mt: 2 }}>
          <Typography>Project Name: {name}</Typography>
          <Typography>License Plate: {licencePlate}</Typography>

          <Typography>PO Email: {email}</Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 4
            }}
          >
            Are you sure you want to delete this product? Please enter the
            following information about your project to confirm your deletion
            request.
            <Box>
              <TextField
                id="outlined-basic"
                label="License Plate Number"
                variant="outlined"
                size="small"
                sx={{ mt: 2, mb: 1 }}
                onChange={(e) => setLicencePlateNumber(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Project Owner Email"
                variant="outlined"
                size="small"
                sx={{ mt: 1, mb: 1 }}
                onChange={(e) => setProjectOwnerEmail(e.target.value)}
              />
            </Box>
            <Typography
              id="modal-modal-description"
              sx={{
                mt: 4
              }}
            >
              This opperation cannot be undone.
            </Typography>
            <Button
              onClick={() =>
                deleteOnClick(projectLicencePlate, projectOwnerEmail)
              }
              sx={{ mr: 1, width: "170px", mt: 2 }}
              variant="contained"
            //   disabled={!data?.userPublicCloudDeletionCheck}
            >
              Delete
            </Button>
          </Typography>
        </Box>
    </Box>
  );
}
