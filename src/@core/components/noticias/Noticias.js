import React from "react";
// ** MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import { Box, CircularProgress } from "@mui/material";
import useGetNoticias from "@/hooks/useGetNoticias";
import Accordions from "./Accordions";

const Noticias = () => {
  const { noticias, loadingNoticias } = useGetNoticias();

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        color="primary"
        sx={{
          fontSize: { xs: "1.25rem", md: "1.5rem" },
          mt: 1,
          mb: "1rem",
        }}
      >
        Noticias
      </Typography>
      {!loadingNoticias ? (
        <CircularProgress sx={{ mb: 4 }} />
      ) : noticias?.length === 0 ? (
        <Typography variant="body2">No hay noticias para mostrar</Typography>
      ) : (
        <Grid item xs={12}>
          {noticias?.map((items) => (
            <Accordions
              key={items.id}
              acordeon={items.id}
              titulo={items.nombre}
              fecha={items.fecha}
              noticia={items.descripcion}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
};
export default Noticias;
