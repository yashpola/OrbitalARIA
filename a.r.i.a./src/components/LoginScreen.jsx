import { supabase } from "../supabase.js";
import { useEffect, useState } from "react";
import UniversalPopup from "./UniversalPopup.jsx";

export default function LoginScreen() {
  const [accountConfirm, setAccountConfirm] = useState(false);
  const [passwordMatching, setPasswordMatching] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  function closePopUp() {
    setAccountConfirm(false);
  }

  async function logIn(e) {
    e.preventDefault();
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (document.getElementById("loginemail").value.match(validRegex)) {
      setEmailValid(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: document.getElementById("loginemail").value,
        password: document.getElementById("loginpassword").value,
      });
    } else {
      setEmailValid(false);
    }
  }

  async function signUp(e) {
    e.preventDefault();
    if (
      document.getElementById("signuppassword").value ===
      document.getElementById("confirmpassword").value
    ) {
      setPasswordMatching(true);
      const { data, error } = await supabase.auth.signUp({
        email: document.getElementById("signupemail").value,
        password: document.getElementById("signuppassword").value,
      });
      const email = document.getElementById("signupemail").value;
      const { addUserNameError } = await supabase
        .from("users")
        .insert({ email: email });
      setAccountConfirm(true);
    } else {
      setPasswordMatching(false);
    }
  }

  async function forgotPassword(e) {
    e.preventDefault();
    if (
      document.getElementById("loginemail").value !== null ||
      document.getElementById("loginemail").value !== ""
    ) {
      await supabase.auth.resetPasswordForEmail(
        document.getElementById("loginemail").value,
        {}
      );
      alert("Reset Link Sent!");
    } else {
      alert("Please provide your email!");
    }
  }

  return (
    <>
      {accountConfirm && (
        <UniversalPopup
          closePopUp={closePopUp}
          text="Account Created! Please verify your email before logging in."
        />
      )}
      <div className="loginscreen--container">
        <div className="form-container log-in-container">
          <form>
            <h1>Log In</h1>
            <input type="email" id="loginemail" placeholder="Email" required />
            <input
              type="password"
              id="loginpassword"
              placeholder="Password"
              required
            />
            <button onClick={forgotPassword} className="forgot--password">
              Forgot your password?
            </button>
            {!emailValid && <p className="email-valid">Invalid Email!</p>}
            <button onClick={logIn} className="log--in">
              Log In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="sign-up-container overlay-panel overlay-right">
              <h1>Sign Up</h1>
              <input
                type="username"
                id="signupusername"
                placeholder="Username"
                required
              />
              <input
                type="email"
                id="signupemail"
                placeholder="Email"
                required
              />
              <input
                type="password"
                id="signuppassword"
                placeholder="Password"
                minLength="8"
                required
              />
              <input
                type="password"
                id="confirmpassword"
                placeholder="Confirm Password"
                required
              />
              {!passwordMatching && (
                <p className="password-mismatch">Passwords do not match!</p>
              )}
              <button onClick={signUp} className="sign--up">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
