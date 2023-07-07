// mui imports
import {
  Card,
  TextField,
  FormControl,
  Stack,
  Button,
  Grid,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
// react imports
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// component imports
import { toggle } from "./studySessionSlice";
import { buttonColors, possibleFontColors } from "../themes";
import TimerCard from "./TimerCard";

export default function NewSession({
  openSessionCreationCard,
  presentTheme,
  userID,
  email,
}) {
  /* React States */

  // User input storage + bad input handling
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [invalidTiming, showInvalidTiming] = useState(false);
  const [deepFocus, setDeepFocus] = useState(false);

  // React-redux global states
  const timerOngoing = useSelector((state) => state.timer.value);
  const dispatch = useDispatch();

  /* Component functionality */
  function startTimer(e) {
    e.preventDefault();
    let tempHours = Number(
      document.getElementById("session-hours-input").value
    );
    let tempMinutes = Number(
      document.getElementById("session-minutes-input").value
    );
    if (
      tempHours < 0 ||
      tempMinutes < 0 ||
      (tempHours === 0 && tempMinutes < 1) ||
      !Number.isSafeInteger(tempHours) ||
      !Number.isSafeInteger(tempMinutes)
    ) {
      showInvalidTiming(true);
    } else if (tempHours >= 24 || tempMinutes >= 1440) {
      setHours(24);
      showInvalidTiming(false);
      dispatch(toggle());
    } else {
      setHours(tempHours);
      setMinutes(tempMinutes);
      showInvalidTiming(false);
      setDeepFocus(document.getElementById("deepfocuscheckbox").checked);
      dispatch(toggle());
    }
  }

  function closeSessionCreationCard(e) {
    e.preventDefault();
    openSessionCreationCard(false);
  }

  const headingStyle = {
    textAlign: "center",
    color: possibleFontColors[presentTheme],
  };

  const timerCardProps = {
    email,
    presentTheme,
    userID,
    hours,
    minutes,
    deepFocus,
  };

  return (
    <Card
      id="new-session-container"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // height: "445px",
        // backgroundColor: "#DC9A7F",
        padding: 3,
      }}
    >
      {!timerOngoing ? (
        <Grid container spacing={1}>
          <IconButton
            id="close-new-session-button"
            onClick={closeSessionCreationCard}
            sx={{ float: "right", color: possibleFontColors[presentTheme] }}
          >
            <Cancel fontSize="inherit" />
          </IconButton>
          <Grid item xs={12}>
            <Stack direction="column" spacing={2}>
              <h4 style={headingStyle}>Set Time</h4>{" "}
              <TextField
                id="session-hours-input"
                sx={{
                  backgroundColor: "white",
                  fontStyle: "bold",
                }}
                type="number"
                label="Hours"
              />
              <FormControl>
                <TextField
                  id="session-minutes-input"
                  sx={{ backgroundColor: "white" }}
                  type="number"
                  label="Minutes"
                  variant="outlined"
                />
              </FormControl>
            </Stack>
          </Grid>
          {/* <Grid item xs={12}>
            <Stack spacing={2}>
              <h4 style={headingStyle}>Rest</h4>
              <TextField
                sx={{
                  backgroundColor: "white",
                }}
                color="tertiary"
                type="number"
                id="restHoursEntry"
                label="Hours"
              />
              <FormControl>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  color="tertiary"
                  type="number"
                  id="restMinutesEntry"
                  label="Minutes"
                  variant="outlined"
                />
              </FormControl>
            </Stack>
          </Grid> */}
          <Grid item xs={12}>
            <FormControlLabel
              required
              control={
                <Checkbox
                  id="deepfocuscheckbox"
                  sx={{
                    color: possibleFontColors[presentTheme],
                    "&.Mui-checked": {
                      color: possibleFontColors[presentTheme],
                    },
                  }}
                />
              }
              label=<div
                style={{
                  color: possibleFontColors[presentTheme],
                  fontWeight: "bold",
                }}
              >
                Deep Focus
              </div>
            />
          </Grid>
          <Grid item xs={12}>
            {invalidTiming && <h6 style={headingStyle}>Invalid timing</h6>}
            <FormControl>
              <Button
                id="session-start-button"
                sx={{
                  fontFamily: "inherit",
                }}
                color={buttonColors[presentTheme]}
                onClick={startTimer}
                variant="contained"
              >
                Start
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ marginTop: 2, padding: 1, backgroundColor: "#eee" }}>
              <h6 style={{ color: "black" }}>
                Deep Focus: Leaving the ARIA website will terminate your session
              </h6>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <TimerCard {...timerCardProps} />
      )}
    </Card>
  );
}
