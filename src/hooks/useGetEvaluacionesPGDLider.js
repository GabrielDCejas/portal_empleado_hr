import { AuthContext } from "@/context/AuthContext";
import { getEvaluacionPGDLider } from "@/redux/evaluaciones";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetEvaluacionesPGDLider = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);

  const evaluacionPGDRedux = useSelector((store) => store.evaluaciones.evaluacionPGDLider);
  const loadingEvaluacionPGDSelect = useSelector((store) => store.evaluaciones.loadingEvaluacionPGDLider);
  const [evaluacionPGDLider, setEvaluacionPGDLider] = useState([]);
  const [loadingEvaluacionPGDLider, setLoadingEvaluacionPGDLider] = useState(false);

  useEffect(() => {
    dispatch(getEvaluacionPGDLider(token, user?.empleadoid));
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
          ciclo_pgd_select: {label: items["_new_ciclo_value@OData.Community.Display.V1.FormattedValue"], value:items["_new_ciclo_value"] },
          grupo_ciclo: items["_new_grupodeciclo_value@OData.Community.Display.V1.FormattedValue"],
          numero_legajo_evaluado: items["evaluado.new_numerolegajo@OData.Community.Display.V1.FormattedValue"],
          evaluado: items["_new_evaluado_value@OData.Community.Display.V1.FormattedValue"],
          posicion: items["new_posicin@OData.Community.Display.V1.FormattedValue"],
          area_de_personal: items["new_areadepersonal@OData.Community.Display.V1.FormattedValue"],
          gurpo_de_personal: items["new_grupodepersonal@OData.Community.Display.V1.FormattedValue"],
          unidad_organizativa: items["_new_unidadorganizativadirecta_value@OData.Community.Display.V1.FormattedValue"],
          numero_legajo_lider: items["empleadoid.new_numerolegajo"],
          lider: items["_new_lder_value@OData.Community.Display.V1.FormattedValue"],
          lider_select: {label: items["_new_lder_value@OData.Community.Display.V1.FormattedValue"], value: items["_new_lder_value"]},
          liderId: items["_new_lder_value"],
          isLider: true,
          instancia: items["statuscode@OData.Community.Display.V1.FormattedValue"],
          estado_autoevaluacion: items["new_estadodelaautoevaluacin@OData.Community.Display.V1.FormattedValue"],
          estado_evaluacion_liderTabla: items["new_estadodelaevaluacindellder@OData.Community.Display.V1.FormattedValue"],
          estado_encuentro_feedbackTabla: items["new_estadodelencuentrodefeedback@OData.Community.Display.V1.FormattedValue"],
          estadofinal_de_la_evaluacinde_pgd : items["new_estadofinaldelaevaluacindepgd@OData.Community.Display.V1.FormattedValue"],
          puesto: items["_new_puesto_value@OData.Community.Display.V1.FormattedValue"],
          fecha_inicio_autoevalacion:  items["new_fechainicioautoevaluacion"],
          fecha_vencimiento_autoevalacion: items["new_fechavencimientoautoevaluacin"],
          definicion_objetivos: items["new_autoevaluacion@OData.Community.Display.V1.FormattedValue"],
          estado_definicion_objetivos : {label: items["new_estadodelaautoevaluacin@OData.Community.Display.V1.FormattedValue"], value: items["new_estadodelaautoevaluacin"]},
          comentarios_observaciones: items["new_comentariosyobservaciones"],
          promedio_evaluacion: items["new_promedioevaluacionpgd@OData.Community.Display.V1.FormattedValue"],
          cantidad_competencias: items["new_cantidadcompetencias@OData.Community.Display.V1.FormattedValue"],
          puntaje_evaluacion_pgd_lider: items["new_puntajeevaluacionpgd@OData.Community.Display.V1.FormattedValue"],
          puntaje_ideal_competencias: items["new_puntajeidealcompetencias@OData.Community.Display.V1.FormattedValue"],
          comentariosyobservacionesdelaevaluacion : items["new_comentariosyobservacionesdelaevaluacion"],
          mi_proposito: items["new_miproposito"],
          comentarios_obervaciones_proposito: items["new_comentariosyobervacionesdesuproposito"],
          nuevo_proposito: items["new_nuevoproposito"],
          comentariosyobservacionesaspeval: items["new_comentariosyobservacionesaspeval"],
          fecha_inicio_evaluacin_lider: items["new_fechainicioevaluacindellider"],
          fecha_vencimiento_evaluacin_lider: items["new_fechavencimientoevaluacindellider"],
          new_evaluaciondellder: items["new_evaluaciondellder@OData.Community.Display.V1.FormattedValue"],
          estado_evaluacion_lider: {label: items["new_estadodelaevaluacindellder@OData.Community.Display.V1.FormattedValue"], value:items["new_estadodelaevaluacindellder"]},
          performance_individual: items["new_performanceindividual@OData.Community.Display.V1.FormattedValue"],
          nivel_logro: items["new_niveldelogroresultadotrimestralautoevalua@OData.Community.Display.V1.FormattedValue"],
          comentarios_observaciones_autoevaluacion: items.new_comentariosyobservacionesdeautoevaluacion,
          fecha_inicio_feedback: items["new_fechainiciofeedback"],
          fecha_vencimiento_feedback: items["new_fechavencimientofeedback"],
          fechayhora_encuentro_feedback: items["new_fechayhoradelencuentrodefeedback"],
          estado_encuentro_feedback: {label: items["new_estadodelencuentrodefeedback@OData.Community.Display.V1.FormattedValue"], value:items["new_estadodelencuentrodefeedback"]},
          score_global: {label: items["new_scoreglobal@OData.Community.Display.V1.FormattedValue"], value:items["new_scoreglobal"]},
          comentarios_observaciones_feedback: items.new_comentariosyobservacionesdelfeedback,
          comentarios_observaciones_feedbacklider: items.new_comentariosyobservacionesdelfeedbacklider,
        };
        evaluacion.push(item);
      });
      setEvaluacionPGDLider(evaluacion);
      setLoadingEvaluacionPGDLider(loadingEvaluacionPGDSelect);
    } else if (evaluacionPGDRedux?.length == 0 && loadingEvaluacionPGDSelect) {
        setEvaluacionPGDLider([]);
        setLoadingEvaluacionPGDLider(loadingEvaluacionPGDSelect);
    }
  }, [evaluacionPGDRedux, loadingEvaluacionPGDSelect]);

  return { evaluacionPGDLider, loadingEvaluacionPGDLider };
};

export default useGetEvaluacionesPGDLider;
