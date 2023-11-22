import { AuthContext } from "@/context/AuthContext";
import {  getTipoLicencia } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetTipoLicencia = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const tipoLicenciasRedux = useSelector((store) => store.dataVarios.tipoLicencias);
  const [tipoLicencia, setTipoLicencia] = useState([]);

  useEffect(() => {
    dispatch(getTipoLicencia(token));
  }, []);

  useEffect(() => {
    if (tipoLicenciasRedux?.length > 0) {
      const licencia = [];
      tipoLicenciasRedux.forEach((items) => {
        let item = {
          value: items.new_tipodelicenciaid,
          label: items.new_name,
        };
        licencia.push(item);
      });
      setTipoLicencia(licencia);
    }
  }, [tipoLicenciasRedux]);

  return { tipoLicencia };
};

export default useGetTipoLicencia;
