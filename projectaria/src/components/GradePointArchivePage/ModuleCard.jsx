// mui imports
import {
  Autocomplete,
  Card,
  Paper,
  IconButton,
  TextField,
  FormControl,
  Stack,
  Button,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
// react imports
import { useState } from "react";
// supabase imports
import { supabase } from "../../supabase";
// component imports
import { ariaTheme } from "../../App";

export default function ModuleCard({
  modData,
  code,
  title,
  credits,
  lettergrade,
  retrieveUserMods,
  yearID,
  semID,
  email,
  calculateGPA,
  gradeList,
}) {
  const [grade, setGrade] = useState("");

  const moduleCodeList = modData.map(({ moduleCode }) => moduleCode);
  const moduleTitleList = modData.map(({ title }) => title);
  const moduleCreditsList = modData.map(({ moduleCredit }) => moduleCredit);

  const handleChange = (event) => {
    setGrade(event.target.value);
  };
  const [editForm, setEditForm] = useState(false);

  async function deleteMod(e) {
    e.preventDefault();
    const { error } = await supabase.from("modules").delete().match({
      user_email: email,
      year: yearID,
      semester: semID,
      code: code,
      title: title,
    });

    retrieveUserMods();
    calculateGPA();
  }

  async function openEditForm(e) {
    e.preventDefault();
    setEditForm(!editForm);
  }

  async function editMod(e) {
    e.preventDefault();

    const newModCode = document.getElementById("newModCode").value;

    let newModTitle = moduleTitleList[moduleCodeList.indexOf(newModCode)];
    let newModCredits = moduleCreditsList[moduleCodeList.indexOf(newModCode)];

    if (!newModTitle) {
      newModTitle = "";
    }

    if (!newModCredits) {
      newModCredits = 0;
    }

    const { error } = await supabase
      .from("modules")
      .update({
        code: newModCode === "" ? code : newModCode,
        title: newModTitle === "" ? title : newModTitle,
        credits: newModCredits === "" ? credits : newModCredits,
        lettergrade: grade === "" ? lettergrade : grade,
      })
      .match({
        user_email: email,
        year: yearID,
        semester: semID,
        code: code,
        title: title,
      });

    setEditForm(false);
    retrieveUserMods();
    calculateGPA();
    setGrade(false);
  }

  return (
    <ThemeProvider theme={ariaTheme}>
      <Card sx={{ marginTop: 3, padding: 2 }}>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            marginBottom: 2,
            backgroundColor: "#4e1530",
            fontSize: 20,
            color: "white",
          }}
        >
          {code} ({lettergrade})
          <IconButton
            onClick={openEditForm}
            sx={{ marginLeft: "auto", color: "white" }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={deleteMod}
            sx={{ marginLeft: "auto", color: "white" }}
          >
            <Delete />
          </IconButton>
        </Paper>
        <h5>{title}</h5>
        <h5 style={{ float: "right" }}>{credits}mc</h5>
        {editForm && (
          <Stack sx={{ marginTop: 5 }} direction="column" spacing={2}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="newModCode"
                options={moduleCodeList}
                renderInput={(params) => (
                  <TextField {...params} label="Module Code" />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="module-grade-label">Module Grade</InputLabel>
              <Select
                labelId="module-grade-label"
                id="newModGrade"
                value={grade}
                label="Module Grade"
                onChange={handleChange}
              >
                {gradeList.map((gradeValue, index) => (
                  <MenuItem key={index} value={gradeValue}>
                    {gradeValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Button
                sx={{
                  fontFamily: "inherit",
                  fontSize: 20,
                  color: "black",
                }}
                variant="contained"
                onClick={editMod}
              >
                Edit Module
              </Button>
            </FormControl>
          </Stack>
        )}
      </Card>
    </ThemeProvider>
  );
}
