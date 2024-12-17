// mui imports
import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Paper,
  ThemeProvider,
} from "@mui/material";
// react imports
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// supabase imports
import { supabase } from "../../supabase";
// component imports
import { toggle } from "../StudySessionPage/studySessionSlice";
import YearContainer from "./YearContainer";
import UniversalPopup from "../Universal/UniversalPopup";
import { buttonColors, possibleFontColors, possibleThemes } from "../themes";
import { Analytics, Cancel, Help, Refresh } from "@mui/icons-material";

export default function GradePointArchiveScreen({ userID }) {
  /* Component variables */
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
  const notCountedGrades = ["S", "CS", "CU", "IP", "IC", "W"];

  /* React States */
  // Redux global
  const timerOngoing = useSelector((state) => state.timer.value);
  const presentTheme = useSelector((state) => state.currentTheme.value);
  const dispatch = useDispatch();

  // Conditional rendering
  const [yearCount, setYearCount] = useState(4);
  const [analyticsCard, setAnalyticsCard] = useState(false);
  const [analyticsHelpMessage, setHelpMessage] = useState(false);

  // Intermediate Data Storage
  const [gpa, setGPA] = useState("");
  const [moduleCredits, setModuleCredits] = useState("");
  const [nusModsData, setLocalModsData] = useState([]);
  const [moduleAverages, setModuleAverages] = useState([]);

  // Supabase fetch error
  const [modulesFetchError, triggerModuleFetchError] = useState(false);

  /* Component Functionality */
  async function fetchModData() {
    const response = await fetch(
      "https://api.nusmods.com/v2/2024-2025/moduleInfo.json"
    );
    const jsonData = await response.json();
    setLocalModsData(jsonData);
  }

  async function calculateGPA() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("modules")
      .select("credits, lettergrade")
      .eq("user_id", user.id);

    if (error) {
      triggerModuleFetchError(true);
      return;
    }

    if (data.length === 0) {
      setGPA("");
      return;
    }

    let totalCreditsIncludingSU = 0;
    data.map((mod) => (totalCreditsIncludingSU += mod.credits));

    let totalScore = 0;
    let totalCredits = 0;

    data
      .filter((mod) => !notCountedGrades.includes(mod.lettergrade))
      .map(
        (mod) => (
          (totalScore += gradePoint[mod.lettergrade] * mod.credits),
          (totalCredits += mod.credits)
        )
      );

    let cumulativeGPA = (totalScore / totalCredits).toFixed(2);
    setGPA(isNaN(cumulativeGPA) ? "" : cumulativeGPA);
    setModuleCredits(totalCreditsIncludingSU);
  }

  for (let i = 1; i <= yearCount; i++) {
    yearsList.push(
      <YearContainer
        presentTheme={presentTheme}
        key={i}
        userID={userID}
        nusModsData={nusModsData}
        calculateGPA={calculateGPA}
        retrieveModGroups={retrieveModGroups}
        yearID={i}
      />
    );
  }

  function getMedianGrade(anArray) {
    anArray.sort();
    if (anArray.length == 0) {
      return;
    }
    anArray.sort((a, b) => a - b);
    const midpoint = Math.floor(anArray.length / 2);
    const medianPoint =
      anArray.length % 2 === 1
        ? anArray[midpoint]
        : (anArray[midpoint - 1] + anArray[midpoint]) / 2;

    return Object.keys(gradePoint).find(
      (key) => gradePoint[key] === medianPoint
    );
  }

  function getTopGrade(anArray) {
    const topGradePoint = Math.max(...anArray);
    return Object.keys(gradePoint).find(
      (key) => gradePoint[key] === topGradePoint
    );
  }

  function getBottomGrade(anArray) {
    const bottomGradePoint = Math.min(...anArray);
    return Object.keys(gradePoint).find(
      (key) => gradePoint[key] === bottomGradePoint
    );
  }

  let moduleGroups = {};
  let moduleArrays = [];

  async function retrieveModGroups(e) {
    e.preventDefault();
    if (moduleAverages.length === 0) {
      const { data } = await supabase
        .from("modules")
        .select("lettergrade, credits, type")
        .eq("user_id", userID);
      moduleGroups = data
        .filter(
          (dataPoint) => !notCountedGrades.includes(dataPoint.lettergrade)
        )
        .reduce((accumulator, currentValue) => {
          (accumulator[currentValue.type] =
            accumulator[currentValue.type] || []).push(
            gradePoint[currentValue.lettergrade]
          );
          return accumulator;
        }, {});

      Object.keys(moduleGroups).forEach(function (key) {
        moduleArrays.push({ modCode: key, numberMods: moduleGroups[key] });
      });
      moduleArrays.sort((a, b) => b.numberMods.length - a.numberMods.length);

      let displayedMods = 1;
      moduleArrays.forEach(function (modObject, index) {
        if (displayedMods <= 3) {
          moduleAverages.push(
            <div key={index}>
              <div>{modObject.modCode}</div>
              <div>
                Median: {getMedianGrade(modObject.numberMods)} | High:{" "}
                {getTopGrade(modObject.numberMods)} | Low:{" "}
                {getBottomGrade(modObject.numberMods)}
              </div>
            </div>
          );
          displayedMods++;
        }
      });
      setModuleAverages(moduleAverages);
    }
    setAnalyticsCard(true);
  }

  function addYear(e) {
    e.preventDefault();
    setYearCount(yearCount + 1);
  }

  function removeLastYear(e) {
    e.preventDefault();
    setYearCount(yearCount - 1);
  }

  function closePopUp(e) {
    e.preventDefault();
    dispatch(toggle());
  }

  useEffect(() => {
    calculateGPA();
  }, []);

  useEffect(() => {
    fetchModData();
  }, []);

  return (
    <ThemeProvider theme={possibleThemes[presentTheme]}>
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
            fontSize: 20,
            backgroundColor: "white",
          }}
          elevation={0}
        >
          Current GPA: &nbsp;
          {modulesFetchError ? (
            <div style={{ color: "red" }}>Error Fetching</div>
          ) : (
            gpa
          )}{" "}
          &nbsp;| Total Credits: {moduleCredits}
        </Paper>
        <Container
          id="gpa-page-body"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Button
                onClick={retrieveModGroups}
                disabled={analyticsCard}
                sx={{ fontFamily: "inherit", marginRight: 1 }}
                color="primary"
                variant="contained"
                endIcon={<Analytics />}
              >
                View Analytics
              </Button>
              <IconButton
                color={buttonColors[presentTheme]}
                onClick={(e) => {
                  e.preventDefault();
                  setHelpMessage(!analyticsHelpMessage);
                }}
              >
                <Help />
              </IconButton>
              <br />
              {analyticsHelpMessage && (
                <Card
                  sx={{
                    backgroundColor: "#eee",
                    display: "inline-flex",
                    marginTop: 1,
                    padding: 1,
                  }}
                >
                  <ol>
                    <li>
                      <h6>S, CS, CU, IP, IC, W-grade courses not included</h6>
                    </li>
                    <li>
                      <h6>Refresh page to update analytics</h6>
                    </li>
                  </ol>
                </Card>
              )}
            </Grid>
            {analyticsCard && (
              <Grid item xs={12}>
                <Card sx={{ padding: 2 }}>
                  <IconButton
                    color={buttonColors[presentTheme]}
                    onClick={(e) => {
                      e.preventDefault();
                      setAnalyticsCard(false);
                    }}
                  >
                    <Cancel fontSize="inherit" />
                  </IconButton>
                  <Card
                    sx={{
                      backgroundColor: "#eee",
                      padding: 2,
                      borderBottom: "5px solid black",
                      textAlign: "center",
                    }}
                  >
                    Your top 3 most common module codes
                  </Card>
                  {moduleAverages.length === 0 ? (
                    <Card
                      sx={{
                        backgroundColor: "#eee",
                        padding: 2,
                        textAlign: "center",
                      }}
                    >
                      No modules yet!
                    </Card>
                  ) : (
                    <>
                      {moduleAverages.map((modMedian, index) => (
                        <Card
                          sx={{
                            backgroundColor: "#eee",
                            padding: 2,
                            textAlign: "center",
                          }}
                          key={index}
                        >
                          {modMedian}
                        </Card>
                      ))}
                    </>
                  )}
                </Card>
              </Grid>
            )}
            {yearsList.map((year, index) => (
              <Grid key={index} item xs={12}>
                {year}
              </Grid>
            ))}
            <Grid item xs={6}>
              <Button
                id="add-year-button"
                sx={{
                  fontFamily: "inherit",
                }}
                color="primary"
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
                    marginLeft: 5,
                  }}
                  color="primary"
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
    </ThemeProvider>
  );
}
