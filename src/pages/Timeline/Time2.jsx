import { useEffect, useRef } from "react";
import "./Time2.css";
import koi from "../assets/koi.png"
const Time2 = () => {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !progressRef.current) return;

      const dots = timelineRef.current.querySelectorAll(".dot");
      if (dots.length < 2) return;

      const firstDot = dots[0].getBoundingClientRect();
      const lastDot = dots[dots.length - 1].getBoundingClientRect();

      const start = firstDot.top + window.scrollY;
      const end = lastDot.top + window.scrollY;

      const scrollPos = window.scrollY + window.innerHeight * 0.5;

      const progress = Math.min(
        Math.max((scrollPos - start) / (end - start), 0),
        1
      );

      progressRef.current.style.height = `${progress * 100}%`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="timeline" ref={timelineRef}>
    
      <div className="line-wrapper">
        <div className="line"></div>
        <div className="line-progress" ref={progressRef}></div>
      </div>

      {[
  [
    "Opening Ceremony",
    "April 4 · 1:00 PM",
    "Welcome to Xenith'26! Join us for an exciting inauguration featuring keynote speakers, event roadmap unveiling and networking opportunities."
  ],
  [
    "Code In The Dark",
    "April 4 · 3.30 PM - 6:30 PM",
    "Code without seeing, debug without certainty—welcome to controlled chaos. BlindCoding ignites the stage with an exciting challenge. "
  ],
  [
    "Hackstreet 4.0",
    "April 4 · 24 hour",
    "The ultimate 24 hour hackathon open to colleges across the nation."
  ],
  [
    "Startup Showdown",
    "April 5 · 1:00 AM - 4:00 PM",
    "An innovative Startup Pitch Competition designed for visionaries."
  ],
  [
    "RTL Forge",
    "April 5 · 1:30 PM - 4 PM",
    "Step into the forge where raw logic is shaped into powerful digital designs. Craft your code with precision and purpose."
  ],
  [
    "Sekiro Saga (Treasure hunt)",
    "April 5 · 10:00 AM - 2:00 PM",
    "A campus-wide interactive hunt combining cryptic clues, teamwork, and rapid decision-making."
  ],
  [
    "Closing Ritual",
    "April 5 · 4:00 PM",
    "A reflective closing honoring collaboration, growth, and the journey shared by all participants."
  ]
]
.map((e, i) => (
        <div key={i} className={`event ${i % 2 === 0 ? "left" : "right"}`}>
          <span className="dot"></span>
<div className="card">
  <img src={koi} className="koi-bg" alt="" />

  <h2>{e[0]}</h2>
  <p className="time">{e[1]}</p>
  <p className="desc">{e[2]}</p>
</div>
        </div>
      ))}
    </div>
  );
};

export default Time2;
