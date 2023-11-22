import { AuthContext } from "@/context/AuthContext";
import { getPropuestasMejoras, nuevaPropuesta } from "@/redux/propuestaMejoras";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useCargaPropuestaMejora = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const cargarPropuestasMejoras = (datos, handleCloseModal) => {
    return   dispatch(nuevaPropuesta(token, user?.empleadoid, datos))
    .then((id) => {
      dispatch(getPropuestasMejoras(token))
      handleCloseModal()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return cargarPropuestasMejoras;
};

export default useCargaPropuestaMejora;