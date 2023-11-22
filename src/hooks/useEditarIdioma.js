import { AuthContext } from "@/context/AuthContext";
import { editarIdiomaEmpleado, getIdiomaEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarIdioma = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarIdioma = (datos) => {
    return  dispatch(editarIdiomaEmpleado(token, user?.empleadoid, datos))
    .then((id) => {
      dispatch(getIdiomaEmpleado(token, user?.empleadoid))
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return editarIdioma;
};

export default useEditarIdioma;