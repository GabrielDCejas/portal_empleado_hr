import React, { useState } from "react";
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
import { COLUMNS_INSUMOS } from "@/columns/columnsInsumos";
import useGetInsumosEmpleado from "@/hooks/useGetInsumosEmpleado";
import useCargarInsumo from "@/hooks/useCargarInsumo";
import ModalInsumo from "./modales/ModalInsumo";

const Insumos = () => {

  const { insumos, loadingInsumos } = useGetInsumosEmpleado();

  const cargarInsumo = useCargarInsumo()

  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleCargar = (datos) => {
    cargarInsumo(datos, handleClose)
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
              Insumos
            </LinkStyled>
          </Typography>
        }
      />
      <Grid item xs={12}>
        {loadingInsumos ? (
          <Table data={insumos} columns={COLUMNS_INSUMOS} name={"Insumos"} addRow={true} toggle={openModal} />
        ) : (
          <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
            <CircularProgress sx={{ mb: 4 }} />
          </Box>
        )}
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
    {open && (
          <ModalInsumo open={open} data={null} handleClose={handleClose} onSubmit={handleCargar} />
        )}
    </>
  );
};
export default Insumos;
