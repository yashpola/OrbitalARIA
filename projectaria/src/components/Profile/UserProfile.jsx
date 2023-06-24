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
import {
  AccountCircle,
  Email,
  Edit,
  Construction,
  Key,
} from "@mui/icons-material";
// supabase imports
import { supabase } from "../../supabase";
// react imports
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// component imports
import UniversalPopup from "../Universal/UniversalPopup";
import { ariaTheme } from "../../App";
import userProfileIcon from "../../userprofile.png";
import { toggle } from "../StudySessionPage/studySessionSlice";

export default function UserProfile({
  currentUserPfpData,
  currentUserEmailData,
  currentUserUsernameData,
  username,
  setUsername,
  email,
}) {
  /* React States */

  // conditional Rendering
  const [usernameFormOpen, setUsernameFormOpen] = useState(false);
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [passwordUpdateForm, setPasswordUpdateForm] = useState(false);

  // internal Checking of Fields
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [passwordMatching, setPasswordMatching] = useState(true);

  // internal username, email, pfp display
  const [src, setSrc] = useState(undefined);
  const [profilePicError, setProfilePicError] = useState(false);

  // supabase authentication success / failure
  const [emailChangeNotif, setEmailChangeNotif] = useState(false);

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

    if (currentUserUsernameData.includes(newUsername)) {
      setUsernameTaken(true);
      return;
    } else {
      setUsernameTaken(false);
    }

    if (newUsername.match(validUsernameRegex)) {
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

  // internal username/email/pfp display functions

  async function setProfilePicture(e) {
    e.preventDefault();
    const imgSrc = document.getElementById("pfp-input-button").files[0];
    const { data, error } = await supabase.storage
      .from("public")
      .upload(`userimages/${username}.jpg`, imgSrc, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(error, error.message);
    }

    await supabase.from("users").update({ pfpset: true }).eq("email", email);
    setSrc(data.publicUrl);
  }

  // async function updateProfilePicture(e) {
  //   e.preventDefault();
  //   const newImgSrc = document.getElementById("pfp-input-button").files[0];
  //   const { data, error } = await supabase.storage
  //     .from("public")
  //     .update(`userimages/${username}.jpg`, newImgSrc, {
  //       cacheControl: "3600",
  //       upsert: true,
  //     });

  //   if (error) {
  //     console.error(error, error.message);
  //   }

  //   setSrc(data.publicUrl);
  // }

  async function fetchProfilePicture() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = supabase.storage
      .from("public")
      .getPublicUrl(`userimages/${user.user_metadata.username}.jpg`);

    if (error) {
      console.error(error, error.message);
      return;
    }

    setSrc(data.publicUrl);
  }

  useEffect(() => {
    fetchProfilePicture();
  }, [src]);

  // popup functions

  function closePopUp(e) {
    e.preventDefault();
    setEmailChangeNotif(false);
  }

  function closeSessionTerminatedPopUp(e) {
    e.preventDefault();
    dispatch(toggle());
  }

  async function updateUserPassword(e) {
    e.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    if (newPassword !== confirmNewPassword) {
      setPasswordMatching(false);
      return;
    } else {
      setPasswordMatching(true);
    }
    // const newPassword = prompt(
    //   "What would you like your new password to be?"
    // );
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (data) setPasswordUpdateSuccess(true);
    if (error) setPasswordUpdateError(true);
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        setPasswordUpdateForm(true);
      }
    });
  }, []);

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
          paddingTop: 5,
          backgroundColor: "white",
        }}
      >
        <Grid container sx={{ padding: 2 }} spacing={0}>
          <Grid item xs={12} sm={8}>
            <img
              id="pfp-image"
              src={src}
              style={{ borderRadius: "50%", width: 200, height: 200 }}
            />
            <br />
            <br />
            {profilePicError && (
              <h6 style={{ color: "black" }}>Error Fetching</h6>
            )}
            <Button
              // disabled={currentUserPfpData}
              color="secondary"
              sx={{ marginRight: 2, marginBottom: 3, fontFamily: "ubuntu" }}
              variant="contained"
              component="label"
            >
              Set PFP
              <input
                id="pfp-input-button"
                type="file"
                onChange={setProfilePicture}
                hidden
              />
            </Button>
            <Button
              disabled={true}
              color="secondary"
              sx={{ marginBottom: 3, fontFamily: "ubuntu" }}
              variant="contained"
              component="label"
            >
              Change PFP - Coming Soon <Construction />
              <input
                style={{ backgroundColor: "white", color: "white" }}
                id="pfp-input-button"
                type="file"
                // onChange={updateProfilePicture}
                hidden
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack spacing={2}>
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
              {passwordUpdateForm && (
                <div>
                  <Stack
                    sx={{
                      backgroundColor: "white",
                      padding: 5,
                      border: "2px solid black",
                    }}
                    direction="column"
                    spacing={2}
                  >
                    <FormControl>
                      <InputLabel htmlFor="newPassword">
                        New Password
                      </InputLabel>
                      <FilledInput
                        id="newPassword"
                        startAdornment={
                          <InputAdornment position="start">
                            <Key />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="confirmNewPassword">
                        Confirm New Password
                      </InputLabel>
                      <FilledInput
                        id="confirmnNewPassword"
                        startAdornment={
                          <InputAdornment position="start">
                            <Key />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    {!passwordMatching && <h6>Passwords do not match!</h6>}
                    {passwordUpdateSuccess && (
                      <h6>Password updated! You may login now.</h6>
                    )}
                    {passwordUpdateError && (
                      <h6>Error updating. Please try again later</h6>
                    )}
                    <FormControl>
                      <Button
                        onClick={updateUserPassword}
                        sx={{
                          fontFamily: "Ubuntu",
                          fontWeight: "bold",
                          color: "white",
                          backgroundColor: "#ff4b2b",
                        }}
                        variant="contained"
                      >
                        Reset Password
                      </Button>
                    </FormControl>
                  </Stack>
                </div>
              )}
              <Button
                id="sign-out-button"
                sx={{
                  borderWidth: 2,
                  fontFamily: "inherit",
                }}
                color="secondary"
                onClick={signOut}
                variant="outlined"
              >
                Sign Out
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  );
}
