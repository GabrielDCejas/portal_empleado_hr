import { AuthContext } from "@/context/AuthContext";
import { getRequerimientoPersonal } from "@/redux/solicitudes";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRequerimientoPersonal = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const requerimientoPersonalsRedux = useSelector((store) => store.solicitudes.requerimientoPersonal);
  const [requerimientoPersonal, setRequerimientoPersonal] = useState([]);
  const loadingRequerimientoPersonalSelect = useSelector((store) => store.solicitudes.loadingRequerimientoPersonal);
  const [loadingRequerimientoPersonal, setLoadingLoadingRequerimientoPersonal] = useState(false);
  
  useEffect(() => {
    dispatch(getRequerimientoPersonal(token));
  }, []);

  useEffect(() => {
    if (requerimientoPersonalsRedux?.length > 0 && loadingRequerimientoPersonalSelect) {
      const requerimiento = [];
      requerimientoPersonalsRedux.forEach((items) => {
        let item = {
          id: items.new_solicituddecandidatoid,
          fecha_solicitud: items["createdon@OData.Community.Display.V1.FormattedValue"],
          perfil: items["new_perfil"],
          puesto: items["_new_puesto_value@OData.Community.Display.V1.FormattedValue"],
          cliente: items["_new_cliente_value@OData.Community.Display.V1.FormattedValue"],
          razon_estado: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          empleado: {label: items["_new_empleadosolicitante_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_empleadosolicitante_value"]},
          clienteSelect: {label: items["_new_cliente_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_cliente_value"]},
          prioridad: {label: items["new_prioridad@OData.Community.Display.V1.FormattedValue"], value: items["new_prioridad"]},
          puestoSelect: {label: items["_new_puesto_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_puesto_value"]},
          proyecto: {label: items["_new_proyectos_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_proyectos_value"]},
          vacante: items.new_vacante,
          cantidad_mensuales: items.new_cantidaddehorasmensuales,
          modalidad_contratacion: {label: items["new_modalidaddecontratacin@OData.Community.Display.V1.FormattedValue"], value: items["new_modalidaddecontratacin"]},
          duracion_contratacion_meses: items.new_duracindelacontratacin,
          jornada_trabajo: {label: items["new_jornadadetrabajo@OData.Community.Display.V1.FormattedValue"], value: items["new_jornadadetrabajo"]},
          fecha_inicio_contratacion: items["new_fechaidealdeinicio"],
          descripcion_proyecto: items.new_descripcionproyecto,
          requerimientos_perfil_contratar: items.new_requerimientodelperfilacontratar,
          condiciones_especiales_seguro_accidentes: items.new_condicinespecialesdesegurodeaccidente,
          beneficios_dicionales: items.new_beneficioadicional,
          comentarios_generales: items.new_comentariosgenerales,
          solicitud_nuevo_puesto : {label: items["_new_solicituddepuestonuevo_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_solicituddepuestonuevo_value"]},
          aprobador: {label: items["_new_empleadoaprobador1_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_empleadoaprobador1_value"]},
        }; 
        requerimiento.push(item);
      });
      setRequerimientoPersonal(requerimiento);
      setLoadingLoadingRequerimientoPersonal(loadingRequerimientoPersonalSelect);
    } else if (requerimientoPersonalsRedux?.length == 0 && loadingRequerimientoPersonalSelect) {
        setRequerimientoPersonal([]);
        setLoadingLoadingRequerimientoPersonal(loadingRequerimientoPersonalSelect);
    }
  }, [requerimientoPersonalsRedux, loadingRequerimientoPersonalSelect]);

  return { requerimientoPersonal, loadingRequerimientoPersonal };
};

export default useGetRequerimientoPersonal;