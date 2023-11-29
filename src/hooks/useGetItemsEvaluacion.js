import { AuthContext } from "@/context/AuthContext";
import { getItemsEvaluacion, getObjetivosPGD } from "@/redux/evaluaciones";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetItemsEvaluacion = (id) => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const itemsEvaluacionRedux = useSelector((store) => store.evaluaciones.itemsEvaluacion);
  const [itemsEvaluacion, setItemsEvaluacion] = useState([]);
  const loadingItemsEvaluacionSelect = useSelector((store) => store.evaluaciones.loadingItemsEvaluacion);
  const [loadingItemsEvaluacion, setLoadingItemsEvaluacion] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getItemsEvaluacion(token, id));
    }
  }, []);

  useEffect(() => {
    if (itemsEvaluacionRedux?.length > 0 && loadingItemsEvaluacionSelect) {
      const itemsComp = [];
      itemsEvaluacionRedux.forEach((items) => {
        let item = {
          id: items.new_itemdeevaluaciondedesempeoid,
          evaluaciondepgdid: id,
          competencia: items["_new_competencia_value@OData.Community.Display.V1.FormattedValue"],
          valoracion: items["new_valoracin@OData.Community.Display.V1.FormattedValue"],
          valoracion_lider: items["new_valoraciondellider@OData.Community.Display.V1.FormattedValue"],
          evaluacion_pgd_id: items["_new_evaluaciondepgd_value"],
          lider_id: items["evaluacion_pgd.new_lder"],
          tipoItemEvaluacion: {label: items["new_tipodeitemdeevaluacion@OData.Community.Display.V1.FormattedValue"], value: items["new_tipodeitemdeevaluacion"]},
          competenciaObjetivo: {label: items["_new_competencia_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_competencia_value"]},
          valoracion_modal: {label: items["new_valoracin@OData.Community.Display.V1.FormattedValue"], value: items["new_valoracin"]},
          valoracion_lider_modal: {label: items["new_valoraciondellider@OData.Community.Display.V1.FormattedValue"], value: items["new_valoraciondellider"]},
          tipoInstancia: {label: items["new_tipodeinstancia@OData.Community.Display.V1.FormattedValue"], value: items["new_tipodeinstancia"]},
          planSucesion: {label: items[""], value: items["_new_plandesucesin_value"]},
        };
        itemsComp.push(item);
      });
      setItemsEvaluacion(itemsComp);
      setLoadingItemsEvaluacion(loadingItemsEvaluacionSelect);
    } else if (itemsEvaluacionRedux?.length == 0 && loadingItemsEvaluacionSelect) {
        setItemsEvaluacion([]);
        setLoadingItemsEvaluacion(loadingItemsEvaluacionSelect);
    }
  }, [itemsEvaluacionRedux, loadingItemsEvaluacionSelect]);

  return { itemsEvaluacion, loadingItemsEvaluacion };
};

export default useGetItemsEvaluacion;
