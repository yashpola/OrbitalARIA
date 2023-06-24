// mui imports
import {
  Stack,
  Checkbox,
  FormControlLabel,
  FormControl,
  FilledInput,
  Button,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Key } from "@mui/icons-material";
// react imports
import { React, useState, useEffect } from "react";
// supabase imports
import { supabase } from "../../supabase.js";
// component imports
import UniversalPopup from "../Universal/UniversalPopup.jsx";
import ForgotPasswordScreen from "../Universal/ForgotPasswordScreen.jsx";

export default function LoginScreen({
  currentUserEmailData,
  currentUserUsernameData,
}) {
  /* React States */

  // conditional rendering
  const [passwordUpdateForm, setPasswordUpdateForm] = useState(false);

  // internal bad user input handling
  const [passwordMatching, setPasswordMatching] = useState(true);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  // supabase states
  const [accountCreated, setAccountCreated] = useState(false);
  const [accountCreationFail, setAccountCreationFail] = useState(false);
  const [accountLoginFail, setAccountLoginFail] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

  // others
  const [passwordResetEmail, setPasswordResetEmail] = useState(false);

  /* Component functionality */

  // supabase login/signup functions
  async function logIn(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: document.getElementById("loginemail").value,
      password: document.getElementById("loginpassword").value,
    });

    if (error) {
      setAccountLoginFail(true);
    }
  }

  const validUsernameRegex = /^[a-zA-Z]/;
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  async function signUp(e) {
    e.preventDefault();

    const signUpUsername = document.getElementById("signupusername").value;
    const signUpEmail = document.getElementById("signupemail").value;
    const signUpPassword = document.getElementById("signuppassword").value;
    const confirmSignUpPassword = document.getElementById(
      "confirmsignuppassword"
    ).value;

    let usernameError = null;
    let usernameExist = null;
    let emailError = null;
    let emailTaken = null;
    let passwordError = null;
    let privacyPolicyCheckboxError = null;

    const errors = [
      usernameError,
      usernameExist,
      emailError,
      emailTaken,
      passwordError,
      privacyPolicyCheckboxError,
    ];

    if (
      !signUpUsername.match(validUsernameRegex) ||
      signUpUsername.match(validEmailRegex)
    ) {
      errors[0] = true;
      setUsernameInvalid(true);
    } else {
      errors[0] = false;
      setUsernameInvalid(false);
    }

    if (currentUserUsernameData.includes(signUpUsername)) {
      errors[1] = true;
      setUsernameTaken(true);
    } else {
      errors[0] = false;
      setUsernameTaken(false);
    }

    if (!signUpEmail.match(validEmailRegex)) {
      errors[2] = true;
      setEmailInvalid(true);
    } else {
      errors[2] = false;
      setEmailInvalid(false);
    }

    if (currentUserEmailData.includes(signUpEmail)) {
      errors[3] = true;
      setEmailTaken(true);
    } else {
      errors[3] = false;
      setEmailTaken(false);
    }

    if (!(signUpPassword === confirmSignUpPassword)) {
      errors[4] = true;
      setPasswordMatching(false);
    } else {
      errors[4] = false;
      setPasswordMatching(true);
    }

    if (!document.getElementById("privacypolicycheckbox").checked) {
      errors[5] = true;
      document.getElementById("privacypolicymessage").classList.add("error");
    } else {
      errors[5] = false;
      document.getElementById("privacypolicymessage").classList.remove("error");
    }

    if (!errors.includes(true)) {
      const { error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          data: {
            username: signUpUsername,
          },
        },
      });
      if (error) {
        setAccountCreationFail(true);
      } else {
        setAccountCreated(true);
        await supabase.from("users").insert({
          email: signUpEmail,
          username: signUpUsername,
        });
      }
    } else {
      return;
    }
  }

  async function forgotPassword(e) {
    e.preventDefault();
    setPasswordResetEmail(true);
    await supabase.auth.resetPasswordForEmail(
      document.getElementById("loginemail").value,
      { redirectTo: "https://orbital-aria.vercel.app/forgotpassword" }
    );
  }

  // popup functions
  function closePopUp() {
    setAccountCreated(false);
    setAccountCreationFail(false);
    setAccountLoginFail(false);
    setPasswordResetEmail(false);
  }

  return (
    <>
      {accountLoginFail && (
        <UniversalPopup
          closePopUp={closePopUp}
          popupText="Login unsuccessful. Check email and password?"
        />
      )}
      {passwordResetEmail && (
        <UniversalPopup
          closePopUp={closePopUp}
          popupText="Password reset email sent!"
        />
      )}
      {accountCreated && (
        <UniversalPopup
          closePopUp={closePopUp}
          popupText="Account created! Please verify your email before logging in."
        />
      )}
      {accountCreationFail && (
        <UniversalPopup
          closePopUp={closePopUp}
          popupText="Account creation fail. Check email and password? Or contact aria@gmail.com"
        />
      )}

      <div className="loginscreen--container">
        <div className="form-container log-in-container">
          <form>
            <h1 style={{ fontSize: "5rem" }}>aria</h1>
            <input id="loginemail" type="email" placeholder="Email" required />
            <input
              id="loginpassword"
              type="password"
              placeholder="Password"
              required
            />
            <button onClick={logIn} id="login-button" className="log--in">
              Log In
            </button>
            <button
              id="forgot-password-link"
              onClick={forgotPassword}
              className="forgot--password"
            >
              Forgot your password?
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="sign-up-container overlay-panel overlay-right">
              <h1>Sign Up</h1>
              <input
                id="signupusername"
                type="text"
                placeholder="Username"
                required
              />
              <input
                id="signupemail"
                type="email"
                placeholder="Email"
                required
              />
              <input
                id="signuppassword"
                type="password"
                placeholder="Password (min 7 characters)"
                required
              />
              <input
                id="confirmsignuppassword"
                type="password"
                placeholder="Confirm Password"
                required
              />
              <FormControlLabel
                required
                control={
                  <Checkbox
                    id="privacypolicycheckbox"
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                  />
                }
                label=<a
                  id="privacypolicymessage"
                  style={{ textDecoration: "underline", color: "white" }}
                  href="
                  https://publuu.com/flip-book/160798/402295"
                  target=" _blank"
                >
                  I agree with ARIA's privacy policy
                </a>
              />
              <Stack direction="column">
                {usernameTaken && <h6>Username Taken!</h6>}
                {emailTaken && <h6>Email taken!</h6>}
                {usernameInvalid && <h6>Invalid username!</h6>}
                {emailInvalid && <h6>Invalid email!</h6>}
                {!passwordMatching && <h6>Passwords do not match!</h6>}
              </Stack>
              <button id="signup-button" onClick={signUp} className="sign--up">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
