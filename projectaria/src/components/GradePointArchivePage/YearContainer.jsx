// mui imports
import { Paper, Grid, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useState } from "react";
// component imports
import SemesterContainer from "./SemesterContainer";

export default function YearContainer({ calculateGPA, nusModsData, yearID }) {
  /* React states */
  // Conditional rendering
  const [semsShown, setSemsShown] = useState(false);

  /* Component Functionality */
  function showMods(e) {
    e.preventDefault();
    setSemsShown(!semsShown);
  }

  return (
    <>
      <Grid sx={{ padding: 2 }} container spacing={2}>
        <Grid item xs={12}>
          <Paper
            id="year-header"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
              fontSize: 30,
            }}
            elevation={3}
          >
            Year {yearID}
            <IconButton
              id="year-expand-button"
              onClick={showMods}
              sx={{ color: "black" }}
              size="large"
            >
              {semsShown ? (
                <ExpandLess fontSize="inherit" />
              ) : (
                <ExpandMore fontSize="inherit" />
              )}
            </IconButton>
          </Paper>
        </Grid>
        {semsShown && (
          <>
            <Grid item xs={12} sm={6}>
              <SemesterContainer
                calculateGPA={calculateGPA}
                nusModsData={nusModsData}
                yearID={yearID}
                semID={1}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SemesterContainer
                calculateGPA={calculateGPA}
                nusModsData={nusModsData}
                yearID={yearID}
                semID={2}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
