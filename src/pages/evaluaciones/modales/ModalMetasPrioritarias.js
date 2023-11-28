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
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import useGetCompetencias from "@/hooks/useGetCompetencias";
import useGetPlanSucesion from "@/hooks/useGetPlanSucesion";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import useEditarMetaPrioritaria from "@/hooks/useEditarMetaPrioritaria";

const validacionSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es requerido"),
  tipo_accion: yup.object({
    value: yup.string().required("Tipo de acción es requerido"),
  }),
  evidencia: yup.string().required("La evidencia es requerido"),
  fecha_desde: yup.string().required("La fecha desde es requerida"),
  fecha_hasta: yup.string().required("La fecha hasta es requerida"),
});

const opcionesRazonEstado = [
  { value: 1, label: "Sin Iniciar" },
  { value: 100000000, label: "En Proceso" },
  { value: 100000001, label: "Logrado" },
  { value: 100000002, label: "Cancelado" },
];

const opcionesTipoAccion = [
  { value: 100000000, label: "Actividad Formativa" },
  { value: 100000001, label: "Mejora de Procesos" },
  { value: 100000002, label: "Participación de Proyectos" },
  { value: 100000003, label: "Rotación de Puesto" },
  { value: 100000004, label: "Incorporación de Nuevas Rutinas de Trabajo" },
  { value: 100000005, label: "Otro" },
];

const ModalMetasPrioritarias = ({ open, handleClose, data, onSubmit, ver = null, liderId, evaluacionPgdId = null }) => {
  const { user } = useContext(AuthContext);

  const editarMetasPrioritaria = useEditarMetaPrioritaria();

  const resultadoCargarMetaPrioritaria = useSelector((store) => store.evaluaciones.resultadoCargarMetaPrioritaria);
  const loadingEditarCargarMetaPrioritaria = useSelector((store) => store.evaluaciones.loadingEditarCargarMetaPrioritaria);

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      nombre: null,
      tipo_accion: null,
      accion: null,
      evidencia: null,
      razon_estado_label: null,
      fecha_desde: null,
      fechas_hasta: null,
      comentarios_observaciones: null,
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
    editarMetasPrioritaria(datos, evaluacionPgdId);
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
              {ver === "verDatos" ? "Meta Prioritaria" : "Crear Meta Prioritaria"}
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
                    label="Meta prioritaria ¿Qué busco lograr?"
                    name="nombre"
                    helperText="La Meta prioritaria es requerido"
                    rules={{ required: "Required!" }}
                    req="true"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={opcionesTipoAccion}
                    type="text"
                    name="tipo_accion"
                    lab="Tipo de Acción"
                    req="true"
                    helperText={"el Tipo de acción es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField Component={TextField} type="text" label="Acción" name="accion" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Evidencia"
                    name="evidencia"
                    helperText="La Evidencia es requerido"
                    rules={{ required: "Required!" }}
                    req="true"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={opcionesRazonEstado}
                    type="text"
                    name="razon_estado_label"
                    lab="Razón para el estado"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField
                    name="fecha_desde"
                    label="Fecha Desde"
                    rules={{ required: "Required!" }}
                    helperText="Por favor indica la fecha desde"
                    req={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField
                    name="fecha_hasta"
                    label="Fecha Hasta"
                    rules={{ required: "Required!" }}
                    helperText="Por favor indica la fecha hasta"
                    req={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    name="comentarios_observaciones"
                    label="Comentarios/Observaciones"
                    rows={3}
                    multiline={true}
                    readOnly={true}
                    iconoClose={true}
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
          {liderId == user?.empleadoid && (
            <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
              <Button
                type="button"
                onClick={handleSubmit(ver === "verDatos" ? editar : cargar)}
                variant="contained"
                disabled={resultadoCargarMetaPrioritaria === "LOADING" || loadingEditarCargarMetaPrioritaria === "LOADING"}
              >
                {ver === "verDatos" ? "Editar" : "Guardar"}
                {resultadoCargarMetaPrioritaria === "LOADING" ||
                  (loadingEditarCargarMetaPrioritaria === "LOADING" && (
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
export default ModalMetasPrioritarias;
