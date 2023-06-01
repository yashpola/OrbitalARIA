import { React, useContext } from "react";
import LandingScreen from "./LandingScreen";
import GradePointArchiveScreen from "./GradePointArchiveScreen";
import StudySessionScreen from "./StudySessionScreen";
import NoPage from "./NoPage";
import Profile from "./Profile";
import { Routes, Route, NavLink } from "react-router-dom";
import { supabase } from "../supabase";
import { adminAccessContext } from "./LoginScreen";

export default function NavBar() {
  const adminAccess = useContext(adminAccessContext);
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
        <div className="nav-item nav-link" style={{ margin: "10px" }}>
          <NavLink
            to="/profile"
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "none",
              color: isActive ? "white" : "grey",
            })}
          >
            Profile
          </NavLink>
        </div>
        <button onClick={signOut} className="nav--sign--out">
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
        <Route
          exact
          path="/profile"
          element={
            <adminAccessContext.Provider value={adminAccess}>
              <Profile />
            </adminAccessContext.Provider>
          }
        />
        <Route exact path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}
