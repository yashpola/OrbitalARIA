export default function LearnMoreSection() {
  return (
    <section className="section--learn--more" id="section--1">
      <div className="website_summary">
        <img
          src="../images/landingimages/userprofile.png"
          className="learn_more"
          alt="User Profile"
        />
        <h4>
          <u>User Profiling</u>
        </h4>
        <p>Personalized website experience with secure authentication</p>
        <img
          src="../images/landingimages/gradepointarchive.png"
          className="learn_more"
          alt="Grade Point Archive"
        />
        <h4>
          <u>Grade Point Archive</u>
        </h4>
        <p>
          A record of all your module grades across semesters and years. Compute
          GPA at any point in your record
        </p>
        <img
          src="../images/landingimages/studysession.png"
          className="learn_more"
          alt="Study Session"
        />
        <h4>
          <u>Study Session</u>
        </h4>
        <p>Motivation to complete your daily study goals</p>
      </div>
    </section>
  );
}
