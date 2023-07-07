import { Button, Card, Box, Stack } from "@mui/material";
import {
  switchToNavy,
  switchToDesert,
  switchToNews,
  switchToForest,
} from "./themeSlice";
import { useDispatch } from "react-redux";

export default function ThemeOptionsCard() {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        padding: 2,
        // display: "inline-flex",
        backgroundColor: "#eee",
        // overflow: "auto",
      }}
    >
      <Stack direction="column" spacing={2}>
        <Button
          disabled={localStorage.getItem("storedTheme") === "Navy"}
          sx={{ backgroundColor: "#00204b", color: "white" }}
          variant="contained"
          onClick={() => (
            dispatch(switchToNavy()),
            localStorage.setItem("storedTheme", "Navy")
          )}
        >
          Navy
        </Button>
        <Button
          disabled={localStorage.getItem("storedTheme") === "Desert"}
          sx={{ backgroundColor: "#5B200D", color: "white" }}
          variant="contained"
          onClick={() => (
            dispatch(switchToDesert()),
            localStorage.setItem("storedTheme", "Desert")
          )}
        >
          Desert
        </Button>
        <Button
          disabled={localStorage.getItem("storedTheme") === "Forest"}
          sx={{ backgroundColor: "#18453B", color: "white" }}
          variant="contained"
          onClick={() => (
            dispatch(switchToForest()),
            localStorage.setItem("storedTheme", "Forest")
          )}
        >
          Forest
        </Button>
        <Button
          disabled={localStorage.getItem("storedTheme") === "News"}
          sx={{ backgroundColor: "black", color: "white" }}
          variant="contained"
          onClick={() => (
            dispatch(switchToNews()),
            localStorage.setItem("storedTheme", "News")
          )}
        >
          News
        </Button>
      </Stack>
    </Box>
  );
}
