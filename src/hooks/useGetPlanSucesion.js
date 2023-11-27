import { AuthContext } from "@/context/AuthContext";
import { getPlanSucesion } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetPlanSucesion = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const planSucesionRedux = useSelector((store) => store.dataVarios.planSucesion)
  const [planSucesion, setPlanSucesion] = useState([])

  useEffect(() => {
    dispatch(getPlanSucesion(token));
  }, []);

  useEffect(() => {
    if (planSucesionRedux?.length > 0) {
      const planSucesion = []
      planSucesionRedux.forEach((items) => {
        let item = {
          value: items.new_plandesucesionid,
          label: items["createdon@OData.Community.Display.V1.FormattedValue"]
        }
        planSucesion.push(item)
      })
      setPlanSucesion(planSucesion)
    }
  }, [ planSucesionRedux])

  return { planSucesion };
};

export default useGetPlanSucesion;