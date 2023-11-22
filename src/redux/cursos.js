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
  cursos: [],
  loadingCursos: false,
  loadingCargarCurso: "",
  cursoCargado: [],
  loadingEditarCurso: "",
  cursoEditado: [],
  loadingEliminarCurso: "",
  cursoEliminado: [],
};

const GET_CURSOS_LOADING = "GET_CURSOS_LOADING";
const GET_CURSOS_EXITO = "GET_CURSOS_EXITO";
const GET_CURSOS_ERROR = "GET_CURSOS_ERROR";

const CARGAR_CURSO_LOADING = "CARGAR_CURSO_LOADING";
const CARGAR_CURSO_EXITO = "CARGAR_CURSO_EXITO";
const CARGAR_CURSO_ERROR = "CARGAR_CURSO_ERROR";

const EDITAR_CURSO_LOADING = "EDITAR_CURSO_LOADING";
const EDITAR_CURSO_EXITO = "EDITAR_CURSO_EXITO";
const EDITAR_CURSO_ERROR = "EDITAR_CURSO_ERROR";

const ELIMINAR_CURSO_LOADING = "ELIMINAR_CURSO_LOADING";
const ELIMINAR_CURSO_EXITO = "ELIMINAR_CURSO_EXITO";
const ELIMINAR_CURSO_ERROR = "ELIMINAR_CURSO_ERROR";

export default function cargasCursosReducers(state = dataInicial, action) {
  switch (action.type) {
    case GET_CURSOS_LOADING:
      return { ...state, loadingCursos: action.loading };
    case GET_CURSOS_EXITO:
      return {
        ...state,
        cursos: action.payload,
        loadingCursos: action.loading,
      };
    case GET_CURSOS_ERROR:
      return { ...state, loadingCursos: action.loading };
    case CARGAR_CURSO_LOADING:
      return { ...state, loadingCargarCurso: action.resultado };
    case CARGAR_CURSO_EXITO:
      return {
        ...state,
        cursoCargado: action.payload,
        loadingCargarCurso: action.resultado,
      };
    case CARGAR_CURSO_ERROR:
      return { ...state, loadingCargarCurso: action.resultado };
    case EDITAR_CURSO_LOADING:
      return { ...state, loadingEditarCurso: action.resultado };
    case EDITAR_CURSO_EXITO:
      return {
        ...state,
        cursoEditado: action.payload,
        loadingEditarCurso: action.resultado,
      };
    case EDITAR_CURSO_ERROR:
      return { ...state, loadingEditarCurso: action.resultado };
    case ELIMINAR_CURSO_LOADING:
      return { ...state, loadingEliminarCurso: action.resultado };
    case ELIMINAR_CURSO_EXITO:
      return {
        ...state,
        cursoEliminado: action.payload,
        loadingEliminarCurso: action.resultado,
      };
    case ELIMINAR_CURSO_ERROR:
      return { ...state, loadingEliminarCurso: action.resultado };
    default:
      return { ...state };
  }
}

export const getCursos = (token) => async (dispatch) => {
  dispatch({
    type: GET_CURSOS_LOADING,
    loading: false,
  });
  if (!token) {
    return;
  } else {
    const entidad = "new_cursos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_curso'>" +
      "<attribute name='new_cursoid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='createdby' />" +
      "<attribute name='ownerid' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_tipodecurso' />" +
      "<attribute name='new_objetivo' />" +
      "<attribute name='new_interna' />" +
      "<attribute name='new_incompany' />" +
      "<attribute name='new_externa' />" +
      "<attribute name='new_elearning' />" +
      "<attribute name='new_contenido' />" +
      "<attribute name='new_duracion' />" +
      "<attribute name='new_accion' />" +
      "<order attribute='new_name' descending='false' />" +
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
        type: GET_CURSOS_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CURSOS_ERROR,
        loading: true,
      });
    }
  }
};

export const cargarCurso = (empleadoid, token, datos) => async (dispatch) => {
  dispatch({
    type: CARGAR_CURSO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .post(
          `${UrlApi}api/hrfactors/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: CARGAR_CURSO_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Curso cargado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: CARGAR_CURSO_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const editarCurso = (empleadoid, token, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_CURSO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .post(
          `${UrlApi}api/hrfactors/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_CURSO_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Curso editado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: EDITAR_CURSO_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const eliminarCurso = (token, id) => (dispatch) => {
  dispatch({
    type: ELIMINAR_CURSO_LOADING,
    resultado: "LOADING",
  });

  const inactivarCurso = () =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(`${UrlApi}api/hrfactors/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {},
        });
        dispatch({
          type: ELIMINAR_CURSO_EXITO,
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
        onOpen: () => {
          const loadingToast = toast.loading("Procesando...");
          if (loadingToast !== null) {
            toast.dismiss(loadingToast);
          }
        },
      }
    )
    .catch((error) => {
      dispatch({
        type: ELIMINAR_CURSO_ERROR,
        resultado: "ERROR",
      });
    });
};
