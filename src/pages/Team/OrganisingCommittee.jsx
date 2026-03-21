import { useEffect, useRef, useState, useCallback } from "react";
import Swiper from 'swiper';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const members = [
  { name: "Manayav Vatsal",     role: "Chairperson",           img: "images-oc/ManayavVatsal.webp" },
  { name: "Anoushka Kaushik",   role: "Vice Chairperson",      img: "images-oc/AnoushkaKaushik.webp" },
  { name: "Mohd Aayaan",        role: "Organising Secretary",  img: "images-oc/MohdAayaan.webp" },
  { name: "Daksha Pandey",      role: "Treasurer",             img: "images-oc/DakshaPandey.webp" },
  { name: "Apoorva Soni",       role: "WIE Head",              img: "images-oc/ApoorvaSoni.webp" },
  { name: "Medhavi Khandelwal", role: "Strategic Head",        img: "images-oc/MedhaviKhandelwal.webp" },
  { name: "Ishi Bharadwaj",     role: "Logistics Head",        img: "images-oc/IshiBharadwaj.webp" },
  { name: "Apoorv Mittal",      role: "Tech CSE Head",         img: "images-oc/ApoorvMittal.webp" },
  { name: "Prakhar Sharma",     role: "Tech ECE Head",         img: "images-oc/PrakharSharma.webp" },
  { name: "Daksh Sachdeva",     role: "Digital Head",          img: "images-oc/DakshSachdeva.webp" },
  { name: "Sparsh Tyagi",       role: "Cinematography Head",   img: "images-oc/SparshTyagi.webp" },
  { name: "Vanshika Singh",     role: "Marketing Head",        img: "images-oc/VanshikaSingh.webp" },
  { name: "Ruchit Khandelwal",  role: "Public Relations Head", img: "images-oc/RuchitKhandelwal.webp" },
  { name: "Ishita Agarwal",     role: "Management Head",       img: "images-oc/IshitaAgarwal.webp" },
  { name: "Saransh Mathur",     role: "Creative Head",         img: "images-oc/SaranshMathur.webp" },
  { name: "Pranshu Sharma",     role: "Webmaster",             img: "images-oc/PranshuSharma.webp" },
  { name: "Astha Kumari",       role: "Campus Outreach Head",  img: "images-oc/AsthaKumari.webp" },
];

function MemberCard({ member, index, isActive }) {
  const [hovered, setHovered] = useState(false);
  const lit = isActive && hovered;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "2 / 3",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "default",
        // Gold glow border via box-shadow
        boxShadow: lit
          ? "0 0 0 2px #ffb347, 0 0 50px rgba(255,150,30,0.5), 0 30px 80px rgba(0,0,0,0.9)"
          : isActive
          ? "0 0 0 1.5px rgba(255,179,71,0.5), 0 20px 50px rgba(0,0,0,0.8)"
          : "0 0 0 1px rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.6)",
        transform: lit ? "translateY(-10px) scale(1.04)" : "scale(1)",
        transition: "transform 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.5s ease",
      }}
    >
      {/* Portrait photo */}
      <img
        src={member.img}
        alt={member.name}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          imageRendering: "auto",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          transform: "scale(1)",
          transition: "filter 0.5s ease",
          filter: isActive
            ? lit ? "brightness(1.1) saturate(1.1)" : "brightness(1) saturate(1)"
            : "brightness(0.6) saturate(0.35)",
        }}
      />

      {/* Subtle warm top sheen on hover */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: lit
          ? "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,200,100,0.15) 0%, transparent 65%)"
          : "none",
        transition: "all 0.5s ease",
      }} />

      {/* Dark gradient — always, stronger at bottom for text readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.05) 100%)",
      }} />

      {/* Top orange glow line on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 5,
        background: "linear-gradient(90deg, transparent, #ff7a18, #ffb347, #ff7a18, transparent)",
        opacity: lit ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* ── Glassmorphism info panel at bottom ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
        padding: "20px 16px 16px",
        background: lit
          ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)",
        backdropFilter: "blur(0px)",
        transition: "all 0.4s ease",
      }}>
     {/* Frosted glass pill — role */}
        <div style={{
          display: "inline-flex", alignItems: "center",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${lit ? "rgba(255,179,71,0.5)" : "rgba(255,255,255,0.12)"}`,
          borderRadius: 20, padding: window.innerWidth < 480 ? "2px 7px" : "3px 10px",
          marginBottom: 8,
          transition: "border-color 0.3s ease",
        }}>
          <span style={{
            fontSize: window.innerWidth < 480 ? 6 : window.innerWidth < 640 ? 7 : 8,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: lit ? "#ffb347" : "rgba(255,255,255,0.55)",
            transition: "color 0.3s ease",
          }}>
            {member.role}
          </span>
        </div>
        {/* Name */}
        <div style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: window.innerWidth < 480 ? 16 : window.innerWidth < 640 ? 18 : 22,
          letterSpacing: "0.06em",
          color: "#fff", lineHeight: 1.05,
          textShadow: lit ? "0 0 20px rgba(255,150,50,0.4)" : "none",
          transition: "text-shadow 0.4s ease",
        }}>
          {member.name}
        </div>

        {/* Animated gold underline */}
        <div style={{
          marginTop: 8, height: 2, borderRadius: 2,
          background: "linear-gradient(90deg, #ff7a18, #ffb347, transparent)",
          width: lit ? "85%" : "24%",
          boxShadow: lit ? "0 0 10px rgba(255,122,24,0.7)" : "none",
          transition: "width 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease",
        }} />
      </div>
    </div>
  );
}

export default function OrganisingCommittee() {
  const swiperRef      = useRef(null);
  const swiperInstance = useRef(null);
  const sectionRef     = useRef(null);
  const isHovering     = useRef(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const slidePrev = useCallback(() => swiperInstance.current?.slidePrev(), []);
  const slideNext = useCallback(() => swiperInstance.current?.slideNext(), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  slidePrev();
      if (e.key === "ArrowRight") slideNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mouseenter", () => { isHovering.current = true; });
    el.addEventListener("mouseleave", () => { isHovering.current = false; });
    const onWheel = (e) => {
      if (!isHovering.current) return;
      e.preventDefault(); e.stopPropagation();
      e.deltaY > 0 ? slideNext() : slidePrev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

useEffect(() => {
  const outerEl = swiperRef.current?.parentElement;
  if (outerEl) outerEl.style.opacity = "0";

  if (swiperRef.current && !swiperInstance.current) {
    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [EffectCoverflow],
      effect: "coverflow",
      grabCursor: false,
      allowTouchMove: false,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 24,
      coverflowEffect: { rotate: 30, stretch: 0, depth: 200, modifier: 1, slideShadows: true },
      loop: true,
      speed: 700,
      on: { slideChange(s) { setActiveIdx(s.realIndex); } },
    });

    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (outerEl) {
        outerEl.style.transition = "opacity 0.5s ease";
        outerEl.style.opacity = "1";
      }
    }));
  }

  return () => {
    swiperInstance.current?.destroy(true, true);
    swiperInstance.current = null;
  };
}, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
       

        /* ── SUNSET BACKGROUND LAYERS (Sreansh - Sunset Theme) ── */

        /* 1. Sunset sky gradient - Golden to Red to Deep Purple */
        .samurai-bg {
          position: fixed; inset: 0; z-index: 0;
          background:
            /* Upper sky - Golden orange */
            radial-gradient(ellipse 100% 70% at 50% 0%, rgba(255, 180, 50, 0.4) 0%, transparent 50%),
            /* Mid sky - Warm orange/red glow */
            radial-gradient(ellipse 80% 60% at 60% 30%, rgba(255, 100, 50, 0.3) 0%, transparent 60%),
            /* Right side - Deep crimson */
            radial-gradient(ellipse 70% 80% at 85% 40%, rgba(220, 40, 40, 0.35) 0%, transparent 65%),
            /* Left side - Purple clouds */
            radial-gradient(ellipse 60% 70% at 15% 35%, rgba(150, 50, 100, 0.3) 0%, transparent 60%),
            /* Bottom - Deep dark purple transitioning to black */
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(40, 10, 60, 0.8) 0%, transparent 50%),
            /* Base gradient */
            linear-gradient(180deg, #5C3D2E 0%, #4A2F23 25%, #3D2418 45%, #2A1810 70%, #0a0605 100%);
          pointer-events: none;
        }

        /* 2. Sun glow - large, warm golden orb */
        .samurai-moon {
          position: fixed;
          top: 15%; right: 15%;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(150, 110, 60, 0.15) 0%, rgba(120, 90, 50, 0.08) 40%, transparent 70%);
          box-shadow: 
            0 0 80px 40px rgba(255, 180, 50, 0.15),
            0 0 150px 80px rgba(255, 150, 30, 0.1),
            inset 0 0 60px rgba(255, 200, 100, 0.2);
          z-index: 0; pointer-events: none;
          filter: blur(1px);
        }
        .samurai-moon::after {
          content: '';
          position: absolute; inset: 30px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 240, 180, 0.25) 0%, rgba(255, 200, 100, 0.1) 70%, transparent 100%);
          box-shadow: 0 0 40px rgba(255, 200, 100, 0.2);
        }

        /* 3. Fog / mist layers — animated drift with warm sunset colors */
        .fog-layer {
          position: fixed; z-index: 0;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0;
          animation: fogDrift 18s ease-in-out infinite;
        }
        .fog-1 {
          width: 90vw; height: 40vh;
          bottom: 20%; left: -20%;
          background: radial-gradient(ellipse, rgba(255, 140, 60, 0.35) 0%, transparent 70%);
          animation-duration: 22s; animation-delay: 0s;
        }
        .fog-2 {
          width: 80vw; height: 35vh;
          bottom: 15%; left: 20%;
          background: radial-gradient(ellipse, rgba(220, 60, 40, 0.28) 0%, transparent 70%);
          animation-duration: 28s; animation-delay: -8s;
        }
        .fog-3 {
          width: 70vw; height: 35vh;
          bottom: 10%; right: -10%;
          background: radial-gradient(ellipse, rgba(150, 50, 80, 0.25) 0%, transparent 70%);
          animation-duration: 20s; animation-delay: -14s;
        }
        @keyframes fogDrift {
          0%   { opacity: 0;    transform: translateX(0px) translateY(0px); }
          25%  { opacity: 1; }
          50%  { opacity: 0.7;  transform: translateX(40px) translateY(-15px); }
          75%  { opacity: 1; }
          100% { opacity: 0;    transform: translateX(0px) translateY(0px); }
        }

        /* 4. SVG brushstroke mountain silhouette — sunset lighting */
        .samurai-mountains {
          position: fixed; bottom: 0; left: 0; right: 0;
          z-index: 0; pointer-events: none;
          opacity: 1;
          filter: drop-shadow(0 0 30px rgba(255, 100, 50, 0.2));
        }

        /* 5. Cherry blossom petals - warm sunset colors */
        .petal {
          position: fixed; z-index: 0; pointer-events: none;
          width: 6px; height: 6px;
          border-radius: 0 50% 50% 50%;
          background: rgba(255, 150, 100, 0.6);
          animation: petalFall linear infinite;
          transform-origin: center;
        }
        @keyframes petalFall {
          0%   { transform: translateY(-20px) rotate(0deg)   translateX(0px);   opacity: 0; }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(105vh) rotate(720deg) translateX(60px);  opacity: 0; }
        }

        /* 6. Vertical kanji brushstroke — both sides */
        .samurai-kanji {
          position: fixed; top: 50%;
          transform: translateY(-50%);
          z-index: 0; pointer-events: none;
          font-size: 72px; line-height: 1.1;
          writing-mode: vertical-rl;
          color: rgba(255, 200, 100, 0.08);
          font-family: serif;
          letter-spacing: 0.1em;
          user-select: none;
        }
        .samurai-kanji.right { right: 3%; }
        .samurai-kanji.left  { left: 3%; transform: translateY(-50%) rotate(180deg); }

        /* 7. Horizontal ink scratch lines - sunset glow */
        .ink-line {
          position: fixed; z-index: 0; pointer-events: none;
          height: 1px; left: 0; right: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 150, 50, 0.06) 30%, rgba(255, 120, 40, 0.08) 50%, rgba(255, 150, 50, 0.06) 70%, transparent 100%);
        }

        /* Deep cinematic veil - sunset tone */
        body::before {
          content: '';
          position: fixed; inset: 0; z-index: 0;
          background: rgba(60, 20, 10, 0.15);
          pointer-events: none;
        }

        /* Edge vignette - darker at sunset */
        body::after {
          content: '';
          position: fixed; inset: 0; z-index: 0;
          background: radial-gradient(ellipse 110% 110% at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.8) 100%);
          pointer-events: none;
        }

        .oc-page {
          position: relative; z-index: 1;
          height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 24px 90px;
        }

        /* ── Header ── */
        .oc-header {
          text-align: center;
          margin-bottom: 40px;
          position: relative; z-index: 60;
        }

        .oc-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: #fbde05; margin-bottom: 10px;
        }
        .oc-eyebrow::before, .oc-eyebrow::after {
          content: ''; display: block;
          width: 22px; height: 1px;
        }
        .oc-eyebrow::before { background: linear-gradient(90deg, transparent, #fbde05); }
        .oc-eyebrow::after  { background: linear-gradient(90deg, #fbde05, transparent); }

        .oc-title {
          font-family: 'MyCustomFont', cursive;
          font-size: clamp(38px, 5.5vw, 68px);
          letter-spacing: 0.12em;
          color: #ffb347;
          line-height: 1;
          display: block;
          text-shadow: 0 0 40px rgba(255, 165, 50, 0.3), 0 4px 24px rgba(80, 20, 0, 0.5);
          font-weight: 700;
        }

        .oc-bar {
          width: 52px; height: 2px;
          background: linear-gradient(90deg, #fbde05, #ffb347);
          margin: 12px auto 0; border-radius: 2px;
          box-shadow: 0 0 14px rgba(255,122,24,0.8);
        }

        /* ── Carousel ── */
        .oc-outer {
          position: relative; z-index: 60;
          width: 100%; max-width: 1100px;
            overflow: visible;
        }

        .swiper {
          width: 100% !important;
          overflow: visible !important;
          cursor: default !important;
        }

        .swiper-slide {
          width: 280px !important;
          overflow: visible !important;
          background: transparent !important;
          transition: opacity 0.5s ease, filter 0.5s ease !important;
        }

        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.45 !important;
          filter: saturate(0.3) brightness(0.65) !important;
        }
        .swiper-slide-active {
          opacity: 1 !important;
          filter: none !important;
          z-index: 70 !important;
          position: relative !important;
        }

        /* ── Nav arrows ── */
        .nav-arrow {
          position: fixed;
          top: 50%; z-index: 200;
          transform: translateY(-50%);
          width: 70px; height: 70px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; outline: none;
          background: rgba(0,0,0,0.4);
          border: 2px solid rgba(255,255,255,0.4);
          color: white;
          font-family: 'TeamFont', sans-serif;
          font-size: 28px;
          transition: all 0.3s ease;
        }
        .nav-arrow:hover {
          transform: translateY(-50%) scale(1.1);
          border-color: white;
        }
        .nav-arrow.left  { left: 28px; }
        .nav-arrow.right { right: 28px; }

        /* ── Footer ── */
        .oc-footer {
          margin-top: 28px;
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
          position: relative; z-index: 60;
        }

        .oc-counter {
          font-family: 'Bebas Neue', cursive;
          font-size: 14px; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.3);
        }
        .oc-counter b { color: #ff7a18; font-size: 18px; }

        .oc-dots {
          display: flex; gap: 5px;
        }
        .oc-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .oc-dot.on {
          background: #ff7a18;
          width: 18px; border-radius: 3px;
          box-shadow: 0 0 8px rgba(255,122,24,0.7);
        }

        .oc-hint {
          font-size: 9px; letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.15);
          display: flex; align-items: center; gap: 10px;
        }
        .oc-hint::before, .oc-hint::after {
          content: ''; display: block;
          width: 26px; height: 1px;
          background: rgba(255,255,255,0.1);
        }

        @media (max-width: 1024px) {
          .oc-page { padding: 20px 80px; }
          .swiper-slide { width: 240px !important; }
        }
        @media (max-width: 640px) {
        .oc-eyebrow {
  font-size: 8px;
  letter-spacing: 0.18em;
  white-space: nowrap;
}
          .oc-page { padding: 16px 60px; }
          .oc-header { margin-bottom: 20px; }
          .swiper-slide { width: calc(100vw - 120px) !important; max-width: 320px !important; }
          .nav-arrow { width: 40px; height: 40px; }
          .nav-arrow.left  { left: 8px; }
          .nav-arrow.right { right: 8px; }
        }
        @media (max-width: 380px) {
          .swiper-slide { width: calc(100vw - 100px) !important; }
        }
      `}</style>

      {/* ── SUNSET BACKGROUND ── */}
      <div className="samurai-bg" />
      {/* Fog layers */}
      <div className="fog-layer fog-1" />
      <div className="fog-layer fog-2" />
      <div className="fog-layer fog-3" />

      {/* Ink lines */}
      <div className="ink-line" style={{ top: "32%" }} />
      <div className="ink-line" style={{ top: "67%" }} />

      {/* Kanji characters — both sides decorative */}
      <div className="samurai-kanji right">影侍道義</div>
      <div className="samurai-kanji left">武士魂誉</div>

      {/* Mountain silhouette SVG */}
      <svg className="samurai-mountains" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,320 L0,200 Q60,180 120,200 L200,120 L280,200 Q320,220 360,210 L480,80 L560,160 L620,90 L700,180 Q740,200 780,185 L900,60 L980,140 L1040,80 L1120,160 Q1160,175 1200,165 L1300,100 L1380,170 L1440,150 L1440,320 Z"
          fill="rgba(60, 25, 15, 0.95)" />
        <path d="M0,320 L0,240 Q80,220 160,240 L260,170 L340,230 Q400,250 440,240 L560,150 L640,200 L720,160 L820,230 Q880,248 920,238 L1020,170 L1100,210 L1180,180 Q1240,200 1280,195 L1380,230 L1440,220 L1440,320 Z"
          fill="rgba(20, 10, 5, 1)" />
      </svg>

      {/* Cherry blossom petals — staggered with sunset colors */}
      {[
        { left:"8%",  size:5,  dur:"12s", delay:"0s",   opacity:0.5 },
        { left:"18%", size:4,  dur:"16s", delay:"-4s",  opacity:0.4 },
        { left:"28%", size:7,  dur:"10s", delay:"-8s",  opacity:0.6 },
        { left:"38%", size:4,  dur:"18s", delay:"-2s",  opacity:0.35 },
        { left:"50%", size:6,  dur:"14s", delay:"-10s", opacity:0.5 },
        { left:"60%", size:5,  dur:"11s", delay:"-6s",  opacity:0.45 },
        { left:"72%", size:4,  dur:"17s", delay:"-1s",  opacity:0.4 },
        { left:"82%", size:6,  dur:"13s", delay:"-9s",  opacity:0.55 },
        { left:"90%", size:5,  dur:"15s", delay:"-3s",  opacity:0.4 },
        { left:"96%", size:4,  dur:"9s",  delay:"-7s",  opacity:0.35 },
      ].map((p, i) => (
        <div key={i} className="petal" style={{
          left: p.left,
          width: p.size, height: p.size,
          opacity: p.opacity,
          animationDuration: p.dur,
          animationDelay: p.delay,
          background: `rgba(${220+Math.random()*35|0},${120+Math.random()*50|0},${80+Math.random()*40|0},0.6)`,
          borderRadius: i % 3 === 0 ? "0 50% 50% 50%" : i % 3 === 1 ? "50% 0 50% 50%" : "50% 50% 0 50%",
        }} />
      ))}

      {/* Nav arrows */}
      <button className="nav-arrow left" onClick={slidePrev} aria-label="Previous">
        ⛩
      </button>
      <button className="nav-arrow right" onClick={slideNext} aria-label="Next">
        ⛩
      </button>

      <div className="oc-page" ref={sectionRef}>

        <div className="oc-header">
          <div className="oc-eyebrow">IEEE Student Branch JIIT</div>
          <span className="oc-title">Organising Committee</span>
          <div className="oc-bar" />
        </div>

        <div className="oc-outer">
          <div className="swiper" ref={swiperRef}>
            <div className="swiper-wrapper">
              {members.map((m, i) => (
                <div
                  className="swiper-slide"
                  key={m.name}
                >
                  <MemberCard member={m} index={i} isActive={i === activeIdx} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="oc-footer">
          <div className="oc-counter">
            <b>{String(activeIdx + 1).padStart(2, "0")}</b>
            {" / "}
            {String(members.length).padStart(2, "0")}
          </div>

          <div className="oc-dots">
            {members.map((_, i) => (
              <div
                key={i}
                className={`oc-dot ${i === activeIdx ? "on" : ""}`}
                onClick={() => swiperInstance.current?.slideToLoop(i)}
              />
            ))}
          </div>

          <p className="oc-hint">scroll or use arrow keys</p>
        </div>

      </div>
    </>
  );
}
