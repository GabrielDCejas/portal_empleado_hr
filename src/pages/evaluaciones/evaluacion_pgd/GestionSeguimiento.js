import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent, Divider, CircularProgress } from "@mui/material";
import Icon from "@/@core/components/icon";
/** yup **/
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

/**fields */
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import { useSelector } from "react-redux";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import Table from "@/@core/components/table/Table";
import useGetObjetivosPGD from "@/hooks/useGetObjetivosPGD";
import { COLUMNS_OBJETIVOS_PGD } from "@/columns/columnsObjetivosPGD";
import useGetItemsEvaluacion from "@/hooks/useGetItemsEvaluacion";
import { COLUMNS_ITEMS_EVALUACION } from "@/columns/columnsItemsEvaluacion";
import ModalObjetivos from "./modales/ModalObjetivos";
import useCargarObjetivos from "@/hooks/useCargarObjetivos";
import { AuthContext } from "@/context/AuthContext";
import ModalItemsEvaluacion from "./modales/ModalItemsEvaluacion";
import useCargarItemsEvaluacion from "@/hooks/useCargarItemsEvaluacion";
import useGetMetaPrioritarias from "@/hooks/useGetMetaPrioritarias";
import { COLUMNS_METAS_PRIORITARIAS } from "@/columns/columnsMetasPrioritarias";
import ModalMetasPrioritarias from "./modales/ModalMetasPrioritarias";
import useCargarMetaPrioritaria from "@/hooks/useCargarMetaPrioritaria";
import useEditarEvaluacionPGD from "@/hooks/useEditarEvaluacionPGD";

const opcionesEstadoInstancia = [
  { value: 100000000, label: "En Curso" },
  { value: 100000001, label: "Enviada" },
  { value: 100000002, label: "Incompleta" },
  { value: 100000003, label: "No Iniciado" },
  { value: 100000004, label: "No Aplica" },
];

const GestionSeguimiento = ({ data }) => {
  const { user } = useContext(AuthContext);

  const editarEvaluacionPGD = useEditarEvaluacionPGD();

  const loadingEditarEvaluacionPGD = useSelector((store) => store.evaluaciones.loadingEditarEvaluacionPGD);

  const { objetivosPGD, loadingObjetivosPGD } = useGetObjetivosPGD(data.id);
  const { itemsEvaluacion, loadingItemsEvaluacion } = useGetItemsEvaluacion(data.id);
  const { metasPrioritarias, loadingMetasPrioritarias } = useGetMetaPrioritarias(data.id);

  const cargarObjetivos = useCargarObjetivos();
  const itemEvaluacion = useCargarItemsEvaluacion();
  const cargarMetaPrioritaria = useCargarMetaPrioritaria();

  const [openObjetivos, setOpenObjetivos] = useState(false);
  const [openItemsEvaluacion, setOpenItemsEvaluacion] = useState(false);
  const [openMetaPrioritaria, setOpenMetaPrioritaria] = useState(false);

  const { handleSubmit, setValue, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      fecha_inicio_evaluacin_lider: null,
      fecha_vencimiento_evaluacin_lider: null,
      new_evaluaciondellder: null,
      estado_evaluacion_lider: null,
      performance_individual: null,
      nivel_logro: null,
      comentarios_observaciones_autoevaluacion: null,
      promedio_evaluacion: null,
      cantidad_competencias: null,
      puntaje_evaluacion_pgd_lider: null,
      puntaje_ideal_competencias: null,
      comentariosyobservacionesdelaevaluacion: null,
      mi_proposito: null,
      comentarios_obervaciones_proposito: null,
      nuevo_proposito: null,
      comentariosyobservacionesaspeval: null,
    },
  });

  // Forma más resumida utilizando el operador spread
  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (data[key]) setValue(key, data[key]);
      });
    }
  }, [data, setValue]);

  const openModalObjetivos = () => {
    setOpenObjetivos(!openObjetivos);
  };

  const handleCloseModalObjetivos = () => {
    setOpenObjetivos(!openObjetivos);
  };

  const handleCargarObjetivos = (datos) => {
    cargarObjetivos(datos, data.id, handleCloseModalObjetivos);
  };

  const openModalItemsEvaluacion = () => {
    setOpenItemsEvaluacion(!openItemsEvaluacion);
  };
  const handleCloseModalItemsEvaluacion = () => {
    setOpenItemsEvaluacion(!openItemsEvaluacion);
  };

  const handleCargarItemsEvaluacion = (datos) => {
    itemEvaluacion(datos, data.id, handleCloseModalItemsEvaluacion);
  };

  const openModalMetasPrioritarias = (datos) => {
    setOpenMetaPrioritaria(!openMetaPrioritaria);
  };
  const handleCloseModalMetasPrioritarias = () => {
    setOpenMetaPrioritaria(!openMetaPrioritaria);
  };
  const handleCargarMetaPrioritaria = (datos) => {
    cargarMetaPrioritaria(datos, data.id, handleCloseModalMetasPrioritarias);
  };

  const actualizarEvaluacion = (datos) => {
    editarEvaluacionPGD(datos);
  };

  if (data) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <FormProvider {...methods}>
              <Grid container spacing={4}>
                <Grid item lg={12} sx={{ mx: { xs: 0, sm: "5vw" } }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <CustomDateField
                        name="fecha_inicio_evaluacin_lider"
                        label="Fecha inicio"
                        readOnly={data?.liderId !== user?.empleadoid}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomDateField
                        name="fecha_vencimiento_evaluacin_lider"
                        label="Fecha Vencimiento"
                        readOnly={data?.liderId !== user?.empleadoid}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="new_evaluaciondellder"
                        label="Gestión y Seguimiento"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect
                        options={opcionesEstadoInstancia}
                        type="text"
                        name="estado_evaluacion_lider"
                        lab="Estado de la Gestión y Seguimiento"
                        disabled={data?.liderId !== user?.empleadoid}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Grid container sx={{ my: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    Gestión de Objetivos
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item lg={12} sx={{ mx: { xs: 0, sm: "5vw" } }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="performance_individual"
                        label="Performance Individual"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="nivel_logro"
                        label="Nivel de Logro"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {loadingObjetivosPGD ? (
                    <Table
                      data={objetivosPGD}
                      columns={COLUMNS_OBJETIVOS_PGD}
                      name={"Objetivos"}
                      addRow={data?.liderId == user?.empleadoid}
                      toggle={openModalObjetivos}
                    />
                  ) : (
                    <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                      <CircularProgress sx={{ mb: 4 }} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sx={{ mt: 4 }}>
                  <Grid item lg={12} sx={{ mx: { xs: 0, sm: "5vw" } }}>
                    <Grid container spacing={4}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="comentarios_observaciones_autoevaluacion"
                        label="Comentarios y Observaciones del Feedback del Lider"
                        rows={3}
                        multiline={true}
                        readOnly={data?.liderId !== user?.empleadoid}
                        iconoClose={data?.liderId !== user?.empleadoid}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Grid container sx={{ my: 3 }}>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    Competencias
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {loadingItemsEvaluacion ? (
                    <Table
                      data={itemsEvaluacion}
                      columns={COLUMNS_ITEMS_EVALUACION}
                      name={"Evaluación de PGD"}
                      addRow={data?.liderId == user?.empleadoid}
                      toggle={openModalItemsEvaluacion}
                    />
                  ) : (
                    <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                      <CircularProgress sx={{ mb: 4 }} />
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Grid container sx={{ my: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    Resultados y Observaciones
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item lg={12} sx={{ mx: { xs: 0, sm: "5vw" } }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="promedio_evaluacion"
                        label="Promedio Evaluación PGD Líder"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="cantidad_competencias"
                        label="Cantidad Competencias"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="puntaje_evaluacion_pgd_lider"
                        label="Puntaje Evaluacion PGD Lider"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="puntaje_ideal_competencias"
                        label="Puntaje Ideal Competencias"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="comentariosyobservacionesdelaevaluacion"
                        label="Comentarios y Observaciones"
                        rows={3}
                        multiline={true}
                        readOnly={data?.liderId !== user?.empleadoid}
                        iconoClose={data?.liderId !== user?.empleadoid}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Grid container sx={{ my: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    Su Propósito
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item lg={12} sx={{ mx: { xs: 0, sm: "5vw" } }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="mi_proposito"
                        label="Mi Propósito"
                        rows={3}
                        multiline={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="cantidad_competencias"
                        label="Cantidad Competencias"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="comentarios_obervaciones_proposito"
                        label="Comentarios y Obervaciones de su Propósito"
                        rows={3}
                        multiline={true}
                        readOnly={data?.liderId !== user?.empleadoid}
                        iconoClose={data?.liderId !== user?.empleadoid}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="nuevo_proposito"
                        label="Nuevo Propósito"
                        rows={3}
                        multiline={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Grid container sx={{ my: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    Aspiracional de Carrera
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item lg={12} sx={{ mx: { xs: 0, sm: "5vw" } }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="comentariosyobservacionesaspeval"
                        label="Comentarios y Observaciones sobre el Aspiracional de Carrera del Colaborador"
                        rows={3}
                        multiline={true}
                        readOnly={data?.liderId !== user?.empleadoid}
                        iconoClose={data?.liderId !== user?.empleadoid}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Grid container sx={{ my: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                    Plan de Desarrollo Prioritario
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {loadingMetasPrioritarias ? (
                  <Table
                    data={metasPrioritarias}
                    columns={COLUMNS_METAS_PRIORITARIAS}
                    name={"Metas Prioritarias"}
                    addRow={data?.liderId == user?.empleadoid}
                    toggle={openModalMetasPrioritarias}
                  />
                ) : (
                  <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <CircularProgress sx={{ mb: 4 }} />
                  </Box>
                )}
              </Grid>
            </FormProvider>
            <DialogActions>
              <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
                <Button
                  onClick={handleSubmit(actualizarEvaluacion)}
                  size="large"
                  type="submit"
                  sx={{ mr: 2 }}
                  variant="contained"
                  disabled={loadingEditarEvaluacionPGD === "LOADING"}
                >
                  Editar
                  {loadingEditarEvaluacionPGD === "LOADING" && (
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
                  )}
                </Button>
              </Box>
            </DialogActions>
          </Grid>
        </Grid>
        {openObjetivos && (
          <ModalObjetivos
            open={openObjetivos}
            liderId={data.liderId}
            handleClose={handleCloseModalObjetivos}
            onSubmit={handleCargarObjetivos}
          />
        )}
        {openItemsEvaluacion && (
          <ModalItemsEvaluacion
            open={openItemsEvaluacion}
            liderId={data.liderId}
            handleClose={handleCloseModalItemsEvaluacion}
            onSubmit={handleCargarItemsEvaluacion}
          />
        )}
        {openMetaPrioritaria && (
          <ModalMetasPrioritarias
            open={openMetaPrioritaria}
            liderId={data.liderId}
            handleClose={handleCloseModalMetasPrioritarias}
            onSubmit={handleCargarMetaPrioritaria}
          />
        )}
      </>
    );
  } else {
    return null;
  }
};

export default GestionSeguimiento;
