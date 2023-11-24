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
import useEditarDatosEmpleado from "@/hooks/useEditarDatosEmpleado";

const General = ({ data }) => {
  const { handleSubmit, setValue, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      fecha_creacion: null,
      ciclo_pgd: null,
      evaluado: null,
      lider: null,
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


  if (data) {
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12}>
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
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="ciclo_pgd"
                  label="Ciclo de PGD"
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
                  name="evaluado"
                  label="Evaluado"
                  readOnly={true}
                  iconoClose={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  Component={TextField}
                  type="text"
                  name="lider"
                  label="Líder"
                  readOnly={true}
                  iconoClose={true}
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
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default General;
