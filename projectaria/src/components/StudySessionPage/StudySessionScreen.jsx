// mui imports
import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  ThemeProvider,
} from "@mui/material";
// react imports
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../../supabase";
// component imports
import plantIcon from "../images/studysessionimages/plant.png";
import {
  possibleThemes,
  photoFrameBackgroundColor,
  photoFrameBorderColor,
  possibleFontColors,
  buttonColors,
} from "../themes";
import NewSession from "./NewSession";
import SessionHistoryCard from "./SessionHistoryCard";
import StatsCard from "./StatsCard";
import ConfirmNavSession from "./ConfirmNavSession";
import { toggle } from "./studySessionSlice";
import sadFox from "../images/studysessionimages/sadfox.png";
import happyFox from "../images/studysessionimages/happyfox.png";
import angryFox from "../images/studysessionimages/angryfox.png";
import normalFox from "../images/studysessionimages/normalfox.png";
import UniversalPopup from "../Universal/UniversalPopup";

export default function StudySessionScreen({
  confirmNavigation,
  setConfirmNavigation,
  userID,
  email,
  loginDiff,
}) {
  /* React states */
  // React-redux global states
  const timerOngoing = useSelector((state) => state.timer.value);
  const presentTheme = useSelector((state) => state.currentTheme.value);
  const dispatch = useDispatch();
  // Conditional rendering
  const [sessionCreationCard, openSessionCreationCard] = useState(false);
  const [sessionHistoryCardOpen, setSessionHistoryCardOpen] = useState(false);
  const [statisticsCard, setStatsCardOpen] = useState(false);
  const [foxSrc, setFoxSrc] = useState("");
  const [loginDiffPopup, setloginDiffPopup] = useState(true);
  // User data storage
  const [sessionHistoryArray, setSessionHistory] = useState([]);
  const [sessionSuccessStreak, setSessionSuccessStreak] = useState();
  const [sessionFailStreak, setSessionFailStreak] = useState();

  /* Component Functionality */
  async function retrieveSessionHistory() {
    const { data, error } = await supabase
      .from("studysessions")
      .select("created_at, duration, completed")
      .eq("user_id", userID);

    setSessionHistory(data);
  }

  async function retrieveStats() {
    const { data, error } = await supabase
      .from("stats")
      .select("successStreak, failStreak")
      .eq("user_email", email);

    if (data && data.length !== 0) {
      setSessionSuccessStreak(data[0].successStreak);
      setSessionFailStreak(data[0].failStreak);
      if (sessionFailStreak >= 10) {
        setFoxSrc(angryFox);
        return;
      }

      if (sessionSuccessStreak >= 10) {
        setFoxSrc(happyFox);
        return;
      }
      setFoxSrc(normalFox);
    } else {
      setSessionSuccessStreak(0);
      setSessionFailStreak(0);
    }
  }

  function newSession(e) {
    e.preventDefault();
    openSessionCreationCard(true);
    setSessionHistoryCardOpen(false);
    setStatsCardOpen(false);
  }

  function openSessionHistory(e) {
    e.preventDefault();
    openSessionCreationCard(false);
    setStatsCardOpen(false);
    retrieveSessionHistory();
    setSessionHistoryCardOpen(true);
  }

  function openStatisticsCard(e) {
    e.preventDefault();
    setSessionHistoryCardOpen(false);
    openSessionCreationCard(false);
    retrieveSessionHistory();
    retrieveStats();
    setStatsCardOpen(true);
  }

  const sessionHistoryCardProps = {
    userID,
    email,
    presentTheme,
    retrieveSessionHistory,
    sessionHistoryArray,
    setSessionHistoryCardOpen,
  };

  const sessionCreationCardProps = {
    userID,
    email,
    presentTheme,
    openSessionCreationCard,
    setSessionHistoryCardOpen,
  };

  const statsCardProps = {
    foxSrc,
    sessionHistoryArray,
    setStatsCardOpen,
    presentTheme,
    sessionSuccessStreak,
    sessionFailStreak,
  };

  return (
    <ThemeProvider theme={possibleThemes[presentTheme]}>
      {confirmNavigation && (
        <ConfirmNavSession
          popupText={
            timerOngoing
              ? "You will lose ongoing session data."
              : "You may navigate away safely now."
          }
          closePopUp={(e) => {
            e.preventDefault();
            setConfirmNavigation(false);
          }}
          proceedAction={() => {
            dispatch(toggle());
          }}
          timerOngoing={timerOngoing}
        />
      )}
      <>
        {/* {loginDiff > 5 && loginDiffPopup && (
          <Card
            sx={{
              textAlign: "center",
              padding: 2,
              color: possibleFontColors[presentTheme],
            }}
          >
            <h4>It's been {loginDiff} days since your last login </h4>
            <img src={sadFox} style={{ width: "100px", height: "100px" }} />
            <br />
            <Button
              onClick={(e) => {
                setloginDiffPopup(false);
              }}
              variant="contained"
              color={buttonColors[presentTheme]}
            >
              Ok...
            </Button>
          </Card>
        )} */}
        <Container
          sx={{
            backgroundColor: "transparent",
            padding: 5,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  display: "flex",
                  padding: 10,
                  height: "445px",
                  alignItems: "center",
                  justifyContent: "center",
                  border: photoFrameBorderColor[presentTheme],
                  backgroundColor: photoFrameBackgroundColor[presentTheme],
                }}
                elevation={10}
              >
                <Stack direction="column" spacing={2}>
                  <Button
                    id="new-session-button"
                    onClick={newSession}
                    disabled={timerOngoing || sessionCreationCard}
                    color="secondary"
                    variant="contained"
                    sx={{
                      fontSize: 20,
                      fontFamily: "Ubuntu",
                    }}
                  >
                    New Session
                  </Button>
                  <Button
                    id="view-session-history-button"
                    color="secondary"
                    onClick={openSessionHistory}
                    disabled={timerOngoing || sessionHistoryCardOpen}
                    variant="contained"
                    sx={{
                      fontSize: 20,
                      fontFamily: "Ubuntu",
                    }}
                  >
                    View Session History
                  </Button>
                  <Button
                    id="view-statistics-button"
                    color="secondary"
                    onClick={openStatisticsCard}
                    variant="contained"
                    disabled={timerOngoing || statisticsCard}
                    sx={{
                      fontSize: 20,
                      fontFamily: "Ubuntu",
                    }}
                  >
                    View Statistics
                  </Button>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              {sessionCreationCard && (
                <NewSession {...sessionCreationCardProps} />
              )}
              {sessionHistoryCardOpen && (
                <SessionHistoryCard {...sessionHistoryCardProps} />
              )}
              {statisticsCard && <StatsCard {...statsCardProps} />}
            </Grid>
          </Grid>
        </Container>
        <img src={plantIcon} style={{ width: 250, height: 250 }}></img>
        <Paper
          square={true}
          sx={{
            backgroundColor: "#966f33",
            padding: "5rem 5rem",
            // height: "25vh",
            borderTop: "1px solid #966f33",
          }}
        ></Paper>
        {/* <Box
        sx={{ backgroundColor: "white", height: "25vh", textAlign: "center" }}
      ></Box> */}
      </>
    </ThemeProvider>
  );
}
