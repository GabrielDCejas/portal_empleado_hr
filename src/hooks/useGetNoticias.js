import { AuthContext } from "@/context/AuthContext";
import { getNoticias } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetNoticias = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const noticiasRedux = useSelector((store) => store.dataVarios.noticias);
  const [noticias, setNoticias] = useState([]);
  const loadingNoticiasSelect = useSelector((store) => store.dataVarios.loadingNoticias);
  const [loadingNoticias, setLoadingNoticias] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getNoticias(token));
    }
  }, []);

  useEffect(() => {
    if (noticiasRedux?.length > 0 && loadingNoticiasSelect) {
      const noticias = [];
      noticiasRedux.forEach((items) => {
        let item = {
          id: items.new_asignacionid,
          nombre: items.new_name,
          descripcion: items.new_descripcion,
          fecha: items["createdon@OData.Community.Display.V1.FormattedValue"],
        };
        noticias.push(item);
      });
      setNoticias(noticias);
      setLoadingNoticias(loadingNoticiasSelect);
    } else if (noticiasRedux?.length == 0 && loadingNoticiasSelect) {
      setNoticias([]);
      setLoadingNoticias(loadingNoticiasSelect);
    }
  }, [noticiasRedux, loadingNoticiasSelect]);

  return { noticias, loadingNoticias };
};

export default useGetNoticias;
