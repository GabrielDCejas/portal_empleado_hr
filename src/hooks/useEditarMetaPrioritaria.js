import { AuthContext } from "@/context/AuthContext";
import { editarMetaPrioritaria, getMetasPrioritarias } from "@/redux/evaluaciones";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarMetaPrioritaria = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarMetasPrioritaria = (datos, evaluacionPgdId) => {
    return dispatch(editarMetaPrioritaria(token, datos))
      .then((id) => {
        dispatch(getMetasPrioritarias(token, evaluacionPgdId));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarMetasPrioritaria;
};

export default useEditarMetaPrioritaria;