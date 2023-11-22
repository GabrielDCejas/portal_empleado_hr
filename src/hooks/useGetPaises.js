import { AuthContext } from "@/context/AuthContext";
import { getPaises } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetPaises = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const paisesRedux = useSelector((store) => store.dataVarios.paises)
  const [paises, setPaises] = useState([])

  useEffect(() => {
    dispatch(getPaises(token));
  }, []);

  useEffect(() => {
    if (paisesRedux?.length > 0) {
      const paises = []
      paisesRedux.forEach((items) => {
        let item = {
          value: items.new_paisid,
          label: items.new_name,
        }
        paises.push(item)
      })
      setPaises(paises)
    }
  }, [paisesRedux])

  return {paises };
};

export default useGetPaises;
