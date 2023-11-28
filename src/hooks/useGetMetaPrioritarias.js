import { AuthContext } from "@/context/AuthContext";
import { getMetasPrioritarias } from "@/redux/evaluaciones";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetMetaPrioritarias = (id) => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const metasPrioritariasRedux = useSelector((store) => store.evaluaciones.metasPrioritarias);
  const [metasPrioritarias, setMetasPrioritarias] = useState([]);
  const loadingMetasPrioritariasSelect = useSelector((store) => store.evaluaciones.loadingMetasPrioritarias);
  const [loadingMetasPrioritarias, setLoadingMetasPrioritarias] = useState(false);


  useEffect(() => {
    if (token) {
      dispatch(getMetasPrioritarias(token, id));
    }
  }, []);

  useEffect(() => {
    if (metasPrioritariasRedux?.length > 0 && loadingMetasPrioritariasSelect) {
      const metaPrioritaria = [];
      metasPrioritariasRedux.forEach((items) => {
        let item = {
          id: items.new_metaprioritariaid,
          nombre: items.new_name,
          accion: items.new_accion,
          evidencia: items.new_evidencia,
          fecha_desde: moment(items["new_fechadesde@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format("YYYY-MM-DD"),
          fecha_hasta: moment(items["new_fechahasta@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format("YYYY-MM-DD"),
          razon_estado: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          tipo_accion: {label:items["new_tipodeaccin@OData.Community.Display.V1.FormattedValue"], value: items["new_tipodeaccin"]},
          razon_estado_label: {label:items["statuscode@OData.Community.Display.V1.FormattedValue"], value: items["statuscode"]},
          comentarios_observaciones: items.new_comentarios,
          lider_id : items["evaluaciondepgd.new_lder"],
          evaluacion_pgd_id: items["_new_evaluacionpgd_value"]
        };
        metaPrioritaria.push(item);
      });
      setMetasPrioritarias(metaPrioritaria);
      setLoadingMetasPrioritarias(loadingMetasPrioritariasSelect);
    } else if (metasPrioritariasRedux?.length == 0 && loadingMetasPrioritariasSelect) {
        setMetasPrioritarias([]);
        setLoadingMetasPrioritarias(loadingMetasPrioritariasSelect);
    }
  }, [metasPrioritariasRedux, loadingMetasPrioritariasSelect]);

  return { metasPrioritarias, loadingMetasPrioritarias };
};

export default useGetMetaPrioritarias;
