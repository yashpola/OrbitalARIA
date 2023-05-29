import "./styles.css";
import LoginScreen from "./components/LoginScreen";
import NavBar from "./components/NavBar";
import NoPage from "./components/NoPage";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { BrowserRouter } from "react-router-dom";

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
