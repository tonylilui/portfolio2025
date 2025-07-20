import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Avatar3D } from './Avatar3D';

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
      pointerEvents: 'none'
    }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Avatar3D scrollProgress={scrollProgress} currentSection={currentSection} />
      </Canvas>
    </div>
  );
}