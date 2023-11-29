import { AuthContext } from "@/context/AuthContext";
import { getClientes } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetClientes = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const clientesRedux = useSelector((store) => store.dataVarios.clientes);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    dispatch(getClientes(token));
  }, []);

  useEffect(() => {
    if (clientesRedux?.length > 0) {
      const cliente = [];
      clientesRedux.forEach((items) => {
        let item = {
          value: items.new_clienteid,
          label: items.new_name,
        };
        cliente.push(item);
      });
      setClientes(cliente);
    }
  }, [clientesRedux]);

  return { clientes };
};

export default useGetClientes;
