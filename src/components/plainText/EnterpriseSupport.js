import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TitleTypography from "../common/TitleTypography";

export default function EnterpriseSupport({
  prod = false,
  dev = false,
  test = false,
  tools = false,
}) {
  return (
    <div style={{ marginTop: 20 }}>
      <TitleTypography>Enterprise Support</TitleTypography>
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
          control={<Checkbox name="dev" checked={dev} disabled />}
          label="Dev"
        />
        <FormControlLabel
          control={<Checkbox name="tools" checked={tools} disabled />}
          label="Tools"
        />
      </FormGroup>
    </div>
  );
}
