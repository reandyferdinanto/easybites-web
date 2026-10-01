'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, Bounds, Center, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function HangingSign() {
  const logoTexture = useTexture('/images/logo.png');
  logoTexture.colorSpace = THREE.SRGBColorSpace;
  const signRef = useRef<THREE.Group>(null);

  // Independent swaying animation for the sign
  useFrame((state) => {
    if (signRef.current) {
      signRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      signRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
    }
  });
  
  return (
    // Positioned relative to the bakery model
    <group position={[-1.6, 3.5, 2.0]} ref={signRef}>
      {/* Wire/pole - shortened by 1/4 */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 6, 16]} />
        <meshStandardMaterial color="#4a3f35" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Sign Frame */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.15, 64]} />
        <meshStandardMaterial color="#f25c54" metalness={0.1} roughness={0.4} />
      </mesh>
      
      {/* Front Face */}
      <mesh position={[0, 0, 0.076]}>
        <circleGeometry args={[0.85, 64]} />
        <meshBasicMaterial map={logoTexture} transparent alphaTest={0.5} />
      </mesh>
      
      {/* Back Face */}
      <mesh position={[0, 0, -0.076]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.85, 64]} />
        <meshBasicMaterial map={logoTexture} transparent alphaTest={0.5} />
      </mesh>
    </group>
  );
}

function BakeryScene() {
  const { scene } = useGLTF('/models/bakery.glb');
  const groupRef = useRef<THREE.Group>(null);
  
  // Base rotation (approx 45 degrees to show front and side)
  const baseRotationY = -Math.PI / 4;
  
  // Set initial rotation and update materials
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = baseRotationY;
      groupRef.current.position.y = 0; 
    }

    // Ubah warna atap dan tenda menjadi hijau toska
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const parentName = mesh.parent?.name?.toLowerCase() || '';
        
        // Cek apakah ini bagian dari atap atau tenda (awning)
        if (parentName.includes('roof') || parentName.includes('tent')) {
          // Ganti material dengan warna Hijau Toska (Turquoise / Teal)
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#20b2aa', // Hijau Toska (Light Sea Green)
            roughness: 0.8,
            metalness: 0.1,
          });
        }
      }
    });
  }, [baseRotationY, scene]);

  // Animate rotation based on mouse position
  useFrame((state) => {
    if (groupRef.current) {
      // state.pointer ranges from -1 to 1 on x and y
      const targetRotationY = baseRotationY + (state.pointer.x * 0.25);
      const targetRotationX = state.pointer.y * 0.1;
      
      // Smooth interpolation for the entire group
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    }
  });
  
  return (
    <Float 
      speed={2.5}
      rotationIntensity={0.08}
      floatIntensity={0.3}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef}>
        {/* The bakery model itself */}
        <primitive object={scene} />
        {/* The sign is inside the same group, so they move together */}
        <HangingSign />
        {/* Dummy mesh to pull the bounding box center downwards, pushing the whole model visually UP */}
        <mesh position={[0, -3.5, 0]} visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
      </group>
    </Float>
  );
}

// Preload the model for better performance
useGLTF.preload('/models/bakery.glb');
useTexture.preload('/images/logo.png');

export default function Hero3DBakery() {
  return (
    <div className="w-full h-full absolute inset-0 z-20 cursor-move pointer-events-auto">
      <Canvas camera={{ position: [0, 10, 20], fov: 35 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} />
          
          <Bounds fit clip observe margin={0.55}>
             <Center position={[0, -0.2, 0]}>
               <BakeryScene />
             </Center>
          </Bounds>
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}