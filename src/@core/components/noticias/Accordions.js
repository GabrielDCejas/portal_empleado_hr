import { Box, Paper, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Icon from "src/@core/components/icon";
import { useState } from "react";

const Accordions = ({ titulo, fecha, noticia, acordeon, key }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Paper key={key} sx={{ mt: "1rem", width: {xs: "350px", sm:"600px", md:"1000px"} }} elevation={3}>
      <Accordion expanded={expanded === acordeon} onChange={handleChange(acordeon)}>
        <AccordionSummary
          expandIcon={<Icon icon="flat-color-icons:expand" style={{ fontSize: 30 }} />}
          aria-controls={`${acordeon}-content`}
          id={`${acordeon}-header`}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mx: 1,
            }}
          >
            <Typography>Titulo: {titulo}</Typography>
            <Typography sx={{ color: "inherit" }}>Fecha: {fecha}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{noticia}</Typography>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default Accordions;
