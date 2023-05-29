// import NavBar from "./NavBar";

export default function StudySessionScreen() {
  return (
    <>
      {/* <NavBar /> */}
      <div className="study-container">
        <div className="button-menu">
          <button className="button">Start Session</button>
          <button className="button">View Sessions</button>
          <button className="button">View Statistics</button>
        </div>
        <div className="plant">
          <img src="../images/studysessionimages/plant.png" />
        </div>
      </div>
      <section className="ground"></section>
    </>
  );
}
