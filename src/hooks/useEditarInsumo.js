import { AuthContext } from "@/context/AuthContext";
import { editarInsumoEmpleado, getInsumosPorEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarInsumo = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarInsumo = (datos) => {
    return dispatch(editarInsumoEmpleado(token, user.empleadoid, datos))
      .then((id) => {
        dispatch(getInsumosPorEmpleado(token, user.empleadoid));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarInsumo;
};

export default useEditarInsumo;