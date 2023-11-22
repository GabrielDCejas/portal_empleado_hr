import { AuthContext } from "@/context/AuthContext";
import { getVacacionesPorEmpleado } from "@/redux/empleados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetVacaciones = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const vacacionesRedux = useSelector((store) => store.empleado.vacaciones);
  const [vacaciones, setVacaciones] = useState([]);

  useEffect(() => {
    dispatch(getVacacionesPorEmpleado(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (vacacionesRedux?.length > 0) {
      const vacaciones = [];
      vacacionesRedux.forEach((items) => {
        let item = {
          value: items.new_vacacionesid,
          label: items.new_name,
        };
        vacaciones.push(item);
      });
      setVacaciones(vacaciones);
    }
  }, [vacacionesRedux]);

  return { vacaciones };
};

export default useGetVacaciones;