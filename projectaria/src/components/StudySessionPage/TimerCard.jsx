// mui imports
import { Card, Container, FormControl, Button, Grid } from "@mui/material";
import { Mood } from "@mui/icons-material";
// react imports
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
// component imports
import { toggle } from "./studySessionSlice";
//supabase imports
import { supabase } from "../../supabase";
// js imports
import JSConfetti from "js-confetti";
const jsConfetti = new JSConfetti();

export default function TimerCard({ email, hours, minutes }) {
  /* React States */
  // React-redux global states
  const dispatch = useDispatch();

  // Timer states
  const [isRunning, setIsRunning] = useState(true);
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [timerTerminated, setTimerTerminated] = useState(false);

  // Component functionality
  const targetTime = new Date().getTime() + hours * 3600000 + minutes * 60000;
  const timer = useRef();

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(async function () {
        let now = new Date().getTime();

        let distance = targetTime - now;

        let hoursLeft = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutesLeft = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        let secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("session-countdown-card").innerHTML =
          hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s ";

        if (distance < 0) {
          clearInterval(timer.current);
          timer.current = null;
          jsConfetti.addConfetti();
          setSessionSuccess(true);
          await supabase.from("studysessions").insert({
            user_email: email,
            duration: { hours: hours, minutes: minutes },
            completed: true,
          });
        }
      }, 1000);
    } else {
      clearInterval(timer.current);
      timer.current = null;
    }
    // eslint-disable-next-line
  }, [isRunning]);

  async function killTimer(e) {
    e.preventDefault();
    setIsRunning(!isRunning);
    setTimerTerminated(true);
    await supabase.from("studysessions").insert({
      user_email: email,
      duration: { hours: hours, minutes: minutes },
      completed: false,
    });
  }

  function navigateAway() {
    setIsRunning(!isRunning);
    setTimerTerminated(true);
  }

  function returnToSessionCreation(e) {
    e.preventDefault();
    dispatch(toggle());
  }

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      navigateAway();
    }
  });

  const headingStyle = {
    color: "white",
    fontSize: "20px",
  };

  return (
    <Container id="timer-card-container">
      {!sessionSuccess && !timerTerminated && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card
              id="session-timer-warning-card"
              className="help-info-card"
              sx={{
                padding: 1,
              }}
            >
              Do not click away while a session is ongoing!
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              id="session-countdown-card"
              sx={{
                textAlign: "center",
                fontSize: 60,
                backgroundColor: "transparent",
                color: "white",
              }}
              elevation={0}
            ></Card>
            <FormControl>
              <Button
                id="terminate-session-button"
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
            id="return-new-session-button"
            sx={{
              fontFamily: "inherit",
              fontSize: 20,
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
          <h6 style={headingStyle}>This session is terminated.</h6>
          <br />
          <Button
            id="return-new-session-button"
            sx={{
              fontFamily: "inherit",
              backgroundColor: "black",
              color: "white",
              fontSize: 20,
            }}
            onClick={returnToSessionCreation}
            variant="contained"
          >
            Return
          </Button>
        </>
      )}
    </Container>
  );
}
