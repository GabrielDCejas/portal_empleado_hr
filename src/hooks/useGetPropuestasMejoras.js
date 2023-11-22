import { AuthContext } from "@/context/AuthContext";
import { getPropuestasMejoras } from "@/redux/propuestaMejoras";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetPropuestasMejoras = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const propuestasMejorasRedux = useSelector((store) => store.propuesta.propuestasMejoras);
  const [propuestasMejoras, setPropuestasMejoras] = useState([]);
  const loadingPropuestasMejoraSelect = useSelector((store) => store.propuesta.loadingPropuestasMejoras);
  const [loadingPropuestasMejoras, setLoadingPropuestasMejoras] = useState(false);
  
  useEffect(() => {
    dispatch(getPropuestasMejoras(token));
  }, []);

  useEffect(() => {
    if (propuestasMejorasRedux?.length > 0 && loadingPropuestasMejoraSelect) {
      const cursos = [];
      propuestasMejorasRedux.forEach((items) => {
        let item = {
          id: items.new_propuestaymejorasid,
          nombre: items.new_name,
          propuesta: items["new_propuesta"],
          empleado: items["_new_empleado_value@OData.Community.Display.V1.FormattedValue"],
          empleadoId: items["_new_empleado_value"],
        };
        cursos.push(item);
      });
      setPropuestasMejoras(cursos);
      setLoadingPropuestasMejoras(loadingPropuestasMejoraSelect);
    } else if (propuestasMejorasRedux?.length == 0 && loadingPropuestasMejoraSelect) {
      setPropuestasMejoras([]);
      setLoadingPropuestasMejoras(loadingPropuestasMejoraSelect);
    }
  }, [propuestasMejorasRedux, loadingPropuestasMejoraSelect]);

  return { propuestasMejoras, loadingPropuestasMejoras };
};

export default useGetPropuestasMejoras;
