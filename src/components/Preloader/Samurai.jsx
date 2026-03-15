import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Samurai({ isMobile, onAnimationDuration }) {
  const group = useRef();
  const played = useRef(false);

  const { scene, animations } = useGLTF("/samurai.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || played.current) return;

    const action = Object.values(actions)[0];
    if (!action) return;

    played.current = true;

    const clipDuration = action.getClip().duration;
    const timeScale = 0.45;
    const realDuration = clipDuration / timeScale;

    if (onAnimationDuration) {
      onAnimationDuration(realDuration);
    }

    setTimeout(() => {
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.timeScale = timeScale;
      action.play();
    }, 100);

  }, [actions, onAnimationDuration]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={isMobile ? 1.6 : 2.3}
      position={[0, isMobile ? -2.5 : -3.6, isMobile ? -3 : -3.2]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

useGLTF.preload("/samurai.glb");
