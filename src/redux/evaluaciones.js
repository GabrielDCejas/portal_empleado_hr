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
  loadingCargarObjetivo: "",
  resultadoCargarObjetivo: "",
  loadingEditarObjetivo: "",
  resultadoEditarObjetivo: "",
  loadingEliminarObjetivo: "",
  resultadoEliminarObjetivo: "",
  loadingCargarItemsEvaluacion: "",
  resultadoCargarItemsEvaluacion: "",
  loadingEliminarItemEvaluacion: "",
  resultadoEliminarItemEvaluacion: "",
  resultadoEditarItemsEvaluacion: "",
  loadingEditarItemsEvaluacion: "",
  metasPrioritarias: "",
  loadingMetasPrioritarias:false,
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

const CARGAR_OBJETIVO_LOADING = "CARGAR_OBJETIVO_LOADING";
const CARGAR_OBJETIVO_EXITO = "CARGAR_OBJETIVO_EXITO";
const CARGAR_OBJETIVO_ERROR = "CARGAR_OBJETIVO_ERROR";

const EDITAR_OBJETIVO_LOADING = "EDITAR_OBJETIVO_LOADING";
const EDITAR_OBJETIVO_EXITO = "EDITAR_OBJETIVO_LOADING";
const EDITAR_OBJETIVO_ERROR = "EDITAR_OBJETIVO_LOADING";

const ELIMINAR_OBJETIVO_LOADING = "ELIMINAR_OBJETIVO_LOADING";
const ELIMINAR_OBJETIVO_EXITO = "ELIMINAR_OBJETIVO_EXITO";
const ELIMINAR_OBJETIVO_ERROR = "ELIMINAR_OBJETIVO_ERROR";

const CARGAR_ITEMS_EVALUACION_LOADING = "CARGAR_ITEMS_EVALUACION_LOADING";
const CARGAR_ITEMS_EVALUACION_EXITO = "CARGAR_ITEMS_EVALUACION_EXITO";
const CARGAR_ITEMS_EVALUACION_ERROR = "CARGAR_ITEMS_EVALUACION_ERROR";

const ELIMINAR_ITEM_EVALUACION_LOADING = "ELIMINAR_ITEM_EVALUACION_LOADING";
const ELIMINAR_ITEM_EVALUACION_EXITO = "ELIMINAR_ITEM_EVALUACION_EXITO";
const ELIMINAR_ITEM_EVALUACION_ERROR = "ELIMINAR_ITEM_EVALUACION_ERROR";

const EDITAR_ITEMS_EVALUACION_LOADING = "EDITAR_ITEMS_EVALUACION_LOADING";
const EDITAR_ITEMS_EVALUACION_EXITO = "EDITAR_ITEMS_EVALUACION_EXITO";
const EDITAR_ITEMS_EVALUACION_ERROR = "EDITAR_ITEMS_EVALUACION_ERROR";

const GET_METAS_PRIORITARIAS_LOADING = "GET_METAS_PRIORITARIAS_LOADING";
const GET_METAS_PRIORITARIAS_EXITO = "GET_METAS_PRIORITARIAS_EXITO";
const GET_METAS_PRIORITARIAS_ERROR = "GET_METAS_PRIORITARIAS_ERROR";

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
    case CARGAR_OBJETIVO_LOADING:
      return { ...state, loadingCargarObjetivo: action.resultado };
    case CARGAR_OBJETIVO_EXITO:
      return { ...state, resultadoCargarObjetivo: action.payload, loadingCargarObjetivo: action.resultado };
    case CARGAR_OBJETIVO_ERROR:
      return { ...state, loadingCargarObjetivo: action.resultado };
    case EDITAR_OBJETIVO_LOADING:
      return { ...state, loadingEditarObjetivo: action.resultado };
    case EDITAR_OBJETIVO_EXITO:
      return { ...state, resultadoEditarObjetivo: action.payload, loadingEditarObjetivo: action.resultado };
    case EDITAR_OBJETIVO_ERROR:
      return { ...state, loadingEditarObjetivo: action.resultado };
    case ELIMINAR_OBJETIVO_LOADING:
      return { ...state, loadingEliminarObjetivo: action.resultado };
    case ELIMINAR_OBJETIVO_EXITO:
      return { ...state, resultadoEliminarObjetivo: action.payload, loadingEliminarObjetivo: action.resultado };
    case ELIMINAR_OBJETIVO_ERROR:
      return { ...state, loadingEliminarObjetivo: action.resultado };
    case CARGAR_ITEMS_EVALUACION_LOADING:
      return { ...state, loadingCargarItemsEvaluacion: action.resultado };
    case CARGAR_ITEMS_EVALUACION_EXITO:
      return {
        ...state,
        resultadoCargarItemsEvaluacion: action.payload,
        loadingCargarItemsEvaluacion: action.resultado,
      };
    case CARGAR_ITEMS_EVALUACION_ERROR:
      return { ...state, loadingCargarItemsEvaluacion: action.resultado };
    case EDITAR_ITEMS_EVALUACION_LOADING:
      return { ...state, loadingEditarItemsEvaluacion: action.resultado };
    case EDITAR_ITEMS_EVALUACION_EXITO:
      return {
        ...state,
        resultadoEditarItemsEvaluacion: action.payload,
        loadingEditarItemsEvaluacion: action.resultado,
      };
    case EDITAR_ITEMS_EVALUACION_ERROR:
      return { ...state, loadingEditarItemsEvaluacion: action.resultado };
    case ELIMINAR_ITEM_EVALUACION_LOADING:
      return { ...state, loadingEliminarItemEvaluacion: action.resultado };
    case ELIMINAR_ITEM_EVALUACION_EXITO:
      return {
        ...state,
        resultadoEliminarItemEvaluacion: action.payload,
        loadingEliminarItemEvaluacion: action.resultado,
      };
    case ELIMINAR_ITEM_EVALUACION_ERROR:
      return { ...state, loadingEliminarItemEvaluacion: action.resultado };
    case GET_METAS_PRIORITARIAS_LOADING:
      return { ...state, loadingMetasPrioritarias: action.loading };
    case GET_METAS_PRIORITARIAS_EXITO:
      return {
        ...state,
        metasPrioritarias: action.payload,
        loadingMetasPrioritarias: action.loading,
      };
    case GET_METAS_PRIORITARIAS_ERROR:
      return { ...state, loadingMetasPrioritarias: action.loading };
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
      <attribute name="new_comentariosyobservacionesdelaevaluacion" />
      <attribute name="new_miproposito" />
      <attribute name="new_elcolaboradorhacambiadosupropsito" />
      <attribute name="new_nuevoproposito" />
      <attribute name="new_comentariosyobservacionesaspeval" />
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
            <attribute name="new_tipodeobjetivo" />
            <attribute name="new_perspectivadenegocio" />
            <attribute name="new_plazo" />
            <attribute name="new_fuentedemedicion" />
            <attribute name="new_piso" />
            <attribute name="new_target" />
            <attribute name="new_techo" />
            <attribute name="new_evaluaciondepgd" />
            <attribute name="new_objetivoprimarioid" />
        <order attribute="new_name" descending="false" />
        <filter type="and">
          <condition attribute="statecode" operator="eq" value="0" />
        </filter>
        <link-entity name="new_evaluaciondepgd" from="new_evaluaciondepgdid" to="new_evaluaciondepgd" link-type="inner" alias="evaluacion_pgd">
          <attribute name="new_posicin" />
          <attribute name="new_evaluado" />
          <attribute name="new_lder" />
          <attribute name="new_evaluaciondellder" />
          <filter type="and">
            <condition attribute="new_evaluaciondepgdid" operator="eq" uitype="new_evaluaciondepgd" value='${evaluaciondePgdId}' />
          </filter>
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
        <attribute name="new_evaluaciondepgd" />
        <attribute name="new_tipodeitemdeevaluacion" />
        <attribute name="new_tipodeinstancia" />
        <attribute name="new_plandesucesin" />
        <order attribute="new_name" descending="false" />
        <filter type="and">
          <condition attribute="new_evaluaciondepgd" operator="eq" uitype="new_evaluaciondepgd" value='${evaluaciondePgdId}' />
          <condition attribute='statecode' operator='eq' value='0' />
        </filter>
        <link-entity name="new_evaluaciondepgd" from="new_evaluaciondepgdid" to="new_evaluaciondepgd" visible="false" link-type="outer" alias="evaluacion_pgd">
          <attribute name="new_lder" />
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

export const getMetasPrioritarias = (token, evaluaciondePgdId) => async (dispatch) => {
  dispatch({
    type: GET_METAS_PRIORITARIAS_LOADING,
    loading: false,
  });

  if (!evaluaciondePgdId || !token) {
    return;
  } else {
    try {
      const entidad = "new_metaprioritarias";
      const fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="new_metaprioritaria">
        <attribute name="new_name" />
        <attribute name="statuscode" />
        <attribute name="new_fechahasta" />
        <attribute name="new_fechadesde" />
        <attribute name="new_evidencia" />
        <attribute name="new_accion" />
        <attribute name="new_metaprioritariaid" />
        <order attribute="new_fechadesde" descending="false" />
        <filter type="and">
          <condition attribute="statecode" operator="eq" value="0" />
          <condition attribute="new_evaluacionpgd" operator="eq" uitype="new_evaluaciondepgd" value='${evaluaciondePgdId}' />
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
        type: GET_METAS_PRIORITARIAS_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_METAS_PRIORITARIAS_ERROR,
        loading: true,
      });
    }
  }
};

export const enviarObjetivo = (token, datos, evaluaciondepgdid) => async (dispatch) => {
  dispatch({
    type: CARGAR_OBJETIVO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .post(
          `${UrlApi}api/hroneclick/objetivo`,
          {
            new_evaluaciondepgd: evaluaciondepgdid,
            new_objetivo: datos.objetivoPrimario.value ? datos.objetivoPrimario.value : "",
            new_tipodeobjetivo: datos.tipoObjetivo.value ? Number(datos.tipoObjetivo.value) : 0,
            new_perspectivadenegocio: datos.perspectivaNegocio.value ? datos.perspectivaNegocio.value : "",
            new_plazo: datos.plazo ? moment(datos.plazo).format("YYYY-MM-DD") : "",
            new_ponderacionlider: datos.ponderacionLider ? Number(datos.ponderacionLider) : 0,
            new_fuentedemedicion: datos.fuenteMedicion ? datos.fuenteMedicion : "",
            new_piso: datos.piso ? datos.piso : "",
            new_target: datos.target ? datos.target : "",
            new_techo: datos.techo ? datos.techo : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: CARGAR_OBJETIVO_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Objetivo cargado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: CARGAR_OBJETIVO_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const editarObjetivos = (token, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_OBJETIVO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .put(
          `${UrlApi}api/hroneclick/objetivo`,
          {
            new_objetivodeevaluacionid: datos.id,
            new_objetivo: datos.objetivoPrimario.value ? datos.objetivoPrimario.value : "",
            new_tipodeobjetivo: datos.tipoObjetivo.value ? Number(datos.tipoObjetivo.value) : 0,
            new_perspectivadenegocio: datos.perspectivaNegocio.value ? datos.perspectivaNegocio.value : "",
            new_plazo: datos.plazo ? moment(datos.plazo).format("YYYY-MM-DD") : "",
            new_ponderacionlider: datos.ponderacion_lider ? Number(datos.ponderacion_lider) : 0,
            new_fuentedemedicion: datos.fuenteMedicion ? datos.fuenteMedicion : "",
            new_piso: datos.piso ? datos.piso : "",
            new_target: datos.target ? datos.target : "",
            new_techo: datos.techo ? datos.techo : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_OBJETIVO_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Objetivo editado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: EDITAR_OBJETIVO_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const eliminarObjetivo = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_OBJETIVO_LOADING,
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
        const response = await axios.delete(`${UrlApi}api/hroneclick/objetivo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_objetivodeevaluacionid: id,
          },
        });
        dispatch({
          type: ELIMINAR_OBJETIVO_EXITO,
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
            return error?.response?.data || "Ha ocurrido un error";
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
        type: ELIMINAR_OBJETIVO_ERROR,
        resultado: "ERROR",
      });
    });
};

export const enviarItemsEvaluacion = (token, datos, evaluaciondepgdid) => async (dispatch) => {
  dispatch({
    type: CARGAR_ITEMS_EVALUACION_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .post(
          `${UrlApi}api/hroneclick/itempgd`,
          {
            new_evaluaciondepgd: evaluaciondepgdid,
            new_tipodeitemdeevaluacion: datos.tipoItemEvaluacion?.value ? Number(datos.tipoItemEvaluacion.value) : 0,
            new_competencia: datos.competenciaObjetivo?.value ? datos.competenciaObjetivo.value : "",
            new_valoracin: datos.valoracion_modal?.value ? Number(datos.valoracion_modal.value) : 0,
            new_valoraciondellider: datos.valoracion_lider_modal?.value
              ? Number(datos.valoracion_lider_modal.value)
              : 0,
            new_tipodeinstancia: datos.tipoInstancia?.value ? Number(datos.tipoInstancia.value) : 0,
            new_plandesucesin: datos.planSucesion?.value ? datos.planSucesion.value : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: CARGAR_ITEMS_EVALUACION_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Item cargado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: CARGAR_ITEMS_EVALUACION_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const editarItemsEvaluacion = (token, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_ITEMS_EVALUACION_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios
        .put(
          `${UrlApi}api/hroneclick/itempgd`,
          {
            new_itemdeevaluaciondedesempeoid: datos.id,
            new_tipodeitemdeevaluacion: datos.tipoItemEvaluacion?.value ? Number(datos.tipoItemEvaluacion.value) : 0,
            new_competencia: datos.competenciaObjetivo?.value ? datos.competenciaObjetivo.value : "",
            new_valoracin: datos.valoracion_modal?.value ? Number(datos.valoracion_modal.value) : 0,
            new_valoraciondellider: datos.valoracion_lider_modal?.value
              ? Number(datos.valoracion_lider_modal.value)
              : 0,
            new_tipodeinstancia: datos.tipoInstancia?.value ? Number(datos.tipoInstancia.value) : 0,
            new_plandesucesin: datos.planSucesion?.value ? datos.planSucesion.value : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_ITEMS_EVALUACION_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Item editado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: EDITAR_ITEMS_EVALUACION_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const eliminarItemsEvaluacion = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_ITEM_EVALUACION_LOADING,
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
        const response = await axios.delete(`${UrlApi}api/hroneclick/itempgd`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_itemdeevaluaciondedesempeoid: id,
          },
        });
        dispatch({
          type: ELIMINAR_ITEM_EVALUACION_EXITO,
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
            return error?.response?.data || "Ha ocurrido un error";
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
        type: ELIMINAR_ITEM_EVALUACION_ERROR,
        resultado: "ERROR",
      });
    });
};
