import { AuthContext } from "@/context/AuthContext";
import { getBancos } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetBancos = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const bancosRedux = useSelector((store) => store.dataVarios.bancos);
  const [bancos, setBancos] = useState([]);

  useEffect(() => {
    dispatch(getBancos(token));
  }, []);

  useEffect(() => {
    if (bancosRedux?.length > 0) {
      const bancos = [];
      bancosRedux.forEach((items) => {
        let item = {
          value: items.new_bancoid,
          label: items.new_name,
        };
        bancos.push(item);
      });
      setBancos(bancos);
    }
  }, [bancosRedux]);

  return { bancos };
};

export default useGetBancos;
