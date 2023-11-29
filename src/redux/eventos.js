import axios from "axios";
import { UrlApi } from "../keys";
import { toast } from "react-toastify";

const dataInicial = {
    eventosDeCapacitacion: [],
    loadingEventosDeCapacitacion: false,
    eventoDeCapacitacionId: [],
    loadingEventosDeCapacitacionId: false,
    cursoAsociadoEventoId: [],
    loadingCursoAsociadoEventoId: false,
    participantesEventos: [],
    loadingParticipantesEventos: false,
    participanteEventoId: [],
    loadingParticipanteEventoId: false,
    modulosEventoId: [],
    loadingModulosEventoId: false,
    loadingInscripcion: false,
    resultadoInscripcion: '',
    certificados: [],
    loadingCertificados: false
};

const EVENTOS_CAPACITACION_LOADING = "EVENTOS_CAPACITACION_LOADING";
const EVENTOS_CAPACITACION_EXITO = "EVENTOS_CAPACITACION_EXITO";
const EVENTOS_CAPACITACION_ERROR = "EVENTOS_CAPACITACION_ERROR";

const EVENTOS_CAPACITACION_ID_LOADING = "EVENTOS_CAPACITACION_ID_LOADING";
const EVENTOS_CAPACITACION_ID_EXITO = "EVENTOS_CAPACITACION_ID_EXITO";
const EVENTOS_CAPACITACION_ID_ERROR = "EVENTOS_CAPACITACION_ID_ERROR";

const CURSO_ASOCIADO_EVENTO_ID_LOADING = "CURSO_ASOCIADO_EVENTO_ID_LOADING";
const CURSO_ASOCIADO_EVENTO_ID_EXITO = "CURSO_ASOCIADO_EVENTO_ID_EXITO";
const CURSO_ASOCIADO_EVENTO_ID_ERROR = "CURSO_ASOCIADO_EVENTO_ID_ERROR";

const PARTICIPANTES_EVENTOS_CAPACITACION_LOADING = "PARTICIPANTES_EVENTOS_CAPACITACION_LOADING";
const PARTICIPANTES_EVENTOS_CAPACITACION_EXITO = "PARTICIPANTES_EVENTOS_CAPACITACION_EXITO";
const PARTICIPANTES_EVENTOS_CAPACITACION_ERROR = "PARTICIPANTES_EVENTOS_CAPACITACION_ERROR";

const PARTICIPANTE_EVENTO_CAPACITACION_ID_LOADING = "PARTICIPANTE_EVENTO_CAPACITACION_ID_LOADING";
const PARTICIPANTE_EVENTO_CAPACITACION_ID_EXITO = "PARTICIPANTE_EVENTO_CAPACITACION_ID_EXITO";
const PARTICIPANTE_EVENTO_CAPACITACION_ID_ERROR = "PARTICIPANTE_EVENTO_CAPACITACION_ID_ERROR";

const MODULOS_EVENTO_CAPACITACION_ID_LOADING = "MODULOS_EVENTO_CAPACITACION_ID_LOADING"
const MODULOS_EVENTO_CAPACITACION_ID_EXITO = "MODULOS_EVENTO_CAPACITACION_ID_EXITO"
const MODULOS_EVENTO_CAPACITACION_ID_ERROR = "MODULOS_EVENTO_CAPACITACION_ID_ERROR"

const INSCRIPCION_EVENTO_LOADING = "INSCRIPCION_EVENTO_LOADING"
const INSCRIPCION_EVENTO_EXITO = "INSCRIPCION_EVENTO_EXITO"
const INSCRIPCION_EVENTO_ERROR = "INSCRIPCION_EVENTO_ERROR"

const LIMPIAR_EVENTOS = "LIMPIAR_EVENTOS";

const CERTIFICADOS_CAPACITACION_LOADING = "CERTIFICADOS_CAPACITACION_LOADING";
const CERTIFICADOS_CAPACITACION_EXITO = "CERTIFICADOS_CAPACITACION_EXITO";
const CERTIFICADOS_CAPACITACION_ERROR = "CERTIFICADOS_CAPACITACION_ERROR";

const LIMPIAR_CERTIFICADOS = "LIMPIAR_CERTIFICADOS"

let loadingToast = null;

const ToastLoading = (msj) => {
    loadingToast = toast.info(msj, {
        theme: "dark",
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
};

const ToastSuccess = (msj) => {
    toast.success(msj, {
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onOpen: () => {
            if (loadingToast !== null) {
                toast.dismiss(loadingToast);
            }
        },
    });
};

const ToastError = (msj) => {
    toast.error(msj, {
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onOpen: () => {
            if (loadingToast !== null) {
                toast.dismiss(loadingToast);
            }
        },
    });
};


export default function eventosReducer(state = dataInicial, action) {
    switch (action.type) {
        case LIMPIAR_EVENTOS:
            return {
                ...state,
                eventoDeCapacitacionId: [],
                loadingEventosDeCapacitacionId: false,
                cursoAsociadoEventoId: [],
                loadingCursoAsociadoEventoId: false,
                participanteEventoId: [],
                loadingParticipanteEventoId: false
            };
        case EVENTOS_CAPACITACION_LOADING:
            return {
                ...state,
                loadingEventosDeCapacitacion: action.loadingEventosDeCapacitacion,
            };
        case EVENTOS_CAPACITACION_EXITO:
            return {
                ...state,
                eventosDeCapacitacion: action.payload,
                loadingEventosDeCapacitacion: action.loadingEventosDeCapacitacion,
            };
        case EVENTOS_CAPACITACION_ERROR:
            return {
                ...state,
                loadingEventosDeCapacitacion: action.loadingEventosDeCapacitacion,
            };
        case EVENTOS_CAPACITACION_ID_LOADING:
            return {
                ...state,
                loadingEventosDeCapacitacionId: action.loadingEventosDeCapacitacionId,
            };
        case EVENTOS_CAPACITACION_ID_EXITO:
            return {
                ...state,
                eventoDeCapacitacionId: action.payload,
                loadingEventosDeCapacitacionId: action.loadingEventosDeCapacitacionId,
            };
        case EVENTOS_CAPACITACION_ID_ERROR:
            return {
                ...state,
                loadingEventosDeCapacitacionId: action.loadingEventosDeCapacitacionId,
            };
        case CURSO_ASOCIADO_EVENTO_ID_LOADING:
            return {
                ...state,
                loadingCursoAsociadoEventoId: action.loadingCursoAsociadoEventoId,
            };
        case CURSO_ASOCIADO_EVENTO_ID_EXITO:
            return {
                ...state,
                cursoAsociadoEventoId: action.payload,
                loadingCursoAsociadoEventoId: action.loadingCursoAsociadoEventoId,
            };
        case CURSO_ASOCIADO_EVENTO_ID_ERROR:
            return {
                ...state,
                loadingCursoAsociadoEventoId: action.loadingCursoAsociadoEventoId,
            };
        case PARTICIPANTES_EVENTOS_CAPACITACION_LOADING:
            return {
                ...state,
                loadingParticipantesEventos: action.loadingParticipantesEventos,
            };
        case PARTICIPANTES_EVENTOS_CAPACITACION_EXITO:
            return {
                ...state,
                participantesEventos: action.payload,
                loadingParticipantesEventos: action.loadingParticipantesEventos,
            };
        case PARTICIPANTES_EVENTOS_CAPACITACION_ERROR:
            return {
                ...state,
                loadingParticipantesEventos: action.loadingParticipantesEventos,
            };
        case PARTICIPANTE_EVENTO_CAPACITACION_ID_LOADING:
            return {
                ...state,
                loadingParticipanteEventoId: action.loadingParticipanteEventoId,
            };
        case PARTICIPANTE_EVENTO_CAPACITACION_ID_EXITO:
            return {
                ...state,
                participanteEventoId: action.payload,
                loadingParticipanteEventoId: action.loadingParticipanteEventoId,
            };
        case PARTICIPANTE_EVENTO_CAPACITACION_ID_ERROR:
            return {
                ...state,
                loadingParticipanteEventoId: action.loadingParticipanteEventoId,
            };
        case MODULOS_EVENTO_CAPACITACION_ID_LOADING:
            return {
                ...state,
                loadingModulosEventoId: action.loadingModulosEventoId,
            };
        case MODULOS_EVENTO_CAPACITACION_ID_EXITO:
            return {
                ...state,
                modulosEventoId: action.payload,
                loadingModulosEventoId: action.loadingModulosEventoId,
            };
        case MODULOS_EVENTO_CAPACITACION_ID_ERROR:
            return {
                ...state,
                loadingModulosEventoId: action.loadingModulosEventoId,
            };
        case INSCRIPCION_EVENTO_LOADING:
            return {
                ...state,
                loadingInscripcion: true
            };
        case INSCRIPCION_EVENTO_EXITO:
            return {
                ...state,
                resultadoInscripcion: action.resultado,
                loadingInscripcion: false
            };
        case INSCRIPCION_EVENTO_ERROR:
            return {
                ...state,
                resultadoInscripcion: action.resultado,
                loadingInscripcion: false
            };
        case CERTIFICADOS_CAPACITACION_LOADING:
            return {
                ...state,
                loadingCertificados: action.loadingCertificados,
                certificados: []
            };
        case CERTIFICADOS_CAPACITACION_EXITO:
            return {
                ...state,
                certificados: action.payload,
                loadingCertificados: action.loadingCertificados,
            };
        case CERTIFICADOS_CAPACITACION_ERROR:
            return {
                ...state,
                loadingCertificados: action.loadingCertificados,
            };
        case LIMPIAR_CERTIFICADOS:
            return {
                ...state,
                certificados: []
            };
        default:
            return { ...state };
    }
}

export const limpiarEventos = () => async (dispatch) => {
    dispatch({
        type: LIMPIAR_EVENTOS,
    });
};

export const fetchEventosCapacitacion = (token) => async (dispatch) => {
    dispatch({
        type: EVENTOS_CAPACITACION_LOADING,
        loadingEventosDeCapacitacion: false,
    });

    try {
        const entidad = "new_eventodecapacitacions";
        const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
        <entity name="new_eventodecapacitacion">
          <attribute name="new_fechainicio" />
          <attribute name="new_fechafinalizacion" />
          <attribute name="statuscode" />
          <attribute name="new_requiereeficacia" />
          <attribute name="new_participantes" />
          <attribute name="new_cantidadhorasparticipantes" />
          <attribute name="new_codigo" />
          <attribute name="new_modalidaddecurso" />
          <attribute name="new_habilitadoenportal" />
          <attribute name="new_cursomaestro" />
          <attribute name="new_duracionenhoras" />
          <attribute name="new_plandecapacitacion" />
          <attribute name="new_presupuestoasignado" />
          <attribute name="new_cupo" />
          <attribute name="ownerid" />
          <attribute name="new_name" />
          <attribute name="new_eventodecapacitacionid" />
          <order attribute="new_fechainicio" descending="true" />
          <filter type="and">
            <condition attribute="statecode" operator="eq" value="0" />
          </filter>
          <link-entity name="new_maestrodecurso" from="new_maestrodecursoid" to="new_cursomaestro" visible="false" link-type="outer" alias="maestro_de_curso">
            <attribute name="new_tipodeoferta" />
            <attribute name="new_tipodeformacion" />
            <attribute name="new_tipodeexperienciadeaprendizaje" />
            <attribute name="new_aplicabeca" />
            <attribute name="new_idcanvas" />
          </link-entity>
        </entity>
      </fetch>`;

        const response = await axios.post(
            `${UrlApi}api/consultafetch`,
            {
                entidad: entidad,
                fetch: fetch,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({
            type: EVENTOS_CAPACITACION_EXITO,
            payload: response.data,
            loadingEventosDeCapacitacion: true,
        });
    } catch (error) {
        dispatch({
            type: EVENTOS_CAPACITACION_ERROR,
            loadingEventosDeCapacitacion: true,
        });
    }
};

export const fetchEventosCapacitacionId = (token, id) => async (dispatch) => {
    dispatch({
        type: EVENTOS_CAPACITACION_ID_LOADING,
        loadingEventosDeCapacitacionId: false,
    });

    try {
        const entidad = "new_eventodecapacitacions";
        const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
        <entity name="new_eventodecapacitacion">
          <attribute name="new_fechainicio" />
          <attribute name="new_fechafinalizacion" />
          <attribute name="new_institucion" />
          <attribute name="statuscode" />
          <attribute name="new_requiereeficacia" />
          <attribute name="new_participantes" />
          <attribute name="new_cantidadhorasparticipantes" />
          <attribute name="new_codigo" />
          <attribute name="new_modalidaddecurso" />
          <attribute name="new_habilitadoenportal" />
          <attribute name="new_cursomaestro" />
          <attribute name="new_duracionenhoras" />
          <attribute name="new_plandecapacitacion" />
          <attribute name="new_presupuestoasignado" />
          <attribute name="new_cupo" />
          <attribute name="ownerid" />
          <attribute name="new_name" />
          <attribute name="new_eventodecapacitacionid" />
          <attribute name="new_tipodecurso" />
          <attribute name="new_programa" />
          <attribute name="new_participantesinscriptosycursando" />
          <attribute name="new_participantesfinalizadosnoaprobados" />
          <attribute name="new_participantesaprobados" />
          <attribute name="new_emitecertificado" />
          <attribute name="transactioncurrencyid" />
          <attribute name="new_disponibilidaddelcupo" />
          <attribute name="new_curso" />
          <attribute name="new_contenido" />
          <attribute name="new_requerimientodecapacitacion" />
          <attribute name="new_plandecapacitacion" />
          <attribute name="new_descripcion" />
          <order attribute="new_fechainicio" descending="true" />
          <filter type="and">
            <condition attribute="statecode" operator="eq" value="0" />
            <condition attribute="new_eventodecapacitacionid" operator="eq" uitype="new_eventodecapacitacion" value="${id}" />
          </filter>
          <link-entity name="new_maestrodecurso" from="new_maestrodecursoid" to="new_cursomaestro" visible="false" link-type="outer" alias="maestro_de_curso">
            <attribute name="new_tipodeoferta" />
            <attribute name="new_tipodeformacion" />
            <attribute name="new_tipodeexperienciadeaprendizaje" />
            <attribute name="new_aplicabeca" />
            <attribute name="new_idcanvas" />
            <attribute name="new_mododeaprobacion" />
            <attribute name="new_emitecertificado" />
          </link-entity>
        </entity>
      </fetch>`;

        const response = await axios.post(
            `${UrlApi}api/consultafetch`,
            {
                entidad: entidad,
                fetch: fetch,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({
            type: EVENTOS_CAPACITACION_ID_EXITO,
            payload: response.data,
            loadingEventosDeCapacitacionId: true,
        });
    } catch (error) {
        dispatch({
            type: EVENTOS_CAPACITACION_ID_ERROR,
            loadingEventosDeCapacitacionId: true,
        });
    }
};

export const fetchCursoAsociadoEventoId = (token, id) => async (dispatch) => {
    dispatch({
        type: CURSO_ASOCIADO_EVENTO_ID_LOADING,
        loadingCursoAsociadoEventoId: false,
    });

    try {
        const entidad = "new_cursos";
        const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true">
        <entity name="new_curso">
          <attribute name="new_name" />
          <attribute name="cr879_tipodecurso" />
          <attribute name="cr879_alcance" />
          <attribute name="ownerid" />
          <attribute name="new_cursoid" />
          <order attribute="new_name" descending="false" />
          <link-entity name="new_new_eventodecapacitacion_new_curso" from="new_cursoid" to="new_cursoid" visible="false" intersect="true">
            <link-entity name="new_eventodecapacitacion" from="new_eventodecapacitacionid" to="new_eventodecapacitacionid" alias="evento_de_capacitacion">
              <filter type="and">
                <condition attribute="new_eventodecapacitacionid" operator="eq" uitype="new_eventodecapacitacion" value="${id}" />
              </filter>
            </link-entity>
          </link-entity>
        </entity>
      </fetch>`;

        const response = await axios.post(
            `${UrlApi}api/consultafetch`,
            {
                entidad: entidad,
                fetch: fetch,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({
            type: CURSO_ASOCIADO_EVENTO_ID_EXITO,
            payload: response.data,
            loadingCursoAsociadoEventoId: true,
        });
    } catch (error) {
        dispatch({
            type: CURSO_ASOCIADO_EVENTO_ID_ERROR,
            loadingCursoAsociadoEventoId: true,
        });
    }
};

export const fetchParticipantesEventosCapacitacion =
    (empleadoid, token) => async (dispatch) => {
        dispatch({
            type: PARTICIPANTES_EVENTOS_CAPACITACION_LOADING,
            loadingParticipantesEventos: false,
        });

        try {
            const entidad = "new_participanteporeventodecapacitacions";
            const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_participanteporeventodecapacitacion">
      <attribute name="new_empleado" />
      <attribute name="statuscode" />
      <attribute name="new_duracionhoras" />
      <attribute name="new_nota" />
      <attribute name="ownerid" />
      <attribute name="new_tipodecurso" />
      <attribute name="new_alcance" />
      <attribute name="new_eventodecapacitacion" />
      <attribute name="new_participanteporeventodecapacitacionid" />
      <order attribute="new_empleado" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
        <condition attribute="new_empleado" operator="eq" value="${empleadoid}" />
      </filter>
      <link-entity name="new_eventodecapacitacion" from="new_eventodecapacitacionid" to="new_eventodecapacitacion" visible="false" link-type="outer" alias="evento_de_capacitacion">
        <attribute name="new_fechainicio" />
        <attribute name="new_fechafinalizacion" />
        <attribute name="new_plandecapacitacion" />
        <attribute name="new_programa" />
        <attribute name="new_cursomaestro" />
        <attribute name="new_institucion" />
      </link-entity>
    </entity>
  </fetch>`;

            const response = await axios.post(
                `${UrlApi}api/consultafetch`,
                {
                    entidad: entidad,
                    fetch: fetch,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch({
                type: PARTICIPANTES_EVENTOS_CAPACITACION_EXITO,
                payload: response.data,
                loadingParticipantesEventos: true,
            });
        } catch (error) {
            dispatch({
                type: PARTICIPANTES_EVENTOS_CAPACITACION_ERROR,
                loadingParticipantesEventos: true,
            });
        }
    };
//     <link-entity name="new_empleado" from="new_empleadoid" to="new_empleado" visible="false" link-type="outer" alias="empleado">
//     <attribute name="new_unidadorganizativa" />
//     <attribute name="new_numerolegajo" />
//     <attribute name="new_nrodocumento" />
//     <attribute name="new_idcanvas" />
//     <attribute name="new_correoelectronico" />
//   </link-entity>
export const fetchParticipanteEventoCapacitacionId =
    (token, id) => async (dispatch) => {
        dispatch({
            type: PARTICIPANTE_EVENTO_CAPACITACION_ID_LOADING,
            loadingParticipanteEventoId: false,
        });

        try {
            const entidad = "new_participanteporeventodecapacitacions";
            const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_participanteporeventodecapacitacion">
      <attribute name="new_empleado" />
      <attribute name="statuscode" />
      <attribute name="new_duracionhoras" />
      <attribute name="new_nota" />
      <attribute name="ownerid" />
      <attribute name="new_tipodecurso" />
      <attribute name="new_alcance" />
      <attribute name="new_eventodecapacitacion" />
      <attribute name="new_participanteporeventodecapacitacionid" />
      <attribute name="new_asistencia" />
      <attribute name="new_aplica" />
      <attribute name="new_plandecapacitacion" />
      <order attribute="new_empleado" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
        <condition attribute="new_participanteporeventodecapacitacionid" operator="eq" uitype="new_participanteporeventodecapacitacion" value="${id}" />
      </filter>
      <link-entity name="new_eventodecapacitacion" from="new_eventodecapacitacionid" to="new_eventodecapacitacion" visible="false" link-type="outer" alias="evento_capacitacion">
        <attribute name="new_fechainicio" />
        <attribute name="new_fechafinalizacion" />
        <attribute name="new_plandecapacitacion" />
        <attribute name="new_programa" />
        <attribute name="new_cursomaestro" />
      </link-entity>
    </entity>
  </fetch>`;
            const response = await axios.post(
                `${UrlApi}api/consultafetch`,
                {
                    entidad: entidad,
                    fetch: fetch,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch({
                type: PARTICIPANTE_EVENTO_CAPACITACION_ID_EXITO,
                payload: response.data,
                loadingParticipanteEventoId: true,
            });
        } catch (error) {
            dispatch({
                type: PARTICIPANTE_EVENTO_CAPACITACION_ID_ERROR,
                loadingParticipanteEventoId: true,
            });
        }
    };

export const fetchModulosEventoCapacitacionId = (token, id) => async (dispatch) => {
    dispatch({
        type: MODULOS_EVENTO_CAPACITACION_ID_LOADING,
        loadingModulosEventoId: false,
    });

    try {
        const entidad = "new_instructoresporeventodecapacitacions";
        const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_instructoresporeventodecapacitacion">
        <attribute name="new_eventodecapacitacion" />
        <attribute name="new_orden" />
        <attribute name="new_encuentro" />
        <attribute name="new_diayhorainiciodelmodulo" />
        <attribute name="new_diayhorafindelmodulo" />
        <attribute name="new_instructoresporeventodecapacitacionid" />
        <attribute name="new_espacio" />
        <order attribute="new_orden" descending="false" />
        <filter type="and">
          <condition attribute="statecode" operator="eq" value="0" />
          <condition attribute="new_eventodecapacitacion" operator="eq" uitype="new_eventodecapacitacion" value="${id}" />
        </filter>
      </entity>
    </fetch>`;

        const response = await axios.post(
            `${UrlApi}api/consultafetch`,
            {
                entidad: entidad,
                fetch: fetch,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({
            type: MODULOS_EVENTO_CAPACITACION_ID_EXITO,
            payload: response.data,
            loadingModulosEventoId: true,
        });
    } catch (error) {
        dispatch({
            type: MODULOS_EVENTO_CAPACITACION_ID_ERROR,
            loadingModulosEventoId: true,
        });
    }
};

export const participarEnEvento = (eventoid, token) => async (dispatch) => {
    dispatch({
        type: INSCRIPCION_EVENTO_LOADING,
        resultado: "LOADING",
    });
    ToastLoading("Procesando...");
    return new Promise((resolve, reject) => {
        axios
            .put(
                `${UrlApi}api/hroneclick/participanteporevento`,
                {
                    "new_participanteporeventodecapacitacionid": `${eventoid}`,
                    "statuscode": 100000000 //Inscripto
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                dispatch({
                    type: INSCRIPCION_EVENTO_EXITO,
                    resultado: "EXITO",
                    payload: response.data,
                });

                ToastSuccess("Inscripto a evento!");
                resolve(response.data);
            })
            .catch((error) => {
                dispatch({
                    type: INSCRIPCION_EVENTO_ERROR,
                    resultado: "ERROR",
                });
                ToastError(error.response.data);
                reject(error);
            });
    });
};

export const fetchCertificadosEventos =
    (token, id) => async (dispatch) => {
        dispatch({
            type: CERTIFICADOS_CAPACITACION_LOADING,
            loadingCertificados: false,
        });

        try {
            const entidad = "annotations";
            const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="annotation">
      <attribute name="filename" />
      <attribute name="mimetype" />
      <attribute name="annotationid" />
      <order attribute="filename" descending="false" />
      <link-entity name="new_participanteporeventodecapacitacion" from="new_participanteporeventodecapacitacionid" to="objectid" link-type="outer" alias="evento">
      <filter type="and">
      <condition attribute="statecode" operator="eq" value="0" />
      <condition attribute="new_participanteporeventodecapacitacionid" operator="eq" value="${id}" />
    </filter>
      </link-entity>
    </entity>
  </fetch>`;
            const response = await axios.post(
                `${UrlApi}api/consultafetch`,
                {
                    entidad: entidad,
                    fetch: fetch,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch({
                type: CERTIFICADOS_CAPACITACION_EXITO,
                payload: response.data,
                loadingCertificados: true,
            });
        } catch (error) {
            dispatch({
                type: CERTIFICADOS_CAPACITACION_ERROR,
                loadingCertificados: true,
            });
        }
    };

export const limpiarCertificados = () => async (dispatch) => {
    dispatch({
        type: LIMPIAR_CERTIFICADOS,
    });
};