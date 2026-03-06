import { useState, useEffect, useRef, useCallback } from "react";

const PANELS = [
  {
    id: 1, width: "75vw", kanji: "山", number: "○一 — 01",
    title: ["Where Mountains", "Hold Their Breath"], titleItalic: 1,
    caption: "A fleeting moment caught between light and shadow",
    img: "https://ik.imagekit.io/bovzndiqc/14.jpg?updatedAt=1771946252288", alt: "Photo 1",
  },
  {
    id: 2, width: "40vw", kanji: "森", number: "○二 — 02",
    title: ["Into the", "Ancient Green"], titleItalic: 0,
    caption: "Time moves differently here, slow and golden",
    img: "https://ik.imagekit.io/bovzndiqc/12.jpg?updatedAt=1771946253889", alt: "Photo 2",
  },
  {
    id: 3, width: "90vw", kanji: "海", number: "○三 — 03",
    title: ["The Sea", "Remembers Everything"], titleItalic: 1,
    caption: "Every colour the sky has ever worn",
    img: "https://ik.imagekit.io/bovzndiqc/15.jpg?updatedAt=1771946253761", alt: "Photo 3",
  },
  {
    id: 4, width: "55vw", kanji: "砂", number: "○四 — 04",
    title: ["Sand, Wind,", "& Forgotten Hours"], titleItalic: 1,
    caption: "The world exhales and turns to amber",
    img: "https://ik.imagekit.io/bovzndiqc/7.jpg?updatedAt=1771946231224", alt: "Photo 4",
  },
  {
    id: 5, width: "75vw", kanji: "鏡", number: "○五 — 05",
    title: ["Mirror", "of Still Water"], titleItalic: 0,
    caption: "Somewhere between dusk and memory",
    img: "https://ik.imagekit.io/bovzndiqc/10.jpg?updatedAt=1771946250370", alt: "Photo 5",
  },
  {
    id: 6, width: "40vw", kanji: "岩", number: "○六 — 06",
    title: ["Stone Older", "Than Language"], titleItalic: 1,
    caption: "Silence has a colour and this is it",
    img: "https://ik.imagekit.io/bovzndiqc/8.jpg?updatedAt=1771946249131", alt: "Photo 6",
  },
  {
    id: 7, width: "90vw", kanji: "星", number: "○七 — 07",
    title: ["Light From", "Dead Stars"], titleItalic: 1,
    caption: "A quiet end to a burning day",
    img: "https://ik.imagekit.io/bovzndiqc/17.JPG?updatedAt=1771946247972", alt: "Photo 7",
  },
  {
    id: 8, width: "55vw", kanji: "風", number: "○八 — 08",
    title: ["The Wind", "Carries No Name"], titleItalic: 0,
    caption: "Drifting without weight, without destination",
    img: "https://ik.imagekit.io/bovzndiqc/4.jpg?updatedAt=1771946247791", alt: "Photo 8",
  },
  {
    id: 9, width: "75vw", kanji: "霧", number: "○九 — 09",
    title: ["Lost in", "Gentle Fog"], titleItalic: 1,
    caption: "The mist erases everything unnecessary",
    img: "https://ik.imagekit.io/bovzndiqc/11.jpg?updatedAt=1771946245953", alt: "Photo 9",
  },
  {
    id: 10, width: "40vw", kanji: "火", number: "○十 — 10",
    title: ["Embers", "of the Last Hour"], titleItalic: 0,
    caption: "Warmth that lingers long after the flame",
    img: "https://ik.imagekit.io/bovzndiqc/18.jpg?updatedAt=1771946238847", alt: "Photo 10",
  },
  {
    id: 11, width: "90vw", kanji: "夢", number: "○十一 — 11",
    title: ["Between Sleep", "& Waking"], titleItalic: 1,
    caption: "That hour when the world holds its breath",
    img: "https://ik.imagekit.io/bovzndiqc/19.jpg?updatedAt=1771946237665", alt: "Photo 11",
  },
  {
    id: 12, width: "75vw", kanji: "暮", number: "○十二 — 12",
    title: ["Dusk Settles", "Like a Memory"], titleItalic: 1,
    caption: "Every ending is just light taking its leave",
    img: "https://ik.imagekit.io/bovzndiqc/6.jpg?updatedAt=1771946231775", alt: "Photo 12",
  },
  {
    id: 13, width: "55vw", kanji: "空", number: "○十三 — 13",
    title: ["The Sky", "Forgets Nothing"], titleItalic: 0,
    caption: "Colour bleeds slowly into the horizon",
    img: "https://ik.imagekit.io/bovzndiqc/20.jpg?updatedAt=1771946231805", alt: "Photo 13",
  },
  {
    id: 14, width: "75vw", kanji: "道", number: "○十四 — 14",
    title: ["The Road", "Has No Return"], titleItalic: 1,
    caption: "Some paths only go forward, never back",
    img: "https://ik.imagekit.io/bovzndiqc/5.jpg?updatedAt=1771946231495", alt: "Photo 14",
  },
];

function useLerp(target, factor = 0.1) {
  const current = useRef(0);
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    const tick = () => {
      const diff = target - current.current;
      if (Math.abs(diff) < 0.3) {
        current.current = target;
      } else {
        current.current += diff * factor;
      }
      setDisplay(current.current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, factor]);

  return display;
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => { if (e.target.closest(".panel-img-wrap")) setHovered(true); };
    const out  = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <div style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        left: pos.x, top: pos.y,
        width: hovered ? 14 : 10, height: hovered ? 14 : 10,
        borderRadius: "50%",
        background: "#b8935a",
        transform: "translate(-50%, -50%)",
        transition: "width 0.3s, height 0.3s",
        mixBlendMode: "difference",
      }} />
      <div style={{
        position: "fixed", zIndex: 9998, pointerEvents: "none",
        left: pos.x, top: pos.y,
        width: hovered ? 52 : 38, height: hovered ? 52 : 38,
        borderRadius: "50%",
        border: "1px solid #b8935a",
        transform: "translate(-50%, -50%)",
        transition: "left 0.2s ease, top 0.2s ease, width 0.3s, height 0.3s",
        opacity: 0.45,
      }} />
    </>
  );
}

function Separator() {
  return (
    <div style={{
      flexShrink: 0, width: "11vw", height: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      <div style={{
        width: 1, height: "58vh",
        background: "linear-gradient(to bottom, transparent, #b8935a 30%, #b8935a 70%, transparent)",
        opacity: 0.15,
      }} />
      <div style={{
        position: "absolute",
        width: 7, height: 7,
        background: "#b8935a",
        transform: "rotate(45deg)",
        opacity: 0.28,
      }} />
    </div>
  );
}

function ImagePanel({ panel, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="panel-img-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: panel.width,
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      {/* Image */}
      <img
        src={panel.img}
        alt={panel.alt}
        loading="lazy"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: hovered
            ? "saturate(0.9) brightness(0.78) sepia(0.1)"
            : "saturate(0.65) brightness(0.6) sepia(0.22)",
          transform: hovered ? "scale(1.02)" : "scale(1.06)",
          transition: "filter 0.9s ease, transform 5s ease",
        }}
      />

      {/* Overlay gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(6,4,2,0.93) 0%, rgba(6,4,2,0.28) 38%, rgba(6,4,2,0.05) 62%, rgba(6,4,2,0.22) 100%)",
      }} />

      {/* Gold frame */}
      <div style={{
        position: "absolute", inset: "2.4rem",
        border: `2.5px solid ${hovered ? "rgba(184,147,90,0.32)" : "rgba(184,147,90,0.15)"}`,
        transition: "border-color 0.5s ease",
        pointerEvents: "none",
      }} />

      {/* Kanji watermark */}
      <div style={{
        position: "absolute", top: "3.8rem", right: "3.8rem",
        fontFamily: "'Noto Serif JP', serif",
        fontWeight: 200,
        fontSize: "4.5rem",
        color: "#b8935a",
        opacity: hovered ? 0.16 : 0.07,
        lineHeight: 1,
        writingMode: "vertical-rl",
        letterSpacing: "0.1em",
        transition: "opacity 0.5s ease",
        userSelect: "none",
      }}>
        {panel.kanji}
      </div>

      {/* Meta */}
      <div style={{
        position: "absolute", bottom: "3.8rem", left: "3.8rem", right: "3.8rem",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.95s ease 0.15s, transform 0.95s ease 0.15s",
      }}>
        <p style={{
          fontFamily: "'Noto Serif JP', serif",
          fontWeight: 200,
          fontSize: "0.6rem",
          color: "#b8935a",
          letterSpacing: "0.5em",
          marginBottom: "0.9rem",
          opacity: 0.6,
        }}>
          {panel.number}
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "clamp(1.9rem, 3.2vw, 3.4rem)",
          color: "#c8b99a",
          lineHeight: 1.12,
          letterSpacing: "0.02em",
          marginBottom: "0.8rem",
        }}>
          {panel.title.map((line, i) => (
            <span key={i} style={{
              display: "block",
              fontStyle: i === panel.titleItalic ? "italic" : "normal",
              color: i === panel.titleItalic ? "#e2c27a" : "#c8b99a",
            }}>
              {line}
            </span>
          ))}
        </h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.76rem",
          color: "#c8b99a",
          opacity: 0.42,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          maxWidth: "28ch",
          lineHeight: 1.85,
        }}>
          {panel.caption}
        </p>
      </div>
    </div>
  );
}

export default function EmakimonoGallery() {
  const [targetX, setTargetX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [inViewSet, setInViewSet] = useState(new Set());
  const [hintVisible, setHintVisible] = useState(false);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const smoothX = useLerp(targetX, 0.09);
  const progress = maxScroll > 0 ? (smoothX / maxScroll) * 100 : 0;

  // Current panel for counter
  const currentPanel = PANELS.reduce((closest, panel) => {
    const el = document.getElementById(`panel-${panel.id}`);
    if (!el) return closest;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(center - window.innerWidth / 2);
    return dist < closest.dist ? { id: panel.id, dist } : closest;
  }, { id: 1, dist: Infinity });

  // Measure max scroll
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setMaxScroll(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Check in-view panels
  useEffect(() => {
    const newSet = new Set();
    PANELS.forEach(({ id }) => {
      const el = document.getElementById(`panel-${id}`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.left < window.innerWidth * 0.88 && rect.right > window.innerWidth * 0.12) {
        newSet.add(id);
      }
    });
    setInViewSet(newSet);
  }, [smoothX]);

  // Hint animation
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // Wheel
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      setTargetX((x) => Math.max(0, Math.min(maxScroll, x + (e.deltaY || e.deltaX) * 1.6)));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [maxScroll]);

  // Touch
  useEffect(() => {
    const onStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onMove = (e) => {
      const dx = touchStartX.current - e.touches[0].clientX;
      const dy = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
        setTargetX((x) => Math.max(0, Math.min(maxScroll, x + dx * 1.4)));
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
    };
  }, [maxScroll]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      const step = window.innerWidth * 0.7;
      if (e.key === "ArrowRight") setTargetX((x) => Math.min(maxScroll, x + step));
      if (e.key === "ArrowLeft")  setTargetX((x) => Math.max(0, x - step));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [maxScroll]);

  const fmtCounter = (id) =>
    `${String(id).padStart(2, "0")} / ${String(PANELS.length).padStart(2, "0")}`;

  return (
    <>
      {/* Google Fonts
      * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow: hidden; background: #120e0b; cursor: none; }
         */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Noto+Serif+JP:wght@200;300&display=swap');
        
        @keyframes introReveal {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hintFade {
          to { opacity: 0.7; }
        }
        @keyframes grainAnim {
          0%,100% { transform: translate(0,0); }
          25% { transform: translate(-1%,-1%); }
          50% { transform: translate(1%,0); }
          75% { transform: translate(0,1%); }
        }
      `}</style>

      <Cursor />

      {/* Grain */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none",
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px",
        animation: "grainAnim 0.4s steps(1) infinite",
      }} />

      {/* Vignette */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 99, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 38%, rgba(4,2,1,0.88) 100%)",
      }} />

      {/* Progress bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, zIndex: 200,
        height: 2,
        width: `${progress}%`,
        background: "linear-gradient(90deg, #b8935a, #e2c27a)",
        boxShadow: "0 0 14px #b8935a",
        transition: "width 0.08s linear",
      }} />

      {/* Header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "2.2rem 3.5rem",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        pointerEvents: "none",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: 200, fontSize: "0.72rem",
            color: "#b8935a", letterSpacing: "0.5em", opacity: 0.8,
          }}>絵 巻 物</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, fontStyle: "italic", fontSize: "1.5rem",
            color: "#c8b99a", letterSpacing: "0.15em",
          }}>Emakimono</span>
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300, fontSize: "0.68rem",
          color: "#b8935a", letterSpacing: "0.4em",
          textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: "1rem",
          opacity: hintVisible ? 0.7 : 0,
          transition: "opacity 1.2s ease",
        }}>
          <span style={{ display: "inline-block", width: 40, height: 1, background: "#b8935a", opacity: 0.5 }} />
          Scroll to unfurl
        </div>
      </header>

      {/* Counter */}
      <div style={{
        position: "fixed", bottom: "2.5rem", right: "3.5rem", zIndex: 200,
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300, fontSize: "0.68rem",
        color: "#b8935a", letterSpacing: "0.3em", opacity: 0.6,
      }}>
        {fmtCounter(currentPanel.id)}
      </div>

      {/* Track */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100vh",
            transform: `translateX(${-smoothX}px)`,
            willChange: "transform",
          }}
        >
          {/* ── INTRO ── */}
          <div style={{
            flexShrink: 0, width: "100vw", height: "100vh",
            position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 60% 80% at 70% 50%, rgba(184,147,90,0.07) 0%, transparent 70%), #120e0b",
            }} />
            {/* Vertical lines */}
            {[{ left: "12vw" }, { right: "12vw" }].map((pos, i) => (
              <div key={i} style={{
                position: "absolute", top: "8vh", bottom: "8vh", width: 10,
                background: "linear-gradient(to bottom, transparent, #b8935a 30%, #b8935a 70%, transparent)",
                opacity: 0.12, ...pos,
              }} />
            ))}
            <div style={{
              position: "relative", zIndex: 2, textAlign: "center",
              animation: "introReveal 1.4s ease 0.3s both",
            }}>
              <p style={{
                fontFamily: "'Noto Serif JP', serif",
                fontWeight: 200, fontSize: "0.62rem",
                color: "#b8935a", letterSpacing: "0.8em", marginBottom: "2rem", opacity: 0.65,
              }}>
                A curated visual journey
              </p>
              <div style={{
                width: 60, height: 2,
                background: "linear-gradient(90deg, transparent, #b8935a, transparent)",
                margin: "0 auto 2rem",
              }} />
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(4rem, 8vw, 8rem)",
                color: "#c8b99a",
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
                marginBottom: "2.5rem",
              }}>
                IEEE
                <span style={{ display: "block", fontStyle: "italic", color: "#e2c27a" }}>Gallery '26</span>
              </h1>
              <div style={{
                width: 60, height: 1,
                background: "linear-gradient(90deg, transparent, #b8935a, transparent)",
                margin: "0 auto 2rem",
              }} />
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.82rem", color: "#c8b99a",
                letterSpacing: "0.35em", opacity: 0.38, textTransform: "uppercase",
              }}>
                Scroll to begin
              </p>
            </div>
          </div>

          {/* ── PANELS ── */}
          {PANELS.map((panel) => (
            <>
              <Separator key={`sep-${panel.id}`} />
              <div key={panel.id} id={`panel-${panel.id}`}>
                <ImagePanel panel={panel} inView={inViewSet.has(panel.id)} />
              </div>
            </>
          ))}

          {/* ── SEPARATOR ── */}
          <Separator />

          {/* ── OUTRO ── */}
          <div style={{
            flexShrink: 0, width: "75vw", height: "100vh",
            position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 70% 70% at 30% 50%, rgba(184,147,90,0.05) 0%, transparent 70%), #0a0806",
            }} />
            <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300, fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
                color: "#c8b99a", opacity: 0.48,
                letterSpacing: "0.05em", lineHeight: 1.55,
              }}>
                The scroll<br />comes to its end.
              </p>
              <span style={{
                display: "block",
                fontFamily: "'Noto Serif JP', serif",
                fontWeight: 200, fontSize: "0.58rem",
                color: "#b8935a", letterSpacing: "0.65em",
                opacity: 0.38, marginTop: "2.5rem",
                textTransform: "uppercase",
              }}>
                巻 末 — Fin
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}