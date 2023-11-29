import { AuthContext } from "@/context/AuthContext";
import { editarRequerimientoPersonal, getRequerimientoPersonal } from "@/redux/solicitudes";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarRequerimiento = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarRequerimiento = (datos) => {
    return dispatch(editarRequerimientoPersonal(token, datos, user.empleadoid))
      .then(() => {
        dispatch(getRequerimientoPersonal(token));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarRequerimiento;
};

export default useEditarRequerimiento;