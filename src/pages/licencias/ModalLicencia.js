import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FormProvider, useForm } from "react-hook-form";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
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
import useGetTipoLicencia from "@/hooks/useGetTipoLicencia";
import useEditarLicencia from "@/hooks/useEditarLicencia";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import useGetVacaciones from "@/hooks/useGetVacaciones";

const tipoLicenciaOpciones = ["Ausentismo", "Vacaciones"];
const horasOpciones = [
  { value: "100000000", label: "08:00" },
  { value: "100000016", label: "08:30" },
  { value: "100000001", label: "09:00" },
  { value: "100000017", label: "09:30" },
  { value: "100000002", label: "10:00" },
  { value: "100000018", label: "10:30" },
  { value: "100000003", label: "11:00" },
  { value: "100000019", label: "11:30" },
  { value: "100000004", label: "12:00" },
  { value: "100000020", label: "12:30" },
  { value: "100000005", label: "13:00" },
  { value: "100000021", label: "13:30" },
  { value: "100000006", label: "14:00" },
  { value: "100000022", label: "14:30" },
  { value: "100000007", label: "15:00" },
  { value: "100000023", label: "15:30" },
  { value: "100000008", label: "16:00" },
  { value: "100000024", label: "16:30" },
  { value: "100000009", label: "17:00" },
  { value: "100000025", label: "17:30" },
  { value: "100000010", label: "18:00" },
  { value: "100000016", label: "18:30" },
  { value: "100000011", label: "19:00" },
  { value: "100000027", label: "19:30" },
  { value: "100000012", label: "20:00" },
];

const ModalLicencia = ({ open, handleClose, data, onSubmit, ver = null }) => {
  const resultadoEditarLicencias = useSelector((store) => store.licencias.resultadoEditarLicencias);
  const resultadoNuevaLicencias = useSelector((store) => store.licencias.resultadoNuevaLicencias);

  const editarLicencia = useEditarLicencia();
  const { tipoLicencia } = useGetTipoLicencia();
  const { vacaciones } = useGetVacaciones();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");
  const [valueLicencia, setValueLicencia] = useState( ver ? data?.licencia == "Vacaciones" ? data.licencia : "Ausentismo" : null);
  const [tipoDeLicencias, setTipoDeLicencias] = useState([]);
  const [licenciasFiltro, setLicenciasFiltro] = useState([]);
  const [licenciaSeleccionada, setLicenciaSeleccionada] = useState(false);
  const [validacionSchema, setValidacionSchema] = useState(null);

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      tipoLicenciaSelect: null,
      cantidadDeHoras: null,
      estado: null,
      horadesdeSelect: null,
      horaHastaSelect: null,
      fechaDesdeModal: null,
      fechaHastaModal: null,
      comentarios: null,
      fechaDeSolicitud: null,
      vacaciones: null,
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
    if (data && Object.keys(data).length > 0 && tipoLicencia?.length > 0) {
      handleLicenciaChange(data?.licencia == "Vacaciones" ? data.licencia : "Ausentismo");
    }
  }, [tipoLicencia, data]);

  const validacionSchemaVacaciones = yup.object().shape({
    tipoLicenciaSelect: yup.object({
      value: yup.string().required("El Tipo de Licencia es requerido"),
    }),
    fechaDesdeModal: yup.string().required("La fecha desde es requerida"),
    fechaHastaModal: yup.string().required("La fecha hasta es requerida"),
    fechaDeSolicitud: yup.string().required("La fecha de solicitud es requerida"),
    vacaciones: yup.object({
      value: yup.string().required("Vacaciones es requerido"),
    }),
  });

  const validacionSchemaNoVacaciones = yup.object().shape({
    tipoLicenciaSelect: yup.object({
      value: yup.string().required("El Tipo de Licencia es requerido"),
    }),
    fechaDesdeModal: yup.string().required("La fecha desde es requerida"),
    fechaHastaModal: yup.string().required("La fecha hasta es requerida"),
    horadesdeSelect: yup.object({
      value: yup.string().required("La hora desde es requerido"),
    }),
    horaHastaSelect: yup.object({
      value: yup.string().required("La hora hasta es requerido"),
    }),
    comentarios: yup.string().required("Los comentarios son requeridos"),
  });

  useEffect(() => {
    if (valueLicencia === "Vacaciones") {
      setValidacionSchema(validacionSchemaVacaciones);
    } else {
      setValidacionSchema(validacionSchemaNoVacaciones);
    }
    if(valueLicencia?.length == 0){
      setValue("tipoLicenciaSelect", null);
    }
  }, [valueLicencia]);

  useEffect(() => {
    if (licenciasFiltro?.length > 0) {
      const tipoDeLicencias = [];
      licenciasFiltro.forEach((items) => {
        let item = {
          value: items.value,
          label: items.label,
        };
        tipoDeLicencias.push(item);
      });
      setTipoDeLicencias(tipoDeLicencias);
    }
  }, [licenciasFiltro]);

  const handleLicenciaChange = (selectedOption) => {
    const filteredLicencia = tipoLicencia.filter((licencia) => licencia.label === selectedOption);
    const licencia = tipoLicencia.filter(
      (licencia) => licencia.label !== "Vacaciones" && licencia.label !== "Vacaciones Pendientes"
    );
    setLicenciasFiltro(selectedOption === "Vacaciones" ? filteredLicencia : licencia);
  };

  const cargar = (datos) => {
    onSubmit(datos);
  };
  const editar = (datos) => {
    editarLicencia(datos);
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
              {ver === "verDatos" ? data?.licencia : "Nuevo Licencia"}
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
                  <Autocomplete
                    sx={{ mt: 4 }}
                    value={valueLicencia}
                    onChange={(event, newValue) => {
                      setValueLicencia(newValue);
                      handleLicenciaChange(newValue);
                    }}
                    id="controllable-states-demo"
                    options={tipoLicenciaOpciones}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Licencia"
                        required={true}
                        error={Boolean(licenciaSeleccionada && valueLicencia === null)}
                      />
                    )}
                  />
                  <FormHelperText error>
                    {licenciaSeleccionada && valueLicencia === null ? "Selecciona una licencia" : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={tipoDeLicencias}
                    req={true}
                    type="text"
                    name="tipoLicenciaSelect"
                    lab="Tipo de Licencia"
                    helperText={"El Tipo de Licencia es requerido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {valueLicencia === "Vacaciones" ? (
                    <CustomDateField
                      name="fechaDeSolicitud"
                      label="Fecha de Solicitud:"
                      rules={{ required: "Required!" }}
                      helperText="Por favor indica la fecha de solicitud"
                      req={true}
                      posicion="bottom"
                    />
                  ) : (
                    <CustomTextField
                      Component={TextField}
                      type="number"
                      label="Cantidad Horas Licencia"
                      name="cantidadDeHoras"
                      req={true}
                      helperText={"La cantidad de horas es requerida"}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField Component={TextField} type="text" label="Estado" name="estado" readOnly={true} iconoClose={true}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField
                    name="fechaDesdeModal"
                    label="Fecha Desde:"
                    rules={{ required: "Required!" }}
                    helperText="Por favor indica la fecha de desde"
                    req={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDateField
                    name="fechaHastaModal"
                    label="Fecha Hasta:"
                    rules={{ required: "Required!" }}
                    helperText="Por favor indica la fecha de hasta"
                    req={true}
                  />
                </Grid>
                {valueLicencia === "Ausentismo" ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect
                        options={horasOpciones}
                        req={true}
                        type="text"
                        name="horadesdeSelect"
                        lab="Hora Desde"
                        helperText={"La hora desde es requerida"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect
                        options={horasOpciones}
                        req={true}
                        type="text"
                        name="horaHastaSelect"
                        lab="Hora Hasta"
                        helperText={"La hora desde es requerida"}
                      />
                    </Grid>
                  </>
                ) : null}
                {valueLicencia === "Ausentismo" ? (
                  <Grid item xs={12}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      label="Comentarios"
                      name="comentarios"
                      helperText="Los comentarios son requeridos"
                      req="true"
                      multiline={true}
                      rows="4"
                    />
                  </Grid>
                ) : null}
                {valueLicencia === "Vacaciones" ? (
                  <Grid item xs={12} sm={6}>
                    <CustomSearchSelect
                      options={vacaciones}
                      req={true}
                      type="text"
                      name="vacaciones"
                      lab="Vacaciones"
                      helperText={"La vacacion es requerida"}
                    />
                  </Grid>
                ) : null}
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
              onClick={() => {
                handleSubmit(ver === "verDatos" ? editar : cargar)();
                setLicenciaSeleccionada(true);
              }}
              variant="contained"
              disabled={resultadoNuevaLicencias === "LOADING" || resultadoEditarLicencias === "LOADING"}
            >
              {ver === "verDatos" ? "Editar" : "Guardar"}
              {resultadoNuevaLicencias === "LOADING" ||
                (resultadoEditarLicencias === "LOADING" && (
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
export default ModalLicencia;
