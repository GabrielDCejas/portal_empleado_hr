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
  loadingCargaHoraria: false,
  horas: [],
  resultadoNuevaCargaHoraria: "",
  resultadoEditarCargaHoraria: "",
  resultadoEliminarCargaHoraria: "",
};

const GET_CARGA_HORARIA_LOADING = "GET_CARGA_HORARIA_LOADING";
const GET_CARGA_HORARIA_EXITO = "GET_CARGA_HORARIA_EXITO";
const GET_CARGA_HORARIA_ERROR = "GET_CARGA_HORARIA_ERROR";

const NUEVA_CARGA_HORARIA_LOADING = "NUEVA_CARGA_HORARIA_LOADING";
const NUEVA_CARGA_HORARIA_EXITO = "NUEVA_CARGA_HORARIA_EXITO";
const NUEVA_CARGA_HORARIA_ERROR = "NUEVA_CARGA_HORARIA_ERROR";

const EDITAR_CARGA_HORARIA_LOADING = "EDITAR_CARGA_HORARIA_LOADING";
const EDITAR_CARGA_HORARIA_EXITO = "EDITAR_CARGA_HORARIA_EXITO";
const EDITAR_CARGA_HORARIA_ERROR = "EDITAR_CARGA_HORARIA_ERROR";

const ELIMINAR_CARGA_HORARIA_LOADING = "ELIMINAR_CARGA_HORARIA_LOADING";
const ELIMINAR_CARGA_HORARIA_EXITO = "ELIMINAR_CARGA_HORARIA_EXITO";
const ELIMINAR_CARGA_HORARIA_ERROR = "ELIMINAR_CARGA_HORARIA_ERROR";

export default function cargasHorariasReducers(state = dataInicial, action) {
  switch (action.type) {
    case GET_CARGA_HORARIA_LOADING:
      return { ...state, loadingCargaHoraria: action.loading };
    case GET_CARGA_HORARIA_EXITO:
      return { ...state, horas: action.payload, loadingCargaHoraria: action.loading };
    case GET_CARGA_HORARIA_ERROR:
      return { ...state, loadingCargaHoraria: action.loading };
    case NUEVA_CARGA_HORARIA_LOADING:
      return { ...state, resultadoNuevaCargaHoraria: action.resultado };
    case NUEVA_CARGA_HORARIA_EXITO:
      return { ...state, resultadoNuevaCargaHoraria: action.resultado };
    case NUEVA_CARGA_HORARIA_ERROR:
      return { ...state, resultadoNuevaCargaHoraria: action.resultado };
    case EDITAR_CARGA_HORARIA_LOADING:
      return { ...state, resultadoEditarCargaHoraria: action.resultado };
    case EDITAR_CARGA_HORARIA_EXITO:
      return { ...state, resultadoEditarCargaHoraria: action.resultado };
    case EDITAR_CARGA_HORARIA_ERROR:
      return { ...state, resultadoEditarCargaHoraria: action.resultado };
    case ELIMINAR_CARGA_HORARIA_LOADING:
      return { ...state, resultadoEliminarCargaHoraria: action.resultado };
    case ELIMINAR_CARGA_HORARIA_EXITO:
      return { ...state, resultadoEliminarCargaHoraria: action.resultado };
    case ELIMINAR_CARGA_HORARIA_ERROR:
      return { ...state, resultadoEliminarCargaHoraria: action.resultado };
    default:
      return { ...state };
  }
}

export const getCargasHorarias = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_CARGA_HORARIA_LOADING,
    loading: false,
  });

  if (!empleadoid || !token) {
    return;
  } else {
    try {
      const entidad = "new_cargahorarias";
      const fetchXml = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
        <entity name='new_cargahoraria'>
          <attribute name='new_name' />
          <attribute name='createdon' />
          <attribute name='new_descripcion' />
          <attribute name='new_cargahorariaid' />
          <attribute name='new_rolenelproyecto' />
          <attribute name='statuscode' />
          <attribute name='new_proyecto' />
          // <attribute name='ownerid' />
          <attribute name='new_horas' />
          <attribute name='new_fechadecarga' />
          <attribute name='new_facturable' />
          <attribute name='statecode' />
          <attribute name='new_cliente' />
          <attribute name='createdby' />
          <attribute name='new_asignacion' />
          <attribute name='new_empleado' />
          <order attribute='new_fechadecarga' descending='true' />
          <filter type='and'>
            <condition attribute='new_empleado' operator='eq' value='${empleadoid}' />
            <condition attribute='statecode' operator='eq' value='0' />
          </filter>
        </entity>
      </fetch>`;

      const response = await axios.post(
        `${UrlApi}api/consultafetch`,
        {
          entidad,
          fetch: fetchXml,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_CARGA_HORARIA_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CARGA_HORARIA_ERROR,
        loading: true,
      });
    }
  }
};

export const newCargaHoraria = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: NUEVA_CARGA_HORARIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .post(
          `${UrlApi}api/hrfactors/cargahoraria`,
          {
            new_empleado: empleadoid,
            new_proyecto: datos.proyectoSelect.value,
            new_asignacion: datos.asignacionSelect.value,
            new_fechadecarga: datos.fechaDeCargaModal ? moment(datos.fechaDeCargaModal).format("YYYY-MM-DD") : "",
            new_horas: datos.horas ? Number(datos.horas) : 0,
            new_facturable: datos.facturableSelect?.value ? datos.facturableSelect?.value : false,
            new_descripcion: datos.descripcion,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: NUEVA_CARGA_HORARIA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Carga horaria completada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: NUEVA_CARGA_HORARIA_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const editarCargasHorarias = (token, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_CARGA_HORARIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .put(
          `${UrlApi}api/hrfactors/cargahoraria`,
          {
            new_cargahorariaid: datos.id,
            new_proyecto: datos.proyectoSelect.value,
            new_asignacion: datos.asignacionSelect.value,
            new_fechadecarga: datos.fechaDeCargaModal ? moment(datos.fechaDeCargaModal).format("YYYY-MM-DD") : "",
            new_horas: datos.horas ? Number(datos.horas) : 0,
            new_facturable: datos.facturableSelect?.value ? datos.facturableSelect?.value : false,
            new_descripcion: datos.descripcion,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_CARGA_HORARIA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Carga horaria completada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: EDITAR_CARGA_HORARIA_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const eliminarCargaHoraria = (token, id) => (dispatch) => {
  dispatch({
    type: ELIMINAR_CARGA_HORARIA_LOADING,
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
  const inactivarCargaHoraria = () =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(`${UrlApi}api/hrfactors/cargahoraria`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_cargahorariaid: id,
          },
        });
        dispatch({
          type: ELIMINAR_CARGA_HORARIA_EXITO,
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
      inactivarCargaHoraria,
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
        type: ELIMINAR_CARGA_HORARIA_ERROR,
        resultado: "ERROR",
      });
    });
};
