// mui imports
import { Card, Container, FormControl, Button, Grid } from "@mui/material";
// react imports
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
// component imports
import { possibleFontColors } from "../themes";
import { toggle } from "./studySessionSlice";
import happyFox from "../images/studysessionimages/happyfox.png";
import angryFox from "../images/studysessionimages/angryfox.png";
//supabase imports
import { supabase } from "../../supabase";
// js imports
import JSConfetti from "js-confetti";
const jsConfetti = new JSConfetti();

export default function TimerCard({
  presentTheme,
  userID,
  email,
  hours,
  minutes,
  deepFocus,
}) {
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
            user_id: userID,
            duration: { hours: hours, minutes: minutes },
            completed: true,
          });
          const { data } = await supabase
            .from("stats")
            .select("successStreak")
            .eq("user_email", email);
          const newSuccessStreak = data[0].successStreak + 1;
          await supabase
            .from("stats")
            .update({
              failStreak: 0,
              successStreak: newSuccessStreak,
            })
            .eq("user_email", email);
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
      user_id: userID,
      duration: { hours: hours, minutes: minutes },
      completed: false,
    });
    const { data, error } = await supabase
      .from("stats")
      .select("failStreak")
      .eq("user_email", email);

    const newFailStreak = data[0].failStreak + 1;
    await supabase
      .from("stats")
      .update({
        failStreak: newFailStreak,
        successStreak: 0,
      })
      .eq("user_email", email);
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
    if (document.visibilityState !== "visible" && deepFocus) {
      navigateAway();
    }
  });

  return (
    <>
      <Container
        sx={{ backgroundColor: "transparent" }}
        id="timer-card-container"
      >
        {!sessionSuccess && !timerTerminated && (
          <Grid container spacing={2}>
            {deepFocus && (
              <Grid item xs={12}>
                <Card
                  id="session-timer-warning-card"
                  className="help-info-card"
                  sx={{
                    padding: 1,
                    backgroundColor: "white",
                    color: "black",
                  }}
                  elevation={0}
                >
                  Do not click away while a session is ongoing!
                </Card>
              </Grid>
            )}
            <Grid item xs={12}>
              <Card
                id="session-countdown-card"
                sx={{
                  textAlign: "center",
                  fontSize: 60,
                  backgroundColor: "transparent",
                  color: possibleFontColors[presentTheme],
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
            <Card
              id="session-timer-success-card"
              sx={{
                padding: 1,
                backgroundColor: "white",
                color: "black",
              }}
              elevation={0}
            >
              Congratulations! You've completed a session
            </Card>
            <img src={happyFox} style={{ width: "150px", height: "150px" }} />
            <br />
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
            <Card
              id="session-timer-terminated-card"
              sx={{
                padding: 1,
                backgroundColor: "white",
                color: "black",
              }}
              elevation={0}
            >
              This session is terminated
            </Card>
            <img src={angryFox} style={{ width: "150px", height: "150px" }} />
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
    </>
  );
}
