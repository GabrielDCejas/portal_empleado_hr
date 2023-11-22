import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import ModalCuentaBancaria from "@/pages/perfil/modales/ModalCuentaBancaria";
import { eliminarCuentaBancariaEmpleado, getCuentasBancariasPorEmpleado } from "@/redux/empleados";

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
    dispatch(eliminarCuentaBancariaEmpleado(token, objeto?.id))
      .then((id) => {
        dispatch(getCuentasBancariasPorEmpleado(token, user?.empleadoid));
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
      {open && <ModalCuentaBancaria open={open} data={objeto} handleClose={handleClose} ver="verDatos" />}
    </>
  );
};

export const COLUMNS_DATOS_BANCARIOS = [
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
    minWidth: 200,
    field: "banco",
    headerName: "Banco",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.banco}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "tipoDeCuenta",
    headerName: "Tipo de Cuenta",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.tipoDeCuenta}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "numeroDeCuenta",
    headerName: "Numero de Cuenta",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.numeroDeCuenta}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "cbu",
    headerName: "CBU",
    renderCell: (params) => (
      <Tooltip title={params.row.cbu}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.cbu}
        </Typography>
      </Tooltip>
    ),
  },
];
