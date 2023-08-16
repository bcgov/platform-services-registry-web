import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import RequiredField from "../common/RequiredField";

export default function AccountCodingField({
    formik,
    value,
    isDisabled,
    placeholder,
    title,
    length,
    id,
    handleChange
}) {
    const [errorLengthMessage, setErrorLengthMessage] = useState('');
    const [errorSpecialCharMessage, setErrorSpecialCharMessage] = useState('');
    const [error, setError] = useState(false);

    const hasSpecialCharacters = (str) => {
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        return specialChars.test(str);
    }

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
                (formik.touched.accountCoding && <RequiredField />) || (error && [<p>{errorLengthMessage}</p>, <p>{errorSpecialCharMessage}</p>])
            }
            size="small"
            onInput={(e) => {
                if (hasSpecialCharacters(e.target.value)) {
                    setErrorSpecialCharMessage("Wrong input only digits and Uppercase characters are allowed")
                }
                else if (e.target.value.length !== length) {
                    if (e.target.value.length < length) {
                        setErrorLengthMessage(`There are ${e.target.value.replace(/\s/g, '').length} characters - code should be ${length} characters`)
                        setError(true)
                    }
                    if (e.target.value.length > length) {
                        setErrorLengthMessage(`There are more than ${length} characters - code should be ${length} characters`)
                    }
                }
                else {
                    setError(false)
                    setErrorLengthMessage('')
                    setErrorSpecialCharMessage('')
                }
                e.target.value = e.target.value.replace(/[@#$%^&*()_+[\]{}|\\,.?:;'"!<>~`\-=/\s]/g, '').toUpperCase().substring(0, length)
            }}
        />
    );
}
