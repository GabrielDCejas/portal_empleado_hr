import { AuthContext } from "@/context/AuthContext";
import { getPuestos } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetPuestos = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const puestosRedux = useSelector((store) => store.dataVarios.puestos);
  const [puestos, setPuestos] = useState([]);

  useEffect(() => {
    dispatch(getPuestos(token));
  }, []);

  useEffect(() => {
    if (puestosRedux?.length > 0) {
      const puestos = [];
      puestosRedux.forEach((items) => {
        let item = {
          value: items.new_cargoid,
          label: items.new_name,
        };
        puestos.push(item);
      });
      setPuestos(puestos);
    }
  }, [puestosRedux]);

  return { puestos };
};

export default useGetPuestos;
