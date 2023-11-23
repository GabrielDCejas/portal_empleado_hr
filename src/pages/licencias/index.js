import React, { useState } from "react";
// ** Next Import
import Link from "next/link";
// ** MUI Imports
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import MuiTabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Custom Components Imports
import Icon from "@/@core/components/icon";
import PageHeader from "src/@core/components/page-header";
import Table from "@/@core/components/table/Table";
import { COLUMNS_LICENCIAS, COLUMNS_VACACIONES_DISPONIBLES } from "@/columns/columnsLicencias";
import useGetLicencias from "@/hooks/useGetLicencias";
import { Box, CircularProgress } from "@mui/material";
import useGetVacacionesDisponibles from "@/hooks/useGetVacacionesDisponibles";
import ModalLicencia from "./ModalLicencia";
import useCargarLicencia from "@/hooks/useCargarLicencia";

const Licencias = () => {
  const [activeTab, setActiveTab] = useState("1");
  const hideText = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { licencias, loadingLicencias } = useGetLicencias();
  const { vacacionesDisponibles, loadingVacacionesDisponibles } = useGetVacacionesDisponibles();

  const cargarLicencia = useCargarLicencia();

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleCargar = (datos) => {
    cargarLicencia(datos, handleClose);
  };

  const TabList = styled(MuiTabList)(({ theme }) => ({
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: `${theme.palette.common.white} !important`,
    },
    "& .MuiTab-root": {
      minWidth: 65,
      minHeight: 38,
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.up("sm")]: {
        minWidth: 130,
      },
    },
  }));

  const handleChange = (event, value) => {
    setActiveTab(value);
  };

  return (
    <>
      <Grid container>
        <PageHeader
          title={
            <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
              Licencias
            </Typography>
          }
        />
        <TabContext value={activeTab}>
          <Grid container sx={{ mt: 2 }} justifyContent="center" alignItems="center">
            <Grid item xs={12} alignItems="center" justifyContent="center">
              <TabList
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleChange}
                aria-label="customized tabs example"
              >
                <Tab
                  value="1"
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                      <Icon fontSize={18} icon="carbon:license-draft" />
                      {!hideText && "Licencias Solicitadas"}
                    </Box>
                  }
                />
                <Tab
                  value="2"
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                      <Icon fontSize={18} icon="fluent-mdl2:vacation" />
                      {!hideText && "Vacaciones Disponibles"}
                    </Box>
                  }
                />
              </TabList>
            </Grid>
            <Grid item xs={12}>
              <TabPanel sx={{ p: 0 }} value="1">
                {loadingLicencias ? (
                  <Table
                    data={licencias}
                    columns={COLUMNS_LICENCIAS}
                    name={"Licencias"}
                    addRow={true}
                    toggle={openModal}
                  />
                ) : (
                  <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <CircularProgress sx={{ mb: 4 }} />
                  </Box>
                )}
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="2">
                {loadingVacacionesDisponibles ? (
                  <Table
                    data={vacacionesDisponibles}
                    columns={COLUMNS_VACACIONES_DISPONIBLES}
                    name={"Vacaciones disponibles"}
                  />
                ) : (
                  <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <CircularProgress sx={{ mb: 4 }} />
                  </Box>
                )}
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
      {open && <ModalLicencia open={open} data={null} handleClose={handleClose} onSubmit={handleCargar} />}
    </>
  );
};

export default Licencias;
