import { AuthContext } from "@/context/AuthContext";
import { getDivisa } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetDivisas = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const divisasRedux = useSelector((store) => store.dataVarios.divisas);
  const [divisas, setDivisas] = useState([]);

  useEffect(() => {
    dispatch(getDivisa(token));
  }, []);

  useEffect(() => {
    if (divisasRedux?.length > 0) {
      const divisas = [];
      divisasRedux.forEach((items) => {
        let item = {
          value: items.transactioncurrencyid,
          label: items.currencyname,
        };
        divisas.push(item);
      });
      setDivisas(divisas);
    }
  }, [divisasRedux]);

  return { divisas };
};

export default useGetDivisas;
