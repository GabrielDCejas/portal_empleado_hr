import { AuthContext } from "@/context/AuthContext";
import { getRequerimientoPersonal } from "@/redux/solicitudes";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRequerimientoPersonal = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const requerimientoPersonalsRedux = useSelector((store) => store.solicitudes.requerimientoPersonal);
  const [requerimientoPersonal, setRequerimientoPersonal] = useState([]);
  const loadingRequerimientoPersonalSelect = useSelector((store) => store.solicitudes.loadingRequerimientoPersonal);
  const [loadingRequerimientoPersonal, setLoadingLoadingRequerimientoPersonal] = useState(false);
  
  useEffect(() => {
    dispatch(getRequerimientoPersonal(token));
  }, []);

  useEffect(() => {
    if (requerimientoPersonalsRedux?.length > 0 && loadingRequerimientoPersonalSelect) {
      const requerimiento = [];
      requerimientoPersonalsRedux.forEach((items) => {
        let item = {
          id: items.new_solicituddecandidatoid,
          fecha_solicitud: items["createdon@OData.Community.Display.V1.FormattedValue"],
          perfil: items["new_perfil"],
          puesto: items["_new_puesto_value@OData.Community.Display.V1.FormattedValue"],
          cliente: items["_new_cliente_value@OData.Community.Display.V1.FormattedValue"],
          razon_estado: items["statuscode@OData.Community.Display.V1.FormattedValue"]
        };
        requerimiento.push(item);
      });
      setRequerimientoPersonal(requerimiento);
      setLoadingLoadingRequerimientoPersonal(loadingRequerimientoPersonalSelect);
    } else if (requerimientoPersonalsRedux?.length == 0 && loadingRequerimientoPersonalSelect) {
        setRequerimientoPersonal([]);
        setLoadingLoadingRequerimientoPersonal(loadingRequerimientoPersonalSelect);
    }
  }, [requerimientoPersonalsRedux, loadingRequerimientoPersonalSelect]);

  return { requerimientoPersonal, loadingRequerimientoPersonal };
};

export default useGetRequerimientoPersonal;