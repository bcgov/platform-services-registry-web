import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import useDebounce from "../hooks/useDebounce";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import * as yup from "yup";

const USER_BY_EMAIL = gql`
  query UserByEmail($email: EmailAddress!) {
    userByEmail(email: $email) {
      githubId
      firstName
      lastName
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation Mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      email
      githubId
    }
  }
`;

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  githubId: yup.string().required(),
  email: yup.string().email("Must be a valid email address").required()
});

export default function UserInput({ name, label, defaultEditOpen = true }) {
  const [
    createUser,
    { data: createUserData, loading: createUserLoading, error: createUserError }
  ] = useMutation(CREATE_USER);

  const [edit, setEdit] = useState(defaultEditOpen);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(schema)
    // shouldUnregister: false,
  });

  const {
    setValue: parentSetValue,
    watch: parentWatch,
    errors: parentErrors,
    isDisabled
  } = useFormContext();

  const parentEmail = parentWatch(name);
  const email = watch("email");
  const debouncedEmail = useDebounce(email, 500);
  const debouncedGithubId = useDebounce(watch("githubId"), 500);

  const [getUser, { loading, error, data }] = useLazyQuery(USER_BY_EMAIL, {
    errorPolicy: "ignore",
    onCompleted: (data) => {
      if (data.userByEmail) {
        reset(data.userByEmail);
      }
    }
  });

  useEffect(() => {
    parentSetValue(`${name}UserExists`, !!data?.userByEmail);
  }, [data]);

  useEffect(() => {
    if (parentErrors[name]) {
      setEdit(true);
    }
  }, [parentErrors]);

  useEffect(() => {
    if (parentEmail) {
      getUser({
        errorPolicy: "ignore",
        variables: { email: parentEmail }
      });
      // setEdit(false);
    }
  }, [parentEmail]);

  useEffect(() => {
    if (isDirty) {
      parentSetValue(name, debouncedEmail, { shouldDirty: true });

      setValue("githubId", "", {
        shouldValidate: false
      });
      setValue("firstName", "", {
        shouldValidate: false
      });
      setValue("lastName", "", {
        shouldValidate: false
      });
    }
  }, [isDirty, debouncedEmail]);

  const onSubmit = (data) => {
    createUser({
      variables: {
        input: {
          email,
          firstName: data.firstName,
          lastName: data.lastName,
          githubId: data.githubId
        }
      },
      refetchQueries: [{ query: USER_BY_EMAIL, variables: { email: email } }],
      errorPolicy: "ignore",
      onCompleted: () => {
        setEdit(false);
      }
    });
  };

  return (
    <Card sx={{ mt: 4, mb: 2 }}>
      <Box
        sx={{
          p: 2,
          display: "flex"
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
        {edit && !data?.userByEmail ? (
          <Button sx={{mt: -1}} color="inherit" size="small" onClick={handleSubmit(onSubmit)}>
            Create
          </Button>
        ) : null}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {parentErrors?.[`${name}UserExists`] && (
              <span style={{ color: "grey" }}>
                This user does not exist, please create a user or use an
                existing one
              </span>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 2,
                width: "90%"
              }}
            >
              <Controller
                name={"email"}
                defaultValue={""}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    disabled={isDisabled}
                    size="small"
                    helperText={
                      parentErrors[name] || errors.email
                        ? "Email is a required field"
                        : ""
                    }
                    id={name + "-email"}
                    label="Email"
                  />
                )}
              />
              <Controller
                name={"githubId"}
                defaultValue={""}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    disabled={
                      isDisabled || !!data?.userByEmail?.githubId || !email
                    }
                    size="small"
                    helperText={
                      errors.githubId ? "Github ID is a required field" : ""
                    }
                    id={name + "-githubId"}
                    label="Github ID"
                  />
                )}
              />
              <Controller
                name={"firstName"}
                defaultValue={""}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    disabled={
                      isDisabled || !!data?.userByEmail?.firstName || !email
                    }
                    size="small"
                    helperText={
                      errors.firstName ? "First Name is a required field" : ""
                    }
                    id={name + "-firstName"}
                    label="First Name"
                  />
                )}
              />
              <Controller
                name={"lastName"}
                defaultValue={""}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    disabled={
                      isDisabled || !!data?.userByEmail?.lastName || !email
                    }
                    size="small"
                    helperText={
                      errors.lastName ? "LastName is a required field" : ""
                    }
                    id={name + "-lastName"}
                    label="Last Name"
                  />
                )}
              />
            </Box>
          </form>
        </Stack>
      ) : null}
      {data?.userByEmail ? (
        <Alert severity="success">
          {data?.userByEmail?.firstName} {data?.userByEmail?.lastName} is an
          existing user
        </Alert>
      ) : (
        <Alert severity="info">This user does not yet exist</Alert>
      )}
    </Card>
  );
}
