import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Avatar3D } from './Avatar3D';
import * as THREE from 'three';

interface SceneProps {
  scrollProgress: number;
  currentSection: string;
}

export function Scene({ scrollProgress, currentSection }: SceneProps) {
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      pointerEvents: 'none',
      background: 'radial-gradient(circle at 50% 50%, #1a2744 0%, #0a192f 100%)'
    }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.8}
          color="#4a90e2"
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={0.3}
          color="#64b5f6" 
        />
        <fog attach="fog" args={['#0a192f', 8, 25]} />
        <Avatar3D scrollProgress={scrollProgress} currentSection={currentSection} />
      </Canvas>
    </div>
  );
}