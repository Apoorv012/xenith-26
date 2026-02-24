import "./About.css";
import bgImage from "../../assets/about-bg.png";
import { useEffect } from "react";
import lanternImage from "../../assets/lantern.png";


export default function About() {
useEffect(() => {
  const lantern = document.querySelector(".lantern-cursor");
  const bubble = document.querySelector(".about-content");
  const fog = document.querySelector(".fog-layer");

  if (!lantern || !bubble || !fog) return;

  const moveLantern = (clientX, clientY) => {
    const rect = bubble.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const halfW = lantern.offsetWidth / 2;
    const halfH = lantern.offsetHeight / 2;

    lantern.style.transform = `translate(${x - halfW}px, ${y - halfH}px)`;

    const mask = `
      radial-gradient(
        circle 180px at ${x}px ${y}px,
        transparent 0%,
        rgba(0,0,0,0.3) 60%,
        black 100%
      )
    `;

    fog.style.maskImage = mask;
    fog.style.webkitMaskImage = mask;
  };

  const handleMouseMove = (e) => {
    moveLantern(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // 🔥 disables scroll inside bubble
    const touch = e.touches[0];
    moveLantern(touch.clientX, touch.clientY);
  };

  bubble.addEventListener("mousemove", handleMouseMove);
  bubble.addEventListener("touchmove", handleTouchMove, { passive: false });

  return () => {
    bubble.removeEventListener("mousemove", handleMouseMove);
    bubble.removeEventListener("touchmove", handleTouchMove);
  };
}, []);

  return (
    <section className="about-section">
      {/* Background */}
      <div
        className="about-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Content */}
      <div className="about-wrapper">
        <div className="about-content fog-container">
         <div className="fog-layer"></div>
        

         <img
           src={lanternImage}
           alt="Lantern cursor"
           className="lantern-cursor"
         />


          <h1 className="about-title">ABOUT US</h1>

          <p className="about-text">
            In a world shaped by innovation and determination, discipline and
            perseverance define true progress. Driven by this spirit, IEEE
            Student Branch of JIIT Noida presents Xenith’26 – Shadows of Samurai,
            our flagship event. It brings together engaging technical challenges
            and collaborative experiences that encourage critical thinking,
            creativity, and problem-solving, while reflecting the unseen effort
            and quiet precision behind every technological breakthrough. Step
            into the shadows, embrace new challenges, sharpen your skills
            through learning and collaboration, and emerge stronger than ever—
            confident, capable, and ready to lead.
          </p>
        </div>
      </div>
    </section>
  );
}
