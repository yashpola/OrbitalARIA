// mui imports
import { Stack, Checkbox, FormControlLabel } from "@mui/material";
// react imports
import { React, useState } from "react";
// supabase imports
import { supabase } from "../../supabase.js";
// component imports
import UniversalPopup from "../Universal/UniversalPopup.jsx";

export default function LoginScreen() {
  /* React States */

  // internal bad user input handling
  const [passwordMatching, setPasswordMatching] = useState(true);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  // supabase states
  const [accountCreated, setAccountCreated] = useState(false);
  const [accountCreationFail, setAccountCreationFail] = useState(false);
  const [accountLoginFail, setAccountLoginFail] = useState(false);

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
    let usernameError = null;
    let emailError = null;
    let emailExist = null;
    let passwordError = null;
    let privacyPolicyCheckboxError = null;

    const errors = [
      usernameError,
      emailError,
      emailExist,
      passwordError,
      privacyPolicyCheckboxError,
    ];

    if (
      !document.getElementById("signupusername").value.match(validUsernameRegex)
    ) {
      errors[0] = true;
      setUsernameInvalid(true);
    } else {
      errors[0] = false;
      setUsernameInvalid(false);
    }

    const { data } = await supabase
      .from("users")
      .select("email")
      .eq("email", document.getElementById("signupemail").value);

    if (!document.getElementById("signupemail").value.match(validEmailRegex)) {
      errors[1] = true;
      setEmailInvalid(true);
    } else {
      errors[1] = false;
      setEmailInvalid(false);
    }

    if (data[0]) {
      errors[2] = true;
      setEmailExist(true);
    } else {
      errors[2] = false;
      setEmailExist(false);
    }

    if (
      !(
        document.getElementById("signuppassword").value ===
        document.getElementById("confirmsignuppassword").value
      )
    ) {
      errors[3] = true;
      setPasswordMatching(false);
    } else {
      errors[3] = false;
      setPasswordMatching(true);
    }

    if (!document.getElementById("privacypolicycheckbox").checked) {
      errors[4] = true;
      document.getElementById("privacypolicymessage").classList.add("error");
    } else {
      errors[4] = false;
      document.getElementById("privacypolicymessage").classList.remove("error");
    }

    if (!errors.includes(true)) {
      const { error } = await supabase.auth.signUp({
        email: document.getElementById("signupemail").value,
        password: document.getElementById("signuppassword").value,
        options: {
          data: {
            username: document.getElementById("signupusername").value,
          },
        },
      });
      if (error) {
        setAccountCreationFail(true);
      } else {
        setAccountCreated(true);
        // await supabase.from("users").insert({
        //   email: document.getElementById("signupemail").value,
        //   username: document.getElementById("signupusername").value,
        // });
      }
    } else {
      return;
    }
  }

  async function forgotPassword(e) {
    e.preventDefault();
    console.log("yoyoyo mista white");
    setPasswordResetEmail(true);
    await supabase.auth.resetPasswordForEmail(
      document.getElementById("loginemail").value
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
                {emailExist && <h6>Email taken!</h6>}
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
