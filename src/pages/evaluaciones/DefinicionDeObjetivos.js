import React, { useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, Divider, CircularProgress } from "@mui/material";
import Icon from "@/@core/components/icon";
/** yup **/
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";

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

const DefinicionDeObjetivos = ({ data }) => {
  const { objetivosPGD, loadingObjetivosPGD } = useGetObjetivosPGD(data.id);
  const { itemsEvaluacion, loadingItemsEvaluacion } = useGetItemsEvaluacion(data.id);

  const { handleSubmit, setValue, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      fecha_inicio_autoevalacion: null,
      fecha_vencimiento_autoevalacion: null,
      definicion_objetivos: null,
      estado_definicion_objetivos: null,
      comentarios_observaciones: null,
      promedio_evaluacion: null,
      cantidad_competencias: null,
      puntaje_evaluacion_pgd_lider:null,
      puntaje_ideal_competencias: null
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

  const actualizarDatos = (datos) => {};

  if (data) {
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12}>
          <FormProvider {...methods}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="fecha_inicio_autoevalacion"
                  label="Fecha inicio"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="fecha_vencimiento_autoevalacion"
                  label="Fecha Vencimiento"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="definicion_objetivos"
                  label="Definición De Objetivos"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="estado_definicion_objetivos"
                  label="Estado de la Definición de Objetivos"
                  readOnly={true}
                  iconoClose={true}
                />
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
              <Grid item xs={12}>
                {loadingObjetivosPGD ? (
                  <Table data={objetivosPGD} columns={COLUMNS_OBJETIVOS_PGD} name={"Evaluación de PGD"} />
                ) : (
                  <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <CircularProgress sx={{ mb: 4 }} />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="comentarios_observaciones"
                  label="Comentarios y Observaciones"
                  rows={3}
                  multiline={true}
                  readOnly={true}
                  iconoClose={true}
                />
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
                  <Table data={itemsEvaluacion} columns={COLUMNS_ITEMS_EVALUACION} name={"Evaluación de PGD"} />
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
            </Grid>
          </FormProvider>
          {/* <CardActions>
              <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
                <Button
                  onClick={handleSubmit(actualizarPerfil)}
                  size="large"
                  type="submit"
                  sx={{ mr: 2 }}
                  variant="contained"
                  disabled={resultadoEditarDatos === "LOADING"}
                >
                  Guardar
                  {resultadoEditarDatos === "LOADING" && (
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
            </CardActions> */}
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default DefinicionDeObjetivos;
