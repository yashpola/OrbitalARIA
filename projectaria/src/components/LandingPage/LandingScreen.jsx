// mui imports
import { Card, Container } from "@mui/material";
// react imports
import { useState, useRef, useEffect } from "react";
// component imports
import userProfileIcon from "../images/landingimages/userprofile.png";
import gradePointArchiveIcon from "../images/landingimages/gradepointarchive.png";
import studySessionIcon from "../images/landingimages/studysession.png";
import FeatureSlide from "./FeatureSlide";

export default function LandingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeOutRef = useRef(null);
  const delay = 4000;

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

  const slides = [
    <FeatureSlide
      navigateNext={navigateNext}
      navigatePrevious={navigatePrevious}
      background="#DC9A7F"
      feature="User Profiles"
      image={userProfileIcon}
      description="Personalized website experience with secure authentication"
    />,
    <FeatureSlide
      navigateNext={navigateNext}
      navigatePrevious={navigatePrevious}
      background="#A86868"
      feature="GradePointArchive"
      image={gradePointArchiveIcon}
      description="A repo of all your module grades. Compute GPA at any point in your academic record"
    />,
    <FeatureSlide
      navigateNext={navigateNext}
      navigatePrevious={navigatePrevious}
      background="#983811"
      feature="StudySession"
      image={studySessionIcon}
      description="Study tracking assistant and a motivation to complete your daily study goals"
    />,
  ];

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

  return (
    <Container sx={{ padding: 5 }}>
      <Card sx={{ fontSize: 100, textAlign: "center" }}>
        aria
        <p style={{ fontSize: 20, color: "#4e1530" }}>
          artificial resource for interactive academics
        </p>
      </Card>
      <Card
        elevation={0}
        sx={{
          wordWrap: "break-word",
        }}
      >
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
        <div className="slideshowDots">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${currentSlide === idx ? " active" : ""}`}
              onClick={() => {
                setCurrentSlide(idx);
              }}
            ></div>
          ))}
        </div>
      </Card>
    </Container>
  );
}
