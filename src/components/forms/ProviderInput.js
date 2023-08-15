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
import AdminContext from "../../context/roles";

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
        <TitleTypography>Provider</TitleTypography>
        <Typography sx={{ mb: 2 }} color="text.primary">
          Select your public cloud provider.
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
        <InputLabel id="provider-label">Provider</InputLabel>
        <Select
          value={formik.values.provider || ''}
          id="select-provider"
          name="provider"
          label="Provider"
          labelId="select-provider"
          disabled={isDisabled}
          onChange={formik.handleChange}
          error={formik.touched.provider && Boolean(formik.errors.provider)}
          helpertext={formik.touched.provider && formik.errors.provider}
        >
          {providerNamesInput.map((option, i) => (
            <MenuItem key={i} value={option.name}>
              {option.humanFriendlyName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched.provider && <RequiredField />}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
