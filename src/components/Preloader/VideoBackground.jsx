import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function VideoBackground({ duration }) {
  const mesh = useRef();
  const videoRef = useRef();
  const textureRef = useRef();
  const { camera, viewport } = useThree();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/fog.mp4";
    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 0.75;

    video.onloadeddata = () => {
      video.play();
      textureRef.current = new THREE.VideoTexture(video);
      textureRef.current.colorSpace = THREE.SRGBColorSpace;
      setReady(true);
    };

    videoRef.current = video;
    return () => video.pause();
  }, []);

  useEffect(() => {
    if (!duration || !videoRef.current) return;
    const timeout = setTimeout(() => {
      videoRef.current.pause();
    }, duration * 1000);
    return () => clearTimeout(timeout);
  }, [duration]);

  if (!ready) return null;

  const distance = camera.position.z - -10;
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const height = 2 * Math.tan(vFov / 2) * distance;
  const width = height * viewport.aspect;

  return (
    <mesh
      ref={mesh}
      position={[0, 0, -10]}
      scale={[width * 1.2, height * 1.2, 1]}
      renderOrder={-1000}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={textureRef.current}
        toneMapped={false}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
