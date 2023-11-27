import { AuthContext } from "@/context/AuthContext";
import { enviarItemsEvaluacion, getItemsEvaluacion } from "@/redux/evaluaciones";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarItemsEvaluacion = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const itemEvaluacion = (datos, evaluaciondepgdid, handleCloseModal) => {
    return dispatch(enviarItemsEvaluacion(token, datos, evaluaciondepgdid))
      .then(() => {
        dispatch(getItemsEvaluacion(token, evaluaciondepgdid));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return itemEvaluacion;
};

export default useCargarItemsEvaluacion;