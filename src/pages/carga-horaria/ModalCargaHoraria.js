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
import useGetProyectos from "@/hooks/useGetProyectos";
import useGetAsignaciones from "@/hooks/useGetAsignaciones";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import useEditarCargaHoraria from "@/hooks/useEditarCargaHoraria";

const validacionSchema = yup.object().shape({
  proyectoSelect: yup.object({
    value: yup.string().required("El proyecto es requerido"),
  }),
  asignacionSelect: yup.object({
    value: yup.string().required("La asignacion es requerido"),
  }),
  fechaDeCargaModal: yup.string().required("La fecha de carga es requerida"),
  horas: yup.string().required("La carga de horas es requerido"),
  descripcion: yup.string().required("La carga de horas es requerido"),
});

const facturableOpciones = [
  { value: true, label: "Si" },
  { value: false, label: "No" },
];

const ModalCargaHoraria = ({ open, handleClose, data, onSubmit, ver = null }) => {
  const resultadoEditarCargaHoraria = useSelector((store) => store.horas.resultadoEditarCargaHoraria);
  const resultadoNuevaCargaHoraria = useSelector((store) => store.horas.resultadoNuevaCargaHoraria);

  const editarCargaHoraria = useEditarCargaHoraria();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");
  const [asignacionesFiltro, setAsignacionesFiltro] = useState([]);
  const [asignacionesF, setAsignacionesF] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const { proyectos } = useGetProyectos();
  const { asignaciones } = useGetAsignaciones();

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      proyectoSelect: null,
      asignacionSelect: null,
      fechaDeCargaModal: null,
      horas: null,
      facturableSelect: null,
      propietario: null,
      descripcion: null,
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

  useEffect(() => {
    if (asignacionesFiltro?.length > 0) {
      const asignaciones = [];
      asignacionesFiltro.forEach((items) => {
        let item = {
          value: items.id,
          label: items.nombre,
          idProyecto: items.proyectoSelect.value,
        };
        asignaciones.push(item);
      });
      setAsignacionesF(asignaciones);
    }
  }, [asignacionesFiltro]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      handleProyectoChange(data?.proyectoSelect);
    }
  }, [data]);

  let valueProyecto = watch("proyectoSelect");

  useEffect(() => {
    if (valueProyecto && Object.keys(valueProyecto).length == 0) {
      setValue("asignacionSelect", null);
    }
  }, [valueProyecto]);

  const handleProyectoChange = (selectedOption) => {
    setProyectoSeleccionado(Boolean(!selectedOption));
    setAsignacionesF([]);
    const filteredAsignaciones = asignaciones.filter((asignacion) => asignacion?.asignacion === selectedOption?.value);
    setAsignacionesFiltro(filteredAsignaciones);
  };

  const handleProyecto = () => {
    setValue("asignacionSelect", null);
  }

  const cargar = (datos) => {
    onSubmit(datos);
  };
  const editar = (datos) => {
    editarCargaHoraria(datos);
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
              {ver === "verDatos" ? data?.proyecto : "Nuevo Carga Horaria"}
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
                    options={proyectos}
                    req="true"
                    type="text"
                    name="proyectoSelect"
                    lab="Proyecto"
                    handleChange={handleProyectoChange}
                    onClick={handleProyecto}
                    helperText={"El proyecto es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={asignacionesF}
                    req="true"
                    type="text"
                    name="asignacionSelect"
                    lab="Asignación"
                    helperText={"La asignacion es requerido"}
                    disabled={proyectoSeleccionado}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField
                    name="fechaDeCargaModal"
                    label="Fecha de Carga:"
                    rules={{ required: "Required!" }}
                    helperText="Por favor indica la fecha de Carga"
                    req={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="number"
                    label="Horas"
                    name="horas"
                    helperText="La carga de horas es requerido"
                    rules={{ required: "Required!" }}
                    req="true"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={facturableOpciones}
                    type="text"
                    name="facturableSelect"
                    lab="Facturable"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Empleado"
                    name="empleado"
                    readOnly={true}
                    iconoClose={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    Component={TextField}
                    type="text"
                    label="Descripción"
                    name="descripcion"
                    helperText="La descripción es requerido"
                    rules={{ required: "Required!" }}
                    req="true"
                    multiline={true}
                    rows="4"
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
              disabled={resultadoNuevaCargaHoraria === "LOADING" || resultadoEditarCargaHoraria === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Guardar"}
              {resultadoNuevaCargaHoraria === "LOADING" ||
                (resultadoEditarCargaHoraria === "LOADING" && (
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
export default ModalCargaHoraria;
