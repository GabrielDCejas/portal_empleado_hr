import { AuthContext } from "@/context/AuthContext";
import { getVacacionesPorEmpleado } from "@/redux/empleados";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetVacacionesDisponibles = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const loadingVacacionesEmpleadoSelect = useSelector((store) => store.empleado.loadingVacacionesEmpleado);
  const vacacionesSelect = useSelector((store) => store.empleado.vacaciones);
  const [loadingVacacionesDisponibles, setLoadingVacacionesDisponibles] = useState(false);
  const [vacacionesDisponibles, setVacacionesDisponibles] = useState([]);

  useEffect(() => {
    dispatch(getVacacionesPorEmpleado(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (vacacionesSelect?.length > 0 && loadingVacacionesEmpleadoSelect) {
      const vacaciones = [];
      vacacionesSelect.forEach((items) => {
        let vacacion = {
          id: items.new_vacacionesid,
          empleado: items["_new_empleado_value@OData.Community.Display.V1.FormattedValue"],
          fechaDesde: items["new_fechadesde@OData.Community.Display.V1.FormattedValue"],
          fechaHasta: items["new_fechahasta@OData.Community.Display.V1.FormattedValue"],
          diasVacacionesCorrespondientes: items.new_diasvacacionescorrespondientes,
          diasVacacionesAdicionales: items.new_diasvacacionesadicionales,
          diasVacacionesPendientes: items.new_diasvacacionespendientes,
          diasVacacionesPendientesPeriodoAnterior: items.new_diaspendietesdelperiodoanterior,
          vacacionesLiquidadas: items["new_vacacionesliquidadas@OData.Community.Display.V1.FormattedValue"],
        };
        vacaciones.push(vacacion);
      });
      setVacacionesDisponibles(vacaciones);
      setLoadingVacacionesDisponibles(loadingVacacionesEmpleadoSelect);
    } else if (vacacionesSelect?.length == 0 && loadingVacacionesEmpleadoSelect) {
      setVacacionesDisponibles([]);
      setLoadingVacacionesDisponibles(loadingVacacionesEmpleadoSelect);
    }
  }, [vacacionesSelect, loadingVacacionesEmpleadoSelect]);

  return { vacacionesDisponibles, loadingVacacionesDisponibles };
};

export default useGetVacacionesDisponibles;
