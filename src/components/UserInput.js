import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import useDebounce from "./utilities/UseDebounce";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  email: yup.string().email("Must be a valid email address").required(),
});

export default function UserInput({ name }) {
  const [
    createUser,
    {
      data: createUserData,
      loading: createUserLoading,
      error: createUserError,
    },
  ] = useMutation(CREATE_USER);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    // shouldUnregister: false,
  });

  const {
    setValue: parentSetValue,
    watch: parentWatch,
    errors: parentErrors,
    isDisabled,
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
    },
  });

  useEffect(() => {
    if (parentEmail) {
      console.log("parentEmail", parentEmail);
      getUser({
        errorPolicy: "ignore",
        variables: { email: parentEmail },
      });
    }
  }, [parentEmail]);

  useEffect(() => {
    if (isDirty) {
      console.log("IS DIRTY");
      parentSetValue(name, debouncedEmail, { shouldDirty: true });
      setValue("githubId", "", {
        shouldValidate: false,
      });
      setValue("firstName", "", {
        shouldValidate: false,
      });
      setValue("lastName", "", {
        shouldValidate: false,
      });
    }
  }, [isDirty, debouncedEmail]);

  const onSubmit = (data) => {
    createUser({
      variables: {
        input: { email, ...data },
      },
      refetchQueries: [{ query: USER_BY_EMAIL, variables: { email: email } }],
      errorPolicy: "ignore",
      onCompleted: () => {
        console.log("CREATED NEW USER");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        sx={{
          p: 2,
          mb: 3,
          width: "90%",
          pr: 6,
          display: "flex",
          flexDirection: "row",
          height: "100%",
        }}
      >
        <Avatar
          sx={{ ml: 1, mr: 3, my: 4, width: 56, height: 56 }}
          src={`https://github.com/${
            debouncedGithubId !== "" ? debouncedGithubId : undefined
          }.png`}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 2,
            width: "100%",
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
                disabled={isDisabled || !!data?.userByEmail?.githubId || !email}
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
                disabled={isDisabled || !!data?.userByEmail?.lastName || !email}
                size="small"
                helperText={
                  errors.lastName ? "LastName is a required field" : ""
                }
                id={name + "-lastName"}
                label="Last Name"
              />
            )}
          />
          {email &&
            (data?.userByEmail ? (
              <Alert severity="success">
                {data?.userByEmail?.firstName} {data?.userByEmail?.lastName} is
                an existing user
              </Alert>
            ) : (
              <Alert
                severity="info"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Create
                  </Button>
                }
              >
                This user does not yet exist
              </Alert>
            ))}
        </Box>
      </Paper>
    </form>
  );
}
