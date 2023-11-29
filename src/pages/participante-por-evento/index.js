import { useContext, useEffect, useState } from "react";
// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Styled Component Import
import ApexChartWrapper from "@/@core/styles/libs/react-apexcharts";
import Table from "@/@core/components/table/Table";
import Icon from 'src/@core/components/icon'
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import { Box, CardContent, CircularProgress, Tab, Typography, styled } from "@mui/material";
import { useRouter } from "next/router";
import { COLUMNS_MIS_LOGROS, COLUMNS_PLAN_FORMATIVO, COLUMNS_MIS_CURSOS, COLUMNS_PARTICIPANTES_EVENTOS_CAPACITACION } from "@/columns/columnsEventos";
import { fetchParticipantesEventosCapacitacion } from "@/redux/eventos";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PageHeader from "@/@core/components/page-header";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiTabList from "@mui/lab/TabList";

const ParticipantesEventosCapacitacion = () => {
  const dispatch = useDispatch();
  const [valueTab, setValueTab] = useState("1");
  // Accede al contexto de autenticación
  const authContext = useContext(AuthContext);
  // Accede al token desde el contexto
  const { token, user } = authContext;
  const router = useRouter();
  const hideText = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const participantesEventosSelector = useSelector((store) => store.eventos.participantesEventos);
  const [participantesEventos, setParticipantesEventosn] = useState([]);
  const loadingParticipantesEventosSelector = useSelector((store) => store.eventos.loadingParticipantesEventos);
  const [loadingParticipantesEventos, setLoadingParticipantesEventos] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchParticipantesEventosCapacitacion(user?.empleadoid, token));
    }
  }, [token]);

  useEffect(() => {
    debugger
    if (participantesEventosSelector?.length > 0 && loadingParticipantesEventosSelector) {
      const newArray = participantesEventosSelector.map((element) => ({
        id: element.new_participanteporeventodecapacitacionid,
        programa_evento: element["evento_de_capacitacion.new_programa@OData.Community.Display.V1.FormattedValue"],
        evento_apacitacion: element["_new_eventodecapacitacion_value@OData.Community.Display.V1.FormattedValue"],
        fecha_inicio: element["evento_de_capacitacion.new_fechainicio@OData.Community.Display.V1.FormattedValue"],
        fecha_finalizacion: element["evento_de_capacitacion.new_fechafinalizacion@OData.Community.Display.V1.FormattedValue"],
        duracion_horas: element["new_duracionhoras@OData.Community.Display.V1.FormattedValue"],
        numero_documento: element["empleado.new_nrodocumento"],
        numero_legajo: element["empleado.new_numerolegajo@OData.Community.Display.V1.FormattedValue"],
        empleado: element["_new_empleado_value@OData.Community.Display.V1.FormattedValue"],
        correo_electronico: element["empleado.new_correoelectronico"],
        id_canvas: element["empleado.new_idcanvas"],
        unidad_organizativa_directa: element["empleado.new_unidadorganizativa@OData.Community.Display.V1.FormattedValue"],
        tipo_curso: element["new_tipodecurso@OData.Community.Display.V1.FormattedValue"],
        alcance: element["new_alcance@OData.Community.Display.V1.FormattedValue"],
        score: element["new_nota"],
        plan_capacitacion: element["evento_de_capacitacion.new_plandecapacitacion@OData.Community.Display.V1.FormattedValue"],
        razon_estado: element["statuscode@OData.Community.Display.V1.FormattedValue"],
        propietario: element["_ownerid_value@OData.Community.Display.V1.FormattedValue"],
        curso_maestro: element["evento_de_capacitacion.new_cursomaestro@OData.Community.Display.V1.FormattedValue"],
        new_institucion: element["evento_de_capacitacion.new_institucion"],
        statuscode: element.statuscode
      }));
      setParticipantesEventosn(newArray);
      setLoadingParticipantesEventos(loadingParticipantesEventosSelector);
    } else if (participantesEventosSelector?.length == 0 && loadingParticipantesEventosSelector) {
      setParticipantesEventosn([]);
      setLoadingParticipantesEventos(loadingParticipantesEventosSelector);
    }
  }, [participantesEventosSelector, loadingParticipantesEventosSelector]);

  const nuevoParticipanteEventoCapacitacion = () => {
    router.push("/participante-por-evento/nuevo");
  };

  const handleTabsChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const TabList = styled(MuiTabList)(({ theme }) => ({
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: `${theme.palette.common.white} !important`,
    },
    "& .MuiTab-root": {
      minWidth: 65,
      minHeight: 38,
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.up("sm")]: {
        minWidth: 130,
      },
    },
  }));

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant="h6" sx={{ color: "primary.main", mb: 2 }}>
                Mis Eventos de Formación
              </Typography>
            }
          />
        </Grid>
        {/*
          {loadingParticipantesEventos ? (
            <Table
              data={participantesEventos?.filter(item => item?.statuscode === 100000005)}
              columns={COLUMNS_PLAN_FORMATIVO}
            // addRow={true}
            // name={"Participantes por Evento de Capacitacion"}
            // toggle={nuevoParticipanteEventoCapacitacion}
            />
          ) : (
            <Box
              sx={{
                mt: 6,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress sx={{ mb: 4 }} />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={10} lg={10}>
          <PageHeader
            title={
              <Typography variant="h6" sx={{ color: "primary.main", mb: 2 }}>
                Mis Cursos
              </Typography>
            }
          />
          {loadingParticipantesEventos ? (
            <Table
              data={participantesEventos?.filter(item => item?.statuscode !== 100000003 && item?.statuscode !== 100000005)}
              columns={COLUMNS_MIS_CURSOS}
            // addRow={true}
            // name={"Participantes por Evento de Capacitacion"}
            // toggle={nuevoParticipanteEventoCapacitacion}
            />
          ) : (
            <Box
              sx={{
                mt: 6,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress sx={{ mb: 4 }} />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <PageHeader
            title={
              <Typography variant="h6" sx={{ color: "primary.main", mb: 2 }}>
                Mis Logros
              </Typography>
            }
          />
          {loadingParticipantesEventos ? (
            <Table
              data={participantesEventos?.filter(item => item?.statuscode === 100000003)}
              columns={COLUMNS_MIS_LOGROS}
            // addRow={true}
            // name={"Participantes por Evento de Capacitacion"}
            // toggle={nuevoParticipanteEventoCapacitacion}
            />
          ) : (
            <Box
              sx={{
                mt: 6,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress sx={{ mb: 4 }} />
            </Box>
          )}
        </Grid> */}
        <Grid item xs={12} md={12} lg={12}>
          <TabContext value={valueTab}>
            {/* <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            // bgcolor: 'background.paper'
          }}> */}
            <TabList
              scrollButtons="auto"
              aria-label="customized tabs example"
              variant="scrollable"
              // scrollButtons={false}
              onChange={handleTabsChange}
            // sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
              <Tab value="1" label={
                <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                  <Icon fontSize={20} icon="mdi:animation-outline" />
                  {!hideText && "Mi Plan Formativo Prioritario"}
                </Box>
              } />
              <Tab value="2" label={
                <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                  <Icon fontSize={20} icon="mdi:animation-play-outline" />
                  {!hideText && "Mis Cursos"}
                </Box>
              } />
              <Tab value="3" label={
                <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                  <Icon fontSize={20} icon="mdi:file-certificate-outline" />
                  {!hideText && "Mis Logros"}
                </Box>
              } />
            </TabList>
            {/* </Box> */}
            <CardContent sx={{ p: 0, m: 0 }}>
              <TabPanel value="1" sx={{ p: 0, m: 0, mt:2 }}>
                {loadingParticipantesEventos ? (
                  <Table
                    data={participantesEventos?.filter(item => item?.statuscode === 100000005)}
                    columns={COLUMNS_PLAN_FORMATIVO}
                  // addRow={true}
                  // name={"Participantes por Evento de Capacitacion"}
                  // toggle={nuevoParticipanteEventoCapacitacion}
                  />
                ) : (
                  <Box
                    sx={{
                      mt: 6,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <CircularProgress sx={{ mb: 4 }} />
                  </Box>
                )}
              </TabPanel>
              <TabPanel value="2" sx={{ p: 0, m: 0, mt:2 }}>
                {loadingParticipantesEventos ? (
                  <Table
                    data={participantesEventos?.filter(item => item?.statuscode !== 100000003 && item?.statuscode !== 100000005)}
                    columns={COLUMNS_MIS_CURSOS}
                  // addRow={true}
                  // name={"Participantes por Evento de Capacitacion"}
                  // toggle={nuevoParticipanteEventoCapacitacion}
                  />
                ) : (
                  <Box
                    sx={{
                      mt: 6,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <CircularProgress sx={{ mb: 4 }} />
                  </Box>
                )}
              </TabPanel>
              <TabPanel value="3" sx={{ p: 0, m: 0, mt:2 }}>
                {loadingParticipantesEventos ? (
                  <Table
                    data={participantesEventos?.filter(item => item?.statuscode === 100000003)}
                    columns={COLUMNS_MIS_LOGROS}
                  // addRow={true}
                  // name={"Participantes por Evento de Capacitacion"}
                  // toggle={nuevoParticipanteEventoCapacitacion}
                  />
                ) : (
                  <Box
                    sx={{
                      mt: 6,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <CircularProgress sx={{ mb: 4 }} />
                  </Box>
                )}
              </TabPanel>
            </CardContent>
          </TabContext>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}
export default ParticipantesEventosCapacitacion

// new_motivoderechazo
// modalidad

