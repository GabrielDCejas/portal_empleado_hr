import { AuthContext } from "@/context/AuthContext";
import { getAsignaciones } from "@/redux/asignacion";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAsignaciones = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const asignacionesRedux = useSelector((store) => store.asignaciones.asignaciones);
  const loadingAsignacionesSelect = useSelector((store) => store.asignaciones.loadingAsignaciones);
  const [asignaciones, setAsignaciones] = useState([]);
  const [loadingAsignaciones, setLoadingAsignaciones] = useState(false);

  useEffect(() => {
    dispatch(getAsignaciones(token));
  }, []);

  useEffect(() => {
    if (asignacionesRedux?.length > 0 && loadingAsignacionesSelect) {
      const asignaciones = [];
      asignacionesRedux.forEach((items) => {
        let item = {
          id: items.new_asignacionid,
          nombre: items.new_name,
          solucionPartir: items.new_solucindelacualpartir,
          cliente: items["proyecto.new_cliente@OData.Community.Display.V1.FormattedValue"],
          proyecto: items["proyecto.new_name"],
          asignacion: items._new_proyecto_value,
          proyectoSelect: {
            value: items._new_proyecto_value,
            label: items["proyecto.new_name"],
          },
          fechaCreacion: items["createdon@OData.Community.Display.V1.FormattedValue"],
          periodo: items["_new_periodo_value@OData.Community.Display.V1.FormattedValue"],
          periodoSelect: {
            value: items._new_periodo_value,
            label: items["_new_periodo_value@OData.Community.Display.V1.FormattedValue"],
          },
          cantidadHoras: items.new_cantidadhoras,
          cantidadHorasDevengadas: items.new_cantidadhorasdevengadas,
          empleadoName: items["_new_empleado_value@OData.Community.Display.V1.FormattedValue"]
            ? items["_new_empleado_value@OData.Community.Display.V1.FormattedValue"]
            : items["_ownerid_value@OData.Community.Display.V1.FormattedValue"],
          empleadoId: items["_new_empleado_value"],
          estado: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          statuscode: items["statuscode"],
          estadoSelect: {
            value: items.statuscode,
            label: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          },
          rolDeProyecto: {
            value: items._new_rolenelproyecto_value,
            label: items["_new_rolenelproyecto_value@OData.Community.Display.V1.FormattedValue"],
          },
          tarifa: items.new_tarifa,
        };
        asignaciones.push(item);
      });
      setAsignaciones(asignaciones);
      setLoadingAsignaciones(loadingAsignacionesSelect);
    } else if (asignacionesRedux?.length == 0 && loadingAsignacionesSelect) {
      setAsignaciones([]);
      setLoadingAsignaciones(loadingAsignacionesSelect);
    }
  }, [asignacionesRedux, loadingAsignacionesSelect]);

  return { asignaciones, loadingAsignaciones };
};

export default useGetAsignaciones;
