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
import useGetHorasCargadas from "@/hooks/useGetHorasCargadas";
import { COLUMNS_CARGA_HORAS } from "@/columns/columnsCargaHoras";
import ModalCargaHoraria from "./ModalCargaHoraria";
import useCargarHoras from "@/hooks/useCargarHoras";

const CargaHoraria = () => {
  const { cargasHorarias, loadingCargaHoraria } = useGetHorasCargadas();

  const cargarHoras = useCargarHoras();

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleCargar = (datos) => {
    cargarHoras(datos, handleClose);
  };

  return (
    <>
      <Grid container>
        <PageHeader
          title={
            <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
              Carga Horaria
            </Typography>
          }
        />
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={12}>
            {loadingCargaHoraria ? (
              <Table
                data={cargasHorarias}
                columns={COLUMNS_CARGA_HORAS}
                name={"Carga Horaria"}
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
      {open && <ModalCargaHoraria open={open} data={null} handleClose={handleClose} onSubmit={handleCargar} />}
    </>
  );
};

export default CargaHoraria;
