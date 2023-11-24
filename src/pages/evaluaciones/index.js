import React from "react";
// ** Next Import

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import Table from "@/@core/components/table/Table";
import { Box, CircularProgress } from "@mui/material";
import useGetEvaluacionesPGD from "@/hooks/useGetEvaluacionesPGD";
import { COLUMNS_EVALUACION_PGD } from "@/columns/columnsEvaluacionPGD";

const EvaluacionPGD = () => {

const {evaluacionPGD, loadingEvaluacionPGD} = useGetEvaluacionesPGD()

console.log("evaluacionPGD", evaluacionPGD)
console.log("loadingEvaluacionPGD", loadingEvaluacionPGD)

  return (
    <Grid container>
      <PageHeader
        title={
          <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
            Evaluación de PGD
          </Typography>
        }
      />
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          {loadingEvaluacionPGD ? (
            <Table data={evaluacionPGD} columns={COLUMNS_EVALUACION_PGD} name={"Evaluación de PGD"} />
          ) : (
            <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
              <CircularProgress sx={{ mb: 4 }} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EvaluacionPGD;
