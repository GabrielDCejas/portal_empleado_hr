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
import { AuthContext } from "@/context/AuthContext";
import useEditarObjetivo from "@/hooks/useEditarObjetivo";
import useGetCompetencias from "@/hooks/useGetCompetencias";
import useGetPlanSucesion from "@/hooks/useGetPlanSucesion";
import useEditarItemsEvaluacion from "@/hooks/useEditarItemsEvaluacion";

// const validacionSchema = yup.object().shape({
//   objetivo: yup.string().required("El objetivo es requerido"),
// });

const opcionesTipoItemEvaluacion = [
  { value: 100000000, label: "Objetivo Estrategico" },
  { value: 100000001, label: "Objetivo Gerencia/Sector" },
  { value: 100000002, label: "Objetivo Individual" },
  { value: 100000003, label: "Competencia" },
];

const opcionesValoracionCompetencias = [
    { value: 100000000, label: "Por Debajo De Las Expectativas" },
    { value: 100000001, label: "Cumple Parcialmente Las Expectativas" },
    { value: 100000002, label: "Cumple Las Expectativas" },
    { value: 100000003, label: "Por Encima De Las Expectativas" },
    { value: 100000004, label: "Sobresaliente" },
  ];

  const opcionesTipoInstancia = [
    { value: 100000000, label: "Autoevaluación" },
    { value: 100000001, label: "Evaluación del Líder" },
    { value: 100000002, label: "Feedback" },
  ];

const ModalItemsEvaluacion = ({ open, handleClose, data, onSubmit, ver = null, liderId, evaluacionPgdId = null }) => {
  const { user } = useContext(AuthContext);

  const editarItemEvaluacion = useEditarItemsEvaluacion()

  const loadingCargarItemsEvaluacion = useSelector((store) => store.evaluaciones.loadingCargarItemsEvaluacion);
  const loadingEditarItemsEvaluacion = useSelector((store) => store.evaluaciones.loadingEditarItemsEvaluacion);

  const { competencias } = useGetCompetencias();
  const { planSucesion } = useGetPlanSucesion();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const { handleSubmit, setValue, watch, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
        tipoItemEvaluacion: null,
        competenciaObjetivo: null,
        valoracion_modal:null,
        valoracion_lider_modal:null,
        tipoInstancia: null,
        planSucesion:null
    },
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
    editarItemEvaluacion(datos, evaluacionPgdId)
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
              {ver === "verDatos" ? "Item de Evaluación" : "Crear Item de Evaluación de PGD"}
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
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    General
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={opcionesTipoItemEvaluacion}
                    type="text"
                    name="tipoItemEvaluacion"
                    lab="Tipo de Item de Evaluacion"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={competencias}
                    type="text"
                    name="competenciaObjetivo"
                    lab="Competencia/Objetivo"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={opcionesValoracionCompetencias}
                    type="text"
                    name="valoracion_modal"
                    lab="Valoración"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={opcionesValoracionCompetencias}
                    type="text"
                    name="valoracion_lider_modal"
                    lab="Valoración del Líder"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={opcionesTipoInstancia}
                    type="text"
                    name="tipoInstancia"
                    lab="Tipo de Instancia"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSearchSelect
                    options={planSucesion}
                    type="text"
                    name="planSucesion"
                    lab="Plan de Sucesión"
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
          {liderId == user?.empleadoid && (
            <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
              <Button
                type="button"
                onClick={handleSubmit(ver === "verDatos" ? editar : cargar)}
                variant="contained"
                disabled={loadingCargarItemsEvaluacion === "LOADING" || loadingEditarItemsEvaluacion === "LOADING"}
              >
                {ver === "verDatos" ? "Editar" : "Guardar"}
                {loadingCargarItemsEvaluacion === "LOADING" ||
                  (loadingEditarItemsEvaluacion === "LOADING" && (
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
        </DialogActions>
      </Dialog>
    );
  } else {
    return null;
  }
};
export default ModalItemsEvaluacion;
