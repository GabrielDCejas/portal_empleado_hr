import { AuthContext } from "@/context/AuthContext";
import { getCuentasBancariasPorEmpleado, newCuentaBancariaEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarCuentaBancaria = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarCuentaBancaria = (datos, handleCloseModal) => {
    return   dispatch(newCuentaBancariaEmpleado(token, user?.empleadoid, datos))
    .then((id) => {
      dispatch(getCuentasBancariasPorEmpleado(token, user?.empleadoid))
      handleCloseModal()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return cargarCuentaBancaria;
};

export default useCargarCuentaBancaria;