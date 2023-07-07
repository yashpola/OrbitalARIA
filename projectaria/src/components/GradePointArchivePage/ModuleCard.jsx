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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
// react imports
import { useState } from "react";
// supabase imports
import { supabase } from "../../supabase";
// component imports

export default function ModuleCard({
  presentTheme,
  possibleFontColors,
  userModCodes,
  nusModsData,
  code,
  title,
  credits,
  lettergrade,
  retrieveUserMods,
  yearID,
  semID,
  userID,
  calculateGPA,
  gradeList,
}) {
  /* Module Info from NUSMODS */
  const moduleCodeList = nusModsData.map(({ moduleCode }) => moduleCode);
  const moduleTitleList = nusModsData.map(({ title }) => title);
  const moduleCreditsList = nusModsData.map(({ moduleCredit }) => moduleCredit);

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
      user_id: userID,
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
    setGrade("");
  }

  async function editMod(e) {
    e.preventDefault();

    let newModCode = document.getElementById("newModCode").value;

    if (newModCode !== "") {
      if (userModCodes.includes(newModCode)) {
        setExistingMod(true);
        return;
      } else {
        setExistingMod(false);
      }
    } else {
      newModCode = code;
    }

    let newModTitle = moduleTitleList[moduleCodeList.indexOf(newModCode)];
    let newModCredits = moduleCreditsList[moduleCodeList.indexOf(newModCode)];

    const { error } = await supabase
      .from("modules")
      .update({
        code: newModCode,
        title: newModTitle ?? "",
        credits: newModCredits ?? 0,
        lettergrade: grade === "" ? lettergrade : grade,
      })
      .match({
        user_id: userID,
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
    <Card
      id="mod-container"
      sx={{ backgroundColor: "white", marginTop: 3, padding: 2 }}
    >
      <Paper
        id="mod-header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          marginBottom: 2,
          // backgroundColor: "#6497B1",
          // backgroundColor: "white",
          fontSize: 20,
          color: possibleFontColors[presentTheme],
        }}
      >
        {code} ({lettergrade})
        <IconButton
          id="edit-mod-form-button"
          onClick={openEditForm}
          sx={{ marginLeft: "auto", color: possibleFontColors[presentTheme] }}
        >
          <Edit />
        </IconButton>
        <IconButton
          id="delete-mod-button"
          onClick={deleteMod}
          sx={{ marginLeft: "auto", color: possibleFontColors[presentTheme] }}
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
                <TextField {...params} label="New Course Code" />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="module-grade-label">New Module Grade</InputLabel>
            <Select
              labelId="module-grade-label"
              id="newModGrade"
              value={grade}
              label="New Course Grade"
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
              }}
              color="secondary"
              variant="contained"
              onClick={editMod}
            >
              Edit Course
            </Button>
          </FormControl>
        </Stack>
      )}
    </Card>
  );
}
