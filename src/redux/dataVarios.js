import { UrlApi } from "@/keys";
import axios from "axios";

const dataInicial = {
  paises: [],
  localidades: [],
  resultadoPaises: false,
  provincias: [],
  resultadoProvincias: false,
  capacitaciones: [],
  loadingCapacitaciones: false,
  universidades: [],
  idiomas: [],
  empresas: [],
  puestos: [],
  carreras: [],
  parentescos: [],
  bancos: [],
  divisas: [],
  proyectos: [],
  tipoLicencias: [],
  organigrama: [],
  loadingOrganigrama: false,
  noticias: [],
  loadingNoticias: false,
  rolProyecto: [],
  loadingrolProyecto: false,
  periodos: [],
  loadingPeriodos: false,
  empleados: [],
  loadingEmpleados: false,
};

const GET_PAISES_LOADING = "GET_PAISES_LOADING";
const GET_PAISES = "GET_PAISES";
const GET_PAISES_ERROR = "GET_PAISES_ERROR";
const GET_LOCALIDADES_LOADING = "GET_LOCALIDADES_LOADING";
const GET_LOCALIDADES = "GET_LOCALIDADES";
const GET_LOCALIDADES_ERROR = "GET_LOCALIDADES_ERROR";
const GET_PROVINCIAS_LOADING = "GET_PROVINCIAS_LOADING";
const GET_PROVINCIAS = "GET_PROVINCIAS";
const GET_PROVINCIAS_ERROR = "GET_PROVINCIAS_ERROR";
const GET_CAPACITACION_LOADING = "GET_CAPACITACION_LOADING";
const GET_CAPACITACION = "GET_CAPACITACION";
const GET_CAPACITACION_ERROR = "GET_CAPACITACION_ERROR";
const GET_UNIVERSIDAD_LOADING = "GET_UNIVERSIDAD_LOADING";
const GET_UNIVERSIDAD = "GET_UNIVERSIDAD";
const GET_UNIVERSIDAD_ERROR = "GET_UNIVERSIDAD_ERROR";
const GET_IDIOMA_LOADING = "GET_IDIOMA_LOADING";
const GET_IDIOMA = "GET_IDIOMA";
const GET_IDIOMA_ERROR = "GET_IDIOMA_ERROR";
const GET_EMPRESAS_LOADING = "GET_EMPRESAS_LOADING";
const GET_EMPRESAS = "GET_EMPRESAS";
const GET_EMPRESAS_ERROR = "GET_EMPRESAS_ERROR";
const GET_PUESTOS_LOADING = "GET_PUESTOS_LOADING";
const GET_PUESTOS = "GET_PUESTOS";
const GET_PUESTOS_ERROR = "GET_PUESTOS_ERROR";
const GET_CARRERAS_LOADING = "GET_CARRERAS_LOADING";
const GET_CARRERAS_EXITO = "GET_CARRERAS_EXITO";
const GET_CARRERAS_ERROR = "GET_CARRERAS_ERROR";
const GET_PARENTESCO_LOADING = "GET_PARENTESCO_LOADING";
const GET_PARENTESCO = "GET_PARENTESCO";
const GET_PARENTESCO_ERROR = "GET_PARENTESCO_ERROR";
const GET_BANCOS_LOADING = "GET_BANCOS_LOADING";
const GET_BANCOS = "GET_BANCOS";
const GET_BANCOS_ERROR = "GET_BANCOS_ERROR";
const GET_DIVISAS_LOADING = "GET_DIVISAS_LOADING";
const GET_DIVISAS = "GET_DIVISAS";
const GET_DIVISAS_ERROR = "GET_DIVISAS_ERROR";
const GET_PROYECTOS_LOADING = "GET_PROYECTOS_LOADING";
const GET_PROYECTOS = "GET_PROYECTOS";
const GET_PROYECTOS_ERROR = "GET_PROYECTOS_ERROR";
const GET_TIPO_LICENCIA_LOADING = "GET_TIPO_LICENCIA_LOADING";
const GET_TIPO_LICENCIA = "GET_TIPO_LICENCIA";
const GET_TIPO_LICENCIA_ERROR = "GET_TIPO_LICENCIA_ERROR";
const GET_ORGANIGRAMA_LOADING = "GET_ORGANIGRAMA_LOADING";
const GET_ORGANIGRAMA_EXITO = "GET_ORGANIGRAMA_EXITO";
const GET_ORGANIGRAMA_ERROR = "GET_ORGANIGRAMA_ERROR";
const GET_NOTICIAS_LOADING = "GET_NOTICIAS_LOADING";
const GET_NOTICIAS_EXITO = "GET_NOTICIAS_EXITO";
const GET_NOTICIAS_ERROR = "GET_NOTICIAS_ERROR";
const GET_ROL_PROYECTO_LOADING = "GET_ROL_PROYECTO_LOADING";
const GET_ROL_PROYECTO_EXITO = "GET_ROL_PROYECTO_EXITO";
const GET_ROL_PROYECTO_ERROR = "GET_ROL_PROYECTO_ERROR";
const GET_PERIODOS_LOADING = "GET_PERIODOS_LOADING";
const GET_PERIODOS_EXITO = "GET_PERIODOS_EXITO";
const GET_PERIODOS_ERROR = "GET_PERIODOS_ERROR";
const GET_EMPLEADOS_LOADING = "GET_EMPLEADOS_LOADING";
const GET_EMPLEADOS_EXITO = "GET_EMPLEADOS_EXITO";
const GET_EMPLEADOS_ERROR = "GET_EMPLEADOS_ERROR";

export default function dataVariosReducers(state = dataInicial, action) {
  switch (action.type) {
    case GET_PAISES:
      return { ...state, paises: action.payload };
    case GET_LOCALIDADES:
      return { ...state, localidades: action.payload };
    case GET_PROVINCIAS:
      return { ...state, provincias: action.payload };
    case GET_CAPACITACION:
      return {
        ...state,
        capacitaciones: action.payload,
        loadingCapacitaciones: action.loading,
      };
    case GET_UNIVERSIDAD:
      return { ...state, universidades: action.payload };
    case GET_IDIOMA:
      return { ...state, idiomas: action.payload };
    case GET_EMPRESAS:
      return { ...state, empresas: action.payload };
    case GET_PUESTOS:
      return { ...state, puestos: action.payload };
    case GET_CARRERAS_LOADING:
      return { ...state, carreras: action.payload };
    case GET_CARRERAS_EXITO:
      return { ...state, carreras: action.payload };
    case GET_CARRERAS_ERROR:
      return { ...state, carreras: action.payload };
    case GET_PARENTESCO:
      return { ...state, parentescos: action.payload };
    case GET_BANCOS:
      return { ...state, bancos: action.payload };
    case GET_DIVISAS:
      return { ...state, divisas: action.payload };
    case GET_PROYECTOS:
      return { ...state, proyectos: action.payload };
    case GET_TIPO_LICENCIA:
      return { ...state, tipoLicencias: action.payload };
    case GET_ORGANIGRAMA_LOADING:
      return { ...state, loadingOrganigrama: action.loading };
    case GET_ORGANIGRAMA_EXITO:
      return {
        ...state,
        organigrama: action.payload,
        loadingOrganigrama: action.loading,
      };
    case GET_ORGANIGRAMA_ERROR:
      return { ...state, loadingOrganigrama: action.loading };
    case GET_NOTICIAS_LOADING:
      return { ...state, loadingNoticias: action.loading };
    case GET_NOTICIAS_EXITO:
      return {
        ...state,
        noticias: action.payload,
        loadingNoticias: action.loading,
      };
    case GET_NOTICIAS_ERROR:
      return { ...state, loadingNoticias: action.loading };
    case GET_ROL_PROYECTO_LOADING:
      return { ...state, loadingrolProyecto: action.loading };
    case GET_ROL_PROYECTO_EXITO:
      return {
        ...state,
        rolProyecto: action.payload,
        loadingrolProyecto: action.loading,
      };
    case GET_ROL_PROYECTO_ERROR:
      return { ...state, loadingrolProyecto: action.loading };
    case GET_PERIODOS_LOADING:
      return { ...state, loadingPeriodos: action.loading };
    case GET_PERIODOS_EXITO:
      return {
        ...state,
        periodos: action.payload,
        loadingPeriodos: action.loading,
      };
    case GET_PERIODOS_ERROR:
      return { ...state, loadingPeriodos: action.loading };
    case GET_EMPLEADOS_LOADING:
      return { ...state, loadingEmpleados: action.loading };
    case GET_EMPLEADOS_EXITO:
      return {
        ...state,
        empleados: action.payload,
        loadingEmpleados: action.loading,
      };
    case GET_EMPLEADOS_ERROR:
      return { ...state, loadingEmpleados: action.loading };
    default:
      return { ...state };
  }
}

export const getPaises = (token) => async (dispatch) => {
  dispatch({
    type: GET_PAISES_LOADING,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_paises";
    const fetchXML =
      "<fetch mapping='logical'>" +
      "<entity name='new_pais'>" +
      "<attribute name='new_paisid'/> " +
      "<attribute name='new_name'/> " +
      "<attribute name='createdon'/>" +
      "<order attribute ='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_PAISES,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PAISES_ERROR,
        loading: true,
      });
    }
  }
};

export const getLocalidades = (token) => async (dispatch) => {
  dispatch({
    type: GET_LOCALIDADES_LOADING,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_localidads";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_localidad'>" +
      "<attribute name='new_localidadid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_LOCALIDADES,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_LOCALIDADES_ERROR,
        loading: true,
      });
    }
  }
};

export const getProvincias = (token) => async (dispatch) => {
  dispatch({
    type: GET_PROVINCIAS_LOADING,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_provincias";
    const fetchXML =
      "<fetch mapping='logical'>" +
      "<entity name='new_provincia'>" +
      "<attribute name='new_provinciaid'/> " +
      "<attribute name='new_name'/> " +
      "<attribute name='createdon'/>" +
      "<order attribute ='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_PROVINCIAS,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PROVINCIAS_ERROR,
        loading: true,
      });
    }
  }
};

export const getCapacitacion = (token) => async (dispatch) => {
  dispatch({
    type: GET_CAPACITACION_LOADING,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_eventodecapacitacions";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_eventodecapacitacion'>" +
      "<attribute name='new_eventodecapacitacionid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_contenido' />" +
      "<attribute name='new_cantidadhorasparticipantes' />" +
      "<attribute name='new_fechainicio' />" +
      "<attribute name='new_fechafinalizacion' />" +
      "<attribute name='owningbusinessunit' />" +
      "<attribute name='new_tipodeevento' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='new_plandecapacitacion' />" +
      "<attribute name='new_objetivo' />" +
      "<attribute name='new_lugar' />" +
      "<attribute name='new_horahasta' />" +
      "<attribute name='new_horadesde' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_duracionenhoras' />" +
      "<attribute name='new_diascorridos' />" +
      "<attribute name='new_descripcion' />" +
      "<attribute name='new_curso' />" +
      "<attribute name='createdby' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_CAPACITACION,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAPACITACION_ERROR,
        loading: true,
      });
    }
  }
};

export const getUniversidades = (token) => async (dispatch) => {
  dispatch({
    type: GET_UNIVERSIDAD_LOADING,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_universidads";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_universidad'>" +
      "<attribute name='new_universidadid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_UNIVERSIDAD,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_UNIVERSIDAD_ERROR,
        loading: true,
      });
    }
  }
};

export const getIdiomas = (token) => async (dispatch) => {
  dispatch({
    type: GET_IDIOMA_LOADING,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_idiomas";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_idioma'>" +
      "<attribute name='new_idiomaid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_IDIOMA,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_IDIOMA_ERROR,
        loading: true,
      });
    }
  }
};

export const getEmpresas = (token) => async (dispatch) => {
  dispatch({
    type: GET_EMPRESAS_LOADING,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_empresas";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_empresa'>" +
      "<attribute name='new_empresaid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_EMPRESAS,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_EMPRESAS_ERROR,
        loading: true,
      });
    }
  }
};

export const getPuestos = (token) => async (dispatch) => {
  dispatch({
    type: GET_PUESTOS_LOADING,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_cargos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_cargo'>" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_cargoid' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_PUESTOS,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PUESTOS_ERROR,
        loading: true,
      });
    }
  }
};

export const getCarreras = (token) => async (dispatch) => {
  dispatch({
    type: GET_CARRERAS_LOADING,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_carreras";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_carrera'>" +
      "<attribute name='new_carreraid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_CARRERAS_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CARRERAS_ERROR,
        loading: true,
      });
    }
  }
};

export const getParentesco = (token) => async (dispatch) => {
  dispatch({
    type: GET_PARENTESCO_LOADING,
    loading: false,
  });

  if (!token) {
    return;
  } else {
    const entidad = "new_parentescos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_parentesco'>" +
      "<attribute name='new_parentescoid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_PARENTESCO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PARENTESCO_ERROR,
        loading: true,
      });
    }
  }
};

export const getBancos = (token) => async (dispatch) => {
  dispatch({
    type: GET_BANCOS_LOADING,
    loading: false,
  });

  if (!token) {
    return;
  } else {
    const entidad = "new_bancos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_banco'>" +
      "<attribute name='new_bancoid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='statuscode' operator='eq' value='1' />" +
      "</filter>" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_BANCOS,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_BANCOS_ERROR,
        loading: true,
      });
    }
  }
};

export const getDivisa = (token) => async (dispatch) => {
  dispatch({
    type: GET_DIVISAS_LOADING,
    loading: false,
  });

  if (!token) {
    return;
  } else {
    const entidad = "transactioncurrencies";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='transactioncurrency'>" +
      "<attribute name='transactioncurrencyid' />" +
      "<attribute name='currencyname' />" +
      "<attribute name='isocurrencycode' />" +
      "<attribute name='currencysymbol' />" +
      "<attribute name='exchangerate' />" +
      "<attribute name='currencyprecision' />" +
      "<order attribute='currencyname' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='statuscode' operator='eq' value='1' />" +
      "</filter>" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_DIVISAS,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DIVISAS_ERROR,
        loading: true,
      });
    }
  }
};

export const getProyectos = (token) => async (dispatch) => {
  dispatch({
    type: GET_PROYECTOS_LOADING,
    loading: false,
  });

  if (!token) {
    return;
  } else {
    const entidad = "new_proyectos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_proyecto'>" +
      "<attribute name='new_proyectoid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='statuscode' operator='eq' value='1' />" +
      "</filter>" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_PROYECTOS,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PROYECTOS_ERROR,
        loading: true,
      });
    }
  }
};

export const getTipoLicencia = (token) => async (dispatch) => {
  dispatch({
    type: GET_TIPO_LICENCIA_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_tipodelicencias";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_tipodelicencia'>" +
      "<attribute name='new_tipodelicenciaid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_TIPO_LICENCIA,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_TIPO_LICENCIA_ERROR,
        loading: true,
      });
    }
  }
};

export const getOrganigramas = (token) => async (dispatch) => {
  dispatch({
    type: GET_ORGANIGRAMA_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_cargos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_cargo'>" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_cargoid' />" +
      "<order attribute='new_name' descending='false' />" +
      "<link-entity name='new_unidadorganigrama' from='new_unidadorganigramaid' to='new_unidadorganizativageneral' link-type='inner' alias='organigrama'>" +
      "<attribute name='new_unidadorganigramaid' />" +
      "<attribute name='new_unidadsuperior' />" +
      "<attribute name='new_responsable' />" +
      "<attribute name='new_name' />" +
      "<attribute name='new_idunidadorganigrama' />" +
      "<filter type='and'>" +
      "<condition attribute='new_unidadorganigramaid' operator='not-null' />" +
      "</filter>" +
      "</link-entity>" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_ORGANIGRAMA_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ORGANIGRAMA_ERROR,
        loading: true,
      });
    }
  }
};

export const getNoticias = (token) => async (dispatch) => {
  dispatch({
    type: GET_NOTICIAS_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_noticiases";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_noticias'>" +
      "<attribute name='new_noticiasid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_descripcion' />" +
      "<attribute name='createdby' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_NOTICIAS_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_NOTICIAS_ERROR,
        loading: true,
      });
    }
  }
};

export const getRolProyecto = (token) => async (dispatch) => {
  dispatch({
    type: GET_ROL_PROYECTO_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_rolenelproyectos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_rolenelproyecto'>" +
      "<attribute name='new_rolenelproyectoid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_ROL_PROYECTO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ROL_PROYECTO_ERROR,
        loading: true,
      });
    }
  }
};

export const getRolPeriodos = (token) => async (dispatch) => {
  dispatch({
    type: GET_PERIODOS_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_periodos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_periodo'>" +
      "<attribute name='new_periodoid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_PERIODOS_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PERIODOS_ERROR,
        loading: true,
      });
    }
  }
};

export const getEmpleados = (token) => async (dispatch) => {
  dispatch({
    type: GET_EMPLEADOS_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_empleados";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_empleado'>" +
      "<attribute name='new_name' />" +
      "<attribute name='new_cuitcuil' />" +
      "<attribute name='new_correoelectronico' />" +
      "<attribute name='new_numerolegajo' />" +
      "<attribute name='new_empleadoid' />" +
      "<attribute name='new_proximocumpleanios' />" +
      "<order attribute='new_numerolegajo' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='statuscode' operator='eq' value='1' />" +
      "<condition attribute='new_fechanacimiento' operator='not-null' />" +
      "</filter>" +
      "</entity>" +
      "</fetch>";

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_EMPLEADOS_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_EMPLEADOS_ERROR,
        loading: true,
      });
    }
  }
};
