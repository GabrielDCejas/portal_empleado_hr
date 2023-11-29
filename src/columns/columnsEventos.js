import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import CustomChip from "@/@core/components/mui/chip"
import CustomAvatar from "@/@core/components/mui/avatar"
// ** Utils Import
import { getInitials } from '@/@core/utils/get-initials'
import Icon from "@/@core/components/icon"
import { useContext, useState } from "react"
// ** Next Imports
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";

// ** renders client column
const renderClient = (params) => {
    const stateNum = Math.floor(Math.random() * 6);
    const states = ["success", "error", "warning", "info", "primary", "secondary"];
    const color = states[stateNum];
  
    return (
      <CustomAvatar skin="light" color={color} sx={{ mr: 3, fontSize: ".8rem", width: "1.875rem", height: "1.875rem" }}>
        {getInitials(params ? params : "Undefined")}
      </CustomAvatar>
    );
  };

const RowOptions = ({ id }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null);
  const rowOptionsOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const handleRowOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const deleteRow = () => {
    // dispatch(deleteCurso(token, id))
    //   .then((id) => {
    //     dispatch(fetchCursosE(token));
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    handleRowOptionsClose();
  };

  return (
    <>
      {/* <Tooltip title='Eliminar'>
        <IconButton size="small" onClick={handleRowOptionsClick}>
          <Icon icon="mdi:trash-can-outline" fontSize={20} style={{ color: "red" }} />
        </IconButton>
      </Tooltip> */}
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{ style: { minWidth: "8rem" } }}
      >
        <MenuItem onClick={deleteRow} sx={{ "& svg": { mr: 2 } }}>
          <Icon icon="mingcute:alert-fill" fontSize={20} style={{ color: "red" }} />
          Desea eliminar este registro ?
        </MenuItem>
      </Menu>
    </>
  );
};




export const COLUMNS_EVENTOS_CAPACITACION = [
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Acciones',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Ver'>
          <IconButton size='small' component={Link} href={`/eventos/eventos-de-capacitacion/${row.id}`}>
            <Icon icon='mdi:eye-outline' fontSize={20} />
          </IconButton>
        </Tooltip>
        <RowOptions id={row.id} />
      </Box>
    )
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'fecha_inicio',
    headerName: 'Fecha de Inicio',
    renderCell: ({ row }) => <Tooltip title={row.fecha_inicio}><Typography variant='body2'>{row.fecha_inicio}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'fecha_finalizacion',
    headerName: 'Fecha de Finalizacion',
    renderCell: ({ row }) => <Tooltip title={row.fecha_finalizacion}><Typography variant='body2'>{row.fecha_finalizacion}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'id_canvas',
    headerName: 'IDcanvas (Curso (Maestro))',
    renderCell: ({ row }) => <Tooltip title={row.id_canvas}><Typography variant='body2'>{row.id_canvas}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 175,
    field: 'plan_capacitacion',
    headerName: 'Plan de Capacitacion',
    renderCell: ({ row }) => <Tooltip title={row.plan_capacitacion}><Typography variant='body2'>{row.plan_capacitacion}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'curso_maestro',
    headerName: 'Curso (Maestro)',
    renderCell: ({ row }) => <Tooltip title={row.curso_maestro}><Typography variant='body2'>{row.curso_maestro}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'tipo_oferta_Curso_maestro',
    headerName: 'Tipo de Oferta (Curso (Maestro))',
    renderCell: ({ row }) => <Tooltip title={row.tipo_oferta_Curso_maestro}><Typography variant='body2'>{row.tipo_oferta_Curso_maestro}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'tipo_formacion_Curso_maestro',
    headerName: 'Tipo de Formación (Curso (Maestro))',
    renderCell: ({ row }) => <Tooltip title={row.tipo_formacion_Curso_maestro}><Typography variant='body2'>{row.tipo_formacion_Curso_maestro}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'tipo_experiencia_aprendizaje_curo_m',
    headerName: 'Tipo de Experiencia de Aprendizaje (Curso (Maestro))',
    renderCell: ({ row }) => <Tooltip title={row.tipo_experiencia_aprendizaje_curo_m}><Typography variant='body2'>{row.tipo_experiencia_aprendizaje_curo_m}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'modalidad_del_curso',
    headerName: 'Modalidad del Curso',
    renderCell: ({ row }) => <Tooltip title={row.modalidad_del_curso}><Typography variant='body2'>{row.modalidad_del_curso}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'aplica_beca_curso_maestro',
    headerName: 'Aplica Beca (Curso (Maestro))',
    renderCell: ({ row }) => <Tooltip title={row.aplica_beca_curso_maestro}><Typography variant='body2'>{row.aplica_beca_curso_maestro}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'codigo',
    headerName: 'Codigo',
    renderCell: ({ row }) => <Tooltip title={row.codigo}><Typography variant='body2'>{row.codigo}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'razon_estado',
    headerName: 'Razón para el estado',
    renderCell: ({ row }) => <Tooltip title={row.razon_estado}><Typography variant='body2'>{row.razon_estado}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'duracion_horas',
    headerName: 'Duracion (en Horas)',
    renderCell: ({ row }) => <Tooltip title={row.duracion_horas}><Typography variant='body2'>{row.duracion_horas}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'cantidad_horas_participantes',
    headerName: 'Cantidad Horas Participantes Cursadas',
    renderCell: ({ row }) => <Tooltip title={row.cantidad_horas_participantes}><Typography variant='body2'>{row.cantidad_horas_participantes}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'participantes_totales',
    headerName: 'Participantes Totales',
    renderCell: ({ row }) => <Tooltip title={row.participantes_totales}><Typography variant='body2'>{row.participantes_totales}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'solicita_encuesta',
    headerName: 'Solicita Encuesta',
    renderCell: ({ row }) => <Tooltip title={row.solicita_encuesta}><Typography variant='body2'>{row.solicita_encuesta}</Typography></Tooltip>
  }, 
  {
    flex: 0.125,
    minWidth: 200,
    field: 'habilitado_portal',
    headerName: 'Habilitado en Portal',
    renderCell: ({ row }) => <Tooltip title={row.habilitado_portal}><Typography variant='body2'>{row.habilitado_portal}</Typography></Tooltip>
  }, 
  {
    flex: 0.125,
    minWidth: 200,
    field: 'cupo',
    headerName: 'Cupo',
    renderCell: ({ row }) => <Tooltip title={row.cupo}><Typography variant='body2'>{row.cupo}</Typography></Tooltip>
  }, 
  {
    flex: 0.125,
    minWidth: 200,
    field: 'presupuesto_asignado',
    headerName: 'Presupuesto asignado',
    renderCell: ({ row }) => <Tooltip title={row.presupuesto_asignado}><Typography variant='body2'>{row.presupuesto_asignado}</Typography></Tooltip>
  }, 
  {
    flex: 0.125,
    minWidth: 290,
    field: "propietario",
    headerName: "Propietario",
    renderCell: (params) => {
      const { row } = params;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row.propietario)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.propietario ? row.propietario : "Undefined"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.125,
    minWidth: 300,
    field: 'nombre',
    headerName: 'Nombre',
    renderCell: ({ row }) => <Tooltip title={row.nombre}><Typography variant='body2'>{row.nombre}</Typography></Tooltip>
  }, 
]

export const COLUMNS_CURSOS_EVENTO = [
  {
    flex: 0.125,
    minWidth: 200,
    field: 'Nombre',
    headerName: 'nombre',
    renderCell: ({ row }) => <Tooltip title={row.nombre}><Typography variant='body2'>{row.nombre}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'alcance',
    headerName: 'Alcance',
    renderCell: ({ row }) => <Tooltip title={row.alcance}><Typography variant='body2'>{row.alcance}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'tipo_curso',
    headerName: 'Tipo de Curso',
    renderCell: ({ row }) => <Tooltip title={row.tipo_curso}><Typography variant='body2'>{row.tipo_curso}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 290,
    field: "propietario",
    headerName: "Propietario",
    renderCell: (params) => {
      const { row } = params;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row.propietario)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.propietario ? row.propietario : "Undefined"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
]

export const COLUMNS_PARTICIPANTES_EVENTOS_CAPACITACION = [
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Acciones',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Ver'>
          <IconButton size='small' component={Link} href={`/participante-por-evento/${row.id}`}>
            <Icon icon='mdi:eye-outline' fontSize={20} />
          </IconButton>
        </Tooltip>
        <RowOptions id={row.id} />
      </Box>
    )
  },
  {
    flex: 0.125,
    minWidth: 220,
    field: 'programa_evento',
    headerName: 'Programa (Evento de Capacitacion)',
    renderCell: ({ row }) => <Tooltip title={row.programa_evento}><Typography variant='body2'>{row.programa_evento}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 220,
    field: 'evento_apacitacion',
    headerName: 'Evento de Capacitacion',
    renderCell: ({ row }) => <Tooltip title={row.evento_apacitacion}><Typography variant='body2'>{row.evento_apacitacion}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'fecha_inicio',
    headerName: 'Fecha Inicio (Evento de Capacitacion)',
    renderCell: ({ row }) => <Tooltip title={row.fecha_inicio}><Typography variant='body2'>{row.fecha_inicio}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'fecha_finalizacion',
    headerName: 'Fecha Finalizacion (Evento de Capacitacion)',
    renderCell: ({ row }) => <Tooltip title={row.fecha_finalizacion}><Typography variant='body2'>{row.fecha_finalizacion}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'duracion_horas',
    headerName: 'Duracion (Horas)',
    renderCell: ({ row }) => <Tooltip title={row.duracion_horas}><Typography variant='body2'>{row.duracion_horas}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'numero_documento',
    headerName: 'Nro. documento (Empleado)',
    renderCell: ({ row }) => <Tooltip title={row.numero_documento}><Typography variant='body2'>{row.numero_documento}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'numero_legajo',
    headerName: 'Nro. Legajo (Empleado)',
    renderCell: ({ row }) => <Tooltip title={row.numero_legajo}><Typography variant='body2'>{row.numero_legajo}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'empleado',
    headerName: 'Empleado',
    renderCell: (params) => {
      const { row } = params;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row.empleado)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.empleado ? row.empleado : "Undefined"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'correo_electronico',
    headerName: 'Correo electrónico Notificaciones (Empleado)',
    renderCell: ({ row }) => <Tooltip title={row.correo_electronico}><Typography variant='body2'>{row.correo_electronico}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'id_canvas',
    headerName: 'ID Canvas (Empleado)',
    renderCell: ({ row }) => <Tooltip title={row.id_canvas}><Typography variant='body2'>{row.id_canvas}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'unidad_organizativa_directa',
    headerName: 'Unidad Organizativa Directa (Empleado)',
    renderCell: ({ row }) => <Tooltip title={row.unidad_organizativa_directa}><Typography variant='body2'>{row.unidad_organizativa_directa}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'tipo_curso',
    headerName: 'Tipo de Curso',
    renderCell: ({ row }) => <Tooltip title={row.tipo_curso}><Typography variant='body2'>{row.tipo_curso}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'score',
    headerName: 'Score',
    renderCell: ({ row }) => <Tooltip title={row.score}><Typography variant='body2'>{row.score}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'plan_capacitacion',
    headerName: 'Plan de Capacitacion (Evento de Capacitacion)',
    renderCell: ({ row }) => <Tooltip title={row.plan_capacitacion}><Typography variant='body2'>{row.plan_capacitacion}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'razon_estado',
    headerName: 'Razón para el estado',
    renderCell: ({ row }) => <Tooltip title={row.razon_estado}><Typography variant='body2'>{row.razon_estado}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'propietario',
    headerName: 'Propietario',
    renderCell: (params) => {
      const { row } = params;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row.propietario)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.propietario ? row.propietario : "Undefined"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.125,
    minWidth: 250,
    field: 'curso_maestro',
    headerName: 'Curso (Maestro) (Evento de Capacitacion)',
    renderCell: ({ row }) => <Tooltip title={row.curso_maestro}><Typography variant='body2'>{row.curso_maestro}</Typography></Tooltip>
  },
]

export const COLUMNS_PLAN_FORMATIVO = [
  {
    flex: 0.1,
    Width: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Acciones',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Ver'>
          <IconButton size='small' component={Link} href={`/participante-por-evento/${row.id}`}>
            <Icon icon='mdi:eye-outline' fontSize={24} />
          </IconButton>
        </Tooltip>
        <RowOptions id={row.id} />
      </Box>
    )
  },
  {
    flex: 0.125,
    minWidth: 220,
    field: 'programa_evento',
    headerName: 'Programa (Evento de Capacitacion)',
    renderCell: ({ row }) => <Tooltip title={row.programa_evento}><Typography variant='body2'>{row.programa_evento}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 220,
    field: 'evento_apacitacion',
    headerName: 'Evento de Capacitacion',
    renderCell: ({ row }) => <Tooltip title={row.evento_apacitacion}><Typography variant='body2'>{row.evento_apacitacion}</Typography></Tooltip>
  },
]

export const COLUMNS_MIS_CURSOS = [
  {
    flex: 0.1,
    Width: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Acciones',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Ver'>
          <IconButton size='small' component={Link} href={`/participante-por-evento/${row.id}`}>
            <Icon icon='mdi:eye-outline' fontSize={24} />
          </IconButton>
        </Tooltip>
        <RowOptions id={row.id} />
      </Box>
    )
  },
  {
    flex: 0.125,
    minWidth: 220,
    field: 'evento_apacitacion',
    headerName: 'Evento de Capacitacion',
    renderCell: ({ row }) => <Tooltip title={row.evento_apacitacion}><Typography variant='body2'>{row.evento_apacitacion}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'razon_estado',
    headerName: 'Razón para el estado',
    renderCell: ({ row }) => <Tooltip title={row.razon_estado}><Typography variant='body2'>{row.razon_estado}</Typography></Tooltip>
  },
]

export const COLUMNS_MIS_LOGROS = [
  {
    flex: 0.1,
    Width: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Acciones',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Ver'>
          <IconButton size='small' component={Link} href={`/participante-por-evento/${row.id}`}>
            <Icon icon='mdi:eye-outline' fontSize={24} />
          </IconButton>
        </Tooltip>
        <RowOptions id={row.id} />
      </Box>
    )
  },
  {
    flex: 0.125,
    minWidth: 220,
    field: 'curso_maestro',
    headerName: 'Formación',
    renderCell: ({ row }) => <Tooltip title={row.curso_maestro}><Typography variant='body2'>{row.curso_maestro}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 220,
    field: 'new_institucion',
    headerName: 'Institución',
    renderCell: ({ row }) => <Tooltip title={row.new_institucion}><Typography variant='body2'>{row.new_institucion}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'fecha_inicio',
    headerName: 'Fecha Inicio',
    renderCell: ({ row }) => <Tooltip title={row.fecha_inicio}><Typography variant='body2'>{row.fecha_inicio}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'fecha_finalizacion',
    headerName: 'Fecha Fin',
    renderCell: ({ row }) => <Tooltip title={row.fecha_finalizacion}><Typography variant='body2'>{row.fecha_finalizacion}</Typography></Tooltip>
  },
]

export const COLUMNS_MODULOS_EVENTO =[
  {
    flex: 0.125,
    minWidth: 220,
    field: 'orden',
    headerName: 'Orden',
    renderCell: ({ row }) => <Tooltip title={row.orden}><Typography variant='body2'>{row.orden}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 220,
    field: 'dia_hora_inicio_modulo',
    headerName: 'Dia y Hora Inicio del Modulo',
    renderCell: ({ row }) => <Tooltip title={row.dia_hora_inicio_modulo}><Typography variant='body2'>{row.dia_hora_inicio_modulo}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'dia_hora_fin_modulo',
    headerName: 'Dia y Hora Fin del Modulo',
    renderCell: ({ row }) => <Tooltip title={row.dia_hora_fin_modulo}><Typography variant='body2'>{row.dia_hora_fin_modulo}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'encuentro',
    headerName: 'Encuentro',
    renderCell: ({ row }) => <Tooltip title={row.encuentro}><Typography variant='body2'>{row.encuentro}</Typography></Tooltip>
  },
  {
    flex: 0.125,
    minWidth: 200,
    field: 'espacio',
    headerName: 'Espacio',
    renderCell: ({ row }) => <Tooltip title={row.espacio}><Typography variant='body2'>{row.espacio}</Typography></Tooltip>
  },
]

// [msdyncrm_twig]
// {% set fetch %}
// <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
//   <entity name="new_participanteporeventodecapacitacion">
//     <attribute name="new_participanteporeventodecapacitacionid" />
//     <attribute name="new_name" />
//     <attribute name="createdon" />
//     <attribute name="new_eventodecapacitacion" />
//     <order attribute="new_name" descending="false" />
//     <filter type="and">
//       <condition attribute="statuscode" operator="in">
//         <value>100000003</value>
//       </condition>
//       <condition attribute="new_alcance" operator="eq" value="958770002" />
//     </filter>
//     <link-entity name="new_empleado" from="new_empleadoid" to="new_empleado" link-type="inner" alias="ao">
//     <filter type="and">
//       <condition attribute="new_usuarioportalrh" operator="eq" value="{{user.emailaddress1}}" />
//     </filter>
//   </link-entity>
//   <link-entity name="new_eventodecapacitacion" from="new_eventodecapacitacionid" to="new_eventodecapacitacion" link-type="outer" alias="ab">
//     <attribute name="new_modalidaddecurso" />  
//     <attribute name="new_fechafinalizacion" />  
//     <attribute name="new_fechainicio" />  
//     <attribute name="new_programa" />  
//     <attribute name="new_eventodecapacitacionid" />
//     <attribute name="new_ideventodeformacin"/>
//     <attribute name="new_institucion" />  
//     <attribute name="new_cursomaestro" />  
//   </link-entity>
//   <link-entity name="annotation" from="objectid" to="new_participanteporeventodecapacitacionid" link-type="outer" alias="ac">
//     <attribute name="annotationid" />
//     <attribute name="createdon" />
//     <attribute name="filename" />
//     <order attribute="createdon" descending="true" />
//   </link-entity>
//   </entity>
// </fetch>
// {% endset %}
// {% fetchxml collection="participantes" %}
// {{fetch}}
// {% endfetchxml %}
// <div class="modal" >
//   <table>
//     <thead>
//       <tr>
//         <th style="width: 30%;">Formación </br> (Programa - Curso)</th>
//         <th style="width: 15%;">Institución</th>
//         <th style="width: 20%;">Fecha Inicio</th>
//         <th style="width: 20%;">Fecha Fin</th>
//         <th style="width: 15%;">Descarga tu certificado</th>
//       </tr>
//     </thead>
//     <tbody>
//       {% set prevRegister = null %}
//       {% for participante in participantes.results.entities %}
//       {% if(participante.new_participanteporeventodecapacitacionid and prevRegister!=participante.ab.new_ideventodeformacin ) %}
//       {% set prevRegister = participante.ab.new_ideventodeformacin %}
//       <tr>
//         <td><p>{{ participante.ab.new_cursomaestro }}</p><p> - </p><p>{{ participante.ab.new_programa  }}</p> </td>
//         {% if( participante.ab.new_institucion) %} 
//         <td>{{ participante.ab.new_institucion }}</td>
//         {% else %}
//         <td style="text-align: center;"> - </td>
//         {% endif %}
//         <td>{{ participante.ab.new_fechainicio|date('d/m/Y') }}</td>
//         <td>{{ participante.ab.new_fechafinalizacion|date('d/m/Y') }}</td>
//         {% if(participante.ac.annotationid and participante.ac.filename matches '/\\.pdf$/i') %}
//         <td style="border: 0px!important;" ><a style="font-size: 40px;" href="{{attachmentUrl(participante.ac.annotationid)}}"><i class="fas fa-file-download"></i></a> </td>
//         {% else %}
//         <td style="text-align: center; border: 0px!important;"> - </td>
//         {% endif %}
//       </tr>
//       {% endif %}
//       {% endfor %}
//     </tbody>
//   </table>
// </div>
// <!-- {% set fetch %}
// <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
//   <entity name="new_solicituddenuevocurso">
//     <attribute name="new_solicituddenuevocursoid" />
//     <attribute name="new_name" />
//     <attribute name="createdon" />
//     <attribute name="new_institucion" />
//     <attribute name="new_fechadeinicio" />
//     <attribute name="new_fechadefin" />
//     <order attribute="new_name" descending="false" />
//     <filter type="and">
//       <condition attribute="statuscode" operator="eq" value="100000002" />
//     </filter>
//     <link-entity name="new_empleado" from="new_empleadoid" to="new_empleado" link-type="inner" alias="aa">
//       <filter type="and">
//         <condition attribute="new_usuarioportalrh" operator="eq" value="{{user.emailaddress1}}" />
//       </filter>
//     </link-entity>
// 	<link-entity name="annotation" from="objectid" to="new_solicituddenuevocursoid" link-type="outer" alias="ac">
//   <attribute name="annotationid" />
//   </link-entity>
//   </entity>
// </fetch>
// {% endset %}
// {% fetchxml collection="logros" %}
// {{fetch}}
// {% endfetchxml %}
// <div class="modal" >
//   <table>
//     <thead>
//       <tr>
//         <th style="display: none; width: 30%;">Formación </br> (Programa - Curso)</th>
//         <th style="display: none; width: 15%;">Institución</th>
//         <th style="display: none; width: 20%;">Fecha Inicio</th>
//         <th style="display: none; width: 20%;">Fecha Fin</th>
//         <th style="display: none; width: 15%;">Descarga tu certificado</th>
//       </tr>
//     </thead>
//     <tbody>
//       {% for logro in logros.results.entities %}
//       {% if(logro.new_solicituddenuevocursoid) %}
//         <tr>
//           <td style="text-align: center; width: 30%;">{{ logro.new_name }}</td>  
//           <td style="text-align: center; width: 15%;">{{ logro.new_institucion }}</td>  
//           <td style="text-align: center; width: 20%;">{{ logro.new_fechadeinicio|date('d/m/Y') }}</td>  
//           <td style="text-align: center; width: 20%;">{{ logro.new_fechadefin|date('d/m/Y') }}</td>  
//             {% if(logro.ac.annotationid) %} 
//         <td style="border: 0px!important;" ><a style="font-size: 40px;" href="{{attachmentUrl(logro.ac.annotationid)}}"><i class="fas fa-file-download"></i></a> </td>
//         {% else %}
//         <td style="text-align: center; border: 0px!important;"> - </td>
//         {% endif %}
//         </tr>
//       {% endif %}
//       {% endfor %}
//     </tbody>
//   </table>
// </div> -->
// [/msdyncrm_twig]