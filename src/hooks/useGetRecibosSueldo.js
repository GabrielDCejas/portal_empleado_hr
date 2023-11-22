import { AuthContext } from "@/context/AuthContext";
import { getRecibosSueldo } from "@/redux/empleados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRecibosSueldo = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const recibosSelector = useSelector((store) => store.empleado.recibos)
  const loadingRecibosSelecto = useSelector((store) => store.empleado.loadingRecibos)
  const [recibos, setRecibos] = useState([])
  const [loadingRecibos, setLoadingRecibos] = useState(false)


  useEffect(() => {
    dispatch(getRecibosSueldo(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (recibosSelector?.length > 0 && loadingRecibosSelecto) {
      const newArray = recibosSelector.map((item) => ({
        id: item.annotationid,
        filename: item.filename,
      }));

      setRecibos(newArray);
      setLoadingRecibos(loadingRecibosSelecto)
    } else if (recibosSelector?.length == 0 && loadingRecibosSelecto) {
      setRecibos([]);
      setLoadingRecibos(loadingRecibosSelecto)
    }
  }, [recibosSelector, loadingRecibosSelecto]);


  return { recibos, loadingRecibos };
};

export default useGetRecibosSueldo;
