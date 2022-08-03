import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";



export default function CustomController({ name, rules, control, setFormEditedState, formEditedState, setValue, defaultValue }) {
  
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => <TextField
                {...field}
                sx={{ mt: 4 }}
                required
                label={name.charAt(0).toUpperCase() + name.slice(1)}
                size="small"
                onChange={e => {
                    setValue(field.name, e.target.value);
                    setFormEditedState({ ...formEditedState, [field.name]: e.target.value })
                }}
            />}
        />
    );
}