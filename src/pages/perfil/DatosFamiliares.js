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
import { Box, CircularProgress } from "@mui/material";
import useGetDatosFamiliares from "@/hooks/useGetDatosFamiliares";
import { COLUMNS_DATOS_FAMILIARES } from "@/columns/columnsDatosFamiliares";
import useCargarDatosFamiliares from "@/hooks/useCargarDatosFamiliares";
import ModalDatosFamiliares from "./modales/ModalDatosFamiliares";

const DatosFamiliares = () => {

  const { familiares, loadingFamiliares } = useGetDatosFamiliares();
  const cargarDatosFamiliares = useCargarDatosFamiliares()

  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleCargar = (datos) => {
    cargarDatosFamiliares(datos, handleClose)
  }

  const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

  return (
    <>
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant="h5">
            <LinkStyled href="https://mui.com/x/react-data-grid/" target="_blank">
              Datos Familiares
            </LinkStyled>
          </Typography>
        }
      />
      <Grid item xs={12}>
        {loadingFamiliares ? (
          <Table
            data={familiares}
            columns={COLUMNS_DATOS_FAMILIARES}
            name={"Datos Familiares"}
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
    {open && (
          <ModalDatosFamiliares open={open} data={null} handleClose={handleClose} onSubmit={handleCargar} />
        )}
    </>
  );
};
export default DatosFamiliares;
