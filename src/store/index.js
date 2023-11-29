import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk"; // Importa Redux Thunk
import tokenReducer from "@/redux/token";
import dataVariosReducers from "@/redux/dataVarios";
import empleadoReducers from "@/redux/empleados";
import licenciasReducers from "@/redux/licencias";
import cargasHorariasReducers from "@/redux/cargaHoraria";
import asignacionesReducers from "@/redux/asignacion";
import cargasCursosReducers from "@/redux/cursos";
import usuariosFirebaseReducer from "@/redux/usuariosFirebase";
import propuestaReducers from "@/redux/propuestaMejoras";
import evaluacionesReducers from "@/redux/evaluaciones";
import eventosReducer from "@/redux/eventos";
import datosSelectReducer from "@/redux/datosSelect";

const middleware = [thunk];
const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  combineReducers({
    token: tokenReducer,
    empleado: empleadoReducers,
    dataVarios: dataVariosReducers,
    licencias: licenciasReducers,
    horas: cargasHorariasReducers,
    asignaciones: asignacionesReducers,
    cursos: cargasCursosReducers,
    usuariosFirebase: usuariosFirebaseReducer,
    propuesta: propuestaReducers,
    evaluaciones: evaluacionesReducers,
    eventos: eventosReducer,
    datosSelect: datosSelectReducer
  }),
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
