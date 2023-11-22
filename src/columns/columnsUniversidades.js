import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import CustomAvatar from "@/@core/components/mui/avatar";
// ** Utils Import
import { getInitials } from "@/@core/utils/get-initials";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
// ** Next Imports
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import { eliminarUniversidadEmpleado, getUniversidadEmpleado } from "@/redux/empleados";
import ModalUniversidad from "@/pages/perfil/modales/ModalUniversidad";

// ** renders client column
const renderClient = (params) => {
  const { row } = params;
  const stateNum = Math.floor(Math.random() * 6);
  const states = ["success", "error", "warning", "info", "primary", "secondary"];
  const color = states[stateNum];
  if (row?.avatar?.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: "1.875rem", height: "1.875rem" }} />;
  } else {
    return (
      <CustomAvatar skin="light" color={color} sx={{ mr: 3, fontSize: ".8rem", width: "1.875rem", height: "1.875rem" }}>
        {getInitials(row.empleado ? row.empleado : "John Doe")}
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

  const verUniversidad = () => {
    if (objeto && Object.keys(objeto).length > 0) {
      setOpen(!open);
    }
  };

  const deleteRow = () => {
    dispatch(eliminarUniversidadEmpleado(token, objeto?.id))
      .then((id) => {
        dispatch(getUniversidadEmpleado(token, user?.empleadoid));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handleRowOptionsClose();
  };

  return (
    <>
      <Tooltip title="Ver">
        <IconButton size="small" onClick={verUniversidad}>
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
      {open && (
        <ModalUniversidad
          open={open}
          data={objeto}
          handleClose={handleClose}
          ver="verDatos"
        />
      )}
    </>
  );
};

export const COLUMNS_UNIVERSIDADES = [
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
    field: "universidad",
    headerName: "Universidad",
    renderCell: (params) => (
      <Tooltip universidad={params.row.universidad}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.universidad}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 225,
    field: "empleado",
    headerName: "Empleado",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(params)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.empleado}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "carrera",
    headerName: "Carrera",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.carrera}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "estado",
    headerName: "Estado",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.estado}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "fechaEgreso",
    headerName: "Fecha Egreso",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaEgreso}
      </Typography>
    ),
  },
];
