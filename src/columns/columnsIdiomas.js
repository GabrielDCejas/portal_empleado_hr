import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import CustomChip from "@/@core/components/mui/chip";
import CustomAvatar from "@/@core/components/mui/avatar";
// ** Utils Import
import { getInitials } from "@/@core/utils/get-initials";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
// ** Next Imports
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import ModalIdioma from "@/pages/perfil/modales/ModalIdioma";
import { eliminarIdiomaEmpleado, getIdiomaEmpleado } from "@/redux/empleados";

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

  const verIdioma = () => {
    if (objeto && Object.keys(objeto).length > 0) {
      setOpen(!open);
    }
  };

  const deleteRow = () => {
    dispatch(eliminarIdiomaEmpleado(token, objeto?.id))
      .then((id) => {
        dispatch(getIdiomaEmpleado(token, user?.empleadoid));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handleRowOptionsClose();
  };

  return (
    <>
      <Tooltip title="Ver">
        <IconButton size="small" onClick={verIdioma}>
          <Icon icon="mdi:eye-outline" fontSize={22} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar">
        <IconButton size="small" onClick={handleRowOptionsClick}>
          <Icon icon="mdi:trash-can-outline" fontSize={22} style={{ color: "#942020" }} />
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
        <ModalIdioma
          open={open}
          data={objeto}
          handleClose={handleClose}
          ver="verDatos"
        />
      )}
    </>
  );
};

export const COLUMNS_IDIOMAS = [
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
    field: "idioma",
    headerName: "Idioma",
    renderCell: (params) => (
      <Tooltip idioma={params.row.idioma}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.idioma}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 100,
    field: "habla",
    headerName: "Habla",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.habla}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 100,
    field: "lee",
    headerName: "Lee",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.lee}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 100,
    field: "escribe",
    headerName: "Escribe",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.escribe}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 100,
    field: "nivel",
    headerName: "Nivel",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.nivel}
      </Typography>
    ),
  },
];
