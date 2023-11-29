import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Tooltip,
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  FormControl,
  InputLabel,
  NativeSelect,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { green } from "@mui/material/colors";
import Icon from "@/@core/components/icon";
import useEditarItemsEvaluacion from "@/hooks/useEditarItemsEvaluacion";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const opcionesValoracionCompetencias = [
  { value: 100000000, label: "Por Debajo De Las Expectativas" },
  { value: 100000001, label: "Cumple Parcialmente Las Expectativas" },
  { value: 100000002, label: "Cumple Las Expectativas" },
  { value: 100000003, label: "Por Encima De Las Expectativas" },
  { value: 100000004, label: "Sobresaliente" },
];

const ValoracionItem = ({ item, itemEvaluar }) => {
  const [open, setOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState({ label: "", value: 0 });
  const [id, setid] = useState("")
  const [evaluacionpgdid, setEvaluacionpgdid] = useState("")

  const editarItemEvaluacion = useEditarItemsEvaluacion();

  const loadingEditarItemsEvaluacion = useSelector((store) => store.evaluaciones.loadingEditarItemsEvaluacion);

  useEffect(() => {
    if(item){
        setid(item.id)
        setDefaultValues(item[itemEvaluar]);
        setEvaluacionpgdid(item.evaluaciondepgdid)
    }
  }, [item]);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const setSelect = () => {
    setTimeout(() => {
      handleOpen();
    }, 500);
  };

  const setRelevamiento = () => {
    editarItemEvaluacion({ [itemEvaluar]: defaultValues, id: id }, evaluacionpgdid, handleClose)
  };

  const handleChange = (event) => {
    const selectedValue = event?.target.value;
    const selectedOption = opcionesValoracionCompetencias.find((item) => item.value == selectedValue);
    setDefaultValues({ value: selectedValue, label: selectedOption ? selectedOption.label : "" });
  };

  return (
    <>
      <Box>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="estadoValoracion">
            Estado del relevamiento
          </InputLabel>
          <NativeSelect
            value={defaultValues.value}
            onChange={(e) => {
              handleChange(e);
              setSelect();
            }}
            inputProps={{
              name: "estadoValoracion",
              id: "estadoValoracion",
              style: { fontSize: ".8rem" },
            }}
            sx={{
                '& .MuiNativeSelect-select': {
                  paddingRight: 5,
                  paddingLeft: 5,
                }
              }}
          >
            {opcionesValoracionCompetencias.map((item) => {
              return (
                <option key={item.value} value={item.value} >
                  {item.label}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Box>
      <Dialog open={open} onClose={handleClose}>
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DialogTitle id="responsive-dialog-title">
              <Typography sx={{ fontSize: { xs: ".7rem", md: ".9rem" } }}>
                {" "}
                {`Desea cambiar la valoración a (${defaultValues.label})`}
              </Typography>
            </DialogTitle>
            <Tooltip title={<Typography sx={{ color: "#fff" }}>Cerrar</Typography>}>
              <IconButton edge="end" color="warning" onClick={handleClose} aria-label="close" sx={{ mr: 2 }}>
                <Icon color="red" icon="material-symbols:close" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box component="div" sx={{ position: "relative" }}>
            <Button onClick={setRelevamiento} variant="contained" disabled={loadingEditarItemsEvaluacion === "LOADING"}>
              <Typography sx={{ fontSize: { xs: ".7rem", md: ".9rem" } }}>Guardar</Typography>
            </Button>
            {loadingEditarItemsEvaluacion === "LOADING" && (
              <CircularProgress
                size={26}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "20%",
                  marginTop: "-12px",
                  marginLeft: "12px",
                }}
              />
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ValoracionItem;
