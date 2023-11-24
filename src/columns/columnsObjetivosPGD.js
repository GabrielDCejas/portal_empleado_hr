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
import ModalEvaluacionPGD from "@/pages/evaluaciones/modales/ModalEvaluacionPGD";

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
        <Tooltip title="Eliminar">
          <IconButton size="small" onClick={handleRowOptionsClick}>
            <Icon icon="mdi:trash-can-outline" fontSize={20} style={{ color: "red" }} />
          </IconButton>
        </Tooltip>
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
      {open && <ModalEvaluacionPGD open={open} data={objeto} handleClose={handleClose} />}
    </>
  );
};

export const COLUMNS_OBJETIVOS_PGD = [
//   {
//     flex: 0.1,
//     minWidth: 150,
//     field: "actions",
//     headerName: "Acciones",
//     renderCell: (params) => {
//       const { row } = params;
//       return RowOptions(row);
//     },
//   },
  {
    flex: 0.275,
    minWidth: 250,
    field: "objetivo",
    headerName: "Objetivo",
    renderCell: (params) => (
      <Tooltip title={params.row.objetivo}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.objetivo}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "fecha_creacion",
    headerName: "Fecha de creación",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fecha_creacion}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "fecha_cumplimiento",
    headerName: "Fecha de cumplimiento",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fecha_cumplimiento}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "ponderacion_lider",
    headerName: "Ponderacion Líder",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.ponderacion_lider}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "indicador",
    headerName: "Indicador",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.indicador}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "status",
    headerName: "Status",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.status}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 174,
    field: "porcentaje_avance",
    headerName: "% de Avance",
    renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.porcentaje_avance}
        </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "estado_objetivo",
    headerName: "Estado del Objetivo",
    renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.estado_objetivo}
        </Typography>
    ),
  },
];
