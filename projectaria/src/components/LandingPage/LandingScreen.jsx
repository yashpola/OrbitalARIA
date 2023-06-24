// mui imports
import {
  Grid,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Avatar,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
// React imports
import { useSelector, useDispatch } from "react-redux";
// React components
import userProfileIcon from "../images/landingimages/userprofile.png";
import gradePointArchiveIcon from "../images/landingimages/gradepointarchive.png";
import studySessionIcon from "../images/landingimages/studysession.png";
import { toggle } from "../StudySessionPage/studySessionSlice";
import UniversalPopup from "../Universal/UniversalPopup";

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
          <Paper
            sx={{
              backgroundColor: "white",
              marginTop: "30%",
            }}
          >
            <Accordion
              sx={{
                backgroundColor: "#4e1530",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ color: "white" }}
              >
                User Profiling
              </AccordionSummary>
              <AccordionDetails sx={{ color: "white" }}>
                Personalized website experience with secure authentication
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: "#a86868",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "white" }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ color: "white" }}
              >
                GradePointArchive
              </AccordionSummary>
              <AccordionDetails sx={{ color: "white" }}>
                A record of all your module grades across semesters and years.
                Compute GPA at any point in your record
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: "#DC9A7F",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "white" }} />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                sx={{ color: "white" }}
              >
                StudySession
              </AccordionSummary>
              <AccordionDetails sx={{ color: "white" }}>
                Motivation to complete your daily study goals
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
        <Box sx={{ height: "100vh" }}></Box>
      </Grid>
    </>
  );
}
