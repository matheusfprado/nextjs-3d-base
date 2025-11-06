'use client'

import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  Float,
  Sparkles,
  Lightformer,
} from '@react-three/drei'
import { Suspense, type CSSProperties } from 'react'

import { PandaTown } from './PandaTown'

const fallbackContainerStyle: CSSProperties = {
  borderRadius: 14,
  background: 'rgba(15,23,42,0.72)',
  padding: '10px 16px',
  color: 'rgba(226,232,240,0.92)',
  fontSize: 14,
  letterSpacing: '0.04em',
  backdropFilter: 'blur(8px)',
}

export function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [3.2, 2.2, 4.4], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#040613']} />
      <fog attach="fog" args={['#040613', 8, 18]} />

      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.35} groundColor="#020202" />
      <directionalLight
        position={[5, 7, 6]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-4.8, 5.2, 3.6]}
        angle={0.55}
        penumbra={0.38}
        intensity={1.2}
        castShadow
      />
      <pointLight position={[0, 3.6, -4]} intensity={0.8} color="#60a5fa" />

      <Suspense
        fallback={
          <Html>
            <div style={fallbackContainerStyle}>Carregando cenário...</div>
          </Html>
        }
      >
        <Float speed={1} rotationIntensity={0.15} floatIntensity={0.15}>
          <PandaTown />
        </Float>

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
          <ringGeometry args={[2.7, 4.5, 64]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#1f2937"
            emissiveIntensity={0.4}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}>
          <circleGeometry args={[6.5, 96]} />
          <meshStandardMaterial color="#050814" roughness={0.95} />
        </mesh>

        <Sparkles
          count={24}
          scale={[6, 4, 6]}
          size={2}
          speed={0.3}
          color="#38bdf8"
          opacity={0.6}
        />

        <Environment preset="sunset" blur={0.55}>
          <Lightformer
            form="ring"
            intensity={2.5}
            position={[2, 3, -4]}
            scale={8}
            color="#60a5fa"
          />
          <Lightformer form="rect" intensity={1.2} position={[-4, 2, 2]} scale={[6, 4]} />
        </Environment>
        <ContactShadows position={[0, -1.05, 0]} opacity={0.5} scale={6.4} blur={3.2} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.1}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 3.5}
      />
    </Canvas>
  )
}
