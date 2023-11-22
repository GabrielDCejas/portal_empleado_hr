import { AuthContext } from "@/context/AuthContext";
import { getProyectos } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetProyectos = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const proyectosRedux = useSelector((store) => store.dataVarios.proyectos);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    dispatch(getProyectos(token));
  }, []);

  useEffect(() => {
    if (proyectosRedux?.length > 0) {
      const proyectos = [];
      proyectosRedux.forEach((items) => {
        let item = {
          value: items.new_proyectoid,
          label: items.new_name,
        };
        proyectos.push(item);
      });
      setProyectos(proyectos);
    }
  }, [proyectosRedux]);

  return { proyectos };
};

export default useGetProyectos;
