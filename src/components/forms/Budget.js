import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TitleTypography from "../common/TitleTypography";
import RequiredField from "../common/RequiredField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

export default function Budget({ formik, isDisabled }) {
  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { mt: 2 },
          mb: 2,
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          "& .MuiTypography-root": {
            color: "text.primary",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ display: "flex", p: 0 }}>
          <Box sx={{ mr: 0, width: 550 }}>
            <div>
              <TitleTypography>Budget</TitleTypography>
              <Typography sx={{ mb: 1 }} color="text.primary">
                Please provide your projected monthly budget for this project.
              </Typography>
            </div>
            <TextField
              sx={{ mr: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">USD</InputAdornment>
                ),
              }}
              type="number"
              id="budgetProd"
              name="budget.prod"
              label="Production"
              disabled={isDisabled}
              value={formik.values.budget.prod}
              inputProps={{ min: 50 }}
              onChange={formik.handleChange}
              error={
                formik.touched.budget?.prod &&
                Boolean(formik.errors.budget?.prod)
              }
              helperText={formik.touched?.budget?.prod && <RequiredField />}
              size="small"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">USD</InputAdornment>
                ),
              }}
              type="number"
              id="budgetTest"
              name="budget.test"
              label="Test"
              disabled={isDisabled}
              value={formik.values.budget.test}
              inputProps={{ min: 50 }}
              onChange={formik.handleChange}
              error={
                formik.touched.budget?.test &&
                Boolean(formik.errors.budget?.test)
              }
              helperText={formik.touched?.budget?.test && <RequiredField />}
              size="small"
            />

            <TextField
              sx={{ mr: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">USD</InputAdornment>
                ),
              }}
              type="number"
              id="budgetDev"
              name="budget.dev"
              label="Development"
              disabled={isDisabled}
              value={formik.values.budget.dev}
              inputProps={{ min: 50 }}
              onChange={formik.handleChange}
              error={
                formik.touched.budget?.dev && Boolean(formik.errors.budget?.dev)
              }
              helperText={formik.touched?.budget?.dev && <RequiredField />}
              size="small"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">USD</InputAdornment>
                ),
              }}
              type="number"
              id="budgetTools"
              name="budget.tools"
              label="Tools"
              disabled={isDisabled}
              value={formik.values.budget.tools}
              inputProps={{ min: 50 }}
              onChange={formik.handleChange}
              error={
                formik.touched.budget?.tools &&
                Boolean(formik.errors.budget?.tools)
              }
              helperText={formik.touched?.budget?.tools && <RequiredField />}
              size="small"
            />
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{ mb: 1, width: 700, display: "block" }}
        variant="body"
        color="text.primary"
      >
        The project owner and technical leads specified above will recieve email
        alerts when the actual monthly spending per account gets close to the
        projected budget below.
      </Typography>
      <Typography
        sx={{ mb: 1, width: 700, display: "block" }}
        variant="body"
        color="text.primary"
      >
        <b>Note:</b> there is a base cost of <b>USD $50</b> per each account
        within the project set, the projected monthly budget per account must be
        set to be higher or equal to <b>USD $50.</b>
      </Typography>
    </div>
  );
}
