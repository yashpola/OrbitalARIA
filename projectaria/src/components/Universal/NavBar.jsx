// react imports
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, NavLink } from "react-router-dom";
// supabase imports
import { supabase } from "../../supabase";
// component imports
import { navBarColor } from "../themes";
import LandingScreen from "../LandingPage/LandingScreen";
import GradePointArchiveScreen from "../GradePointArchivePage/GradePointArchiveScreen";
import StudySessionScreen from "../StudySessionPage/StudySessionScreen";
import NoPage from "./404Page";
import UserProfile from "../Profile/UserProfile";

export default function NavBar({ currentUserEmailData }) {
  /* React states */
  // Redux global
  const presentTheme = useSelector((state) => state.currentTheme.value);
  const timerOngoing = useSelector((state) => state.timer.value);
  const lastLoggedIn = useSelector((state) => state.lastLogged.value);

  const [confirmNavigation, setConfirmNavigation] = useState(false);

  // User info storage
  const [username, setUsername] = useState("Profile");
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [src, setSrc] = useState();
  const [loginDiff, setLoginDiff] = useState(0);

  /* Component functionality */
  async function fetchUserData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("users")
      .select("username")
      .eq("email", user.email);

    setUserID(user.id);
    setUsername(data[0].username);
    setEmail(user.email);
  }
  async function fetchProfilePicture() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = supabase.storage
      .from("userimages")
      .getPublicUrl(`${user.user_metadata.username}.jpg`);

    setSrc(data.publicUrl);
  }

  function calculateDifferenceLoggedIn() {
    const studySessionTabTime = new Date().getTime();
    setLoginDiff(Math.round((studySessionTabTime - lastLoggedIn) / 86400000));
  }

  function confirmNav() {
    timerOngoing && setConfirmNavigation(true);
  }

  useEffect(() => {
    fetchUserData();
  }, [username]);

  useEffect(() => {
    fetchProfilePicture();
  }, [src]);

  useEffect(() => {
    calculateDifferenceLoggedIn();
  }, []);

  return (
    <>
      <div>
        <nav
          style={{ backgroundColor: navBarColor[presentTheme] }}
          className="navbar navbar-expand-lg navbar-dark"
        >
          <div id="navbar-brand" className="navbar-brand-aria">
            <NavLink
              onClick={confirmNav}
              id="aria-nav-link"
              to={timerOngoing ? "/studysession" : "/"}
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
            <ul className="navbar-nav ml-auto">
              <li>
                <div id="navbar-gpa" className="nav-item nav-link">
                  <NavLink
                    onClick={confirmNav}
                    id="gpa-nav-link"
                    to={timerOngoing ? "/studysession" : "/gradepointarchive"}
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
                    id="studysession-nav-link"
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
                    onClick={confirmNav}
                    id="profile-nav-link"
                    to={timerOngoing ? "/studysession" : "/profile"}
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
          element={<GradePointArchiveScreen userID={userID} />}
        />
        <Route
          exact
          path="/studysession"
          element={
            <StudySessionScreen
              confirmNavigation={confirmNavigation}
              setConfirmNavigation={setConfirmNavigation}
              loginDiff={loginDiff}
              email={email}
              userID={userID}
            />
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <UserProfile
              src={src}
              setSrc={setSrc}
              fetchProfilePicture={fetchProfilePicture}
              currentUserEmailData={currentUserEmailData}
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
