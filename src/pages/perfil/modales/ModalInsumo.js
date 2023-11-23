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
import { useSelector } from "react-redux";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import useEditarInsumo from "@/hooks/useEditarInsumo";

const validacionSchema = yup.object().shape({
  tipoInsumoSelect: yup.object({ value: yup.string().required("El tipo de insumo es requerido") }),
  marcaSelect: yup.object({ value: yup.string().required("La marca es requerido") }),
});

const tipoInsumoOpciones = [
  { value: 100000002, label: "Teléfono Celular" },
  { value: 100000003, label: "Notebook" },
  { value: 100000004, label: "Tablet" },
  { value: 100000005, label: "Otro" },
];
const tipoMarcaOpciones = [
  { value: 100000000, label: "Alcatel" },
  { value: 100000001, label: "Otra" },
  { value: 100000002, label: "HP" },
  { value: 100000003, label: "Lenovo" },
  { value: 100000004, label: "Acer" },
  { value: 100000005, label: "Dell" },
  { value: 100000006, label: "Asus" },
  { value: 100000007, label: "Toshiba" },
  { value: 100000008, label: "Samsung" },
  { value: 100000009, label: "Motorola" },
  { value: 100000010, label: "TCL" },
  { value: 100000011, label: "Xiaomi" },
  { value: 100000012, label: "Iphone" },
  { value: 100000013, label: "Sony" },
  { value: 100000014, label: "LG" },
];
const tipoModeloOpciones = [
  { value: 100000000, label: "2010" },
  { value: 100000001, label: "2011" },
  { value: 100000002, label: "2012" },
  { value: 100000003, label: "2013" },
  { value: 100000004, label: "2014" },
  { value: 100000005, label: "2015" },
  { value: 100000006, label: "2016" },
  { value: 100000007, label: "2017" },
  { value: 100000008, label: "2018" },
  { value: 100000009, label: "2019" },
  { value: 100000010, label: "2020" },
  { value: 100000011, label: "2021" },
  { value: 100000012, label: "2022" },
  { value: 100000013, label: "2023" },
  { value: 100000014, label: "2024" },
];
const estadoOpciones = [
  { value: 1, label: "Pendiente de Entrega" },
  { value: 100000000, label: "Entregado" },
  { value: 100000001, label: "Activo" },
];

const ModalInsumo = ({ open, handleClose, data, onSubmit, ver = null }) => {
  const resultadoEditarInsumo = useSelector((store) => store.empleado.resultadoEditarInsumo);
  const resultadoNuevoInsumo = useSelector((store) => store.empleado.resultadoNuevoInsumo);

  const editarInsumo = useEditarInsumo();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      tipoInsumoSelect: null,
      marcaSelect: null,
      modeloSelect: null,
      estadoSelect: null,
      observaciones: null,
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
    editarInsumo(datos);
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
              {ver === "verDatos" ? data?.tipoInsumo : "Nuevo Familiar"}
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
                    options={tipoInsumoOpciones}
                    req="true"
                    type="text"
                    name="tipoInsumoSelect"
                    lab="Tipo de Insumo"
                    helperText={"El tipo de insumo es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={tipoMarcaOpciones}
                    req="true"
                    type="text"
                    name="marcaSelect"
                    lab="Marca"
                    helperText={"La marca es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={tipoModeloOpciones} type="text" name="modeloSelect" lab="Modelo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={estadoOpciones} type="text" name="estadoSelect" lab="Estado" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    multiline={true}
                    rows={3}
                    type="text"
                    label="Observaciones"
                    name="observaciones"
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
              disabled={resultadoNuevoInsumo === "LOADING" || resultadoEditarInsumo === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Guardar"}
              {resultadoNuevoInsumo === "LOADING" ||
                (resultadoEditarInsumo === "LOADING" && (
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
export default ModalInsumo;
