import {
  Container,
  IconButton,
  Stack,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useState } from "react";

export default function HelpRequest({ closeSupportTicket }) {
  const [helpRequestSent, setHelpRequestSent] = useState(false);
  function changeHelpRequestMessage(e) {
    e.preventDefault();
    setHelpRequestSent(true);
  }

  return (
    <Container
      sx={{
        // display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid black",
        padding: 2,
        backgroundColor: "white",
        color: "white",
        fontSize: "1.5vw",
      }}
      elevation={5}
    >
      <h2
        style={{
          color: "black",
          textAlign: "center",
        }}
      >
        {helpRequestSent
          ? "Help request sent! You may close this popup now"
          : "Send help request"}
      </h2>
      <IconButton onClick={closeSupportTicket} size="large" aria-label="cancel">
        <Cancel />
      </IconButton>
      <Stack direction="column" spacing={2}>
        <FormControl>
          <TextField
            fullWidth
            id="originEmail"
            label="Your Email"
            placeholder="user email"
            multiline
          ></TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="helpRequest"
            label="Help Request"
            placeholder="help request"
            multiline
            rows={4}
          ></TextField>
        </FormControl>
        <Button
          sx={{
            fontWeight: "bold",
          }}
          color="secondary"
          variant="contained"
          onClick={changeHelpRequestMessage}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
}
