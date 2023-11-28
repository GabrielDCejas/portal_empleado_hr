import React, { useContext, useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, Divider, CircularProgress } from "@mui/material";
import Icon from "@/@core/components/icon";
/** yup **/
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import DialogActions from "@mui/material/DialogActions";

import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
/**fields */
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import useGetCiclosPGD from "@/hooks/usegetCiclosPGD";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import { AuthContext } from "@/context/AuthContext";
import useEditarEvaluacionPGD from "@/hooks/useEditarEvaluacionPGD";
import useGetEmpleados from "@/hooks/useGetEmpleados";

const General = ({ data }) => {
  const { user } = useContext(AuthContext);

  const editarEvaluacionPGD = useEditarEvaluacionPGD();

  const loadingEditarEvaluacionPGD = useSelector((store) => store.evaluaciones.loadingEditarEvaluacionPGD);

  const { ciclosPgd } = useGetCiclosPGD();
  const { empleados } = useGetEmpleados();

  const { handleSubmit, setValue, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      fecha_creacion: null,
      ciclo_pgd_select: null,
      evaluado: null,
      lider_select: null,
      grupo_ciclo: null,
      instancia: null,
      estadofinal_de_la_evaluacinde_pgd: null,
      posicion: null,
      area_de_personal: null,
      gurpo_de_personal: null,
      unidad_organizativa: null,
      puesto: null,
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

  const actualizarEvaluacion = (datos) => {
    editarEvaluacionPGD(datos);
  };

  if (data) {
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12} sx={{ mx: { xs: 0, sm: "5vw" } }}>
          <FormProvider {...methods}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="fecha_creacion"
                  label="Fecha de creación"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSearchSelect
                  options={ciclosPgd}
                  type="text"
                  name="ciclo_pgd_select"
                  lab="Ciclo de PGD"
                  disabled={data?.liderId !== user?.empleadoid}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="evaluado"
                  label="Evaluado"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSearchSelect
                  options={empleados}
                  type="text"
                  name="lider_select"
                  lab="Líder"
                  disabled={data?.liderId !== user?.empleadoid}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="grupo_ciclo"
                  label="Grupo de Ciclo"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="instancia"
                  label="Instancia"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="estadofinal_de_la_evaluacinde_pgd"
                  label="Estado Final de la Evaluación de PGD"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Grid container sx={{ my: 3 }}>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                  Datos Del Evaluado al momento de generar la Evaluacion de PGD
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="posicion"
                  label="Posición"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="area_de_personal"
                  label="Área de Personal"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="gurpo_de_personal"
                  label="Grupo de Personal"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="unidad_organizativa"
                  label="Unidad Organizativa Directa"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="puesto"
                  label="Puesto"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
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
    );
  } else {
    return null;
  }
};

export default General;
