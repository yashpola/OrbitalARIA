// mui imports
import { Button, Card, Paper, Stack, ThemeProvider } from "@mui/material";
// component imports
import { ariaTheme } from "../../App";

export default function ConfirmPopup({ popupText, closePopUp, deleteAllMods }) {
  return (
    <ThemeProvider theme={ariaTheme}>
      <Card
        sx={{
          display: "block",
          margin: "auto",
          justifyContent: "center",
          textAlign: "center",
          padding: 3,
          border: "1px solid black",
          marginTop: 5,
        }}
        elevation={0}
      >
        <Paper
          sx={{
            padding: 2,
            backgroundColor: "#e9cdcd",
            fontSize: 20,
            marginBottom: 2,
          }}
        >
          {popupText}
        </Paper>
        <Button
          sx={{
            backgroundColor: "red",
            fontWeight: "bold",
            color: "white",
          }}
          variant="contained"
          onClick={deleteAllMods}
        >
          Proceed
        </Button>
        <Button
          sx={{
            marginLeft: 2,
            fontWeight: "bold",
          }}
          color="secondary"
          variant="contained"
          onClick={closePopUp}
        >
          Cancel
        </Button>
      </Card>
    </ThemeProvider>
  );
}
