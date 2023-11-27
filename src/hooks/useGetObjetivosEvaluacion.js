import { AuthContext } from "@/context/AuthContext";
import { getObjetivoEvaluacion } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetObjetivosEvaluacion = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const objetivosEvaluacionRedux = useSelector((store) => store.dataVarios.objetivosEvaluacion)
  const [objetivosEvaluacion, setObjetivosEvaluacion] = useState([])

  useEffect(() => {
    dispatch(getObjetivoEvaluacion(token));
  }, []);

  useEffect(() => {
    if (objetivosEvaluacionRedux?.length > 0) {
      const perpectivaNegocio = []
      objetivosEvaluacionRedux.forEach((items) => {
        let item = {
          value: items.new_objetivodeevaluacionid,
          label: items.new_name,
        }
        perpectivaNegocio.push(item)
      })
      setObjetivosEvaluacion(perpectivaNegocio)
    }
  }, [ objetivosEvaluacionRedux])

  return { objetivosEvaluacion };
};

export default useGetObjetivosEvaluacion;