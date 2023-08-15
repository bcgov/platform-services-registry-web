import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function EnterpriseSupport({ prod, dev, test, tools }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox name="prod" checked={prod} disabled />}
        label="Prod"
        disabled={true}
      />
      <FormControlLabel
        control={<Checkbox name="test" checked={test} disabled />}
        label="Test"
      />
      <FormControlLabel
        control={<Checkbox name="dev" checked={dev} />}
        label="Dev"
      />
      <FormControlLabel
        control={<Checkbox name="tools" checked={tools} />}
        label="Tools"
      />
    </FormGroup>
  );
}
