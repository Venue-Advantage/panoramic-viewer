import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Box } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
// import Front from '../assets/6-set-img-krpano/front.png';


const PanoramaViewer = ({ imageUrl, view, imageSet }) => {
    const texture: any = new THREE.TextureLoader().load(imageUrl);

    const materials = useMemo(() => {
        return imageSet.map((img, index) => {
          const texture = new THREE.TextureLoader().load(img);
          texture.wrapS = THREE.RepeatWrapping;
          texture.repeat.x = -1; // Flips texture horizontally
    
          return new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide, // Render inside the cube
          });
        });
      }, [imageSet]);

    if (view === "cube") {
        return (
            <Canvas camera={{ position: [0, 0, 0], fov: 90 }}>
                <mesh>
                    <boxGeometry args={[10, 10, 10]} /> {/* Larger cube so we are inside */}
                    {materials.map((material:any, index:any) => (
                        <meshBasicMaterial key={index} attach={`material-${index}`} {...material} />
                    ))}
                </mesh>

                {/* <Canvas camera={{ position: [0, 0, 8] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} />
                    <mesh>
                        <boxGeometry args={[5, 5, 5]} />
                        {materials.map((material, index) => (
                            <meshBasicMaterial key={index} attach={`material-${index}`} {...material} />
                        ))}
                    </mesh>
                    <OrbitControls enableZoom={true} zoomSpeed={0.8} minDistance={2} maxDistance={10} />
                </Canvas> */}

                <OrbitControls
                    enableZoom={true}
                    zoomSpeed={0.8}
                    minDistance={1}
                    maxDistance={1} // Prevent moving forward/backward
                    enablePan={false}
                    enableRotate={true}

                    // enableZoom={true}
                    // zoomSpeed={0.5}   // Faster zooming
                    // minDistance={0} // Ultra close zoom-in
                    // maxDistance={15}      // Prevents zooming too far out
                    // enablePan={false}
                    // maxPolarAngle={Math.PI - 0.1}
                    // minPolarAngle={0.1}
                />
            </Canvas>
        );
    }

    // if (view === "sphere") {
    //     return (
    //         <Canvas camera={{ position: [0, 0, 2], fov: 20 }}>
    //             <ambientLight intensity={0.5} />
    //             <directionalLight position={[10, 10, 10]} />

    //             {/* Sphere with Inverted Normals (to show image from inside) */}
    //             <Sphere args={[5, 60, 40]} scale={[-1, 1, 1]}>
    //                 <meshBasicMaterial map={texture} side={THREE.BackSide} />
    //             </Sphere>

    //             {/* Allows user to rotate the scene */}
    //             <OrbitControls
    //                 enableZoom={true}
    //                 zoomSpeed={0.5}   // Faster zooming
    //                 minDistance={0} // Ultra close zoom-in
    //                 maxDistance={15}      // Prevents zooming too far out
    //                 enablePan={false}
    //                 maxPolarAngle={Math.PI - 0.1}
    //                 minPolarAngle={0.1}
    //             />

    //               {/* <OrbitControls  enableZoom={false} /> */}
    //         </Canvas>
    //     );
    // } else if (view === "cube") {
    //     return (
    //         <Canvas camera={{ position: [2, 2, 2] }}>
    //             <ambientLight intensity={0.5} />
    //             <directionalLight position={[10, 10, 10]} />

    //             {/* Cube with the same image on all six sides */}
    //             <Box args={[2, 2, 2]}>
    //                 {[...Array(6)].map((_, index) => (
    //                     <meshBasicMaterial key={index} attach={`material-${index}`} map={texture} />
    //                 ))}
    //             </Box>

    //             {/* Enables dragging to look around */}
    //             <OrbitControls />
    //         </Canvas>
    //     );
    // }
};

export default PanoramaViewer;

