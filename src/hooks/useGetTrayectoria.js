import { AuthContext } from "@/context/AuthContext";
import { getTrayectoriaPorEmpleado } from "@/redux/empleados";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetTrayectoria = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const trayectoriasRedux = useSelector((store) => store.empleado.trayectorias);
  const loadingTrayectoriaSelect = useSelector((store) => store.empleado.loadingTrayectoria);
  const [trayectoria, setTrayectoria] = useState([]);
  const [loadingTrayectoria, setLoadingTrayectoria] = useState(false);

  useEffect(() => {
    dispatch(getTrayectoriaPorEmpleado(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (trayectoriasRedux?.length > 0 && loadingTrayectoriaSelect) {
      const trayectoria = [];
      trayectoriasRedux.forEach((items) => {
        let item = {
          id: items.new_trayectoriaid,
          empresa: items["_new_empresa_value@OData.Community.Display.V1.FormattedValue"],
          empresaSelect: {
            value: items["_new_empresa_value"],
            label: items["_new_empresa_value@OData.Community.Display.V1.FormattedValue"],
          },
          trayectoriaCompaniaSelect: {
            value: items["new_trayectoriaenlacompania"],
            label: items["new_trayectoriaenlacompania@OData.Community.Display.V1.FormattedValue"],
          },
          puestoSelect: {
            value: items["_new_puesto_value"],
            label: items["_new_puesto_value@OData.Community.Display.V1.FormattedValue"],
          },
          puesto: items["_new_puesto_value@OData.Community.Display.V1.FormattedValue"],
          fechaDesde: items["new_fechadesde@OData.Community.Display.V1.FormattedValue"],
          fechaHasta: items["new_fechahasta@OData.Community.Display.V1.FormattedValue"],
          fechaDesdeModal: items["new_fechadesde@OData.Community.Display.V1.FormattedValue"]
            ? moment(items["new_fechadesde@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format("YYYY-MM-DD")
            : null,
          fechaHastaModal: items["new_fechahasta@OData.Community.Display.V1.FormattedValue"]
            ? moment(items["new_fechahasta@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format("YYYY-MM-DD")
            : null,
        };
        trayectoria.push(item);
      });
      setTrayectoria(trayectoria);
      setLoadingTrayectoria(loadingTrayectoriaSelect);
    } else if (trayectoriasRedux?.length == 0 && loadingTrayectoriaSelect) {
      setTrayectoria([]);
      setLoadingTrayectoria(loadingTrayectoriaSelect);
    }
  }, [trayectoriasRedux, loadingTrayectoriaSelect]);

  return { trayectoria, loadingTrayectoria };
};

export default useGetTrayectoria;
