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
} from "@mui/material";

export default function SessionHistoryCard({ sessionHistoryArray }) {
  console.log(sessionHistoryArray);

  return (
    <Container>
      <Card
        sx={{
          height: "445px",
          maxWidth: "380px",
          width: "400px",
          overflow: "auto",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ backgroundColor: "#DC9A7F" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontFamily: "Ubuntu", color: "white" }}
                  align="left"
                >
                  Created At{" "}
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
                  Completion Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
