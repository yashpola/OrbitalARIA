// react imports
import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// supabase imports
import { supabase } from "../../supabase";
// component imports
import LandingScreen from "../LandingPage/LandingScreen";
import GradePointArchiveScreen from "../GradePointArchivePage/GradePointArchiveScreen";
import StudySessionScreen from "../StudySessionPage/StudySessionScreen";
import NoPage from "./404Page";
import UserProfile from "../Profile/UserProfile";
import Fallback from "./FallBack";

export default function NavBar({
  currentUserEmailData,
  currentUserUsernameData,
}) {
  /* React states */
  // User info storage
  const [username, setUsername] = useState("Profile");
  const [email, setEmail] = useState("");
  const [currentUserPfpData, setCurrentUserPfpData] = useState("");

  /* Component functionality */
  async function setAccess() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("users")
      .select("pfpset")
      .eq("email", user.email);
    setCurrentUserPfpData(data[0].pfpset);

    setUsername(user.user_metadata.username);
    setEmail(user.email);
  }

  useEffect(() => {
    setAccess();
  }, [username]);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div id="navbar-brand" className="navbar-brand-aria">
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
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li>
                <div id="navbar-gpa" className="nav-item nav-link">
                  <NavLink
                    id="gpa-nav-link"
                    to="/gradepointarchive"
                    style={({ isActive }) => ({
                      textDecoration: isActive ? "underline" : "none",
                      color: !isActive ? "white" : "grey",
                    })}
                  >
                    GradePointArchive
                  </NavLink>
                </div>
              </li>
              <li>
                <div id="navbar-studysession" className="nav-item nav-link">
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
              </li>
              <li>
                <div id="navbar-username" className="nav-item nav-link">
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
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Routes>
        <Route exact path="/" element={<LandingScreen />} />
        <Route
          exact
          path="/gradepointarchive"
          element={<GradePointArchiveScreen />}
        />
        <Route
          exact
          path="/studysession"
          element={<StudySessionScreen email={email} />}
        />
        <Route
          exact
          path="/profile"
          element={
            <UserProfile
              currentUserEmailData={currentUserEmailData}
              currentUserUsernameData={currentUserUsernameData}
              currentUserPfpData={currentUserPfpData}
              username={username}
              setUsername={setUsername}
              email={email}
            />
          }
        />
        <Route exact path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}
