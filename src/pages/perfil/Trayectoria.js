import { useState } from "react";
// ** Next Import
import Link from "next/link";
// ** MUI Imports
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import Table from "@/@core/components/table/Table";
import { COLUMNS_TRAYECTORIA } from "@/columns/columnsTrayectoria";
import { Box, CircularProgress } from "@mui/material";
import useGetTrayectoria from "@/hooks/useGetTrayectoria";
import ModalTrayectoria from "./modales/ModalTrayectoria";
import useCargarTrayectoria from "@/hooks/useCargarTrayectoria";

const Trayectoria = () => {
  const { trayectoria, loadingTrayectoria } = useGetTrayectoria();

  const cargarTrayectoria = useCargarTrayectoria();

  const [open, setOpen] = useState(false);

  const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

  const openModal = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleCargar = (datos) => {
    cargarTrayectoria(datos, handleClose);
  };

  return (
    <>
      <Grid container spacing={6}>
        <PageHeader
          title={
            <Typography variant="h5">
              <LinkStyled href="https://mui.com/x/react-data-grid/" target="_blank">
                Trayectoria
              </LinkStyled>
            </Typography>
          }
        />
        <Grid item xs={12}>
          {loadingTrayectoria ? (
            <Table
              data={trayectoria}
              columns={COLUMNS_TRAYECTORIA}
              name={"Trayectoria"}
              addRow={true}
              toggle={openModal}
            />
          ) : (
            <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
              <CircularProgress sx={{ mb: 4 }} />
            </Box>
          )}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      {open && <ModalTrayectoria open={open} data={null} handleClose={handleClose} onSubmit={handleCargar} />}
    </>
  );
};
export default Trayectoria;
