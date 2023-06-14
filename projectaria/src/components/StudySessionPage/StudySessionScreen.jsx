// mui imports
import {
  Avatar,
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
// component imports
import plantIcon from "../images/studysessionimages/plant.png";
import { ariaTheme } from "../../App";
import SessionCreationCard from "./SessionCreationCard";

export default function StudySessionScreen() {
  const [sessionCreationCard, openSessionCreationCard] = useState(false);

  function newSession(e) {
    e.preventDefault();
    openSessionCreationCard(!sessionCreationCard);
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
          <Grid item xs={12} md={4} sm={6}>
            <Card
              sx={{
                display: "inline-flex",
                padding: 10,
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
                openSessionCreationCard={openSessionCreationCard}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Avatar
        src={plantIcon}
        sx={{ marginLeft: "auto", width: 300, height: 300 }}
      ></Avatar>
      <Paper
        square={true}
        fullWidth
        sx={{
          backgroundColor: "#966f33",
          padding: "3rem 3rem",
          borderTop: "1px solid #966f33",
        }}
      ></Paper>
    </ThemeProvider>
  );
}
