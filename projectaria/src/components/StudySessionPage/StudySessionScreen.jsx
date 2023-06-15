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
import { supabase } from "../../supabase";
// component imports
import plantIcon from "../images/studysessionimages/plant.png";
import { ariaTheme } from "../../App";
import SessionCreationCard from "./SessionCreationCard";
import SessionHistoryCard from "./SessionHistoryCard";

export default function StudySessionScreen({ email }) {
  const [sessionCreationCard, openSessionCreationCard] = useState(false);
  const [sessionHistoryArray, setSessionHistory] = useState([]);
  const [sessionHistoryCardOpen, setSessionHistoryCardOpen] = useState(false);

  function newSession(e) {
    e.preventDefault();
    openSessionCreationCard(!sessionCreationCard);
    setSessionHistoryCardOpen(false);
  }

  async function sessionHistory(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("studysessions")
      .select("created_at, duration, completed")
      .eq("user_email", email);

    setSessionHistory(data);
    openSessionCreationCard(false);
    setSessionHistoryCardOpen(!sessionHistoryCardOpen);
  }

  return (
    <ThemeProvider theme={ariaTheme}>
      <Container>
        <Grid
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ padding: 10 }}
          container
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                display: "inline-flex",
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
                  color="secondary"
                  variant="contained"
                  sx={{
                    fontFamily: "Ubuntu",
                  }}
                >
                  New Session
                </Button>
                <Button
                  color="secondary"
                  onClick={sessionHistory}
                  variant="contained"
                  sx={{
                    fontFamily: "Ubuntu",
                  }}
                >
                  View Session History
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{
                    fontFamily: "Ubuntu",
                  }}
                >
                  View Statistics
                </Button>
              </Stack>
            </Card>
          </Grid>
          <Grid sx={{ textAlign: "center" }} item xs={12} sm={6}>
            {sessionCreationCard && (
              <SessionCreationCard
                email={email}
                openSessionCreationCard={openSessionCreationCard}
              />
            )}
            {sessionHistoryCardOpen && (
              <SessionHistoryCard sessionHistoryArray={sessionHistoryArray} />
            )}
          </Grid>
        </Grid>
      </Container>
      <img
        src={plantIcon}
        style={{ marginLeft: "auto", width: 300, height: 300 }}
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
