import { AuthContext } from "@/context/AuthContext";
import { getCarreras } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetCarreras = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const carrerasRedux = useSelector((store) => store.dataVarios.carreras)
  const [carreras, setCarreras] = useState([])

  useEffect(() => {
    dispatch(getCarreras(token));
  }, []);

  useEffect(() => {
    if (carrerasRedux?.length > 0) {
      const carreras = []
      carrerasRedux.forEach((items) => {
        let item = {
          value: items.new_carreraid,
          label: items.new_name,
        }
        carreras.push(item)
      })
      setCarreras(carreras)
    }
  }, [carrerasRedux])

  return {carreras };
};

export default useGetCarreras;