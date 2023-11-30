import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
import CustomAvatar from "@/@core/components/mui/avatar";
// ** Next Imports
import { getInitials } from "@/@core/utils/get-initials";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import {eliminarMetasPrioritarias, getMetasPrioritarias } from "@/redux/evaluaciones";
import ModalMetasPrioritarias from "@/pages/evaluaciones/evaluacion_pgd/modales/ModalMetasPrioritarias";

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
    dispatch(eliminarMetasPrioritarias(token, objeto?.id))
      .then((id) => {
        dispatch(getMetasPrioritarias(token, objeto?.evaluacion_pgd_id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handleRowOptionsClose();
  };

  return (
    <>
      {objeto?.lider_id == user?.empleadoid && (
        <>
          <Tooltip title="Ver">
            <IconButton size="small" onClick={verTRayectoria}>
              <Icon icon="mdi:eye-outline" fontSize={22} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton size="small" onClick={handleRowOptionsClick}>
              <Icon icon="mdi:trash-can-outline" fontSize={22} style={{ color: "#942020" }} />
            </IconButton>
          </Tooltip>
        </>
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
          <Icon icon="mingcute:alert-fill" fontSize={20} style={{ color: "red" }} />
          Desea eliminar este registro ?
        </MenuItem>
      </Menu>
      {open && (
        <ModalMetasPrioritarias
          open={open}
          data={objeto}
          handleClose={handleClose}
          evaluacionPgdId={objeto?.evaluacion_pgd_id}
          liderId={objeto?.lider_id}
          ver="verDatos"
        />
      )}
    </>
  );
};

export const COLUMNS_METAS_PRIORITARIAS = [
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
    field: "nombre",
    headerName: "Meta prioritaria ¿Qué busco lograr?",
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
    minWidth: 175,
    field: "accion",
    headerName: "Acción",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.accion}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "evidencia",
    headerName: "Evidencia",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.evidencia}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "fecha_desde",
    headerName: "Fecha Desde",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fecha_desde}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "fecha_hasta",
    headerName: "Fecha Hasta",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fecha_hasta}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "razon_estado",
    headerName: "Razón para el estado",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.razon_estado}
      </Typography>
    ),
  },
];
