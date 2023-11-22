import { AuthContext } from "@/context/AuthContext";
import { getCuentasBancariasPorEmpleado } from "@/redux/empleados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetDatosBancarios = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const cuentasBancariasRedux = useSelector((store) => store.empleado.cuentasBancarias)
  const loadingCuentasBancariasSelect = useSelector((store) => store.empleado.loadingCuentasBancarias)
  const [cuentasBancarias, setCuentasBancarias] = useState([])
  const [loadingCuentasBancarias, setLoadingCuentasBancarias] = useState(false)

  useEffect(() => {
    dispatch(getCuentasBancariasPorEmpleado(token, user?.empleadoid));
  }, []);


  useEffect(() => {
    if (cuentasBancariasRedux?.length > 0 && loadingCuentasBancariasSelect) {
      const cuentas = []
      cuentasBancariasRedux.forEach((items) => {
        let item = {
          id: items.new_cuentabancariaid,
          banco: items["_new_banco_value@OData.Community.Display.V1.FormattedValue"],
          bancoSelect: {
            value: items["_new_banco_value"],
            label: items["_new_banco_value@OData.Community.Display.V1.FormattedValue"],
          },
          divisaSelect: {
            value: items["_transactioncurrencyid_value"],
            label: items["_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue"],
          },
          tipoDeCuentaSelect: {
            value: items["new_tipodecuenta"],
            label: items["new_tipodecuenta@OData.Community.Display.V1.FormattedValue"],
          },
          tipoDeCuenta: items["new_tipodecuenta@OData.Community.Display.V1.FormattedValue"],
          numeroDeCuenta: items["new_numerocuenta"],
          cbu: items["new_cbu"],
        }
        cuentas.push(item)
      })
      setCuentasBancarias(cuentas)
      setLoadingCuentasBancarias(loadingCuentasBancariasSelect)
    } else if(cuentasBancariasRedux?.length == 0 && loadingCuentasBancariasSelect) {
      setCuentasBancarias([])
      setLoadingCuentasBancarias(loadingCuentasBancariasSelect)
    }
  }, [cuentasBancariasRedux, loadingCuentasBancariasSelect])

  return { cuentasBancarias, loadingCuentasBancarias };
};

export default useGetDatosBancarios;
