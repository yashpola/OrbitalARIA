import { Box, Container, Grid, Paper } from "@mui/material";
import { Help, SentimentVeryDissatisfied } from "@mui/icons-material";

import YearContainer from "./YearContainer";

export default function GradePointArchiveScreen() {
  return (
    <>
      <Paper
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 5,
          padding: 2,
          fontSize: 40,
          backgroundColor: "white",
        }}
        elevation={0}
      >
        Current GPA: 1.69 &nbsp; <SentimentVeryDissatisfied />
      </Paper>
      {/* <Container sx={{ padding: 0 }}> */}
      <Grid container spacing={15}>
        <Grid item xs={12}>
          <Container sx={{ padding: 2, backgroundColor: "#A86868" }}>
            <YearContainer yearID="Year 1" />
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Container sx={{ padding: 2, backgroundColor: "#A86868" }}>
            <YearContainer yearID="Year 2" />
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Container sx={{ padding: 2, backgroundColor: "#A86868" }}>
            <YearContainer yearID="Year 3" />
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Container sx={{ padding: 2, backgroundColor: "#A86868" }}>
            <YearContainer yearID="Year 4" />
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Container sx={{ padding: 2, backgroundColor: "#A86868" }}>
            <YearContainer yearID="Year 5" />
          </Container>
        </Grid>
      </Grid>
      {/* </Container> */}
    </>
  );
}

// import {
//   Card,
//   Container,
//   ThemeProvider,
//   IconButton,
//   Paper,
//   List,
//   ListItem,
// } from "@mui/material";
// import { ariaTheme } from "../../App";
// import RecordCard from "./RecordCard";
// import { Help, AddCircle } from "@mui/icons-material";
// import { useState } from "react";

// export default function GradePointArchiveScreen() {
//   const [helpMessage, setHelpMessage] = useState(false);

//   function displayHelpMessage(e) {
//     e.preventDefault();
//     setHelpMessage(true);
//   }

//   function closeHelpMessage(e) {
//     e.preventDefault();
//     setHelpMessage(false);
//   }

//   return (
//     <ThemeProvider theme={ariaTheme}>
//       <IconButton
//         sx={{ color: "black", float: "right" }}
//         id="help-button"
//         aria-label="info-help"
//         size="large"
//         onMouseOver={displayHelpMessage}
//         onMouseOut={closeHelpMessage}
//       >
//         <Help fontSize="inherit" />
//       </IconButton>
//       <br />
//       {helpMessage && (
//         <Card sx={{ marginBottom: 1, float: "right" }}>
//           <List>
//             <ListItem>Use the + button to add a card.</ListItem>
//             <ListItem>Click a card to explore it.</ListItem>
//           </List>
//         </Card>
//       )}
//       <Paper
//         style={{
//           backgroundColor: "transparent",
//           color: "black",
//           fontSize: 40,
//           fontStyle: "italic",
//           textAlign: "center",
//         }}
//         elevation={0}
//       >
//         YEARS
//       </Paper>
//       <Container
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           alignItems: "center",
//           justifyContent: "center",

//           margin: "auto",
//           marginTop: 5,
//           marginBottom: 5,
//           border: "2px solid white",
//           backgroundColor: "#a86868",
//         }}
//       >
//         <RecordCard cardInfo="Year 1" />
//         <RecordCard cardInfo="Year 2" />
//         <RecordCard cardInfo="Year 3" />
//         <RecordCard cardInfo="Year 4" />
//         <RecordCard cardInfo="Year 5" />
//         <IconButton aria-label="Add-Card" sx={{ color: "white" }} size="large">
//           <AddCircle fontSize="inherit" />
//         </IconButton>
//       </Container>
//     </ThemeProvider>
//   );
// }
