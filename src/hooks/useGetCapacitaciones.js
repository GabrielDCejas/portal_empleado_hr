import { AuthContext } from "@/context/AuthContext";
import { getCapacitacion } from "@/redux/dataVarios";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetCapacitaciones = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const capacitacionesRedux = useSelector((store) => store.dataVarios.capacitaciones)
  const loadingCapacitacionesSelect = useSelector((store) => store.dataVarios.loadingCapacitaciones)
  const [capacitaciones, setCapacitaciones] = useState([])
  const [loadingCapacitaciones, setLoadingCapacitaciones] = useState(false)

  useEffect(() => {
    dispatch(getCapacitacion(token));
  }, []);

  useEffect(() => {
    if (capacitacionesRedux?.length > 0 && loadingCapacitacionesSelect) {
      const capacitacion = []
      capacitacionesRedux.forEach((items) => {
        let item = {
          id: items.new_eventodecapacitacionid,
          evento: items["new_name"],
          lugar: items["new_lugar"],
          nombre_curso: items["_new_curso_value@OData.Community.Display.V1.FormattedValue"],
          tipoCapacitacion: items["new_tipodeevento@OData.Community.Display.V1.FormattedValue"],
          fechaInicio: items["new_fechainicio@OData.Community.Display.V1.FormattedValue"],
          fechaFinalizacion: items["new_fechafinalizacion@OData.Community.Display.V1.FormattedValue"],
          fechaInicioModal: items["new_fechainicio"] ? moment(items["new_fechainicio"], "YYYY-MM-DD").format("YYYY-MM-DD") : "",
          fechaFinalizacionModal: items["new_fechafinalizacion"] ? moment(items["new_fechafinalizacion"], "YYYY-MM-DD").format("YYYY-MM-DD") : "",
          descripcion: items["new_descripcion"],
          duracionHoras: items["new_duracionenhoras"],
          tipoCapacitacionSelect: {
            value: items["new_tipodeevento"],
            label: items["new_tipodeevento@OData.Community.Display.V1.FormattedValue"],
          },
        }
        capacitacion.push(item)
      })
      setCapacitaciones(capacitacion)
      setLoadingCapacitaciones(loadingCapacitacionesSelect)
    }else if(capacitacionesRedux?.length == 0 && loadingCapacitacionesSelect){
      setCapacitaciones([])
      setLoadingCapacitaciones(loadingCapacitacionesSelect)
    }
  }, [capacitacionesRedux, loadingCapacitacionesSelect])

  return { capacitaciones, loadingCapacitaciones };
};

export default useGetCapacitaciones;
