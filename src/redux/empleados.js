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
  empleado: [],
  resultadoEmpleado: false,
  universidad: [],
  loadingUniversidades: false,
  idiomas: [],
  loadingIdiomas: false,
  trayectorias: [],
  loadingTrayectoria: false,
  familiares: [],
  loadingFamiliares: false,
  insumos: [],
  loadingInsumos: false,
  cuentasBancarias: [],
  loadingCuentasBancarias: false,
  vacaciones: [],
  loadingVacacionesEmpleado: false,
  recibos: [],
  loadingRecibos: false,
  resultadoEditarDatos: "",
  resultadoNuevaUniversidad: "",
  resultadoEditarUniversidad: "",
  resultadoEliminarUniversidad: "",
  resultadoNuevoIdioma: "",
  resultadoEditarIdioma: "",
  resultadoEliminarIdioma: "",
  resultadoNuevaTrayectoria: "",
  resultadoEditarTrayectoria: "",
  resultadoEliminarTrayectoria: "",
  resultadoNuevoFamiliar: "",
  resultadoEditarFamiliar: "",
  resultadoEliminarFamiliar: "",
  resultadoNuevoInsumo: "",
  resultadoEditarInsumo: "",
  resultadoEliminarInsumo: "",
  resultadoNuevaCuentaBancaria: "",
  resultadoEditarCuentaBancaria: "",
  resultadoEliminarCuentaBancaria: "",
};

const GET_EMPLEADO_LOADING = "GET_EMPLEADO_LOADING";
const GET_EMPLEADO_EXITO = "GET_EMPLEADO_EXITO";
const GET_EMPLEADO_ERROR = "GET_EMPLEADO_ERROR";

const GET_UNIVERSIDAD_EMPLEADO_LOADING = "GET_UNIVERSIDAD_EMPLEADO_LOADING";
const GET_UNIVERSIDAD_EMPLEADO_EXITO = "GET_UNIVERSIDAD_EMPLEADO_EXITO";
const GET_UNIVERSIDAD_EMPLEADO_ERROR = "GET_UNIVERSIDAD_EMPLEADO_ERROR";

const GET_IDIOMA_EMPLEADO_LOADING = "GET_IDIOMA_EMPLEADO_LOADING";
const GET_IDIOMA_EMPLEADO_EXITO = "GET_IDIOMA_EMPLEADO_EXITO";
const GET_IDIOMA_EMPLEADO_ERROR = "GET_IDIOMA_EMPLEADO_ERROR";

const GET_TRAYECTORIA_EMPLEADO_LOADING = "GET_TRAYECTORIA_EMPLEADO_LOADING";
const GET_TRAYECTORIA_EMPLEADO_EXITO = "GET_TRAYECTORIA_EMPLEADO_EXITO";
const GET_TRAYECTORIA_EMPLEADO_ERROR = "GET_TRAYECTORIA_EMPLEADO_ERROR";

const GET_FAMILIA_EMPLEADO_LOADING = "GET_FAMILIA_EMPLEADO_LOADING";
const GET_FAMILIA_EMPLEADO_EXITO = "GET_FAMILIA_EMPLEADO_EXITO";
const GET_FAMILIA_EMPLEADO_ERROR = "GET_FAMILIA_EMPLEADO_ERROR";

const GET_INSUMOS_EMPLEADO_LOADING = "GET_INSUMOS_EMPLEADO_LOADING";
const GET_INSUMOS_EMPLEADO_EXITO = "GET_INSUMOS_EMPLEADO_EXITO";
const GET_INSUMOS_EMPLEADO_ERROR = "GET_INSUMOS_EMPLEADO_ERROR";

const GET_CUENTAS_BANCARIAS_EMPLEADO_LOADING = "GET_CUENTAS_BANCARIAS_EMPLEADO_LOADING";
const GET_CUENTAS_BANCARIAS_EMPLEADO_EXITO = "GET_CUENTAS_BANCARIAS_EMPLEADO_EXITO";
const GET_CUENTAS_BANCARIAS_EMPLEADO_ERROR = "GET_CUENTAS_BANCARIAS_EMPLEADO_ERROR";

const GET_VACACIONES_EMPLEADO_LOANDING = "GET_VACACIONES_EMPLEADO_LOANDING";
const GET_VACACIONES_EMPLEADO_EXITO = "GET_VACACIONES_EMPLEADO_EXITO";
const GET_VACACIONES_EMPLEADO_ERROR = "GET_VACACIONES_EMPLEADO_ERROR";

const SET_DATOS_EMPLEADO_LOADING = "SET_DATOS_EMPLEADO_LOADING";
const SET_DATOS_EMPLEADO_EXITO = "SET_DATOS_EMPLEADO_EXITO";
const SET_DATOS_EMPLEADO_ERROR = "SET_DATOS_EMPLEADO_ERROR";

const NUEVA_UNIVERSIDAD_LOADING = "NUEVA_UNIVERSIDAD_LOADING";
const NUEVA_UNIVERSIDAD_EXITO = "NUEVA_UNIVERSIDAD_EXITO";
const NUEVA_UNIVERSIDAD_ERROR = "NUEVA_UNIVERSIDAD_ERROR";

const SET_UNIVERSIDAD_LOADING = "SET_UNIVERSIDAD_LOADING";
const SET_UNIVERSIDAD_EXITO = "SET_UNIVERSIDAD_EXITO";
const SET_UNIVERSIDAD_ERROR = "SET_UNIVERSIDAD_ERROR";

const ELIMINAR_UNIVERSIDAD_LOADING = "ELIMINAR_UNIVERSIDAD_LOADING";
const ELIMINAR_UNIVERSIDAD_EXITO = "ELIMINAR_UNIVERSIDAD_EXITO";
const ELIMINAR_UNIVERSIDAD_ERROR = "ELIMINAR_UNIVERSIDAD_ERROR";

const NUEVA_IDIOMA_LOADING = "NUEVA_IDIOMA_LOADING";
const NUEVA_IDIOMA_EXITO = "NUEVA_IDIOMA_EXITO";
const NUEVA_IDIOMA_ERROR = "NUEVA_IDIOMA_ERROR";

const EDITAR_IDIOMA_LOADING = "EDITAR_IDIOMA_LOADING";
const EDITAR_IDIOMA_EXITO = "EDITAR_IDIOMA_EXITO";
const EDITAR_IDIOMA_ERROR = "EDITAR_IDIOMA_ERROR";

const ELIMINAR_IDIOMA_LOADING = "ELIMINAR_IDIOMA_LOADING";
const ELIMINAR_IDIOMA_EXITO = "ELIMINAR_IDIOMA_EXITO";
const ELIMINAR_IDIOMA_ERROR = "ELIMINAR_IDIOMA_ERROR";

const NUEVA_TRAYECTORIA_LOADING = "NUEVA_TRAYECTORIA_LOADING";
const NUEVA_TRAYECTORIA_EXITO = "NUEVA_TRAYECTORIA_EXITO";
const NUEVA_TRAYECTORIA_ERROR = "NUEVA_TRAYECTORIA_ERROR";

const EDITAR_TRAYECTORIA_LOADING = "EDITAR_TRAYECTORIA_LOADING";
const EDITAR_TRAYECTORIA_EXITO = "EDITAR_TRAYECTORIA_EXITO";
const EDITAR_TRAYECTORIA_ERROR = "EDITAR_TRAYECTORIA_ERROR";

const ELIMINAR_TRAYECTORIA_LOADING = "ELIMINAR_TRAYECTORIA_LOADING";
const ELIMINAR_TRAYECTORIA_EXITO = "ELIMINAR_TRAYECTORIA_EXITO";
const ELIMINAR_TRAYECTORIA_ERROR = "ELIMINAR_TRAYECTORIA_ERROR";

const NUEVO_FAMILIAR_LOADING = "NUEVO_FAMILIAR_LOADING";
const NUEVO_FAMILIAR_EXITO = "NUEVO_FAMILIAR_EXITO";
const NUEVO_FAMILIAR_ERROR = "NUEVO_FAMILIAR_ERROR";

const EDITAR_FAMILIAR_LOADING = "EDITAR_FAMILIAR_LOADING";
const EDITAR_FAMILIAR_EXITO = "EDITAR_FAMILIAR_EXITO";
const EDITAR_FAMILIAR_ERROR = "EDITAR_FAMILIAR_ERROR";

const ELIMINAR_FAMILIAR_LOADING = "ELIMINAR_FAMILIAR_LOADING";
const ELIMINAR_FAMILIAR_EXITO = "ELIMINAR_FAMILIAR_EXITO";
const ELIMINAR_FAMILIAR_ERROR = "ELIMINAR_FAMILIAR_ERROR";

const NUEVO_INSUMO_LOADING = "NUEVO_INSUMO_LOADING";
const NUEVO_INSUMO_EXITO = "NUEVO_INSUMO_EXITO";
const NUEVO_INSUMO_ERROR = "NUEVO_INSUMO_ERROR";

const EDITAR_INSUMO_LOADING = "EDITAR_INSUMO_LOADING";
const EDITAR_INSUMO_EXITO = "EDITAR_INSUMO_EXITO";
const EDITAR_INSUMO_ERROR = "EDITAR_INSUMO_ERROR";

const ELIMINAR_INSUMO_LOADING = "ELIMINAR_INSUMO_LOADING";
const ELIMINAR_INSUMO_EXITO = "ELIMINAR_INSUMO_EXITO";
const ELIMINAR_INSUMO_ERROR = "ELIMINAR_INSUMO_ERROR";

const NUEVO_CUENTA_BANCARIA_LOADING = "NUEVO_CUENTA_BANCARIA_LOADING";
const NUEVO_CUENTA_BANCARIA_EXITO = "NUEVO_CUENTA_BANCARIA_EXITO";
const NUEVO_CUENTA_BANCARIA_ERROR = "NUEVO_CUENTA_BANCARIA_ERROR";

const EDITAR_CUENTA_BANCARIA_LOADING = "EDITAR_CUENTA_BANCARIA_LOADING";
const EDITAR_CUENTA_BANCARIA_EXITO = "EDITAR_CUENTA_BANCARIA_EXITO";
const EDITAR_CUENTA_BANCARIA_ERROR = "EDITAR_CUENTA_BANCARIA_ERROR";

const ELIMINAR_CUENTA_BANCARIA_LOADING = "ELIMINAR_CUENTA_BANCARIA_LOADING";
const ELIMINAR_CUENTA_BANCARIA_EXITO = "ELIMINAR_CUENTA_BANCARIA_EXITO";
const ELIMINAR_CUENTA_BANCARIA_ERROR = "ELIMINAR_CUENTA_BANCARIA_ERROR";

const GET_RECIBOS_LOADING = "GET_RECIBOS_LOADING";
const GET_RECIBOS_EXITO = "GET_RECIBOS_EXITO";
const GET_RECIBOS_ERROR = "GET_RECIBOS_ERROR";

export default function empleadoReducers(state = dataInicial, action) {
  switch (action.type) {
    case GET_EMPLEADO_LOADING:
      return { ...state, resultadoEmpleado: action.loading };
    case GET_EMPLEADO_EXITO:
      return { ...state, empleado: action.payload, resultadoEmpleado: action.loading };
    case GET_EMPLEADO_ERROR:
      return { ...state, resultadoEmpleado: action.loading };
    case GET_UNIVERSIDAD_EMPLEADO_LOADING:
      return { ...state, loadingUniversidades: action.loading };
    case GET_UNIVERSIDAD_EMPLEADO_EXITO:
      return {
        ...state,
        universidad: action.payload,
        loadingUniversidades: action.loading,
      };
    case GET_UNIVERSIDAD_EMPLEADO_ERROR:
      return { ...state, loadingUniversidades: action.loading };
    case GET_IDIOMA_EMPLEADO_EXITO:
      return {
        ...state,
        idiomas: action.payload,
        loadingIdiomas: action.loading,
      };
    case GET_IDIOMA_EMPLEADO_LOADING:
      return { ...state, loadingIdiomas: action.loading };
    case GET_IDIOMA_EMPLEADO_ERROR:
      return { ...state, loadingIdiomas: action.loading };
    case GET_TRAYECTORIA_EMPLEADO_LOADING:
      return { ...state, loadingTrayectoria: action.loading };
    case GET_TRAYECTORIA_EMPLEADO_EXITO:
      return {
        ...state,
        trayectorias: action.payload,
        loadingTrayectoria: action.loading,
      };
    case GET_TRAYECTORIA_EMPLEADO_ERROR:
      return { ...state, loadingTrayectoria: action.loading };
    case GET_FAMILIA_EMPLEADO_LOADING:
      return { ...state, loadingFamiliares: action.loading };
    case GET_FAMILIA_EMPLEADO_EXITO:
      return {
        ...state,
        familiares: action.payload,
        loadingFamiliares: action.loading,
      };
    case GET_FAMILIA_EMPLEADO_ERROR:
      return { ...state, loadingFamiliares: action.loading };
    case GET_INSUMOS_EMPLEADO_LOADING:
      return { ...state, loadingInsumos: action.loading };
    case GET_INSUMOS_EMPLEADO_EXITO:
      return {
        ...state,
        insumos: action.payload,
        loadingInsumos: action.loading,
      };
    case GET_INSUMOS_EMPLEADO_ERROR:
      return { ...state, loadingInsumos: action.loading };
    case GET_CUENTAS_BANCARIAS_EMPLEADO_LOADING:
      return { ...state, loadingCuentasBancarias: action.loading };
    case GET_CUENTAS_BANCARIAS_EMPLEADO_EXITO:
      return {
        ...state,
        cuentasBancarias: action.payload,
        loadingCuentasBancarias: action.loading,
      };
    case GET_CUENTAS_BANCARIAS_EMPLEADO_ERROR:
      return { ...state, loadingCuentasBancarias: action.loading };
    case GET_VACACIONES_EMPLEADO_LOANDING:
      return { ...state, loadingVacacionesEmpleado: action.loading };
    case GET_VACACIONES_EMPLEADO_EXITO:
      return {
        ...state,
        vacaciones: action.payload,
        loadingVacacionesEmpleado: action.loading,
      };
    case GET_VACACIONES_EMPLEADO_ERROR:
      return { ...state, loadingVacacionesEmpleado: action.loading };
    case SET_DATOS_EMPLEADO_LOADING:
      return { ...state, resultadoEditarDatos: action.resultado };
    case SET_DATOS_EMPLEADO_EXITO:
      return { ...state, resultadoEditarDatos: action.resultado };
    case SET_DATOS_EMPLEADO_ERROR:
      return { ...state, resultadoEditarDatos: action.resultado };
    case NUEVA_UNIVERSIDAD_LOADING:
      return { ...state, resultadoNuevaUniversidad: action.resultado };
    case NUEVA_UNIVERSIDAD_EXITO:
      return { ...state, resultadoNuevaUniversidad: action.resultado };
    case NUEVA_UNIVERSIDAD_ERROR:
      return { ...state, resultadoNuevaUniversidad: action.resultado };
    case SET_UNIVERSIDAD_LOADING:
      return { ...state, resultadoEditarUniversidad: action.resultado };
    case SET_UNIVERSIDAD_EXITO:
      return { ...state, resultadoEditarUniversidad: action.resultado };
    case SET_UNIVERSIDAD_ERROR:
      return { ...state, resultadoEditarUniversidad: action.resultado };
    case ELIMINAR_UNIVERSIDAD_LOADING:
      return { ...state, resultadoEliminarUniversidad: action.resultado };
    case ELIMINAR_UNIVERSIDAD_EXITO:
      return { ...state, resultadoEliminarUniversidad: action.resultado };
    case ELIMINAR_UNIVERSIDAD_ERROR:
      return { ...state, resultadoEliminarUniversidad: action.resultado };
    case NUEVA_IDIOMA_LOADING:
      return { ...state, resultadoNuevoIdioma: action.resultado };
    case NUEVA_IDIOMA_EXITO:
      return { ...state, resultadoNuevoIdioma: action.resultado };
    case NUEVA_IDIOMA_ERROR:
      return { ...state, resultadoNuevoIdioma: action.resultado };
    case EDITAR_IDIOMA_LOADING:
      return { ...state, resultadoEditarIdioma: action.resultado };
    case EDITAR_IDIOMA_EXITO:
      return { ...state, resultadoEditarIdioma: action.resultado };
    case EDITAR_IDIOMA_ERROR:
      return { ...state, resultadoEditarIdioma: action.resultado };
    case ELIMINAR_IDIOMA_LOADING:
      return { ...state, resultadoEliminarIdioma: action.resultado };
    case ELIMINAR_IDIOMA_EXITO:
      return { ...state, resultadoEliminarIdioma: action.resultado };
    case ELIMINAR_IDIOMA_ERROR:
      return { ...state, resultadoEliminarIdioma: action.resultado };
    case NUEVA_TRAYECTORIA_LOADING:
      return { ...state, resultadoNuevaTrayectoria: action.resultado };
    case NUEVA_TRAYECTORIA_EXITO:
      return { ...state, resultadoNuevaTrayectoria: action.resultado };
    case NUEVA_TRAYECTORIA_ERROR:
      return { ...state, resultadoNuevaTrayectoria: action.resultado };
    case EDITAR_TRAYECTORIA_LOADING:
      return { ...state, resultadoEditarTrayectoria: action.resultado };
    case EDITAR_TRAYECTORIA_EXITO:
      return { ...state, resultadoEditarTrayectoria: action.resultado };
    case EDITAR_TRAYECTORIA_ERROR:
      return { ...state, resultadoEditarTrayectoria: action.resultado };
    case ELIMINAR_TRAYECTORIA_LOADING:
      return { ...state, resultadoEliminarTrayectoria: action.resultado };
    case ELIMINAR_TRAYECTORIA_EXITO:
      return { ...state, resultadoEliminarTrayectoria: action.resultado };
    case ELIMINAR_TRAYECTORIA_ERROR:
      return { ...state, resultadoEliminarTrayectoria: action.resultado };
    case NUEVO_FAMILIAR_LOADING:
      return { ...state, resultadoNuevoFamiliar: action.resultado };
    case NUEVO_FAMILIAR_EXITO:
      return { ...state, resultadoNuevoFamiliar: action.resultado };
    case NUEVO_FAMILIAR_ERROR:
      return { ...state, resultadoNuevoFamiliar: action.resultado };
    case EDITAR_FAMILIAR_LOADING:
      return { ...state, resultadoEditarFamiliar: action.resultado };
    case EDITAR_FAMILIAR_EXITO:
      return { ...state, resultadoEditarFamiliar: action.resultado };
    case EDITAR_FAMILIAR_ERROR:
      return { ...state, resultadoEditarFamiliar: action.resultado };
    case ELIMINAR_FAMILIAR_LOADING:
      return { ...state, resultadoEliminarFamiliar: action.resultado };
    case ELIMINAR_FAMILIAR_EXITO:
      return { ...state, resultadoEliminarFamiliar: action.resultado };
    case ELIMINAR_FAMILIAR_ERROR:
      return { ...state, resultadoEliminarFamiliar: action.resultado };
    case NUEVO_INSUMO_LOADING:
      return { ...state, resultadoNuevoInsumo: action.resultado };
    case NUEVO_INSUMO_EXITO:
      return { ...state, resultadoNuevoInsumo: action.resultado };
    case NUEVO_INSUMO_ERROR:
      return { ...state, resultadoNuevoInsumo: action.resultado };
    case EDITAR_INSUMO_LOADING:
      return { ...state, resultadoEditarInsumo: action.resultado };
    case EDITAR_INSUMO_EXITO:
      return { ...state, resultadoEditarInsumo: action.resultado };
    case EDITAR_INSUMO_ERROR:
      return { ...state, resultadoEditarInsumo: action.resultado };
    case ELIMINAR_INSUMO_ERROR:
      return { ...state, resultadoEliminarInsumo: action.resultado };
    case ELIMINAR_INSUMO_LOADING:
      return { ...state, resultadoEliminarInsumo: action.resultado };
    case ELIMINAR_INSUMO_EXITO:
      return { ...state, resultadoEliminarInsumo: action.resultado };
    case NUEVO_CUENTA_BANCARIA_LOADING:
      return { ...state, resultadoNuevaCuentaBancaria: action.resultado };
    case NUEVO_CUENTA_BANCARIA_EXITO:
      return { ...state, resultadoNuevaCuentaBancaria: action.resultado };
    case NUEVO_CUENTA_BANCARIA_ERROR:
      return { ...state, resultadoNuevaCuentaBancaria: action.resultado };
    case EDITAR_CUENTA_BANCARIA_LOADING:
      return { ...state, resultadoEditarCuentaBancaria: action.resultado };
    case EDITAR_CUENTA_BANCARIA_EXITO:
      return { ...state, resultadoEditarCuentaBancaria: action.resultado };
    case EDITAR_CUENTA_BANCARIA_ERROR:
      return { ...state, resultadoEditarCuentaBancaria: action.resultado };
    case ELIMINAR_CUENTA_BANCARIA_LOADING:
      return { ...state, resultadoEliminarCuentaBancaria: action.resultado };
    case ELIMINAR_CUENTA_BANCARIA_EXITO:
      return { ...state, resultadoEliminarCuentaBancaria: action.resultado };
    case ELIMINAR_CUENTA_BANCARIA_ERROR:
      return { ...state, resultadoEliminarCuentaBancaria: action.resultado };
    case GET_RECIBOS_LOADING:
      return { ...state, loadingRecibos: action.loading };
    case GET_RECIBOS_EXITO:
      return {
        ...state,
        recibos: action.payload,
        loadingRecibos: action.loading,
      };
    case GET_RECIBOS_ERROR:
      return { ...state, loadingRecibos: action.loading };
    default:
      return { ...state };
  }
}

export const getEmpleado = (empleadoid, token) => async (dispatch) => {
  dispatch({
    type: GET_EMPLEADO_LOADING,
    loading: false,
  });
  if (!token && !empleadoid) {
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
      // "<attribute name='new_proximocumpleanios' />" +
      "<attribute name='new_usuario' />" +
      "<attribute name='new_universitariocompleto' />" +
      "<attribute name='new_turnorotativo' />" +
      "<attribute name='new_tipodocumento' />" +
      "<attribute name='new_tipodeincorporacion' />" +
      "<attribute name='new_telefonoparticular' />" +
      "<attribute name='new_telefonomovil' />" +
      "<attribute name='new_tecnico' />" +
      "<attribute name='new_secundariocompleto' />" +
      "<attribute name='new_primariocompleto' />" +
      "<attribute name='new_nombredepila' />" +
      "<attribute name='new_telefonodeltrabajo' />" +
      "<attribute name='new_empresa' />" +
      "<attribute name='new_usuarioportalrh' />" +
      "<attribute name='new_reportaaid' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='new_puesto' />" +
      "<attribute name='new_provincia' />" +
      "<attribute name='new_pais' />" +
      "<attribute name='new_nrodocumento' />" +
      "<attribute name='new_nro' />" +
      "<attribute name='new_localidad' />" +
      "<attribute name='new_jefe' />" +
      "<attribute name='new_fechanacimiento' />" +
      // "<attribute name='new_fechavacaciones' />" +
      "<attribute name='new_fechaingreso' />" +
      "<attribute name='new_evaluador' />" +
      "<attribute name='new_estadocivil' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_edad' />" +
      "<attribute name='new_cuentaporempleadoid' />" +
      "<attribute name='new_correoelectronicocorporativo' />" +
      "<attribute name='new_contactoportal' />" +
      "<attribute name='new_codigopostal' />" +
      "<attribute name='new_categoria' />" +
      "<attribute name='new_calle' />" +
      "<attribute name='createdby' />" +
      "<attribute name='new_apellidos' />" +
      "<attribute name='new_antiguedadenelcargo' />" +
      "<attribute name='new_antiguedadcargo' />" +
      "<attribute name='new_antiguedad' />" +
      "<attribute name='new_acumulavacaciones' />" +
      // "<attribute name='new_proximoaniversario' />" +
      "<attribute name='new_sexo' />" +
      "<attribute name='new_sufijo' />" +
      "<attribute name='new_piso' />" +
      "<attribute name='new_depto' />" +
      "<attribute name='new_segmentocontratacion' />" +
      "<attribute name='new_secundarioincompleto' />" +
      "<attribute name='new_provincianacimiento' />" +
      "<attribute name='new_paisnacimiento' />" +
      "<attribute name='new_pais' />" +
      "<attribute name='new_tecnico' />" +
      "<attribute name='new_peritomercantil' />" +
      "<attribute name='new_bachiller' />" +
      "<attribute name='new_extenciontelefonica' />" +
      "<order attribute='new_numerolegajo' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_empleadoid' operator='eq' value='" +
      empleadoid +
      "' />" +
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
        type: GET_EMPLEADO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_EMPLEADO_ERROR,
        loading: true,
      });
    }
  }
};

export const getUniversidadEmpleado = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_UNIVERSIDAD_EMPLEADO_LOADING,
    loading: false,
  });
  if (!token && !empleadoid) {
    return;
  } else {
    const entidad = "new_universidadporcontactos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_universidadporcontacto'>" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_universidadporcontactoid' />" +
      "<attribute name='new_universidad' />" +
      "<attribute name='new_titulo' />" +
      "<attribute name='new_tipodecarrera' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='new_fechaegreso' />" +
      "<attribute name='new_fechadeingreso' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_encurso' />" +
      "<attribute name='new_empleado' />" +
      "<attribute name='new_carrera' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_empleado' operator='eq' uitype='new_empleado' value='" +
      empleadoid +
      "' />" +
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
        type: GET_UNIVERSIDAD_EMPLEADO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_UNIVERSIDAD_EMPLEADO_ERROR,
        loading: true,
      });
    }
  }
};

export const getIdiomaEmpleado = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_IDIOMA_EMPLEADO_LOADING,
    loading: false,
  });
  if (!token && !empleadoid) {
    return;
  } else {
    const entidad = "new_idiomaporcontactos";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_idiomaporcontacto'>" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_idiomaporcontactoid' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='new_nivel' />" +
      "<attribute name='new_lee' />" +
      "<attribute name='new_idioma' />" +
      "<attribute name='new_habla' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_escribe' />" +
      "<attribute name='new_empleado' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_empleado' operator='eq' uitype='new_empleado' value='" +
      empleadoid +
      "' />" +
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
        type: GET_IDIOMA_EMPLEADO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_IDIOMA_EMPLEADO_ERROR,
        loading: true,
      });
    }
  }
};

export const getTrayectoriaPorEmpleado = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_TRAYECTORIA_EMPLEADO_LOADING,
    loading: false,
  });
  if (!token && !empleadoid) {
    return;
  } else {
    const entidad = "new_trayectorias";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_trayectoria'>" +
      "<attribute name='new_trayectoriaid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_trayectoriaenlacompania' />" +
      "<attribute name='new_reportaa' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='new_puesto' />" +
      "<attribute name='ownerid' />" +
      "<attribute name='new_organizacion' />" +
      "<attribute name='new_fechahasta' />" +
      "<attribute name='new_fechadesde' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_empresa' />" +
      "<attribute name='new_empleado' />" +
      "<attribute name='new_posicion' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_empleado' operator='eq' uitype='new_empleado' value='" +
      empleadoid +
      "' />" +
      "<condition attribute='statuscode' operator='eq' value='1' />" +
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
        type: GET_TRAYECTORIA_EMPLEADO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_TRAYECTORIA_EMPLEADO_ERROR,
        loading: true,
      });
    }
  }
};

export const getFamiliaPorEmpleado = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_FAMILIA_EMPLEADO_LOADING,
    loading: false,
  });
  if (!token && !empleadoid) {
    return;
  } else {
    const entidad = "new_familiardeempleados";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_familiardeempleado'>" +
      "<attribute name='new_familiardeempleadoid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_tipodocumento' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='new_parentesco' />" +
      "<attribute name='new_ocupacion' />" +
      "<attribute name='new_nrodocumento' />" +
      "<attribute name='new_nombredepila' />" +
      "<attribute name='new_sexo' />" +
      "<attribute name='new_fechanacimiento' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_empleado' />" +
      "<attribute name='new_edad' />" +
      "<attribute name='new_cargadefamilia' />" +
      "<attribute name='new_apellidos' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_empleado' operator='eq' uitype='new_empleado' value='" +
      empleadoid +
      "' />" +
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
        type: GET_FAMILIA_EMPLEADO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_FAMILIA_EMPLEADO_ERROR,
        loading: true,
      });
    }
  }
};

export const getInsumosPorEmpleado = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_INSUMOS_EMPLEADO_LOADING,
    loading: false,
  });
  if (!token && !empleadoid) {
    return;
  } else {
    const entidad = "new_insumoparapersonals";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_insumoparapersonal'>" +
      "<attribute name='new_insumoparapersonalid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_tipodeinsumo' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='ownerid' />" +
      "<attribute name='new_poseecertificacion' />" +
      "<attribute name='new_observaciones' />" +
      "<attribute name='new_modelo' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_empleado' />" +
      "<attribute name='owningbusinessunit' />" +
      "<attribute name='new_marca' />" +
      "<attribute name='modifiedon' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_empleado' operator='eq' uitype='new_empleado' value='" +
      empleadoid +
      "' />" +
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
        type: GET_INSUMOS_EMPLEADO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_INSUMOS_EMPLEADO_ERROR,
        loading: true,
      });
    }
  }
};

export const getCuentasBancariasPorEmpleado = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_CUENTAS_BANCARIAS_EMPLEADO_LOADING,
    loading: false,
  });
  if (!token && !empleadoid) {
    return;
  } else {
    const entidad = "new_cuentabancarias";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_cuentabancaria'>" +
      "<attribute name='new_cuentabancariaid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_tipodecuenta' />" +
      "<attribute name='new_sucursal' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='ownerid' />" +
      "<attribute name='new_numerodecuenta' />" +
      "<attribute name='new_numerocuenta' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_entidadbancaria' />" +
      "<attribute name='new_empleado' />" +
      "<attribute name='new_cbu' />" +
      "<attribute name='new_banco' />" +
      "<attribute name='transactioncurrencyid' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_empleado' operator='eq' uitype='new_empleado' value='" +
      empleadoid +
      "' />" +
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
        type: GET_CUENTAS_BANCARIAS_EMPLEADO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CUENTAS_BANCARIAS_EMPLEADO_ERROR,
        loading: true,
      });
    }
  }
};

export const getVacacionesPorEmpleado = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: GET_VACACIONES_EMPLEADO_LOANDING,
    loading: true,
  });
  if (!token && !empleadoid) {
    return;
  } else {
    const entidad = "new_vacacioneses";
    const fetchXML =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='new_vacaciones'>" +
      "<attribute name='new_vacacionesid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_vacacionesliquidadas' />" +
      "<attribute name='new_totaldiassolicitados' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='ownerid' />" +
      "<attribute name='new_fechahasta' />" +
      "<attribute name='new_fechadesde' />" +
      "<attribute name='overriddencreatedon' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_empresa' />" +
      "<attribute name='new_empleado' />" +
      "<attribute name='new_diasvacacionestotales' />" +
      "<attribute name='new_diasvacacionestomados' />" +
      "<attribute name='new_diasvacacionespendientes' />" +
      "<attribute name='new_diasvacacionescorrespondientes' />" +
      "<attribute name='new_dasvacacionesaosanteriores' />" +
      "<attribute name='new_diasvacacionesadicionales' />" +
      "<attribute name='new_diaspendietesdelperiodoanterior' />" +
      "<attribute name='createdby' />" +
      "<order attribute='createdon' descending='true' />" +
      "<filter type='and'>" +
      "<condition attribute='new_empleado' operator='eq' uitype='new_empleado' value='" +
      empleadoid +
      "' />" +
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
        type: GET_VACACIONES_EMPLEADO_EXITO,
        loading: true,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_VACACIONES_EMPLEADO_ERROR,
        loading: true,
      });
    }
  }
};

export const setDatosEmpleado = (empleadoid, token, datos) => async (dispatch) => {
  dispatch({
    type: SET_DATOS_EMPLEADO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(
          `${UrlApi}api/hrfactors/empleado`,
          {
            new_empleadoid: empleadoid,
            new_nombredepila: datos.nombreDePila,
            new_apellidos: datos.apellido,
            new_numerolegajo: datos.nroLegajo ? Number(datos.nroLegajo) : 0,
            new_tipodocumento: datos.tipoDocumento?.value ? Number(datos.tipoDocumento.value) : 0,
            new_nrodocumento: datos.numeroDocumento?.toString(),
            new_cuitcuil: datos?.cuitCuil?.toString(),
            new_correoelectronico: datos.email,
            new_sexo: datos.genero?.value ? datos.genero?.value : false,
            new_estadocivil: datos.estadoCivil?.value ? Number(datos.estadoCivil.value) : 0,
            new_telefonomovil: datos.telefonoMovil?.toString(),
            new_telefonoparticular: datos.telefonoParticular?.toString(),
            new_extenciontelefonica: datos.extencionTefefonica?.toString(),
            new_tipodeincorporacion: datos.tipoContratacion?.value ? Number(datos.tipoContratacion.value) : 0,
            new_fechanacimiento: datos.fechaNacimiento ? moment(datos.fechaNacimiento).format("YYYY-MM-DD") : "",
            new_paisnacimiento: datos.paisNacimiento?.value ? datos.paisNacimiento?.value : "",
            new_edad: datos.edad ? Number(datos.edad) : 0,
            new_provincianacimiento: datos.provinciaNacimiento?.value ? datos.provinciaNacimiento?.value : "",
            new_calle: datos.calle,
            new_nro: datos.nroCalle?.toString(),
            new_piso: datos.piso?.toString(),
            new_depto: datos.depto?.toString(),
            new_localidad: datos.localidad?.value ? datos.localidad?.value : "",
            new_codigopostal: datos.codigoPostal?.toString(),
            // new_provincia: datos.provincia?.value ? datos.provincia?.value : "",
            new_pais: datos.pais?.value ? datos.pais?.value : "",
            new_primariocompleto: datos.primarioCompleto,
            new_secundariocompleto: datos.secundarioCompleto,
            new_secundarioincompleto: datos.secundarioIncompleto,
            new_bachiller: datos.bachiller,
            new_tecnico: datos.tecnico,
            new_peritomercantil: datos.peritoMercantil,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: SET_DATOS_EMPLEADO_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Datos actualizados con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: SET_DATOS_EMPLEADO_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const newUniversidadEmpleado = (empleadoid, token, datos) => async (dispatch) => {
  dispatch({
    type: NUEVA_UNIVERSIDAD_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.post(
          `${UrlApi}api/hrfactors/universidadporempleado`,
          {
            new_universidad: datos.universidadSelet?.value,
            new_empleado: empleadoid,
            new_carrera: datos.carreraSelect?.value,
            new_fechadeingreso: datos.fechaIngresoSelect ? moment(datos.fechaIngresoSelect).format("YYYY-MM-DD") : "",
            new_fechaegreso: datos.fechaEgresoSelect ? moment(datos.fechaEgresoSelect).format("YYYY-MM-DD") : "",
            new_tipodecarrera: datos.tipoCarreraSelect?.value ? Number(datos.tipoCarreraSelect.value) : 0,
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
            type: NUEVA_UNIVERSIDAD_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Universidad cargada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: NUEVA_UNIVERSIDAD_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const setUniversidadEmpleado = (empleadoid, token, datos) => async (dispatch) => {
  dispatch({
    type: SET_UNIVERSIDAD_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(
          `${UrlApi}api/hrfactors/universidadporempleado`,
          {
            new_universidadporcontactoId: datos.id,
            new_universidad: datos.universidadSelet?.value,
            new_empleado: empleadoid,
            new_carrera: datos.carreraSelect?.value,
            new_fechadeingreso: datos.fechaIngresoSelect
              ? moment(datos.fechafechaIngresoSelectIngreso).format("YYYY-MM-DD")
              : "",
            new_fechaegreso: datos.fechaEgresoSelect ? moment(datos.fechaEgresoSelect).format("YYYY-MM-DD") : "",
            new_tipodecarrera: datos.tipodeCarrera?.value ? Number(datos.tipodeCarrera.value) : 0,
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
            type: SET_UNIVERSIDAD_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Universidad editada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: SET_UNIVERSIDAD_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const eliminarUniversidadEmpleado = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_UNIVERSIDAD_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  try {
    const inactivarUniversidad = () =>
      new Promise(async (resolve, reject) => {
        await axios({
          method: "DELETE",
          url: `${UrlApi}api/hrfactors/universidadporempleado`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_universidadporcontactoId: id,
          },
        })
          .then((data) => {
            dispatch({
              type: ELIMINAR_UNIVERSIDAD_EXITO,
              resultado: "EXITO",
              payload: data.data,
            });
            resolve(data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });

    const response = await toast.promise(
      inactivarUniversidad,
      {
        success: "Proceso exitoso",
        error: {
          render({ data }) {
            return `Error al eliminar la universidad`;
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
          if (loadingToast !== null) {
            toast.dismiss(loadingToast);
          }
        },
      }
    );
  } catch (error) {
    dispatch({
      type: ELIMINAR_UNIVERSIDAD_ERROR,
      resultado: "ERROR",
    });
    ToastError("Error al eliminar la universidad");
  }
};

export const newIdiomaEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: NUEVA_IDIOMA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.post(
          `${UrlApi}api/hrfactors/idiomaporempleado`,
          {
            new_idioma: datos.idiomaSelect.value,
            new_empleado: empleadoid,
            new_habla: datos.hablaSelect?.value ? datos.hablaSelect.value : false,
            new_lee: datos.leeSelect?.value ? datos.leeSelect.value : false,
            new_escribe: datos.escribeSelect?.value ? datos.escribeSelect.value : false,
            new_nivel: datos.nivelSelect?.value ? datos.nivelSelect.value : 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: NUEVA_IDIOMA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Idioma cargado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: NUEVA_IDIOMA_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const editarIdiomaEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_IDIOMA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(
          `${UrlApi}api/hrfactors/idiomaporempleado`,
          {
            new_idiomaporcontactoid: datos.id,
            new_idioma: datos.idiomaSelect?.value,
            new_empleado: empleadoid,
            new_habla: datos.hablaSelect?.value ? datos.hablaSelect.value : false,
            new_lee: datos.leeSelect?.value ? datos.leeSelect.value : false,
            new_escribe: datos.escribeSelect?.value ? datos.escribeSelect.value : false,
            new_nivel: datos.nivelSelect?.value ? datos.nivelSelect.value : 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_IDIOMA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Idioma editado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: EDITAR_IDIOMA_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const eliminarIdiomaEmpleado = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_IDIOMA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  try {
    const inactivarIdioma = () =>
      new Promise(async (resolve, reject) => {
        await axios({
          method: "DELETE",
          url: `${UrlApi}api/hrfactors/idiomaporempleado`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_idiomaporcontactoid: id,
          },
        })
          .then((data) => {
            dispatch({
              type: ELIMINAR_IDIOMA_EXITO,
              resultado: "EXITO",
              payload: data.data,
            });
            resolve(data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });

    const response = await toast.promise(
      inactivarIdioma,
      {
        success: "Proceso exitoso",
        error: {
          render({ data }) {
            return `Error al eliminar el idioma`;
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
          if (loadingToast !== null) {
            toast.dismiss(loadingToast);
          }
        },
      }
    );
  } catch (error) {
    dispatch({
      type: ELIMINAR_IDIOMA_ERROR,
      resultado: "ERROR",
    });
  }
};

export const newTrayectoriaEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: NUEVA_TRAYECTORIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.post(
          `${UrlApi}api/hrfactors/trayectoria`,
          {
            new_empleado: empleadoid,
            new_empresa: datos.empresaSelect?.value,
            new_trayectoriaenlacompania: datos.trayectoriaCompaniaSelect?.value ? datos.trayectoriaCompaniaSelect.value : false,
            new_puesto: datos.puestoSelect?.value,
            new_fechadesde: datos.fechaDesdeModal ? moment(datos.fechaDesdeModal).format("YYYY-MM-DD") : "",
            new_fechahasta: datos.fechaHastaModal ? moment(datos.fechaHastaModal).format("YYYY-MM-DD") : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: NUEVA_TRAYECTORIA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Trayectoria cargada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: NUEVA_TRAYECTORIA_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const editarTrayectoriaEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_TRAYECTORIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(
          `${UrlApi}api/hrfactors/trayectoria`,
          {
            new_trayectoriaid: datos.id,
            new_empleado: empleadoid,
            new_empresa: datos.empresaSelect?.value,
            new_trayectoriaenlacompania: datos.trayectoriaCompaniaSelect?.value
              ? datos.trayectoriaCompaniaSelect.value
              : false,
            new_puesto: datos.puestoSelect.value,
            new_fechadesde: datos.fechaDesdeModal ? moment(datos.fechaDesdeModal).format("YYYY-MM-DD") : "",
            new_fechahasta: datos.fechaHastaModal ? moment(datos.fechaHastaModal).format("YYYY-MM-DD") : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_TRAYECTORIA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Trayectoria editada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: EDITAR_TRAYECTORIA_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const eliminarTrayectoriaEmpleado = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_TRAYECTORIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  try {
    const inactivarTrayectoria = () =>
      new Promise(async (resolve, reject) => {
        await axios({
          method: "DELETE",
          url: `${UrlApi}api/hrfactors/trayectoria`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_trayectoriaid: id,
          },
        })
          .then((data) => {
            dispatch({
              type: ELIMINAR_TRAYECTORIA_EXITO,
              resultado: "EXITO",
              payload: data.data,
            });
            resolve(data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });

    const response = await toast.promise(
      inactivarTrayectoria,
      {
        pending: "Procesando...",
        success: "Proceso exitoso",
        error: {
          render({ data }) {
            return `Error al eliminar la trayectoria`;
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
          if (loadingToast !== null) {
            toast.dismiss(loadingToast);
          }
        },
      }
    );
  } catch (error) {
    dispatch({
      type: ELIMINAR_TRAYECTORIA_ERROR,
      resultado: "ERROR",
    });
  }
};

export const newFamiliarEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: NUEVO_FAMILIAR_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.post(
          `${UrlApi}api/hrfactors/familiardelempleado`,
          {
            new_empleado: empleadoid,
            new_tipodocumento: datos.tipoDocumentoSelect?.value ? Number(datos.tipoDocumentoSelect?.value) : 0,
            new_nrodocumento: datos.numeroDocumento?.toString(),
            new_nombredepila: datos.nombre,
            new_apellidos: datos.apellido,
            new_fechanacimiento: datos.fechaNacimientoModal ? moment(datos.fechaNacimientoModal).format("YYYY-MM-DD") : "",
            new_ocupacion: datos.ocupacionSelect?.value ? Number(datos.ocupacionSelect.value) : 0,
            new_sexo: datos.generoSelect?.value ? Number(datos.generoSelect.value) : 0,
            new_parentesco: datos.parentescoSelect?.value ? datos.parentescoSelect.value : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: NUEVO_FAMILIAR_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Familiar cargado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: NUEVO_FAMILIAR_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const editarFamiliarEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_FAMILIAR_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(
          `${UrlApi}api/hrfactors/familiardelempleado`,
          {
            new_familiardeempleadoid: datos.id,
            new_empleado: empleadoid,
            new_tipodocumento: datos.tipoDocumentoSelect?.value ? Number(datos.tipoDocumentoSelect?.value) : 0,
            new_nrodocumento: datos.numeroDocumento?.toString(),
            new_nombredepila: datos.nombre,
            new_apellidos: datos.apellido,
            new_fechanacimiento: datos.fechaNacimientoModal
              ? moment(datos.fechaNacimientoModal).format("YYYY-MM-DD")
              : "",
            new_ocupacion: datos.ocupacionSelect?.value ? Number(datos.ocupacionSelect.value) : 0,
            new_sexo: datos.generoSelect?.value ? Number(datos.generoSelect.value) : 0,
            new_parentesco: datos.parentescoSelect?.value ? datos.parentescoSelect.value : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_FAMILIAR_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Familiar editado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: EDITAR_FAMILIAR_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const eliminarFamiliarEmpleado = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_FAMILIAR_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  try {
    const inactivarFamiliar = () =>
      new Promise(async (resolve, reject) => {
        await axios({
          method: "DELETE",
          url: `${UrlApi}api/hrfactors/familiardelempleado`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_familiardeempleadoid: id,
          },
        })
          .then((data) => {
            dispatch({
              type: ELIMINAR_FAMILIAR_EXITO,
              resultado: "EXITO",
              payload: data.data,
            });
            resolve(data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });

    const response = await toast.promise(
      inactivarFamiliar,
      {
        success: "Proceso exitoso",
        error: {
          render({ data }) {
            return `Error al eliminar el familiar`;
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
          if (loadingToast !== null) {
            toast.dismiss(loadingToast);
          }
        },
      }
    );
  } catch (error) {
    dispatch({
      type: ELIMINAR_FAMILIAR_ERROR,
      resultado: "ERROR",
    });
  }
};

export const newInsumoEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: NUEVO_INSUMO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.post(
          `${UrlApi}api/hrfactors/insumo`,
          {
            new_empleado: empleadoid,
            new_modelo: datos.modeloSelect?.value ? Number(datos.modeloSelect.value) : 0,
            new_tipodeinsumo: datos.tipoInsumoSelect?.value ? Number(datos.tipoInsumoSelect?.value) : 0,
            new_marca: datos.marcaSelect?.value ? Number(datos.marcaSelect?.value) : 0,
            statuscode: datos.estadoSelect?.value ? Number(datos.estadoSelect?.value) : 0,
            new_observaciones: datos.observaciones,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: NUEVO_INSUMO_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Insumo cargado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: NUEVO_INSUMO_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const editarInsumoEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_INSUMO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(
          `${UrlApi}api/hrfactors/insumo`,
          {
            new_insumoparapersonalid: datos.id,
            new_empleado: empleadoid,
            new_modelo: datos.modeloSelect?.value ? Number(datos.modeloSelect.value) : 0,
            new_tipodeinsumo: datos.tipoInsumoSelect?.value ? Number(datos.tipoInsumoSelect?.value) : 0,
            new_marca: datos.marcaSelect?.value ? Number(datos.marcaSelect?.value) : 0,
            statuscode: datos.estadoSelect?.value ? Number(datos.estadoSelect?.value) : 0,
            new_observaciones: datos.observaciones,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_INSUMO_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Insumo editado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: EDITAR_INSUMO_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const eliminarInsumoEmpleado = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_INSUMO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  try {
    const inactivarInsumo = () =>
      new Promise(async (resolve, reject) => {
        await axios({
          method: "DELETE",
          url: `${UrlApi}api/hrfactors/insumo`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_insumoparapersonalid: id,
          },
        })
          .then((data) => {
            dispatch({
              type: ELIMINAR_INSUMO_EXITO,
              resultado: "EXITO",
              payload: data.data,
            });
            resolve(data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });

    const response = await toast.promise(
      inactivarInsumo,
      {
        success: "Proceso exitoso",
        error: {
          render({ data }) {
            return `Error al eliminar el insumo`;
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
          if (loadingToast !== null) {
            toast.dismiss(loadingToast);
          }
        },
      }
    );
  } catch (error) {
    dispatch({
      type: ELIMINAR_INSUMO_ERROR,
      resultado: "ERROR",
    });
  }
};

export const newCuentaBancariaEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: NUEVO_CUENTA_BANCARIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.post(
          `${UrlApi}api/hrfactors/datosbancario`,
          {
            new_empleado: empleadoid,
            new_banco: datos.bancoSelect?.value,
            new_tipodecuenta: datos.tipoDeCuentaSelect?.value ? Number(datos.tipoDeCuentaSelect.value) : 0,
            new_numerocuenta: datos.numeroDeCuenta,
            new_cbu: datos.cbu?.toString(),
            transactioncurrencyid: datos.divisaSelect?.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: NUEVO_CUENTA_BANCARIA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Cuenta bancaria cargada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: NUEVO_CUENTA_BANCARIA_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const editarCuentaBancariaEmpleado = (token, empleadoid, datos) => async (dispatch) => {
  dispatch({
    type: EDITAR_CUENTA_BANCARIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(
          `${UrlApi}api/hrfactors/datosbancario`,
          {
            new_cuentabancariaid: datos.id,
            new_empleado: empleadoid,
            new_banco: datos.bancoSelect?.value,
            new_tipodecuenta: datos.tipoDeCuentaSelect?.value ? Number(datos.tipoDeCuentaSelect.value) : 0,
            new_numerocuenta: datos.numeroDeCuenta,
            new_cbu: datos.cbu?.toString(),
            transactioncurrencyid: datos.divisaSelect?.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: EDITAR_CUENTA_BANCARIA_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Cuenta bancaria editada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data || "Ha ocurrido un error";
          ToastError(errorMessage);
          dispatch({
            type: EDITAR_CUENTA_BANCARIA_ERROR,
            resultado: "ERROR",
          });
          reject(error);
        });
    }
  });
};

export const eliminarCuentaBancariaEmpleado = (token, id) => async (dispatch) => {
  dispatch({
    type: ELIMINAR_CUENTA_BANCARIA_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...");
  try {
    const inactivarCuenta = () =>
      new Promise(async (resolve, reject) => {
        await axios({
          method: "DELETE",
          url: `${UrlApi}api/hrfactors/datosbancario`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            new_cuentabancariaid: id,
          },
        })
          .then((data) => {
            dispatch({
              type: ELIMINAR_CUENTA_BANCARIA_EXITO,
              resultado: "EXITO",
              payload: data.data,
            });
            resolve(data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });

    const response = await toast.promise(
      inactivarCuenta,
      {
        success: "Proceso exitoso",
        error: {
          render({ data }) {
            return `Error al eliminar la cuenta`;
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
          if (loadingToast !== null) {
            toast.dismiss(loadingToast);
          }
        },
      }
    );
  } catch (error) {
    dispatch({
      type: ELIMINAR_CUENTA_BANCARIA_ERROR,
      resultado: "ERROR",
    });
  }
};

export const getRecibosSueldo = (token, empleadoid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_RECIBOS_LOADING,
      loading: false,
    });

    if (!empleadoid || !token) {
      throw new Error("Empleado ID o token faltante.");
    }

    const entidad = "annotations";
    const fetchXml =
      "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='annotation'>" +
      "<attribute name='subject' />" +
      "<attribute name='notetext' />" +
      "<attribute name='filename' />" +
      "<attribute name='documentbody'/>" +
      "<attribute name='annotationid' />" +
      "<attribute name='mimetype'/>" +
      "<attribute name='subject'/>" +
      "<attribute name='filesize' />" +
      "<order attribute='subject' descending='false' />" +
      "<link-entity name='new_empleado' from='new_empleadoid' to='objectid' link-type='inner' alias='ac'>" +
      "<filter type='and'>" +
      "<condition attribute='new_empleadoid' operator='eq' uitype='new_empleado' value='" +
      empleadoid +
      "'/>" +
      "</filter>" +
      "</link-entity>" +
      "</entity>" +
      "</fetch>";

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
      type: GET_RECIBOS_EXITO,
      loading: true,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RECIBOS_ERROR,
      loading: true,
    });
  }
};
