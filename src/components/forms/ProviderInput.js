import { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TitleTypography from "../common/TitleTypography";
import FormHelperText from "@mui/material/FormHelperText";
import RequiredField from "../common/RequiredField";
import Typography from "@mui/material/Typography";
import AdminContext from "../../context/admin";

export default function ProviderInput({ formik, isDisabled }) {
  const isAdmin = useContext(AdminContext);
  const providerNamesInput = [
    {
      name: "AWS",
      humanFriendlyName: "Amazon Web Services"
    }
  ];

  return (
    <Box
      sx={{
        mb: 1,
        mt: 5,
        width: 250
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TitleTypography>Cluster</TitleTypography>
        <Typography sx={{ mb: 2 }} color="text.primary">
          Select your cluster. <b>GOLD</b> will also create a <b>GOLDDR</b>{" "}
          cluster.
        </Typography>
      </div>
      <FormControl
        sx={{
          "& .MuiInputBase-input.Mui-disabled, .MuiInputBase-input-MuiOutlinedInput-input":
            {
              WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"
            },
          "& .MuiInputLabel-root": {
            WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"
          },
          "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "rgba(0, 0, 0, 0.87)"
            },
          width: 250,
          mt: 1
        }}
        size="small"
      >
        <InputLabel id="cluster-label">Cluster</InputLabel>
        <Select
          id="cluster"
          name="cluster"
          value={formik.values.cluster}
          onChange={formik.handleChange}
          error={formik.touched.cluster && Boolean(formik.errors.cluster)}
          helpertext={formik.touched.cluster && formik.errors.cluster}
          disabled={isDisabled}
          labelId="select-cluster"
          label="Cluster"
        >
          {providerNamesInput.map((clusterOption, i) => (
            <MenuItem key={i} value={clusterOption.name}>
              {clusterOption.humanFriendlyName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched.cluster && <RequiredField />}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
