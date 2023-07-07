// mui imports
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
// component imports
import {
  accordionColoring,
  possibleFontColors,
  possibleThemes,
} from "../themes";

export default function LandingAccordion({ presentTheme }) {
  return (
    <Paper
      sx={{
        backgroundColor: "transparent",
        margin: "auto",
        maxWidth: "70%",
      }}
    >
      <Accordion
        sx={{
          backgroundColor: accordionColoring[`${presentTheme}Dark`],
          "& .MuiAccordionSummary-content": {
            justifyContent: "center",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ color: "white" }}
        >
          User Accounts
        </AccordionSummary>
        <AccordionDetails sx={{ color: "white", textAlign: "center" }}>
          Personalized website experience with secure authentication
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: accordionColoring[`${presentTheme}Medium`],
          "& .MuiAccordionSummary-content": {
            justifyContent: "center",
          },
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
        <AccordionDetails sx={{ color: "white", textAlign: "center" }}>
          A record of all your module grades across semesters and years. Stay
          updated on your academic health.
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: accordionColoring[`${presentTheme}Light`],
          "& .MuiAccordionSummary-content": {
            justifyContent: "center",
          },
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
        <AccordionDetails sx={{ color: "white", textAlign: "center" }}>
          A source of motivation for your daily study goals. Keep tabs on the
          work you do.
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}
