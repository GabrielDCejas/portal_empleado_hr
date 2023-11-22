import {  IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
// ** Next Imports
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import { eliminarTrayectoriaEmpleado, getTrayectoriaPorEmpleado } from "@/redux/empleados";
import ModalTrayectoria from "@/pages/perfil/modales/ModalTrayectoria";


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
    dispatch(eliminarTrayectoriaEmpleado(token, objeto?.id))
      .then((id) => {
        dispatch(getTrayectoriaPorEmpleado(token, user?.empleadoid));
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
      {open && <ModalTrayectoria open={open} data={objeto} handleClose={handleClose} ver="verDatos" />}
    </>
  );
};

export const COLUMNS_TRAYECTORIA = [
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
    minWidth: 250,
    field: "empresa",
    headerName: "Empresa",
    renderCell: (params) => (
      <Tooltip empresa={params.row.empresa}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.empresa}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "puesto",
    headerName: "Puesto",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.puesto}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 150,
    field: "fechaDesde",
    headerName: "Fecha Desde",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaDesde}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 100,
    field: "fechaHasta",
    headerName: "Fecha Hasta",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaHasta}
      </Typography>
    ),
  },
];
