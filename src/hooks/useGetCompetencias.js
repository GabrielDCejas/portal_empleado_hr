import { AuthContext } from "@/context/AuthContext";
import { getCompetencias } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetCompetencias = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const competenciasRedux = useSelector((store) => store.dataVarios.competencias)
  const [competencias, setCompetencias] = useState([])

  useEffect(() => {
    dispatch(getCompetencias(token));
  }, []);

  useEffect(() => {
    if (competenciasRedux?.length > 0) {
      const competencia = []
      competenciasRedux.forEach((items) => {
        let item = {
          value: items.new_competenciaid,
          label: items.new_name,
        }
        competencia.push(item)
      })
      setCompetencias(competencia)
    }
  }, [competenciasRedux])

  return {competencias };
};

export default useGetCompetencias;