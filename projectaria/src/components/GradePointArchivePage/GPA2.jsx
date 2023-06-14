import { Button, Card, Container, Grid, Paper } from "@mui/material";
import { Help, SentimentVeryDissatisfied } from "@mui/icons-material";

import YearContainer from "./YearContainer";
import { useState, useRef, useEffect } from "react";

export default function GradePointArchiveScreen() {
  const [currentYear, setYear] = useState(0);

  const years = [
    <YearContainer yearID="Year 1" />,
    <YearContainer yearID="Year 2" />,
    <YearContainer yearID="Year 3" />,
    <YearContainer yearID="Year 4" />,
    <YearContainer yearID="Year 5" />,
  ];

  function navNext(e) {
    e.preventDefault();
    const lastYear = currentYear === 4;
    setYear(lastYear ? 0 : currentYear + 1);
  }

  function navPrevious(e) {
    e.preventDefault();
    const firstYear = currentYear === 0;
    setYear(firstYear ? 4 : currentYear + 1);
  }

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          fontSize: 40,
          backgroundColor: "white",
        }}
        elevation={0}
      >
        Current GPA: 1.69 &nbsp; <SentimentVeryDissatisfied />
      </Paper>
      <Grid sx={{ width: "95vw", margin: "auto" }} container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: 2, backgroundColor: "#A86868" }}>
            <div
              className="slideshowSlider"
              style={{ transform: `translate3d(${-currentYear * 100}%, 0, 0)` }}
            >
              {years.map((year, index) => (
                <div className="slide" key={index}>
                  {year}
                </div>
              ))}
            </div>
          </Card>
        </Grid>
        <Button
          sx={{ margin: "auto", marginTop: 5 }}
          onClick={navPrevious}
          variant="contained"
        >
          Previous
        </Button>
        <Button
          sx={{ margin: "auto", marginTop: 5 }}
          onClick={navNext}
          variant="contained"
        >
          Next
        </Button>
      </Grid>
    </>
  );
}
