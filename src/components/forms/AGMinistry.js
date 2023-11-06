import { useState, useEffect } from "react";
import { checkBoxMinistries } from "../common/Constants";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const AGMinistry = ({ formik, setAGministries, text }) => {
  const [AGministry, setAGministry] = useState(false);

  useEffect(() => {
    setAGministries(
      checkBoxMinistries.indexOf(formik.values.ministry) !== -1
        ? !AGministry
        : false
    );
  });

  useEffect(() => {
    setAGministries(
      checkBoxMinistries.indexOf(formik.values.ministry) !== -1
        ? !AGministry
        : false
    );
  }, [AGministry, formik.values.ministry, setAGministries]);

  const handleChangeCheckBox = (event) => {
    setAGministry(event.target.checked);
  };

  return (
    <Box sx={{ mb: 5, mt: 5, mr: 10 }}>
      {checkBoxMinistries.indexOf(formik.values.ministry) !== -1 && (
        <FormControlLabel
          style={{
            minWidth: "700px",
          }}
          control={
            <Checkbox
              id="ministryAG"
              name="ministryAGname"
              type="checkbox"
              checked={
                checkBoxMinistries.indexOf(formik.values.ministry) !== -1
                  ? AGministry
                  : true
              }
              onChange={handleChangeCheckBox}
              style={{
                color: `${!AGministry ? "red" : "#003366"}`,
              }}
            />
          }
          label={
            <Typography
              sx={{ width: 700, mt: 1 }}
              variant="subtitle2"
              color="text.secondary"
            >
              I confirm that I have contacted the AG Security and received their
              approval for provisioning {text}.
            </Typography>
          }
        />
      )}
      <Typography
        sx={{ width: 700, mt: 1 }}
        variant="subtitle2"
        color="text.secondary"
      >
        * All product teams from the Ministries of Attorney General, Public
        Safety and Solicitor General and Emergency Management BC and BC Housing
        must engage with{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto: JAGMISO@gov.bc.ca"
        >
          AG Security
        </a>{" "}
        to prior to submitting a request for a new product.
      </Typography>
    </Box>
  );
};

export default AGMinistry;
