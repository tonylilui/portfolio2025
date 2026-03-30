import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  scrollProgress: number;
  currentSection: string;
}

export function Avatar3D({ currentSection }: Avatar3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/avatar.glb');
  const target = useRef({ x: 0, y: 0, z: 0, posX: 0, posY: 0, scale: 1 });

  // Compute target transforms based on section
  const getSectionConfig = () => {
    switch (currentSection) {
      case 'about':
        return { x: 0.15, y: 0, z: 0, posX: 2.5, posY: 0.3, scale: 1.1 };
      case 'projects':
        return { x: 0, y: 0, z: 0.15, posX: -2.5, posY: 0, scale: 1.3 };
      case 'contact':
        return { x: 0.1, y: 0, z: -0.1, posX: 0, posY: -1.5, scale: 0.9 };
      default: // home
        return { x: 0, y: 0, z: 0, posX: 0, posY: 0, scale: 1 };
    }
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const config = getSectionConfig();
    const t = target.current;
    t.x = config.x;
    t.y = config.y;
    t.z = config.z;
    t.posX = config.posX;
    t.posY = config.posY;
    t.scale = config.scale;

    const g = groupRef.current;
    const lerp = 1 - Math.pow(0.02, delta); // Frame-rate-independent smooth lerp

    // Gentle continuous Y rotation + section-based tilt (x, z)
    g.rotation.y += delta * 0.4; // Slow, steady spin
    g.rotation.x += (t.x - g.rotation.x) * lerp;
    g.rotation.z += (t.z - g.rotation.z) * lerp;

    // Smooth position
    g.position.x += (t.posX - g.position.x) * lerp;
    g.position.y += (t.posY - g.position.y) * lerp;

    // Subtle floating bob
    g.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.003;

    // Smooth scale
    const s = g.scale.x + (t.scale - g.scale.x) * lerp;
    g.scale.setScalar(s);
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={0.5}
      position={[0, 0, 0]}
    />
  );
}