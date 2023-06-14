import { Card, Paper } from "@mui/material";

export default function ModuleCard({
  modTitle,
  modGrade,
  modName,
  modCredits,
}) {
  return (
    <Card sx={{ marginTop: 2, padding: 2 }}>
      <Paper
        sx={{
          padding: 2,
          marginBottom: 2,
          backgroundColor: "#4e1530",
          fontSize: 20,
          color: "white",
        }}
      >
        {modTitle} ({modGrade})
      </Paper>
      <h5>{modName}</h5>
      <h5 style={{ float: "right" }}>{modCredits}mc</h5>
    </Card>
  );
}
