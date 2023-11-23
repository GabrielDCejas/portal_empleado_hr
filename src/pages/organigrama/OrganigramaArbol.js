import { Card, CardContent, Typography, Avatar, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Carga dinámica del componente react-organizational-chart solo en el lado del cliente
const Tree = dynamic(() => import("react-organizational-chart").then((mod) => mod.Tree), { ssr: false });
const TreeNode = dynamic(() => import("react-organizational-chart").then((mod) => mod.Tree), { ssr: false });

const OrganigramaArbol = ({ organigrama }) => {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    if (organigrama?.length > 0 && typeof window !== "undefined") {
      // Encuentra el nodo raíz donde unidadSuperiorId es null
      setRoot(organigrama.find((item) => item.unidadSuperiorId === null));
    }
  }, [organigrama]);

  const hasDescendants = (node) => {
    return organigrama.some((item) => item.unidadSuperiorId === node.IdArbol);
  };

  const renderNode = (node) => (
    <TreeNode
      key={node.IdArbol}
      style={{ justifyContent: "center" }}
      label={
        <Box
          component="div"
          sx={{ textAlign: "center", overflowX: "auto", ...(node.unidadSuperiorId === null && { margin: "auto" }) }}
        >
          <Grid container direction="column" alignItems="center">
            <Card sx={{ width: "170px", margin: "8px", textAlign: "center" }}>
              <CardContent>
                <Avatar src={node?.foto} sx={{ width: "60px", height: "60px", margin: "auto" }} />
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {node.puesto}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {node.responsable}
                </Typography>
              </CardContent>
            </Card>
            {hasDescendants(node) && <div style={{ width: "2px", height: "20px", background: "#ccc" }} />}
          </Grid>
        </Box>
      }
    >
      {organigrama.filter((item) => item.unidadSuperiorId === node.IdArbol).map(renderNode)}
    </TreeNode>
  );

  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={18} sx={{ display: "flex", justifyContent: "center", alignItems: "center", overflowX: "auto" }}>
        <div style={{ overflowX: "auto", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Tree
            label={
              <Typography variant="h5" color="inherit">
                Organigrama
              </Typography>
            }
            lineColor="#ccc"
            ineWidth="2px"
          >
            {root ? renderNode(root) : null}
          </Tree>
        </div>
      </Grid>
    </Grid>
  );
};

export default OrganigramaArbol;

