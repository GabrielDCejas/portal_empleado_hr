import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import { useEffect, useState } from "react";
import Icon from "src/@core/components/icon";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import { useSelector } from "react-redux";
import useGetIdiomas from "@/hooks/useGetIdiomas";
import useEditarIdioma from "@/hooks/useEditarIdioma";

const validacionSchema = yup.object().shape({
  idiomaSelect: yup.object({ value: yup.string().required("La Universidad es requerido") }),
});

const hablaOpciones = [
  { value: false, label: "No" },
  { value: true, label: "Si" },
];
const escribeOpciones = [
  { value: false, label: "No" },
  { value: true, label: "Si" },
];
const leeOpciones = [
  { value: false, label: "No" },
  { value: true, label: "Si" },
];
const nivelOpciones = [
  { value: 100000003, label: "A1" },
  { value: 100000000, label: "A2" },
  { value: 100000001, label: "B1" },
  { value: 100000002, label: "B2" },
  { value: 100000004, label: "C1" },
  { value: 100000005, label: "C2" },
];

const ModalIdioma = ({ open, handleClose, data, onSubmit, ver = null }) => {
  const resultadoNuevoIdioma = useSelector((store) => store.empleado.resultadoNuevoIdioma);
  const resultadoEditarIdioma = useSelector((store) => store.empleado.resultadoEditarIdioma);

  const { idiomas } = useGetIdiomas();
  const editarIdioma = useEditarIdioma();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      idiomaSelect: null,
      hablaSelect: null,
      leeSelect: null,
      escribeSelect: null,
      nivelSelect: null,
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
    editarIdioma(datos);
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
              {ver === "verDatos" ? data?.idioma : "Nuevo Idioma por Empleado"}
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
                    options={idiomas}
                    req="true"
                    type="text"
                    name="idiomaSelect"
                    lab="Idioma"
                    helperText={"El Idioma es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={hablaOpciones} type="text" name="hablaSelect" lab="Habla" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={escribeOpciones} type="text" name="escribeSelect" lab="Escribe" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={leeOpciones} type="text" name="leeSelect" lab="Lee" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={nivelOpciones} type="text" name="nivelSelect" lab="Nivel" />
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
              disabled={resultadoEditarIdioma === "LOADING" || resultadoNuevoIdioma === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Enviar"}
              {resultadoEditarIdioma === "LOADING" ||
                (resultadoNuevoIdioma === "LOADING" && (
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
export default ModalIdioma;
