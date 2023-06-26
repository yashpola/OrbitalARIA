// mui imports
import { Button, Card, Paper, ThemeProvider } from "@mui/material";
// component imports
import { ariaTheme } from "../../App";

export default function ConfirmPopup({ closePopUp, proceedAction }) {
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
          Are you sure? This action is irreversible.
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
