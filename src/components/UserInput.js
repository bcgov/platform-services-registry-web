import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import useDebounce from "./utilities/UseDebounce";
import { useForm } from "react-hook-form";

const USER_BY_EMAIL = gql`
  query UserByEmail($email: EmailAddress!) {
    userByEmail(email: $email) {
      githubId
      firstName
      lastName
    }
  }
`;

export default function UserInput({ name }) {
  const [getUser, { loading, error, data }] = useLazyQuery(USER_BY_EMAIL);

  const { control, setValue, errors, isDisabled, watch } = useFormContext();

  const email = watch(name)
  const debouncedEmail = useDebounce(email, 500);
  const debouncedGithubId = useDebounce(watch(`${name}GithubId`), 500);

  console.log("debouncedGithubId", debouncedGithubId);

  useEffect(() => {
    if (debouncedEmail) {
      getUser({
        errorPolicy: "ignore",
        variables: { email: debouncedEmail },
      });

    }
  }, [debouncedEmail]);

  useEffect(() => {
    setValue(`${name}GithubId`, "", {
      shouldValidate: false,
    });
  }, [email, name, setValue]);

  useEffect(() => {
    if (!loading && data?.userByEmail?.githubId) {
      console.log("set value", `${name}GithubId`, data.userByEmail.githubId);
      setValue(`${name}GithubId`, data?.userByEmail?.githubId, {
        shouldValidate: true,
      });
    }
  }, [data, loading, setValue, name]);

  return (
    <Paper sx={{ p: 2, mb: 3, width: "90%", pr: 6, display: "flex", flexDirection: "row", height: 200 }}>
      <Avatar
        sx={{ ml: 1, mr: 3, my: 4, width: 56, height: 56 }}
        src={`https://github.com/${
          debouncedGithubId === "" ? undefined : debouncedGithubId
        }.png`}
      />
      <Box sx={{ display: "flex", flexDirection: "column", ml: 2, width: "100%" }}>
        <Controller
          name={name}
          defaultValue={""}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              disabled={isDisabled}
              size="small"
              helperText={errors[name] ? "Email is a required field" : ""}
              id={name + "-email"}
              label="Email"
            />
          )}
        />
        <Controller
          name={`${name}GithubId`}
          defaultValue={""}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              disabled={isDisabled || !!data?.userByEmail?.githubId}
              size="small"
              helperText={
                errors[name + "GithubId"]
                  ? "Github ID is a required field"
                  : ""
              }
              id={name + "-githubId"}
              label="Github ID"
            />
          )}
        />
      </Box>
    </Paper>
  );
}
