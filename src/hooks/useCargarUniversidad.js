import { AuthContext } from "@/context/AuthContext";
import { getUniversidadEmpleado, newUniversidadEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarUniversidad = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarUniversidad = (datos, closeModal) => {
    return dispatch(newUniversidadEmpleado(user?.empleadoid, token, datos))
      .then((id) => {
        dispatch(getUniversidadEmpleado(token, user?.empleadoid));
        closeModal(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarUniversidad;
};

export default useCargarUniversidad;
