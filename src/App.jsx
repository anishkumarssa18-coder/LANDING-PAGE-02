import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Image as DreiImage, Float, Text, Sparkles, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './index.css';
import { ChevronRight, Droplets, Leaf, Star as StarIcon } from 'lucide-react';

const flavors = [
  { id: 1, name: 'Velvet Blueberry', desc: 'Our signature crown jewel.', color: '#4a2b75', image: '/blueberry.png' },
  { id: 2, name: 'Fresh Strawberry', desc: 'Hand-picked strawberries.', color: '#e8b2c1', image: '/strawberry.png' },
  { id: 3, name: 'Golden Badam', desc: 'Roasted almonds & saffron.', color: '#d4a373', image: '/badam.png' }
];

// Component to handle the 3D items tied to scroll
function SceneItems() {
  const scroll = useScroll();
  const groupRef = useRef();

  // References to specific floating cards
  const card1 = useRef();
  const card2 = useRef();
  const card3 = useRef();

  useFrame((state, delta) => {
    // scroll.offset goes from 0 to 1
    const offset = scroll.offset;

    // Move the entire group forward based on scroll
    groupRef.current.position.z = offset * 20;

    // Optional: Rotate the cards slightly as we scroll past them
    if (card1.current) {
      card1.current.rotation.y = Math.sin(offset * Math.PI * 2) * 0.2;
    }
    if (card2.current) {
      card2.current.rotation.y = Math.sin(offset * Math.PI * 2) * 0.2;
    }
    if (card3.current) {
      card3.current.rotation.y = Math.sin(offset * Math.PI * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Background Particles */}
      <Sparkles count={500} scale={12} size={2} speed={0.4} opacity={0.5} color="#c084fc" position={[0, 0, -5]} />
      <Stars radius={10} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {/* Floating 3D Text (Hero) */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <Text
          position={[0, 1.5, -2]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Velvet & Frost
        </Text>
        <Text
          position={[0, 0.7, -2]}
          fontSize={0.3}
          color="#d8b4fe"
          anchorX="center"
          anchorY="middle"
        >
          Scroll to Taste The Extraordinary
        </Text>
      </Float>

      {/* Flavor 1: Blueberry */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
        <group ref={card1} position={[-2, 0, -6]}>
          <DreiImage url="/blueberry.png" scale={[2.5, 3.5]} transparent opacity={1} />
          <Text position={[0, -2, 0.5]} fontSize={0.4} color="#a855f7" anchorX="center" anchorY="middle">
            Velvet Blueberry
          </Text>
        </group>
      </Float>

      {/* Flavor 2: Strawberry */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <group ref={card2} position={[2, 0, -12]}>
          <DreiImage url="/strawberry.png" scale={[2.5, 3.5]} transparent opacity={1} />
          <Text position={[0, -2, 0.5]} fontSize={0.4} color="#f472b6" anchorX="center" anchorY="middle">
            Fresh Strawberry
          </Text>
        </group>
      </Float>

      {/* Flavor 3: Badam */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
        <group ref={card3} position={[-2, 0, -18]}>
          <DreiImage url="/badam.png" scale={[2.5, 3.5]} transparent opacity={1} />
          <Text position={[0, -2, 0.5]} fontSize={0.4} color="#fbbf24" anchorX="center" anchorY="middle">
            Golden Badam
          </Text>
        </group>
      </Float>

      {/* End Scene 3D Text */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
        <Text
          position={[0, 0, -25]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Indulge Today.
        </Text>
      </Float>
    </group>
  );
}

// HTML Overlay synchronized with the 3D scroll
function HTMLOverlay() {
  return (
    <Scroll html style={{ width: '100vw' }}>
      
      {/* Page 1: Hero */}
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10vw' }}>
        <h1 className="text-5xl md:text-8xl font-bold font-serif mb-4 text-white">
          Taste the <br /> <span className="text-gradient">Extraordinary.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-md mb-8">
          A premium 3D rollable experience.
        </p>
        <button className="button-primary w-fit pointer-events-auto">
          Explore Menu <ChevronRight size={20} />
        </button>
      </div>

      {/* Page 2: Blueberry Details */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10vw' }}>
        <div className="glass-panel p-8 rounded-3xl max-w-sm pointer-events-auto text-right">
          <h2 className="text-3xl font-bold font-serif mb-2 text-white">Velvet Blueberry</h2>
          <p className="text-purple-300 font-bold mb-4">#1 Signature Milkshake</p>
          <p className="text-gray-400 mb-6">Our crown jewel. Wild blueberries blended with rich vanilla bean ice cream. The perfect balance of sweet cream and tart berries.</p>
          <div className="flex gap-4 justify-end">
            <span className="flex items-center gap-2 text-sm text-gray-300"><Droplets size={16}/> Rich</span>
            <span className="flex items-center gap-2 text-sm text-gray-300"><Leaf size={16}/> Fresh</span>
          </div>
        </div>
      </div>

      {/* Page 3: Strawberry Details */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '10vw' }}>
        <div className="glass-panel p-8 rounded-3xl max-w-sm pointer-events-auto">
          <h2 className="text-3xl font-bold font-serif mb-2 text-white">Fresh Strawberry</h2>
          <p className="text-pink-300 font-bold mb-4">The Classic Favorite</p>
          <p className="text-gray-400 mb-6">Hand-picked strawberries, double cream, and a hint of white chocolate. A gorgeously vibrant pink delight.</p>
        </div>
      </div>

      {/* Page 4: Badam Details */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10vw' }}>
        <div className="glass-panel p-8 rounded-3xl max-w-sm pointer-events-auto text-right">
          <h2 className="text-3xl font-bold font-serif mb-2 text-white">Golden Badam</h2>
          <p className="text-yellow-500 font-bold mb-4">Premium Indian Fusion</p>
          <p className="text-gray-400 mb-6">Roasted almonds, saffron strands, and premium milk blended to perfection. A rich, golden-yellow treat.</p>
        </div>
      </div>

      {/* Page 5: Footer */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10vw' }}>
        <div className="text-center pointer-events-auto">
          <h2 className="text-5xl font-bold font-serif mb-6 text-white">Ready to Order?</h2>
          <div className="flex justify-center gap-4 mb-12">
            <button className="button-primary">Order Delivery</button>
            <button className="button-secondary">Find a Store</button>
          </div>
          <p className="text-gray-500">© 2026 Velvet & Frost. Built with React Three Fiber.</p>
        </div>
      </div>

    </Scroll>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#07050a', overflow: 'hidden' }}>
      {/* Static Navbar Overlay */}
      <nav className="fixed top-0 w-full z-50 p-6 pointer-events-none">
        <div className="container flex justify-between items-center">
          <div className="text-2xl font-bold font-serif tracking-wider text-white">
            VELVET<span style={{ color: '#a855f7' }}>&</span>FROST
          </div>
          <div className="pointer-events-auto">
            <button className="button-secondary text-sm px-4 py-2">
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* 3D Canvas Context */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
        <Environment preset="city" />

        {/* ScrollControls sets up a scrollable container */}
        {/* pages=5 means the scroll area is 5x the screen height */}
        {/* damping makes the scroll smooth/inertia */}
        <ScrollControls pages={5} damping={0.25} distance={1}>
          {/* The 3D elements inside the scroll */}
          <Scroll>
            <SceneItems />
          </Scroll>

          {/* The HTML overlay inside the scroll */}
          <HTMLOverlay />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
