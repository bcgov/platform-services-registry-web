import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { TextField } from "@mui/material";
import Avatar from "../common/Avatar";
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
import { getUsers, getUserPhoto } from "../../msGraphApi";
import usePhotoUrl from "../../msGraphApi/useAzurePhoto";

const USER_BY_EMAIL = gql`
  query UserByEmail($email: EmailAddress!) {
    userByEmail(email: $email) {
      firstName
      lastName
      email
      ministry
    }
  }
`;

const parseMinistryFromDisplayName = (displayName) => {
  if (displayName && displayName.length > 0) {
    const dividedString = displayName.split(/(\s+)/);
    if (dividedString[2]) {
      const ministry = dividedString[dividedString.length - 1].split(":", 1)[0];
      console.log("Parse: ", ministry);
      return ministry;
    }
  }
};

export default function UserInput({
  contact, // e.g "projectOwner" or "primaryTechnicalLead" or "secondaryTechnicalLead"
  label,
  defaultEditOpen = true,
  formik,
  isDisabled = false
}) {
  const email = formik.values[contact]?.email;

  const [edit, setEdit] = useState(defaultEditOpen);
  const [userOptions, setUserOptions] = useState([email]);
  const [userId, setUserId] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const debouncedEmail = useDebounce(emailInput);

  const photoUrl = usePhotoUrl(email);
  const [getUser, { loading, error, data }] = useLazyQuery(USER_BY_EMAIL, {
    errorPolicy: "ignore",
    nextFetchPolicy: "cache-first"
  });

  const getFilteredUsers = useCallback(async () => {
    const data = await getUsers(debouncedEmail);

    setUserOptions(data);
  }, [debouncedEmail]);

  useEffect(() => {
    const user = userOptions.find((user) => user.mail?.toLowerCase() === email);

    if (user) {
      getUser({ variables: { email } });

      setUserId(user.id);

      formik.setFieldValue(contact + ".email", user.mail.toLowerCase() || "");
      formik.setFieldValue(contact + ".firstName", user.givenName || "");
      formik.setFieldValue(contact + ".lastName", user.surname || "");
      formik.setFieldValue(
        contact + ".ministry",
        parseMinistryFromDisplayName(user.displayName) || null
      );
    } else if (!email) {
      formik.setFieldValue(contact + ".email", "");
      formik.setFieldValue(contact + ".firstName", "");
      formik.setFieldValue(contact + ".lastName", "");
      formik.setFieldValue(contact + ".ministry", null);
    }
  }, [email]);

  useEffect(() => {
    if (debouncedEmail) {
      getFilteredUsers();
    }
  }, [debouncedEmail]);

  console.log(
    "Name: ",
    formik.values[contact]?.firstName,
    " ",
    formik.values[contact]?.lastName
  );
  console.log("MINISTRY: ", formik.values[contact]?.ministry);

  return (
    <Card sx={{ mr: 8, width: 400 }}>
      <Box
        sx={{
          p: 2,
          display: "flex"
        }}
      >
        <Avatar
          variant="rounded"
          email={email}
          firstName={formik.values[contact]?.firstName}
          lastName={formik.values[contact]?.lastName}
        />
        <Stack sx={{ width: "100%", ml: 2 }} spacing={0.5}>
          <Typography fontWeight={700}>{label}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "rgba(0, 0, 0, 0.87)", height: 20 }}
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
              width: "75%"
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
              helperText={formik.touched[contact]?.email && <RequiredField />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => setEmailInput(e.target.value)}
                  label="Email"
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"
                    },
                    mb: 2
                  }}
                  error={
                    formik.touched[contact]?.firstName &&
                    Boolean(formik.errors[contact]?.firstName)
                  }
                  helperText={
                    formik.touched[contact]?.email && <RequiredField />
                  }
                  variant="standard"
                  size="small"
                />
              )}
            />
            <TextField
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"
                },
                mb: 2
              }}
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
              helperText={
                formik.touched[contact]?.firstName && <RequiredField />
              }
              size="small"
            />
            <TextField
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"
                },
                mb: 2
              }}
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
              helperText={
                formik.touched[contact]?.lastName && <RequiredField />
              }
              size="small"
            />
            <TextField
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"
                },
                mb: 2
              }}
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
    </Card>
  );
}
