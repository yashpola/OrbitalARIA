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
  modData,
  calculateGPA,
  yearID,
  semID,
}) {
  const [addModForm, showAddModForm] = useState(false);
  const [modArray, setModArray] = useState([]);
  const [email, setEmail] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [clearAllButton, setClearAllButton] = useState(true);
  const [confirmPopup, openConfirmPopup] = useState(false);
  const [modCodeOptions, showModCodeOptions] = useState(false);

  const [grade, setGrade] = useState("");
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

  const moduleCodeList = modData.map(({ moduleCode }) => moduleCode);
  const moduleTitleList = modData.map(({ title }) => title);
  const moduleCreditsList = modData.map(({ moduleCredit }) => moduleCredit);

  const handleGradeInput = (event) => {
    setGrade(event.target.value);
  };

  async function createMod(e) {
    e.preventDefault();
    setClearAllButton(!clearAllButton);
    showAddModForm(!addModForm);
  }

  async function addMod(e) {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const moduleCode = document.getElementById("moduleCode").value;

    if (moduleCode === "" || grade === "") {
      setEmptyFields(true);
      return;
    }

    let moduleTitle = moduleTitleList[moduleCodeList.indexOf(moduleCode)];
    let moduleCredits = moduleCreditsList[moduleCodeList.indexOf(moduleCode)];

    if (!moduleTitle) {
      moduleTitle = "";
    }

    if (!moduleCredits) {
      moduleCredits = 0;
    }

    setEmptyFields(false);

    await supabase.from("modules").insert({
      user_email: user.email,
      year: yearID,
      semester: semID,
      code: moduleCode,
      title: moduleTitle,
      credits: moduleCredits,
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

  useEffect(() => {
    retrieveUserMods();
  }, []);

  function confirmDeleteAll(e) {
    e.preventDefault();
    openConfirmPopup(true);
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

  function closePopUp(e) {
    e.preventDefault();
    openConfirmPopup(false);
  }

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 300,
  });

  return (
    <ThemeProvider theme={ariaTheme}>
      <Container
        sx={{
          maxWidth: "90%",
          padding: 2,
          backgroundColor: "#eee",
          borderStyle: "dotted",
        }}
      >
        <Paper
          sx={{
            padding: 0.5,
            textAlign: "center",
            fontSize: 30,
          }}
          elevation={3}
        >
          Sem {semID}
          <IconButton
            sx={{ marginLeft: "auto", color: "black" }}
            onClick={createMod}
          >
            <AddCircle />
          </IconButton>
        </Paper>
        {addModForm && (
          <Card
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
                    <TextField {...params} label="Search Module Code" />
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
              {emptyFields && (
                <h6 style={{ textAlign: "center" }}>No empty fields!</h6>
              )}
              <FormControl>
                <Button
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
          <ConfirmPopup
            closePopUp={closePopUp}
            deleteAllMods={deleteAllMods}
            popupText="Are you sure? This action is irreversible"
          />
        )}
        {clearAllButton && !confirmPopup && (
          <Button
            // onClick={}
            disabled={modArray.length === 0}
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
        {modArray.map((mod, index) => (
          <ModuleCard
            {...mod}
            modData={modData}
            key={index}
            email={email}
            yearID={yearID}
            semID={semID}
            retrieveUserMods={retrieveUserMods}
            calculateGPA={calculateGPA}
            gradeList={gradeList}
          />
        ))}
        {/* <ModuleCodes modData={modData} /> */}
      </Container>
    </ThemeProvider>
  );
}
