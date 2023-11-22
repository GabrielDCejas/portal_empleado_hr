import { AuthContext } from "@/context/AuthContext";
import { getCargasHorarias } from "@/redux/cargaHoraria";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetHorasCargadas = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const horasRedux = useSelector((store) => store.horas.horas);
  const loadingCargaHorariaSelect = useSelector((store) => store.horas.loadingCargaHoraria);
  const [cargasHorarias, setCargasHorarias] = useState([]);
  const [loadingCargaHoraria, setLoadingCargaHoraria] = useState(false);

  useEffect(() => {
    dispatch(getCargasHorarias(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (horasRedux?.length > 0 && loadingCargaHorariaSelect) {
      const cargaHoras = [];
      horasRedux?.forEach((items) => {
        let item = {
          id: items.new_cargahorariaid,
          descripcion: items.new_descripcion,
          fechaDeCarga: items["new_fechadecarga@OData.Community.Display.V1.FormattedValue"],
          fechaDeCargaModal: moment(
            items["new_fechadecarga@OData.Community.Display.V1.FormattedValue"],
            "DD/MM/YY"
          ).format("YYYY-MM-DD"),
          proyecto: items["_new_proyecto_value@OData.Community.Display.V1.FormattedValue"],
          proyectoSelect: {
            value: items["_new_proyecto_value"],
            label: items["_new_proyecto_value@OData.Community.Display.V1.FormattedValue"],
          },
          asignacion: items["_new_asignacion_value@OData.Community.Display.V1.FormattedValue"],
          asignacionSelect: {
            value: items["_new_asignacion_value"],
            label: items["_new_asignacion_value@OData.Community.Display.V1.FormattedValue"],
          },
          empleado: items["_new_empleado_value@OData.Community.Display.V1.FormattedValue"],
          facturableSelect: {
            value: items["new_facturable"],
            label: items["new_facturable@OData.Community.Display.V1.FormattedValue"],
          },
          horas: items.new_horas,
        };
        cargaHoras.push(item);
      });
      setCargasHorarias(cargaHoras);
      setLoadingCargaHoraria(loadingCargaHorariaSelect);
    } else if (horasRedux?.length == 0 && loadingCargaHorariaSelect) {
      setCargasHorarias([]);
      setLoadingCargaHoraria(loadingCargaHorariaSelect);
    }
  }, [horasRedux, loadingCargaHorariaSelect]);

  return { cargasHorarias, loadingCargaHoraria };
};

export default useGetHorasCargadas;
