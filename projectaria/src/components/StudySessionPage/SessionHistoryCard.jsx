// mui imports
import {
  Container,
  Card,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
// supabase imports
import { supabase } from "../../supabase";
// component imports
import { buttonColors, possibleFontColors } from "../themes";

export default function SessionHistoryCard({
  userID,
  email,
  presentTheme,
  retrieveSessionHistory,
  sessionHistoryArray,
  setSessionHistoryCardOpen,
}) {
  /* Component functionality */
  async function clearSessionHistory(e) {
    e.preventDefault();
    await supabase.from("studysessions").delete().eq("user_id", userID);
    await supabase
      .from("stats")
      .upsert({
        user_email: email,
        failStreak: 0,
        successStreak: 0,
      })
      .select();
    retrieveSessionHistory();
  }

  function closeSessionHistory(e) {
    e.preventDefault();
    setSessionHistoryCardOpen(false);
  }

  return (
    <Container sx={{ backgroundColor: "transparent" }}>
      <Card
        id="session-history-container"
        sx={{
          // height: "445px",
          overflow: "auto",
          padding: 2,
        }}
        elevation={0}
      >
        <Button
          id="clear-session-history-button"
          sx={{
            float: "right",
            fontFamily: "inherit",
            marginBottom: 2,
          }}
          color={buttonColors[presentTheme]}
          disabled={sessionHistoryArray.length === 0}
          onClick={clearSessionHistory}
          variant="contained"
        >
          Clear History
        </Button>
        <IconButton
          id="close-session-history-button"
          onClick={closeSessionHistory}
          sx={{ float: "left", color: possibleFontColors[presentTheme] }}
        >
          <Cancel fontSize="inherit" />
        </IconButton>
        <br />
        <TableContainer component={Paper}>
          <Table id="session-history-table">
            <TableHead id="session-history-table-header">
              <TableRow>
                <TableCell sx={{ fontFamily: "Ubuntu" }} align="left">
                  Timestamp
                </TableCell>
                <TableCell sx={{ fontFamily: "Ubuntu" }} align="left">
                  Duration
                </TableCell>
                <TableCell sx={{ fontFamily: "Ubuntu" }} align="left">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="session-history-table-body">
              {sessionHistoryArray.map((session, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontFamily: "Ubuntu" }} align="left">
                    <p>{session.created_at}</p>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Ubuntu" }} align="left">
                    <p>
                      {session.duration.hours === ""
                        ? 0
                        : session.duration.hours}
                      h {session.duration.minutes}m
                    </p>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Ubuntu" }} align="left">
                    {session.completed ? (
                      <p style={{ color: "#32CD32" }}>Success</p>
                    ) : (
                      <p style={{ color: "red" }}>Failure</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
