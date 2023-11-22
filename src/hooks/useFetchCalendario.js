import { getEmpleados } from "@/redux/dataVarios";
import { getLicenciasCalendario } from "@/redux/licencias";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchCalendario = (token) => {
  const dispatch = useDispatch();

  const licenciasCalendario = useSelector((store) => store.licencias.licenciasCalendario);
  const loadingLicenciasCalendario = useSelector((store) => store.licencias.loadingLicenciasCalendario);
  const empleadosSelect = useSelector((store) => store.dataVarios.empleados);

  const [licencias, setLicencias] = useState([]);

  useEffect(() => {
    dispatch(getLicenciasCalendario(token));
    dispatch(getEmpleados(token));
  }, [token]);

  useEffect(() => {
    const convertLicenciaCalendario = (item, isCumpleaños = false) => {
      const title = isCumpleaños
        ? `Cumpleaños - ${item.new_name}`
        : `${item["_new_empleado_value@OData.Community.Display.V1.FormattedValue"]} - ${item["_new_tipodelicencia_value@OData.Community.Display.V1.FormattedValue"]}`;

      return {
        id: item.new_licenciaid,
        title,
        start: moment(isCumpleaños ? item.new_proximocumpleanios : item.new_fechadesde).toDate(),
        end: moment(
          isCumpleaños ? item.new_proximocumpleanios : item.new_fechahasta ? item.new_fechahasta : item.new_fechadesde
        ).toDate(),
        licencia: item["_new_tipodelicencia_value@OData.Community.Display.V1.FormattedValue"],
        tipoLicencia: item["_new_tipodelicencia_value@OData.Community.Display.V1.FormattedValue"],
        fechaDesdeModal: moment(
          item[
            isCumpleaños
              ? "new_proximocumpleanios@OData.Community.Display.V1.FormattedValue"
              : "new_fechadesde@OData.Community.Display.V1.FormattedValue"
          ],
          "DD/MM/YY"
        ).format("YYYY-MM-DD"),
        fechaHastaModal: moment(
          item[
            isCumpleaños
              ? "new_proximocumpleanios@OData.Community.Display.V1.FormattedValue"
              : "new_fechahasta@OData.Community.Display.V1.FormattedValue"
          ],
          "DD/MM/YY"
        ).format("YYYY-MM-DD"),
        cantidadDeHoras: item.new_cantidadhoraslicencia,
        tipoLicenciaSelect: {
          value: item["_new_tipodelicencia_value"],
          label: item["_new_tipodelicencia_value@OData.Community.Display.V1.FormattedValue"],
        },
        horadesdeSelect: item["new_horadesde@OData.Community.Display.V1.FormattedValue"],
        horaHastaSelect: item["new_horahasta@OData.Community.Display.V1.FormattedValue"],
        vacaciones: item["_new_vacaciones_value@OData.Community.Display.V1.FormattedValue"],
        estado: item["statuscode@OData.Community.Display.V1.FormattedValue"],
        comentarios: item.new_comentarios,
        extendedProps: {
          calendar: 'Business'
        },
        allDay: true,
      };
      
    };

    if (licenciasCalendario?.length > 0 || empleadosSelect?.length > 0) {
      const combinedArray = [];

      if (licenciasCalendario?.length > 0) {
        licenciasCalendario.forEach((item) => {
          const licenciaObj = convertLicenciaCalendario(item);
          combinedArray.push(licenciaObj);
        });
      }

      if (empleadosSelect?.length > 0) {
        empleadosSelect.forEach((item) => {
          const cumpleañosObj = convertLicenciaCalendario(item, true);
          combinedArray.push(cumpleañosObj);
        });
      }

      setLicencias(combinedArray);
    }
  }, [licenciasCalendario, empleadosSelect]);

  return { licencias, loadingLicenciasCalendario };
};

export default useFetchCalendario;
