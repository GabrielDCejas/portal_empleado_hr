import { AuthContext } from "@/context/AuthContext";
import { getPerspectivaNegocios } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetPerpesctivaNegocios = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const perpectivaNegociosRedux = useSelector((store) => store.dataVarios.perpectivaNegocios)
  const [perpectivaNegocios, setPerpectivaNegocios] = useState([])

  useEffect(() => {
    dispatch(getPerspectivaNegocios(token));
  }, []);

  useEffect(() => {
    if (perpectivaNegociosRedux?.length > 0) {
      const perpectivaNegocio = []
      perpectivaNegociosRedux.forEach((items) => {
        let item = {
          value: items.new_perspectivadenegocioid,
          label: items.new_name,
        }
        perpectivaNegocio.push(item)
      })
      setPerpectivaNegocios(perpectivaNegocio)
    }
  }, [ perpectivaNegociosRedux])

  return { perpectivaNegocios };
};

export default useGetPerpesctivaNegocios;