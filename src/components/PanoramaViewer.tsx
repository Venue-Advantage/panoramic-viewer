import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Box } from "@react-three/drei";
import * as THREE from "three";

const PanoramaViewer = ({ imageUrl, view }) => {
    const texture: any = new THREE.TextureLoader().load(imageUrl);
    // console.log("texture", texture);
    if (view === "sphere") {
        return (
            <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />

                {/* Sphere with Inverted Normals (to show image from inside) */}
                <Sphere args={[5, 60, 40]} scale={[-1, 1, 1]}>
                    <meshBasicMaterial map={texture} side={THREE.BackSide} />
                </Sphere>

                {/* Allows user to rotate the scene */}
                <OrbitControls enableZoom={false} />
            </Canvas>
        );
    } else if (view === "cube") {
        return (
            <Canvas camera={{ position: [2, 2, 2] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />

                {/* Cube with the same image on all six sides */}
                <Box args={[2, 2, 2]}>
                    {[...Array(6)].map((_, index) => (
                        <meshBasicMaterial key={index} attach={`material-${index}`} map={texture} />
                    ))}
                </Box>

                {/* Enables dragging to look around */}
                <OrbitControls />
            </Canvas>
        );
    }
};

export default PanoramaViewer;

