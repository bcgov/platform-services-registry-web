import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function EnterpriseSupport({ formik, isDisabled }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            name="prod"
            onChange={formik.handleChange}
            checked={true}
            defaultChecked
            disabled
          />
        }
        label="Prod"
        disabled={true}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="test"
            onChange={formik.handleChange}
            checked={formik.values.test || false}
          />
        }
        label="Test"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="dev"
            onChange={formik.handleChange}
            checked={formik.values.dev || false}
          />
        }
        label="Dev"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="tools"
            onChange={formik.handleChange}
            checked={formik.values.tools || false}
          />
        }
        label="Tools"
      />
    </FormGroup>
  );
}
