import { InputAdornment } from "@mui/material";
import React from "react";
import { Controller, useFormState } from "react-hook-form";
import Icon from 'src/@core/components/icon'

const CustomTextField = ({
  name,
  label,
  Component,
  rules,
  helperText,
  type,
  req,
  rows = 1,
  readOnly = false,
  endAdornment,
  disabled = false,
  inputLabelProps = true,
  iconoClose = false,
  ...restProps
}) => {
  const formState = useFormState();

  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Component
          margin="normal"
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          rows={rows}
          ref={ref}
          error={Boolean(formState.errors && formState.errors[name])}
          helperText={formState.errors[name] ? helperText : null}
          label={label}
          variant="outlined"
          fullWidth
          required={req}
          multiline={restProps.multiline}
          disabled={disabled}
          {...restProps}
          InputProps={{
            readOnly: readOnly,
            endAdornment,
            endAdornment: (
              <InputAdornment position="end">
                {iconoClose && <Icon icon='clarity:lock-solid'/>}
              </InputAdornment>
            ),
          }}
          
          InputLabelProps={{ shrink: inputLabelProps }}
        />
      )}
      rules={rules}
    />
  );
};

export default CustomTextField;
