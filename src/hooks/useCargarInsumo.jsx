import { AuthContext } from "@/context/AuthContext";
import { getInsumosPorEmpleado, newInsumoEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarInsumo = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarInsumo = (datos, handleCloseModal) => {
    return dispatch(newInsumoEmpleado(token, user.empleadoid, datos))
      .then((id) => {
        dispatch(getInsumosPorEmpleado(token, user.empleadoid));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarInsumo;
};

export default useCargarInsumo;
