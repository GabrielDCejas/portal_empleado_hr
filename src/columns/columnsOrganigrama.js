import { Box, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import CustomAvatar from "@/@core/components/mui/avatar";

export const COLUMNS_ORGANIGRAMA = [
  {
    width: 125,
    field: "foto",
    renderCell: (params) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
          <CustomAvatar src={`${params?.row?.foto}`} sx={{ width: "2.5rem" }} />
        </Box>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "responsable",
    headerName: "Responsable",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.responsable}
      </Typography>
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
    minWidth: 175,
    field: "segmentoUnidad",
    headerName: "Segmento",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.segmentoUnidad}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 175,
    field: "unidadSuperior",
    headerName: "Unidad Superior",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.unidadSuperior}
      </Typography>
    ),
  },
];
