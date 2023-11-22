import { AuthContext } from "@/context/AuthContext";
import { editarPropuesta, getPropuestasMejoras } from "@/redux/propuestaMejoras";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarPropuestaMejora = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarPropuestaMejora = (datos) => {
    return   dispatch(editarPropuesta(token, user?.empleadoid, datos))
    .then((id) => {
      dispatch(getPropuestasMejoras(token))
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return editarPropuestaMejora;
};

export default useEditarPropuestaMejora;