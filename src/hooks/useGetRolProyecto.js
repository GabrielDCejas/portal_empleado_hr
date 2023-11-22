import { AuthContext } from "@/context/AuthContext";
import { getRolProyecto } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRolProyecto = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const rolProyectoRedux = useSelector((store) => store.dataVarios.rolProyecto)
  const [rolProyectos, setRolProyectos] = useState([])

  useEffect(() => {
    dispatch(getRolProyecto(token));
  }, []);

  useEffect(() => {
    if (rolProyectoRedux?.length > 0) {
      const rolProyecto = []
      rolProyectoRedux.forEach((items) => {
        let item = {
          value: items.new_rolenelproyectoid,
          label: items.new_name,
        }
        rolProyecto.push(item)
      })
      setRolProyectos(rolProyecto)
    }
  }, [rolProyectoRedux])

  return { rolProyectos };
};

export default useGetRolProyecto;
