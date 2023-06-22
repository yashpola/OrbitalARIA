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
import { AccountCircle, Email, Edit } from "@mui/icons-material";
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

export default function UserProfile({ username, setUsername, email }) {
  /* React States */

  // internal Form Rendering
  const [usernameFormOpen, setUsernameFormOpen] = useState(false);
  const [emailFormOpen, setEmailFormOpen] = useState(false);

  // internal Checking of Fields
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);

  // internal username, email, pfp display
  const [src, setSrc] = useState("userProfileIcon");

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
    const validUsernameRegex = /^[a-zA-Z]/;
    if (
      document.getElementById("newUsername").value.match(validUsernameRegex)
    ) {
      await supabase.auth.updateUser({
        data: { username: document.getElementById("newUsername").value },
      });
      setUsername(document.getElementById("newUsername").value);
      setUsernameFormOpen(false);
      setInvalidUsername(false);
    } else {
      setInvalidUsername(true);
    }
  }

  async function updateEmail(e) {
    e.preventDefault();
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (document.getElementById("newEmail").value.match(validRegex)) {
      await supabase.auth.updateUser({
        email: document.getElementById("newEmail").value,
      });
      setEmailFormOpen(false);
      setEmailChangeNotif(true);
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  }

  // internal username/email/pfp display functions

  async function retrieveUserData() {
    /* supabase.auth.getUser() here seems redundant. it could be removed and username/email 
    passed as props from NavBar, but removing it leads to the console logging a "pfp is undefined"
    error i.e. the user email needs to be explicitly retrieved again to be used for looking up 
    the user's pfp in the user table. can be resolved, but don't remove this method here
    */
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users")
      .select("pfp")
      .eq("email", user.email);
    if (error) {
      setSrc(userProfileIcon);
    }

    setSrc(data[0].pfp);
  }

  async function handlePictureSelected() {
    const pfpSrc = URL.createObjectURL(
      document.getElementById("pfpInput").files[0]
    );
    const { data } = await supabase
      .from("users")
      .update({
        pfp: pfpSrc,
      })
      .eq("email", email)
      .select();

    setSrc(data[0].pfp);
  }

  useEffect(() => {
    retrieveUserData();
  }, [username, src]);

  // popup functions

  function closePopUp(e) {
    e.preventDefault();
    setEmailChangeNotif(false);
  }

  function closeSessionTerminatedPopUp(e) {
    e.preventDefault();
    dispatch(toggle());
  }

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
            ></img>
            <input
              style={{ backgroundColor: "white" }}
              id="pfp-input-button"
              type="file"
              onChange={handlePictureSelected}
            />
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
