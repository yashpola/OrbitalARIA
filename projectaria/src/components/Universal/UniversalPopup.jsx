// mui imports
import { Button, Card, Paper, Stack, ThemeProvider } from "@mui/material";
// component imports
import { ariaTheme } from "../../App";

export default function UniversalPopup({ popupText, closePopUp }) {
  return (
    <ThemeProvider theme={ariaTheme}>
      <Card
        sx={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          textAlign: "center",
          padding: 5,
          border: "1px solid black",
        }}
        elevation={5}
      >
        <Stack sx={{ alignItems: "center" }} direction="column" spacing={3}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: "#4e1530",
              color: "white",
            }}
          >
            {popupText}
          </Paper>
          <Button
            sx={{
              fontWeight: "bold",
            }}
            color="secondary"
            variant="contained"
            onClick={closePopUp}
          >
            Got it!
          </Button>
        </Stack>
      </Card>
    </ThemeProvider>
  );
}
