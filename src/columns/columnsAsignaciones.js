import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
import CustomAvatar from "@/@core/components/mui/avatar";
// ** Next Imports
import { getInitials } from "@/@core/utils/get-initials";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import ModalAsignaciones from "@/pages/asignaciones/ModalAsignaciones";
import { eliminarAsignacion, getAsignaciones } from "@/redux/asignacion";

const renderClient = (params) => {
  const { row } = params;
  let usuario = row.empleadoName;
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
          <Icon icon="mdi:eye-outline" fontSize={22} />
        </IconButton>
      </Tooltip>
      {objeto?.empleadoId == user?.empleadoid && (
        <Tooltip title="Eliminar">
          <IconButton size="small" onClick={handleRowOptionsClick}>
            <Icon icon="mdi:trash-can-outline" fontSize={22} style={{ color: "#942020" }} />
          </IconButton>
        </Tooltip>
      )}
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
      {open && <ModalAsignaciones open={open} data={objeto} handleClose={handleClose} ver="verDatos" />}
    </>
  );
};

export const COLUMNS_ASIGNACIONES = [
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
    field: "Nombre",
    headerName: "nombre",
    renderCell: (params) => (
      <Tooltip title={params.row.nombre}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.nombre}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "cliente",
    headerName: "Cliente",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.cliente}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "proyecto",
    headerName: "Proyecto",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.proyecto}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "fechaCreacion",
    headerName: "Fecha de Creación",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaCreacion}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "periodo",
    headerName: "Periodo",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.periodo}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "cantidadHoras",
    headerName: "Cantidad de Horas",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.cantidadHoras}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "cantidadHorasDevengadas",
    headerName: "Cantidad de Horas Devengadas",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.cantidadHorasDevengadas}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 225,
    field: "empleadoName",
    headerName: "Empleado",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(params)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.empleadoName}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "estado",
    headerName: "Estado",
    renderCell: (params) => (
      <Tooltip title={params.row.estado}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.estado}
        </Typography>
      </Tooltip>
    ),
  },
];
