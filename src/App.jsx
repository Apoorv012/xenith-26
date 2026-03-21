import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Scene from "./canvas/Scene";
import router from "./router";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fallback dismiss after 12s
  useEffect(() => {
    const timeout = setTimeout(() => dismiss(), 12000);
    return () => clearTimeout(timeout);
  }, []);

  const dismiss = () => {
    router.navigate("/", { replace: true });
    setFadeOut(true);
    // Canvas stays mounted permanently — unmounting it causes a React/R3F
    // "removeChild" crash because R3F manages its own DOM nodes internally.
  };

  const handleAnimationDuration = (duration) => {
    setTimeout(() => dismiss(), duration * 1000);
  };

  return (
    <>
      <RouterProvider router={router} />

      {/* Always in the DOM. After fadeOut: invisible + non-interactive. */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#000",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}>
        <Canvas
          gl={{ alpha: true }}
          dpr={[1, 2]}
          camera={{
            fov: isMobile ? 65 : 50,
            near: 0.1,
            far: 100,
            position: [0, 0, isMobile ? 8 : 6],
          }}
          style={{ width: "100%", height: "100%", pointerEvents: fadeOut ? "none" : "all" }}
        >
          <Scene isMobile={isMobile} onAnimationDuration={handleAnimationDuration} />
        </Canvas>
      </div>
    </>
  );
}
