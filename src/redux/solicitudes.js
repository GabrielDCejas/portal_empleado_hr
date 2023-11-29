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
};

const GET_REQUERIMIENTO_PERSONAL_LOADING = "GET_REQUERIMIENTO_PERSONAL_LOADING";
const GET_REQUERIMIENTO_PERSONAL_EXITO = "GET_REQUERIMIENTO_PERSONAL_EXITO";
const GET_REQUERIMIENTO_PERSONAL_ERROR = "GET_REQUERIMIENTO_PERSONAL_ERROR";

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
        <attribute name="new_perfil" />
        <attribute name="new_cliente" />
        <order attribute="createdon" descending="true" />
        <order attribute="statuscode" descending="false" />
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
  