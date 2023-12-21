import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useContext, useState } from "react";
import CustomAvatar from "@/@core/components/mui/avatar";
// ** Next Imports
import { getInitials } from "@/@core/utils/get-initials";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import ModalItemsEvaluacion from "@/pages/evaluaciones/evaluacion_pgd/modales/ModalItemsEvaluacion";
import { eliminarItemsEvaluacion, getItemsEvaluacion } from "@/redux/evaluaciones";
import ValoracionItem from "@/pages/evaluaciones/evaluacion_pgd/ValoracionItem";

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
    dispatch(eliminarItemsEvaluacion(token, objeto?.id))
      .then((id) => {
        dispatch(getItemsEvaluacion(token, objeto?.evaluacion_pgd_id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handleRowOptionsClose();
  };

  console.log("objeto", objeto)

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
        <ModalItemsEvaluacion
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

export const COLUMNS_ITEMS_EVALUACION = [
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
    field: "competencia",
    headerName: "Competencia/Objetivo",
    renderCell: (params) => (
      <Tooltip title={params.row.competencia}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.competencia}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "valoracion_modal",
    headerName: "Valoración",
    renderCell: (params) => <ValoracionItem item={params.row} itemEvaluar="valoracion_modal"/>
  },
];

export const COLUMNS_ITEMS_EVALUACION_LIDER = [
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
    field: "competencia",
    headerName: "Competencia/Objetivo",
    renderCell: (params) => (
      <Tooltip title={params.row.competencia}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.competencia}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "valoracion_lider_modal",
    headerName: "Valoración Líder",
    renderCell: (params) => <ValoracionItem item={params.row} itemEvaluar="valoracion_lider_modal"/>
  }
];