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
import { COLUMNS_DATOS_BANCARIOS } from "@/columns/columnsDatosBancarios";
import useGetDatosBancarios from "@/hooks/useGetDatosBancarios";
import useCargarCuentaBancaria from "@/hooks/useCargarCuentaBancaria";
import ModalCuentaBancaria from "./modales/ModalCuentaBancaria";

const DatosBancarios = () => {
  const { cuentasBancarias, loadingCuentasBancarias } = useGetDatosBancarios();

  const cargarCuentaBancaria = useCargarCuentaBancaria()

  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleCargar = (datos) => {
    cargarCuentaBancaria(datos, handleClose)
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
              Datos Bancarios
            </LinkStyled>
          </Typography>
        }
      />
      <Grid item xs={12}>
        {loadingCuentasBancarias ? (
          <Table
            data={cuentasBancarias}
            columns={COLUMNS_DATOS_BANCARIOS}
            name={"Datos Bancarios"}
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
        <ModalCuentaBancaria open={open} data={null} handleClose={handleClose} onSubmit={handleCargar} />
      )}
  </>
  );
};
export default DatosBancarios;
