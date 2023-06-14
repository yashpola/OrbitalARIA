// mui imports
import {
  Button,
  Container,
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
import { useLayoutEffect, useState } from "react";
// component imports
import UniversalPopup from "../Universal/UniversalPopup";
import { ariaTheme } from "../../App";
import userProfileIcon from "../../userprofile.png";

export default function UserProfile() {
  /* React States */

  // internal Form Rendering
  const [usernameFormOpen, setUsernameFormOpen] = useState(false);
  const [emailFormOpen, setEmailFormOpen] = useState(false);

  // internal Checking of Fields
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);

  // internal username, email, pfp display
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [src, setSrc] = useState("userProfileIcon");

  // supabase authentication success / failure
  const [emailChangeNotif, setEmailChangeNotif] = useState(false);

  // mui aesthetic

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
    setUsername(user.user_metadata.username);
    setEmail(user.email);
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

  useLayoutEffect(() => {
    retrieveUserData();
  }, [username, src]);

  // popup functions

  function closePopUp(e) {
    e.preventDefault();
    setEmailChangeNotif(false);
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
      <Container
        sx={{
          marginTop: 5,
          paddingTop: 5,
          backgroundColor: "white",
        }}
      >
        <Grid container sx={{ padding: 2 }} spacing={2}>
          <Grid item xs={12} sm={8}>
            <img
              src={src}
              style={{ borderRadius: "50%", width: 200, height: 200 }}
            ></img>
            <input
              style={{ backgroundColor: "white" }}
              id="pfpInput"
              type="file"
              onChange={handlePictureSelected}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <Stack spacing={2}>
              <Paper
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: "#e9cdcd",
                  width: "300px",
                  lineHeight: "60px",
                  border: "1px solid black",
                }}
              >
                {username}
                <IconButton
                  onClick={handleUsernameForm}
                  sx={{ float: "right" }}
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
                      sx={{ width: "300px" }}
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
                      sx={{ width: "300px", fontFamily: "inherit" }}
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
              <Paper
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: "#e9cdcd",
                  width: "300px",
                  lineHeight: "60px",
                  border: "1px solid black",
                }}
              >
                {email}
                <IconButton
                  onClick={handleEmailForm}
                  sx={{ float: "right" }}
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
                      sx={{ width: "300px" }}
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
                      sx={{ width: "300px", fontFamily: "inherit" }}
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
                sx={{
                  width: "300px",
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
      </Container>
    </ThemeProvider>
  );
}
