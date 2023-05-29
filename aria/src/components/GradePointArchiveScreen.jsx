// import NavBar from "./NavBar";
import Note from "./Note";

export default function GradePointArchiveScreen() {
  return (
    <>
      {/* <NavBar /> */}
      <div className="container-fluid">
        <div className="gpa-container container-fluid">
          <div className="label">
            <i>YEARS</i>
          </div>
          <button className="add-button function-button">
            <span className="button-label">+</span>
          </button>
          <button className="help-button function-button">
            <span className="button-label">?</span>
          </button>

          <button className="admin-button function-button">
            <span>
              <img
                src="../images/gradepointarchiveimages/padlock.png"
                alt="admin button"
                height="30"
                width="30"
              />
            </span>
          </button>
          <Note />
          <Note />
          <Note />
        </div>
      </div>
    </>
  );
}
