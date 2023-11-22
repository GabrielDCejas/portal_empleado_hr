import { AuthContext } from "@/context/AuthContext";
import { editarCuentaBancariaEmpleado, getCuentasBancariasPorEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarCuentaBancaria = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarCuentaBancaria = (datos) => {
    return   dispatch(editarCuentaBancariaEmpleado(token, user?.empleadoid, datos))
    .then((id) => {
      dispatch(getCuentasBancariasPorEmpleado(token, user?.empleadoid))
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return editarCuentaBancaria;
};

export default useEditarCuentaBancaria;