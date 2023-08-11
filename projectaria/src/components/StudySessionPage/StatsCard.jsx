import {
  Avatar,
  Card,
  Container,
  IconButton,
  Grid,
  Stack,
} from "@mui/material";
import {
  Cancel,
  Celebration,
  IndeterminateCheckBox,
  LocalFireDepartment,
  HeartBroken,
} from "@mui/icons-material";
import { possibleFontColors } from "../themes";
import { useEffect, useState } from "react";

export default function StatsCard({
  foxSrc,
  sessionHistoryArray,
  setStatsCardOpen,
  presentTheme,
  sessionSuccessStreak,
  sessionFailStreak,
}) {
  const [totalSessionHours, setTotalSessionHours] = useState(0);
  const [totalSessionMinutes, setTotalSessionMinutes] = useState(0);

  /* Using sessionHistoryArray */
  // Sum up the total successful hours & minutes here
  const durationSessions = sessionHistoryArray
    .filter(({ completed }) => completed)
    .map(({ duration }) => duration);
  const hoursSessions = durationSessions
    .map(({ hours }) => hours)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const minutesSessions = durationSessions
    .map(({ minutes }) => minutes)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  function getTotalFocusTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    setTotalSessionHours(hours + hoursSessions);
    setTotalSessionMinutes(remainingMinutes);
  }

  useEffect(() => {
    getTotalFocusTime(minutesSessions);
  }, []);

  // Sum up total sessions here
  const totalSessions = sessionHistoryArray.map(({ completed }) => completed);
  const numberCompletedSessions = totalSessions.filter(
    (session) => session
  ).length;
  const numberFailedSessions = totalSessions.length - numberCompletedSessions;

  const bubbleStyling = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    backgroundColor: "#eee",
    padding: 3,
  };

  // function chooseFox() {
  //   if (sessionFailStreak >= 10) {
  //     setFoxSrc(sadFox);
  //     return;
  //   }

  //   if (sessionSuccessStreak >= 10) {
  //     setFoxSrc(happyFox);
  //     return;
  //   }
  //   setFoxSrc(normalFox);
  // }

  // useEffect(() => {
  //   chooseFox();
  // }, []);

  return (
    <Container sx={{ backgroundColor: "transparent" }}>
      <Card
        id="session-statistics-container"
        sx={{
          // height: "445px",
          overflow: "auto",
          padding: 2,
        }}
        elevation={0}
      >
        <IconButton
          id="close-session-history-button"
          onClick={(e) => (e.preventDefault, setStatsCardOpen(false))}
          sx={{ float: "left", color: possibleFontColors[presentTheme] }}
        >
          <Cancel fontSize="inherit" />
        </IconButton>
        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card sx={bubbleStyling}>
              <h2 id="total-session-hours">{totalSessionHours}</h2>hours
              <h2 id="total-session-minutes">{totalSessionMinutes}</h2>minutes
              <h5 style={{ marginTop: "5px" }}>focus time</h5>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={bubbleStyling}>
              <h2 id="number-completed-sessions">{numberCompletedSessions} </h2>
              <Celebration sx={{ color: "green" }} />
              <h2 id="number-terminated-sessions">{numberFailedSessions} </h2>
              <IndeterminateCheckBox sx={{ color: "red" }} />
              <h5 style={{ marginTop: "5px" }}>sessions</h5>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={bubbleStyling}>
              <h2 id="session-success-streak">{sessionSuccessStreak} </h2>
              <LocalFireDepartment sx={{ color: "#FFA500" }} />
              <h2 id="session-fail-streak">{sessionFailStreak}</h2>
              <HeartBroken sx={{ color: "red" }} />
              <h5 style={{ marginTop: "5px" }}>streaks</h5>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={foxSrc} style={{ width: "200px", height: "200px" }} />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
