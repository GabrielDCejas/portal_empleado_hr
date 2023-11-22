import { AuthContext } from "@/context/AuthContext";
import { getIdiomaEmpleado, newIdiomaEmpleado } from "@/redux/empleados";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarIdioma = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarIdioma = (datos, closeModal) => {
    return dispatch(newIdiomaEmpleado(token, user?.empleadoid, datos))
      .then((id) => {
        dispatch(getIdiomaEmpleado(token, user?.empleadoid));
        closeModal(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarIdioma;
};

export default useCargarIdioma;