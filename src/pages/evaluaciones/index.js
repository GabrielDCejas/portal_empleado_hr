import React, { useState } from "react";
// ** Next Imimport
import Icon from "@/@core/components/icon";
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
import PageHeader from "src/@core/components/page-header";
import Table from "@/@core/components/table/Table";
import { Box, CircularProgress } from "@mui/material";
import useGetEvaluacionesPGD from "@/hooks/useGetEvaluacionesPGD";
import { COLUMNS_EVALUACION_PGD } from "@/columns/columnsEvaluacionPGD";
import useGetEvaluacionesPGDLider from "@/hooks/useGetEvaluacionesPGDLider";

const EvaluacionPGD = () => {
  const [activeTab, setActiveTab] = useState("1");
  const hideText = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { evaluacionPGD, loadingEvaluacionPGD } = useGetEvaluacionesPGD();
  const {evaluacionPGDLider, loadingEvaluacionPGDLider} = useGetEvaluacionesPGDLider()

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
    <Grid container>
      <PageHeader
        title={
          <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
            Evaluación de PGD
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
                    {!hideText && "Mi evaluacion de PGD"}
                  </Box>
                }
              />
              <Tab
                value="2"
                label={
                  <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                    <Icon fontSize={18} icon="carbon:license-draft" />
                    {!hideText && "Evaluacion PGD de mi equipo"}
                  </Box>
                }
              />
            </TabList>
          </Grid>
          <Grid item xs={12}>
            <TabPanel sx={{ p: 0 }} value="1">
              {loadingEvaluacionPGD ? (
                <Table data={evaluacionPGD} columns={COLUMNS_EVALUACION_PGD} name={"Evaluación de PGD"} />
              ) : (
                <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                  <CircularProgress sx={{ mb: 4 }} />
                </Box>
              )}
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="2">
              {loadingEvaluacionPGDLider ? (
                <Table data={evaluacionPGDLider} columns={COLUMNS_EVALUACION_PGD} name={"Evaluacion PGD de mi equipo"} />
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
  );
};

export default EvaluacionPGD;
