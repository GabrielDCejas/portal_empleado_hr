import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ApexChartWrapper from "@/@core/styles/libs/react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import { Grid, IconButton, LinearProgress, Tooltip, Typography } from "@mui/material";
import PageHeader from "@/@core/components/page-header";
import Icon from "src/@core/components/icon";
import { fetchParticipanteEventoCapacitacionId, limpiarEventos, fetchParticipantesEventosCapacitacion } from "@/redux/eventos";
import { fetchEmpleadosSelect, fetchEventosCapacitacionSelect, fetchPlanesFormacion, fetchPropietarios } from "@/redux/datosSelect";
import ParticipantePorEvento from "./ParticipantePorEvento";

const IdParticipantesEventos = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // Accede al contexto de autenticación
  const authContext = useContext(AuthContext);
  // Accede al token desde el contexto
  const { token, user } = authContext;
  const paramID = router.query.id;

  const participanteEventoIdSelector = useSelector((store) => store.eventos.participanteEventoId);
  const [participanteEventoId, setParticipanteEventoId] = useState({});
  const loadingParticipanteEventoIdSelector = useSelector((store) => store.eventos.loadingParticipanteEventoId);
  const [loadingParticipanteEventoId, setLoadingParticipanteEventoId] = useState(false);

  const eventoCapacitacionSelectSelector = useSelector((store) => store.datosSelect.eventoCapacitacion);
  const [eventoCapacitacion, setEventoCapacitacion] = useState([]);
  const loadingPlanesCapacitacion = useSelector((store) => store.datosSelect.loadingPlanesCapacitacion);

  const empleadosSelector = useSelector((store) => store.datosSelect.empleados);
  const [empleados, setEmpleados] = useState([]);
  const loadingEmpleados = useSelector((store) => store.datosSelect.loadingEmpleados);

  const propietariosSelector = useSelector((store) => store.datosSelect.propietarios);
  const [propietarios, setPropietarios] = useState([]);
  const loadingPropietarios = useSelector((store) => store.datosSelect.loadingPropietarios);

  const planesFormacionSelector = useSelector((store) => store.datosSelect.planesFormacion);
  const [planesFormacion, setPlanesFormacion] = useState([]);
  const loadingPlanesFormacion = useSelector((store) => store.datosSelect.loadingPlanesFormacion);
  const resultadoInscripcionSelector = useSelector((store) => store.eventos.resultadoInscripcion)
  useEffect(() => {
    return () => {
      dispatch(limpiarEventos());
    };
  }, []);

  useEffect(() => {
    if (token && paramID && paramID != "nuevo") {
      dispatch(fetchParticipanteEventoCapacitacionId(token, paramID));
    }
    if (token) {
      dispatch(fetchEventosCapacitacionSelect(token))
      dispatch(fetchEmpleadosSelect(token))
      dispatch(fetchPropietarios(token))
      dispatch(fetchPlanesFormacion(token))
    }
  }, [token]);
  useEffect(() => {
    if (resultadoInscripcionSelector === "EXITO") {
      dispatch(fetchParticipanteEventoCapacitacionId(token, paramID));
      dispatch(fetchParticipantesEventosCapacitacion(user?.empleadoid, token));
    }
  }, [resultadoInscripcionSelector]);

  useEffect(() => {
    if (participanteEventoIdSelector?.length > 0 && loadingParticipanteEventoIdSelector) {
      const newArray = participanteEventoIdSelector.map((element) => ({
        id: element.new_participanteporeventodecapacitacionid,
        programa_evento: element["evento_de_capacitacion.new_programa@OData.Community.Display.V1.FormattedValue"],
        evento_apacitacion: { label: element["_new_eventodecapacitacion_value@OData.Community.Display.V1.FormattedValue"], value: element["_new_eventodecapacitacion_value"] },
        fecha_inicio: element["evento_de_capacitacion.new_fechainicio@OData.Community.Display.V1.FormattedValue"],
        fecha_finalizacion: element["evento_de_capacitacion.new_fechafinalizacion@OData.Community.Display.V1.FormattedValue"],
        duracion_horas: element["new_duracionhoras@OData.Community.Display.V1.FormattedValue"],
        numero_documento: element["empleado.new_nrodocumento"],
        numero_legajo: element["empleado.new_numerolegajo@OData.Community.Display.V1.FormattedValue"],
        empleado: { label: element["_new_empleado_value@OData.Community.Display.V1.FormattedValue"], value: element["_new_empleado_value"] },
        correo_electronico: element["empleado.new_correoelectronico"],
        id_canvas: element["empleado.new_idcanvas"],
        unidad_organizativa_directa: element["empleado.new_unidadorganizativa@OData.Community.Display.V1.FormattedValue"],
        tipo_curso: element["new_tipodecurso@OData.Community.Display.V1.FormattedValue"],
        alcance: { label: element["new_alcance@OData.Community.Display.V1.FormattedValue"], value: element["new_alcance"] },
        score: element["new_nota"],
        plan_capacitacion: { label: element["_new_plandecapacitacion_value@OData.Community.Display.V1.FormattedValue"], value: element["_new_plandecapacitacion_value"] },
        razon_estado: { label: element["statuscode@OData.Community.Display.V1.FormattedValue"], value: element["statuscode"] },
        propietario: { label: element["_ownerid_value@OData.Community.Display.V1.FormattedValue"], value: element["_ownerid_value"] },
        curso_maestro: element["evento_de_capacitacion.new_cursomaestro@OData.Community.Display.V1.FormattedValue"],
        asistencia: { label: element["new_asistencia@OData.Community.Display.V1.FormattedValue"], value: element["new_asistencia"] },
        id_inscripcion_canvas: element["new_idenrollmentcanvas"],
        aplica: { label: element["new_aplica@OData.Community.Display.V1.FormattedValue"], value: element["new_aplica"] },
      }));
      setParticipanteEventoId(...newArray);
      setLoadingParticipanteEventoId(loadingParticipanteEventoIdSelector);
    } else if (participanteEventoIdSelector?.length == 0 && loadingParticipanteEventoIdSelector) {
      setParticipanteEventoId([]);
      setLoadingParticipanteEventoId(loadingParticipanteEventoIdSelector);
    }
  }, [participanteEventoIdSelector, loadingParticipanteEventoIdSelector]);

  useEffect(() => {
    if (eventoCapacitacionSelectSelector?.length > 0 && loadingPlanesCapacitacion) {
      const newArray = eventoCapacitacionSelectSelector.map((element) => ({
        value: element.new_eventodecapacitacionid,
        label: element.new_name,
      }));
      setEventoCapacitacion(newArray);
    } else if (eventoCapacitacionSelectSelector?.length == 0 && loadingPlanesCapacitacion) {
      setEventoCapacitacion([]);
    }
  }, [eventoCapacitacionSelectSelector, loadingPlanesCapacitacion]);
  "'new_participanteporeventodecapacitacion' entity doesn't contain attribute with Name = 'new_idenrollmentcanvas' and NameMapping = 'Logical'. MetadataCacheDetails: ProviderType=Dynamic, StandardCache=True, IsLoadedInStagedContext = False, Timestamp=20303915, MinActiveRowVersion=20303915, MetadataInstanceId=56600860, LastUpdated=2023-11-27 02:20:38.840, OrgId=7a9a2982-93cc-4ae5-873e-da0f40b9ee50"

  useEffect(() => {
    if (empleadosSelector?.length > 0 && loadingEmpleados) {
      const newArray = empleadosSelector.map((element) => ({
        value: element.new_empleadoid,
        label: element.new_name,
      }));
      setEmpleados(newArray);
    } else if (empleadosSelector?.length == 0 && loadingEmpleados) {
      setEmpleados([]);
    }
  }, [empleadosSelector, loadingEmpleados]);

  useEffect(() => {
    if (propietariosSelector?.length > 0 && loadingPropietarios) {
      const newArray = propietariosSelector.map((element) => ({
        value: element.systemuserid,
        label: element.fullname,
      }));
      setPropietarios(newArray);
    } else if (propietariosSelector?.length == 0 && loadingPropietarios) {
      setPropietarios([]);
    }
  }, [propietariosSelector, loadingPropietarios]);

  useEffect(() => {
    if (planesFormacionSelector?.length > 0 && loadingPlanesFormacion) {
      const newArray = planesFormacionSelector.map((element) => ({
        value: element.new_plandecapacitacionid,
        label: element.new_name,
      }));
      setPlanesFormacion(newArray);
    } else if (planesFormacionSelector?.length == 0 && loadingPlanesFormacion) {
      setPlanesFormacion([]);
    }
  }, [planesFormacionSelector, loadingPlanesFormacion]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} display="flex" alignItems="center">
          <Tooltip title="Regresar">
            <IconButton
              color="info"
              aria-label="Regresar"
              onClick={() => router.push("/participante-por-evento")}
            >
              <Icon icon="mdi:arrow-left-bold-circle-outline" style={{ fontSize: 30 }} />
            </IconButton>
          </Tooltip>
          <PageHeader
            title={
              <Typography variant="h6">
                {!loadingParticipanteEventoId && paramID != "nuevo" ? (
                  <LinearProgress color="inherit" />
                ) : paramID == "nuevo" ? (
                  "Crear Participante por Evento de Capacitacion"
                ) : (
                  participanteEventoId?.evento_apacitacion?.label
                )}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <ParticipantePorEvento
            data={participanteEventoId}
            paramID={paramID}
            eventoCapacitacion={eventoCapacitacion}
            empleados={empleados}
            propietarios={propietarios}
            planesFormacion={planesFormacion}
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default IdParticipantesEventos