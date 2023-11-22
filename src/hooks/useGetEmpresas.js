import { AuthContext } from "@/context/AuthContext";
import { getEmpresas } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetEmpresas = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const empresasRedux = useSelector((store) => store.dataVarios.empresas);
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    dispatch(getEmpresas(token));
  }, []);

  useEffect(() => {
    if (empresasRedux?.length > 0) {
      const empresas = [];
      empresasRedux.forEach((items) => {
        let item = {
          value: items.new_empresaid,
          label: items.new_name,
        };
        empresas.push(item);
      });
      setEmpresas(empresas);
    }
  }, [empresasRedux]);

  return { empresas };
};

export default useGetEmpresas;
