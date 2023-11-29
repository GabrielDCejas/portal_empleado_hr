import { useState } from "react";
// ** Next Import

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import Table from "@/@core/components/table/Table";
import { Box, CircularProgress } from "@mui/material";
import useGetRequerimientoPersonal from "@/hooks/useGetRequerimientoPersonal";
import { COLUMNS_REQUERIMIENTO_PERSONAL } from "@/columns/columnsRequerimientoPersonal";
import useCargarRequerimiento from "@/hooks/useCargarRequerimiento";
import ModalRequerimientoPersonal from "./Modales/ModalRequerimientoPersonal";

const RequerimientoPersonal = () => {
  const { requerimientoPersonal, loadingRequerimientoPersonal } = useGetRequerimientoPersonal();

  const cargarRequerimiento = useCargarRequerimiento()

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleCargar = (datos) => {
    cargarRequerimiento(datos, handleClose);
  };

  return (
    <>
    <Grid container>
      <PageHeader
        title={
          <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
            Requerimiento de Personal
          </Typography>
        }
      />
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          {loadingRequerimientoPersonal ? (
            <Table
              data={requerimientoPersonal}
              columns={COLUMNS_REQUERIMIENTO_PERSONAL}
              name={"Requerimiento de Personal"}
              addRow={true}
              toggle={openModal}
            />
          ) : (
            <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
              <CircularProgress sx={{ mb: 4 }} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
    {open &&<ModalRequerimientoPersonal open={open} data={null} handleClose={handleClose} onSubmit={handleCargar}/>}
    </>
  );
};

export default RequerimientoPersonal;
