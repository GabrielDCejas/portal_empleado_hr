import { useState } from "react";
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
import { Box, CircularProgress } from "@mui/material";
import useGetOrganigrama from "@/hooks/useGetOrganigrama";
import { COLUMNS_ORGANIGRAMA } from "@/columns/columnsOrganigrama";
import OrganigramaArbol from "./OrganigramaArbol";

const Tablas = () => {
  const [activeTab, setActiveTab] = useState("1");
  const hideText = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { organigrama, loadingOrganigrama } = useGetOrganigrama();

  const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

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
          <Typography variant="h5">
            <LinkStyled href="https://mui.com/x/react-data-grid/" target="_blank">
              Organigrama
            </LinkStyled>
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
                    <Icon fontSize={18} icon="uiw:table" />
                    {!hideText && "Tipo tabla"}
                  </Box>
                }
              />
              <Tab
                value="2"
                label={
                  <Box sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}>
                    <Icon fontSize={18} icon="bi:diagram-3" />
                    {!hideText && "Tipo Arbol"}
                  </Box>
                }
              />
            </TabList>
          </Grid>
          <Grid item xs={12}>
            <TabPanel sx={{ p: 0 }} value="1">
              {loadingOrganigrama ? (
                <Table data={organigrama} columns={COLUMNS_ORGANIGRAMA} name={"Organigrama"} />
              ) : (
                <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                  <CircularProgress sx={{ mb: 4 }} />
                </Box>
              )}
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="2">
              <OrganigramaArbol organigrama={organigrama}/>
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </Grid>
  );
};

export default Tablas;
