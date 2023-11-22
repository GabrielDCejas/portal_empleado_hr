import { useState } from "react";
// ** Next Import
import Link from "next/link";
// ** MUI Imports
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import PageHeader from "src/@core/components/page-header";
import Table from "@/@core/components/table/Table";
import { Box, CircularProgress } from "@mui/material";
import useGetAsignaciones from "@/hooks/useGetAsignaciones";
import { COLUMNS_ASIGNACIONES } from "@/columns/columnsAsignaciones";
import ModalAsignaciones from "./ModalAsignaciones";
import useCargarAsignacion from "@/hooks/useCargarAsignacion";

const Asignaciones = () => {

  const { asignaciones, loadingAsignaciones } = useGetAsignaciones();

  const cargarAsignacion = useCargarAsignacion()

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleCargar = (datos) => {
    cargarAsignacion(datos, handleClose);
  };

  const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

  return (
    <>
      <Grid container>
        <PageHeader
          title={
            <Typography variant="h5">
              <LinkStyled href="https://mui.com/x/react-data-grid/" target="_blank">
                Asignaciones
              </LinkStyled>
            </Typography>
          }
        />
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={12}>
            {loadingAsignaciones ? (
              <Table
                data={asignaciones?.filter((item) => item.statuscode != 2)}
                columns={COLUMNS_ASIGNACIONES}
                name={"Asignaciones"}
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
      {open && <ModalAsignaciones open={open} data={null} handleClose={handleClose} onSubmit={handleCargar} />}
    </>
  );
};

export default Asignaciones;
