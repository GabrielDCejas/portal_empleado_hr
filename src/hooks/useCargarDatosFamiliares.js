import { AuthContext } from "@/context/AuthContext";
import { getFamiliaPorEmpleado, newFamiliarEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarDatosFamiliares = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarDatosFamiliares = (datos, handleCloseModal) => {
    return dispatch(newFamiliarEmpleado(token, user?.empleadoid, datos))
      .then((id) => {
        dispatch(getFamiliaPorEmpleado(token, user?.empleadoid));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarDatosFamiliares;
};

export default useCargarDatosFamiliares;
