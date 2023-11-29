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
import { useContext, useEffect, useState } from "react";
import Icon from "src/@core/components/icon";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import { AuthContext } from "@/context/AuthContext";
import useGetPerpesctivaNegocios from "@/hooks/useGetPerpesctivaNegocios";
import useGetObjetivosEvaluacion from "@/hooks/useGetObjetivosEvaluacion";
import useEditarObjetivo from "@/hooks/useEditarObjetivo";

// const validacionSchema = yup.object().shape({
//   objetivo: yup.string().required("El objetivo es requerido"),
// });

const opcionesTipoobjetivo = [
  { value: 100000000, label: "Estrategicos" },
  { value: 100000001, label: "Gerencia/Sector" },
  { value: 100000002, label: "Individuales" },
];

const ModalObjetivos = ({ open, handleClose, data, onSubmit, ver = null, liderId, evaluacionPgdId = null }) => {
  const { user } = useContext(AuthContext);

  const editarObjetivo = useEditarObjetivo()

  const loadingCargarObjetivo = useSelector((store) => store.evaluaciones.loadingCargarObjetivo);
  const loadingEditarObjetivo = useSelector((store) => store.evaluaciones.loadingEditarObjetivo);

  const { perpectivaNegocios } = useGetPerpesctivaNegocios();
  const { objetivosEvaluacion } = useGetObjetivosEvaluacion();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      objetivo: null,
      tipoObjetivo: null,
      perspectivaNegocio: null,
      plazo: null,
      ponderacion_lider: null,
      fuenteMedicion: null,
      piso: null,
      target: null,
      techo: null,
      objetivoPrimario: null,
    },
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
    editarObjetivo(datos, evaluacionPgdId)
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
              {ver === "verDatos" ? "Objetivo" : "Creación Objetivo Evaluado"}
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
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    General
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Objetivo"
                    name="objetivo"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={objetivosEvaluacion}
                    type="text"
                    name="objetivoPrimario"
                    lab="Objetivo Primario"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={opcionesTipoobjetivo}
                    type="text"
                    name="tipoObjetivo"
                    lab="Tipo de objetivo"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={perpectivaNegocios}
                    type="text"
                    name="perspectivaNegocio"
                    lab="Perspectiva de Negocio"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField name="plazo" label="Plazo:" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    Analisis
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="number"
                    label="Ponderacion Lider"
                    name="ponderacion_lider"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField Component={TextField} type="text" label="Fuente de Medicion" name="fuenteMedicion" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField Component={TextField} type="text" label="Piso" name="piso" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField Component={TextField} type="text" label="Target" name="target" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField Component={TextField} type="text" label="Techo" name="techo" />
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
          {liderId == user?.empleadoid && (
            <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
              <Button
                type="button"
                onClick={handleSubmit(ver === "verDatos" ? editar : cargar)}
                variant="contained"
                disabled={loadingCargarObjetivo === "LOADING" || loadingEditarObjetivo === "LOADING"}
              >
                {ver === "verDatos" ? "Editar" : "Guardar"}
                {loadingCargarObjetivo === "LOADING" ||
                  (loadingEditarObjetivo === "LOADING" && (
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
                  ))}
              </Button>
            </Box>
          )}
        </DialogActions>
      </Dialog>
    );
  } else {
    return null;
  }
};
export default ModalObjetivos;
