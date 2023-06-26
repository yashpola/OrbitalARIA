// mui imports
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function LandingAccordion() {
  return (
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
          A record of all your module grades across semesters and years. Compute
          GPA at any point in your record
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
  );
}
