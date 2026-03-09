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
    "Feb 1, 2025 · 1:00 PM",
    "A serene opening marked by traditional motifs, welcoming participants into a space of creativity, respect, and innovation."
  ],
  [
    "Hackstreet",
    "Feb 1–2 · 24 Hours",
    "An intense overnight hackathon where ideas flow endlessly, collaborations spark, and solutions take shape under pressure."
  ],
  [
    "Shardrift",
    "Feb 2 · 10:00 AM",
    "A high-energy competitive challenge testing logic, speed, and problem-solving precision."
  ],
  [
    "Cyber Robo Workshop",
    "Dec 3 · 2:00 PM",
    "A hands-on robotics session blending hardware, code, and futuristic engineering concepts."
  ],
  [
    "Tech Hunt",
    "Dec 3 · Night",
    "A campus-wide interactive hunt combining cryptic clues, teamwork, and rapid decision-making."
  ],
  [
    "Idea Station",
    "Dec 4 · Morning",
    "An open stage for innovators to pitch bold ideas, receive feedback, and refine visions for real-world impact."
  ],
  [
    "Mentor Connect",
    "Dec 4 · Afternoon",
    "One-on-one discussions with industry mentors offering guidance, insights, and career inspiration."
  ],
  [
    "Showcase Expo",
    "Dec 4 · Late Afternoon",
    "Teams present their completed projects to judges, peers, and guests in a live demonstration space."
  ],
  [
    "Awards & Recognition",
    "Dec 4 · Evening",
    "Celebrating excellence, innovation, and perseverance across all tracks and challenges."
  ],
  [
    "Closing Ritual",
    "Dec 4 · Night",
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
