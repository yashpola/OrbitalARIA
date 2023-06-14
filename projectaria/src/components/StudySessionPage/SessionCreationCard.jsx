// mui imports
import {
  Card,
  TextField,
  FormControl,
  Stack,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { Help } from "@mui/icons-material";
// react imports
import { useState } from "react";
// component imports
import TimerCard from "./TimerCard";

export default function SessionCreationCard({ openSessionCreationCard }) {
  /* React States */
  const [timer, setTimer] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [invalidTiming, showInvalidTiming] = useState(false);
  const [helpMessage, openHelpMessage] = useState(false);

  /* Component functionality */

  function startTimer(e) {
    e.preventDefault();
    let tempHours = document.getElementById("workHoursEntry").value;
    let tempMinutes = document.getElementById("workMinutesEntry").value;
    if (tempHours < 0 || tempMinutes < 0) {
      showInvalidTiming(true);
    } else if (tempHours >= 24 || tempMinutes >= 1440) {
      setHours(24);
      showInvalidTiming(false);
      setTimer(true);
    } else {
      setHours(tempHours);
      setMinutes(tempMinutes);
      showInvalidTiming(false);
      setTimer(true);
    }
  }

  function displayHelpMessage(e) {
    e.preventDefault();
    openHelpMessage(true);
  }

  function closeHelpMessage(e) {
    e.preventDefault();
    openHelpMessage(false);
  }

  function closeSessionCreationCard(e) {
    e.preventDefault();
    openSessionCreationCard(false);
  }

  const headingStyle = {
    textAlign: "center",
    color: "white",
  };

  return (
    <Card sx={{ backgroundColor: "#4e1530", padding: 3 }}>
      {!timer ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IconButton
              sx={{ float: "right", color: "white" }}
              id="help-button"
              aria-label="info-help"
              size="large"
              onMouseOver={displayHelpMessage}
              onMouseOut={closeHelpMessage}
            >
              <Help fontSize="inherit" />
            </IconButton>
            {helpMessage && (
              <Card
                className="help-info-card"
                sx={{
                  padding: 1,
                }}
              >
                Max 23:59:58 countdown. Rest time excluded!
              </Card>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack direction="column" spacing={2}>
              <h4 style={headingStyle}>Work</h4>{" "}
              <TextField
                sx={{
                  backgroundColor: "white",
                }}
                type="number"
                id="workHoursEntry"
                label="Hours"
              />
              <FormControl>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  type="number"
                  label="Minutes"
                  id="workMinutesEntry"
                  variant="outlined"
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <h4 style={headingStyle}>Rest</h4>
              <TextField
                sx={{
                  backgroundColor: "white",
                }}
                type="number"
                id="restHoursEntry"
                label="Hours"
              />
              <FormControl>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  type="number"
                  id="restMinutesEntry"
                  label="Minutes"
                  variant="outlined"
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {invalidTiming && <h6 style={headingStyle}>Invalid timing</h6>}
            <FormControl>
              <Button
                sx={{
                  fontFamily: "inherit",
                  backgroundColor: "black",
                  color: "white",
                  margin: 2,
                }}
                onClick={startTimer}
                variant="contained"
              >
                Start Session
              </Button>
            </FormControl>
            <FormControl>
              <Button
                sx={{
                  fontFamily: "inherit",
                  backgroundColor: "black",
                  color: "white",
                  margin: 2,
                }}
                onClick={closeSessionCreationCard}
                variant="contained"
              >
                Cancel
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <TimerCard hours={hours} minutes={minutes} setTimer={setTimer} />
      )}
    </Card>
  );
}
