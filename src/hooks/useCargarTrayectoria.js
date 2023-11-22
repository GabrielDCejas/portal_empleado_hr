import { AuthContext } from "@/context/AuthContext";
import { getTrayectoriaPorEmpleado, newTrayectoriaEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarTrayectoria = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarTrayectoria = (datos, handleCloseModal) => {
    return dispatch(newTrayectoriaEmpleado(token, user.empleadoid, datos))
      .then((id) => {
        dispatch(getTrayectoriaPorEmpleado(token, user.empleadoid));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarTrayectoria;
};

export default useCargarTrayectoria;
