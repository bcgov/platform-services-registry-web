import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "../common/Avatar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function UserInput({
  label, // e.g "projectOwner" or "primaryTechnicalLead" or "secondaryTechnicalLead"
  firstName,
  lastName,
  email,
  ministry,
}) {
  const [edit, setEdit] = useState(false);

  return (
    <Card sx={{ mr: 8, width: 400 }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          variant="rounded"
          email={email}
          firstName={firstName}
          lastName={lastName}
        />
        <Stack sx={{ width: "100%", ml: 2 }} spacing={0.5}>
          <Typography fontWeight={700}>{label}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "rgba(0, 0, 0, 0.87)", height: 20 }}
          >
            {firstName} {lastName}
            {/* {data?.userByEmail?.firstName} {data?.userByEmail?.lastName} */}
          </Typography>
        </Stack>
        {!edit ? (
          <IconButton
            onClick={() => setEdit(true)}
            sx={{ width: 40, height: 40, p: 1 }}
          >
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 17 }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setEdit(false)}
            sx={{ width: 40, height: 40, p: 1 }}
          >
            <KeyboardArrowUpRoundedIcon sx={{ fontSize: 17 }} />
          </IconButton>
        )}
      </Box>
      <Divider />
      {edit ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1, bgcolor: "background.default" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: 2,
              width: "75%",
            }}
          >
            <Typography sx={{ mb: 2, mt: 2 }}>{firstName}</Typography>
            <Typography sx={{ mb: 2 }}>{lastName}</Typography>
            <Typography sx={{ mb: 2 }}>{email}</Typography>
            <Typography sx={{ mb: 2 }}>{ministry}</Typography>
          </Box>
        </Stack>
      ) : null}
    </Card>
  );
}
