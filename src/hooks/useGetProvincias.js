import { AuthContext } from "@/context/AuthContext";
import { getProvincias } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetProvincias = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const provinciasRedux = useSelector((store) => store.dataVarios.provincias);
  const [provincias, setProvincias] = useState([]);

  useEffect(() => {
    dispatch(getProvincias(token));
  }, []);

  useEffect(() => {
    if (provinciasRedux?.length > 0) {
      const provincias = [];
      provinciasRedux.forEach((items) => {
        let item = {
          value: items.new_provinciaid,
          label: items.new_name,
        };
        provincias.push(item);
      });
      setProvincias(provincias);
    }
  }, [provinciasRedux]);

  return { provincias };
};

export default useGetProvincias;
