import { AuthContext } from "@/context/AuthContext";
import { getObjetivosPGD } from "@/redux/evaluaciones";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetObjetivosPGD = (id) => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const objetivosPGDRedux = useSelector((store) => store.evaluaciones.objetivosPGD);
  const [objetivosPGD, setObjetivosPGD] = useState([]);
  const loadingObjetivosPGDSelect = useSelector((store) => store.evaluaciones.loadingObjetivosPGD);
  const [loadingObjetivosPGD, setLoadingObjetivosPGD] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getObjetivosPGD(token, id));
    }
  }, []);

  useEffect(() => {
    if (objetivosPGDRedux?.length > 0 && loadingObjetivosPGDSelect) {
      const objetivos = [];
      objetivosPGDRedux.forEach((items) => {
        let item = {
          id: items.new_objetivodeevaluacionid,
          nombre: items.new_name,
          objetivoPrimario: {label: items["_new_objetivoprimarioid_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_objetivoprimarioid_value"]},
          fecha_creacion: items["createdon@OData.Community.Display.V1.FormattedValue"],
          fecha_cumplimiento: items["new_fechadecumplimiento@OData.Community.Display.V1.FormattedValue"],
          ponderacion_lider: items["new_ponderacionlider@OData.Community.Display.V1.FormattedValue"],
          indicador: items["new_resultadoclave"],
          status: items["new_status@OData.Community.Display.V1.FormattedValue"],
          porcentaje_avance: items["new_deavance@OData.Community.Display.V1.FormattedValue"],
          estado_objetivo: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          evaluacion_pgd_id : items["_new_evaluaciondepgd_value"],
          plazo: moment(items["new_plazo"],"DD/MM/YY").format("YYYY-MM-DD"),
          tipoObjetivo: {label: items["new_tipodeobjetivo@OData.Community.Display.V1.FormattedValue"], value: items["new_tipodeobjetivo"]},
          perspectivaNegocio: {label: items["_new_perspectivadenegocio_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_perspectivadenegocio_value"]},
          fuenteMedicion : items.new_fuentedemedicion,
          piso: items.new_piso,
          target: items.new_target,
          techo: items.new_techo,
          lider_id : items["evaluacion_pgd.new_lder"]
        };
        objetivos.push(item);
      });
      setObjetivosPGD(objetivos);
      setLoadingObjetivosPGD(loadingObjetivosPGDSelect);
    } else if (objetivosPGDRedux?.length == 0 && loadingObjetivosPGDSelect) {
      setObjetivosPGD([]);
      setLoadingObjetivosPGD(loadingObjetivosPGDSelect);
    }
  }, [objetivosPGDRedux, loadingObjetivosPGDSelect]);

  return { objetivosPGD, loadingObjetivosPGD };
};

export default useGetObjetivosPGD;
