import { AuthContext } from "@/context/AuthContext";
import { getLicencias } from "@/redux/licencias";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetLicencias = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const licenciasRedux = useSelector((store) => store.licencias.licencias);
  const loadingLicenciasSelect = useSelector((store) => store.licencias.loadingLicencias);
  const [licencias, setLicencias] = useState([]);
  const [loadingLicencias, setLoadingLicencias] = useState(false);

  useEffect(() => {
    dispatch(getLicencias(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (licenciasRedux?.length > 0 && loadingLicenciasSelect) {
      const licencias = [];
      licenciasRedux.forEach((items) => {
        let item = {
          id: items.new_licenciaid,
          comentarios: items.new_comentarios,
          licencia: items["_new_tipodelicencia_value@OData.Community.Display.V1.FormattedValue"],
          tipoLicencia: items["_new_tipodelicencia_value@OData.Community.Display.V1.FormattedValue"],
          tipoLicenciaSelect: {
            value: items["_new_tipodelicencia_value"],
            label: items["_new_tipodelicencia_value@OData.Community.Display.V1.FormattedValue"],
          },
          diasSolicitados: items.new_diassolicitados,
          fechaDeSolicitud: items.new_fechadesolicitud,
          fechaDesde: items["new_fechadesde@OData.Community.Display.V1.FormattedValue"],
          fechaDesdeModal: moment(items["new_fechadesde@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format(
            "YYYY-MM-DD"
          ),
          fechaHasta: items["new_fechahasta@OData.Community.Display.V1.FormattedValue"],
          fechaHastaModal: moment(items["new_fechahasta@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format(
            "YYYY-MM-DD"
          ),
          horadesdeSelect: {
            value: items["new_horadesde"],
            label: items["new_horadesde@OData.Community.Display.V1.FormattedValue"],
          },
          horaHastaSelect: {
            value: items["new_horahasta"],
            label: items["new_horahasta@OData.Community.Display.V1.FormattedValue"],
          },
          cantidadDeHoras: items.new_cantidadhoraslicencia,
          estado: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          vacaciones: {
            value: items["_new_vacaciones_value"],
            label: items["_new_vacaciones_value@OData.Community.Display.V1.FormattedValue"],
          },
        };
        licencias.push(item);
      });
      setLicencias(licencias);
      setLoadingLicencias(loadingLicenciasSelect);
    } else if (licenciasRedux?.length == 0 && loadingLicenciasSelect) {
      setLicencias([]);
      setLoadingLicencias(loadingLicenciasSelect);
    }
  }, [licenciasRedux, loadingLicenciasSelect]);

  return { licencias, loadingLicencias };
};

export default useGetLicencias;
