import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { ministries } from "../common/Constants";
import UserInput from "./UserInput";
import TitleTypography from "../common/TitleTypography";
import { useLocation } from "react-router-dom";
import keycloak from "../../keycloak";
import { useMsal } from '@azure/msal-react';

export default function MetaDataInput({ formik, isDisabled }) {
  const { pathname } = useLocation();

  const defaultEditOpen = pathname.includes("create");
  const [graphToken, setToken] = useState('');
  const { instance, accounts } = useMsal();

  /* Whenever the keycloak value changes, we'll get a new Azure access token to make calls to the MS Graph API to search for IDIR users. */
  useEffect(() => {
    async function fetchGraphUserDelegateToken() {
      const request = {
        scopes: ['User.ReadBasic.All'],
        account: accounts[0],
      };
      await instance
        .acquireTokenSilent(request)
        .then((response) => {
          setToken(response.accessToken);
        })
        .catch(async (e) => {
          instance.acquireTokenPopup(request).then((response) => {
            setToken(response.accessToken);
          });
        });
     }
     fetchGraphUserDelegateToken();
  },[keycloak]);

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, mt: 1, width: "30ch" },
        width: "550px",
      }}
      noValidate
      autoComplete="off"
    >
      <TitleTypography>Project Description</TitleTypography>

      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        disabled={isDisabled}
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helpertext={formik.touched.name && formik.errors.name}
        size="small"
      />

      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        disabled={isDisabled}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helpertext={formik.touched.email && formik.errors.email}
        size="small"
        style={{ width: "100%" }}
        multiline
        rows={4}
      />

     
      <UserInput
        label={"Product Owner"}
        contact="projectOwner"
        formik={formik}
        isDisabled={isDisabled}
        defaultEditOpen={defaultEditOpen}
        graphToken={graphToken} 
        instance={instance} 
        accounts={accounts}
      />
      <UserInput
        label={"Primary Technical Lead"}
        contact="primaryTechnicalLead"
        formik={formik}
        isDisabled={isDisabled}
        defaultEditOpen={defaultEditOpen}
        graphToken={graphToken} 
        instance={instance} 
        accounts={accounts}
      />

      <UserInput
        label={"Secondary Technical Lead"}
        contact="secondaryTechnicalLead"
        formik={formik}
        isDisabled={isDisabled}
        defaultEditOpen={defaultEditOpen}
        graphToken={graphToken} 
        instance={instance} 
        accounts={accounts}
      />
    </Box>
  );
}
