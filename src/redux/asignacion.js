import { UrlApi } from "@/keys";
import axios from "axios";
import { toast } from "react-toastify";

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
  asignaciones: [],
  loadingAsignaciones: false,
  resultadoNuevaAsignaciones: "",
  resultadoEditarAsignaciones: "",
  resultadoEliminarAsignaciones: "",
};

const GET_ASIGNACIONES_LOADING = "GET_ASIGNACIONES_LOADING";
const GET_ASIGNACIONES_EXITO = "GET_ASIGNACIONES_EXITO";
const GET_ASIGNACIONES_ERROR = "GET_ASIGNACIONES_ERROR";

const NUEVA_ASIGNACIONES_LOADING = "NUEVA_ASIGNACIONES_LOADING";
const NUEVA_ASIGNACIONES_EXITO = "NUEVA_ASIGNACIONES_EXITO";
const NUEVA_ASIGNACIONES_ERROR = "NUEVA_ASIGNACIONES_ERROR";

const EDITAR_ASIGNACION_LOADING = "EDITAR_ASIGNACION_LOADING";
const EDITAR_ASIGNACIONES_EXITO = "EDITAR_ASIGNACIONES_EXITO";
const EDITAR_ASIGNACION_ERROR = "EDITAR_ASIGNACION_ERROR";

const ELIMINAR_ASIGNACION_LOADING = "ELIMINAR_ASIGNACION_LOADING";
const ELIMINAR_ASIGNACIONES_EXITO = "ELIMINAR_ASIGNACIONES_EXITO";
const ELIMINAR_ASIGNACION_ERROR = "ELIMINAR_ASIGNACION_ERROR";

export default function asignacionesReducers(state = dataInicial, action) {
  switch (action.type) {
    case GET_ASIGNACIONES_LOADING:
      return { ...state, loadingAsignaciones: action.loading };
    case GET_ASIGNACIONES_EXITO:
      return {
        ...state,
        asignaciones: action.payload,
        loadingAsignaciones: action.loading,
      };
    case GET_ASIGNACIONES_ERROR:
      return { ...state, loadingAsignaciones: action.loading };
    case NUEVA_ASIGNACIONES_LOADING:
      return { ...state, resultadoNuevaAsignaciones: action.resultado };
    case NUEVA_ASIGNACIONES_EXITO:
      return { ...state, resultadoNuevaAsignaciones: action.resultado };
    case NUEVA_ASIGNACIONES_ERROR:
      return { ...state, resultadoNuevaAsignaciones: action.resultado };
    case EDITAR_ASIGNACION_LOADING:
      return { ...state, resultadoEditarAsignaciones: action.resultado };
    case EDITAR_ASIGNACIONES_EXITO:
      return { ...state, resultadoEditarAsignaciones: action.resultado };
    case EDITAR_ASIGNACION_ERROR:
      return { ...state, resultadoEditarAsignaciones: action.resultado };
    case ELIMINAR_ASIGNACION_LOADING:
      return { ...state, resultadoEliminarAsignaciones: action.resultado };
    case ELIMINAR_ASIGNACIONES_EXITO:
      return { ...state, resultadoEliminarAsignaciones: action.resultado };
    case ELIMINAR_ASIGNACION_ERROR:
      return { ...state, resultadoEliminarAsignaciones: action.resultado };
    default:
      return { ...state };
  }
}

export const getAsignaciones = (token) => async (dispatch) => {
  dispatch({
    type: GET_ASIGNACIONES_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_asignacions";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_asignacion'>" +
      "<attribute name='new_asignacionid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='new_empleado' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_rolenelproyecto' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_cantidadhoras' />" +
      "<attribute name='createdby' />" +
      // "<attribute name='ownerid' />" +
      "<attribute name='new_periodo' />" +
      "<attribute name='new_proyecto' />" +
      "<attribute name='overriddencreatedon' />" +
      "<attribute name='new_cantidadhorasdevengadas' />" +
      "<attribute name='new_tarifa' />" +
      "<attribute name='new_solucindelacualpartir' />" +
      "<attribute name='new_rolenelproyecto' />" +
      "<order attribute='createdon' descending='true' />" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0' />" +
      "</filter>" +
      "<link-entity name='new_proyecto' from='new_proyectoid' to='new_proyecto' visible='false' link-type='outer' alias='proyecto'>" +
      // "<attribute name='ownerid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='new_horasestimadas' />" +
      "<attribute name='new_horasdevengadastotales' />" +
      "<attribute name='new_horasdevengadas' />" +
      "<attribute name='new_horasasignadastotales' />" +
      "<attribute name='new_horasasignadas' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_cliente' />" +
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
        type: GET_ASIGNACIONES_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ASIGNACIONES_ERROR,
        loading: true,
      });
    }
  }
};

export const newAsignacion = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: NUEVA_ASIGNACIONES_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.post(
          `${UrlApi}api/hrfactors/asignacion`,
          {
            new_empleado: empleadoid,
            new_name: datos.nombre,
            new_solucindelacualpartir: datos.solucionPartir,
            new_proyecto: datos.proyectoSelect?.value,
            new_rolenelproyecto: datos.rolDeProyecto?.value ? datos.rolDeProyecto?.value : "",
            new_tarifa: datos.tarifa ? Number(datos.tarifa) : 0,
            new_cantidadhoras: datos.cantidadHoras ? Number(datos.cantidadHoras) : 0,
            new_periodo: datos?.periodoSelect.value,
            statuscode: datos.estadoSelect?.value ? Number(datos.estadoSelect.value) : 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: NUEVA_ASIGNACIONES_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Asignación completada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: NUEVA_ASIGNACIONES_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const setAsignacion = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_ASIGNACION_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(
          `${UrlApi}api/hrfactors/asignacion`,
          {
            new_asignacionid: datos.id,
            new_empleado: empleadoid,
            new_name: datos.nombre,
            new_solucindelacualpartir: datos.solucionPartir,
            new_proyecto: datos.proyectoSelect.value,
            new_rolenelproyecto: datos.rolDeProyecto?.value ? datos.rolDeProyecto?.value : "",
            new_tarifa: datos.tarifa ? Number(datos.tarifa) : 0,
            new_cantidadhoras: datos.cantidadHoras ? Number(datos.cantidadHoras) : 0,
            new_periodo: datos?.periodoSelect.value,
            statuscode: datos.estadoSelect?.value ? Number(datos.estadoSelect.value) : 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_ASIGNACIONES_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Asignación editada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: EDITAR_ASIGNACION_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const eliminarAsignacion = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_ASIGNACION_LOADING,
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
  const inactivarAsignacion = () =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(`${UrlApi}api/hrfactors/asignacion`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_asignacionid: id,
          },
        });
        dispatch({
          type: ELIMINAR_ASIGNACIONES_EXITO,
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
      inactivarAsignacion,
      {
        success: "Proceso exitoso",
        error: {
          render({ error }) {
            return error.response.data || "Ha ocurrido un error";
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
        type: ELIMINAR_ASIGNACION_ERROR,
        resultado: "ERROR",
      });
    });
};
