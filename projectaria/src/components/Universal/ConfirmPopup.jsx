// mui imports
import { Button, Card, Paper, ThemeProvider } from "@mui/material";
// react imports
import { useSelector } from "react-redux";
// component imports
import { possibleThemes, buttonColors } from "../themes";

export default function ConfirmPopup({
  popupText,
  closePopUp,
  proceedAction,
  timerOngoing,
}) {
  const presentTheme = useSelector((state) => state.currentTheme.value);

  return (
    <ThemeProvider theme={possibleThemes[presentTheme]}>
      <Card
        sx={{
          display: "block",
          margin: "auto",
          justifyContent: "center",
          textAlign: "center",
          padding: 3,
          marginTop: 2,
          border: "1px solid black",
        }}
        elevation={0}
      >
        <Paper
          sx={{
            padding: 2,
            fontSize: 20,
            marginBottom: 2,
            backgroundColor: "#eee",
          }}
          elevation={1}
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
          onClick={proceedAction}
        >
          Proceed
        </Button>
        <Button
          sx={{
            marginLeft: 2,
            fontWeight: "bold",
          }}
          color={buttonColors[presentTheme]}
          variant="contained"
          onClick={closePopUp}
        >
          Cancel
        </Button>
      </Card>
    </ThemeProvider>
  );
}
