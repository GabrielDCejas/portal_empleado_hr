import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FormProvider, useForm } from "react-hook-form";
import { AppBar, Box, Button, CircularProgress, Grid, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Icon from "src/@core/components/icon";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import { useSelector } from "react-redux";
import useGetEmpresas from "@/hooks/useGetEmpresas";
import useGetPuestos from "@/hooks/useGetPuestos";
import useEditarTrayectoria from "@/hooks/useEditarTrayectoria";

const validacionSchema = yup.object().shape({
  empresaSelect: yup.object({ value: yup.string().required("La Universidad es requerido") }),
  fechaDesdeModal: yup.string().required("La fecha desde es requerido"),
});

const trayectoriaEnCompania = [
  { value: false, label: "No" },
  { value: true, label: "Si" },
];

const ModalTrayectoria = ({ open, handleClose, data, onSubmit, ver = null }) => {
  const resultadoNuevaTrayectoria = useSelector((store) => store.empleado.resultadoNuevaTrayectoria);
  const resultadoEditarTrayectoria = useSelector((store) => store.empleado.resultadoEditarTrayectoria);

  const editarTrayectoria = useEditarTrayectoria();

  const { empresas } = useGetEmpresas();
  const { puestos } = useGetPuestos();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      empresaSelect: null,
      puestoSelect: null,
      trayectoriaCompaniaSelect: null,
      fechaDesdeModal: null,
      fechaHastaModal: null,
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
    editarTrayectoria(datos);
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
              {ver === "verDatos" ? data?.puesto : "Nueva Trayectoria por Empleado"}
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
                    options={empresas}
                    req="true"
                    type="text"
                    name="empresaSelect"
                    lab="Empresa"
                    helperText={"La Empresa es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={trayectoriaEnCompania}
                    type="text"
                    name="trayectoriaCompaniaSelect"
                    lab="Trayectoria en la Compania?"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect options={puestos} type="text" name="puestoSelect" lab="Puesto" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField
                    name="fechaDesdeModal"
                    label="Fecha Desde:"
                    rules={{ required: "Required!" }}
                    helperText="Por favor indica la fecha desde"
                    req={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField
                    name="fechaHastaModal"
                    label="Fecha Hasta:"
                    rules={{ required: "Required!" }}
                    helperText="Por favor indica la fecha hasta"
                    req={true}
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
              disabled={resultadoNuevaTrayectoria === "LOADING" || resultadoEditarTrayectoria === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Enviar"}
              {resultadoNuevaTrayectoria === "LOADING" ||
                (resultadoEditarTrayectoria === "LOADING" && (
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

export default ModalTrayectoria;
