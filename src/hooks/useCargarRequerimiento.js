import { AuthContext } from "@/context/AuthContext";
import { enviarRequerimientoPersonal, getRequerimientoPersonal } from "@/redux/solicitudes";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarRequerimiento = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarRequerimiento = (datos, handleCloseModal) => {
    return dispatch(enviarRequerimientoPersonal(token, datos, user.empleadoid))
      .then(() => {
        dispatch(getRequerimientoPersonal(token));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarRequerimiento;
};

export default useCargarRequerimiento;