import { AuthContext } from "@/context/AuthContext";
import { getFamiliaPorEmpleado } from "@/redux/empleados";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetDatosFamiliares = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const familiaresRedux = useSelector((store) => store.empleado.familiares)
  const loadingFamiliaresSelect = useSelector((store) => store.empleado.loadingFamiliares)
 const [familiares, setfamiliares] = useState([])
 const [loadingFamiliares, setLoadingFamiliares] = useState(false)

  useEffect(() => {
    dispatch(getFamiliaPorEmpleado(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (familiaresRedux?.length > 0 && loadingFamiliaresSelect) {
        const familiares = []
        familiaresRedux.forEach((items) => {
          let item = {
            id: items.new_familiardeempleadoid,
            nombre: items.new_nombredepila,
            apellido: items.new_apellidos,
            fechaNacimiento: items["new_fechanacimiento@OData.Community.Display.V1.FormattedValue"],
            fechaNacimientoModal: moment(items["new_fechanacimiento@OData.Community.Display.V1.FormattedValue"], "DD/MM/YY").format("YYYY-MM-DD"),
            tipoDocumento: items["new_tipodocumento@OData.Community.Display.V1.FormattedValue"],
            tipoDocumentoSelect: {
              value: items["new_tipodocumento"],
              label: items["new_tipodocumento@OData.Community.Display.V1.FormattedValue"],
            },
            generoSelect: {
              value: items["new_sexo"],
              label: items["new_sexo@OData.Community.Display.V1.FormattedValue"],
            },
            ocupacionSelect: {
              value: items["new_ocupacion"],
              label: items["new_ocupacion@OData.Community.Display.V1.FormattedValue"],
            },
            parentescoSelect: {
              value: items["_new_parentesco_value"],
              label: items["_new_parentesco_value@OData.Community.Display.V1.FormattedValue"],
            },
            numeroDocumento: items.new_nrodocumento,
            parentesco: items["_new_parentesco_value@OData.Community.Display.V1.FormattedValue"],
          }
          familiares.push(item)
        })
        setfamiliares(familiares)
        setLoadingFamiliares(loadingFamiliaresSelect)
    } else if(familiaresRedux?.length === 0 && loadingFamiliaresSelect) {
      setfamiliares([])
      setLoadingFamiliares(loadingFamiliaresSelect)
    }
  }, [familiaresRedux, loadingFamiliaresSelect])

  return { familiares, loadingFamiliares };
};

export default useGetDatosFamiliares;