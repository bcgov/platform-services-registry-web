import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { width } from "@mui/system";



export default function CustomController({ name, control, setFormEditedState, errors,  setValue, check, width='100%', multiline=false,
    rows=1 }) {

    return (
        <div style={width={width}}>
        <Controller        
            name={name}
            control={control}
            render={({ field }) => <TextField
                {...field}
                sx={{ mt: 4 }}
                style={{width: '100%'}}
                required
                label={name.charAt(0).toUpperCase() + name.slice(1)}
                size="small"
                multiline={multiline}
                rows={rows}
                error={!!(errors[`${name}required`] ||
                    errors[`${name}maxLength`] ||
                    errors[`${name}pattern`] 
                )}
                helperText={(errors[`${name}required`] && errors[`${name}required`].message) ||
                (errors[`${name}maxLength`] && errors[`${name}maxLength`].message) ||
                (errors[`${name}pattern`] && errors[`${name}pattern`].message) }
                onChange={e => {
                    check(e.target.value)
                    setValue(field.name, e.target.value)
                    setFormEditedState(e.target.value)
                }}
            />}
        />
        </div>
    );
}