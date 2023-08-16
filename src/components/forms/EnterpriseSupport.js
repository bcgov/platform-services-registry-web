import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TitleTypography from "../common/TitleTypography";

export default function EnterpriseSupport({ formik, isDisabled }) {
  return (
    <div>
      <TitleTypography>Enterprise Support</TitleTypography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="enterpriseSupport.prod"
              onChange={formik.handleChange}
              checked={true}
              disabled
            />
          }
          label="Prod"
          disabled={true}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="enterpriseSupport.test"
              onChange={formik.handleChange}
              checked={Boolean(formik.values.enterpriseSupport.test)}
            />
          }
          label="Test"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="enterpriseSupport.dev"
              onChange={formik.handleChange}
              checked={Boolean(formik.values.enterpriseSupport.dev)}
            />
          }
          label="Dev"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="enterpriseSupport.tools"
              onChange={formik.handleChange}
              checked={Boolean(formik.values.enterpriseSupport.tools)}
            />
          }
          label="Tools"
        />
      </FormGroup>
    </div>
  );
}
