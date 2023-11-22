import axios from "axios";
import { UrlApi } from "../keys";

const dataInicial = {
  puestos: [],
  loadingPuestos: false,
  paises: [],
  loadingPaises: false,
  provincias: [],
  loadingProvincias: false,
  localidades: [],
  loadingLocalidades: false,
  unidadesFuncionales: [],
  loadingUnidadesFuncionales: false,
  unidadOrganigrama: [],
  loadingUnidadOrganigrama: false,
  categorias: [],
  loadingCategorias: false,
  convenios: [],
  loadingConvenios: false,
  empresas: [],
  loadingEmpresas: false,
  periodos: [],
  loadingPeriodos: false,
  relevadoPor: [],
  loadingRelevadoPor: false,
  templateEncuesta: [],
  loadingTemplateEncuesta: false,
  ejes: [],
  loadingEjes: false,
  maestroCursos: [],
  loadingMaestroCursos: false,
  programas: [],
  loadingProgramas: false,
  modalidadDictado: [],
  loadingModalidadDictado: false,
  divisas: [],
  loadingDivisas: false,
  solicitudesFormacion: [],
  loadingSolicitudesFormacion: false,
  planesFormacion: [],
  loadingPlanesFormacion: false,
  eventoCapacitacion: [],
  loadingPlanesCapacitacion: [],
  empleados: [],
  loadingEmpleados: false,
  propietarios: [],
  loadingPropietarios: false,
  instructores: [],
  loadingInstructores: false,
  cursos: [],
  loadingCursos: false,
  posiciones: [],
  loadingPosiciones: false,
  tipoActividadDocente: [],
  loadingTipoActividadDocente: false,
  maestroActividades: [],
  loadingMaestroActividades: false,
  materias: [],
  loadingMaterias: false,
  carreras: [],
  loadingCarreras: false,
  areasDisciplinares: [],
  loadingAreasDisciplinares: false,
  gradosAcademicos: [],
  loadingGradosAcademicos: false,
  subdisciplinas: [],
  loadingSubdisciplinas: false
};

const PUESTOS_LOADING = "PUESTOS_LOADING";
const PUESTOS_EXITO = "PUESTOS_EXITO";
const PUESTOS_ERROR = "PROVINCIAS_ERROR";

const PAISES_LOADING = "PAISES_LOADING";
const PAISES_EXITO = "PAISES_EXITO";
const PAISES_ERROR = "PAISES_ERROR";

const PROVINCIAS_LOADING = "PROVINCIAS_LOADING";
const PROVINCIAS_EXITO = "PROVINCIAS_EXITO";
const PROVINCIAS_ERROR = "PROVINCIAS_ERROR";

const LOCALIDADES_LOADING = "LOCALIDADES_LOADING";
const LOCALIDADES_EXITO = "LOCALIDADES_EXITO";
const LOCALIDADES_ERROR = "LOCALIDADES_ERROR";

const UNIDADES_FUNCIONALES_LOADING = "UNIDADES_FUNCIONALES_LOADING";
const UNIDADES_FUNCIONALES_EXITO = "UNIDADES_FUNCIONALES_EXITO";
const UNIDADES_FUNCIONALES_ERROR = "UNIDADES_FUNCIONALES_ERROR";

const UNIDADES_ORGANIGRAMA_LOADING = "UNIDADES_ORGANIGRAMA_LOADING";
const UNIDADES_ORGANIGRAMA_EXITO = "UNIDADES_ORGANIGRAMA_EXITO";
const UNIDADES_ORGANIGRAMA_ERROR = "UNIDADES_ORGANIGRAMA_ERROR";

const CATEGORIAS_LOADING = "CATEGORIAS_LOADING";
const CATEGORIAS_EXITO = "CATEGORIAS_EXITO";
const CATEGORIAS_ERROR = "CATEGORIAS_ERROR";

const CONVENIOS_LOADING = "CONVENIOS_LOADING";
const CONVENIOS_EXITO = "CONVENIOS_EXITO";
const CONVENIOS_ERROR = "CONVENIOS_ERROR";

const EMPRESAS_LOADING = "EMPRESAS_LOADING";
const EMPRESAS_EXITO = "EMPRESAS_EXITO";
const EMPRESAS_ERROR = "EMPRESAS_ERROR";

const PERIODOS_LOADING = "PERIODOS_LOADING";
const PERIODOS_EXITO = "PERIODOS_EXITO";
const PERIODOS_ERROR = "PERIODOS_ERROR";

const RELEVADOPOR_LOADING = "RELEVADOPOR_LOADING";
const RELEVADOPOR_EXITO = "RELEVADOPOR_EXITO";
const RELEVADOPOR_ERROR = "RELEVADOPOR_ERROR";

const TEMPLATE_ENCUESTA_LOADING = "TEMPLATE_ENCUESTA_LOADING";
const TEMPLATE_ENCUESTA_EXITO = "TEMPLATE_ENCUESTA_EXITO";
const TEMPLATE_ENCUESTA_ERROR = "TEMPLATE_ENCUESTA_ERROR";

const EJES_LOADING = "EJES_LOADING";
const EJES_EXITO = "EJES_EXITO";
const EJES_ERROR = "EJES_ERROR";

const MAESTRO_CURSO_LOADING = "MAESTRO_CURSO_LOADING";
const MAESTRO_CURSO_EXITO = "MAESTRO_CURSO_EXITO";
const MAESTRO_CURSO_ERROR = "MAESTRO_CURSO_ERROR";

const PROGRAMAS_LOADING = "PROGRAMAS_LOADING";
const PROGRAMAS_EXITO = "PROGRAMAS_EXITO";
const PROGRAMAS_ERROR = "PROGRAMAS_ERROR";

const MODALIDAD_DICTADO_LOADING = "MODALIDAD_DICTADO_LOADING";
const MODALIDAD_DICTADO_EXITO = "MODALIDAD_DICTADO_EXITO";
const MODALIDAD_DICTADO_ERROR = "MODALIDAD_DICTADO_ERROR";

const DIVISAS_LOADING = "DIVISAS_LOADING";
const DIVISAS_EXITO = "DIVISAS_EXITO";
const DIVISAS_ERROR = "DIVISAS_ERROR";

const SOLICITUDES_FORMACION_LOADING = "SOLICITUDES_FORMACION_LOADING";
const SOLICITUDES_FORMACION_EXITO = "SOLICITUDES_FORMACION_EXITO";
const SOLICITUDES_FORMACION_ERROR = "SOLICITUDES_FORMACION_ERROR";

const PLANES_FORMACION_LOADING = "PLANES_FORMACION_LOADING";
const PLANES_FORMACION_EXITO = "PLANES_FORMACION_EXITO";
const PLANES_FORMACION_ERROR = "PLANES_FORMACION_ERROR";

const EVENTOS_CAPACITACION_SELECT_LOADING = "EVENTOS_CAPACITACION_SELECT_LOADING";
const EVENTOS_CAPACITACION_SELECT_EXITO = "EVENTOS_CAPACITACION_SELECT_EXITO";
const EVENTOS_CAPACITACION_SELECT_ERROR = "EVENTOS_CAPACITACION_SELECT_ERROR";

const EMPLEADOS_LOADING = "EMPLEADOS_LOADING";
const EMPLEADOS_EXITO = "EMPLEADOS_EXITO";
const EMPLEADOS_ERROR = "EMPLEADOS_ERROR";

const PROPIETARIOS_LOADING = "PROPIETARIOS_LOADING";
const PROPIETARIOS_EXITO = "PROPIETARIOS_EXITO";
const PROPIETARIOS_ERROR = "PROPIETARIOS_ERROR";

const INSTRUCTORES_LOADING = "INSTRUCTORES_LOADING";
const INSTRUCTORES_EXITO = "INSTRUCTORES_EXITO";
const INSTRUCTORES_ERROR = "INSTRUCTORES_ERROR";

const CURSOS_LOADING = "CURSOS_LOADING";
const CURSOS_EXITO = "CURSOS_EXITO";
const CURSOS_ERROR = "CURSOS_ERROR";

const POSICIONES_LOADING = "POSICIONES_LOADING";
const POSICIONES_EXITO = "POSICIONES_EXITO";
const POSICIONES_ERROR = "POSICIONES_ERROR";

const TIPO_ACTIVIDAD_DOCENTE_LOADING = "TIPO_ACTIVIDAD_DOCENTE_LOADING";
const TIPO_ACTIVIDAD_DOCENTE_EXITO = "TIPO_ACTIVIDAD_DOCENTE_EXITO";
const TIPO_ACTIVIDAD_DOCENTE_ERROR = "TIPO_ACTIVIDAD_DOCENTE_ERROR";

const MAESTRO_ACTIVIDADES_LOADING = "MAESTRO_ACTIVIDADES_LOADING";
const MAESTRO_ACTIVIDADES_EXITO = "MAESTRO_ACTIVIDADES_EXITO";
const MAESTRO_ACTIVIDADES_ERROR = "MAESTRO_ACTIVIDADES_ERROR";

const MATERIAS_LOADING = "MATERIAS_LOADING";
const MATERIAS_EXITO = "MATERIAS_EXITO";
const MATERIAS_ERROR = "MATERIAS_ERROR";

const CARRERAS_LOADING = "CARRERAS_LOADING";
const CARRERAS_EXITO = "CARRERAS_EXITO";
const CARRERAS_ERROR = "CARRERAS_ERROR";

const AREAS_DISCIPLINAR_LOADING = "AREAS_DISCIPLINAR_LOADING";
const AREAS_DISCIPLINAR_EXITO = "AREAS_DISCIPLINAR_EXITO";
const AREAS_DISCIPLINAR_ERROR = "AREAS_DISCIPLINAR_ERROR";

const GRADOS_ACADEMICOS_LOADING = "GRADOS_ACADEMICOS_LOADING";
const GRADOS_ACADEMICOS_EXITO = "GRADOS_ACADEMICOS_EXITO";
const GRADOS_ACADEMICOS_ERROR = "GRADOS_ACADEMICOS_ERROR";

const SUBDISIPLINAS_LOADING = "SUBDISIPLINAS_LOADING"
const SUBDISIPLINAS_EXITO = "SUBDISIPLINAS_EXITO"
const SUBDISIPLINAS_ERROR = "SUBDISIPLINAS_ERROR"

export default function datosSelectReducer(state = dataInicial, action) {
  switch (action.type) {
    case PUESTOS_LOADING:
      return { ...state, loadingPuestos: false };
    case PUESTOS_EXITO:
      return { ...state, puestos: action.payload, loadingPuestos: true };
    case PUESTOS_ERROR:
      return { ...state, loadingPuestos: false };
    case PAISES_LOADING:
      return { ...state, loadingPaises: false };
    case PAISES_EXITO:
      return { ...state, paises: action.payload, loadingPaises: true };
    case PAISES_ERROR:
      return { ...state, loadingPaises: false };
    case PROVINCIAS_LOADING:
      return { ...state, loadingProvincias: false };
    case PROVINCIAS_EXITO:
      return { ...state, provincias: action.payload, loadingProvincias: true };
    case PROVINCIAS_ERROR:
      return { ...state, loadingProvincias: false };
    case LOCALIDADES_LOADING:
      return { ...state, loadingLocalidades: false };
    case LOCALIDADES_EXITO:
      return {
        ...state,
        localidades: action.payload,
        loadingLocalidades: true,
      };
    case LOCALIDADES_ERROR:
      return { ...state, loadingLocalidades: false };
    case UNIDADES_FUNCIONALES_LOADING:
      return { ...state, loadingUnidadesFuncionales: false };
    case UNIDADES_FUNCIONALES_EXITO:
      return {
        ...state,
        unidadesFuncionales: action.payload,
        loadingUnidadesFuncionales: true,
      };
    case UNIDADES_FUNCIONALES_ERROR:
      return { ...state, loadingUnidadesFuncionales: false };
    case UNIDADES_ORGANIGRAMA_LOADING:
      return { ...state, loadingUnidadOrganigrama: false };
    case UNIDADES_ORGANIGRAMA_EXITO:
      return {
        ...state,
        unidadOrganigrama: action.payload,
        loadingUnidadOrganigrama: true,
      };
    case UNIDADES_ORGANIGRAMA_ERROR:
      return { ...state, loadingUnidadOrganigrama: false };
    case CATEGORIAS_LOADING:
      return { ...state, loadingCategorias: false };
    case CATEGORIAS_EXITO:
      return { ...state, categorias: action.payload, loadingCategorias: true };
    case CATEGORIAS_ERROR:
      return { ...state, loadingCategorias: false };
    case CONVENIOS_LOADING:
      return { ...state, loadingConvenios: false };
    case CONVENIOS_EXITO:
      return { ...state, convenios: action.payload, loadingConvenios: true };
    case CONVENIOS_ERROR:
      return { ...state, loadingConvenios: false };
    case EMPRESAS_LOADING:
      return { ...state, loadingEmpresas: false };
    case EMPRESAS_EXITO:
      return { ...state, empresas: action.payload, loadingEmpresas: true };
    case EMPRESAS_ERROR:
      return { ...state, loadingEmpresas: false };
    case PERIODOS_LOADING:
      return { ...state, loadingPeriodos: false };
    case PERIODOS_EXITO:
      return { ...state, periodos: action.payload, loadingPeriodos: true };
    case PERIODOS_ERROR:
      return { ...state, loadingPeriodos: false };
    case RELEVADOPOR_LOADING:
      return { ...state, loadingRelevadoPor: false };
    case RELEVADOPOR_EXITO:
      return {
        ...state,
        relevadoPor: action.payload,
        loadingRelevadoPor: true,
      };
    case RELEVADOPOR_ERROR:
      return { ...state, loadingRelevadoPor: false };
    case TEMPLATE_ENCUESTA_LOADING:
      return { ...state, loadingTemplateEncuesta: false };
    case TEMPLATE_ENCUESTA_EXITO:
      return {
        ...state,
        templateEncuesta: action.payload,
        loadingTemplateEncuesta: true,
      };
    case TEMPLATE_ENCUESTA_ERROR:
      return { ...state, loadingTemplateEncuesta: false };
    case EJES_LOADING:
      return { ...state, loadingEjes: false };
    case EJES_EXITO:
      return { ...state, ejes: action.payload, loadingEjes: true };
    case EJES_ERROR:
      return { ...state, loadingEjes: false };
    case MAESTRO_CURSO_LOADING:
      return { ...state, loadingMaestroCursos: false };
    case MAESTRO_CURSO_EXITO:
      return {
        ...state,
        maestroCursos: action.payload,
        loadingMaestroCursos: true,
      };
    case MAESTRO_CURSO_ERROR:
      return { ...state, loadingMaestroCursos: false };
    case PROGRAMAS_LOADING:
      return { ...state, loadingProgramas: false };
    case PROGRAMAS_EXITO:
      return { ...state, programas: action.payload, loadingProgramas: true };
    case PROGRAMAS_ERROR:
      return { ...state, loadingProgramas: false };
    case MODALIDAD_DICTADO_LOADING:
      return { ...state, loadingModalidadDictado: false };
    case MODALIDAD_DICTADO_EXITO:
      return {
        ...state,
        modalidadDictado: action.payload,
        loadingModalidadDictado: true,
      };
    case MODALIDAD_DICTADO_ERROR:
      return { ...state, loadingModalidadDictado: false };
    case DIVISAS_LOADING:
      return { ...state, loadingDivisas: false };
    case DIVISAS_EXITO:
      return { ...state, divisas: action.payload, loadingDivisas: true };
    case DIVISAS_ERROR:
      return { ...state, loadingDivisas: false };
    case SOLICITUDES_FORMACION_LOADING:
      return { ...state, loadingSolicitudesFormacion: false };
    case SOLICITUDES_FORMACION_EXITO:
      return {
        ...state,
        solicitudesFormacion: action.payload,
        loadingSolicitudesFormacion: true,
      };
    case SOLICITUDES_FORMACION_ERROR:
      return { ...state, loadingSolicitudesFormacion: false };
    case PLANES_FORMACION_LOADING:
      return { ...state, loadingPlanesFormacion: false };
    case PLANES_FORMACION_EXITO:
      return {
        ...state,
        planesFormacion: action.payload,
        loadingPlanesFormacion: true,
      };
    case PLANES_FORMACION_ERROR:
      return { ...state, loadingPlanesFormacion: false };
    case EVENTOS_CAPACITACION_SELECT_LOADING:
      return { ...state, loadingPlanesCapacitacion: false };
    case EVENTOS_CAPACITACION_SELECT_EXITO:
      return {
        ...state,
        eventoCapacitacion: action.payload,
        loadingPlanesCapacitacion: true,
      };
    case EVENTOS_CAPACITACION_SELECT_ERROR:
      return { ...state, loadingPlanesCapacitacion: false };
    case EMPLEADOS_LOADING:
      return { ...state, loadingEmpleados: false };
    case EMPLEADOS_EXITO:
      return {
        ...state,
        empleados: action.payload,
        loadingEmpleados: true,
      };
    case EMPLEADOS_ERROR:
      return { ...state, loadingEmpleados: false };
    case PROPIETARIOS_LOADING:
      return { ...state, loadingPropietarios: false };
    case PROPIETARIOS_EXITO:
      return {
        ...state,
        propietarios: action.payload,
        loadingPropietarios: true,
      };
    case PROPIETARIOS_ERROR:
      return { ...state, loadingPropietarios: false };
    case INSTRUCTORES_LOADING:
      return { ...state, loadingInstructores: false };
    case INSTRUCTORES_EXITO:
      return {
        ...state,
        instructores: action.payload,
        loadingInstructores: true,
      };
    case INSTRUCTORES_ERROR:
      return { ...state, loadingInstructores: false };
    case CURSOS_LOADING:
      return { ...state, loadingCursos: false };
    case CURSOS_EXITO:
      return {
        ...state,
        cursos: action.payload,
        loadingCursos: true,
      };
    case CURSOS_ERROR:
      return { ...state, loadingCursos: false };
    case POSICIONES_LOADING:
      return { ...state, loadingPosiciones: false };
    case POSICIONES_EXITO:
      return {
        ...state,
        posiciones: action.payload,
        loadingPosiciones: true,
      };
    case POSICIONES_ERROR:
      return { ...state, loadingPosiciones: false };
    case TIPO_ACTIVIDAD_DOCENTE_LOADING:
      return { ...state, loadingTipoActividadDocente: false };
    case TIPO_ACTIVIDAD_DOCENTE_EXITO:
      return {
        ...state,
        tipoActividadDocente: action.payload,
        loadingTipoActividadDocente: true,
      };
    case TIPO_ACTIVIDAD_DOCENTE_ERROR:
      return { ...state, loadingTipoActividadDocente: false };
    case MAESTRO_ACTIVIDADES_LOADING:
      return { ...state, loadingMaestroActividades: false };
    case MAESTRO_ACTIVIDADES_EXITO:
      return {
        ...state,
        maestroActividades: action.payload,
        loadingMaestroActividades: true,
      };
    case MAESTRO_ACTIVIDADES_ERROR:
      return { ...state, loadingMaestroActividades: false };
    case MATERIAS_LOADING:
      return { ...state, loadingMaterias: false };
    case MATERIAS_EXITO:
      return {
        ...state,
        materias: action.payload,
        loadingMaterias: true,
      };
    case MATERIAS_ERROR:
      return { ...state, loadingMaterias: false };
    case CARRERAS_LOADING:
      return { ...state, loadingCarreras: false };
    case CARRERAS_EXITO:
      return {
        ...state,
        carreras: action.payload,
        loadingCarreras: true,
      };
    case CARRERAS_ERROR:
      return { ...state, loadingCarreras: false };
    case AREAS_DISCIPLINAR_LOADING:
      return { ...state, loadingAreasDisciplinares: false };
    case AREAS_DISCIPLINAR_EXITO:
      return {
        ...state,
        areasDisciplinares: action.payload,
        loadingAreasDisciplinares: true,
      };
    case AREAS_DISCIPLINAR_ERROR:
      return { ...state, loadingAreasDisciplinares: false };
    case GRADOS_ACADEMICOS_LOADING:
      return { ...state, loadingGradosAcademicos: false };
    case GRADOS_ACADEMICOS_EXITO:
      return {
        ...state,
        gradosAcademicos: action.payload,
        loadingGradosAcademicos: true,
      };
    case GRADOS_ACADEMICOS_ERROR:
      return { ...state, loadingGradosAcademicos: false };
      case SUBDISIPLINAS_LOADING:
        return { ...state, loadingSubdisciplinas: false };
      case SUBDISIPLINAS_EXITO:
        return {
          ...state,
          subdisciplinas: action.payload,
          loadingSubdisciplinas: true,
        };
      case SUBDISIPLINAS_ERROR:
        return { ...state, loadingSubdisciplinas: false };
    default:
      return { ...state };
  }
}

export const fetchPuestos = (token) => async (dispatch) => {
  dispatch({
    type: PUESTOS_LOADING,
  });

  try {
    const entidad = "new_cargos";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
        <entity name="new_cargo">
          <attribute name="new_name" />
          <attribute name="createdon" />
          <attribute name="new_cargoid" />
          <order attribute="new_name" descending="false" />
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
      type: PUESTOS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PUESTOS_ERROR,
    });
  }
};

export const fetchPaises = (token) => async (dispatch) => {
  dispatch({
    type: PAISES_LOADING,
  });

  try {
    const entidad = "new_paises";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_pais">
      <attribute name="new_paisid" />
      <attribute name="new_name" />
      <attribute name="createdon" />
      <order attribute="new_name" descending="false" />
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
      type: PAISES_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PAISES_ERROR,
    });
  }
};

export const fetchProvincias = (token) => async (dispatch) => {
  dispatch({
    type: PROVINCIAS_LOADING,
  });

  try {
    const entidad = "new_provincias";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_provincia">
        <attribute name="new_provinciaid" />
        <attribute name="new_name" />
        <attribute name="createdon" />
        <order attribute="new_name" descending="false" />
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
      type: PROVINCIAS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROVINCIAS_ERROR,
    });
  }
};

export const fetchLocalidades = (token) => async (dispatch) => {
  dispatch({
    type: LOCALIDADES_LOADING,
  });

  try {
    const entidad = "new_localidads";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_localidad">
        <attribute name="new_localidadid" />
        <attribute name="new_name" />
        <attribute name="createdon" />
        <order attribute="new_name" descending="false" />
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
      type: LOCALIDADES_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LOCALIDADES_ERROR,
    });
  }
};

export const fetchUnidadesFuncionales = (token) => async (dispatch) => {
  dispatch({
    type: UNIDADES_FUNCIONALES_LOADING,
  });

  try {
    const entidad = "new_unidadesfuncionaleses";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_unidadesfuncionales">
        <attribute name="new_unidadesfuncionalesid" />
        <attribute name="new_name" />
        <attribute name="createdon" />
        <order attribute="new_name" descending="false" />
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
      type: UNIDADES_FUNCIONALES_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UNIDADES_FUNCIONALES_ERROR,
    });
  }
};

export const fetchUnidadesOrganigrama = (token) => async (dispatch) => {
  dispatch({
    type: UNIDADES_ORGANIGRAMA_LOADING,
  });

  try {
    const entidad = "new_unidadorganigramas";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_unidadorganigrama">
        <attribute name="new_unidadorganigramaid" />
        <attribute name="new_name" />
        <attribute name="createdon" />
        <order attribute="new_name" descending="false" />
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
      type: UNIDADES_ORGANIGRAMA_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UNIDADES_ORGANIGRAMA_ERROR,
    });
  }
};

export const fetchCategorias = (token) => async (dispatch) => {
  dispatch({
    type: CATEGORIAS_LOADING,
  });

  try {
    const entidad = "new_categoriasalarials";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_categoriasalarial">
      <attribute name="new_name" />
      <attribute name="new_categoriaconvenio" />
      <attribute name="new_categoriasalarialid" />
      <order attribute="new_name" descending="false" />
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
      type: CATEGORIAS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIAS_ERROR,
    });
  }
};

export const fetchConvenios = (token) => async (dispatch) => {
  dispatch({
    type: CONVENIOS_LOADING,
  });

  try {
    const entidad = "new_convenios";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_convenio">
        <attribute name="new_convenioid" />
        <attribute name="new_name" />
        <attribute name="createdon" />
        <order attribute="new_name" descending="false" />
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
      type: CONVENIOS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CONVENIOS_ERROR,
    });
  }
};

export const fetchEmpresas = (token) => async (dispatch) => {
  dispatch({
    type: EMPRESAS_LOADING,
  });

  try {
    const entidad = "new_empresas";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_empresa">
      <attribute name="new_empresaid" />
      <attribute name="new_name" />
      <attribute name="createdon" />
      <order attribute="new_name" descending="false" />
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
      type: EMPRESAS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: EMPRESAS_ERROR,
    });
  }
};

export const fetchPeriodos = (token) => async (dispatch) => {
  dispatch({
    type: PERIODOS_LOADING,
  });

  try {
    const entidad = "new_periodos";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_periodo">
      <attribute name="new_periodoid" />
      <attribute name="new_name" />
      <attribute name="createdon" />
      <order attribute="new_name" descending="false" />
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
      type: PERIODOS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PERIODOS_ERROR,
    });
  }
};

export const fetchRelevadoPor = (token) => async (dispatch) => {
  dispatch({
    type: RELEVADOPOR_LOADING,
  });

  try {
    const entidad = "systemusers";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="systemuser">
      <attribute name="businessunitid" />
      <attribute name="fullname" />
      <attribute name="systemuserid" />
      <order attribute="fullname" descending="false" />
      <filter type="and">
        <condition attribute="fullname" operator="ne" value="SYSTEM" />
        <condition attribute="fullname" operator="ne" value="INTEGRATION" />
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
      type: RELEVADOPOR_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: RELEVADOPOR_ERROR,
    });
  }
};

export const fetchTemplateEncuesta = (token) => async (dispatch) => {
  dispatch({
    type: TEMPLATE_ENCUESTA_LOADING,
  });

  try {
    const entidad = "new_templatedeencuestas";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_templatedeencuesta">
      <attribute name="new_name" />
      <attribute name="new_tipodeencuesta" />
      <attribute name="new_templatedeencuestaid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: TEMPLATE_ENCUESTA_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TEMPLATE_ENCUESTA_ERROR,
    });
  }
};

export const fetchEjes = (token) => async (dispatch) => {
  dispatch({
    type: EJES_LOADING,
  });

  try {
    const entidad = "new_ejes";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_eje">
      <attribute name="new_ejeid" />
      <attribute name="new_name" />
      <attribute name="createdon" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: EJES_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: EJES_ERROR,
    });
  }
};

export const fetchMaestroCursos = (token) => async (dispatch) => {
  dispatch({
    type: MAESTRO_CURSO_LOADING,
  });

  try {
    const entidad = "new_maestrodecursos";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_maestrodecurso">
      <attribute name="new_name" />
      <attribute name="new_maestrodecursoid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: MAESTRO_CURSO_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MAESTRO_CURSO_ERROR,
    });
  }
};

export const fetchProgramas = (token) => async (dispatch) => {
  dispatch({
    type: PROGRAMAS_LOADING,
  });

  try {
    const entidad = "new_programas";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_programa">
      <attribute name="new_name" />
      <attribute name="new_programaid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: PROGRAMAS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROGRAMAS_ERROR,
    });
  }
};

export const fetchModalidadDictado = (token) => async (dispatch) => {
  dispatch({
    type: MODALIDAD_DICTADO_LOADING,
  });

  try {
    const entidad = "new_modalidaddedictados";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_modalidaddedictado">
      <attribute name="new_name" />
      <attribute name="new_modalidaddedictadoid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: MODALIDAD_DICTADO_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MODALIDAD_DICTADO_ERROR,
    });
  }
};

export const fetchDivisas = (token) => async (dispatch) => {
  dispatch({
    type: DIVISAS_LOADING,
  });

  try {
    const entidad = "transactioncurrencies";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="transactioncurrency">
      <attribute name="transactioncurrencyid" />
      <attribute name="currencyname" />
      <attribute name="isocurrencycode" />
      <attribute name="currencysymbol" />
      <attribute name="exchangerate" />
      <attribute name="currencyprecision" />
      <order attribute="currencyname" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: DIVISAS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: DIVISAS_ERROR,
    });
  }
};

export const fetchSolicitudesFormacion = (token) => async (dispatch) => {
  dispatch({
    type: SOLICITUDES_FORMACION_LOADING,
  });

  try {
    const entidad = "new_requerimientodecapacitacions";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_requerimientodecapacitacion">
      <attribute name="new_name" />
      <attribute name="new_requerimientodecapacitacionid" />
      <order attribute="new_name" descending="false" />
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
      type: SOLICITUDES_FORMACION_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SOLICITUDES_FORMACION_ERROR,
    });
  }
};

export const fetchPlanesFormacion = (token) => async (dispatch) => {
  dispatch({
    type: PLANES_FORMACION_LOADING,
  });

  try {
    const entidad = "new_plandecapacitacions";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_plandecapacitacion">
      <attribute name="new_name" />
      <attribute name="new_plandecapacitacionid" />
      <order descending="false" attribute="new_anio" />
      <order attribute="new_celula" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: PLANES_FORMACION_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PLANES_FORMACION_ERROR,
    });
  }
};

export const fetchEventosCapacitacionSelect = (token) => async (dispatch) => {
  dispatch({
    type: EVENTOS_CAPACITACION_SELECT_LOADING,
  });

  try {
    const entidad = "new_eventodecapacitacions";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
        <entity name="new_eventodecapacitacion">
          <attribute name="new_name" />
          <attribute name="new_eventodecapacitacionid" />
          <order attribute="new_name" descending="false" />
          <filter type="and">
            <condition attribute="statecode" operator="eq" value="0" />
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
      type: EVENTOS_CAPACITACION_SELECT_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: EVENTOS_CAPACITACION_SELECT_ERROR,
    });
  }
};

export const fetchEmpleadosSelect = (token) => async (dispatch) => {
  dispatch({
    type: EMPLEADOS_LOADING,
  });

  try {
    const entidad = "new_empleados";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_empleado">
      <attribute name="new_name" />>
      <attribute name="new_empleadoid" />
      <order attribute="new_numerolegajo" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: EMPLEADOS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: EMPLEADOS_ERROR,
    });
  }
};

export const fetchPropietarios = (token) => async (dispatch) => {
  dispatch({
    type: PROPIETARIOS_LOADING,
  });

  try {
    const entidad = "systemusers";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="systemuser">
      <attribute name="businessunitid" />
      <attribute name="fullname" />
      <attribute name="systemuserid" />
      <order attribute="fullname" descending="false" />
      <filter type="and">
        <condition attribute="fullname" operator="ne" value="SYSTEM" />
        <condition attribute="fullname" operator="ne" value="INTEGRATION" />
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
      type: PROPIETARIOS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROPIETARIOS_ERROR,
    });
  }
};

export const fetchInstructores = (token) => async (dispatch) => {
  dispatch({
    type: INSTRUCTORES_LOADING,
  });

  try {
    const entidad = "new_instructoreses";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_instructores">
      <attribute name="new_name" />
      <attribute name="new_instructoresid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: INSTRUCTORES_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTORES_ERROR,
    });
  }
};

export const fetchCursos = (token) => async (dispatch) => {
  dispatch({
    type: CURSOS_LOADING,
  });

  try {
    const entidad = "new_cursos";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_curso">
      <attribute name="new_name" />
      <attribute name="new_cursoid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
      </filter>
      <link-entity name="new_programa" from="new_programaid" to="new_programa" visible="false" link-type="outer" alias="programa">
        <attribute name="new_eje" />
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
      type: CURSOS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CURSOS_ERROR,
    });
  }
};

export const fetchPosiciones = (token) => async (dispatch) => {
  dispatch({
    type: POSICIONES_LOADING,
  });

  try {
    const entidad = "new_posicions";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_posicion">
      <attribute name="new_name" />
      <attribute name="new_posicionid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: POSICIONES_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: POSICIONES_ERROR,
    });
  }
};

export const fetchTipoActividadDocente = (token) => async (dispatch) => {
  dispatch({
    type: TIPO_ACTIVIDAD_DOCENTE_LOADING,
  });

  try {
    const entidad = "new_tipodeactividads";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_tipodeactividad">
      <attribute name="new_name" />
      <attribute name="new_tipodeactividadid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: TIPO_ACTIVIDAD_DOCENTE_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TIPO_ACTIVIDAD_DOCENTE_ERROR,
    });
  }
};

export const fetchMaestroActividades = (token) => async (dispatch) => {
  dispatch({
    type: MAESTRO_ACTIVIDADES_LOADING,
  });

  try {
    const entidad = "new_maestrodeactividadeses";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_maestrodeactividades">
      <attribute name="new_name" />
      <attribute name="new_maestrodeactividadesid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: MAESTRO_ACTIVIDADES_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MAESTRO_ACTIVIDADES_ERROR,
    });
  }
};

export const fetchMaterias = (token) => async (dispatch) => {
  dispatch({
    type: MATERIAS_LOADING,
  });

  try {
    const entidad = "new_materias";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_materia">
      <attribute name="new_name" />
      <attribute name="new_materiaid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: MATERIAS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MATERIAS_ERROR,
    });
  }
};

export const fetchCarreras = (token) => async (dispatch) => {
  dispatch({
    type: CARRERAS_LOADING,
  });

  try {
    const entidad = "new_carrerases";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_carreras">
      <attribute name="new_name" />
      <attribute name="new_carrerasid" />
      <order attribute="new_name" descending="false" />
      <order attribute="new_codigo" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: CARRERAS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CARRERAS_ERROR,
    });
  }
};

export const fetchAreasDisciplinar = (token) => async (dispatch) => {
  dispatch({
    type: AREAS_DISCIPLINAR_LOADING,
  });

  try {
    const entidad = "new_areadisciplinars";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_areadisciplinar">
      <attribute name="new_areadisciplinarid" />
      <attribute name="new_name" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: AREAS_DISCIPLINAR_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AREAS_DISCIPLINAR_ERROR,
    });
  }
};

export const fetchGradosAcademicos = (token) => async (dispatch) => {
  dispatch({
    type: GRADOS_ACADEMICOS_LOADING,
  });

  try {
    const entidad = "new_gradoacadmicos";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_gradoacadmico">
      <attribute name="new_name" />
      <attribute name="new_gradoacadmicoid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
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
      type: GRADOS_ACADEMICOS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GRADOS_ACADEMICOS_ERROR,
    });
  }
};

export const fetchSubdisciplina = (token) => async (dispatch) => {
  dispatch({
    type: SUBDISIPLINAS_LOADING,
  });

  try {
    const entidad = "new_subdisciplinas";
    const fetch = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_subdisciplina">
      <attribute name="new_name" />
      <attribute name="new_disciplina" />
      <attribute name="new_subdisciplinaid" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0" />
      </filter>
      <link-entity name="new_disciplina" from="new_disciplinaid" to="new_disciplina" visible="false" link-type="outer" alias="disciplina">
        <attribute name="new_areadisciplinar" />
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
      type: SUBDISIPLINAS_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SUBDISIPLINAS_ERROR,
    });
  }
};
