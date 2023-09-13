import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
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
import RequiredField from "../common/RequiredField";
import Autocomplete from "@mui/material/Autocomplete";
import HelperIcon from '../../components/common/HelperIcon';


const parseMinistryFromDisplayName = (displayName) => {
  if (displayName && displayName.length > 0) {
    const dividedString = displayName.split(/(\s+)/);
    if (dividedString[2]) {
      const ministry = dividedString[dividedString.length - 1].split(":", 1)[0];
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
  const [userId, setUserId] = useState('');
  const [userIdir, setUserIdir] = useState('');
  const [edit, setEdit] = useState(defaultEditOpen);
  const [userOptions, setUserOptions] = useState([email]);
  const [emailInput, setEmailInput] = useState("");
  const [inputValue, setInputValue] = useState('');
  const debouncedEmail = useDebounce(emailInput);


  const getFilteredUsers = useCallback(async () => {
    const response = await fetch(
      (process.env.REACT_APP_API_URL || '{{ env "API_BASE_URL" }}') +
      "/api/v1/getIdirEmails?email=" +
      debouncedEmail,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();
    setUserOptions(data);
  }, [debouncedEmail]);


  const getUserIdir = useCallback(async () => {
    if (userId) {
      const response = await fetch(
        (process.env.REACT_APP_API_URL || '{{ env "API_BASE_URL" }}') +
        "/api/v1/getIdir?id=" +
        userId,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        }
      );
      const data = await response.json();
      setUserIdir(data)
    }
  }, [userId]);




  useEffect(() => {
    if (!email) {
      if (contact === "secondaryTechnicalLead") {
        formik.setFieldValue(contact, null);
      } else {
        formik.setFieldValue(contact + ".email", null);
        formik.setFieldValue(contact + ".firstName", null);
        formik.setFieldValue(contact + ".lastName", null);
        formik.setFieldValue(contact + ".ministry", null);
        formik.setFieldValue(contact + ".upn", null);
        formik.setFieldValue(contact + ".idir", null);
      }
    }


    const user = userOptions.find((user) => user.mail?.toLowerCase() === email);


    if (user) {
      setUserId(user.id)
      getUserIdir()
      if (email && userIdir) {
        formik.setFieldValue(contact + ".email", user.mail.toLowerCase());
        formik.setFieldValue(contact + ".firstName", user.givenName);
        formik.setFieldValue(contact + ".lastName", user.surname);
        formik.setFieldValue(contact + ".upn", user.userPrincipalName);
        formik.setFieldValue(contact + ".idir", userIdir);
        formik.setFieldValue(
          contact + ".ministry",
          parseMinistryFromDisplayName(user.displayName)
        );
      }
    }
  }, [email, userId, userIdir]);


  useEffect(() => {
    if (debouncedEmail) {
      getFilteredUsers();
    }
  }, [debouncedEmail]);

//temporary solution for old registry DB users who don't have full account info(idir/ministry/upn etc)
  useEffect(() => {
    setEdit(Boolean(formik.errors[contact]?.firstName) ||
      Boolean(formik.errors[contact]?.email) ||
      Boolean(formik.errors[contact]?.lastName) ||
      Boolean(formik.errors[contact]?.ministry) ||
      Boolean(formik.errors[contact]?.idir) ||
      Boolean(formik.errors[contact]?.upn)
    )
  }, [contact, formik.errors, formik.touched]);


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
              noOptionsText={"No IDIR linked email addresses found"}
              disablePortal
              options={userOptions.map((option) => option.mail?.toLowerCase())}
              getOptionLabel={(mail) => mail || ""}
              sx={{ width: 300 }}
              id={contact + ".email"}
              name={contact + ".email"}
              label="Email"
              disabled={isDisabled}
              onChange={(e, value) => formik.setFieldValue(contact + ".email", value)}
              value={email}
              helperText={formik.touched[contact]?.email && <RequiredField />}
              inputValue={inputValue}
              onInputChange={(e, newInputValue) => {
                setInputValue(newInputValue.trim());
              }}
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
                    formik.touched[contact]?.email &&
                    Boolean(formik.errors[contact]?.email)
                  }
                  helperText={
                    Boolean(formik.values[contact]?.email) ? (
                      <span></span>
                    ) : userOptions.length === 0 && formik.values[contact]?.email ? (
                      <div style={{ fontSize: 16, color: "red" }}>
                        Please enter a valid email address. This email address
                        is not linked to any IDIR account
                      </div>
                    ) : (
                      <RequiredField />
                    )
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
              value={formik.values[contact]?.firstName || ""}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.firstName &&
                Boolean(formik.errors[contact]?.firstName)
              }
              helperText={
                Boolean(!formik.values[contact]?.firstName) && email ? (
                  <div style={{ fontSize: 16, color: "red" }}>
                    Please populate your IDIR account with your first name{" "}
                  </div>
                ) : formik.touched[contact]?.firstName ? (
                  <RequiredField />
                ) : (
                  <span></span>
                )
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
              value={formik.values[contact]?.lastName || ""}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.lastName &&
                Boolean(formik.errors[contact]?.lastName)
              }
              helperText={
                Boolean(!formik.values[contact]?.lastName) && email ? (
                  <div style={{ fontSize: 16, color: "red" }}>
                    Please populate your IDIR account with your last name{" "}
                  </div>
                ) : formik.touched[contact]?.lastName ? (
                  <RequiredField />
                ) : (
                  <span></span>
                )
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
              value={formik.values[contact]?.ministry || ""}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.ministry &&
                Boolean(formik.errors[contact]?.ministry)
              }
              helperText={
                Boolean(!formik.values[contact]?.ministry) && email ? (
                  <div style={{ fontSize: 16, color: "red" }}>
                    Please populate your IDIR account with your home ministry name{" "}
                  </div>
                ) : formik.touched[contact]?.ministry ? (
                  <RequiredField />
                ) : (
                  <span></span>
                )
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
              id={contact + ".idir"}
              name={contact + ".idir"}
              label="IDIR"
              disabled={true}
              value={formik.values[contact]?.idir || ""}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.idir &&
                Boolean(formik.errors[contact]?.idir)
              }
              helperText={
                Boolean(!formik.values[contact]?.idir) && email ? (
                  <div style={{ fontSize: 16, color: "red" }}>
                    Please populate your IDIR account with your IDIR
                  </div>
                ) : formik.touched[contact]?.idir ? (
                  <RequiredField />
                ) : (
                  <span></span>
                )
              }
              InputProps={{
                endAdornment: (
                  <HelperIcon title="IDIR"
                    description={'means Information Directory”, an electronic login identification that allows BC government employees, and their contractors, to access the BC government applications'} />
                ),
              }}
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
              id={contact + ".upn"}
              name={contact + ".upn"}
              label="UPN"
              disabled={true}
              value={formik.values[contact]?.upn || ""}
              onChange={formik.handleChange}
              error={
                formik.touched[contact]?.upn &&
                Boolean(formik.errors[contact]?.upn)
              }
              helperText={
                Boolean(!formik.values[contact]?.upn) && email ? (
                  <div style={{ fontSize: 16, color: "red" }}>
                    Please populate your IDIR account with your User Principal Name
                  </div>
                ) : formik.touched[contact]?.upn ? (
                  <RequiredField />
                ) : (
                  <span></span>
                )
              }
              InputProps={{
                endAdornment: (
                  <HelperIcon title="User Principal Name"
                    description={'The User Principal Name (UPN) attribute is an internet communication standard for user accounts. A UPN consists of a prefix (user account name) and a suffix (DNS domain name). The prefix joins the suffix using the "@" symbol. For example, someone@example.com. '} />
                ),
              }}
              size="small"
            />
          </Box>
        </Stack>
      ) : null}
    </Card>
  );
}
