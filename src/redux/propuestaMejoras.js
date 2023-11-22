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
  propuestasMejoras: [],
  loadingPropuestasMejoras: false,
  loadingNuevaPropuesta: false,
  resultadoNuebaPropuesta: "",
  resultadoEditarPropuesta: "",
  resultadoEliminarPropuesta: "",
};

const GET_PROPUESTAS_MEJORAS_LOADING = "GET_PROPUESTAS_MEJORAS_LOADING";
const GET_PROPUESTAS_MEJORAS_EXITO = "GET_PROPUESTAS_MEJORAS_EXITO";
const GET_PROPUESTAS_MEJORAS_ERROR = "GET_PROPUESTAS_MEJORAS_ERROR";

const NUEVA_PROPUESTA_LOADING = "NUEVA_PROPUESTA_LOADING";
const NUEVA_PROPUESTA_EXITO = "NUEVA_PROPUESTA_EXITO";
const NUEVA_PROPUESTA_ERROR = "NUEVA_PROPUESTA_ERROR";

const EDITAR_PROPUESTA_LOADING = "EDITAR_PROPUESTA_LOADING";
const EDITAR_PROPUESTA_EXITO = "EDITAR_PROPUESTA_EXITO";
const EDITAR_PROPUESTA_ERROR = "EDITAR_PROPUESTA_ERROR";

const ELIMINAR_PROPUESTA_LOADING = "ELIMINAR_PROPUESTA_LOADING";
const ELIMINAR_PROPUESTA_EXITO = "ELIMINAR_PROPUESTA_EXITO";
const ELIMINAR_PROPUESTA_ERROR = "ELIMINAR_PROPUESTA_ERROR";

export default function propuestaReducers(state = dataInicial, action) {
  switch (action.type) {
    case GET_PROPUESTAS_MEJORAS_LOADING:
      return { ...state, loadingPropuestasMejoras: action.loading };
    case GET_PROPUESTAS_MEJORAS_EXITO:
      return {
        ...state,
        propuestasMejoras: action.payload,
        loadingPropuestasMejoras: action.loading,
      };
    case GET_PROPUESTAS_MEJORAS_ERROR:
      return { ...state, loadingPropuestasMejoras: action.loading };
    case NUEVA_PROPUESTA_LOADING:
      return { ...state, loadingNuevaPropuesta: action.resultado };
    case NUEVA_PROPUESTA_EXITO:
      return {
        ...state,
        resultadoNuebaPropuesta: action.payload,
        loadingNuevaPropuesta: action.resultado,
      };
    case NUEVA_PROPUESTA_ERROR:
      return { ...state, loadingNuevaPropuesta: action.resultado };
    case EDITAR_PROPUESTA_LOADING:
      return { ...state, loadingNuevaPropuesta: action.resultado };
    case EDITAR_PROPUESTA_EXITO:
      return {
        ...state,
        resultadoEditarPropuesta: action.payload,
        loadingNuevaPropuesta: action.resultado,
      };
    case EDITAR_PROPUESTA_ERROR:
      return { ...state, loadingNuevaPropuesta: action.resultado };
    case ELIMINAR_PROPUESTA_LOADING:
      return { ...state, loadingNuevaPropuesta: action.resultado };
    case ELIMINAR_PROPUESTA_EXITO:
      return {
        ...state,
        resultadoEliminarPropuesta: action.payload,
        loadingNuevaPropuesta: action.resultado,
      };
    case ELIMINAR_PROPUESTA_ERROR:
      return { ...state, loadingNuevaPropuesta: action.resultado };
    default:
      return { ...state };
  }
}

export const getPropuestasMejoras = (token) => async (dispatch) => {
  dispatch({
    type: GET_PROPUESTAS_MEJORAS_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_propuestaymejorases";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_propuestaymejoras'>" +
      "<attribute name='new_propuestaymejorasid'/>" +
      "<attribute name='new_name'/>" +
      "<attribute name='createdon'/>" +
      "<attribute name='new_propuesta'/>" +
      "<attribute name='new_empleado'/>" +
      "<attribute name='statecode' />" +
      "<order attribute='createdon' descending='true'/>" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0' />" +
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
        type: GET_PROPUESTAS_MEJORAS_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PROPUESTAS_MEJORAS_ERROR,
        loading: true,
      });
    }
  }
};

export const nuevaPropuesta = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: NUEVA_PROPUESTA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.post(
          `${UrlApi}api/hrfactors/propuestasymejoras`,
          {
            new_empleado: empleadoid,
            new_name: datos.nombre,
            new_propuesta: datos.propuesta,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: NUEVA_PROPUESTA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Propuesta cargada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: NUEVA_PROPUESTA_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const editarPropuesta = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_PROPUESTA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(
          `${UrlApi}api/hrfactors/propuestasymejoras`,
          {
            new_propuestaymejorasid: datos.id,
            new_empleado: empleadoid,
            new_name: datos.nombre,
            new_propuesta: datos.propuesta,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_PROPUESTA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Propuesta editada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: EDITAR_PROPUESTA_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const eliminarPropuesta = (token, id) => (dispatch) => {
  dispatch({
    type: ELIMINAR_PROPUESTA_LOADING,
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
  const inactivarCurso = () =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(`${UrlApi}api/hrfactors/propuestasymejoras`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_propuestaymejorasid: id,
          },
        });
        dispatch({
          type: ELIMINAR_PROPUESTA_EXITO,
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
      inactivarCurso,
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
        type: ELIMINAR_PROPUESTA_ERROR,
        resultado: "ERROR",
      });
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
    });
};
