import { AuthContext } from "@/context/AuthContext";
import { getRolPeriodos } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useRolPeriodos = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const periodosRedux = useSelector((store) => store.dataVarios.periodos)
  const [periodos, setPeriodos] = useState([])

  useEffect(() => {
    dispatch(getRolPeriodos(token));
  }, []);

  useEffect(() => {
    if (periodosRedux?.length > 0) {
      const periodos = []
      periodosRedux.forEach((items) => {
        let item = {
          value: items.new_periodoid,
          label: items.new_name,
        }
        periodos.push(item)
      })
      setPeriodos(periodos)
    }
  }, [ periodosRedux])

  return { periodos };
};

export default useRolPeriodos;

