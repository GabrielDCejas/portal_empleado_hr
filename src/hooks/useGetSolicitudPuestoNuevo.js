import { AuthContext } from "@/context/AuthContext";
import {  getSolicitudPuestoNuevo } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetSolicitudPuestoNuevo = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const solicitudPuestoNuevoRedux = useSelector((store) => store.dataVarios.solicitudPuestoNuevo)
  const [solicitudPuestoNuevo, setSolicitudPuestoNuevo] = useState([])

  useEffect(() => {
    dispatch(getSolicitudPuestoNuevo(token));
  }, []);

  useEffect(() => {
    if (solicitudPuestoNuevoRedux?.length > 0) {
      const solicitud = []
      solicitudPuestoNuevoRedux.forEach((items) => {
        let item = {
          value: items.new_solicituddepuestonuevoid,
          label: items.new_name,
        }
        solicitud.push(item)
      })
      setSolicitudPuestoNuevo(solicitud)
    }
  }, [solicitudPuestoNuevoRedux])

  return { solicitudPuestoNuevo };
};

export default useGetSolicitudPuestoNuevo;
