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
import useEditarCuentaBancaria from "@/hooks/useEditarCuentaBancaria";
import useGetBancos from "@/hooks/useGetBancos";
import useGetDivisas from "@/hooks/useGetDivisas";

const validacionSchema = yup.object().shape({
  bancoSelect: yup.object({ value: yup.string().required("El banco es requerido") }),
  divisaSelect: yup.object({ value: yup.string().required("La divisa es requerido") }),
  tipoDeCuentaSelect: yup.object({ value: yup.string().required("El tipo de cuenta es requerido") }),
  numeroDeCuenta: yup.string().required("El numero de cuenta es requerido"),
  cbu: yup.string().required("El CBU de cuenta es requerido"),
});

const tipoCuentaOpciones = [
  { value: 100000000, label: "Cuenta Corriente" },
  { value: 100000001, label: "Caja de Ahorro" },
  { value: 100000001, label: "Otra" },
];

const ModalCuentaBancaria = ({ open, handleClose, data, onSubmit, ver = null }) => {
  const resultadoEditarCuentaBancaria = useSelector((store) => store.empleado.resultadoEditarCuentaBancaria);
  const resultadoNuevaCuentaBancaria = useSelector((store) => store.empleado.resultadoNuevaCuentaBancaria);

  const {bancos} = useGetBancos()
  const {divisas} = useGetDivisas()

  const editarCuentaBancaria = useEditarCuentaBancaria();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      bancoSelect: null,
      divisaSelect: null,
      tipoDeCuentaSelect: null,
      numeroDeCuenta: null,
      cbu: null,
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
    editarCuentaBancaria(datos);
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
              {ver === "verDatos" ? data?.tipoDeCuenta : "Nuevo cuenta bancaria"}
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
                    options={bancos}
                    req="true"
                    type="text"
                    name="bancoSelect"
                    lab="Banco"
                    helperText={"El banco es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={divisas}
                    req="true"
                    type="text"
                    name="divisaSelect"
                    lab="Divisa"
                    helperText={"La divisa es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={tipoCuentaOpciones}
                    req="true"
                    type="text"
                    name="tipoDeCuentaSelect"
                    lab="Tipo de Cuenta"
                    helperText={"El tipo de cuenta es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    req="true"
                    type="text"
                    label="Numero de Cuenta"
                    name="numeroDeCuenta"
                    helperText={"El numero de cuenta es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    req="true"
                    type="number"
                    label="CBU"
                    name="cbu"
                    helperText={"El CBU es requerido"}
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
              disabled={resultadoNuevaCuentaBancaria === "LOADING" || resultadoEditarCuentaBancaria === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Enviar"}
              {resultadoNuevaCuentaBancaria === "LOADING" ||
                (resultadoEditarCuentaBancaria === "LOADING" && (
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
export default ModalCuentaBancaria;
