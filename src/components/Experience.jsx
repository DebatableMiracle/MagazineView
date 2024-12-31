import { Environment, Float, OrbitControls, Stars } from "@react-three/drei";
import { Book } from "./book";
import { degToRad } from "three/src/math/MathUtils.js";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

const MovingSparkles = () => {
  const sparkles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      position: new THREE.Vector3(
        Math.random() * 40 - 20,  // Wider spread
        Math.random() * 20 + 5,   // Higher minimum height
        Math.random() * 40 - 20   // Wider spread
      ),
      scale: Math.random() * 0.05 + 0.02,  // Smaller size
      speed: Math.random() * 0.2 + 0.1,
      offset: Math.random() * Math.PI * 2
    }));
  }, []);

  useFrame(({ clock }) => {
    sparkles.forEach((sparkle) => {
      sparkle.position.x += Math.sin(clock.elapsedTime + sparkle.offset) * 0.01;
      sparkle.position.y += Math.cos(clock.elapsedTime + sparkle.offset) * 0.01;
      sparkle.position.z += Math.sin(clock.elapsedTime * 0.5 + sparkle.offset) * 0.01;
    });
  });

  return (
    <group>
      {sparkles.map((sparkle, i) => (
        <mesh key={i} position={sparkle.position}>
          <sphereGeometry args={[sparkle.scale, 8, 8]} />
          <meshBasicMaterial color="#fff" toneMapped={false} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
};

export const Experience = () => {
  return (
    <>
      <Stars 
        radius={100}
        depth={50}
        count={3000}
        factor={2}
        saturation={0}
        fade
        speed={1}
      />
      
      <MovingSparkles />

      <Float
        rotation-x={degToRad(45)}
        floatingIntensity={0.5}
        speed={1}
        rotationIntensity={1}
      >
        <Book />
      </Float>

      <OrbitControls />
      <Environment preset="apartment" />
      
      <directionalLight
        position={[2, 5, 2]}
        intensity={1.2}
        color="#b4c6ee"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      
      <ambientLight intensity={0.2} color="#3450a1" />

    </>
  );
};