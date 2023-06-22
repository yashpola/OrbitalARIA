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

export default function SessionHistoryCard({
  email,
  retrieveSessionHistory,
  sessionHistoryArray,
  setSessionHistoryCardOpen,
}) {
  /* Component functionality */
  async function clearSessionHistory(e) {
    e.preventDefault();
    const { error } = await supabase
      .from("studysessions")
      .delete()
      .eq("user_email", email);

    retrieveSessionHistory();
  }

  function closeSessionHistory(e) {
    e.preventDefault();
    setSessionHistoryCardOpen(false);
  }

  return (
    <Container>
      <Card
        id="session-history-container"
        sx={{
          height: "445px",
          overflow: "auto",
          padding: 2,
        }}
      >
        <Button
          id="clear-session-history-button"
          sx={{ float: "right", fontFamily: "inherit", marginBottom: 2 }}
          color="secondary"
          disabled={sessionHistoryArray.length === 0}
          onClick={clearSessionHistory}
          variant="outlined"
        >
          Clear History
        </Button>
        <IconButton
          id="close-session-history-button"
          onClick={closeSessionHistory}
          sx={{ float: "left", color: "black" }}
        >
          <Cancel fontSize="inherit" />
        </IconButton>
        <br />
        <TableContainer component={Paper}>
          <Table id="session-history-table" sx={{ backgroundColor: "#DC9A7F" }}>
            <TableHead id="session-history-table-header">
              <TableRow>
                <TableCell
                  sx={{ fontFamily: "Ubuntu", color: "white" }}
                  align="left"
                >
                  Timestamp
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Ubuntu", color: "white" }}
                  align="left"
                >
                  Duration
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Ubuntu", color: "white" }}
                  align="left"
                >
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
                  <TableCell
                    sx={{ fontFamily: "Ubuntu", color: "white" }}
                    align="left"
                  >
                    <p>{session.created_at}</p>
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Ubuntu", color: "white" }}
                    align="left"
                  >
                    <p>
                      {session.duration.hours === ""
                        ? 0
                        : session.duration.hours}
                      h {session.duration.minutes}m
                    </p>
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Ubuntu", color: "white" }}
                    align="left"
                  >
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
