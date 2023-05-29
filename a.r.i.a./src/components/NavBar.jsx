import React from "react";
import LandingScreen from "./LandingScreen";
import GradePointArchiveScreen from "./GradePointArchiveScreen";
import StudySessionScreen from "./StudySessionScreen";
import LoginScreen from "./LoginScreen";
import NoPage from "./NoPage";
import { Routes, Route, NavLink } from "react-router-dom";
import { supabase } from "../supabase";

export default function NavBar() {
  function signOut(e) {
    e.preventDefault();
    supabase.auth.signOut();
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar-brand" style={{ margin: "10px" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "none",
              color: isActive ? "white" : "grey",
            })}
          >
            aria
          </NavLink>
        </div>
        <div className="nav-item nav-link" style={{ margin: "10px" }}>
          <NavLink
            to="/gradepointarchive"
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "none",
              color: isActive ? "white" : "grey",
            })}
          >
            GradePointArchive
          </NavLink>
        </div>
        <div className="nav-item nav-link" style={{ margin: "10px" }}>
          <NavLink
            to="/studysession"
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "none",
              color: isActive ? "white" : "grey",
            })}
          >
            StudySession
          </NavLink>
        </div>
        <button className="nav--sign--out" onClick={signOut}>
          Sign Out
        </button>
      </div>
      <Routes>
        <Route exact path="/" element={<LandingScreen />} />
        <Route
          exact
          path="/gradepointarchive"
          element={<GradePointArchiveScreen />}
        />
        <Route exact path="/studysession" element={<StudySessionScreen />} />
        <Route exact path="/loginscreen" element={<LoginScreen />} />
        <Route exact path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}
