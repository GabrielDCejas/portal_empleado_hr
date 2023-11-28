import { AuthContext } from "@/context/AuthContext";
import { eviarMetaPrioritaria, getMetasPrioritarias } from "@/redux/evaluaciones";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargarMetaPrioritaria = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarMetaPrioritaria = (datos, evaluaciondepgdid, handleCloseModal) => {
    return dispatch(eviarMetaPrioritaria(token, datos, evaluaciondepgdid))
      .then(() => {
        dispatch(getMetasPrioritarias(token, evaluaciondepgdid));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return cargarMetaPrioritaria;
};

export default useCargarMetaPrioritaria;