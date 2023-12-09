import {
  AccumulativeShadows,
  Environment,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  Sphere,
  useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

import React, { useEffect } from "react";
import { DEG2RAD } from "three/src/math/MathUtils";

export const Scene = ({ mainColor, path, ...props }) => {
  const { nodes, materials, scene } = useGLTF(path);
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);
  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));
  return (
    <>
      
      <group {...props} dispose={null}>
        <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
        <OrbitControls
          autoRotate
          enablePan={false}
          maxPolarAngle={DEG2RAD * 75}
          minDistance={6}
          maxDistance={10}
          autoRotateSpeed={0.5}
        />
        <primitive object={scene} scale={ratioScale} />
       
    
        
          <Sphere scale={15}>
            <meshBasicMaterial color={mainColor} side={THREE.BackSide} />
          </Sphere>
        
      </group>
    </>
  );
};

useGLTF.preload("/models/cybertruck_scene.glb");
useGLTF.preload("/models/model3_scene.glb");
useGLTF.preload("/models/semi_scene.glb");
