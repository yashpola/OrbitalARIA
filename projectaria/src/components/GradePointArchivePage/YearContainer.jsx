// mui imports
import { Paper, Grid, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useState } from "react";
// component imports
import SemesterContainer from "./SemesterContainer";
import { possibleFontColors } from "../themes";

export default function YearContainer({
  presentTheme,
  calculateGPA,
  nusModsData,
  yearID,
  userID,
}) {
  /* React states */
  // Conditional rendering
  const [semsShown, setSemsShown] = useState(false);

  /* Component Functionality */
  function showMods(e) {
    e.preventDefault();
    setSemsShown(!semsShown);
  }

  const semesterContainerProps = {
    presentTheme,
    calculateGPA,
    nusModsData,
    yearID,
    userID,
  };

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
              color: possibleFontColors[presentTheme],
            }}
            elevation={3}
          >
            Year {yearID}
            <IconButton
              id="year-expand-button"
              onClick={showMods}
              sx={{ color: possibleFontColors[presentTheme] }}
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
              <SemesterContainer {...semesterContainerProps} semID={1} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SemesterContainer {...semesterContainerProps} semID={2} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
