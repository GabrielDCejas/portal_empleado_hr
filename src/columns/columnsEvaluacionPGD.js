import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
import CustomAvatar from "@/@core/components/mui/avatar";
// ** Next Imports
import { getInitials } from "@/@core/utils/get-initials";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import { eliminarAsignacion, getAsignaciones } from "@/redux/asignacion";
import ModalEvaluacionPGD from "@/pages/evaluaciones/evaluacion_pgd/modales/ModalEvaluacionPGD";

const renderClient = (params) => {
  const { row } = params;
  let usuario = row.evaluado || row.lider;
  const stateNum = Math.floor(Math.random() * 6);
  const states = ["success", "error", "warning", "info", "primary", "secondary"];
  const color = states[stateNum];
  if (row?.avatar?.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: "1.875rem", height: "1.875rem" }} />;
  } else {
    return (
      <CustomAvatar skin="light" color={color} sx={{ mr: 3, fontSize: ".8rem", width: "1.875rem", height: "1.875rem" }}>
        {getInitials(usuario ? usuario : "John Doe")}
      </CustomAvatar>
    );
  }
};

const RowOptions = (objeto) => {
  const dispatch = useDispatch();
  // ** State
  const [anchorEl, setAnchorEl] = useState(null);
  const { token, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const verTRayectoria = () => {
    if (objeto && Object.keys(objeto).length > 0) {
      setOpen(!open);
    }
  };

  const deleteRow = () => {
    dispatch(eliminarAsignacion(token, objeto?.id))
      .then((id) => {
        dispatch(getAsignaciones(token));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handleRowOptionsClose();
  };

  return (
    <>
      <Tooltip title="Ver">
        <IconButton size="small" onClick={verTRayectoria}>
          <Icon icon="mdi:eye-outline" fontSize={20} />
        </IconButton>
      </Tooltip>
        {/* <Tooltip title="Eliminar">
          <IconButton size="small" onClick={handleRowOptionsClick}>
            <Icon icon="mdi:trash-can-outline" fontSize={20} style={{ color: "#942020" }} />
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
          <Icon icon="mingcute:alert-fill" fontSize={20} style={{ color: "#942020" }} />
          Desea eliminar este registro ?
        </MenuItem>
      </Menu>
      {open && <ModalEvaluacionPGD open={open} data={objeto} handleClose={handleClose} />}
    </>
  );
};

export const COLUMNS_EVALUACION_PGD = [
  {
    flex: 0.1,
    minWidth: 150,
    field: "actions",
    headerName: "Acciones",
    renderCell: (params) => {
      const { row } = params;
      return RowOptions(row);
    },
  },
  {
    flex: 0.275,
    minWidth: 225,
    field: "fecha_creacion",
    headerName: "Fecha de Creación",
    renderCell: (params) => (
      <Tooltip title={params.row.fecha_creacion}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.fecha_creacion}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 225,
    field: "periodo_pgd",
    headerName: "Periodo de PGD",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.periodo_pgd}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "ciclo_pgd",
    headerName: "Grupo de Ciclo",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.ciclo_pgd}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "grupo_ciclo",
    headerName: "Grupo de Ciclo",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.grupo_ciclo}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "numero_legajo_evaluado",
    headerName: "Nro. Legajo (Evaluado)",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.numero_legajo_evaluado}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 225,
    field: "evaluado",
    headerName: "Evaluado",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(params)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.evaluado}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "posicion",
    headerName: "Posición",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.posicion}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 225,
    field: "area_de_personal",
    headerName: "Área de Personal",
    renderCell: (params) => (
      <Tooltip title={params.row.area_de_personal}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.area_de_personal}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 225,
    field: "gurpo_de_personal",
    headerName: "Grupo de Personal",
    renderCell: (params) => (
      <Tooltip title={params.row.gurpo_de_personal}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.gurpo_de_personal}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "unidad_organizativa",
    headerName: "Unidad Organizativa Directa",
    renderCell: (params) => (
      <Tooltip title={params.row.unidad_organizativa}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.unidad_organizativa}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "numero_legajo_lider",
    headerName: "Nro. Legajo (Líder)",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.numero_legajo_lider}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 225,
    field: "lider",
    headerName: "Líder",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(params)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.lider}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "instancia",
    headerName: "Instancia",
    renderCell: (params) => (
      <Tooltip title={params.row.instancia}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.instancia}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "estado_autoevaluacion",
    headerName: "Estado de la Autoevaluación",
    renderCell: (params) => (
      <Tooltip title={params.row.estado_autoevaluacion}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.estado_autoevaluacion}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "estado_evaluacion_liderTabla",
    headerName: "Estado de la Evaluación del Líder",
    renderCell: (params) => (
      <Tooltip title={params.row.estado_evaluacion_liderTabla}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.estado_evaluacion_liderTabla}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "estado_encuentro_feedbackTabla",
    headerName: "Estado del Encuentro de Feedback",
    renderCell: (params) => (
      <Tooltip title={params.row.estado_encuentro_feedbackTabla}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.estado_encuentrestado_encuentro_feedbackTablao_feedback}
        </Typography>
      </Tooltip>
    ),
  },
];
