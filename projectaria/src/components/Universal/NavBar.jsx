// mui imports
// react imports
import { useState, useLayoutEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
// supabase imports
import { supabase } from "../../supabase";
// component imports
import LandingScreen from "../LandingPage/LandingScreen";
import GradePointArchiveScreen from "../GradePointArchivePage/GradePointArchiveScreen";
import GPA2 from "../GradePointArchivePage/GPA2";
import StudySessionScreen from "../StudySessionPage/StudySessionScreen";
import NoPage from "./404Page";
import UserProfile from "../Profile/UserProfile";

export default function NavBar() {
  // eslint-disable-next-line
  const [adminAccess, setAdminAccess] = useState(false);
  const [username, setUsername] = useState("Profile");

  async function setAccess() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("administrators")
      .select("email")
      .eq("email", user.email);
    if (data[0] === undefined) {
      setAdminAccess(false);
    } else {
      setAdminAccess(true);
    }

    setUsername(user.user_metadata.username);
  }

  useLayoutEffect(() => {
    setAccess();
  }, []);

  return (
    <>
      {
        <div className="navbar">
          <div className="navbar-brand" style={{ margin: "10px" }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
                color: !isActive ? "white" : "grey",
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
                color: !isActive ? "white" : "grey",
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
                color: !isActive ? "white" : "grey",
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
                color: !isActive ? "white" : "grey",
              })}
            >
              {username}
            </NavLink>
          </div>
        </div>
      }
      <Routes>
        <Route exact path="/" element={<LandingScreen />} />
        <Route
          exact
          path="/gradepointarchive"
          element={<GradePointArchiveScreen />}
          // element={<GPA2 />}
        />
        <Route exact path="/studysession" element={<StudySessionScreen />} />
        <Route
          exact
          path="/profile"
          element={<UserProfile usernameNav={username} />}
        />
        <Route exact path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}
