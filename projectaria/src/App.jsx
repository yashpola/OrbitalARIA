"use client";
// css imports
import "./style.css";
// mui imports
import { createTheme } from "@mui/material";
// react imports
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, NavLink } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// supabase imports
import { supabase } from "./supabase";
// component imports
import LoginScreen from "./components/LoginPage/LoginScreen";
import NavBar from "./components/Universal/NavBar";
import Fallback from "./components/Universal/FallBack";
import ForgotPasswordScreen from "./components/Universal/ForgotPasswordScreen";

export const ariaTheme = createTheme({
  palette: {
    primary: {
      main: "#e9cdcd",
      contrastThreshold: 4.5,
    },
    secondary: {
      main: "#A86868",
      contrastThreshold: 4.5,
    },
    tertiary: {
      main: "black",
    },
    font: {
      main: "white",
    },
  },
});

export default function App() {
  const [session, setSession] = useState(null);
  const [currentUserEmailData, setCurrentUserEmailData] = useState([]);
  const [currentUserUsernameData, setCurrentUserUsernameData] = useState([]);

  async function fetchUserData() {
    const { data } = await supabase.from("users").select();
    setCurrentUserEmailData(data.map(({ email }) => email));
    setCurrentUserUsernameData(data.map(({ username }) => username));
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      {session ? (
        <NavBar
          currentUserEmailData={currentUserEmailData}
          currentUserUsernameData={currentUserUsernameData}
        />
      ) : (
        <LoginScreen
          currentUserEmailData={currentUserEmailData}
          currentUserUsernameData={currentUserUsernameData}
        />
      )}{" "}
      <Routes>
        <Route
          exact
          path="/forgotpassword"
          element={<ForgotPasswordScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}
