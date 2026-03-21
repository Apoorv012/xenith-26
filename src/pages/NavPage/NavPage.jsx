import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./NavPage.css";

export default function NavPage() {
  const spotlightRef = useRef(null);
  const cleanupRef = useRef(null);
  const titlesContainerRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const spotlightHeaderRef = useRef(null);
  const titlesContainerElementRef = useRef(null);
  const bgImgRef = useRef(null);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    window.scrollTo(0, 0);
    navigate(path);
  };

  const spotlightItems = [
    { name: "Home",       img: "/images-nav/img_1.jpg", path: "/" },
    { name: "About Us",   img: "/images-nav/img_4.png", path: "/about" },
    { name: "Events",     img: "/images-nav/img_2.jpg", path: "/events" },
    { name: "Timeline",   img: "/images-nav/img_3.png", path: "/timeline" },
    { name: "Gallery",    img: "/images-nav/img_5.png", path: "/gallery" },
    { name: "Team",       img: "/images-nav/img_6.jpg", path: "/team" },
    { name: "Contact Us", img: "/images-nav/img_7.jpg", path: "/contact" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.normalizeScroll(true);

      gsap.set(spotlightHeaderRef.current, { opacity: 1 });

      const images = imagesContainerRef.current.querySelectorAll(".spotlight-img");
      const titles = titlesContainerRef.current.querySelectorAll("h1");

      gsap.set(titlesContainerRef.current, { y: window.innerHeight });

      const config = { gap: 0.08, speed: 0.3 };

      const getImgProgressState = (index, progress) => {
        const start = index * config.gap;
        const end   = start + config.speed;
        if (progress < start) return -1;
        if (progress > end)   return  2;
        return (progress - start) / config.speed;
      };

      const st = ScrollTrigger.create({
        trigger: spotlightRef.current,
        start: "top top",
        // end: () =>
        //   "+=" + (window.innerHeight + titlesContainerRef.current.scrollHeight),
        end: () => {
  const titlesHeight = titlesContainerRef.current.scrollHeight;
  const viewportHeight = window.innerHeight;
  const lastTitleOffset = titlesHeight - viewportHeight * 0.5;
  return "+=" + (viewportHeight + lastTitleOffset);
},
        scrub: true,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress       = self.progress;
          const viewportHeight = window.innerHeight;
          const viewportWidth  = window.innerWidth;
          const titlesHeight   = titlesContainerRef.current.scrollHeight;

          const isMobile = viewportWidth < 768;
          const isSmall  = viewportWidth < 480;

          // Fluid image sizes — scale with viewport on mobile, fixed on desktop
          const imgWidth = isSmall
            ? Math.round(viewportWidth * 0.26)
            : isMobile
            ? Math.round(viewportWidth * 0.28)
            : 200;

          const imgHeight = Math.round(imgWidth * 0.75);

          // On desktop images arc on the right half (0.55)
          // On mobile they sit in the right ~40-45% so they don't cover titles
          const offsetX = viewportWidth * (isSmall ? 0.56 : isMobile ? 0.58 : 0.55);

          const lastImgStart   = (images.length - 1) * config.gap;
          const totalRange     = lastImgStart + config.speed;

          const startY         = viewportHeight;
          // const targetY        = -titlesHeight;
          const targetY = -(titlesHeight - viewportHeight * 0.2);
          const syncedProgress = Math.min(progress / totalRange, 1);
          const currentY       = startY - syncedProgress * (startY - targetY);
          gsap.set(titlesContainerRef.current, { y: currentY });

          let activeIndex  = -1;
          let closestToMid = Infinity;

          images.forEach((img, index) => {
            const p     = getImgProgressState(index, progress);
            const title = titles[index];

            if (p <= 0 || p >= 1) {
              gsap.set(img, { opacity: 0, x: 0, y: 0 });
              gsap.set(title, { opacity: 0 });
              return;
            }

            const containerWidth = viewportWidth * (isMobile ? 0.35 : 0.3);

            const x =
              (1 - p) ** 2 * (containerWidth / 2) +
              2 * (1 - p) * p * (containerWidth * 0.8) +
              p ** 2 * (containerWidth / 2);

            const y =
              (1 - p) ** 2 * 0 +
              2 * (1 - p) * p * (viewportHeight * 0.5) +
              p ** 2 * viewportHeight;

            const rotation = (0.5 - p) * -18;

            gsap.set(img, {
              x:        x - imgWidth  / 2 + offsetX,
              y:        y - imgHeight / 2,
              opacity:  1,
              width:    imgWidth,
              height:   imgHeight,
              rotation,
            });

            const distFromMid = Math.abs(0.5 - p);
            if (distFromMid < closestToMid) {
              closestToMid = distFromMid;
              activeIndex  = index;
            }
          });

          titles.forEach((title, i) => {
            gsap.set(title, { opacity: i === activeIndex ? 1 : 0.15 });
          });

          if (activeIndex !== -1 && bgImgRef.current) {
            const newSrc = spotlightItems[activeIndex].img;
            if (bgImgRef.current.getAttribute("src") !== newSrc) {
              bgImgRef.current.src = newSrc;
            }
          }
        },
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      cleanupRef.current = () => {
        st.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        window.scrollTo(0, 0);
        window.removeEventListener("load", onLoad);
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <section className="spotlight" ref={spotlightRef}>
      <div className="spotlight-bg-img">
        <img ref={bgImgRef} src="/images-nav/img_1.jpg" alt="" />
      </div>

      <div
        className="spotlight-titles-container"
        ref={titlesContainerElementRef}
      >
        <div className="spotlight-mask">
          <div className="spotlight-titles" ref={titlesContainerRef}>
            {spotlightItems.map((item, i) => (
              <h1
                key={i}
                onClick={() => handleNavigate(item.path)}
                style={{ cursor: "pointer" }}
              >
                {item.name}
              </h1>
            ))}
          </div>
        </div>
      </div>

      <div className="spotlight-images" ref={imagesContainerRef}>
        {spotlightItems.map((item, i) => (
          <div
            className="spotlight-img"
            key={i}
            onClick={() => handleNavigate(item.path)}
            style={{ cursor: "pointer" }}
          >
            <img src={item.img} alt={item.name} />
          </div>
        ))}
      </div>

      <div className="spotlight-header" ref={spotlightHeaderRef}>
        <p>Discover</p>
      </div>
    </section>
  );
}
