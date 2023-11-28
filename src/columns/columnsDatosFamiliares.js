import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import CustomChip from "@/@core/components/mui/chip";
import CustomAvatar from "@/@core/components/mui/avatar";
// ** Utils Import
import { getInitials } from "@/@core/utils/get-initials";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
// ** Next Imports
import Link from "next/link";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import ModalDatosFamiliares from "@/pages/perfil/modales/ModalDatosFamiliares";
import { eliminarFamiliarEmpleado, getFamiliaPorEmpleado } from "@/redux/empleados";

// ** renders client column
const renderClient = (params) => {
  const { row } = params;
  let usuario = row.nombre ? row.nombre : row.apellido;
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
    dispatch(eliminarFamiliarEmpleado(token, objeto?.id))
      .then((id) => {
        dispatch(getFamiliaPorEmpleado(token, user?.empleadoid));
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
          <Icon icon="mdi:trash-can-outline" fontSize={20} style={{ color: "#942020" }} />
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
      {open && <ModalDatosFamiliares open={open} data={objeto} handleClose={handleClose} ver="verDatos" />}
    </>
  );
};

export const COLUMNS_DATOS_FAMILIARES = [
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
    field: "nombre",
    headerName: "Nombre",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(params)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.nombre}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 225,
    field: "apellido",
    headerName: "Apellido",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(params)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.apellido}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "fechaNacimiento",
    headerName: "Fecha Nacimiento",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaNacimiento}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "tipoDocumento",
    headerName: "Tipo Documento",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.tipoDocumento}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "numeroDocumento",
    headerName: "Documento",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.numeroDocumento}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "parentesco",
    headerName: "Parentesco",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.parentesco}
      </Typography>
    ),
  },
];
