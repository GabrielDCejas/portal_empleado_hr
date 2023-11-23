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
import useGetProyectos from "@/hooks/useGetProyectos";
import useGetRolProyecto from "@/hooks/useGetRolProyecto";
import useRolPeriodos from "@/hooks/useRolPeriodos";
import useEditarAsignacion from "@/hooks/useEditarAsignacion";
import { AuthContext } from "@/context/AuthContext";

const validacionSchema = yup.object().shape({
  nombre: yup.string().required("La tarea es requerida"),
  proyectoSelect: yup.object({
    value: yup.string().required("El proyecto es requerido"),
  }),
  cantidadHoras: yup.string().required("La cantidad de horas es requerida"),
  periodoSelect: yup.object({
    value: yup.string().required("El periodo es requerido"),
  }),
});

const estadoOpciones = [
  { value: 1, label: "Pendiente" },
  { value: 100000000, label: "Finalizado el Desarrollo" },
  { value: 100000001, label: "Finalizado el QA" },
  { value: 100000002, label: "Finalizado implementación clientes" },
  { value: 100000003, label: "En análisis/documentación" },
  { value: 100000004, label: "Finalizado análisis/documentación" },
  { value: 100000005, label: "En revisión/estimación" },
  { value: 100000006, label: "Finalizado revisión/estimación" },
  { value: 100000007, label: "En desarrollo" },
  { value: 100000008, label: "En implementación a QA" },
  { value: 100000009, label: "Finalizado implementación a QA" },
  { value: 100000010, label: "En QA" },
  { value: 100000011, label: "En implementación clientes" },
];

const ModalAsignaciones = ({ open, handleClose, data, onSubmit, ver = null }) => {
  const { user } = useContext(AuthContext);

  const resultadoEditarAsignaciones = useSelector((store) => store.asignaciones.resultadoEditarAsignaciones);
  const resultadoNuevaAsignaciones = useSelector((store) => store.asignaciones.resultadoNuevaAsignaciones);

  const { proyectos } = useGetProyectos();
  const { rolProyectos } = useGetRolProyecto();
  const { periodos } = useRolPeriodos();

  const editarAsignacion = useEditarAsignacion();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      nombre: null,
      solucionPartir: null,
      proyectoSelect: null,
      rolDeProyecto: null,
      tarifa: null,
      cantidadHoras: null,
      periodoSelect: null,
      estadoSelect: null,
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
    editarAsignacion(datos);
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
              {ver === "verDatos" ? "Asignación" : "Nueva Asignación"}
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
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Tarea"
                    name="nombre"
                    req={true}
                    helperText={"La Tarea es requerida"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Solución de la cual partir"
                    name="solucionPartir"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={proyectos}
                    type="text"
                    req={true}
                    name="proyectoSelect"
                    lab="Proyecto"
                    helperText={"El proyecto es requerida"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={rolProyectos}
                    type="text"
                    name="rolDeProyecto"
                    lab="Rol en el Proyecto"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField Component={TextField} type="number" label="Tarifa" name="tarifa" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="number"
                    label="Cantidad de Horas"
                    name="cantidadHoras"
                    req={true}
                    helperText={"La cantidad de horas es requerida"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={periodos}
                    type="text"
                    req={true}
                    name="periodoSelect"
                    lab="Período"
                    helperText={"El periodo es requerida"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={estadoOpciones} type="text" name="estadoSelect" lab="Estado" />
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
              disabled={resultadoNuevaAsignaciones === "LOADING" || resultadoEditarAsignaciones === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Guardar"}
              {resultadoNuevaAsignaciones === "LOADING" ||
                (resultadoEditarAsignaciones === "LOADING" && (
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
export default ModalAsignaciones;
