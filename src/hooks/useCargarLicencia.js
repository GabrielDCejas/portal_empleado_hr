import { AuthContext } from "@/context/AuthContext";
import { getLicencias, newLicencia } from "@/redux/licencias";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarLicencia = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarLicencia = (datos, handleCloseModal) => {
    return dispatch(newLicencia(token, user.empleadoid, datos))
      .then((id) => {
        dispatch(getLicencias(token, user.empleadoid));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarLicencia;
};

export default useCargarLicencia;