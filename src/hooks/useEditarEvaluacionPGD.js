import { AuthContext } from "@/context/AuthContext";
import { getEvaluacionPGD, setEvaluacionPGD } from "@/redux/evaluaciones";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarEvaluacionPGD = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarEvaluacionPGD = (datos) => {
    return dispatch(setEvaluacionPGD(token, datos))
      .then((id) => {
        dispatch(getEvaluacionPGD(token, user?.empleadoid));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarEvaluacionPGD;
};

export default useEditarEvaluacionPGD;