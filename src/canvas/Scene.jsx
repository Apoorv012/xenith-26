import { Suspense } from "react";
import VideoBackground from "../components/Preloader/VideoBackground";
import Samurai from "../components/Preloader/Samurai";
import Logo3D from "../components/Preloader/Logo3D";

export default function Scene({ isMobile, onAnimationDuration }) {
  return (
    <>
      <Suspense fallback={null}>
        <VideoBackground />
      </Suspense>

      <Logo3D isMobile={isMobile} />

      <Suspense fallback={null}>
        <Samurai isMobile={isMobile} onAnimationDuration={onAnimationDuration} />
      </Suspense>

      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 4, 3]} intensity={0.7} />
    </>
  );
}
