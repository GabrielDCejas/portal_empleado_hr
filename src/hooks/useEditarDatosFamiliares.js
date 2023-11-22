import { AuthContext } from "@/context/AuthContext";
import { editarFamiliarEmpleado, getFamiliaPorEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarDatosFamiliares = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarDatosFamiliares = (datos, handleCloseModal) => {
    return dispatch(editarFamiliarEmpleado(token, user?.empleadoid, datos))
      .then((id) => {
        dispatch(getFamiliaPorEmpleado(token, user?.empleadoid));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarDatosFamiliares;
};

export default useEditarDatosFamiliares;