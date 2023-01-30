import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { gql, useLazyQuery } from "@apollo/client";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { ministries } from "../common/Constants";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import RequiredField from "../common/RequiredField";
import FormHelperText from "@mui/material/FormHelperText";

const USER_BY_EMAIL = gql`
  query UserByEmail($email: EmailAddress!) {
    userByEmail(email: $email) {
      githubId
      firstName
      lastName
      email
      ministry
    }
  }
`;

export default function UserInput({
  contact, // e.g "projectOwner" or "primaryTechnicalLead" or "secondaryTechnicalLead"
  label,
  defaultEditOpen = true,
  formik,
  isDisabled = false,
}) {
  const [edit, setEdit] = useState(defaultEditOpen);

  const debouncedGithubId = useDebounce(formik.values[contact]?.githubId, 500);
  const debouncedEmail = useDebounce(formik.values[contact]?.email, 500);
  const email = formik.values[contact]?.email;

  const [getUser, { loading, error, data }] = useLazyQuery(USER_BY_EMAIL, {
    errorPolicy: "ignore",
    onCompleted: (data) => {
      // Set the data fetched from the Get User API Query to the form fields
      if (data.userByEmail) {
        formik.setFieldValue(contact + ".githubId", data.userByEmail.githubId);
        formik.setFieldValue(
          contact + ".firstName",
          data.userByEmail.firstName
        );
        formik.setFieldValue(contact + ".lastName", data.userByEmail.lastName);
        formik.setFieldValue(contact + ".email", data.userByEmail.email);
        formik.setFieldValue(contact + ".ministry", data.userByEmail.ministry);
      }
    },
  });

  useEffect(() => {
    // When the user types in the email field, call the Get User API Query
    if (debouncedEmail) {
      getUser({ variables: { email: debouncedEmail } });
    }
  }, [debouncedEmail]);

  return (
    <Card sx={{  mr: 8, width: 400 }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          variant="rounded"
          src={`https://github.com/${
            debouncedGithubId !== "" ? debouncedGithubId : undefined
          }.png`}
        />
        <Stack sx={{ width: "100%", ml: 2 }} spacing={0.5}>
          <Typography fontWeight={700}>{label}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 20 }}
          >
            {data?.userByEmail?.firstName} {data?.userByEmail?.lastName}
          </Typography>
        </Stack>
        {!edit ? (
          <IconButton
            onClick={() => setEdit(true)}
            sx={{ width: 40, height: 40, p: 1 }}
          >
            <Edit sx={{ fontSize: 17 }} />
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
            <TextField
              sx={{ mb: 2 }}
              variant="standard"
              id={contact + ".email"}
              name={contact + ".email"}
              label="Email"
              disabled={isDisabled}
              value={formik.values[contact]?.email}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.email &&
                Boolean(formik.errors[contact]?.email)
              }
              helperText={formik.touched[contact]?.email && <RequiredField />}
              size="small"
            />

            <TextField
              sx={{ mb: 2 }}
              variant="standard"
              id={contact + ".githubId"}
              name={contact + ".githubId"}
              label="Github Username"
              disabled={isDisabled || !!data?.userByEmail?.githubId || !email}
              value={formik.values[contact]?.githubId}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.githubId &&
                Boolean(formik.errors[contact]?.githubId)
              }
              helperText={formik.touched[contact]?.email && <RequiredField />}
              size="small"
            />

            <TextField
              sx={{ mb: 2 }}
              variant="standard"
              id={contact + ".firstName"}
              name={contact + ".firstName"}
              label="First Name"
              disabled={isDisabled || !!data?.userByEmail?.firstName || !email}
              value={formik.values[contact]?.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.firstName &&
                Boolean(formik.errors[contact]?.firstName)
              }
              helperText={formik.touched[contact]?.email && <RequiredField />}
              size="small"
            />

            <TextField
              sx={{ mb: 2 }}
              variant="standard"
              id={contact + ".lastName"}
              name={contact + ".lastName"}
              label="Last Name"
              disabled={isDisabled || !!data?.userByEmail?.lastName || !email}
              value={formik.values[contact]?.lastName}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.lastName &&
                Boolean(formik.errors[contact]?.lastName)
              }
              helperText={formik.touched[contact]?.email && <RequiredField />}
              size="small"
            />

            <FormControl sx={{ minWidth: 250, mt: 1, mb: 3 }} size="small">
              <InputLabel id="demo-simple-select-required-label">
                Ministry
              </InputLabel>
              <Select
                id={contact + ".ministry"}
                name={contact + ".ministry"}
                label="Ministry"
                disabled={isDisabled || !!data?.userByEmail?.ministry || !email}
                value={formik.values[contact]?.ministry}
                onChange={formik.handleChange}
                error={
                  formik.touched[contact]?.ministry &&
                  Boolean(formik.errors[contact]?.ministry)
                }
                helperText={formik.touched[contact]?.email && <RequiredField />}
              >
                {ministries.map((ministryOption) => (
                  <MenuItem key={ministryOption} value={ministryOption}>
                    {ministryOption}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched[contact]?.email && <RequiredField />}
              </FormHelperText>
            </FormControl>
          </Box>
        </Stack>
      ) : null}
      {data?.userByEmail ? (
        <Alert severity="success">
          {data?.userByEmail?.firstName} {data?.userByEmail?.lastName} is an
          existing user
        </Alert>
      ) : (
        <Alert severity="info">This user does not exist</Alert>
      )}
    </Card>
  );
}
