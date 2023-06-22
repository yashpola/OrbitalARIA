// mui imports
import { Button, Container, Grid, Paper } from "@mui/material";
// react imports
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// supabase imports
import { supabase } from "../../supabase";
// component imports
import { toggle } from "../StudySessionPage/studySessionSlice";
import YearContainer from "./YearContainer";
import UniversalPopup from "../Universal/UniversalPopup";

export default function GradePointArchiveScreen() {
  const timerOngoing = useSelector((state) => state.timer.value);
  const dispatch = useDispatch();
  const [yearCount, setYearCount] = useState(4);
  const [gpa, setGPA] = useState("");
  const [modData, setModData] = useState([]);
  const gradePoint = {
    "A+": 5,
    A: 5,
    "A-": 4.5,
    "B+": 4,
    B: 3.5,
    "B-": 3,
    "C+": 2.5,
    C: 2,
    "D+": 1.5,
    D: 1,
    F: 0,
    U: 0,
  };

  const yearsList = [];

  for (let i = 1; i <= yearCount; i++) {
    yearsList.push(
      <YearContainer
        key={i}
        modData={modData}
        calculateGPA={calculateGPA}
        yearID={i}
      />
    );
  }

  function addYear(e) {
    e.preventDefault();
    setYearCount(yearCount + 1);
  }

  function removeLastYear(e) {
    e.preventDefault();
    setYearCount(yearCount - 1);
  }

  const notCountedGrades = ["S", "CS", "CU", "IP", "IC", "W"];

  function closePopUp(e) {
    e.preventDefault();
    dispatch(toggle());
  }

  async function calculateGPA() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("modules")
      .select("credits, lettergrade")
      .eq("user_email", user.email);

    if (data.length === 0) {
      setGPA("");
      return;
    }

    let totalScore = 0;
    let totalCredits = 0;

    data.map((mod) => {
      if (!notCountedGrades.includes(mod.lettergrade)) {
        totalScore += gradePoint[mod.lettergrade] * mod.credits;
        totalCredits += mod.credits;
      }
    });

    let cumulativeGPA = (totalScore / totalCredits).toFixed(2);

    setGPA(isNaN(cumulativeGPA) ? "" : cumulativeGPA);
  }

  async function fetchModData() {
    const response = await fetch(
      "https://api.nusmods.com/v2/2022-2023/moduleInfo.json"
    );
    const jsonData = await response.json();
    setModData(jsonData);
  }

  useEffect(() => {
    calculateGPA();
  }, []);

  useEffect(() => {
    fetchModData();
  }, []);

  return (
    <>
      {timerOngoing && (
        <UniversalPopup
          closePopUp={closePopUp}
          popupText="Your ongoing session was terminated."
        />
      )}
      <Paper
        id="gpa-page-header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5,
          padding: 2,
          fontSize: 40,
          backgroundColor: "white",
        }}
        elevation={0}
      >
        Current GPA: {gpa}
      </Paper>
      {/* <Container sx={{ padding: 0 }}> */}
      <Container
        id="gpa-page-body"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          backgroundColor: "#A86868",
        }}
      >
        <Grid container spacing={5}>
          {yearsList.map((year, index) => (
            <Grid key={index} item xs={12}>
              {year}
            </Grid>
          ))}
          <Grid sx={{}} item xs={6}>
            <Button
              id="add-year-button"
              sx={{
                fontFamily: "inherit",
                backgroundColor: "#4e1530",
              }}
              variant="contained"
              onClick={addYear}
            >
              Add Year
            </Button>
            {yearCount > 4 && (
              <Button
                id="undo-add-year-button"
                sx={{
                  fontFamily: "inherit",
                  backgroundColor: "#4e1530",
                  marginLeft: 5,
                }}
                variant="contained"
                onClick={removeLastYear}
              >
                Undo Add Year
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
