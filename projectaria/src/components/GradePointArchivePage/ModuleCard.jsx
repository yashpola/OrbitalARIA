// mui imports
import {
  Autocomplete,
  Card,
  createFilterOptions,
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
  userModCodes,
  nusModsData,
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
  /* Module Info from NUSMODS */
  const moduleCodeList = nusModsData.map(({ moduleCode }) => moduleCode);
  const moduleTitleList = nusModsData.map(({ title }) => title);
  const moduleCreditsList = nusModsData.map(({ moduleCredit }) => moduleCredit);

  /* React States */
  // Autocomplete + dropdown rendering
  const [grade, setGrade] = useState("");
  const [modCodeOptions, showModCodeOptions] = useState(false);

  // Internal bad user input handling
  const [existingMod, setExistingMod] = useState(false);

  // Conditional rendering
  const [editForm, setEditForm] = useState(false);

  /* Component Functionality */
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
    setExistingMod(false);
  }

  async function editMod(e) {
    e.preventDefault();

    const newModCode = document.getElementById("newModCode").value;

    if (userModCodes.includes(newModCode)) {
      setExistingMod(!existingMod);
      return;
    }

    let newModTitle = moduleTitleList[moduleCodeList.indexOf(newModCode)];
    let newModCredits =
      moduleCreditsList[
        moduleCodeList.indexOf(newModCode === "" ? code : newModCode)
      ];

    const { error } = await supabase
      .from("modules")
      .update({
        code: newModCode === "" ? code : newModCode,
        title: newModTitle ?? title,
        credits: newModCredits ?? credits,
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
    setGrade("");
  }

  const handleGradeInput = (event) => {
    setGrade(event.target.value);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 300,
  });

  return (
    <ThemeProvider theme={ariaTheme}>
      <Card id="mod-container" sx={{ marginTop: 3, padding: 2 }}>
        <Paper
          id="mod-header"
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
            id="edit-mod-form-button"
            onClick={openEditForm}
            sx={{ marginLeft: "auto", color: "white" }}
          >
            <Edit />
          </IconButton>
          <IconButton
            id="delete-mod-button"
            onClick={deleteMod}
            sx={{ marginLeft: "auto", color: "white" }}
          >
            <Delete />
          </IconButton>
        </Paper>
        <h5 id="mod-title">{title}</h5>
        <h5 id="mod-credits" style={{ float: "right" }}>
          {credits}mc
        </h5>
        {editForm && (
          <Stack sx={{ marginTop: 5 }} direction="column" spacing={2}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                filterOptions={filterOptions}
                onInputChange={(_, value) => {
                  if (value.length === 0) {
                    if (modCodeOptions) showModCodeOptions(false);
                  } else {
                    if (!modCodeOptions) showModCodeOptions(true);
                  }
                }}
                onClose={() => showModCodeOptions(false)}
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
                onChange={handleGradeInput}
              >
                {gradeList.map((gradeValue, index) => (
                  <MenuItem key={index} value={gradeValue}>
                    {gradeValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              {existingMod && (
                <h6 style={{ textAlign: "center" }}>Already added!</h6>
              )}
              <Button
                id="edit-mod-button"
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
