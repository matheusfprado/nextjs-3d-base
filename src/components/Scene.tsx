'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'

export function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [2, 1.5, 3.5], fov: 50 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 4, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Suspense fallback={null}>
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#22d3ee" roughness={0.3} metalness={0.1} />
        </mesh>

        <Environment preset="city" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.4} scale={5} blur={2.5} />
      </Suspense>

      <OrbitControls enablePan={false} enableDamping dampingFactor={0.05} />
    </Canvas>
  )
}
