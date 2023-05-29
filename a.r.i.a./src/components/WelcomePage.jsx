export default function WelcomePage() {
  return (
    <header className="diagonal--split--background">
      {/* <h1 className="welcome_message">
        <i>Need a personal study assistant?</i>
      </h1> */}
      <div className="website--condensed">
        <h1 className="brand">aria</h1>
        <div className="feature_icons">
          <img
            src="../images/landingimages/userprofile.png"
            className="feature_icon"
            alt="User Profile"
          />
          <img
            src="../images/landingimages/gradepointarchive.png"
            className="feature_icon"
            alt="Grade Point Archive"
          />
          <img
            src="../images/landingimages/studysession.png"
            className="feature_icon"
            alt="Study Session"
          />
        </div>
        <h2 className="brand_description">
          Artificial Resource for Interactive Academics
        </h2>
      </div>
    </header>
  );
}
