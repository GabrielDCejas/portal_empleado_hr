import { AuthContext } from "@/context/AuthContext";
import { getMetasPrioritarias } from "@/redux/evaluaciones";
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
          fecha_desde: items["new_fechadesde@OData.Community.Display.V1.FormattedValue"],
          fechas_hasta: items["new_fechahasta@OData.Community.Display.V1.FormattedValue"],
          razon_estado: items["statuscode@OData.Community.Display.V1.FormattedValue"]
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
