// mui imports
import { Grid, Box, Paper, Stack, Avatar } from "@mui/material";
// React imports
import { useSelector, useDispatch } from "react-redux";
// React components
import userProfileIcon from "../images/landingimages/userprofile.png";
import gradePointArchiveIcon from "../images/landingimages/gradepointarchive.png";
import studySessionIcon from "../images/landingimages/studysession.png";
import { toggle } from "../StudySessionPage/studySessionSlice";
import UniversalPopup from "../Universal/UniversalPopup";
import LandingAccordion from "./LandingAccordion";

export default function LandingScreen() {
  // Redux global state
  const timerOngoing = useSelector((state) => state.timer.value);
  const dispatch = useDispatch();

  function closePopUp(e) {
    e.preventDefault();
    dispatch(toggle());
  }

  return (
    <>
      {timerOngoing && (
        <UniversalPopup
          closePopUp={closePopUp}
          popupText="Your ongoing session was terminated"
        />
      )}
      <Grid container spacing={4} sx={{ backgroundColor: "white", padding: 2 }}>
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: "transparent",
              textAlign: "center",
              marginTop: "20%",
            }}
            elevation={0}
          >
            <div style={{ color: "black", fontSize: 100 }}>aria</div>
            <div style={{ color: "#4e1530", fontSize: 20 }}>
              artificial resource for interactive academics
            </div>
            <Box>
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                <Avatar
                  src={userProfileIcon}
                  sx={{ height: 150, width: 150 }}
                  alt="User Profile"
                ></Avatar>
                <Avatar
                  src={gradePointArchiveIcon}
                  sx={{ height: 150, width: 150 }}
                  alt="Grade Point Archive"
                ></Avatar>
                <Avatar
                  src={studySessionIcon}
                  sx={{ height: 150, width: 150 }}
                  alt="Study Session"
                ></Avatar>
              </Stack>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LandingAccordion />
        </Grid>
        <Box sx={{ height: "100vh" }}></Box>
      </Grid>
    </>
  );
}
