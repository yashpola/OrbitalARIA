// mui imports
import {
  Card,
  FormControl,
  Button,
  ClickAwayListener,
  IconButton,
  Grid,
} from "@mui/material";
import { Mood, Help } from "@mui/icons-material";

// react imports
import { useEffect, useState, useRef } from "react";

// js imports
import JSConfetti from "js-confetti";
const jsConfetti = new JSConfetti();

export default function TimerCard({ hours, minutes, setTimer }) {
  /* React States */

  const [isRunning, setIsRunning] = useState(true);
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [timerTerminated, setTimerTerminated] = useState(false);
  const [helpMessage, openHelpMessage] = useState(false);

  function displayHelpMessage(e) {
    e.preventDefault();
    openHelpMessage(true);
  }

  function closeHelpMessage(e) {
    e.preventDefault();
    openHelpMessage(false);
  }

  // countdown functionality

  const targetTime = new Date().getTime() + hours * 3600000 + minutes * 60000;

  const timer = useRef();

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(function () {
        let now = new Date().getTime();

        let distance = targetTime - now;

        let hoursLeft = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutesLeft = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        let secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML =
          hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s ";

        if (distance < 0) {
          clearInterval(timer.current);
          timer.current = null;
          jsConfetti.addConfetti();
          setSessionSuccess(true);
        }
      }, 1000);
    } else {
      clearInterval(timer.current);
      timer.current = null;
    }
    // eslint-disable-next-line
  }, [isRunning]);

  function killTimer() {
    setIsRunning(!isRunning);
    setTimerTerminated(true);
  }

  function returnToSessionCreation(e) {
    e.preventDefault();
    setTimer(false);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      killTimer();
    }
  });

  const headingStyle = {
    textAlign: "center",
    color: "white",
  };

  return (
    <ClickAwayListener onClickAway={killTimer}>
      <>
        {!sessionSuccess && !timerTerminated && (
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
                  Do not click away while a session is ongoing!
                </Card>
              )}
            </Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  fontSize: 30,
                  textAlign: "center",
                  backgroundColor: "#4e1530",
                  color: "white",
                }}
                elevation={0}
                id="countdown"
              ></Card>
              <FormControl>
                <Button
                  sx={{
                    fontFamily: "inherit",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  onClick={killTimer}
                  variant="contained"
                >
                  Terminate Session
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        )}
        {sessionSuccess && (
          <>
            <h6 style={headingStyle}>
              Congratulations! You've completed a session <br /> <Mood />
            </h6>
            <Button
              sx={{
                fontFamily: "inherit",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={returnToSessionCreation}
              variant="contained"
            >
              Return
            </Button>
          </>
        )}
        {timerTerminated && (
          <>
            <h6 style={headingStyle}>
              This session is <u>terminated</u>. You may navigate away safely
              now.
            </h6>
            <Button
              sx={{
                fontFamily: "inherit",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={returnToSessionCreation}
              variant="contained"
            >
              Return
            </Button>
          </>
        )}
      </>
    </ClickAwayListener>
  );
}
