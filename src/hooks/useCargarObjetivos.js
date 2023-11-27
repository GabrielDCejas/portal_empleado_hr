import { AuthContext } from "@/context/AuthContext";
import { enviarObjetivo, getObjetivosPGD } from "@/redux/evaluaciones";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarObjetivos = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarObjetivos = (datos, evaluaciondepgdid, handleCloseModal) => {
    return dispatch(enviarObjetivo(token, datos, evaluaciondepgdid))
      .then(() => {
        dispatch(getObjetivosPGD(token, evaluaciondepgdid));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarObjetivos;
};

export default useCargarObjetivos;