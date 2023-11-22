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
  loadingLicencias: false,
  licencias: [],
  loadingLicenciasCalendario: false,
  licenciasCalendario: [],
  resultadoNuevaLicencias: "",
  resultadoEditarLicencias: "",
  resultadoEliminarLicencias: "",
};

const GET_LICENCIAS_LOADING = "GET_LICENCIAS_LOADING";
const GET_LICENCIAS_EXITO = "GET_LICENCIAS_EXITO";
const GET_LICENCIAS_ERROR = "GET_LICENCIAS_ERROR";

const NUEVA_LICENCIA_LOADING = "NUEVA_LICENCIA_LOADING";
const NUEVA_LICENCIA_EXITO = "NUEVA_LICENCIA_EXITO";
const NUEVA_LICENCIA_ERROR = "NUEVA_LICENCIA_ERROR";

const EDITAR_LICENCIA_LOADING = "EDITAR_LICENCIA_LOADING";
const EDITAR_LICENCIA_EXITO = "EDITAR_LICENCIA_EXITO";
const EDITAR_LICENCIA_ERROR = "EDITAR_LICENCIA_ERROR";

const ELIMINAR_LICENCIA_LOADING = "ELIMINAR_LICENCIA_LOADING";
const ELIMINAR_LICENCIA_EXITO = "ELIMINAR_LICENCIA_EXITO";
const ELIMINAR_LICENCIA_ERROR = "ELIMINAR_LICENCIA_ERROR";

const GET_LICENCIAS_CALENDARIO_LOADING = "GET_LICENCIAS_CALENDARIO_LOADING";
const GET_LICENCIAS_CALENDARIO_EXITO = "GET_LICENCIAS_CALENDARIO_EXITO";
const GET_LICENCIAS_CALENDARIO_ERROR = "GET_LICENCIAS_CALENDARIO_ERROR";

export default function licenciasReducers(state = dataInicial, action) {
  switch (action.type) {
    case GET_LICENCIAS_LOADING:
      return { ...state, loadingLicencias: action.loading };
    case GET_LICENCIAS_EXITO:
      return {
        ...state,
        licencias: action.payload,
        loadingLicencias: action.loading,
      };
    case GET_LICENCIAS_ERROR:
      return { ...state, loadingLicencias: action.loading };
    case GET_LICENCIAS_CALENDARIO_LOADING:
      return { ...state, loadingLicenciasCalendario: action.loading };
    case GET_LICENCIAS_CALENDARIO_EXITO:
      return {
        ...state,
        licenciasCalendario: action.payload,
        loadingLicenciasCalendario: action.loading,
      };
    case GET_LICENCIAS_CALENDARIO_ERROR:
      return { ...state, loadingLicenciasCalendario: action.loading };
    case NUEVA_LICENCIA_LOADING:
      return { ...state, resultadoNuevaLicencias: action.resultado };
    case NUEVA_LICENCIA_EXITO:
      return { ...state, resultadoNuevaLicencias: action.resultado };
    case NUEVA_LICENCIA_ERROR:
      return { ...state, resultadoNuevaLicencias: action.resultado };
    case EDITAR_LICENCIA_LOADING:
      return { ...state, resultadoEditarLicencias: action.resultado };
    case EDITAR_LICENCIA_EXITO:
      return { ...state, resultadoEditarLicencias: action.resultado };
    case EDITAR_LICENCIA_ERROR:
      return { ...state, resultadoEditarLicencias: action.resultado };
    case ELIMINAR_LICENCIA_LOADING:
      return { ...state, resultadoEliminarLicencias: action.resultado };
    case ELIMINAR_LICENCIA_EXITO:
      return { ...state, resultadoEliminarLicencias: action.resultado };
    case ELIMINAR_LICENCIA_ERROR:
      return { ...state, resultadoEliminarLicencias: action.resultado };
    default:
      return { ...state };
  }
}

export const getLicencias = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_LICENCIAS_LOADING,
    loading: false,
  });
  if (!empleadoid || !token) {
    return;
  } else {
    const entidad = "new_licencias";
    const fetchXML = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
     <entity name='new_licencia'>
       <attribute name='new_licenciaid' />
       <attribute name='new_name' />
       <attribute name='createdon' />
       <attribute name='new_vacaciones' />
       <attribute name='owningbusinessunit' />
       <attribute name='new_tipodelicencia' />
       <attribute name='statuscode' />
       <attribute name='new_puestodelempleado' />
       <attribute name='new_licenciajustificada' />
       <attribute name='new_licenciadetipovacaciones' />
       <attribute name='new_fechahasta' />
       <attribute name='new_fechadesde' />
       <attribute name='new_fechadesolicitud' />
       <attribute name='statecode' />
       <attribute name='new_empresa' />
       <attribute name='new_empleadoporempres' />
       <attribute name='new_empleado' />
       <attribute name='new_diassolicitados' />
       <attribute name='new_diashabilessolicitados' />
       <attribute name='new_comentarios' />
       <attribute name='new_cantidadhoraslicencia' />
       <attribute name='new_aprobacionsupervisor' />
       <attribute name='new_vacaciones' />
       <attribute name='new_horahasta' />
       <attribute name='new_horadesde' />
       <order attribute='createdon' descending='true' />
       <filter type='and'>
         <condition attribute='new_empleado' operator='eq' uitype='new_empleado' value='${empleadoid}' />
         <condition attribute='statecode' operator='eq' value='0' />
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
        type: GET_LICENCIAS_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_LICENCIAS_ERROR,
        loading: true,
      });
    }
  }
};

export const getLicenciasCalendario = (token) => async (dispatch) => {
  dispatch({
    type: GET_LICENCIAS_CALENDARIO_LOADING,
    loading: false,
  });

  if (!token) {
    return;
  } else {
    const entidad = "new_licencias";
    const fetchXML = `
        <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
          <entity name='new_licencia'>
            <attribute name='new_licenciaid' />
            <attribute name='new_name' />
            <attribute name='createdon' />
            <attribute name='new_fechahasta' />
            <attribute name='new_fechadesde' />
            <attribute name='new_tipodelicencia' />
            <attribute name='new_empleado' />
            <attribute name='owningbusinessunit' />
            <attribute name='statuscode' />
            <attribute name='new_puestodelempleado' />
            <attribute name='new_licenciajustificada' />
            <attribute name='new_licenciadetipovacaciones' />
            <attribute name='new_fechadesolicitud' />
            <attribute name='statecode' />
            <attribute name='new_empresa' />
            <attribute name='new_empleadoporempres' />
            <attribute name='new_diassolicitados' />
            <attribute name='new_diashabilessolicitados' />
            <attribute name='new_comentarios' />
            <attribute name='new_cantidadhoraslicencia' />
            <attribute name='new_aprobacionsupervisor' />
            <attribute name='new_vacaciones' />
            <attribute name='new_horahasta' />
            <attribute name='new_horadesde' />
            <order attribute='new_name' descending='false' />
            <filter type='and'>
              <condition attribute='statuscode' operator='eq' value='100000000' />
            </filter>
          </entity>
        </fetch>
      `;

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
        type: GET_LICENCIAS_CALENDARIO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_LICENCIAS_CALENDARIO_ERROR,
        loading: true,
      });
    }
  }
};

export const newLicencia = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: NUEVA_LICENCIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token.length > 0) {
      axios
        .post(
          `${UrlApi}api/hrfactors/licencia`,
          {
            new_empleado: empleadoid,
            new_tipodelicencia: datos?.tipoLicenciaSelect.value,
            new_cantidadhoraslicencia: datos.cantidadHorasLicencia ? Number(datos.cantidadHorasLicencia) : 0,
            new_fechadesde: datos.fechaDesdeModal ? moment(datos.fechaDesdeModal).format("YYYY-MM-DD") : "",
            new_fechahasta: datos.fechaHastaModal ? moment(datos.fechaHastaModal).format("YYYY-MM-DD") : "",
            new_fechadesolicitud: datos.fechaDeSolicitud ? moment(datos.fechaDeSolicitud).format("YYYY-MM-DD") : "",
            new_horadesde: datos.horadesdeSelect?.value ? Number(datos.horadesdeSelect.value) : 0,
            new_horahasta: datos.horaHastaSelect?.value ? Number(datos.horaHastaSelect.value) : 0,
            new_comentarios: datos.comentarios ? datos.comentarios : "",
            new_vacaciones: datos.vacaciones?.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: NUEVA_LICENCIA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Licencia cargada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: NUEVA_LICENCIA_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const editarLicencias = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_LICENCIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .put(
          `${UrlApi}api/hrfactors/licencia`,
          {
            new_licenciaid: datos.id,
            new_empleado: empleadoid,
            new_tipodelicencia: datos?.tipoLicenciaSelect.value,
            new_cantidadhoraslicencia: datos.cantidadDeHoras ? Number(datos.cantidadDeHoras) : 0,
            new_fechadesde: datos.fechaDesdeModal ? moment(datos.fechaDesdeModal).format("YYYY-MM-DD") : "",
            new_fechahasta: datos.fechaHastaModal ? moment(datos.fechaHastaModal).format("YYYY-MM-DD") : "",
            new_fechadesolicitud: datos.fechaDeSolicitud ? moment(datos.fechaDeSolicitud).format("YYYY-MM-DD") : "",
            new_horadesde: datos.horadesdeSelect?.value ? Number(datos.horadesdeSelect.value) : 0,
            new_horahasta: datos.horaHastaSelect?.value ? Number(datos.horaHastaSelect.value) : 0,
            new_comentarios: datos.comentarios,
            new_vacaciones: datos?.vacaciones.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_LICENCIA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Licencia editada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: EDITAR_LICENCIA_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const eliminarLicencias = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_LICENCIA_LOADING,
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

  const inactivarLicencia = () =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(`${UrlApi}api/hrfactors/licencia`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_licenciaid: id,
          },
        });
        dispatch({
          type: ELIMINAR_LICENCIA_EXITO,
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
      inactivarLicencia,
      {
        success: "Proceso exitoso",
        error: {
          render({ error }) {
            return `Error al eliminar la licencia`;
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
        type: ELIMINAR_LICENCIA_ERROR,
        resultado: "ERROR",
      });
    });
};
