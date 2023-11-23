import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FormProvider, useForm } from "react-hook-form";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Icon from "src/@core/components/icon";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import useEditarPropuestaMejora from "@/hooks/useEditarPropuestaMejora";

const validacionSchema = yup.object().shape({
  nombre: yup.string().required("La propuestas es requerida"),
  propuesta: yup.string().required("La descripción es requerido"),
});

const ModalPropuestasMejoras = ({ open, handleClose, data, onSubmit, ver = null }) => {

  const loadingNuevaPropuesta = useSelector((store) => store.propuesta.loadingNuevaPropuesta);

  const editarPropuestaMejora = useEditarPropuestaMejora()

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      nombre: null,
      propuesta: null,
    },
    resolver: yupResolver(validacionSchema),
  });

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, [data, setValue]);

  const cargar = (datos) => {
    onSubmit(datos);
  };
  const editar = (datos) => {
    editarPropuestaMejora(datos);
  };

  if (open) {
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
            <DialogTitle id="responsive-dialog-title">
              {ver === "verDatos" ? "Propuesta o Mejora" : "Nueva propuesta o mejora"}
            </DialogTitle>
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
                <Grid item xs={12}>
                  <CustomTextField Component={TextField} rows={3} type="text" label="Propuesta" name="nombre" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    multiline={true}
                    rows={4}
                    type="text"
                    label="Descripción"
                    name="propuesta"
                  />
                </Grid>
              </Grid>
            </FormProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
            <Button
              type="button"
              onClick={handleSubmit(ver === "verDatos" ? editar : cargar)}
              variant="contained"
              disabled={loadingNuevaPropuesta === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Guardar"}
              {loadingNuevaPropuesta === "LOADING" && (
                <CircularProgress
                  size={27}
                  sx={{
                    color: "#fff",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
  } else {
    return null;
  }
};
export default ModalPropuestasMejoras;
