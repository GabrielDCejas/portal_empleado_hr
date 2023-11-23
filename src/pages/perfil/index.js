import { useRouter } from "next/router";
// ** React Imports
import { useState, useEffect } from "react";
// ** MUI Components
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiTabList from "@mui/lab/TabList";
import CircularProgress from "@mui/material/CircularProgress";

import Icon from "@/@core/components/icon";
import PerfilHeader from "./PerfilHeader";
import PerfilInfo from "./PerfilInfo";
import useGetEmpleado from "@/hooks/useGetEmpleado";
import Educacion from "./Educacion";
import PageHeader from "@/@core/components/page-header";
import { LinearProgress } from "@mui/material";
import useGetPaises from "@/hooks/useGetPaises";
import useGetProvincias from "@/hooks/useGetProvincias";
import Trayectoria from "./Trayectoria";
import DatosFamiliares from "./DatosFamiliares";
import Insumos from "./Insumos";
import DatosBancarios from "./DatosBancarios";
import RecibosSueldo from "./RecibosSueldo";
import useGetLocalidades from "@/hooks/useGetLocalidades";

const TabList = styled(MuiTabList)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-root": {
    minWidth: 60,
    minHeight: 30,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("sm")]: {
      minWidth: 120,
    },
  },
}));

const Perfil = () => {
  // ** State
  const [activeTab, setActiveTab] = useState("general");

  // ** Hooks
  const hideText = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { empleado, loadingResultadoEmpleado } = useGetEmpleado();
  const { paises } = useGetPaises();
  const { provincias } = useGetProvincias();
  const {localidades} = useGetLocalidades();

  const tabContentList = {
    general: <PerfilInfo data={empleado} paises={paises} provincias={provincias} localidades={localidades}/>,
    educacion: <Educacion data={empleado} />,
    trayectoria: <Trayectoria />,
    datosFamiliares: <DatosFamiliares />,
    insumos: <Insumos />,
    datosBancarios: <DatosBancarios />,
    recibosSueldo: <RecibosSueldo />,
  };

  const handleChange = (event, value) => {
    setActiveTab(value);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PerfilHeader empleado={empleado} />
      </Grid>
      {activeTab === undefined ? null : (
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TabList
                  variant="scrollable"
                  scrollButtons="auto"
                  onChange={handleChange}
                  aria-label="customized tabs example"
                >
                  <Tab
                    value="general"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                        <Icon fontSize={20} icon="mdi:account-outline" />
                        {!hideText && "Datos Generales"}
                      </Box>
                    }
                  />
                  <Tab
                    value="educacion"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                        <Icon fontSize={20} icon="mdi:education-outline" />
                        {!hideText && "Educacion"}
                      </Box>
                    }
                  />
                  <Tab
                    value="trayectoria"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                        <Icon fontSize={20} icon="clarity:form-line" />
                        {!hideText && "Trayectoria"}
                      </Box>
                    }
                  />
                  <Tab
                    value="datosFamiliares"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                        <Icon fontSize={20} icon="icon-park-outline:family" />
                        {!hideText && "Datos Familiares"}
                      </Box>
                    }
                  />
                  <Tab
                    value="insumos"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                        <Icon fontSize={20} icon="la:elementor" />
                        {!hideText && "Insumos"}
                      </Box>
                    }
                  />
                  <Tab
                    value="datosBancarios"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                        <Icon fontSize={20} icon="bi:bank" />
                        {!hideText && "Datos Bancarios"}
                      </Box>
                    }
                  />
                  <Tab
                    value="recibosSueldo"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                        <Icon fontSize={20} icon="mdi:form-outline" />
                        {!hideText && "Recibos de sueldo"}
                      </Box>
                    }
                  />
                </TabList>
              </Grid>
              <Grid item xs={12} sx={{ pt: (theme) => `${theme.spacing(4)} !important` }}>
                <PageHeader
                  title={
                    <Typography variant="h5">
                      {!loadingResultadoEmpleado ? <LinearProgress color="inherit" /> : ""}
                    </Typography>
                  }
                />
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab]}
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  );
};

export default Perfil;
