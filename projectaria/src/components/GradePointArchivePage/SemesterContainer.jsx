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
  ThemeProvider,
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
import { ariaTheme } from "../../App";

export default function SemesterContainer({
  nusModsData,
  calculateGPA,
  yearID,
  semID,
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
  const [email, setEmail] = useState("");

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

  async function addMod(e) {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

    await supabase.from("modules").insert({
      user_email: user.email,
      year: yearID,
      semester: semID,
      code: moduleCode,
      title: moduleTitle ?? "",
      credits: moduleCredits ?? 0,
      lettergrade: grade,
    });

    setEmail(user.email);
    showAddModForm(false);
    setClearAllButton(true);
    retrieveUserMods();
    calculateGPA();
    setGrade("");
  }

  async function retrieveUserMods() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("modules")
      .select("code, title, credits, lettergrade")
      .match({
        user_email: user.email,
        year: yearID,
        semester: semID,
      });

    setEmail(user.email);
    setModArray(data);
  }

  async function deleteAllMods(e) {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("modules").delete().match({
      user_email: user.email,
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
    userModCodes,
    nusModsData,
    email,
    yearID,
    semID,
    retrieveUserMods,
    calculateGPA,
    gradeList,
  };

  return (
    <ThemeProvider theme={ariaTheme}>
      <Container
        id="semester-container"
        sx={{
          maxWidth: "90%",
          padding: 2,
          backgroundColor: "#eee",
          borderStyle: "dotted",
        }}
      >
        <Paper
          id="semester-container-header"
          sx={{
            padding: 0.5,
            textAlign: "center",
            fontSize: 30,
          }}
          elevation={3}
        >
          Sem {semID}
          <IconButton
            id="create-mod-button"
            sx={{ marginLeft: "auto", color: "black" }}
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
                  onClose={() => showModCodeOptions(false)}
                  filterOptions={filterOptions}
                  noOptionsText="Module not found"
                  id="moduleCode"
                  options={moduleCodeList}
                  renderInput={(params) => (
                    <TextField {...params} label="Module Code" />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Module Grade
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="moduleGrade"
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
              {existingMod && (
                <h6 style={{ textAlign: "center" }}>Already added!</h6>
              )}
              {emptyFields && (
                <h6 style={{ textAlign: "center" }}>No empty fields!</h6>
              )}
              <FormControl>
                <Button
                  id="add-mod-button"
                  sx={{ fontFamily: "inherit", fontSize: 20 }}
                  onClick={addMod}
                  variant="contained"
                >
                  Add Module
                </Button>
              </FormControl>
            </Stack>
          </Card>
        )}
        {confirmPopup && (
          <ConfirmPopup closePopUp={closePopUp} proceedAction={deleteAllMods} />
        )}
        {clearAllButton && !confirmPopup && (
          <Button
            id="clear-all-button"
            disabled={userModArray.length === 0}
            sx={{
              color: "black",
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
    </ThemeProvider>
  );
}
