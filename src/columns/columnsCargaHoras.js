import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";

import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import ModalCargaHoraria from "@/pages/carga-horaria/ModalCargaHoraria";
import { eliminarCargaHoraria, getCargasHorarias } from "@/redux/cargaHoraria";

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
    dispatch(eliminarCargaHoraria(token, objeto?.id))
      .then((id) => {
        dispatch(getCargasHorarias(token, user?.empleadoid));
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
      {open && <ModalCargaHoraria open={open} data={objeto} handleClose={handleClose} ver="verDatos" />}
    </>
  );
};

export const COLUMNS_CARGA_HORAS = [
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
    field: "Descripción",
    headerName: "descripcion",
    renderCell: (params) => (
      <Tooltip title={params.row.descripcion}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.descripcion}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 150,
    field: "fechaDeCarga",
    headerName: "Fecha de Carga",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaDeCarga}
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
    minWidth: 200,
    field: "asignacion",
    headerName: "Asignación",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.asignacion}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "horas",
    headerName: "Horas",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.horas}
      </Typography>
    ),
  },
];
