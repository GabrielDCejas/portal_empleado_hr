import { Tooltip, Typography } from "@mui/material";


export const COLUMNS_CAPACITACIONES = [
  {
    flex: 0.275,
    minWidth: 250,
    field: "evento",
    headerName: "Evento de Capacitación",
    renderCell: (params) => (
      <Tooltip title={params.row.evento}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.evento}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "nombre_curso",
    headerName: "Curso",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.nombre_curso}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "tipoCapacitacion",
    headerName: "Tipo de Capacitacion",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.tipoCapacitacion}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "fechaInicio",
    headerName: "Fecha de Inicio",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaInicio}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "fechaFinalizacion",
    headerName: "Fecha de Finalización",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaFinalizacion}
      </Typography>
    ),
  },
];
