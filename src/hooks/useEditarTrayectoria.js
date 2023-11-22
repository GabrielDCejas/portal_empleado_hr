import { AuthContext } from "@/context/AuthContext";
import { editarTrayectoriaEmpleado, getTrayectoriaPorEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarTrayectoria = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarTrayectoria = (datos) => {
    return dispatch(editarTrayectoriaEmpleado(token, user?.empleadoid, datos))
      .then((id) => {
        dispatch(getTrayectoriaPorEmpleado(token, user?.empleadoid));
        handleCloseModalEditar();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarTrayectoria;
};

export default useEditarTrayectoria;
