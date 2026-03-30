import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { Avatar3D } from './Avatar3D';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

interface SceneProps {
  scrollProgress: number;
  currentSection: string;
}

function FloatingParticles() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.002;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#60a5fa"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

export function Scene({ scrollProgress, currentSection }: SceneProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 30%, #0f172a 0%, #0a0f1a 70%)',
      }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.25} />
        <spotLight
          position={[8, 8, 8]}
          angle={0.2}
          penumbra={1}
          intensity={0.6}
          color="#60a5fa"
        />
        <pointLight position={[-8, -6, -8]} intensity={0.2} color="#a78bfa" />
        <Stars
          radius={80}
          depth={50}
          count={3000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />
        <FloatingParticles />
        <fog attach="fog" args={['#0a0f1a', 10, 30]} />
        <Avatar3D scrollProgress={scrollProgress} currentSection={currentSection} />
      </Canvas>
    </div>
  );
}