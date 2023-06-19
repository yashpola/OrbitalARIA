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
import { useSelector } from "react-redux";
import { supabase } from "../../supabase";
// component imports
import plantIcon from "../images/studysessionimages/plant.png";
import { ariaTheme } from "../../App";
import SessionCreationCard from "./SessionCreationCard";
import SessionHistoryCard from "./SessionHistoryCard";

export default function StudySessionScreen({ email }) {
  const timerOngoing = useSelector((state) => state.timer.value);
  const [sessionCreationCard, openSessionCreationCard] = useState(false);
  const [sessionHistoryCardOpen, setSessionHistoryCardOpen] = useState(false);
  const [sessionHistoryArray, setSessionHistory] = useState([]);

  function newSession(e) {
    e.preventDefault();
    openSessionCreationCard(true);
    setSessionHistoryCardOpen(false);
  }

  function openSessionHistory(e) {
    e.preventDefault();
    openSessionCreationCard(false);
    retrieveSessionHistory();
    setSessionHistoryCardOpen(true);
  }

  async function retrieveSessionHistory() {
    const { data, error } = await supabase
      .from("studysessions")
      .select("created_at, duration, completed")
      .eq("user_email", email);

    setSessionHistory(data);
  }

  return (
    <ThemeProvider theme={ariaTheme}>
      <Container sx={{ padding: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                display: "flex",
                padding: 10,
                height: "445px",
                alignItems: "center",
                justifyContent: "center",
                border: "5px solid #966f33",
                backgroundColor: "#B5A197",
              }}
              elevation={0}
            >
              <Stack direction="column" spacing={2}>
                <Button
                  onClick={newSession}
                  disabled={timerOngoing}
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
                  color="secondary"
                  onClick={openSessionHistory}
                  disabled={timerOngoing}
                  variant="contained"
                  sx={{
                    fontSize: 20,
                    fontFamily: "Ubuntu",
                  }}
                >
                  View Session History
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  disabled={timerOngoing}
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
              <SessionCreationCard
                email={email}
                openSessionCreationCard={openSessionCreationCard}
              />
            )}
            {sessionHistoryCardOpen && (
              <SessionHistoryCard
                email={email}
                retrieveSessionHistory={retrieveSessionHistory}
                sessionHistoryArray={sessionHistoryArray}
                setSessionHistoryCardOpen={setSessionHistoryCardOpen}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <img
        src={plantIcon}
        style={{ marginLeft: "auto", width: 250, height: 250 }}
      ></img>
      <Paper
        square={true}
        sx={{
          backgroundColor: "#966f33",
          padding: "3rem 3rem",
          borderTop: "1px solid #966f33",
        }}
      ></Paper>
    </ThemeProvider>
  );
}
