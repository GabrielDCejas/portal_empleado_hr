import axios from "axios";
import { toast } from "react-toastify";

import moment from "moment/moment";
import { UrlApi } from "@/keys";

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

const dataInicial = {
  loadingRequerimientoPersonal: false,
  requerimientoPersonal: [],
  loadingCargarRequerimiento: "",
  resultadoCargarRequerimiento: "",
  loadingEditarRequerimiento: "",
  resultadoEditarRequerimiento: "",
  loadingEliminarRequerimiento: "",
  resultadoEliminarRequerimiento: "",
};

const GET_REQUERIMIENTO_PERSONAL_LOADING = "GET_REQUERIMIENTO_PERSONAL_LOADING";
const GET_REQUERIMIENTO_PERSONAL_EXITO = "GET_REQUERIMIENTO_PERSONAL_EXITO";
const GET_REQUERIMIENTO_PERSONAL_ERROR = "GET_REQUERIMIENTO_PERSONAL_ERROR";

const CARGAR_REQUERIMIENTO_PERSONAL_LOADING = "CARGAR_REQUERIMIENTO_PERSONAL_LOADING";
const CARGAR_REQUERIMIENTO_PERSONAL_EXITO = "CARGAR_REQUERIMIENTO_PERSONAL_EXITO";
const CARGAR_REQUERIMIENTO_PERSONAL_ERROR = "CARGAR_REQUERIMIENTO_PERSONAL_ERROR";

const EDITAR_REQUERIMIENTO_PERSONAL_LOADING = "EDITAR_REQUERIMIENTO_PERSONAL_LOADING";
const EDITAR_REQUERIMIENTO_PERSONAL_EXITO = "EDITAR_REQUERIMIENTO_PERSONAL_EXITO";
const EDITAR_REQUERIMIENTO_PERSONAL_ERROR = "EDITAR_REQUERIMIENTO_PERSONAL_ERROR";

const ELIMINAR_REQUERIMIENTO_PERSONAL_LOADING = "ELIMINAR_REQUERIMIENTO_PERSONAL_LOADING";
const ELIMINAR_REQUERIMIENTO_PERSONAL_EXITO = "ELIMINAR_REQUERIMIENTO_PERSONAL_EXITO";
const ELIMINAR_REQUERIMIENTO_PERSONAL_ERROR = "ELIMINAR_REQUERIMIENTO_PERSONAL_ERROR";

export default function solicitudesReducers(state = dataInicial, action) {
  switch (action.type) {
    case GET_REQUERIMIENTO_PERSONAL_LOADING:
      return { ...state, loadingRequerimientoPersonal: action.loading };
    case GET_REQUERIMIENTO_PERSONAL_EXITO:
      return {
        ...state,
        requerimientoPersonal: action.payload,
        loadingRequerimientoPersonal: action.loading,
      };
    case GET_REQUERIMIENTO_PERSONAL_ERROR:
      return { ...state, loadingRequerimientoPersonal: action.loading };
    case CARGAR_REQUERIMIENTO_PERSONAL_LOADING:
      return { ...state, loadingCargarRequerimiento: action.resultado };
    case CARGAR_REQUERIMIENTO_PERSONAL_EXITO:
      return {
        ...state,
        resultadoCargarRequerimiento: action.payload,
        loadingCargarRequerimiento: action.resultado,
      };
    case CARGAR_REQUERIMIENTO_PERSONAL_ERROR:
      return { ...state, loadingCargarRequerimiento: action.resultado };
    case EDITAR_REQUERIMIENTO_PERSONAL_LOADING:
      return { ...state, loadingEditarRequerimiento: action.resultado };
    case EDITAR_REQUERIMIENTO_PERSONAL_EXITO:
      return {
        ...state,
        resultadoEditarRequerimiento: action.payload,
        loadingEditarRequerimiento: action.resultado,
      };
    case EDITAR_REQUERIMIENTO_PERSONAL_ERROR:
      return { ...state, loadingEditarRequerimiento: action.resultado };
    case ELIMINAR_REQUERIMIENTO_PERSONAL_LOADING:
      return { ...state, loadingEliminarRequerimiento: action.resultado };
    case ELIMINAR_REQUERIMIENTO_PERSONAL_EXITO:
      return {
        ...state,
        resultadoEliminarRequerimiento: action.payload,
        loadingEliminarRequerimiento: action.resultado,
      };
    case ELIMINAR_REQUERIMIENTO_PERSONAL_ERROR:
      return { ...state, loadingEliminarRequerimiento: action.resultado };
    default:
      return { ...state };
  }
}

export const getRequerimientoPersonal = (token) => async (dispatch) => {
  dispatch({
    type: GET_REQUERIMIENTO_PERSONAL_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_solicituddecandidatos";
    const fetchXML = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_solicituddecandidato">
      <attribute name="statuscode" />
      <attribute name="new_puesto" />
      <attribute name="new_empleado" />
      <attribute name="createdon" />
      <attribute name="new_tipodebusqueda" />
      <attribute name="new_solicituddepuestonuevo" />
      <attribute name="new_solicituddecandidatoid" />
      <attribute name="new_vacante" />
      <attribute name="new_requerimientosdelperfilacontratar" />
      <attribute name="new_requerimientodelperfilacontratar" />
      <attribute name="new_proyecto" />
      <attribute name="new_proyectos" />
      <attribute name="new_prioridad" />
      <attribute name="new_perfil" />
      <attribute name="new_modalidaddecontratacin" />
      <attribute name="new_jornadadetrabajo" />
      <attribute name="new_fechaidealdeinicio" />
      <attribute name="new_duracindelacontratacin" />
      <attribute name="new_condicinespecialesdesegurodeaccidente" />
      <attribute name="new_comentariosgenerales" />
      <attribute name="new_cliente" />
      <attribute name="new_cantidaddepersonasacargo" />
      <attribute name="new_cantidaddehorasmensuales" />
      <attribute name="new_busquedadepersonal" />
      <attribute name="new_beneficioadicional" />
      <attribute name="new_descripcionproyecto" />
      <attribute name="new_empleadoaprobador1" />
      <attribute name="new_aprobador1" />
      <attribute name="new_empleadosolicitante" />
        <order attribute="createdon" descending="true" />
        <filter type="and">
          <condition attribute="statecode" operator="eq" value="0" />
        </filter>
      </entity>
    </fetch>`;

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
        type: GET_REQUERIMIENTO_PERSONAL_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_REQUERIMIENTO_PERSONAL_ERROR,
        loading: true,
      });
    }
  }
};

export const enviarRequerimientoPersonal = (token, datos, empleadoid) => async (dispatch) => {
  dispatch({
    type: CARGAR_REQUERIMIENTO_PERSONAL_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .post(
          `${UrlApi}api/hroneclick/requerimientodepersonal`,
          {
            new_empleadosolicitante: empleadoid || "",
            new_cliente: datos?.clienteSelect?.value ? datos?.clienteSelect?.value : "",
            new_prioridad: datos?.prioridad?.value ? Number(datos?.prioridad?.value) : 0,
            new_puesto: datos?.puestoSelect?.value ? datos?.puestoSelect?.value : "",
            new_perfil: datos?.perfil ? datos?.perfil : "",
            new_proyectos: datos?.proyecto?.value ? datos?.proyecto?.value : "",
            new_vacante: datos?.vacante ? Number(datos?.vacante) : 0,
            new_cantidaddehorasmensuales: datos?.cantidad_mensuales ? Number(datos?.cantidad_mensuales) : 0,
            new_modalidaddecontratacin: datos?.modalidad_contratacion?.value
              ? Number(datos?.modalidad_contratacion?.value)
              : 0,
            new_duracindelacontratacin: datos?.duracion_contratacion_meses
              ? Number(datos?.duracion_contratacion_meses)
              : 0,
            new_jornadadetrabajo: datos?.jornada_trabajo?.value ? Number(datos?.jornada_trabajo?.value) : 0,
            new_fechaidealdeinicio: datos.fecha_inicio_contratacion
              ? moment(datos.fecha_inicio_contratacion).format("YYYY-MM-DD")
              : "",
            // statuscode: 0,
            new_descripcionproyecto: datos?.descripcion_proyecto ? datos?.descripcion_proyecto : "",
            new_requerimientodelperfilacontratar: datos?.requerimientos_perfil_contratar
              ? datos?.requerimientos_perfil_contratar
              : "",
            new_condicinespecialesdesegurodeaccidente: datos?.condiciones_especiales_seguro_accidentes
              ? datos?.condiciones_especiales_seguro_accidentes
              : "",
            new_beneficioadicional: datos?.beneficios_dicionales ? datos?.beneficios_dicionales : "",
            new_comentariosgenerales: datos?.comentarios_generales ? datos?.comentarios_generales : "",
            new_solicituddepuestonuevo: datos?.solicitud_nuevo_puesto?.value
              ? datos?.solicitud_nuevo_puesto?.value
              : "",
            new_empleadoaprobador1: datos?.aprobador?.value ? datos?.aprobador?.value : "",
            new_aprobador1: datos?.aprobacion?.value ? Number(datos?.aprobacion?.value) : 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: CARGAR_REQUERIMIENTO_PERSONAL_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Requerimiento de personal cargado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: CARGAR_REQUERIMIENTO_PERSONAL_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const editarRequerimientoPersonal = (token, datos, empleadoid) => async (dispatch) => {
  dispatch({
    type: EDITAR_REQUERIMIENTO_PERSONAL_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .put(
          `${UrlApi}api/hroneclick/requerimientodepersonal`,
          {
            new_solicituddecandidatoid: datos.id, 
            new_empleadosolicitante: empleadoid || "",
            new_cliente: datos?.clienteSelect?.value ? datos?.clienteSelect?.value : "",
            new_prioridad: datos?.prioridad?.value ? Number(datos?.prioridad?.value) : 0,
            new_puesto: datos?.puestoSelect?.value ? datos?.puestoSelect?.value : "",
            new_perfil: datos?.perfil ? datos?.perfil : "",
            new_proyectos: datos?.proyecto?.value ? datos?.proyecto?.value : "",
            new_vacante: datos?.vacante ? Number(datos?.vacante) : 0,
            new_cantidaddehorasmensuales: datos?.cantidad_mensuales ? Number(datos?.cantidad_mensuales) : 0,
            new_modalidaddecontratacin: datos?.modalidad_contratacion?.value
              ? Number(datos?.modalidad_contratacion?.value)
              : 0,
            new_duracindelacontratacin: datos?.duracion_contratacion_meses
              ? Number(datos?.duracion_contratacion_meses)
              : 0,
            new_jornadadetrabajo: datos?.jornada_trabajo?.value ? Number(datos?.jornada_trabajo?.value) : 0,
            new_fechaidealdeinicio: datos.fecha_inicio_contratacion
              ? moment(datos.fecha_inicio_contratacion).format("YYYY-MM-DD")
              : "",
            // statuscode: 0,
            new_descripcionproyecto: datos?.descripcion_proyecto ? datos?.descripcion_proyecto : "",
            new_requerimientodelperfilacontratar: datos?.requerimientos_perfil_contratar
              ? datos?.requerimientos_perfil_contratar
              : "",
            new_condicinespecialesdesegurodeaccidente: datos?.condiciones_especiales_seguro_accidentes
              ? datos?.condiciones_especiales_seguro_accidentes
              : "",
            new_beneficioadicional: datos?.beneficios_dicionales ? datos?.beneficios_dicionales : "",
            new_comentariosgenerales: datos?.comentarios_generales ? datos?.comentarios_generales : "",
            new_solicituddepuestonuevo: datos?.solicitud_nuevo_puesto?.value
              ? datos?.solicitud_nuevo_puesto?.value
              : "",
            new_empleadoaprobador1: datos?.aprobador?.value ? datos?.aprobador?.value : "",
            new_aprobador1: datos?.aprobacion?.value ? Number(datos?.aprobacion?.value) : 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_REQUERIMIENTO_PERSONAL_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Requerimiento de personal editado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: EDITAR_REQUERIMIENTO_PERSONAL_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const eliminarRequerimiento = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_REQUERIMIENTO_PERSONAL_LOADING,
    resultado: "LOADING",
  });
  const loadingToast = toast.loading("Cargando...", {
    position: "top-center",
    theme: "dark",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const inactivarRequerimiento = () =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(`${UrlApi}api/hroneclick/requerimientodepersonal`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_solicituddecandidatoid: id,
          },
        });
        dispatch({
          type: ELIMINAR_REQUERIMIENTO_PERSONAL_EXITO,
          resultado: "EXITO",
          payload: response.data,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });

  return toast
    .promise(
      inactivarRequerimiento,
      {
        success: "Proceso exitoso",
        error: {
          render({ error }) {
            return `Error al eliminar el requerimiento`;
          },
        },
      },
      {
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )
    .then(() => {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
    })
    .catch((error) => {
      dispatch({
        type: ELIMINAR_REQUERIMIENTO_PERSONAL_ERROR,
        resultado: "ERROR",
      });
    });
};
