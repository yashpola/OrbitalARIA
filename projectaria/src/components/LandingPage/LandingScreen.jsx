// mui imports
import { Card, Container } from "@mui/material";
// react imports
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// component imports
import userProfileIcon from "../images/landingimages/userprofile.png";
import gradePointArchiveIcon from "../images/landingimages/gradepointarchive.png";
import studySessionIcon from "../images/landingimages/studysession.png";
import FeatureSlide from "./FeatureSlide";
import UniversalPopup from "../Universal/UniversalPopup";
import { toggle } from "../StudySessionPage/studySessionSlice";

export default function LandingScreen() {
  /* Component variables */
  const slides = [
    <FeatureSlide
      navigateNext={navigateNext}
      navigatePrevious={navigatePrevious}
      background="#DC9A7F"
      feature="User Profiles"
      image={userProfileIcon}
      description="Personalized secure website experience"
    />,
    <FeatureSlide
      navigateNext={navigateNext}
      navigatePrevious={navigatePrevious}
      background="#A86868"
      feature="GradePointArchive"
      image={gradePointArchiveIcon}
      description="Your academic health at a glance"
    />,
    <FeatureSlide
      navigateNext={navigateNext}
      navigatePrevious={navigatePrevious}
      background="#983811"
      feature="StudySession"
      image={studySessionIcon}
      description="Bringing focus to your tasks"
    />,
  ];

  /* React States */
  // Slideshow Rendering
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeOutRef = useRef(null);
  const delay = 4000;

  // Redux global state
  const timerOngoing = useSelector((state) => state.timer.value);
  const dispatch = useDispatch();

  /* Component Functionality */
  function resetTimeout() {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeOutRef.current = setTimeout(
      () =>
        setCurrentSlide((prevSlide) =>
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  });

  function navigateNext() {
    const lastSlide = currentSlide === slides.length - 1;
    const nextSlide = lastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(nextSlide);
  }

  function navigatePrevious() {
    const firstSlide = currentSlide === 0;
    const nextSlide = firstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(nextSlide);
  }

  function closePopUp(e) {
    e.preventDefault();
    dispatch(toggle());
  }

  return (
    <>
      {timerOngoing && (
        <UniversalPopup
          closePopUp={closePopUp}
          popupText="Your ongoing session was terminated."
        />
      )}
      <Container sx={{ padding: 5 }}>
        <Card
          id="landing-slideshow-header"
          sx={{ fontSize: 100, textAlign: "center" }}
        >
          aria
          <p style={{ fontSize: 20, color: "#4e1530" }}>
            artificial resource for interactive academics
          </p>
        </Card>
        <Card id="landing-slideshow-body" elevation={0}>
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-currentSlide * 100}%, 0, 0)` }}
          >
            {slides.map((feature, index) => (
              <div className="slide" key={index}>
                {feature}
              </div>
            ))}
          </div>
          <div id="landing-slideshow-footer" className="slideshowDots">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`slideshowDot${
                  currentSlide === idx ? " active" : ""
                }`}
                onClick={() => {
                  setCurrentSlide(idx);
                }}
              ></div>
            ))}
          </div>
        </Card>
      </Container>
    </>
  );
}
