// css imports
import "./style.css";
// mui imports
import { createTheme } from "@mui/material";
// react imports
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// supabase imports
import { supabase } from "./supabase";
// component imports
import LoginScreen from "./components/LoginPage/LoginScreen";
import NavBar from "./components/Universal/NavBar";

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
  },
});

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>{session ? <NavBar /> : <LoginScreen />}</BrowserRouter>
  );
}
