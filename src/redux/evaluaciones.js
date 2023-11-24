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
  loadingEvaluacionPGD: false,
  evaluacionPGD: [],
  loadingObjetivosPGD: false,
  objetivosPGD: [],
  itemsEvaluacion: [],
  loadingItemsEvaluacion: false,
};

const GET_EVALUACION_PGD_LOADING = "GET_EVALUACION_PGD_LOADING";
const GET_EVALUACION_PGD_EXITO = "GET_EVALUACION_PGD_EXITO";
const GET_EVALUACION_PGD_ERROR = "GET_EVALUACION_PGD_ERROR";

const GET_OBJETIVOS_PGD_LOADING = "GET_OBJETIVOS_PGD_LOADING";
const GET_OBJETIVOS_PGD_EXITO = "GET_OBJETIVOS_PGD_EXITO";
const GET_OBJETIVOS_PGD_ERROR = "GET_OBJETIVOS_PGD_ERROR";

const GET_ITEMS_EVALUACION_LOADING = "GET_ITEMS_EVALUACION_LOADING";
const GET_ITEMS_EVALUACION_EXITO = "GET_ITEMS_EVALUACION_EXITO";
const GET_ITEMS_EVALUACION_ERROR = "GET_ITEMS_EVALUACION_ERROR";

export default function evaluacionesReducers(state = dataInicial, action) {
  switch (action.type) {
    case GET_EVALUACION_PGD_LOADING:
      return { ...state, loadingEvaluacionPGD: action.loading };
    case GET_EVALUACION_PGD_EXITO:
      return { ...state, evaluacionPGD: action.payload, loadingEvaluacionPGD: action.loading };
    case GET_EVALUACION_PGD_ERROR:
      return { ...state, loadingEvaluacionPGD: action.loading };
    case GET_OBJETIVOS_PGD_LOADING:
      return { ...state, loadingObjetivosPGD: action.loading };
    case GET_OBJETIVOS_PGD_EXITO:
      return { ...state, objetivosPGD: action.payload, loadingObjetivosPGD: action.loading };
    case GET_OBJETIVOS_PGD_ERROR:
      return { ...state, loadingObjetivosPGD: action.loading };
    case GET_ITEMS_EVALUACION_LOADING:
      return { ...state, loadingItemsEvaluacion: action.loading };
    case GET_ITEMS_EVALUACION_EXITO:
      return { ...state, itemsEvaluacion: action.payload, loadingItemsEvaluacion: action.loading };
    case GET_ITEMS_EVALUACION_ERROR:
      return { ...state, loadingItemsEvaluacion: action.loading };
    default:
      return { ...state };
  }
}

export const getEvaluacionPGD = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_EVALUACION_PGD_LOADING,
    loading: false,
  });

  if (!empleadoid || !token) {
    return;
  } else {
    try {
      const entidad = "new_evaluaciondepgds";
      const fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_evaluaciondepgd">
      <attribute name="statuscode" />
      <attribute name="new_lder" />
      <attribute name="new_evaluado" />
      <attribute name="new_ciclo" />
      <attribute name="createdon" />
      <attribute name="new_grupodeciclo" />
      <attribute name="new_unidadorganizativadirecta" />
      <attribute name="new_posicin" />
      <attribute name="new_grupodepersonal" />
      <attribute name="new_areadepersonal" />
      <attribute name="new_estadodelencuentrodefeedback" />
      <attribute name="new_estadodelaevaluacindellder" />
      <attribute name="new_estadodelaautoevaluacin" />
      <attribute name="new_evaluaciondepgdid" />
      <attribute name="new_name" />
      <attribute name="new_estadofinaldelaevaluacindepgd" />
      <attribute name="new_puesto" />
      <attribute name="ownerid" />
      <attribute name="new_comentariosyobservaciones" />
      <attribute name="new_comentariosyobervacionesdesupropsito" />
      <attribute name="new_comentariosyobervacionesdesuproposito" />
      <attribute name="new_fechayhoradelencuentrodefeedback" />
      <attribute name="new_fechavencimientofeedback" />
      <attribute name="new_fechavencimientoevaluacindellider" />
      <attribute name="new_fechavencimientoautoevaluacin" />
      <attribute name="new_fechainiciofeedback" />
      <attribute name="new_fechainicioevaluacindellider" />
      <attribute name="new_fechainicioautoevaluacion" />
      <attribute name="new_evaluaciondellder" />
      <attribute name="new_evaluaciondecompetencias" />
      <attribute name="new_autoevaluacion" /> 
      <attribute name="new_promedioevaluacionpgd" /> 
      <attribute name="new_cantidadcompetencias" /> 
      <attribute name="new_puntajeevaluacionpgd" /> 
      <attribute name="new_puntajeidealcompetencias" /> 
      <attribute name="new_comentariosyobservacionesdeautoevaluacion" />
        <order attribute="createdon" descending="false" />
        <filter type="and">
          <condition attribute="statecode" operator="eq" value="0" />
          <condition attribute="new_evaluado" operator="eq" uiname="Gabriel Cejas" uitype="new_empleado" value='${empleadoid}' />
        </filter>
        <link-entity name="new_ciclodepgd" from="new_ciclodepgdid" to="new_ciclo" visible="false" link-type="outer" alias="ciclodepgd">
          <attribute name="new_perododepgdasociado" />
        </link-entity>
        <link-entity name="new_empleado" from="new_empleadoid" to="new_evaluado" visible="false" link-type="outer" alias="evaluado">
          <attribute name="new_numerolegajo" />
        </link-entity>
        <link-entity name="new_empleado" from="new_empleadoid" to="new_lder" visible="false" link-type="outer" alias="empleadoid">
          <attribute name="new_numerolegajo" />
        </link-entity>
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
        type: GET_EVALUACION_PGD_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_EVALUACION_PGD_ERROR,
        loading: true,
      });
    }
  }
};

export const getObjetivosPGD = (token, evaluaciondePgdId) => async (dispatch) => {
  dispatch({
    type: GET_OBJETIVOS_PGD_LOADING,
    loading: false,
  });

  if (!evaluaciondePgdId || !token) {
    return;
  } else {
    try {
      const entidad = "new_objetivodeevaluacions";
      const fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_objetivodeevaluacion">
        <attribute name="new_objetivodeevaluacionid" />
        <attribute name="new_name" />
        <attribute name="createdon" />
        <attribute name="new_status" />
        <attribute name="new_ponderacionlider" />
        <attribute name="new_resultadoclave" />
        <attribute name="new_fechadecumplimiento" />
        <attribute name="statuscode" />
        <attribute name="new_deavance" />
        <order attribute="new_name" descending="false" />
        <filter type="and">
          <condition attribute="new_evaluaciondepgd" operator="eq"  uitype="new_evaluaciondepgd" value='${evaluaciondePgdId}' />
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
        type: GET_OBJETIVOS_PGD_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_OBJETIVOS_PGD_ERROR,
        loading: true,
      });
    }
  }
};

export const getItemsEvaluacion = (token, evaluaciondePgdId) => async (dispatch) => {
  dispatch({
    type: GET_ITEMS_EVALUACION_LOADING,
    loading: false,
  });

  if (!evaluaciondePgdId || !token) {
    return;
  } else {
    try {
      const entidad = "new_itemdeevaluaciondedesempeos";
      const fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_itemdeevaluaciondedesempeo">
        <attribute name="new_itemdeevaluaciondedesempeoid" />
        <attribute name="new_name" />
        <attribute name="createdon" />
        <attribute name="new_competencia" />
        <attribute name="new_valoraciondellider" />
        <attribute name="new_valoracin" />
        <order attribute="new_name" descending="false" />
        <filter type="and">
          <condition attribute="new_evaluaciondepgd" operator="eq" uitype="new_evaluaciondepgd" value='${evaluaciondePgdId}' />
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
        type: GET_ITEMS_EVALUACION_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ITEMS_EVALUACION_ERROR,
        loading: true,
      });
    }
  }
};
