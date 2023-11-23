import { AuthContext } from "@/context/AuthContext";
import { getOrganigramas } from "@/redux/dataVarios";
import { obtenerUsuariosFirebase } from "@/redux/usuariosFirebase";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetOrganigrama = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const organigramaRedux = useSelector((store) => store.dataVarios.organigrama);
  const loadingOrganigramaSelect = useSelector((store) => store.dataVarios.loadingOrganigrama);
  const fotosUsuario = useSelector((store) => store.usuariosFirebase.fotosUsuario);
  const [organigrama, setOrganigrama] = useState([]);
  const [loadingOrganigrama, setLoadingOrganigrama] = useState(false);

  useEffect(() => {
    dispatch(getOrganigramas(token));
    dispatch(obtenerUsuariosFirebase());
  }, []);

  useEffect(() => {
    if (organigramaRedux?.length > 0 && fotosUsuario?.length > 0 && loadingOrganigramaSelect) {
      const organigrama = [];
      organigramaRedux.forEach((items) => {
        let item = {
          id: items["organigrama.new_responsable"] + items["new_name"],
          puesto: items["new_name"],
          segmentoUnidad: items["organigrama.new_name"],
          responsable: items["organigrama.new_responsable@OData.Community.Display.V1.FormattedValue"],
          unidadSuperior: items["organigrama.new_unidadsuperior@OData.Community.Display.V1.FormattedValue"],
          IdArbol: items["organigrama.new_unidadorganigramaid"],
          unidadSuperiorId: items["organigrama.new_unidadsuperior"] ? items["organigrama.new_unidadsuperior"] : null
        };
        const foto = fotosUsuario.find((foto) => foto.empleadoid === items["organigrama.new_responsable"]);
        if (foto) {
          item.foto = foto.photoURL;
        }
        organigrama.push(item);
      });
      setOrganigrama(organigrama);
      setLoadingOrganigrama(loadingOrganigramaSelect);
    } else if (organigramaRedux?.length == 0 && loadingOrganigramaSelect) {
      setOrganigrama([]);
      setLoadingOrganigrama(loadingOrganigramaSelect);
    }
  }, [organigramaRedux, fotosUsuario, loadingOrganigramaSelect]);

  return { organigrama, loadingOrganigrama };
};

export default useGetOrganigrama;
