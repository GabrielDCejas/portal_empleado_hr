import { AuthContext } from "@/context/AuthContext";
import { getCargasHorarias, newCargaHoraria } from "@/redux/cargaHoraria";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarHoras = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarHoras = (datos, handleCloseModal) => {
    return dispatch(newCargaHoraria(token, user.empleadoid, datos))
      .then((id) => {
        dispatch(getCargasHorarias(token, user.empleadoid));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarHoras;
};

export default useCargarHoras;