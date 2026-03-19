// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Lenis from "@studio-freight/lenis";
// import "./Hero.css";

// gsap.registerPlugin(ScrollTrigger);

// const IS_MOBILE = () => window.innerWidth < 768;
// const FRAME_COUNT = IS_MOBILE() ? 96 : 192;
// const getFrameSrc = (i) => `/framess/frame_${String(i + 1).padStart(4, "0")}.jpg`;

// export default function Hero() {
//   const heroRef = useRef(null);
//   const canvasRef = useRef(null);
//   const headerRef = useRef(null);

//   const imagesRef = useRef([]);
//   const videoFrameRef = useRef({ frame: 0 });
//   const [loaded, setLoaded] = useState(false);

//   // Canvas helpers 

//   const setCanvasSize = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const dpr = Math.min(window.devicePixelRatio, 2);
//     const w = window.innerWidth;
//     const h = window.innerHeight;

//     canvas.width = w * dpr;
//     canvas.height = h * dpr;
//     canvas.style.width = `${w}px`;
//     canvas.style.height = `${h}px`;

//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.scale(dpr, dpr);
//   };

//   const render = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const img = imagesRef.current[videoFrameRef.current.frame];
//     if (!img?.complete || !img.naturalWidth) return;

//     const w = window.innerWidth;
//     const h = window.innerHeight;
//     const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
//     const dw = img.naturalWidth * scale;
//     const dh = img.naturalHeight * scale;

//     ctx.clearRect(0, 0, w, h);
//     ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
//   };

//   // Preload frames 

//   useEffect(() => {
//     let remaining = FRAME_COUNT;

//     for (let i = 0; i < FRAME_COUNT; i++) {
//       const img = new Image();
//       img.src = getFrameSrc(i);
//       img.onload = img.onerror = () => {
//         remaining--;
//         if (remaining === 0) setLoaded(true);
//       };
//       imagesRef.current[i] = img;
//     }
//   }, []);

//   // Scroll + GSAP setup 

//   useEffect(() => {
//     if (!loaded) return;

//     setCanvasSize();
//     render();

//     // const lenis = new Lenis();
//     // lenis.on("scroll", ScrollTrigger.update);
//     // gsap.ticker.add((time) => lenis.raf(time * 1000));
//     // gsap.ticker.lagSmoothing(0);

//     const scrollEnd = () =>
//       `+=${window.innerHeight * (IS_MOBILE() ? 3 : 5)}`;

//     ScrollTrigger.create({
//       trigger: heroRef.current,
//       start: "top top",
//       end: scrollEnd,
//       pin: true,
//       scrub: 1,
//       onUpdate: ({ progress }) => {
//         // Update canvas frame
//         videoFrameRef.current.frame = Math.min(
//           Math.round(progress * (FRAME_COUNT - 1)),
//           FRAME_COUNT - 1
//         );
//         render();

//         // Fade out header in first 25% of scroll
//         gsap.set(headerRef.current, {
//           opacity: progress < 0.25 ? 1 - progress / 0.25 : 0,
//         });
//       },
//     });

//     const handleResize = () => {
//       setCanvasSize();
//       render();
//       ScrollTrigger.refresh();
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//       // lenis.destroy();
//     };
//   }, [loaded]);

//   // Render
//   return (
//     <section className="hero" ref={heroRef}>
//       <canvas ref={canvasRef} />
//       <div className="hero-content">
//         <div className="header" ref={headerRef}>
//   <div className="hero-event-name">XENITH<span className="hero-event-apostrophe">'26</span></div>

//   <h1 className="hero-title">
//     {["S","h","a","d","o","w","s","\u00A0","o","f","\u00A0","S","a","m","u","r","a","i"].map((char, i) => (
//       <span
//         key={i}
//         className="char-glow"
//         style={{ animationDelay: `${i * 0.1}s` }}
//       >
//         {char}
//       </span>
//     ))}
//   </h1>

// <p className="hero-tagline">IEEE SB JIIT  Technical Fest  2026</p></div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const IS_MOBILE = () => window.innerWidth < 768;
const FRAME_COUNT = IS_MOBILE() ? 96 : 192;
const getFrameSrc = (i) => `/framess/frame_${String(i + 1).padStart(4, "0")}.jpg`;

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const headerRef = useRef(null);
  const audioRef = useRef(null);

  const imagesRef = useRef([]);
  const videoFrameRef = useRef({ frame: 0 });
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Canvas helpers 

  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[videoFrameRef.current.frame];
    if (!img?.complete || !img.naturalWidth) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  // Preload frames 

  useEffect(() => {
    let remaining = FRAME_COUNT;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = img.onerror = () => {
        remaining--;
        if (remaining === 0) setLoaded(true);
      };
      imagesRef.current[i] = img;
    }
  }, []);

  // Music setup
  useEffect(() => {
    const audio = new Audio("/music/homepage-music-trimmed.mp3");
    audio.volume = 0.2;
    audio.loop = true;
    audioRef.current = audio;

    audio.play().catch(() => {
      console.log("Auto-play blocked - user must click music button");
    });

    setIsPlaying(true);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Scroll + GSAP setup 

  useEffect(() => {
    if (!loaded) return;

    setCanvasSize();
    render();

    // const lenis = new Lenis();
    // lenis.on("scroll", ScrollTrigger.update);
    // gsap.ticker.add((time) => lenis.raf(time * 1000));
    // gsap.ticker.lagSmoothing(0);

    const scrollEnd = () =>
      `+=${window.innerHeight * (IS_MOBILE() ? 3 : 5)}`;

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: scrollEnd,
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        // Update canvas frame
        videoFrameRef.current.frame = Math.min(
          Math.round(progress * (FRAME_COUNT - 1)),
          FRAME_COUNT - 1
        );
        render();

        // Fade out header in first 25% of scroll
        gsap.set(headerRef.current, {
          opacity: progress < 0.25 ? 1 - progress / 0.25 : 0,
        });
      },
    });

    const handleResize = () => {
      setCanvasSize();
      render();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // lenis.destroy();
    };
  }, [loaded]);

  // Toggle music
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Render
  return (
    <section className="hero" ref={heroRef}>
      <canvas ref={canvasRef} />
      
      <button 
        className="music-toggle" 
        onClick={toggleMusic}
        aria-label="Toggle music"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>

      <div className="hero-content">
        <div className="header" ref={headerRef}>
          <div className="hero-event-name">XENITH<span className="hero-event-apostrophe">'26</span></div>

          <h1 className="hero-title">
            {["S","h","a","d","o","w","s","\u00A0","o","f","\u00A0","S","a","m","u","r","a","i"].map((char, i) => (
              <span
                key={i}
                className="char-glow"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </h1>

          <p className="hero-tagline">IEEE SB JIIT  Technical Fest  2026</p>
        </div>
      </div>
    </section>
  );
}
