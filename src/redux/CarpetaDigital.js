import axios from 'axios'
import { UrlApi } from '../keys'
import { toast } from 'react-toastify'

//Const
const dataInicial = {
    loading: false,
    loadingDocumentBody: false,
    documento: {},
    documentos: [],
    documentosPorCuenta: [],
    notaDescarga: [],
    cargaDocumento: '',
    documentoid: '',
    modificarDocumento: '',
    loadingDocumentos: false,
    retrieveDocsExito: false
}

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
    })
}

//Types
const CARGA_DOCUMENTOXCUENTA = 'CARGA_DOCUMENTOXCUENTA'
const DOCUMENTOXCUENTA_EXITO = 'DOCUMENTOXCUENTA_EXITO'
const DOCUMENTOID_SELECCIONADO = 'DOCUMENTOID_SELECCIONADO'
const TODOS_DOCUMENTOXCUENTA_EXITO = 'TODOS_DOCUMENTOXCUENTA_EXITO'
const DOCUMENTO_ACTUALIZADO_EXITO = 'DOCUMENTO_ACTUALIZADO_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'
const ERROR_DOCUMENTOS = 'ERROR_DOCUMENTOS'
const LIMPIAR_DOCUMENTO_EXITO = 'LIMPIAR_DOCUMENTO_EXITO'
const TODOS_DOCUMENTOXCUENTAACTIVOS_EXITO = 'TODOS_DOCUMENTOXCUENTAACTIVOS_EXITO'
const LOADING_TODOS_DOCUMENTOS = "LOADING_TODOS_DOCUMENTOS"
const LOADING_DOCUMENTOS = "LOADING_DOCUMENTOS"
const LOADING_NOTADESCARGA = 'LOADING_NOTADESCARGA'
const NOTADESCARGA_EXITO = 'NOTADESCARGA_EXITO'
const NOTADESCARGA_ERROR = 'NOTADESCARGA_ERROR'
const LIMPIAR_DOCUMENTBODY = 'LIMPIAR_DOCUMENTBODY'

//Reducers
export default function documentosPorCuentaReducers(state = dataInicial, action) {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial, cargaDocumento: action.cargaDocumento, modificarDocumento: action.modificarDocumento }
        case LOADING:
            return { ...state, cargaDocumento: action.cargaDocumento, modificarDocumento: action.modificarDocumento }
        case LOADING_DOCUMENTOS:
            return { ...state, cargaDocumento: action.cargaDocumento }
        case DOCUMENTOXCUENTA_EXITO:
            return { ...state, documento: action.payload }
        case DOCUMENTOID_SELECCIONADO:
            return { ...state, documentoid: action.documentoid }
        case DOCUMENTO_ACTUALIZADO_EXITO:
            return { ...state, modificarDocumento: action.modificarDocumento }
        case LIMPIAR_DOCUMENTO_EXITO:
            return { ...state, modificarDocumento: action.modificarDocumento }
        case TODOS_DOCUMENTOXCUENTAACTIVOS_EXITO:
            return { ...state, documentosPorCuenta: action.payload, loadingDocumentos: action.loadingDocumentos }
        //Portal socio
        case CARGA_DOCUMENTOXCUENTA:
            return { ...state, cargaDocumento: action.cargaDocumento, documentoid: action.documentoid }
        case TODOS_DOCUMENTOXCUENTA_EXITO:
            return { ...state, documentos: action.payload, loadingDocumentos: action.loadingDocumentos, retrieveDocsExito: action.retrieveDocsExito }
        case LOADING_TODOS_DOCUMENTOS:
            return { ...state, loadingDocumentos: action.loadingDocumentos, retrieveDocsExito: action.retrieveDocsExito }
        case ERROR_DOCUMENTOS:
            return { ...dataInicial, loadingDocumentos: action.loadingDocumentos, retrieveDocsExito: action.retrieveDocsExito }
        case LOADING_NOTADESCARGA:
            return { ...state, loadingDocumentBody: true }
        case NOTADESCARGA_EXITO:
            return { ...state, notaDescarga: action.payload, loadingDocumentBody: false }
        case NOTADESCARGA_ERROR:
            return { ...state, notaDescarga: [], loadingDocumentBody: false }
        case LIMPIAR_DOCUMENTBODY:
            return { ...state, notaDescarga: [], loadingDocumentBody: false }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerTodosDocumentosPorCuentaActivos = (token) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        var entidad = "new_documentacionporcuentas"
        var fetch = "<fetch mapping='logical'>" +
            "<entity name='new_documentacionporcuenta'>" +
            "<attribute name='new_documentacionporcuentaid'/> " +
            "<attribute name='new_name'/>" +
            "<attribute name='new_vinculocompartido'/> " +
            "<attribute name='statuscode'/> " +
            "<attribute name='new_documentoid'/> " +
            "<attribute name='new_fechadevencimiento'/> " +
            "<attribute name='new_visibleenportal'/> " +
            "<attribute name='new_cuentaid'/> " +
            "<attribute name='createdon'/> " +
            "<filter type='and'>" +
            "<condition attribute='statecode' operator='eq' value='0' />" +
            "</filter>" +
            "</entity>" +
            "</fetch>";

        await axios.post(`${UrlApi}api/consultafetch`,
            {
                entidad: entidad,
                fetch: fetch,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                dispatch({
                    type: TODOS_DOCUMENTOXCUENTAACTIVOS_EXITO,
                    payload: response.data
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: ERROR
                })
            });
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const obtenerTodosDocumentosPorCuentaActivosPorSocio = (token, accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        var entidad = "new_documentacionporcuentas"
        var fetch = "<fetch mapping='logical'>" +
            "<entity name='new_documentacionporcuenta'>" +
            "<attribute name='new_documentacionporcuentaid'/> " +
            "<attribute name='new_name'/>" +
            "<attribute name='new_vinculocompartido'/> " +
            "<attribute name='statuscode'/> " +
            "<attribute name='new_documentoid'/> " +
            "<attribute name='new_fechadevencimiento'/> " +
            "<attribute name='new_visibleenportal'/> " +
            "<attribute name='new_cuentaid'/> " +
            "<attribute name='createdon'/> " +
            "<filter type='and'>" +
            "<condition attribute='statecode' operator='eq' value='0' />" +
            `<condition attribute='new_cuentaid' operator='eq' value='${accountid}' />` +
            "</filter>" +
            "</entity>" +
            "</fetch>";

        return new Promise((resolve, reject) => {
            axios.post(`${UrlApi}api/consultafetch`,
                {
                    "entidad": entidad,
                    "fetch": fetch
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then((response) => {
                    dispatch({
                        type: TODOS_DOCUMENTOXCUENTAACTIVOS_EXITO,
                        payload: response.data
                    })
                    resolve(response.data)
                })
                .catch(err => {
                    ToastError("Error al buscar documentos")
                    reject(err)
                    dispatch({
                        type: ERROR
                    })
                })
        })
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const cargarDocumentacionPorCuenta = (token, formData, documentoId, mantenerEstado = "") => async (dispatch) => {
    debugger
    dispatch({
        type: CARGA_DOCUMENTOXCUENTA,
        cargaDocumento: 'LOADING'
    })

    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "multipart/form-data",
            },
        }
        const response = await axios.post(`${UrlApi}api/portalcasfog/cargardocumentacionporcuenta?documentacionporcuenta_id=${documentoId}&mantenerEstado=${mantenerEstado}`, formData, config)
            .then((respuesta) => {
                dispatch({
                    type: CARGA_DOCUMENTOXCUENTA,
                    cargaDocumento: 'EXITO'
                })
                ToastSuccess('La carga del archivo fue exitosa!')
            })
            .catch((error) => {
                console.log("Error Adjunto", error)
                dispatch({
                    type: CARGA_DOCUMENTOXCUENTA,
                    cargaDocumento: 'ERROR'
                })
                ToastError('La carga del archivo fallo!')
            });
    } catch (error) {
        dispatch({
            type: CARGA_DOCUMENTOXCUENTA,
            cargaDocumento: 'ERROR'
        })
        ToastError('La carga del archivo fallo!')
    }
}

export const obtenerDocumentoSeleccionado = (id) => async (dispatch) => {
    if (id !== undefined) {
        dispatch({
            type: DOCUMENTOID_SELECCIONADO,
            documentoid: id
        })
    }
}

export const modificarDocumentoSeleccionado = (token, documentoid, estado, fechaVencimiento = "", visiblePortal = "",) => async (dispatch) => {
    dispatch({
        type: DOCUMENTO_ACTUALIZADO_EXITO,
        modificarDocumento: 'LOADING'
    })

    try {
        await axios.put(`${UrlApi}api/portalcasfog/actualizardocumentacionporcuenta`,
            {
                "new_documentacionporcuentaid": documentoid,
                "statuscode": estado,
                "new_fechadevencimiento": fechaVencimiento,
                "new_visibleenportal": visiblePortal
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                console.log(response)
                dispatch({
                    type: DOCUMENTO_ACTUALIZADO_EXITO,
                    modificarDocumento: 'EXITO'
                })

                ToastSuccess('La actualizacion del documento fue exitosa!')

            }).catch((error) => {
                console.log(error)
                dispatch({
                    type: DOCUMENTO_ACTUALIZADO_EXITO,
                    modificarDocumento: 'ERROR'
                })
                ToastError('El actualizacion del documento fallo!')
            })

    } catch (error) {
        dispatch({
            type: DOCUMENTO_ACTUALIZADO_EXITO,
            modificarDocumento: 'ERROR'
        })
        ToastError('El actualizacion del documento fallo!')
    }
}

export const obtenerDocumentosPorCuenta = (token, accountid) => async (dispatch) => {
    dispatch({
        type: LOADING_TODOS_DOCUMENTOS,
        loadingDocumentos: true,
        retrieveDocsExito: false
    })

    try {
        if (accountid && token) {
            var entidad = 'new_documentacionporcuentas';
            var fetch = "<fetch mapping='logical' distinct='false'>" +
                "<entity name='new_documentacionporcuenta'>" +
                "<attribute name='statuscode' />" +
                "<attribute name='createdon' />" +
                "<attribute name='new_cuentaid' />" +
                "<attribute name='new_fechadevencimiento' />" +
                "<attribute name='new_name' />" +
                "<attribute name='new_vinculocompartido' />" +
                "<attribute name='new_documentacionporcuentaid' />" +
                "<attribute name='new_visibleenportal' />" +
                "<attribute name='new_documentoid' />" +
                "<order attribute='new_fechadevencimiento' descending='true' />" +
                "<order attribute='new_cuentaid' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='statecode' operator='eq' value='0' />" +
                "<condition attribute='new_cuentaid' operator='eq'  uitype='account' value='" + accountid + "' />" +
                "</filter>" +
                "<link-entity name='new_documentacion' from='new_documentacionid' to='new_documentoid' link-type='outer' alias='documentos'>" +
                "<attribute name='new_urlplantilla'/> " +
                "<attribute name='new_name'/> " +
                "<attribute name='new_descripcion'/> " +
                "</link-entity>" +
                "</entity>" +
                "</fetch>";

            await axios.post(`${UrlApi}api/consultafetch`,
                {
                    entidad: entidad,
                    fetch: fetch,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((response) => {
                    dispatch({
                        type: TODOS_DOCUMENTOXCUENTA_EXITO,
                        payload: response.data,
                        loading: false,
                        loadingDocumentos: false,
                        retrieveDocsExito: true
                    })
                })
                .catch((err) => {
                    console.log(err)
                    dispatch({
                        type: ERROR,
                        loading: false,
                        loadingDocumentos: false,
                        retrieveDocsExito: true
                    })
                });
        }
    }
    catch (error) {
        dispatch({
            type: ERROR,
            loading: false,
            loadingDocumentos: false,
            retrieveDocsExito: true
        })
    }
}

export const cargarDocumentacion = (file, token, documentoId) => async (dispatch) => {
    dispatch({
        type: LOADING_DOCUMENTOS,
        cargaDocumento: 'LOADING'
    })

    try {
        const configDocumentos = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data',
            },
        };

        const subirDocumento = () => new Promise(async (resolve, reject) => {
            await axios.post(`${UrlApi}api/socioparticipe/documentacionporcuenta?documentacionporcuenta_id=${documentoId}`,
                file, configDocumentos)
                .then(data => {
                    dispatch({
                        type: CARGA_DOCUMENTOXCUENTA,
                        cargaDocumento: 'EXITO',
                        documentoid: data.data
                    })
                    resolve(data.data)
                })
                .catch(err => {
                    reject(err)
                })
        })

        const response = await toast.promise(
            subirDocumento,
            {
                pending: 'Procesando...',
                success: 'Proceso exitoso',
                error: {
                    render({ data }) {
                        return `${data}`
                    }
                }
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


    } catch (error) {
        dispatch({
            type: ERROR,
            cargaDocumento: 'ERROR'
        })
    }
}

export const obtenerNotaADescargar = (notaid, token) => async (dispatch) => {
    dispatch({
        type: LOADING_NOTADESCARGA,
    })

    var entidad = "annotations"
    var fetch = "<fetch mapping='logical'>" +
        "<entity name='annotation'>" +
        "<attribute name='annotationid'/> " +
        "<attribute name='filename'/> " +
        "<attribute name='mimetype'/> " +
        "<attribute name='documentbody'/> " +
        "<filter type='and'>" +
        "<condition attribute='annotationid' operator='eq' value='" + notaid + "' />" +
        "</filter>" +
        "</entity>" +
        "</fetch>";
    try {
        return new Promise((resolve, reject) => {
            axios.post(`${UrlApi}api/consultafetch`,
                {
                    "entidad": entidad,
                    "fetch": fetch
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then((response) => {
                    resolve(response.data)
                })
                .catch(err => {
                    ToastError("Error al descargar archivo")
                    reject(err)
                })
        })
    }
    catch (error) {
        ToastError("Error al descargar archivo")
        dispatch({
            type: NOTADESCARGA_ERROR
        })
    }
}
