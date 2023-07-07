// mui imports
import {
  Button,
  Card,
  Container,
  Paper,
  IconButton,
  Stack,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
// react imports
import { useEffect, useState } from "react";
// supabase imports
import { supabase } from "../../supabase";
// component imports
import ModuleCard from "./ModuleCard";
import ConfirmPopup from "../Universal/ConfirmPopup";
import { possibleFontColors } from "../themes";

export default function SemesterContainer({
  nusModsData,
  presentTheme,
  calculateGPA,
  yearID,
  semID,
  userID,
}) {
  /* Component variables */
  const gradeList = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "D+",
    "D",
    "F",
    "S",
    "U",
    "CS",
    "CU",
    "IP",
    "IC",
    "W",
  ];
  const moduleCodeList = nusModsData.map(({ moduleCode }) => moduleCode);
  const moduleTitleList = nusModsData.map(({ title }) => title);
  const moduleCreditsList = nusModsData.map(({ moduleCredit }) => moduleCredit);

  /* React states */
  // Conditional rendering
  const [addModForm, showAddModForm] = useState(false);
  const [clearAllButton, setClearAllButton] = useState(true);
  const [confirmPopup, openConfirmPopup] = useState(false);

  // User data storage
  const [userModArray, setModArray] = useState([]);
  const userModCodes = userModArray.map(({ code }) => code);
  // const [userID, setUserID] = useState("");

  // Internal bad user input handling
  const [emptyFields, setEmptyFields] = useState(false);
  const [existingMod, setExistingMod] = useState(false);

  // Autocomplete + dropdown rendering
  const [modCodeOptions, showModCodeOptions] = useState(false);
  const [grade, setGrade] = useState("");

  /* Component functionality */
  async function createMod(e) {
    e.preventDefault();
    setClearAllButton(!clearAllButton);
    setEmptyFields(false);
    setExistingMod(false);
    setGrade("");
    showAddModForm(!addModForm);
  }

  function hasNumber(str) {
    return /\d/.test(str);
  }

  async function addMod(e) {
    e.preventDefault();

    const moduleCode = document.getElementById("moduleCode").value;

    if (userModCodes.includes(moduleCode)) {
      setExistingMod(!existingMod);
      return;
    }

    if (moduleCode === "" || grade === "") {
      setEmptyFields(!emptyFields);
      return;
    }

    let moduleTitle = moduleTitleList[moduleCodeList.indexOf(moduleCode)];
    let moduleCredits = moduleCreditsList[moduleCodeList.indexOf(moduleCode)];
    let moduleType = hasNumber(moduleCode.slice(0, 3))
      ? moduleCode.slice(0, 2)
      : moduleCode.slice(0, 3);

    await supabase.from("modules").insert({
      user_id: userID,
      year: yearID,
      semester: semID,
      code: moduleCode,
      title: moduleTitle ?? "",
      credits: moduleCredits ?? 0,
      lettergrade: grade,
      type: moduleType,
    });

    // setUserID(user.id);
    showAddModForm(false);
    setClearAllButton(true);
    retrieveUserMods();
    calculateGPA();
    setGrade("");
  }

  async function retrieveUserMods() {
    const { data, error } = await supabase
      .from("modules")
      .select("code, title, credits, lettergrade, type")
      .match({
        user_id: userID,
        year: yearID,
        semester: semID,
      });

    // setUserID(user.id);
    setModArray(data);
  }

  async function deleteAllMods(e) {
    const { error } = await supabase.from("modules").delete().match({
      user_id: userID,
      year: yearID,
      semester: semID,
    });

    openConfirmPopup(false);
    retrieveUserMods();
    calculateGPA();
  }

  function confirmDeleteAll(e) {
    e.preventDefault();
    openConfirmPopup(true);
  }

  function closePopUp(e) {
    e.preventDefault();
    openConfirmPopup(false);
  }

  useEffect(() => {
    retrieveUserMods();
  }, []);

  const handleGradeInput = (event) => {
    setGrade(event.target.value);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 300,
  });

  const moduleCardProps = {
    presentTheme,
    possibleFontColors,
    userModCodes,
    nusModsData,
    yearID,
    semID,
    retrieveUserMods,
    calculateGPA,
    gradeList,
    userID,
  };

  return (
    <Container
      id="semester-container"
      sx={{
        maxWidth: "90%",
        padding: 2,
        borderStyle: "dotted",
      }}
    >
      <Paper
        id="semester-container-header"
        sx={{
          padding: 0.5,
          textAlign: "center",
          fontSize: 30,
          color: possibleFontColors[presentTheme],
        }}
        elevation={3}
      >
        Sem {semID}
        <IconButton
          id="create-mod-button"
          sx={{ marginLeft: "auto", color: possibleFontColors[presentTheme] }}
          onClick={createMod}
        >
          <AddCircle />
        </IconButton>
      </Paper>
      {addModForm && (
        <Card
          id="add-mod-form"
          sx={{
            marginTop: 2,
            padding: 2,
            backgroundColor: "white",
          }}
          elevation={0}
        >
          <Stack direction="column" spacing={2}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                open={modCodeOptions}
                onInputChange={(_, value) => {
                  if (value.length === 0) {
                    if (modCodeOptions) showModCodeOptions(false);
                  } else {
                    if (!modCodeOptions) showModCodeOptions(true);
                  }
                }}
                sx={{ color: "white" }}
                onClose={() => showModCodeOptions(false)}
                filterOptions={filterOptions}
                noOptionsText="Module not found"
                id="moduleCode"
                options={moduleCodeList}
                renderInput={(params) => (
                  <TextField {...params} label="Course Code" />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Course Grade
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="moduleGrade"
                value={grade}
                label="Course Grade"
                onChange={handleGradeInput}
              >
                {gradeList.map((gradeValue, index) => (
                  <MenuItem key={index} value={gradeValue}>
                    {gradeValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {existingMod && (
              <h6 style={{ textAlign: "center" }}>Already added!</h6>
            )}
            {emptyFields && (
              <h6 style={{ textAlign: "center" }}>No empty fields!</h6>
            )}
            <FormControl>
              <Button
                id="add-mod-button"
                color="secondary"
                sx={{ fontFamily: "inherit", fontSize: 20 }}
                onClick={addMod}
                variant="contained"
              >
                Add Course
              </Button>
            </FormControl>
          </Stack>
        </Card>
      )}
      {confirmPopup && (
        <ConfirmPopup
          closePopUp={closePopUp}
          proceedAction={deleteAllMods}
          popupText="Are you sure? This action is irreversible"
        />
      )}
      {clearAllButton && !confirmPopup && (
        <Button
          id="clear-all-button"
          disabled={userModArray.length === 0}
          sx={{
            fontFamily: "inherit",
            fontSize: 15,
            marginTop: 2,
          }}
          variant="contained"
          onClick={confirmDeleteAll}
        >
          Clear All
        </Button>
      )}
      {userModArray.map((mod, index) => (
        <ModuleCard {...mod} {...moduleCardProps} key={index} />
      ))}
      {/* <ModuleCodes modData={modData} /> */}
    </Container>
  );
}
