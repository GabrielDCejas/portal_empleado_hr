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
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import { useEffect, useState } from "react";
import Icon from "src/@core/components/icon";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import { useSelector } from "react-redux";
import useGetUniversidades from "@/hooks/useGetUniversidades";
import useGetCarreras from "@/hooks/useGetCarreras";
import useEditarUniversidad from "@/hooks/useEditarUniversidad";

const validacionSchema = yup.object().shape({
  universidadSelet: yup.object({ value: yup.string().required("La Universidad es requerido") }),
  fechaIngresoSelect: yup.string().required("La fecha de ingreso es requerido"),
  tipoCarreraSelect: yup.object({ value: yup.string().required("El tipo de carrera es requerido") }),
});
const tipoCarreraOpciones = [
  { value: "100000000", label: "Terciario" },
  { value: "100000001", label: "Universitario" },
  { value: "100000002", label: "Posgrado" },
  { value: "100000003", label: "Master" },
  { value: "100000004", label: "Licenciatura" },
  { value: "100000005", label: "Carrera de Grado" },
];

const estadoUniversidadOpciones = [
  { value: 1, label: "En Curso" },
  { value: 100000000, label: "Completo" },
  { value: 100000001, label: "Abandonado" },
];

const ModalUniversidad = ({ open, handleClose, data, onSubmit, ver = null }) => {
  const editarUniversidad = useEditarUniversidad();

  const resultadoNuevaUniversidad = useSelector((store) => store.empleado.resultadoNuevaUniversidad);
  const resultadoEditarUniversidad = useSelector((store) => store.empleado.resultadoEditarUniversidad);

  const { universidades } = useGetUniversidades();
  const { carreras } = useGetCarreras();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      universidadSelet: null,
      carreraSelect: null,
      fechaIngresoSelect: null,
      fechaEgresoSelect: null,
      tipoCarreraSelect: null,
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

  const cargarUniversidad = (datos) => {
    onSubmit(datos);
  };
  const editar = (datos) => {
    editarUniversidad(datos);
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
              {ver === "verDatos" ? data?.carrera : "Nueva Universidad por Empleado"}
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
                  <CustomSearchSelect
                    options={universidades}
                    req="true"
                    type="text"
                    name="universidadSelet"
                    lab="Universidad"
                    helperText={"La Universidad es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={carreras} type="text" name="carreraSelect" lab="Carrera" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField
                    name="fechaIngresoSelect"
                    label="Fecha de ingreso:"
                    rules={{ required: "Required!" }}
                    helperText="Por favor indica la fecha de ingreso"
                    req={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField
                    name="fechaEgresoSelect"
                    label="Fecha de Egreso:"
                    rules={{ required: "Required!" }}
                    helperText="Por favor indica la fecha de ingreso"
                    req={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={tipoCarreraOpciones}
                    type="text"
                    name="tipoCarreraSelect"
                    lab="Tipo de Carrera"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={estadoUniversidadOpciones}
                    type="text"
                    name="estadoSelect"
                    lab="Estado"
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
              onClick={handleSubmit(ver === "verDatos" ? editar : cargarUniversidad)}
              variant="contained"
              disabled={resultadoNuevaUniversidad === "LOADING" || resultadoEditarUniversidad === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Enviar"}
              {resultadoNuevaUniversidad === "LOADING" ||
                (resultadoEditarUniversidad === "LOADING" && (
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
export default ModalUniversidad;
