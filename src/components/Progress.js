import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MetaDataInput from "./MetaDataInput";
import Cluster from "./ClusterInput";
import QuotaInput from "./QuotaInput";
const steps = ["Meta Data", "Cluster", "Quota"];

export default function Progress() {
  const [activeStep, setActiveStep] = useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <MetaDataInput />;
      case 1:
        return <Cluster />;
      case 2:
        return <QuotaInput />;
      default:
        throw new Error("Unknown step");
    }
  }
  const isStepOptional = (step) => {
    return false;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ mb: 3 }} style={{ width: "95%", marginLeft: 24 }}>
      <Stepper
        activeStep={activeStep}
        style={{ marginBottom: "40px", marginTop: "15px" }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset} size="large">
              Reset
            </Button>
          </Box>
        </>
      ) : (
        <>
          <div>
            <Typography sx={{ mt: 1, mb: 2, fontSize: 23, fontWeight: 500 }}>
              {steps[activeStep]}
            </Typography>
            {getStepContent(activeStep)}
          </div>
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, width: "50%" }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              size="large"
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext} size="large">
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
