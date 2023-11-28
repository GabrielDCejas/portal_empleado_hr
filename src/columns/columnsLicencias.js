import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
import CustomAvatar from "@/@core/components/mui/avatar";
// ** Next Imports
import Link from "next/link";
import CustomChip from "@/@core/components/mui/chip";
import { getInitials } from "@/@core/utils/get-initials";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import ModalLicencia from "@/pages/licencias/ModalLicencia";
import { eliminarLicencias, getLicencias } from "@/redux/licencias";

const statusObj = [
  { title: "Aprobada", color: "success" },
  { title: "Rechazada", color: "error" },
  { title: "Solicitada", color: "warning" },
  { title: "Vigente", color: "info" },
  { title: "Cancelada", color: "error" },
  { title: "Gozada", color: "success" },
];

const renderClient = (params) => {
    const { row } = params;
    let empleado = row.empleado
    const stateNum = Math.floor(Math.random() * 6);
    const states = ["success", "error", "warning", "info", "primary", "secondary"];
    const color = states[stateNum];
    if (row?.avatar?.length) {
      return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: "1.875rem", height: "1.875rem" }} />;
    } else {
      return (
        <CustomAvatar skin="light" color={color} sx={{ mr: 3, fontSize: ".8rem", width: "1.875rem", height: "1.875rem" }}>
          {getInitials(empleado ? empleado : "John Doe")}
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
      dispatch(eliminarLicencias(token, objeto?.id))
        .then((id) => {
          dispatch(getLicencias(token, user?.empleadoid));
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
        {open && <ModalLicencia open={open} data={objeto} handleClose={handleClose} ver="verDatos" />}
      </>
    );
  };

export const COLUMNS_LICENCIAS = [
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
    field: "Comentarios",
    headerName: "comentarios",
    renderCell: (params) => (
      <Tooltip title={params.row.comentarios}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.comentarios}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "tipoLicencia",
    headerName: "Tipo de Licencia",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.tipoLicencia}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "diasSolicitados",
    headerName: "Dias Solicitados",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.diasSolicitados}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "fechaDesde",
    headerName: "Fecha desde",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaDesde}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "fechaHasta",
    headerName: "Fecha hasta",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.fechaHasta}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "cantidadDeHoras",
    headerName: "Cantidad de Horas",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.cantidadDeHoras}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "estado",
    headerName: "Estado",
    renderCell: (params) => {
      const status = statusObj.find((status) => status.title === params.row.estado);
      return (
        <CustomChip
          size="small"
          skin="light"
          color={status?.color}
          label={status?.title}
          sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
        />
      );
    },
  },
];

export const COLUMNS_VACACIONES_DISPONIBLES = [
  {
    flex: 0.275,
    minWidth: 175,
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
    minWidth: 175,
    field: "tipoLicencia",
    headerName: "Fecha Hasta",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.tipoLicencia}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "diasVacacionesCorrespondientes",
    headerName: "Dias de vacaciones correspondientes",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.diasVacacionesCorrespondientes}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "diasVacacionesAdicionales",
    headerName: "Dias de vacaciones pendientes",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.diasVacacionesAdicionales}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "diasVacacionesPendientesPeriodoAnterior",
    headerName: "Dias de vacaciones pendientes del periodo anterior",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.diasVacacionesPendientesPeriodoAnterior}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "vacacionesLiquidadas",
    headerName: "Vacaciones liquidadas",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.vacacionesLiquidadas}
      </Typography>
    ),
  },
];
