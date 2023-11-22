import { AuthContext } from "@/context/AuthContext";
import { getLocalidades } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetLocalidades = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const localidadesRedux = useSelector((store) => store.dataVarios.localidades);
  const [localidades, setLocalidades] = useState([]);

  useEffect(() => {
    dispatch(getLocalidades(token));
  }, []);

  useEffect(() => {
    if (localidadesRedux?.length > 0) {
      const localidades = [];
      localidadesRedux.forEach((items) => {
        let item = {
          value: items.new_localidadid,
          label: items.new_name,
        };
        localidades.push(item);
      });
      setLocalidades(localidades);
    }
  }, [localidadesRedux]);

  return { localidades };
};

export default useGetLocalidades;
