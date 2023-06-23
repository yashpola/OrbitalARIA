// mui imports
import {
  Button,
  Box,
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
import SessionCreationCard from "./NewSession";
import SessionHistoryCard from "./SessionHistoryCard";

export default function StudySessionScreen({ email }) {
  /* React states */
  // React-redux global states
  const timerOngoing = useSelector((state) => state.timer.value);
  // Conditional rendering
  const [sessionCreationCard, openSessionCreationCard] = useState(false);
  const [sessionHistoryCardOpen, setSessionHistoryCardOpen] = useState(false);
  // User data storage
  const [sessionHistoryArray, setSessionHistory] = useState([]);

  /* Component Functionality */
  async function retrieveSessionHistory() {
    const { data, error } = await supabase
      .from("studysessions")
      .select("created_at, duration, completed")
      .eq("user_email", email);

    setSessionHistory(data);
  }

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

  return (
    <ThemeProvider theme={ariaTheme}>
      <Container
        sx={{
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
                border: "5px solid #966f33",
                backgroundColor: "#B5A197",
              }}
              elevation={10}
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
    </ThemeProvider>
  );
}
