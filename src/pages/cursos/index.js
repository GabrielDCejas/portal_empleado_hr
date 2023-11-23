import React from "react";
// ** Next Import
import Link from "next/link";
// ** MUI Imports
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import Table from "@/@core/components/table/Table";
import { Box, CircularProgress } from "@mui/material";
import useGetCursos from "@/hooks/useGetCursos";
import { COLUMNS_CURSOS } from "@/columns/columnsCursos";

const Cursos = () => {
  const { cursos, loadingCursos } = useGetCursos();

  return (
    <Grid container>
      <PageHeader
        title={
          <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
            Cursos
          </Typography>
        }
      />
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          {loadingCursos ? (
            <Table data={cursos} columns={COLUMNS_CURSOS} name={"Cursos"} />
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

export default Cursos;
