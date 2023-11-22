import { FormHelperText } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import React, { useContext } from "react";
import { Controller, useFormState } from "react-hook-form";

const CustomSearchSelect = ({
  name,
  lab,
  value,
  helperText,
  rules,
  options,
  ultimaOpcion,
  handleChange = null,
  onClick= null,
  disabled = false,
  req = false,
  ...restProps
}) => {
  const formState = useFormState();
  const control = formState ? formState.control : null;
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref, ...field } }) => (
        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
          color="success"
          error={Boolean(formState.errors && formState.errors[name])}
        >
          <Autocomplete
            open={open}
            disabled={disabled}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            value={value || ""}
            loading={loading}
            loadingText="Cargando..."
            options={options}
            getOptionSelected={(option, value) => option.value === value}
            getOptionLabel={(option) => option.label || ""}
            onChange={(_, data) => {
              onChange(data);
              handleChange && handleChange(data);
            }}
            onBlur={onBlur}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label={lab}
                variant="outlined"
                error={Boolean(formState.errors && formState.errors[name])}
                required={req}
                onClick={onClick}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <FormHelperText>{formState.errors[name] ? helperText : null}</FormHelperText>
        </FormControl>
      )}
      rules={rules}
      {...restProps}
    />
  );
};

export default CustomSearchSelect;
