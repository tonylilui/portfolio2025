import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Avatar3DProps {
  scrollProgress: number;
  currentSection: string;
}

export function Avatar3D({ scrollProgress, currentSection }: Avatar3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const targetScale = useRef(1);

  useEffect(() => {
    // Update target transformations based on current section
    switch (currentSection) {
      case 'home':
        targetRotation.current = { x: 0, y: Math.PI * 2 * scrollProgress, z: 0 };
        targetPosition.current = { x: 0, y: 0, z: 0 };
        targetScale.current = 1;
        break;
      case 'about':
        targetRotation.current = { x: Math.PI / 4, y: Math.PI * 2 * scrollProgress, z: 0 };
        targetPosition.current = { x: 2, y: 0, z: 0 };
        targetScale.current = 1.2;
        break;
      case 'projects':
        targetRotation.current = { x: 0, y: Math.PI * 2 * scrollProgress, z: Math.PI / 4 };
        targetPosition.current = { x: -2, y: 0, z: 0 };
        targetScale.current = 1.5;
        break;
      case 'contact':
        targetRotation.current = { x: Math.PI / 4, y: Math.PI * 2 * scrollProgress, z: -Math.PI / 4 };
        targetPosition.current = { x: 0, y: -2, z: 0 };
        targetScale.current = 0.8;
        break;
    }
  }, [currentSection, scrollProgress]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Smooth interpolation for all transformations
      meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * delta * 2;
      meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * delta * 2;
      meshRef.current.rotation.z += (targetRotation.current.z - meshRef.current.rotation.z) * delta * 2;

      meshRef.current.position.x += (targetPosition.current.x - meshRef.current.position.x) * delta * 2;
      meshRef.current.position.y += (targetPosition.current.y - meshRef.current.position.y) * delta * 2;
      meshRef.current.position.z += (targetPosition.current.z - meshRef.current.position.z) * delta * 2;

      const currentScale = meshRef.current.scale.x;
      const newScale = currentScale + (targetScale.current - currentScale) * delta * 2;
      meshRef.current.scale.set(newScale, newScale, newScale);

      // Add a subtle floating animation
      meshRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial 
        color="#4a90e2" 
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}