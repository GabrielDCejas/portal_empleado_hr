import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";

import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import { eliminarCurso, getCursos } from "@/redux/cursos";
import ModalCurso from "@/pages/cursos/ModalCurso";


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
    dispatch(eliminarCurso(token, objeto?.id))
      .then((id) => {
        dispatch(getCursos(token));
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
      {objeto?.empleadoId == user?.empleadoid && (
        <Tooltip title="Eliminar">
          <IconButton size="small" onClick={handleRowOptionsClick}>
            <Icon icon="mdi:trash-can-outline" fontSize={20} style={{ color: "red" }} />
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
          <Icon icon="mingcute:alert-fill" fontSize={20} style={{ color: "red" }} />
          Desea eliminar este registro ?
        </MenuItem>
      </Menu>
      {open && <ModalCurso open={open} data={objeto} handleClose={handleClose} ver="verDatos" />}
    </>
  );
};

export const COLUMNS_CURSOS = [
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
    field: "elearning",
    headerName: "E-learning",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.elearning}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "externa",
    headerName: "Externa",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.externa}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "inCompany",
    headerName: "In Company",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.inCompany}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "interna",
    headerName: "Interna",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.interna}
      </Typography>
    ),
  },
];
