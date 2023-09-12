import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import RequiredField from "../common/RequiredField";

export default function OnInputErrorField({
    formik,
    value,
    isDisabled,
    placeholder,
    title,
    length,
    id,
    handleChange,
    specialChars
}) {
    const [errorLengthMessage, setErrorLengthMessage] = useState('');
    const [errorSpecialCharMessage, setErrorSpecialCharMessage] = useState('');
    const [error, setError] = useState(false);

    return (
        <TextField
            id={id}
            name={id}
            label={title}
            disabled={isDisabled}
            value={value}
            onChange={(e) => { handleChange(id, e.target.value) }}
            required
            placeholder={placeholder}
            error={
                (formik.touched.accountCoding && Boolean(formik.errors.accountCoding)) || error
            }
            helperText={
                (formik.touched.accountCoding && <RequiredField />) || (error && [<span>{errorLengthMessage}</span>, <span>{errorSpecialCharMessage}</span>])
            }
            size="small"
            onInput={(e) => {
                if (specialChars.test(e.target.value)) {
                    setErrorSpecialCharMessage("Wrong input only digits and Uppercase characters are allowed")
                    setError(true)
                }
                else {
                    setErrorSpecialCharMessage('')
                }
                if (e.target.value.length !== length) {
                    setError(true)
                    if (e.target.value.length < length) {
                        setErrorLengthMessage(`There are ${e.target.value.replace(/\s/g, '').length} characters - code should be ${length} characters`)
                    }
                    if (e.target.value.length > length) {
                        setErrorLengthMessage(`There are more than ${length} characters - code should be ${length} characters`)
                    }
                }
                else {
                    setErrorLengthMessage('')
                }
                setError(specialChars.test(e.target.value) || e.target.value.length < length)
                e.target.value = e.target.value.replace(`${specialChars}g`, '').toUpperCase().substring(0, length)
            }}
        />
    );
}
