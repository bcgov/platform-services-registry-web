import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TitleTypography from "../common/TitleTypography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";

const commonComponents = [
  { name: "addressAndGeolocation", description: "Address and geolocation" },
  {
    name: "workflowManagement",
    description: "Workflow Management (similar to Camunda)",
  },
  {
    name: "formDesignAndSubmission",
    description:
      "Form Design and Submission (similar to CHEFS, Gravity, Orbeon)",
  },
  {
    name: "identityManagement",
    description: "Identity management (user authentication and authorization)",
  },
  {
    name: "paymentServices",
    description:
      "Payment services (i.e. collection, processing, reconciliation, ledger management)",
  },
  {
    name: "documentManagement",
    description:
      "Document Management (file storage and transfer, PDF and other document generation)",
  },
  {
    name: "endUserNotificationAndSubscription",
    description:
      "End user notification and subscription service (email, text messages, automated phone calls, in-app pop up messages)",
  },
  { name: "publishing", description: "Publishing (web content management)" },
  {
    name: "businessIntelligence",
    description:
      "Business Intelligence Dashboard and Metrics reporting (i.e. diagrams and pie charts, report generation)",
  },
];

const StyledCheckboxContainer = styled.div`
  min-width: 400px;
  display: inline-block;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default function CommonComponents({ formik, isDisabled }) {
  const [dirty, setDirty] = useState(false);

  const noServices = formik.values.commonComponents.noServices;

  const onClick = (name) => (event) => {
    if (event.target.value === formik.values.commonComponents[name]) {
      formik.setFieldValue(event.target.name, "");
    } else {
      formik.setFieldValue(event.target.name, event.target.value);
    }
  };

  useEffect(() => {
    const { noServices, ...rest } = formik.values.commonComponents;
    const values = Object.values(rest).filter((value) => value !== "");

    setDirty(values.length !== 0);
  }, [formik.values.commonComponents]);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <div>
        <TitleTypography>Common Components</TitleTypography>
        <Typography sx={{ mb: 4 }} color="text.primary">
          Tell us about the <b>Product Owner (PO).</b> This is typically the
          business owner of the application. We will use this information to
          contact them with any non-technical questions.
        </Typography>
      </div>
      <FormControl>
        {commonComponents.map(({ name, description }) => (
          <div key={name} style={{ marginBottom: "10px" }}>
            <Typography
              variant="body1"
              sx={{ marginTop: 0.5, fontWeight: "medium" }}
            >
              {description}
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              onClick={onClick(name)}
              value={formik.values.commonComponents[name]}
            >
              <FormControlLabel
                control={
                  <Radio
                    id={"commonComponents" + name + "IMPLEMENTED"}
                    name={"commonComponents." + name}
                    value="IMPLEMENTED"
                    disabled={isDisabled || !!noServices}
                  />
                }
                label="Implemented"
              />
              <FormControlLabel
                control={
                  <Radio
                    id={"commonComponents" + name + "IMPLEMENTED"}
                    name={"commonComponents." + name}
                    value="PLANNING_TO_USE"
                    disabled={isDisabled || !!noServices}
                  />
                }
                label="Planning to use"
              />
            </RadioGroup>
          </div>
        ))}
        <div style={{ display: "flex" }}>
          <Typography
            variant="body1"
            color={isDisabled && "rgba(0, 0, 0, 0.38)"}
            sx={{ marginTop: 0.5, fontWeight: "medium" }}
          >
            Other
          </Typography>
          <TextField
            id="other"
            name="commonComponents.other"
            label="please specify"
            onChange={formik.handleChange}
            value={formik.values.commonComponents.other}
            sx={{ ml: 3, width: "80%" }}
            disabled={isDisabled || !!noServices}
            size="small"
          />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              id="noServices"
              name="commonComponents.noServices"
              type="checkbox"
              onChange={formik.handleChange}
              disabled={isDisabled || dirty}
              checked={Boolean(formik.values.commonComponents.noServices)}
              value={formik.values.commonComponents.noServices?.[0] === "on"}
            />
          }
          label={"The app does not use any of these services"}
        />
        {formik.errors?.commonComponents}
        <FormHelperText>{formik.errors?.commonComponents}</FormHelperText>
        <FormHelperText>
          {formik.errors?.commonComponents?.noServices}
        </FormHelperText>
      </FormControl>
      {formik.errors?.commonComponents}
    </Box>
  );
}
