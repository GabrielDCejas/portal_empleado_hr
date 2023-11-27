import { AuthContext } from "@/context/AuthContext";
import { getEvaluacionPGD } from "@/redux/evaluaciones";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetEvaluacionesPGD = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const evaluacionPGDRedux = useSelector((store) => store.evaluaciones.evaluacionPGD);
  const loadingEvaluacionPGDSelect = useSelector((store) => store.evaluaciones.loadingEvaluacionPGD);
  const [evaluacionPGD, setEvaluacionPGD] = useState([]);
  const [loadingEvaluacionPGD, setLoadingEvaluacionPGD] = useState(false);

  useEffect(() => {
    dispatch(getEvaluacionPGD(token, user?.empleadoid));
  }, []);

  useEffect(() => {
    if (evaluacionPGDRedux?.length > 0 && loadingEvaluacionPGDSelect) {
      const evaluacion = [];
      evaluacionPGDRedux?.forEach((items) => {
        let item = {
          id: items.new_evaluaciondepgdid,
          nombre: items["new_name"],
          fecha_creacion: items["createdon@OData.Community.Display.V1.FormattedValue"],
          periodo_pgd: items["ciclodepgd.new_perododepgdasociado@OData.Community.Display.V1.FormattedValue"],
          ciclo_pgd: items["_new_ciclo_value@OData.Community.Display.V1.FormattedValue"],
          grupo_ciclo: items["_new_grupodeciclo_value@OData.Community.Display.V1.FormattedValue"],
          numero_legajo_evaluado: items["evaluado.new_numerolegajo@OData.Community.Display.V1.FormattedValue"],
          evaluado: items["_new_evaluado_value@OData.Community.Display.V1.FormattedValue"],
          posicion: items["new_posicin@OData.Community.Display.V1.FormattedValue"],
          area_de_personal: items["new_areadepersonal@OData.Community.Display.V1.FormattedValue"],
          gurpo_de_personal: items["new_grupodepersonal@OData.Community.Display.V1.FormattedValue"],
          unidad_organizativa: items["_new_unidadorganizativadirecta_value@OData.Community.Display.V1.FormattedValue"],
          numero_legajo_lider: items["empleadoid.new_numerolegajo"],
          lider: items["_new_lder_value@OData.Community.Display.V1.FormattedValue"],
          liderId: items["_new_lder_value"],
          instancia: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          estado_autoevaluacion: items["new_estadodelaautoevaluacin@OData.Community.Display.V1.FormattedValue"],
          estado_evaluacion_lider: items["new_estadodelaevaluacindellder@OData.Community.Display.V1.FormattedValue"],
          estado_encuentro_feedback: items["new_estadodelencuentrodefeedback@OData.Community.Display.V1.FormattedValue"],
          estadofinal_de_la_evaluacinde_pgd : items["new_estadofinaldelaevaluacindepgd@OData.Community.Display.V1.FormattedValue"],
          puesto: items["_new_puesto_value@OData.Community.Display.V1.FormattedValue"],
          fecha_inicio_autoevalacion: items["new_fechainicioautoevaluacion@OData.Community.Display.V1.FormattedValue"],
          fecha_vencimiento_autoevalacion: items["new_fechavencimientoautoevaluacin@OData.Community.Display.V1.FormattedValue"],
          definicion_objetivos: items["new_autoevaluacion@OData.Community.Display.V1.FormattedValue"],
          estado_definicion_objetivos : items["new_estadodelaautoevaluacin@OData.Community.Display.V1.FormattedValue"],
          comentarios_observaciones: items["new_comentariosyobservaciones"],
          promedio_evaluacion: items["new_promedioevaluacionpgd@OData.Community.Display.V1.FormattedValue"],
          cantidad_competencias: items["new_cantidadcompetencias@OData.Community.Display.V1.FormattedValue"],
          puntaje_evaluacion_pgd_lider: items["new_puntajeevaluacionpgd@OData.Community.Display.V1.FormattedValue"],
          puntaje_ideal_competencias: items["new_puntajeidealcompetencias@OData.Community.Display.V1.FormattedValue"],
          comentariosyobservacionesdelaevaluacion : items["new_comentariosyobservacionesdelaevaluacion"],
          mi_proposito: items["new_miproposito"],
          comentarios_obervaciones_proposito: items["new_comentariosyobervacionesdesupropsito"],
          nuevo_proposito: items["new_nuevoproposito"],
          comentariosyobservacionesaspeval: items["new_comentariosyobservacionesaspeval"],
        };
        evaluacion.push(item);
      });
      setEvaluacionPGD(evaluacion);
      setLoadingEvaluacionPGD(loadingEvaluacionPGDSelect);
    } else if (evaluacionPGDRedux?.length == 0 && loadingEvaluacionPGDSelect) {
        setEvaluacionPGD([]);
        setLoadingEvaluacionPGD(loadingEvaluacionPGDSelect);
    }
  }, [evaluacionPGDRedux, loadingEvaluacionPGDSelect]);

  return { evaluacionPGD, loadingEvaluacionPGD };
};

export default useGetEvaluacionesPGD;
