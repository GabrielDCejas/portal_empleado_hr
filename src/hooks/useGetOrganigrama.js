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

  console.log("organigramaRedux", organigramaRedux)

  useEffect(() => {
    if (organigramaRedux?.length > 0 && fotosUsuario?.length > 0 && loadingOrganigramaSelect) {
      const organigrama = [];
      organigramaRedux.forEach((items) => {
        let item = {
          id: items["_new_responsable_value"] + items["new_name"],
          puesto: items["new_name"],
          segmentoUnidad: items["new_tipo@OData.Community.Display.V1.FormattedValue"],
          responsable: items["_new_responsable_value@OData.Community.Display.V1.FormattedValue"],
          unidadSuperior: items["_new_unidadsuperior_value@OData.Community.Display.V1.FormattedValue"],
          IdArbol: items["new_unidadorganigramaid"],
          unidadSuperiorId: items["_new_unidadsuperior_value"] ? items["_new_unidadsuperior_value"] : null
        };
        const foto = fotosUsuario.find((foto) => foto.empleadoid === items["_new_responsable_value"]);
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
