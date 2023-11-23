import React, { useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, CardActions, CircularProgress } from "@mui/material";
import Icon from "@/@core/components/icon";
/** yup **/
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

/**fields */
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import { useSelector } from "react-redux";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import useEditarDatosEmpleado from "@/hooks/useEditarDatosEmpleado";

const tipoContratacionOpciones = [
  { value: 100000000, label: "Freelance" },
  { value: 100000001, label: "A Prueba" },
  { value: 100000002, label: "Contratado" },
  { value: 100000003, label: "Indeterminado" },
  { value: 100000004, label: "Jubilado" },
  { value: 100000005, label: "Pasante" },
  { value: 100000006, label: "Menor" },
];
const tipoDocumentoOpciones = [
  { value: 100000000, label: "D.N.I." },
  { value: 100000001, label: "L.C." },
  { value: 100000002, label: "L.E." },
  { value: 100000003, label: "D.E." },
  { value: 100000004, label: "Pasaporte" },
];
const estadoCivilOpciones = [
  { value: 100000000, label: "Casado" },
  { value: 100000001, label: "Soltero" },
  { value: 100000002, label: "Divorciado" },
  { value: 100000003, label: "Viudo" },
  { value: 100000004, label: "Concubinato" },
  { value: 100000005, label: "Separado" },
];
const generoOpciones = [
  { value: false, label: "Masculino" },
  { value: true, label: "Femenino" },
];

const PerfilInfo = ({ data, paises, provincias, localidades }) => {
  const resultadoEditarDatos = useSelector((store) => store.empleado.resultadoEditarDatos);

  const editarDatosEmpleado = useEditarDatosEmpleado();

  const validacionSchema = yup.object().shape({
    // tipoDocumento: yup.object({
    //     value: yup.string().required("El evaluador es requerido"),
    // }),
    // tipoContratacion: yup.object({
    //     value: yup.string().required("El evaluado es requerido"),
    // }),
  });

  const { handleSubmit, setValue, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      empresa: null,
      nombreDePila: null,
      apellido: null,
      nroLegajo: null,
      tipoDocumento: null,
      numeroDocumento: null,
      cuitCuil: null,
      genero: null,
      email: null,
      estadoCivil: null,
      telefonoMovil: null,
      telefonoParticular: null,
      extencionTefefonica: null,
      tipoContratacion: null,
      fechaNacimiento: null,
      paisNacimiento: null,
      edad: null,
      provinciaNacimiento: null,
      calle: null,
      nroCalle: null,
      piso: null,
      depto: null,
      localidad: null,
      codigoPostal: null,
      provincia: null,
      pais: null,
    },
    resolver: yupResolver(validacionSchema),
  });

  // Forma más resumida utilizando el operador spread
  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (data[key]) setValue(key, data[key]);
      });
    }
  }, [data, setValue]);

  const actualizarPerfil = (datos) => {
    editarDatosEmpleado(datos);
  };

  if (data) {
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardContent>
              <FormProvider {...methods}>
                <Grid container sx={{ my: 3 }}>
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                      Información Personal
                    </Typography>
                  </Grid>
                </Grid>
                <Card sx={{ p: 3 }}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="empresa"
                        label="Empresa"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="text"
                        name="nroLegajo"
                        label="Nro. Legajo"
                        readOnly={true}
                        iconoClose={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="text" name="nombreDePila" label="Nombre de pila" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="text" name="apellido" label="Apellidos" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect
                        options={tipoDocumentoOpciones}
                        type="text"
                        name="tipoDocumento"
                        lab="Tipo documento"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="number"
                        name="numeroDocumento"
                        label="Nro. documento"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="number" name="cuitCuil" label="CUIT/CUIL" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect options={generoOpciones} type="text" name="genero" lab="Género" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="text" name="email" label="Correo electrónico" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect
                        options={estadoCivilOpciones}
                        type="text"
                        name="estadoCivil"
                        lab="Estado Civil"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="number"
                        name="telefonoMovil"
                        label="Teléfono movil"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="number"
                        name="telefonoParticular"
                        label="Teléfono particular"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        Component={TextField}
                        type="number"
                        name="extencionTefefonica"
                        label="Extensión telefónica"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect
                        options={tipoContratacionOpciones}
                        type="text"
                        name="tipoContratacion"
                        lab="Tipo de Contratación"
                      />
                    </Grid>
                  </Grid>
                </Card>
                <Grid container sx={{ my: 3 }}>
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                      Datos de Nacimiento
                    </Typography>
                  </Grid>
                </Grid>
                <Card sx={{ p: 3 }}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <CustomDateField
                        name="fechaNacimiento"
                        label="Fecha nacimiento:"
                        rules={{ required: "Required!" }}
                        helperText="Por favor indica la fecha de hasta"
                        req={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="number" name="edad" label="Edad" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect options={paises} type="text" name="paisNacimiento" lab="País nacimiento" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect
                        options={provincias}
                        type="text"
                        name="provinciaNacimiento"
                        lab="Provincia nacimiento"
                      />
                    </Grid>
                  </Grid>
                </Card>
                <Grid container sx={{ my: 3 }}>
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
                      Ultimo Domicilio
                    </Typography>
                  </Grid>
                </Grid>
                <Card sx={{ p: 3 }}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="text" name="calle" label="Calle" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="number" name="nroCalle" label="Nro." />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="text" name="piso" label="Piso" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="text" name="depto" label="Depto" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect options={localidades} type="text" name="localidad" lab="Localidad" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField Component={TextField} type="number" name="codigoPostal" label="Codigo Postal" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect options={provincias} type="text" name="provincia" lab="Provincia" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSearchSelect options={paises} type="text" name="pais" lab="País" />
                    </Grid>
                  </Grid>
                </Card>
              </FormProvider>
            </CardContent>
            <CardActions>
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
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default PerfilInfo;
