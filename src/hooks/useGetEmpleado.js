import { AuthContext } from "@/context/AuthContext";
import { getEmpleado } from "@/redux/empleados";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetEmpleado = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const empleadoRedux = useSelector((store) => store.empleado.empleado);
  const [empleado, setEmpleado] = useState({});
  const resultadoEmpleadoSelect = useSelector((store) => store.empleado.resultadoEmpleado);
  const [loadingResultadoEmpleado, setLoadingResultadoEmpleado] = useState(false);

  useEffect(() => {
    dispatch(getEmpleado(user?.empleadoid, token));
  }, []);

  useEffect(() => {
    const empleado = [];
    if (empleadoRedux?.length > 0 && resultadoEmpleadoSelect) {
      empleadoRedux?.forEach((items) => {
        let item = {
          id: items.new_empleadoid,
          nroLegajo: items["new_numerolegajo@OData.Community.Display.V1.FormattedValue"],
          nombreCompleto: items.new_name,
          nombreDePila: items.new_nombredepila,
          apellido: items.new_apellidos,
          edad: items.new_cuitcuil ? Number(items["new_edad@OData.Community.Display.V1.FormattedValue"]) : 0,
          tipoDocumento: {
            label: items["new_tipodocumento@OData.Community.Display.V1.FormattedValue"],
            value: items.new_tipodocumento,
          },
          numeroDocumento: items.new_nrodocumento ? Number(items.new_nrodocumento) : 0,
          cuitCuil: items.new_cuitcuil ? Number(items.new_cuitcuil) : 0,
          tipoContratacion: {
            label: items["new_tipodeincorporacion@OData.Community.Display.V1.FormattedValue"],
            value: items.new_tipodeincorporacion,
          },
          genero: {
            label: items["new_sexo@OData.Community.Display.V1.FormattedValue"],
            value: items.new_sexo,
          },
          estadoCivil: {
            label: items["new_estadocivil@OData.Community.Display.V1.FormattedValue"],
            value: items.new_estadocivil,
          },
          pais: {
            label: items["_new_pais_value@OData.Community.Display.V1.FormattedValue"],
            value: items._new_pais_value,
          },
          paisNacimiento: {
            label: items["_new_paisnacimiento_value@OData.Community.Display.V1.FormattedValue"],
            value: items._new_paisnacimiento_value,
          },
          provincia: {
            label: items["_new_provincia_value@OData.Community.Display.V1.FormattedValue"],
            value: items._new_provincia_value,
          },
          provinciaNacimiento: {
            label: items["_new_provincianacimiento_value@OData.Community.Display.V1.FormattedValue"],
            value: items._new_provincianacimiento_value,
          },
          fechaIngreso: items["new_fechaingreso@OData.Community.Display.V1.FormattedValue"],
          fechaNacimiento: items["new_fechanacimiento@OData.Community.Display.V1.FormattedValue"]
            ? moment(items["new_fechanacimiento@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format(
                "YYYY-MM-DD"
              )
            : null,
          reportaA: items["_new_reportaaid_value@OData.Community.Display.V1.FormattedValue"],
          puesto: items["_new_puesto_value@OData.Community.Display.V1.FormattedValue"],
          proximoAniversario: items["new_proximoaniversario@OData.Community.Display.V1.FormattedValue"],
          proximoCumpleanios: items["new_proximocumpleanios@OData.Community.Display.V1.FormattedValue"],
          empresa: items["_new_empresa_value@OData.Community.Display.V1.FormattedValue"],
          email: items.new_correoelectronico,
          telefonoMovil: items.new_telefonomovil,
          telefonoParticular: items.new_telefonoparticular,
          calle: items.new_calle,
          nroCalle: items.new_nro,
          piso: items.new_piso,
          depto: items.new_depto,
          sufijo: items.new_sufijo,
          localidad: {
            label: items["_new_localidad_value@OData.Community.Display.V1.FormattedValue"],
            value: items._new_localidad_value,
          },
          extencionTefefonica: items.new_extenciontelefonica,
          codigoPostal:items.new_codigopostal ? Number(items.new_codigopostal) : 0,
          primarioCompleto: items.new_primariocompleto,
          secundarioCompleto: items.new_secundariocompleto,
          secundarioIncompleto: items.new_secundarioincompleto,
          bachiller: items.new_bachiller,
          tecnico: items.new_tecnico,
          peritoMercantil: items.new_peritomercantil,
        };
        empleado.push(item);
      });
      setEmpleado(...empleado);
      setLoadingResultadoEmpleado(resultadoEmpleadoSelect);
    } else if (empleadoRedux?.length == 0 && resultadoEmpleadoSelect) {
      setEmpleado([]);
      setLoadingResultadoEmpleado(resultadoEmpleadoSelect);
    }
  }, [empleadoRedux, resultadoEmpleadoSelect]);

  return { empleado, loadingResultadoEmpleado };
};

export default useGetEmpleado;
