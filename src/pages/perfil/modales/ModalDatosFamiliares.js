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
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import { useSelector } from "react-redux";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import useGetParentescos from "@/hooks/useGetParentescos";
import useEditarDatosFamiliares from "@/hooks/useEditarDatosFamiliares";

const validacionSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es requerida"),
  apellido: yup.string().required("El nombre es requerida"),
  parentescoSelect: yup.object({ value: yup.string().required("El parentesco es requerido") }),
});

const tipoDocumentoOpciones = [
  { value: 100000000, label: "D.N.I." },
  { value: 100000001, label: "L.C." },
  { value: 100000002, label: "L.E." },
  { value: 100000003, label: "D.E." },
  { value: 100000004, label: "Pasaporte" },
];
const ocupacionOpciones = [
  { value: 100000000, label: "Ama de Casa" },
  { value: 2, label: "Empleado" },
  { value: 100000002, label: "Profesional" },
  { value: 1, label: "Estudiante" },
  { value: 100000001, label: "Otro" },
];
const generoOpciones = [
  { value: 100000000, label: "Masculino" },
  { value: 100000001, label: "Femenino" },
];

const ModalDatosFamiliares = ({ open, handleClose, data, onSubmit, ver = null }) => {
    
  const resultadoEditarFamiliar = useSelector((store) => store.empleado.resultadoEditarFamiliar);
  const resultadoNuevoFamiliar = useSelector((store) => store.empleado.resultadoNuevoFamiliar);

  const { parentescos } = useGetParentescos();
  const editarDatosFamiliares = useEditarDatosFamiliares();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      tipoDocumentoSelect: null,
      numeroDocumento: null,
      nombre: null,
      apellido: null,
      fechaNacimientoModal: null,
      generoSelect: null,
      ocupacionSelect: null,
      parentescoSelect: null,
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
    editarDatosFamiliares(datos);
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
              {ver === "verDatos" ? data?.parentesco : "Nuevo Familiar"}
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
                    options={tipoDocumentoOpciones}
                    type="text"
                    name="tipoDocumentoSelect"
                    lab="Tipo Documento"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField Component={TextField} type="number" label="Nro. documento" name="numeroDocumento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    req="true"
                    label="Apellidos"
                    name="apellido"
                    helperText={"El apellido es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    req="true"
                    label="Nombre"
                    name="nombre"
                    helperText={"El nombre es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField name="fechaNacimientoModal" label="Fecha de nacimiento:" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={generoOpciones} type="text" name="generoSelect" lab="Género" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={ocupacionOpciones} type="text" name="ocupacionSelect" lab="Ocupacion" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={parentescos}
                    type="text"
                    name="parentescoSelect"
                    lab="Parentesco"
                    helperText={"El parentesco es requerido"}
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
              disabled={resultadoNuevoFamiliar === "LOADING" || resultadoEditarFamiliar === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Enviar"}
              {resultadoNuevoFamiliar === "LOADING" ||
                (resultadoEditarFamiliar === "LOADING" && (
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
export default ModalDatosFamiliares;
