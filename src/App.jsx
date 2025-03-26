import { useEffect, useRef, useState } from "react";
import Front from './assets/6-set-img-krpano/front.png';
import Back from './assets/6-set-img-krpano/back.png';
import Left from './assets/6-set-img-krpano/left.png';
import Right from './assets/6-set-img-krpano/right.png';
import Top from './assets/6-set-img-krpano/top.png';
import Bottom from './assets/6-set-img-krpano/bottom.png';
import './App.css'

const App = ({ }) => {
  const krpanoRef = useRef(null);
  const [krpanoLoaded, setKrpanoLoaded] = useState(false);
  const images = [
    Left,
    Front,
    Right,
    Back,
    Top,
    Bottom
  ];

  useEffect(() => {
    const scriptId = "krpano-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "/panoramic-viewer/krpano.js"; // Ensure this file is in public/
      script.onload = () => {
        console.log("krpano.js loaded successfully");
        setKrpanoLoaded(true);
      };
      script.onerror = () => console.error("Error loading krpano.js");
      document.body.appendChild(script);
    } else {
      setKrpanoLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!krpanoLoaded || !window.embedpano) return;

    window.embedpano({
      target: krpanoRef.current,
      html5: "only",
      passQueryParameters: true,
      onready: (krpano) => {
        console.log("krpano is ready");

        if (krpano) {
          // 🔹 CREATE A NEW SCENE DYNAMICALLY
          krpano.call(`
            addscene(scene1);
            set(scene[scene1].name, "My Cube Scene");
            set(scene[scene1].image.type, "CUBE");

            ${images
              .map(
                (img, index) =>
                  `set(scene[scene1].image.cube.${[
                    "left",
                    "front",
                    "right",
                    "back",
                    "top",
                    "bottom",
                  ][index]}, "${img}");`
              )
              .join("\n")}

            loadscene(scene1);
          `);
        }
      },
    });
  }, [krpanoLoaded, images]);

  return <div ref={krpanoRef} style={{ width: "800px", height: "800px" }} />;
};

export default App;
