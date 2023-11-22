import { AuthContext } from "@/context/AuthContext";
import { getAsignaciones, setAsignacion } from "@/redux/asignacion";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarAsignacion = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarAsignacion = (datos) => {
    return   dispatch(setAsignacion(token, user?.empleadoid, datos))
    .then((id) => {
      dispatch(getAsignaciones(token))
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return editarAsignacion;
};

export default useEditarAsignacion;