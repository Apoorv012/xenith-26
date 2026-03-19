import { useNavigate, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hamburger.css";

export default function Hamburger() {
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = location.pathname === "/nav";

  const handleClick = () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    window.scrollTo(0, 0);
    navigate(isOpen ? "/" : "/nav");
  };

  return (
    <button
      className={`hamburger ${isOpen ? "hamburger--open" : ""}`}
      onClick={handleClick}
      aria-label="Toggle navigation"
    >
      <span />
      <span />
      <span />
    </button>
  );
}
