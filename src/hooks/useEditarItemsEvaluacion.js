import { AuthContext } from "@/context/AuthContext";
import { editarItemsEvaluacion, getItemsEvaluacion } from "@/redux/evaluaciones";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarItemsEvaluacion = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarItemEvaluacion = (datos, evaluaciondepgdid) => {
    return dispatch(editarItemsEvaluacion(token, datos))
      .then(() => {
        dispatch(getItemsEvaluacion(token, evaluaciondepgdid));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarItemEvaluacion;
};

export default useEditarItemsEvaluacion;