// mui imports
import { Button, Card, Paper, Stack, ThemeProvider } from "@mui/material";
// react imports
import { useSelector } from "react-redux";
// component imports
import { possibleThemes, buttonColors } from "../themes";

export default function UniversalPopup({ popupText, closePopUp }) {
  const presentTheme = useSelector((state) => state.currentTheme.value);

  return (
    <ThemeProvider theme={possibleThemes[presentTheme]}>
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
              backgroundColor: "#eee",
              color: "black",
            }}
            elevation={2}
          >
            <div id="universal-popup-text">{popupText}</div>
          </Paper>
          <Button
            sx={{
              fontWeight: "bold",
            }}
            color={buttonColors[presentTheme]}
            variant="contained"
            onClick={closePopUp}
          >
            Ok
          </Button>
        </Stack>
      </Card>
    </ThemeProvider>
  );
}
