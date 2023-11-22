import { Box, Link, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";

const Instructivos = () => {
  return (
    <>
      <Typography
        color="primary"
        sx={{
          marginBottom: (theme) => theme.spacing(2),
          marginTop: (theme) => theme.spacing(2),
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
      >
        Instructivos
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
        <Link
          href="/pdf/Guia_Para_Carga_Horaria_Legajo_y_Licencias.pdf"
          download
          underline="hover"
          sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", mb: 1 }}
        >
          <Icon icon="ic:outline-get-app" style={{ fontSize: 30 }} />
          <Typography variant="body1">Instructivo para la Carga Horaria</Typography>
        </Link>
        <Link
          href="/pdf/Instructivo_Portal_del_empleado.pdf"
          download
          underline="hover"
          sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", mb: 1 }}
        >
          <Icon icon="ic:outline-get-app" style={{ fontSize: 30 }} />
          <Typography variant="body1">Instructivo Portal del Empleado</Typography>
        </Link>
      </Box>
    </>
  );
};

export default Instructivos;
