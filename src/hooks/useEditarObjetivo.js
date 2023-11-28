import { AuthContext } from "@/context/AuthContext";
import { editarObjetivos, getObjetivosPGD } from "@/redux/evaluaciones";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarObjetivo = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarObjetivo = (datos, evaluacionPgdId) => {
    return dispatch(editarObjetivos(token, datos, evaluacionPgdId))
      .then((id) => {
        dispatch(getObjetivosPGD(token, evaluacionPgdId));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarObjetivo;
};

export default useEditarObjetivo;