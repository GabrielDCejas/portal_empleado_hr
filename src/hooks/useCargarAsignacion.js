import { AuthContext } from "@/context/AuthContext";
import { getAsignaciones, newAsignacion } from "@/redux/asignacion";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarAsignacion = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarAsignacion = (datos, handleCloseModal) => {
    return   dispatch(newAsignacion(token, user?.empleadoid, datos))
    .then((id) => {
      dispatch(getAsignaciones(token))
      handleCloseModal()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return cargarAsignacion;
};

export default useCargarAsignacion;