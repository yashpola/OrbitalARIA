// mui imports
import {
  Button,
  Card,
  FilledInput,
  Paper,
  Grid,
  InputLabel,
  IconButton,
  FormControl,
  ThemeProvider,
  InputAdornment,
  Stack,
} from "@mui/material";
import { AccountCircle, Email, Edit, Logout } from "@mui/icons-material";
// supabase imports
import { supabase } from "../../supabase";
// react imports
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// component imports
import UniversalPopup from "../Universal/UniversalPopup";
import { ariaTheme } from "../../App";
import { toggle } from "../StudySessionPage/studySessionSlice";
import ProfilePicture from "./ProfilePicture";

export default function UserProfile({
  src,
  setSrc,
  fetchProfilePicture,
  currentUserEmailData,
  username,
  setUsername,
  email,
}) {
  /* React States */

  // conditional Rendering
  const [usernameFormOpen, setUsernameFormOpen] = useState(false);
  const [emailFormOpen, setEmailFormOpen] = useState(false);

  // internal Checking of Fields
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  // supabase authentication success / failure
  const [emailChangeNotif, setEmailChangeNotif] = useState(false);

  // react-redux global states
  const timerOngoing = useSelector((state) => state.timer.value);
  const dispatch = useDispatch();

  /* Component functionality */

  // internal form rendering functions (event handlers)

  function handleUsernameForm(e) {
    e.preventDefault();
    setUsernameFormOpen(!usernameFormOpen);
    setInvalidUsername(false);
  }

  function handleEmailForm(e) {
    e.preventDefault();
    setEmailFormOpen(!emailFormOpen);
    setInvalidEmail(false);
  }

  function signOut(e) {
    e.preventDefault();
    supabase.auth.signOut();
  }

  // supabase update user info functions

  async function updateUsername(e) {
    e.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const validUsernameRegex = /^[a-zA-Z]/;

    const { data } = await supabase.from("users").select("username");

    const currentUserUsernameData = data.map(({ username }) => username);

    if (currentUserUsernameData.includes(newUsername)) {
      setUsernameTaken(true);
      return;
    } else {
      setUsernameTaken(false);
    }

    if (newUsername.match(validUsernameRegex)) {
      await supabase.storage
        .from("userimages")
        .move(`${username}.jpg`, `${newUsername}.jpg`);
      await supabase.auth.updateUser({
        data: { username: newUsername },
      });
      await supabase
        .from("users")
        .update({ username: newUsername })
        .eq("email", email);

      setUsername(newUsername);
      setUsernameFormOpen(false);
      setInvalidUsername(false);
    } else {
      setInvalidUsername(true);
    }
  }

  async function updateEmail(e) {
    e.preventDefault();
    const newEmail = document.getElementById("newEmail").value;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (currentUserEmailData.includes(newEmail)) {
      setEmailTaken(true);
      return;
    } else {
      setEmailTaken(false);
    }

    if (newEmail.match(validRegex)) {
      await supabase.auth.updateUser({
        email: newEmail,
      });
      setEmailFormOpen(false);
      setEmailChangeNotif(true);
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  }

  // popup functions

  function closePopUp(e) {
    e.preventDefault();
    setEmailChangeNotif(false);
  }

  function closeSessionTerminatedPopUp(e) {
    e.preventDefault();
    dispatch(toggle());
  }

  // profile picture props
  const pfpProps = {
    src,
    setSrc,
    fetchProfilePicture,
    username,
    email,
  };

  return (
    <ThemeProvider theme={ariaTheme}>
      {emailChangeNotif && (
        <UniversalPopup
          closePopUp={closePopUp}
          popupText="Please check both your old and new emails for a 
            successful email change"
        />
      )}
      {timerOngoing && (
        <UniversalPopup
          closePopUp={closeSessionTerminatedPopUp}
          popupText="Your ongoing session was terminated."
        />
      )}
      <Card
        id="user-profile-container"
        sx={{
          width: "80%",
          margin: "auto",
          marginTop: 5,
        }}
      >
        <Card
          sx={{
            padding: 3,
            background: "transparent",
            textAlign: "center",
            whiteSpace: "pre-wrap",
            backgroundColor: "#DC9A7F",
          }}
          elevation={0}
        >
          <h2>
            <i style={{ color: "#4e1530" }}>ARIA</i>
            &nbsp; ID
          </h2>
        </Card>
        <Grid container sx={{ padding: 2 }} spacing={2}>
          <ProfilePicture {...pfpProps} />
          <Grid item xs={12} sm={4}>
            <Stack spacing={4}>
              <Paper>
                <Paper
                  id="username-card"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    backgroundColor: "#A86868",
                    color: "white",
                    lineHeight: "60px",
                    border: "1px solid black",
                  }}
                >
                  <AccountCircle sx={{ margin: 1, float: "left" }} />
                  {username}
                </Paper>
                <IconButton
                  id="edit-username-button"
                  onClick={handleUsernameForm}
                  sx={{ float: "right", color: "black" }}
                  size="large"
                >
                  <Edit fontSize="inherit" />
                </IconButton>
              </Paper>
              {usernameFormOpen && (
                <>
                  <FormControl>
                    <InputLabel htmlFor="newUsername">New Username</InputLabel>
                    <FilledInput
                      id="newUsername"
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {usernameTaken && <h6>Username Taken!</h6>}
                  <FormControl
                    sx={{
                      marginTop: 2,
                    }}
                  >
                    <Button
                      id="update-username-button"
                      sx={{ fontFamily: "inherit" }}
                      color="secondary"
                      onClick={updateUsername}
                      variant="outlined"
                    >
                      Update
                    </Button>
                    <br />
                    {invalidUsername && (
                      <p
                        style={{
                          marginTop: 10,
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Invalid Username!
                      </p>
                    )}
                  </FormControl>
                </>
              )}
              <Paper>
                <Paper
                  id="user-email-card"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    backgroundColor: "#A86868",
                    color: "white",
                    lineHeight: "60px",
                    border: "1px solid black",
                    overflow: "auto",
                  }}
                >
                  <Email sx={{ margin: 1, float: "left" }} />
                  {email}
                </Paper>
                <IconButton
                  id="edit-email-button"
                  onClick={handleEmailForm}
                  sx={{ float: "right", color: "black" }}
                  size="large"
                >
                  <Edit fontSize="inherit" />
                </IconButton>
              </Paper>
              {emailFormOpen && (
                <>
                  <FormControl>
                    <InputLabel htmlFor="newEmail">New Email</InputLabel>
                    <FilledInput
                      id="newEmail"
                      type="text"
                      startAdornment={
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {emailTaken && <h6>Email Taken!</h6>}
                  <FormControl
                    sx={{
                      marginTop: 2,
                    }}
                  >
                    <Button
                      id="update-email-button"
                      sx={{ fontFamily: "inherit" }}
                      color="secondary"
                      onClick={updateEmail}
                      variant="outlined"
                    >
                      Update
                    </Button>
                    {invalidEmail && (
                      <p
                        style={{
                          marginTop: 10,
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Invalid Email!
                      </p>
                    )}
                    <br />
                  </FormControl>
                </>
              )}
              <Button
                id="sign-out-button"
                sx={{
                  borderWidth: 3,
                  fontFamily: "inherit",
                }}
                color="secondary"
                onClick={signOut}
                variant="outlined"
                endIcon={<Logout />}
              >
                Sign Out
              </Button>
              {/* <Button
                sx={{
                  fontWeight: "bold",
                  fontFamily: "inherit",
                  border: "2px solid red",
                  color: "red",
                }}
                variant="outlined"
                onClick={confirmDeleteAccount}
              >
                Delete Account
              </Button> */}
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  );
}
