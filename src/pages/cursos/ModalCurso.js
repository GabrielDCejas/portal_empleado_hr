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
  nombre: yup.string().required("El nombre es requerido"),
  accionModal: yup.object({
    value: yup.string().required("La accion es requerido"),
  }),
  duracionHoras: yup.string().required("La Duracion en horas es requerido"),
});

const accionOpciones = [
  { value: 100000000, label: "Capacitacion" },
  { value: 100000001, label: "Desarrollo" },
  { value: 100000002, label: "Evaluacion" },
  { value: 100000003, label: "Fidelizacion" },
  { value: 100000004, label: "Refuerzo" },
  { value: 100000008, label: "Opcional" },
];

const tipoOpciones = [
  { value: 1, label: "Si" },
  { value: 0, label: "No" },
];

const ModalCurso = ({ open, handleClose, data, onSubmit, ver = null }) => {
  const { user } = useContext(AuthContext);

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      nombre: null,
      accionModal: null,
      duracionHoras: null,
      elearningModal: null,
      internaModal: null,
      inCompanyModal: null,
      externaModal: null,
      objetivo: null,
      contenido: null,
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
  const editar = (datos) => {};

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
            <DialogTitle id="responsive-dialog-title">{ver === "verDatos" ? "Curso" : "Nueva Curso"}</DialogTitle>
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
                    req="true"
                    type="text"
                    label="Nombre"
                    name="nombre"
                    helperText={"El nombre es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={accionOpciones}
                    req="true"
                    type="text"
                    name="accionModal"
                    lab="Acción"
                    helperText={"La acción es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    req="true"
                    type="number"
                    label="Duracion (horas)"
                    name="duracionHoras"
                    helperText={"La Duracion en horas es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={tipoOpciones} type="text" name="elearningModal" lab="E-learning" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={tipoOpciones} type="text" name="internaModal" lab="Interna" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={tipoOpciones} type="text" name="inCompanyModal" lab="In Company" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={tipoOpciones} type="text" name="externaModal" lab="Externa" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    multiline={true}
                    rows={3}
                    type="text"
                    label="Objetivo"
                    name="objetivo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    multiline={true}
                    rows={5}
                    type="text"
                    label="Contenido"
                    name="contenido"
                  />
                </Grid>
              </Grid>
            </FormProvider>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {data?.empleadoId == user?.empleadoid && (
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
          )}
        </DialogActions> */}
      </Dialog>
    );
  } else {
    return null;
  }
};
export default ModalCurso;
