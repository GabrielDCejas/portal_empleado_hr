import { Box, Grid, Typography, Card, CardContent, CircularProgress, CardActions, Button, styled } from "@mui/material";
import Icon from "@/@core/components/icon";
/** yup **/
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
/**fields */
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import CustomCheckbox from "@/@core/components/customFields/CustomCheckbox";
import { useEffect, useState } from "react";
import useGetUniversidades from "@/hooks/useGetUniversidades";
//hooks
import useEditarDatosEmpleado from "@/hooks/useEditarDatosEmpleado";
import useGetCarreras from "@/hooks/useGetCarreras";
import useGetCapacitaciones from "@/hooks/useGetCapacitaciones";
import useGetUniversidadesEmpleado from "@/hooks/useGetUniversidadesEmpleado";
import useGetIdiomasEmpleado from "@/hooks/useGetIdiomasEmpleado";

import { useSelector } from "react-redux";
import PageHeader from "@/@core/components/page-header";
import Link from "next/link";
import Table from "@/@core/components/table/Table";
import { COLUMNS_UNIVERSIDADES } from "@/columns/columnsUniversidades";
import { COLUMNS_IDIOMAS } from "@/columns/columnsIdiomas";
import { COLUMNS_CAPACITACIONES } from "@/columns/columnsCapacitaciones";
import ModalUniversidad from "./modales/ModalUniversidad";
import useCargarUniversidad from "@/hooks/useCargarUniversidad";
import ModalIdioma from "./modales/ModalIdioma";
import useCargarIdioma from "@/hooks/useCargarIdioma";

const Educacion = ({ data }) => {
  const resultadoEditarDatos = useSelector((store) => store.empleado.resultadoEditarDatos);

  const editarDatosEmpleado = useEditarDatosEmpleado();
  const cargarUniversidad = useCargarUniversidad();
  const cargarIdioma = useCargarIdioma()

  const { universidadesEmpleado, loadingUniversidades } = useGetUniversidadesEmpleado();
  const { idiomaPorEmpleado, loadingIdiomas } = useGetIdiomasEmpleado();
  const { capacitaciones, loadingCapacitaciones } = useGetCapacitaciones();

  const [openUniveridad, setOpenUniveridad] = useState(false);
  const [openIdioma, setOpenIdioma] = useState(false)

  console.log("data", data)


  const { handleSubmit, setValue, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      primarioCompleto: false,
      bachiller: false,
      secundarioCompleto: false,
      secundarioIncompleto: false,
      tecnico: false,
      peritoMercantil: false,
    },
  });

  // Forma más resumida utilizando el operador spread
  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, [data, setValue]);

  const openModalUniversidad = () => {
    setOpenUniveridad(!openUniveridad);
  };

  const handleCloseUniversidad = () => {
    setOpenUniveridad(!openUniveridad);
  };

  const openModalIdioma = () => {
    setOpenIdioma(!openIdioma)
  }

  const handleCloseIdioma = () => {
    setOpenIdioma(!openIdioma)
  }

  const actualizarPerfil = (datos) => {
    editarDatosEmpleado(datos);
  };

  const handleCargarUniversidad = (datos) => {
    cargarUniversidad(datos, setOpenUniveridad);
  };

  const handleCargarIdioma = (datos) => {
    cargarIdioma(datos, setOpenIdioma)
  }

  if (data) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12} spacing={2}>
            <Card>
              <CardContent>
                <FormProvider {...methods}>
                  <Grid container sx={{ my: 3 }}>
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
                        Nivel De Educación
                      </Typography>
                    </Grid>
                  </Grid>
                  <Card
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-around",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CustomCheckbox name="primarioCompleto" label="Primario Completo" />
                      <CustomCheckbox name="bachiller" label="Bachiller" />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CustomCheckbox name="secundarioCompleto" label="Secundario Completo" />
                      <CustomCheckbox name="secundarioIncompleto" label="Secundario Incompleto" />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CustomCheckbox name="tecnico" label="Tecnico" />
                      <CustomCheckbox name="peritoMercantil" label="Perito Mercantil" />
                    </Box>
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
                    Actualizar
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
            <Card sx={{ mt: 4 }}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  {loadingUniversidades ? (
                    <Table
                      data={universidadesEmpleado}
                      columns={COLUMNS_UNIVERSIDADES}
                      name={"Formacion Superior"}
                      addRow={true}
                      toggle={openModalUniversidad}
                    />
                  ) : (
                    <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                      <CircularProgress sx={{ mb: 4 }} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Card>
            <Card sx={{ mt: 4 }}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  {loadingIdiomas ? (
                    <Table
                      data={idiomaPorEmpleado}
                      columns={COLUMNS_IDIOMAS}
                      name={"Idiomas"}
                      addRow={true}
                      toggle={openModalIdioma}
                    />
                  ) : (
                    <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                      <CircularProgress sx={{ mb: 4 }} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Card>
            <Card sx={{ mt: 4 }}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  {loadingCapacitaciones ? (
                    <Table
                      data={capacitaciones}
                      columns={COLUMNS_CAPACITACIONES}
                      name={"Capacitaciones"}
                    />
                  ) : (
                    <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                      <CircularProgress sx={{ mb: 4 }} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        {openUniveridad && (
          <ModalUniversidad open={openUniveridad} data={null} handleClose={handleCloseUniversidad} onSubmit={handleCargarUniversidad} />
        )}
        {openIdioma && (
          <ModalIdioma open={openIdioma} data={null} handleClose={handleCloseIdioma} onSubmit={handleCargarIdioma} />
        )}
      </>
    );
  } else {
    return null;
  }
};

export default Educacion;
