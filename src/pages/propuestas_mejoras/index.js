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
import { COLUMNS_PROPUESTAS_MEJORAS } from "@/columns/columnsPropuestasMejoras";
import useGetPropuestasMejoras from "@/hooks/useGetPropuestasMejoras";
import ModalPropuestasMejoras from "./ModalPropuestasMejoras";
import useCargaPropuestaMejora from "@/hooks/useCargaPropuestaMejora";

const PropuestasMejoras = () => {
  const { propuestasMejoras, loadingPropuestasMejoras } = useGetPropuestasMejoras();

  const cargarPropuestasMejoras = useCargaPropuestaMejora()

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleCargar = (datos) => {
    cargarPropuestasMejoras(datos, handleClose);
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
                Propuestas y Mejoras
              </LinkStyled>
            </Typography>
          }
          subtitle={
            <Typography variant="body2" sx={{ my: 2 }}>
              ¡Tu opinión es importante para nosotros! En Humanware Applications, creemos en la mejora continua y en el
              poder de las ideas. Esta página está diseñada para que puedas compartir tus propuestas y sugerencias para
              hacer que nuestra empresa sea aún mejor. Nos encantaría escuchar tus ideas y trabajar juntos para
              implementar mejoras significativas.
            </Typography>
          }
        />
        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={12}>
            {loadingPropuestasMejoras ? (
              <Table
                data={propuestasMejoras}
                columns={COLUMNS_PROPUESTAS_MEJORAS}
                name={"Propuestas y Mejoras"}
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
      {open && <ModalPropuestasMejoras open={open} data={null} handleClose={handleClose} onSubmit={handleCargar} />}
    </>
  );
};

export default PropuestasMejoras;
