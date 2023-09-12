import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TitleTypography from "../common/TitleTypography";
import RequiredField from "../common/RequiredField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

export default function Budget({ formik, isDisabled }) {

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { mb: 2, mt: 2 },
        mb: 4,
        mt: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        "& .css-16dsu82-MuiTypography-root": {
          color: "text.primary",
        }
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ display: "flex", p: 0 }}>
        <Box sx={{ mr: 0, width: 550 }}>
          <div>
            <TitleTypography>Budget</TitleTypography>
            <Typography sx={{ mb: 1 }} color="text.primary">
              Please provide your monthly budget for this project.
            </Typography>
          </div>
          <TextField
            sx={{ mr: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">USD</InputAdornment>
              )
            }}           
            type="number"
            id="budgetProd"
            name="budget.prod"
            label="Production"
            disabled={isDisabled}
            value={formik.values.budget=== undefined ?'0': formik.values.budget.prod}
            onChange={formik.handleChange}
            error={
              formik.touched.budget?.prod && Boolean(formik.errors.budget?.prod)
            }
            helperText={formik.touched?.budget?.prod && <RequiredField />}
            size="small"
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">USD</InputAdornment>
              )
            }}
            type="number"
            id="budgetTest"
            name="budget.test"
            label="Test"
            disabled={isDisabled}
            value={formik.values.budget=== undefined ?'0': formik.values.budget.test}
            onChange={formik.handleChange}
            error={
              formik.touched.budget?.test && Boolean(formik.errors.budget?.test)
            }
            helperText={formik.touched?.budget?.test && <RequiredField />}
            size="small"
          />

          <TextField
            sx={{ mr: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">USD</InputAdornment>
              )
            }}
            type="number"
            id="budgetDev"
            name="budget.dev"
            label="Development"
            disabled={isDisabled}
            value={formik.values.budget=== undefined ?'0': formik.values.budget.dev}
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
              )
            }}
            type="number"
            id="budgetTools"
            name="budget.tools"
            label="Tools"
            disabled={isDisabled}
            value={formik.values.budget=== undefined ?'0': formik.values.budget.tools}
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
  );
}
