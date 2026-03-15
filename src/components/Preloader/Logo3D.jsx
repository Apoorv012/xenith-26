import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function Logo3D({ isMobile }) {
  const texture = useLoader(THREE.TextureLoader, "/x-logo.png");
  const mesh = useRef();

  const opacity = useRef(0);
  const scale = useRef(isMobile ? 0.3 : 0.45);

  useFrame((_, delta) => {
    if (!mesh.current) return;

    if (opacity.current < 1) {
      opacity.current += delta * 0.1;
      mesh.current.material.opacity = opacity.current;
    }

    if (scale.current < (isMobile ? 0.9 : 1.2)) {
      scale.current += delta * 0.08;
      mesh.current.scale.set(scale.current, scale.current, 1);
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[0, isMobile ? 2.2 : 3.2, -6]}
      scale={[isMobile ? 0.3 : 0.45, isMobile ? 0.3 : 0.45, 1]}
    >
      <planeGeometry args={[3.8, 3.8]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0}
        color="#000000"
        toneMapped={false}
      />
    </mesh>
  );
}
