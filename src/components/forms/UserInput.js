import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
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
import Autocomplete from "@mui/material/Autocomplete";
import { callMsGraph } from "../../msGraphApi";

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
  const email = formik.values[contact]?.email;

  console.log("EMAIL");
  console.log(email);

  const [edit, setEdit] = useState(defaultEditOpen);
  const [userOptions, setUserOptions] = useState([email]);
  const [emailInput, setEmailInput] = useState("");

  const debouncedGithubId = useDebounce(formik.values[contact]?.githubId, 500);
  const debouncedEmail = useDebounce(emailInput);

  console.log("User Options: ", userOptions);

  const [getUser, { loading, error, data }] = useLazyQuery(USER_BY_EMAIL, {
    errorPolicy: "ignore",
    nextFetchPolicy: "cache-first",
    onCompleted: (data) => {
      if (data.userByEmail) {
        formik.setFieldValue(contact + ".githubId", data.userByEmail.githubId);
      } else {
        formik.setFieldValue(contact + ".githubId", "");
      }
    },
  });

  const getFilteredUsers = useCallback(async () => {
    const url = `https://graph.microsoft.com/v1.0/users?$filter=startswith(mail,'${debouncedEmail}')&$orderby=userPrincipalName&$count=true&$top=25`;
    const data = await callMsGraph(url);

    setUserOptions(data.value);
  }, [debouncedEmail]);

  console.log("EMAIL");
  console.log(email);

  useEffect(() => {
    const user = userOptions.find((user) => user.mail?.toLowerCase() === email);

    if (user) {
      getUser({ variables: { email } });

      formik.setFieldValue(contact + ".email", user.mail.toLowerCase() || "");
      formik.setFieldValue(contact + ".firstName", user.givenName || "");
      formik.setFieldValue(contact + ".lastName", user.surname || "");
      formik.setFieldValue(contact + ".ministry", "CITZ" || "");
    } else if (!email) {
      formik.setFieldValue(contact + ".email", "");
      formik.setFieldValue(contact + ".firstName", "");
      formik.setFieldValue(contact + ".lastName", "");
      formik.setFieldValue(contact + ".ministry", "");
    }
  }, [email]);

  useEffect(() => {
    if (debouncedEmail) {
      getFilteredUsers();
    }
  }, [debouncedEmail]);

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
            {formik.values[contact]?.firstName}{" "}
            {formik.values[contact]?.lastName}
            {/* {data?.userByEmail?.firstName} {data?.userByEmail?.lastName} */}
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
            <Autocomplete
              disablePortal
              options={userOptions.map((option) => option.mail?.toLowerCase())}
              getOptionLabel={(mail) => mail || ""}
              sx={{ width: 300 }}
              id={contact + ".email"}
              name={contact + ".email"}
              label="Email"
              disabled={isDisabled}
              onChange={(e, value) =>
                formik.setFieldValue(contact + ".email", value)
              }
              value={email}
              error={
                formik.touched[contact]?.email &&
                Boolean(formik.errors[contact]?.email)
              }
              helperText={formik.touched[contact]?.email && <RequiredField />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => setEmailInput(e.target.value)}
                  sx={{ mb: 2 }}
                  variant="standard"
                  size="small"
                />
              )}
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
              disabled={true}
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
              disabled={true}
              value={formik.values[contact]?.lastName}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.lastName &&
                Boolean(formik.errors[contact]?.lastName)
              }
              helperText={formik.touched[contact]?.email && <RequiredField />}
              size="small"
            />

            <TextField
              sx={{ mb: 2 }}
              variant="standard"
              id={contact + ".ministry"}
              name={contact + ".ministry"}
              label="Ministry"
              disabled={true}
              value={formik.values[contact]?.ministry}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.ministry &&
                Boolean(formik.errors[contact]?.ministry)
              }
              helperText={
                formik.touched[contact]?.ministry && <RequiredField />
              }
              size="small"
            />
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
