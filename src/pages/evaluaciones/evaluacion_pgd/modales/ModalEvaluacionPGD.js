import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FormProvider, useForm } from "react-hook-form";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Icon from "src/@core/components/icon";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import PageHeader from "@/@core/components/page-header";
import { styled } from "@mui/material/styles";
import MuiTabList from "@mui/lab/TabList";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LinearProgress } from "@mui/material";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import CustomDateField from "@/@core/components/customFields/CustomDateField";
import { AuthContext } from "@/context/AuthContext";
import General from "../General";
import DefinicionDeObjetivos from "../DefinicionDeObjetivos";
import GestionSeguimiento from "../GestionSeguimiento";
import EvaluacionFeedback from "../EvaluacionFeedback";

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

const ModalEvaluacionPGD = ({ open, handleClose, data }) => {
  const { user } = useContext(AuthContext);
  // ** Hooks
  const hideText = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState("general");

  const tabContentList = {
    general: <General data={data} />,
    definicionObjetivos: <DefinicionDeObjetivos data={data} />,
    gestionSeguimiento: <GestionSeguimiento data={data}/>,
    evaluacionFeedback: <EvaluacionFeedback data={data}/>
  };

  const handleChange = (event, value) => {
    setActiveTab(value);
  };

  if (open) {
    return (
      <Dialog fullScreen={true} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <AppBar sx={{ position: "relative" }}>
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DialogTitle id="responsive-dialog-title">{data?.nombre}</DialogTitle>
            <Tooltip title={<Typography sx={{ color: "#fff" }}>Cerrar</Typography>}>
              <IconButton edge="end" color="warning" onClick={handleClose} aria-label="close" sx={{ mr: 2 }}>
                <Icon color="red" icon="material-symbols:close" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container spacing={6}>
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
                            <Box
                              sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}
                            >
                              <Icon fontSize={20} icon="mdi:account-outline" />
                              {!hideText && "General"}
                            </Box>
                          }
                        />
                        <Tab
                          value="definicionObjetivos"
                          label={
                            <Box
                              sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}
                            >
                              <Icon fontSize={20} icon="fluent:target-edit-16-regular" />
                              {!hideText && "Definición De Objetivos"}
                            </Box>
                          }
                        />
                        <Tab
                          value="gestionSeguimiento"
                          label={
                            <Box
                              sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}
                            >
                              <Icon fontSize={20} icon="clarity:form-line" />
                              {!hideText && "Gestión y Seguimiento"}
                            </Box>
                          }
                        />
                        <Tab
                          value="evaluacionFeedback"
                          label={
                            <Box
                              sx={{ display: "flex", alignItems: "center", ...(!hideText && { "& svg": { mr: 2 } }) }}
                            >
                              <Icon fontSize={20} icon="fluent:person-feedback-16-regular" />
                              {!hideText && "Evaluación y Feedback"}
                            </Box>
                          }
                        />
                      </TabList>
                    </Grid>
                    <Grid item xs={12} sx={{ pt: (theme) => `${theme.spacing(4)} !important` }}>
                      <PageHeader
                        title={
                          <Typography variant="h5">
                            {Object.keys(data).length == 0 ? <LinearProgress color="inherit" /> : ""}
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
        </DialogContent>
      </Dialog>
    );
  } else {
    return null;
  }
};
export default ModalEvaluacionPGD;
