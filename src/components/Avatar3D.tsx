import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  scrollProgress: number;
  currentSection: string;
}

export function Avatar3D({ scrollProgress, currentSection }: Avatar3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/src/assets/models/avatar.glb');
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
    if (groupRef.current) {
      // Smooth interpolation for all transformations
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * delta * 2;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * delta * 2;
      groupRef.current.rotation.z += (targetRotation.current.z - groupRef.current.rotation.z) * delta * 2;

      groupRef.current.position.x += (targetPosition.current.x - groupRef.current.position.x) * delta * 2;
      groupRef.current.position.y += (targetPosition.current.y - groupRef.current.position.y) * delta * 2;
      groupRef.current.position.z += (targetPosition.current.z - groupRef.current.position.z) * delta * 2;

      const currentScale = groupRef.current.scale.x;
      const newScale = currentScale + (targetScale.current - currentScale) * delta * 2;
      groupRef.current.scale.set(newScale, newScale, newScale);

      // Add a subtle floating animation
      groupRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.001;
    }
  });

  return (
    <primitive 
      ref={groupRef}
      object={scene}
      scale={0.5} // You may need to adjust this value based on your model's size
      position={[0, 0, 0]}
    />
  );
}