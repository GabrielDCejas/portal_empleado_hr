import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid, esES } from "@mui/x-data-grid";
import QuickSearchToolbar from "../../../@core/components/table/QuickSearchToolbar";
import { Grid, Typography } from "@mui/material";

const Table = ({ data, columns, name, addRow, toggle }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        const fieldValue = row[field];
        if (fieldValue !== undefined && fieldValue !== null) {
          // Verificar si fieldValue no es undefined ni null antes de llamar a toString()
          return searchRegex.test(fieldValue.toString());
        }
        return false; // Si fieldValue es undefined o null, no realizar la búsqueda
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <Card>
      {name ?
        <Grid container sx={{ m: 5 }}>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
              {name}
            </Typography>
          </Grid>
        </Grid> : null
      }
      <DataGrid
        getRowId={(row) => row.id}
        autoHeight
        rows={filteredData.length ? filteredData : data}
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          baseButton: {
            variant: "outlined",
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(""),
            onChange: (event) => handleSearch(event.target.value),
            addRow: addRow, //Booleano que permite que se renderize el boton
            toggle: toggle, // Funcion que dispara la apertura de modal/drawer
          },
        }}
        // localeText={{
        //   noRowsLabel: "No hay registros disponibles",
        //   // Encabezados de columna
        //   // Otros textos personalizados si los necesitas
        // }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </Card>
  );
};

export default Table;
