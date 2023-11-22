import { AuthContext } from "@/context/AuthContext";
import { getCursos } from "@/redux/cursos";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetCursos = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const cursosRedux = useSelector((store) => store.cursos.cursos);
  const loadingCursosSelect = useSelector((store) => store.cursos.loadingCursos);
  const [cursos, setCursos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(false);

  useEffect(() => {
    dispatch(getCursos(token));
  }, []);


  useEffect(() => {
    if (cursosRedux?.length > 0 && loadingCursosSelect) {
      const cursos = [];
      cursosRedux.forEach((items) => {
        let item = {
          id: items.new_cursoid,
          nombre: items.new_name,
          estado: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          elearning: items["new_elearning@OData.Community.Display.V1.FormattedValue"],
          elearningModal: {
            label: items["new_elearning@OData.Community.Display.V1.FormattedValue"],
            value: items["new_elearning"],
          },
          externa: items["new_externa@OData.Community.Display.V1.FormattedValue"],
          externaModal: {
            label: items["new_externa@OData.Community.Display.V1.FormattedValue"],
            value: items["new_externa"],
          },
          inCompany: items["new_incompany@OData.Community.Display.V1.FormattedValue"],
          inCompanyModal: {
            label: items["new_incompany@OData.Community.Display.V1.FormattedValue"],
            value: items["new_incompany"],
          },
          interna: items["new_interna@OData.Community.Display.V1.FormattedValue"],
          internaModal: {
            label: items["new_interna@OData.Community.Display.V1.FormattedValue"],
            value: items["new_interna"],
          },
          contenido: items.new_contenido,
          accionModal: {
            label: items["new_accion@OData.Community.Display.V1.FormattedValue"],
            value: items["new_accion"],
          },
          objetivo: items.new_objetivo,
          duracionHoras: items.new_duracion,
        };
        cursos.push(item);
      });
      setCursos(cursos);
      setLoadingCursos(loadingCursosSelect);
    } else if (cursosRedux?.length == 0 && loadingCursosSelect) {
      setCursos([]);
      setLoadingCursos(loadingCursosSelect);
    }
  }, [cursosRedux, loadingCursosSelect]);

  return { cursos, loadingCursos };
};

export default useGetCursos;