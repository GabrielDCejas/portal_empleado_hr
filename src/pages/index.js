// ** React Imports
import { useContext, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import themeConfig from "@/configs/themeConfig";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";

// ** FullCalendar & App Components Imports
import Calendar from "./calendar/Calendar";
import CalendarWrapper from "@/@core/styles/libs/fullcalendar";
import { Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import useFetchCalendario from "@/hooks/useFetchCalendario";
import ModalVerEvento from "./calendar/ModalVerEvento";
import PageHeader from "@/@core/components/page-header";
import Instructivos from "@/@core/components/instructivos/Instructivos";
import Noticias from "@/@core/components/noticias/Noticias";

// ** CalendarColors
const calendarsColor = {
  Personal: "error",
  Business: "#09723d",
  Family: "warning",
  Holiday: "success",
  ETC: "info",
};

const AppCalendar = () => {
  const { token, user } = useContext(AuthContext);

  // ** States
  const [calendarApi, setCalendarApi] = useState(null);
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false);
  const [selectedEventTypes, setSelectedEventTypes] = useState(new Set(Object.keys(calendarsColor)));

  // ** Hooks
  const { settings } = useSettings();

  const { skin, direction } = settings;
  const mdAbove = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { licencias, loadingLicenciasCalendario } = useFetchCalendario(token);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event?._def?.publicId);
    setAddEventSidebarOpen(!addEventSidebarOpen);
  };

  const handleClose = () => {
    setAddEventSidebarOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mb: 4 }}>
        <Typography variant="h5" sx={{ color: "primary.main", fontWeight: 600 }}>
          Bienvenido al {themeConfig.templateName}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mt: 2 }}>
          ¡Hola, {user?.fullname}!
        </Typography>
      </Box>
      <Grid container spacing={6}>
        <Grid item xs={12} display="flex" alignItems="center">
          <PageHeader
            title={
              <Typography variant="h5">
                {loadingLicenciasCalendario ? "" : <LinearProgress color="inherit" />}
              </Typography>
            }
          />
        </Grid>
      </Grid>
      <CalendarWrapper
        className="app-calendar"
        sx={{
          boxShadow: skin === "bordered" ? 0 : 6,
          ...(skin === "bordered" && { border: (theme) => `1px solid ${theme.palette.divider}` }),
        }}
      >
        <Box
          sx={{
            p: 5,
            pb: 0,
            flexGrow: 1,
            maxWidth:{xs:"100%", md:"900px", xl:"1024px"},
            marginLeft:"auto",
            marginRight:"auto",
            borderRadius: 1,
            boxShadow: "none",
            backgroundColor: "background.paper",
            ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {}),
          }}
        >
          <Calendar
            selectedEventTypes={selectedEventTypes}
            events={licencias}
            direction={direction}
            calendarApi={calendarApi}
            calendarsColor={calendarsColor}
            setCalendarApi={setCalendarApi}
            onEventClick={handleEventClick}
          />
        </Box>
      </CalendarWrapper>
      <Box sx={{ my: 4, display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Noticias />
      </Box>
      <Box sx={{ my: 4 }}>
        <Instructivos />
      </Box>
      <ModalVerEvento
        data={licencias.find((item) => item.id == selectedEvent)}
        open={addEventSidebarOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default AppCalendar;
