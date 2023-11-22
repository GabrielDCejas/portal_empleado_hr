import { AuthContext } from "@/context/AuthContext";
import { getInsumosPorEmpleado } from "@/redux/empleados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetInsumosEmpleado = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const insumosRedux = useSelector((store) => store.empleado.insumos);
  const loadingInsumosSelect = useSelector((store) => store.empleado.loadingInsumos);
  const [insumos, setInsumos] = useState([]);
  const [loadingInsumos, setLoadingInsumos] = useState(false);

  useEffect(() => {
    dispatch(getInsumosPorEmpleado(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (insumosRedux?.length > 0 && loadingInsumosSelect) {
      const insumos = [];
      insumosRedux.forEach((items) => {
        let item = {
          id: items.new_insumoparapersonalid,
          tipoInsumo: items["new_tipodeinsumo@OData.Community.Display.V1.FormattedValue"],
          tipoInsumoSelect: {
            value: items.new_tipodeinsumo,
            label: items["new_tipodeinsumo@OData.Community.Display.V1.FormattedValue"],
          },
          estadoSelect: {
            value: items.statuscode,
            label: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          },
          marca: items["new_marca@OData.Community.Display.V1.FormattedValue"],
          marcaSelect: { value: items.new_marca, label: items["new_marca@OData.Community.Display.V1.FormattedValue"] },
          modelo: items["new_modelo@OData.Community.Display.V1.FormattedValue"],
          modeloSelect: {
            value: items.new_modelo,
            label: items["new_modelo@OData.Community.Display.V1.FormattedValue"],
          },
          observaciones: items.new_observaciones,
        };
        insumos.push(item);
      });
      setInsumos(insumos);
      setLoadingInsumos(loadingInsumosSelect);
    } else if (insumosRedux?.length == 0 && loadingInsumosSelect) {
      setInsumos([]);
      setLoadingInsumos(loadingInsumosSelect);
    }
  }, [insumosRedux, loadingInsumosSelect]);

  return { insumos, loadingInsumos };
};

export default useGetInsumosEmpleado;
