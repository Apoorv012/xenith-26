import { useEffect, useRef, useState, useCallback } from "react";

const members = [
  { name: "Dr Abhay Kumar",     role: "Branch Counsellor",     img: "images-oc/Dr.AbhayKumar.webp" },
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
          borderRadius: 20, padding: "3px 10px",
          marginBottom: 8,
          transition: "border-color 0.3s ease",
        }}>
          <span style={{
            fontSize: 8, fontFamily: "'Inter', sans-serif",
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
          fontSize: 22, letterSpacing: "0.06em",
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
    const init = async () => {
      if (!document.querySelector("#swiper-css")) {
        const link = document.createElement("link");
        link.id = "swiper-css"; link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
        document.head.appendChild(link);
      }
      if (!window.Swiper) {
        await new Promise(res => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
          s.onload = res; document.head.appendChild(s);
        });
      }
      if (swiperRef.current && !swiperInstance.current) {
        swiperInstance.current = new window.Swiper(swiperRef.current, {
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
      }
    };
    init();
    return () => { swiperInstance.current?.destroy(true, true); swiperInstance.current = null; };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
       

        /* ── SAMURAI BACKGROUND LAYERS ── */

        /* 1. Deep ink-wash base gradient */
        .samurai-bg {
          position: fixed; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 75% 40%, rgba(120,15,15,0.75) 0%, transparent 65%),
            radial-gradient(ellipse 60% 80% at 20% 60%, rgba(30,15,50,0.75) 0%, transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(8,8,25,0.95) 0%, transparent 60%),
            linear-gradient(170deg, #150608 0%, #1a0c10 30%, #100a18 60%, #0c0608 100%);
          pointer-events: none;
        }

        /* 2. Moon glow top-right */
        .samurai-moon {
          position: fixed;
          top: 6%; right: 10%;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,240,200,0.18) 0%, rgba(255,200,100,0.06) 50%, transparent 70%);
          box-shadow: 0 0 60px 30px rgba(255,200,80,0.07), 0 0 120px 60px rgba(255,150,30,0.04);
          z-index: 0; pointer-events: none;
        }
        .samurai-moon::after {
          content: '';
          position: absolute; inset: 18px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,245,210,0.22) 0%, rgba(255,220,140,0.1) 60%, transparent 100%);
          box-shadow: 0 0 30px rgba(255,220,140,0.15);
        }

        /* 3. Fog / mist layers — animated drift */
        .fog-layer {
          position: fixed; z-index: 0;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0;
          animation: fogDrift 18s ease-in-out infinite;
        }
        .fog-1 {
          width: 80vw; height: 30vh;
          bottom: 0; left: -20%;
          background: radial-gradient(ellipse, rgba(120,60,80,0.35) 0%, transparent 70%);
          animation-duration: 22s; animation-delay: 0s;
        }
        .fog-2 {
          width: 60vw; height: 20vh;
          bottom: 5%; left: 30%;
          background: radial-gradient(ellipse, rgba(90,50,100,0.28) 0%, transparent 70%);
          animation-duration: 28s; animation-delay: -8s;
        }
        .fog-3 {
          width: 50vw; height: 25vh;
          bottom: 10%; right: -10%;
          background: radial-gradient(ellipse, rgba(80,40,70,0.25) 0%, transparent 70%);
          animation-duration: 20s; animation-delay: -14s;
        }
        @keyframes fogDrift {
          0%   { opacity: 0;    transform: translateX(0px) translateY(0px); }
          25%  { opacity: 1; }
          50%  { opacity: 0.7;  transform: translateX(40px) translateY(-15px); }
          75%  { opacity: 1; }
          100% { opacity: 0;    transform: translateX(0px) translateY(0px); }
        }

        /* 4. SVG brushstroke mountain silhouette — fixed bottom */
        .samurai-mountains {
          position: fixed; bottom: 0; left: 0; right: 0;
          z-index: 0; pointer-events: none;
          opacity: 1;
        }

        /* 5. Cherry blossom petals */
        .petal {
          position: fixed; z-index: 0; pointer-events: none;
          width: 6px; height: 6px;
          border-radius: 0 50% 50% 50%;
          background: rgba(255,180,180,0.55);
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
          color: rgba(255,255,255,0.03);
          font-family: serif;
          letter-spacing: 0.1em;
          user-select: none;
        }
        .samurai-kanji.right { right: 3%; }
        .samurai-kanji.left  { left: 3%; transform: translateY(-50%) rotate(180deg); }

        /* 7. Horizontal ink scratch lines */
        .ink-line {
          position: fixed; z-index: 0; pointer-events: none;
          height: 1px; left: 0; right: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 70%, transparent 100%);
        }

        /* deep cinematic dark veil */
        body::before {
          content: '';
          position: fixed; inset: 0; z-index: 0;
          background: rgba(0,0,0,0.22);
          pointer-events: none;
        }

        /* edge vignette */
        body::after {
          content: '';
          position: fixed; inset: 0; z-index: 0;
          background: radial-gradient(ellipse 110% 110% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%);
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
          color: #ff7a18; margin-bottom: 10px;
        }
        .oc-eyebrow::before, .oc-eyebrow::after {
          content: ''; display: block;
          width: 22px; height: 1px;
        }
        .oc-eyebrow::before { background: linear-gradient(90deg, transparent, #ff7a18); }
        .oc-eyebrow::after  { background: linear-gradient(90deg, #ff7a18, transparent); }

        .oc-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(38px, 5.5vw, 68px);
          letter-spacing: 0.12em; color: #fff; line-height: 1;
          display: block;
        }

        .oc-bar {
          width: 52px; height: 2px;
          background: linear-gradient(90deg, #ff7a18, #ffb347);
          margin: 12px auto 0; border-radius: 2px;
          box-shadow: 0 0 14px rgba(255,122,24,0.8);
        }

        /* ── Carousel ── */
        .oc-outer {
          position: relative; z-index: 60;
          width: 100%; max-width: 1100px;
          overflow-x: clip; overflow-y: visible;
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
          /* lift above spotlight veil */
          z-index: 70 !important;
          position: relative !important;
        }

        /* ── Nav arrows — FIXED to page, always visible above everything ── */
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
          .oc-page { padding: 16px 60px; }
          .oc-header { margin-bottom: 20px; }
          /* on mobile, card fills most of the screen width */
          .swiper-slide { width: calc(100vw - 120px) !important; max-width: 320px !important; }
          .nav-arrow { width: 40px; height: 40px; }
          .nav-arrow.left  { left: 8px; }
          .nav-arrow.right { right: 8px; }
        }
        @media (max-width: 380px) {
          .swiper-slide { width: calc(100vw - 100px) !important; }
        }
      `}</style>

      {/* ── SAMURAI BACKGROUND ── */}
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
          fill="rgba(25,10,35,0.97)" />
        <path d="M0,320 L0,240 Q80,220 160,240 L260,170 L340,230 Q400,250 440,240 L560,150 L640,200 L720,160 L820,230 Q880,248 920,238 L1020,170 L1100,210 L1180,180 Q1240,200 1280,195 L1380,230 L1440,220 L1440,320 Z"
          fill="rgba(15,8,22,1)" />
      </svg>

      {/* Cherry blossom petals — staggered */}
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
          background: `rgba(${200+Math.random()*55|0},${140+Math.random()*40|0},${160+Math.random()*40|0},0.6)`,
          borderRadius: i % 3 === 0 ? "0 50% 50% 50%" : i % 3 === 1 ? "50% 0 50% 50%" : "50% 50% 0 50%",
        }} />
      ))}

      {/* Nav arrows — fixed to page, z-index 200, always on top */}
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
