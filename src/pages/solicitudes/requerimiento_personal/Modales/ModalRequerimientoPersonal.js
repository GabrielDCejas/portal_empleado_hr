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
  Divider,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Icon from "src/@core/components/icon";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import useGetEmpleados from "@/hooks/useGetEmpleados";
import useGetClientes from "@/hooks/useGetClientes";
import useGetPuestos from "@/hooks/useGetPuestos";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import useGetProyectos from "@/hooks/useGetProyectos";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import useGetSolicitudPuestoNuevo from "@/hooks/useGetSolicitudPuestoNuevo";
import useEditarRequerimiento from "@/hooks/useEditarRequerimiento";

const opcionesPrioridad = [
  { value: 100000000, label: "Urgente" },
  { value: 100000001, label: "Alta" },
  { value: 100000002, label: "Media" },
  { value: 100000003, label: "Baja" },
];
const opcionesModalidadContratacion = [
  { value: 100000000, label: "Freelance" },
  { value: 100000001, label: "Relación de dependencia" },
  { value: 100000002, label: "Ambas" },
];
const opcionesJornadaTrabajo = [
  { value: 100000000, label: "Part Time" },
  { value: 100000001, label: "Full Time" },
];
const opcionesAprobacion = [
  { value: 100000000, label: "Si" },
  { value: 100000001, label: "No" },
];

const ModalRequerimientoPersonal = ({ open, handleClose, data, onSubmit, ver = null }) => {

  const { user } = useContext(AuthContext);

  const editarRequerimiento = useEditarRequerimiento()

  const loadingCargarRequerimiento = useSelector((store) => store.solicitudes.loadingCargarRequerimiento);
  const loadingEditarRequerimiento = useSelector((store) => store.solicitudes.loadingEditarRequerimiento);

  const { empleados } = useGetEmpleados();
  const { puestos } = useGetPuestos();
  const { solicitudPuestoNuevo } = useGetSolicitudPuestoNuevo();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      empleado: null,
      prioridad: null,
      puestoSelect: null,
      perfil: null,
      vacante: null,
      cantidad_mensuales: null,
      modalidad_contratacion: null,
      duracion_contratacion_meses: null,
      jornada_trabajo: null,
      fecha_inicio_contratacion: null,
      descripcion_proyecto: null,
      requerimientos_perfil_contratar: null,
      condiciones_especiales_seguro_accidentes: null,
      beneficios_dicionales: null,
      comentarios_generales: null,
      solicitud_nuevo_puesto: null,
      aprobador: null,
      aprobacion: null,
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
    editarRequerimiento(datos)
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
            <DialogTitle id="responsive-dialog-title">Requerimiento de personal</DialogTitle>
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
                <Grid item xs={12} sm={4}>
                  <CustomSearchSelect options={opcionesPrioridad} type="text" name="prioridad" lab="Prioridad" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomSearchSelect options={puestos} type="text" name="puestoSelect" lab="Puesto" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField Component={TextField} type="text" label="Nombre de la Búsqueda" name="perfil" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField Component={TextField} type="number" label="Vacante" name="vacante" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    Component={TextField}
                    type="number"
                    label="Cantidad de Horas Mensuales"
                    name="cantidad_mensuales"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomSearchSelect
                    options={opcionesModalidadContratacion}
                    type="text"
                    name="modalidad_contratacion"
                    lab="Modalidad de Contratación"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Duración de la Contratación (Meses)"
                    name="duracion_contratacion_meses"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomSearchSelect
                    options={opcionesJornadaTrabajo}
                    type="text"
                    lab="Jornada de Trabajo"
                    name="jornada_trabajo"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomDateField name="fecha_inicio_contratacion" label="Fecha Ideal de Inicio de Contratación:" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Razón para el estado"
                    name="razon_estado"
                    disabled={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Descripción Proyecto"
                    name="descripcion_proyecto"
                    rows={3}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Requerimientos del Perfil a Contratar"
                    name="requerimientos_perfil_contratar"
                    rows={3}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Condiciones Especiales de Seguro de Accidentes"
                    name="condiciones_especiales_seguro_accidentes"
                    rows={3}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Beneficios Adicionales"
                    name="beneficios_dicionales"
                    rows={3}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Comentarios Generales"
                    name="comentarios_generales"
                    rows={3}
                    multiline={true}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Grid container sx={{ my: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    Si el puesto que esta requiriendo no existe por favor cargue una solicitud de puesto nuevo.
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <CustomSearchSelect
                    options={solicitudPuestoNuevo}
                    type="text"
                    lab="Solicitud de Puesto Nuevo"
                    name="solicitud_nuevo_puesto"
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Grid container sx={{ my: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    Aprobación del Requerimiento
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item lg={6}>
                  <CustomSearchSelect options={opcionesAprobacion} type="text" lab="Aprobación" name="aprobacion" />
                </Grid>
                <Grid item lg={6}>
                  <CustomSearchSelect options={empleados} type="text" lab="Aprobador" name="aprobador" />
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
              disabled={loadingCargarRequerimiento === "LOADING" || loadingEditarRequerimiento === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Guardar"}
              {loadingCargarRequerimiento === "LOADING" ||
                (loadingEditarRequerimiento === "LOADING" && (
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
        </DialogActions>
      </Dialog>
    );
  } else {
    return null;
  }
};
export default ModalRequerimientoPersonal;
