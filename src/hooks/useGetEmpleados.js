import { AuthContext } from "@/context/AuthContext";
import { getEmpleados } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetEmpleados = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const empleadosRedux = useSelector((store) => store.dataVarios.empleados);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    dispatch(getEmpleados(token));
  }, []);

  useEffect(() => {
    if (empleadosRedux?.length > 0) {
      const empleados = [];
      empleadosRedux.forEach((items) => {
        let item = {
          value: items.new_empleadoid,
          label: items.new_name,
        };
        empleados.push(item);
      });
      setEmpleados(empleados);
    }
  }, [empleadosRedux]);

  return { empleados };
};

export default useGetEmpleados;
