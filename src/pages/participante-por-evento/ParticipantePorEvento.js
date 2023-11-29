import { useContext, useEffect, useState } from "react";
// ** MUI Imports
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TabContext from "@mui/lab/TabContext";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import Table from "@/@core/components/table/Table";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import Icon from 'src/@core/components/icon'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { participarEnEvento, fetchCertificadosEventos, limpiarCertificados } from "@/redux/eventos"
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import DescargarNota from "@/@core/components/download-File/DescargarNota";

const razonEstadoOpciones = [
  { value: 1, label: "Postulado" },
  { value: 100000000, label: "Inscripto" },
  { value: 100000001, label: "Cursando" },
  { value: 100000002, label: "No Aprobado" },
  { value: 100000003, label: "Aprobado" },
  { value: 100000004, label: "No Admitido" },
  { value: 100000005, label: "Pre-Inscripto" },
  { value: 100000006, label: "Rechazado por el Colaborador" },
  { value: 100000008, label: "Finalizado" },
  { value: 100000009, label: "Desenrolado" },
];

const asistenciaOpciones = [
  { value: 100000000, label: "Sí" },
  { value: 100000001, label: "No" },
];

const opcionesAlcance = [
  { value: 958770000, label: "Canal CAU" },
  { value: 958770001, label: "Docente" },
  { value: 958770002, label: "Codocente" },
];

const validacionSchema = yup.object().shape({
  evento_apacitacion: yup.object({
    value: yup.string().required(),
  }),
  empleado: yup.object({
    value: yup.string().required(),
  }),
  propietario: yup.object({
    value: yup.string().required(),
  }),
  alcance: yup.object({
    value: yup.string().required(),
  }),
});

const ParticipantePorEvento = ({ data, paramID, eventoCapacitacion, empleados, propietarios, planesFormacion }) => {
  const [valueTab, setValueTab] = useState("1");
  const [certificados, setCertificados] = useState([])
  const [loadingPostulacion, setLoadingPostulacion] = useState(false)
  const dispatch = useDispatch()
  const authContext = useContext(AuthContext);
  const certificadosSelector = useSelector((store) => store.eventos.certificados);
  const resultadoInscripcionSelector = useSelector((store) => store.eventos.resultadoInscripcion)
  // Accede al token desde el contexto
  const { token, user } = authContext;
  const { handleSubmit, setValue, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      evento_apacitacion: null,
      empleado: null,
      razon_estado: null,
      score: null,
      asistencia: null,
      propietario: null,
      plan_capacitacion: null,
      alcance: null,
      aplica: null,
      id_inscripcion_canvas: null,
    },
    resolver: yupResolver(validacionSchema),
  });

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
      if (data?.razon_estado?.value === 100000003) { //APROBADO - BUSCARMOS CERTIFICADO
        dispatch(fetchCertificadosEventos(token, paramID))
      } else {
        dispatch(limpiarCertificados())
      }
    }
  }, [data, setValue]);

  useEffect(() => {
    // if (certificadosSelector?.length > 0) {
      setCertificados(certificadosSelector)
    // }
  }, [certificadosSelector]);

  useEffect(() => {
    if (resultadoInscripcionSelector === "EXITO" || resultadoInscripcionSelector === "ERROR"){
      setLoadingPostulacion(false)
    }
  }, [resultadoInscripcionSelector]);

  const handleTabsChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const nuevo = () => {
    setLoadingPostulacion(true)
    dispatch(participarEnEvento(paramID, token));
  };

  return (
    <Card>
      <TabContext value={valueTab}>
        <TabList
          variant="scrollable"
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab value="1" label="General" />
          {
            data?.razon_estado?.value === 100000003 ?
              <Tab value="2" label="Certificado" /> : null
          }
        </TabList>
        <CardContent>
          <TabPanel value="1">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <CustomSearchSelect
                      options={eventoCapacitacion}
                      type="text"
                      name="evento_apacitacion"
                      lab="Evento de Capacitacion"
                      req="true"
                      helperText="Evento de Capacitacion requerido"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSearchSelect
                      options={empleados}
                      type="text"
                      name="empleado"
                      lab="Empleado"
                      req="true"
                      helperText="El empleado requerido"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSearchSelect
                      options={razonEstadoOpciones}
                      type="text"
                      name="razon_estado"
                      lab="Razón para el estado"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField Component={TextField} type="text" label="Score" name="score" readOnly={true} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSearchSelect options={asistenciaOpciones} type="text" name="asistencia" lab="Asistencia" readOnly={true} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSearchSelect
                      options={propietarios}
                      type="text"
                      name="propietario"
                      lab="Propietario"
                      req="true"
                      helperText="El empleado requerido"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSearchSelect
                      options={planesFormacion}
                      type="text"
                      name="plan_capacitacion"
                      lab="Plan De Capacitacion"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSearchSelect
                      options={asistenciaOpciones}
                      type="text"
                      name="aplica"
                      lab="Aplica"
                      readOnly={true}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <CustomSearchSelect
                      options={opcionesAlcance}
                      type="text"
                      name="alcance"
                      lab="Alcance"
                      req="true"
                      helperText="El alcance requerido"
                    />
                  </Grid> */}
                  {/* <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      label="ID Inscripción Canvas"
                      name="id_inscripcion_canvas"
                      readOnly={true}
                      iconoClose={true}
                    />
                  </Grid> */}
                </Grid>
                <Divider />
                {
                  data?.razon_estado?.value === 100000005 ?
                    <CardActions sx={{ p: 0, mt: 2 }}>
                      <Button disabled={loadingPostulacion} size="large" type="submit" variant="contained" onClick={handleSubmit(nuevo)}>
                        Aplicar
                      </Button>
                    </CardActions>
                    : null
                }
              </form>
            </FormProvider>
          </TabPanel>
          <TabPanel value="2">
            <List>
              {
                certificados.filter(element => element?.filename != null).map(item => {
                  return (
                    <ListItem
                      secondaryAction={
                        <DescargarNota value={item?.annotationid} />
                        // <IconButton>
                        //   <Icon icon="mdi:cloud-download-outline" style={{ fontSize: 30, color: "#fff" }} />
                        // </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <Icon icon="mdi:file-certificate-outline" style={{ fontSize: 30, color: "#fff" }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.filename}
                      // secondary='Secondary text'
                      />
                    </ListItem>
                  )
                })
              }
            </List>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  );
};

export default ParticipantePorEvento;

