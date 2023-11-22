import { AuthContext } from "@/context/AuthContext";
import { editarLicencias, getLicencias } from "@/redux/licencias";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useEditarLicencia = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarLicencia = (datos) => {
    return dispatch(editarLicencias(token, user?.empleadoid, datos))
      .then((id) => {
        dispatch(getLicencias(token, user.empleadoid));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarLicencia;
};

export default useEditarLicencia;