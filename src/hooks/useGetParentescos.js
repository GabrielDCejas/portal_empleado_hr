import { AuthContext } from "@/context/AuthContext";
import { getParentesco } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetParentescos = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const parentescosRedux = useSelector((store) => store.dataVarios.parentescos)
  const [parentescos, setParentescos] = useState([])

  useEffect(() => {
    dispatch(getParentesco(token));
  }, []);

  useEffect(() => {
    if (parentescosRedux?.length > 0) {
      const parestesco = []
      parentescosRedux.forEach((items) => {
        let item = {
          value: items.new_parentescoid,
          label: items.new_name,
        }
        parestesco.push(item)
      })
      setParentescos(parestesco)
    }
  }, [ parentescosRedux])

  return { parentescos };
};

export default useGetParentescos;