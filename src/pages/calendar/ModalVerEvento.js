import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FormProvider, useForm } from "react-hook-form";
import { AppBar, Grid, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import { useEffect, useState } from "react";
import Icon from "src/@core/components/icon";

const ModalVerEvento = ({ data, open, handleClose }) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");
  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      title: null,
      fechaDesdeModal: null,
      fechaHastaModal: null,
      licencia: null,
      tipoLicencia: null,
      cantidadDeHoras: null,
      tipoLicenciaSelect: null,
      horadesdeSelect: null,
      horaHastaSelect: null,
      comentarios: null,
      fechaDeSolicitud: null,
      estado: null,
    },
  });

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
    setValue("licencia", data?.licencia == "Vacaciones" ? "Vacaciones" : "Ausentismo");
  }, [data, setValue]);

  if (data) {
    return (
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DialogTitle id="responsive-dialog-title">{data?.title}</DialogTitle>
            <Tooltip title={<Typography sx={{ color: "#fff" }}>Cerrar</Typography>}>
              <IconButton edge="end" color="warning" onClick={handleClose} aria-label="close" sx={{ mr: 2 }}>
                <Icon color="red" icon="material-symbols:close" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
            <FormProvider {...methods}>
              <Grid container spacing="2">
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="licencia"
                    label="Licencia"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="tipoLicencia"
                    label="Tipo de Licencia"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="tipoLicencia"
                    label="Tipo de Licencia"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="cantidadDeHoras"
                    label="Cantidad Horas Licencia"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="estado"
                    label="Estado"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="fechaDesdeModal"
                    label="Fecha Desde:"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="fechaHastaModal"
                    label="Fecha Hasta:"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="horadesdeSelect"
                    label="Hora Desde:"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="horaHastaSelect"
                    label="Hora Hasta:"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="comentarios"
                    label="Comentarios"
                    multiline={true}
                    rows="4"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
              </Grid>
            </FormProvider>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  } else {
    return null;
  }
};
export default ModalVerEvento;
