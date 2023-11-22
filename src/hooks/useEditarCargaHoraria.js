import { AuthContext } from "@/context/AuthContext";
import { editarCargasHorarias, getCargasHorarias } from "@/redux/cargaHoraria";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarCargaHoraria = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarCargaHoraria = (datos) => {
    return dispatch(editarCargasHorarias(token, datos))
      .then((id) => {
        dispatch(getCargasHorarias(token, user.empleadoid));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarCargaHoraria;
};

export default useEditarCargaHoraria;