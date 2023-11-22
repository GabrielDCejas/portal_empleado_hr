import { AuthContext } from "@/context/AuthContext";
import { getUniversidadEmpleado } from "@/redux/empleados";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetUniversidadesEmpleado = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const universidadRedux = useSelector((store) => store.empleado.universidad)
  const loadingUniversidadesSelect = useSelector((store) => store.empleado.loadingUniversidades)
  const [universidadesEmpleado, setUniversidadesEmpleado] = useState([])
  const [loadingUniversidades, setLoadingUniversidades] = useState(false)

  useEffect(() => {
    dispatch(getUniversidadEmpleado(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (universidadRedux?.length > 0 && loadingUniversidadesSelect) {
      const universidades = []
      universidadRedux.forEach((items) => {
        let item = {
          id: items.new_universidadporcontactoid,
          universidad: items["_new_universidad_value@OData.Community.Display.V1.FormattedValue"],
          universidadSelet: {
            value: items["_new_universidad_value"],
            label: items["_new_universidad_value@OData.Community.Display.V1.FormattedValue"],
          },
          empleado: items["_new_empleado_value@OData.Community.Display.V1.FormattedValue"],
          carrera: items["_new_carrera_value@OData.Community.Display.V1.FormattedValue"],
          carreraSelect: {
            value: items["_new_carrera_value"],
            label: items["_new_carrera_value@OData.Community.Display.V1.FormattedValue"],
          },
          tipoCarreraSelect: {
            value: items["new_tipodecarrera"],
            label: items["new_tipodecarrera@OData.Community.Display.V1.FormattedValue"],
          },
          estadoSelect: {
            value: items["statuscode"],
            label: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          },
          estado: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          fechaIngreso: items["new_fechadeingreso@OData.Community.Display.V1.FormattedValue"]
            ? moment(items["new_fechadeingreso@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format("DD/MM/YY")
            : "",
          fechaEgreso: items["new_fechaegreso@OData.Community.Display.V1.FormattedValue"]
            ? moment(items["new_fechaegreso@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format("DD/MM/YY")
            : "",
          fechaIngresoSelect: items["new_fechadeingreso@OData.Community.Display.V1.FormattedValue"]
            ? moment(items["new_fechadeingreso@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format("YYYY-MM-DD")
            : "",
          fechaEgresoSelect: items["new_fechaegreso@OData.Community.Display.V1.FormattedValue"]
            ? moment(items["new_fechaegreso@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format("YYYY-MM-DD")
            : "",
        }
        universidades.push(item)
      })
      setUniversidadesEmpleado(universidades)
      setLoadingUniversidades(loadingUniversidadesSelect)
    } else if(universidadRedux?.length == 0 && loadingUniversidadesSelect){
      setUniversidadesEmpleado([])
      setLoadingUniversidades(loadingUniversidadesSelect)
    }
  }, [universidadRedux, loadingUniversidadesSelect])

  return { universidadesEmpleado, loadingUniversidades };
};

export default useGetUniversidadesEmpleado;
