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
import { COLUMNS_RECIBOS_SUELDO } from "@/columns/columnsRecibosSueldo";
import useGetRecibosSueldo from "@/hooks/useGetRecibosSueldo";

const RecibosSueldo = () => {
  const { recibos, loadingRecibos } = useGetRecibosSueldo();
  const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant="h5">
            <LinkStyled href="https://mui.com/x/react-data-grid/" target="_blank">
              Recibos de Sueldo
            </LinkStyled>
          </Typography>
        }
      />
      <Grid item xs={12}>
        {loadingRecibos ? (
          <Table
            data={recibos}
            columns={COLUMNS_RECIBOS_SUELDO}
            name={"Recibos de Sueldo"}
            addRow={true}
            toggle={() => {}}
          />
        ) : (
          <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
            <CircularProgress sx={{ mb: 4 }} />
          </Box>
        )}
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};
export default RecibosSueldo;
