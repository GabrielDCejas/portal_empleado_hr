import { AuthContext } from "@/context/AuthContext";
import { getUniversidadEmpleado, setUniversidadEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarUniversidad = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarUniversidad = (datos) => {
    return  dispatch(setUniversidadEmpleado(user?.empleadoid, token, datos))
    .then((id) => {
      dispatch(getUniversidadEmpleado(token, user?.empleadoid))
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return editarUniversidad;
};

export default useEditarUniversidad;