
import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import RequiredField from "../common/RequiredField";

export default function MinistrySpecificMessage({ formik, isDisabled }) {
    const [message, setMessage] = useState();
    
    const JAGMessage = () => {
        return (
            <div>
            All product teams from the Ministries of Attorney General, Public Safety and Solicitor General and Emergency Management BC and BC Housing must engage 
            with <a href="mailto:JAGMISO@gov.bc.ca">AG Security</a> prior to submitting a request for a new project.
                <br/>
                <FormControlLabel
                    control={
                        <Checkbox
                        id="jagConfirmCheckbox"
                        name="confirmAGApproval"
                        type="checkbox"
                        onChange={formik.handleChange}
                        disabled={isDisabled}
                        checked={Boolean(formik.values.confirmAGApproval)}
                        value={formik.values.confirmAGApproval}
                        error={
                            formik.touched.confirmAGApproval &&
                            Boolean(formik.errors.confirmAGApproval)
                          }
                          helperText={formik.touched.confirmAGApproval && <RequiredField />}
                        />
                    }
                    label={"I confirm that I have contacted the AG Security and received their approval for provisioning the namespaces in Private Cloud Openshift plaform."}
                    />
                   
                    <FormHelperText>
                        {formik.touched.confirmAGApproval && <RequiredField />}
                    </FormHelperText>
                    
            </div>
            
        );
    };
   
    /* Right now this is just for ministries in JAG group, but I made it very general for any future  ministries we may want specific messages for */
    useEffect (() => {
        switch ((formik.values.ministry).toLocaleLowerCase()) { 
            case "ag":
            case "pssg":
            case "embc":
            case "mah":
                 setMessage(JAGMessage());
                 break;
            default:
                setMessage(null);
                break;
        };
        
    }, [formik.values.ministry]);
        return <div>{message}</div>
}
