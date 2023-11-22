import { AuthContext } from "@/context/AuthContext";
import { getUniversidades } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetUniversidades = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const universidadesRedux = useSelector((store) => store.dataVarios.universidades)
  const [universidades, setUniversidades] = useState([])

  useEffect(() => {
    dispatch(getUniversidades(token));
  }, []);

  useEffect(() => {
    if (universidadesRedux?.length > 0) {
      const universidades = []
      universidadesRedux.forEach((items) => {
        let item = {
          value: items.new_universidadid,
          label: items.new_name,
        }
        universidades.push(item)
      })
      setUniversidades(universidades)
    }

  }, [universidadesRedux])

  return { universidades };
};

export default useGetUniversidades;
