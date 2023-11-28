import { AuthContext } from "@/context/AuthContext";
import { getCiclosPGD } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetCiclosPGD = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const ciclosPgdRedux = useSelector((store) => store.dataVarios.ciclosPgd)
  const [ciclosPgd, setCiclosPgd] = useState([])

  useEffect(() => {
    dispatch(getCiclosPGD(token));
  }, []);

  useEffect(() => {
    if (ciclosPgdRedux?.length > 0) {
      const ciclospgd = []
      ciclosPgdRedux.forEach((items) => {
        let item = {
          value: items.new_ciclodepgdid,
          label: items.new_name,
        }
        ciclospgd.push(item)
      })
      setCiclosPgd(ciclospgd)
    }
  }, [ciclosPgdRedux])

  return {ciclosPgd };
};

export default useGetCiclosPGD;