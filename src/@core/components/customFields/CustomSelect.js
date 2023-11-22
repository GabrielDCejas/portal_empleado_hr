import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import Select from '@mui/material/Select';
import {
    Controller,
    useFormState
} from 'react-hook-form'

const CustomSelect = ({ name, label, value, helperText, options, rules, variant = "outlined", required, ...restProps }) => {
    const formState = useFormState()

    return (
        <Controller
            name={name} 
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <FormControl required={required} variant={variant} fullWidth margin="normal" error={Boolean(formState.errors && formState.errors[name])}>
                    <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        value={value}
                        error={Boolean(formState.errors && formState.errors[name])}
                        label={label}
                        onChange={onChange}
                        onBlur={onBlur}
                        fullWidth
                        
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{formState.errors[name] ? helperText : null}</FormHelperText>
                </FormControl>
            )}
            rules={rules}
            {...restProps}
        />
    )
}

export default CustomSelect