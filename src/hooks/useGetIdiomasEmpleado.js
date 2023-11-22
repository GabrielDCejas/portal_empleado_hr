import { AuthContext } from "@/context/AuthContext";
import { getIdiomaEmpleado } from "@/redux/empleados";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetIdiomasEmpleado = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const idiomaEmpleadoRedux = useSelector((store) => store.empleado.idiomas)
  const loadingIdiomasSelect = useSelector((store) => store.empleado.loadingIdiomas)
  const [idiomaPorEmpleado, setIdiomaPorEmpleado] = useState([])
  const [loadingIdiomas, setLoadingIdiomas] = useState(false)

  useEffect(() => {
    dispatch(getIdiomaEmpleado(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (idiomaEmpleadoRedux?.length > 0 && loadingIdiomasSelect) {
      const idiomas = []
      idiomaEmpleadoRedux.forEach((items) => {
        let item = {
          id: items.new_idiomaporcontactoid,
          idioma: items["_new_idioma_value@OData.Community.Display.V1.FormattedValue"],
          idiomaSelect: {
            value: items["_new_idioma_value"],
            label: items["_new_idioma_value@OData.Community.Display.V1.FormattedValue"],
          },
          habla: items["new_habla@OData.Community.Display.V1.FormattedValue"],
          hablaSelect: {
            value: items["new_habla"],
            label: items["new_habla@OData.Community.Display.V1.FormattedValue"],
          },
          lee: items["new_lee@OData.Community.Display.V1.FormattedValue"],
          leeSelect: {
            value: items["new_lee"],
            label: items["new_lee@OData.Community.Display.V1.FormattedValue"],
          },
          escribe: items["new_escribe@OData.Community.Display.V1.FormattedValue"],
          escribeSelect: {
            value: items["new_escribe"],
            label: items["new_escribe@OData.Community.Display.V1.FormattedValue"],
          },
          nivel: items["new_nivel@OData.Community.Display.V1.FormattedValue"],
          nivelSelect: {
            value: items["new_nivel"],
            label: items["new_nivel@OData.Community.Display.V1.FormattedValue"],
          },
        }
        idiomas.push(item)
      })
      setIdiomaPorEmpleado(idiomas)
      setLoadingIdiomas(loadingIdiomasSelect)
    } else if(idiomaEmpleadoRedux?.length == 0 && loadingIdiomasSelect) {
      setIdiomaPorEmpleado([])
      setLoadingIdiomas(loadingIdiomasSelect)
    }
  }, [idiomaEmpleadoRedux, loadingIdiomasSelect])

  return { idiomaPorEmpleado, loadingIdiomas };
};

export default useGetIdiomasEmpleado;
